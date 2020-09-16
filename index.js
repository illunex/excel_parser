const XLSX = require("xlsx");
const mariadb = require("mariadb");
const {go, range, forEach, map} = require("fxjs/Strict");

let workbook = XLSX.readFile(__dirname + "/222.xlsx")
let worksheet = workbook.Sheets["Sheet1"]

let standardCompanyData = new Map();
let link = new Array();
// 기준기업정보
go(
    range(6, 7),
    forEach(i => {
        if (worksheet[`D${i}`].w !== undefined && worksheet[`D${i}`].w !== "") {  // 기준
            standardCompanyData.set(
                worksheet[`D${i}`].w, {
                    kind: worksheet[`B${i}`].w,
                    companyName: worksheet[`C${i}`].w,
                    kedcd: worksheet[`D${i}`].w,
                    industryCode: worksheet[`E${i}`].w,     // 산업분류 코드
                    industryName: worksheet[`F${i}`].w,     // 산업분류 이름
                    corporationNum : "",                    // 법인번호
                    businessNum : "",                       // 사업자번호
                    sales_2019: worksheet[`G${i}`].w,
                    scale: worksheet[`H${i}`].w,            // 기업규모
                    publicOffering: worksheet[`H${i}`].w,   // 기업공개
                    establishment: "",                      // 설립일
                    product: "",                            // 주요제품
                    state: "",
                    addrSiDo: "",
                    addrGuGun: "",
                    addrDong: "",
                }
            );
        }
        if (worksheet[`J${i}`].w !== undefined && worksheet[`J${i}`].w !== "") { //거래처
            standardCompanyData.set(
                worksheet[`J${i}`].w, {
                    kind: "",
                    companyName: worksheet[`K${i}`].w,
                    kedcd: worksheet[`J${i}`].w,
                    industryCode: worksheet[`Q${i}`].w,
                    industryName: worksheet[`R${i}`].w,
                    corporationNum : worksheet[`L${i}`].w,
                    businessNum : worksheet[`M${i}`].w,
                    sales_2019: worksheet[`G${i}`].w,
                    scale: worksheet[`O${i}`].w,
                    publicOffering: worksheet[`P${i}`].w,
                    establishment: worksheet[`S${i}`].w,
                    product: worksheet[`W${i}`].w,
                    state: worksheet[`Y${i}`].w === "정상" ? "normal":"fail",
                    addrSiDo: worksheet[`T${i}`].w,
                    addrGuGun: worksheet[`U${i}`].w,
                    addrDong: worksheet[`V${i}`].w,
                }
            );

            link.push({
                standardKedcd: worksheet[`D${i}`].w,
                targetKedcd: worksheet[`J${i}`].w,
                relation: worksheet[`N${i}`].w === "매입" ? "buy" : "sell",
                transactionAmount: worksheet[`X${i}`].w,
            });
        }
        if (worksheet[`AB${i}`].w !== undefined && worksheet[`AB${i}`].w !== "") { //구매처1
            standardCompanyData.set(
                worksheet[`AB${i}`].w, {
                    kind: "",
                    companyName: worksheet[`AC${i}`].w,
                    kedcd: worksheet[`AB${i}`].w,
                    industryCode: worksheet[`AE${i}`].w,
                    industryName: worksheet[`AF${i}`].w,
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`AF${i}`].w,
                    scale: worksheet[`AH${i}`].w,
                    publicOffering: worksheet[`AI${i}`].w,
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`AD${i}`].w,
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`AB${i}`].w,
                relation: "buy",
                transactionAmount: worksheet[`AJ${i}`].w,
            });
        }
        if (worksheet[`AK${i}`].w !== undefined && worksheet[`AK${i}`].w !== "") { //구매처2
            standardCompanyData.set(
                worksheet[`AK${i}`].w, {
                    kind: "",
                    companyName: worksheet[`AL${i}`].w,
                    kedcd: worksheet[`AK${i}`].w,
                    industryCode: worksheet[`AN${i}`].w,
                    industryName: worksheet[`AO${i}`].w,
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`AP${i}`].w,
                    scale: worksheet[`AQ${i}`].w,
                    publicOffering: worksheet[`AR${i}`].w,
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`AM${i}`].w,
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`AK${i}`].w,
                relation: "buy",
                transactionAmount: worksheet[`AS${i}`].w,
            });
        }
        if (worksheet[`AT${i}`].w !== undefined && worksheet[`AT${i}`].w !== "") { //구매처3
            standardCompanyData.set(
                worksheet[`AT${i}`].w, {
                    kind: "",
                    companyName: worksheet[`AU${i}`].w,
                    kedcd: worksheet[`AT${i}`].w,
                    industryCode: worksheet[`AW${i}`].w,
                    industryName: worksheet[`AX${i}`].w,
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`AY${i}`].w,
                    scale: worksheet[`AZ${i}`].w,
                    publicOffering: worksheet[`BA${i}`].w,
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`AV${i}`].w,
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`AT${i}`].w,
                relation: "buy",
                transactionAmount: worksheet[`BB${i}`].w,
            });
        }

        if (worksheet[`BC${i}`].w !== undefined && worksheet[`BC${i}`].w !== "") { //판매처1
            standardCompanyData.set(
                worksheet[`BC${i}`].w, {
                    kind: "",
                    companyName: worksheet[`BD${i}`].w,
                    kedcd: worksheet[`BC${i}`].w,
                    industryCode: worksheet[`BF${i}`].w,
                    industryName: worksheet[`BG${i}`].w,
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`BH${i}`].w,
                    scale: worksheet[`BI${i}`].w,
                    publicOffering: worksheet[`BJ${i}`].w,
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`BE${i}`].w,
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`BC${i}`].w,
                relation: "sell",
                transactionAmount: worksheet[`BL${i}`].w,
            });
        }

        if (worksheet[`BL${i}`].w !== undefined && worksheet[`BL${i}`].w !== "") { //판매처2
            standardCompanyData.set(
                worksheet[`BL${i}`].w, {
                    kind: "",
                    companyName: worksheet[`BM${i}`].w,
                    kedcd: worksheet[`BL${i}`].w,
                    industryCode: worksheet[`BO${i}`].w,
                    industryName: worksheet[`BP${i}`].w,
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`BQ${i}`].w,
                    scale: worksheet[`BR${i}`].w,
                    publicOffering: worksheet[`BS${i}`].w,
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`BN${i}`].w,
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`BL${i}`].w,
                relation: "sell",
                transactionAmount: worksheet[`BT${i}`].w,
            });
        }

        if (worksheet[`BU${i}`].w !== undefined && worksheet[`BU${i}`].w !== "") { //판매처3
            standardCompanyData.set(
                worksheet[`BU${i}`].w, {
                    kind: "",
                    companyName: worksheet[`BV${i}`].w,
                    kedcd: worksheet[`BU${i}`].w,
                    industryCode: worksheet[`BX${i}`].w,
                    industryName: worksheet[`BY${i}`].w,
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`BZ${i}`].w,
                    scale: worksheet[`CA${i}`].w,
                    publicOffering: worksheet[`CB${i}`].w,
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`BW${i}`].w,
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`BU${i}`].w,
                relation: "sell",
                transactionAmount: worksheet[`CC${i}`].w,
            });
        }
    }),
)

// console.log(standardCompanyData)
// console.log(link)
mariadb.createConnection({host: "13.209.83.88", user: "jin", password: "park2213", connectionLimit: 5})
    .then(conn => {
        let i = 0;
        go(standardCompanyData.values(),
            forEach(item => {
                conn.query("insert into whasung.node values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [item.kedcd,
                        item.companyName,
                        item.kind,
                        item.industryCode,
                        item.industryName,
                        item.corporationNum,
                        item.businessNum,
                        item.sales_2019,
                        item.scale,
                        item.publicOffering,
                        item.establishment,
                        item.product,
                        item.state,
                        item.addrSiDo,
                        item.addrGuGun,
                        item.addrDong
                    ])
                    .then(res => {
                        let per = ++i / ((standardCompanyData.size + link.length) / 100);
                        console.log(per)
                        //if(per === 100) process.exit(0);
                    })
                    .catch(err => {console.log(err)})
            })
        );

        go(link,
            forEach(item => {
                conn.query("insert into whasung.link values (?,?,?,?)",
                    [item.standardKedcd,
                        item.targetKedcd,
                        item.relation,
                        item.transactionAmount])
                .then(res => {
                    let per = ++i / ((standardCompanyData.size + link.length) / 100);
                    console.log(per)
                    //if(per === 100) process.exit(0);
                })
                .catch(err => {console.log(err)});
            })
        );
    })
    .catch(err => {console.log(err)});
