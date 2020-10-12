const neo4j = require('neo4j-driver')
const driver = neo4j.driver("neo4j://13.124.117.117:7687", neo4j.auth.basic("neo4j", "Illunex123!"))


async function get() {
    const session = driver.session()

    try {
        const result = await session.run(
            'match (c:Company {companyName: $companyName})-[r:sell]->(c2:Company)' +
            'return c, r, c2',
            {
                companyName: "삼성전자"
            }
        )
        for (const record of result.records) {
            for (const r of record) {
                console.log(r)
            }
            //console.log(record.length)
        }
    } finally {
        await session.close()
    }
}

async function getAll() {
    const session = driver.session()

    try {
        const result = await session.run(
            'match (c:Company)-[r:sell]->(c2:Company)' +
            'return c, r, c2',
            {
            }
        )
        console.log(result.records.length)
        for (const record of result.records) {
            
            for (const r of record) {
                //console.log(r)
            }
            //console.log(record.length)
        }
    } finally {
        await session.close()
    }
}

getAll();
