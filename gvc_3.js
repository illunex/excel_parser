const XLSX = require("xlsx");
const mariadb = require("mariadb");
const {go, range, forEach, map} = require("fxjs/Strict");

let workbook = XLSX.readFile(__dirname + "/gvc_3.xlsx")
let worksheet = workbook.Sheets["Sheet1"]

let standardCompanyData = new Map();
let error = new Array();
// 기준기업정보
//console.log(worksheet)
go(
    range(2, 3360), //20002, 561704
    forEach(i => {
        if (worksheet[`I${i}`]) {
            standardCompanyData.set(
                worksheet[`I${i}`].w, {
                    kedcd: worksheet[`I${i}`].w,
                }
            );
        }
    }),
)

//console.log(standardCompanyData.size);

mariadb.createConnection({host: "13.209.83.88", user: "jin", password: "park2213", connectionLimit: 5})
    .then(conn => {
        let i = 0;
        go(standardCompanyData.values(),
            forEach(item => {
                conn.query("insert into whasung.nodeTemp (kedcd) values (?)",
                    [item.kedcd
                    ])
                    .then(res => {
                        let per = (++i / ((standardCompanyData.size) / 100)).toFixed(2);
                        process.stdout.cursorTo(0);
                        process.stdout.clearLine(1);
                        process.stdout.write(per + '%');
                    })
                    .catch(err => {let per = (++i / ((standardCompanyData.size) / 100)).toFixed(2);
                        process.stdout.cursorTo(0);
                        process.stdout.clearLine(1);
                        process.stdout.write(per + '%');})
            })
        );
    })
    .catch(err => {console.log(err)});