const neo4j = require('neo4j-driver')
const mariadb = require("mariadb");

const driver = neo4j.driver("neo4j://13.124.117.117:7687", neo4j.auth.basic("neo4j", "Illunex123!"))

mariadb.createConnection({host: "13.209.83.88", user: "jin", password: "park2213", connectionLimit: 5})
    .then(conn => {
        conn.query("select * from whasung.nodeTemp")
            .then(res => {
                let i = 0;
                for (const a of res) {
                    insertData(a);
                    // process.stdout.cursorTo(0);
                    // process.stdout.clearLine(1);
                    // process.stdout.write(i / (res / 100) + '%');
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
            'CREATE (test:Company {' +
            'kedcd: $kedcd,' +
            'companyName: $companyName,' +
            'ir: $ir,' +
            'industryCode: $industryCode,' +
            'industryName: $industryName,' +
            'kind: $kind,' +
            'corporationNum: $corporationNum,' +
            'businessNum: $businessNum,' +
            'sales2019: $sales2019,' +
            'scale: $scale,' +
            'publicOffering: $publicOffering,' +
            'establishment: $establishment,' +
            'product: $product,' +
            'state: $state,' +
            'zipCode: $zipCode,' +
            'addr: $addr,' +
            'addr_new: $addr_new,' +
            'formEnterprise: $formEnterprise,' +
            'formEstablishment: $formEstablishment' +
            '})',
            {
                kedcd: res.kedcd,
                companyName: res.companyName,
                ir: res.ir,
                industryCode: res.industryCode,
                industryName: res.industryName,
                kind: res.kind,
                corporationNum: res.corporationNum,
                businessNum: res.businessNum,
                sales2019: res.sales2019,
                scale: res.scale,
                publicOffering: res.publicOffering,
                establishment: res.establishment,
                product: res.product,
                state: res.state,
                zipCode: res.zipCode,
                addr: res.addr,
                addr_new: res.addr_new,
                formEnterprise: res.formEnterprise,
                formEstablishment: res.formEstablishment

            }
        )
    } finally {
        await session.close()
    }

    // on application exit:

}
