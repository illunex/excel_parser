const XLSX = require("xlsx");
const mariadb = require("mariadb");
const {go, range, forEach, map} = require("fxjs/Strict");

let workbook = XLSX.readFile(__dirname + "/gvc_2.xlsx")
let worksheet = workbook.Sheets["Sheet1"]

let standardCompanyData = new Map();
let error = new Array();
// 기준기업정보
//console.log(worksheet)
go(
    range(2, 242186), //20002, 561704
    forEach(i => {

                standardCompanyData.set(
                    worksheet[`A${i}`].w, {
                        kedcd: worksheet[`A${i}`].w,
                        companyName: worksheet[`B${i}`].w,
                        ir: worksheet[`C${i}`].w,
                        scale: worksheet[`D${i}`] !== undefined ? worksheet[`D${i}`].w : "",            // 기업규모
                        formEnterprise: worksheet[`E${i}`] !== undefined ? worksheet[`E${i}`].w : "",            // 기업형태
                        formEstablishment: worksheet[`F${i}`] !== undefined ? worksheet[`F${i}`].w : "",            // 설립형태
                        corporationNum : worksheet[`H${i}`] !== undefined ? worksheet[`H${i}`].w : "",                    // 법인번호
                        businessNum : worksheet[`I${i}`] !== undefined ? worksheet[`I${i}`].w : "",                       // 사업자번호
                        establishment: worksheet[`J${i}`] !== undefined ? worksheet[`J${i}`].w : "",                      // 설립일
                        publicOffering: worksheet[`K${i}`] !== undefined ? worksheet[`K${i}`].w : "",   // 기업공개
                        industryCode: worksheet[`L${i}`] !== undefined ? worksheet[`L${i}`].w : "",     // 산업분류 코드
                        industryName: worksheet[`M${i}`] !== undefined ? worksheet[`M${i}`].w : "",     // 산업분류 이름
                        zipCode: worksheet[`N${i}`] !== undefined ? worksheet[`N${i}`].w : "",
                        addr: worksheet[`O${i}`] !== undefined ? worksheet[`O${i}`].w : "",
                        product: worksheet[`P${i}`] !== undefined ? worksheet[`P${i}`].w : "",                            // 주요제품
                        addr_new: worksheet[`Q${i}`] !== undefined ? worksheet[`Q${i}`].w : "",
                        settlementDate: worksheet[`R${i}`] !== undefined ? worksheet[`R${i}`].w : "",
                        operatingProfit: worksheet[`T${i}`] !== undefined ? worksheet[`T${i}`].w : "",  // 영업이익
                        randDExpenses: worksheet[`U${i}`] !== undefined ? worksheet[`U${i}`].w : "",    // 연구개발비
                        sales_2019: worksheet[`S${i}`] !== undefined ? worksheet[`S${i}`].w : "",
                    }
                );

    }),
)
// console.log(standardCompanyData)
mariadb.createConnection({host: "13.209.83.88", user: "jin", password: "park2213", connectionLimit: 5})
    .then(conn => {
        let i = 0;
        go(standardCompanyData.values(),
            forEach(item => {
                conn.query("update whasung.finance set " +
                    "settlementDate = ?" +
                    ", operatingProfit = ?" +
                    ", randDExpenses = ?" +
                    ", sales = ?" +
                    " where kedcd = ?"
                    , [item.settlementDate
                        , item.operatingProfit
                        , item.randDExpenses
                        , item.sales_2019
                        , item.kedcd])
                    .then(res => {
                        let per = (++i / ((standardCompanyData.size) / 100)).toFixed(2);
                        process.stdout.cursorTo(0);
                        process.stdout.clearLine(1);
                        process.stdout.write(per + '%');
                    })
                    .catch(err => {
                        error.push(item.kedcd);
                        let per = (++i / ((standardCompanyData.size) / 100)).toFixed(2);
                        process.stdout.cursorTo(0);
                        process.stdout.clearLine(1);
                        process.stdout.write(per + '%');})
            })
        );
    })
    .catch(err => {console.log(err)});




// mariadb.createConnection({host: "13.209.83.88", user: "jin", password: "park2213", connectionLimit: 5})
//     .then(conn => {
//             let i = 0;
//             go(standardCompanyData.values(),
//                 forEach(item => {
//                         conn.query("update whasung.node set " +
//                             "ir = ?" +
//                             ", scale = ?" +
//                             ", formEnterprise = ?" +
//                             ", formEstablishment = ?" +
//                             ", corporationNum = ?" +
//                             ", businessNum = ?" +
//                             ", establishment = ?" +
//                             ", publicOffering = ?" +
//                             ", industryCode = ?" +
//                             ", industryName = ?" +
//                             ", zipCode = ?" +
//                             ", addr = ?" +
//                             ", product = ?" +
//                             ", addr_new = ?" +
//                             " where kedcd = ?"
//                             , [item.ir
//                                 , item.scale
//                                 , item.formEnterprise
//                                 , item.formEstablishment
//                                 , item.corporationNum
//                                 , item.businessNum
//                                 , item.establishment
//                                 , item.publicOffering
//                                 , item.industryCode
//                                 , item.industryName
//                                 , item.zipCode
//                                 , item.addr
//                                 , item.product
//                                 , item.addr_new
//                                 , item.kedcd])
//                             .then(res => {
//                                     let per = (++i / ((standardCompanyData.size) / 100)).toFixed(2);
//                                     process.stdout.cursorTo(0);
//                                     process.stdout.clearLine(1);
//                                     process.stdout.write(per + '%');
//                             })
//                             .catch(err => {
//                                     error.push(item.kedcd);
//                                     let per = (++i / ((standardCompanyData.size) / 100)).toFixed(2);
//                                     process.stdout.cursorTo(0);
//                                     process.stdout.clearLine(1);
//                                     process.stdout.write(per + '%');})
//                 })
//             );
//     })
//     .catch(err => {console.log(err)});

