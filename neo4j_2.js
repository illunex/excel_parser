const neo4j = require('neo4j-driver')
const mariadb = require("mariadb");

const driver = neo4j.driver("neo4j://13.124.117.117:7687", neo4j.auth.basic("neo4j", "Illunex123!"))

mariadb.createConnection({host: "13.209.83.88", user: "jin", password: "park2213", connectionLimit: 5})
    .then(conn => {
        conn.query("select * from whasung.link where standardKedcd in (select kedcd from whasung.nodeTemp) and targetkedcd in (select kedcd from whasung.nodeTemp) and relation = 'buy'")
            .then(res => {
                let i = 0;

                for (const item of res) {
                    insertData(item);
                    console.log(++i)
                }
                console.log("끝")
                //await driver.close()
            })
            .catch(err => {console.log(err)})
    })
    .catch(err => {console.log(err)});

async function insertData(res) {
    const session = driver.session()

    try {
        await session.run(
            'match(n:Company) where n.kedcd = $standardKedcd' +
            ' match(j:Company) where j.kedcd = $targetkedcd' +
            ' create (n)-[:buy {transactionAmount: $transactionAmount}]->(j)',
            {
                standardKedcd: res.standardKedcd,
                targetkedcd: res.targetkedcd,
                transactionAmount: res.transactionAmount
            }
        )
    } finally {
        await session.close()
    }

    // on application exit:

}
// // match(n:Company) where n.kedcd = "0000091399"
// // match(j:Company) where j.kedcd = "0000000044"
// // create (n)-[:buy {transactionAmount: 111}]->(j)
// // return n, j

// // match(:Company {companyName: "삼성전자"})-[:buy]->(whom:Company)
// // return whom

// match(n:Company)-[b:buy]->(whom:Company) return n, b, whom Limit 200
// //match(:Company {companyName: "삼성전자"})-[:buy]->(whom) return whom
// //match(:Company {companyName: "삼성전자"})-[:buy]->(whom) return whom

// MATCH (n:Company {company: "삼성전자"})
// MATCH p=(n)-[]->() RETURN p LIMIT 100
