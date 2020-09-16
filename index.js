const XLSX = require("xlsx");
const mariadb = require("mariadb");
const {go, range, forEach, map} = require("fxjs/Strict");

let workbook = XLSX.readFile(__dirname + "/gvc(5).xlsx")
let worksheet = workbook.Sheets["Sheet1"]

let standardCompanyData = new Map();
let link = new Array();
// 기준기업정보
go(
    range(2, 20002),
    forEach(i => {
        if (worksheet[`D${i}`] !== undefined && worksheet[`C${i}`] !== "") {  // 기준
            standardCompanyData.set(
                worksheet[`D${i}`].w, {
                    kind: worksheet[`B${i}`].w,
                    companyName: worksheet[`C${i}`].w,
                    kedcd: worksheet[`D${i}`].w,
                    industryCode: worksheet[`E${i}`] !== undefined ? worksheet[`E${i}`].w : "",     // 산업분류 코드
                    industryName: worksheet[`F${i}`] !== undefined ? worksheet[`F${i}`].w : "",     // 산업분류 이름
                    corporationNum : "",                    // 법인번호
                    businessNum : "",                       // 사업자번호
                    sales_2019: worksheet[`G${i}`] !== undefined ? worksheet[`G${i}`].w : "",
                    scale: worksheet[`H${i}`] !== undefined ? worksheet[`H${i}`].w : "",            // 기업규모
                    publicOffering: worksheet[`H${i}`] !== undefined ? worksheet[`H${i}`].w : "",   // 기업공개
                    establishment: "",                      // 설립일
                    product: "",                            // 주요제품
                    state: "",
                    addrSiDo: "",
                    addrGuGun: "",
                    addrDong: "",
                }
            );
        }
        if (worksheet[`J${i}`] !== undefined && worksheet[`K${i}`] !== undefined && worksheet[`J${i}`].w !== "") { //거래처
            standardCompanyData.set(
                worksheet[`J${i}`].w, {
                    kind: "",
                    companyName: worksheet[`K${i}`].w,
                    kedcd: worksheet[`J${i}`].w,
                    industryCode: worksheet[`Q${i}`] !== undefined ? worksheet[`Q${i}`].w : "",
                    industryName: worksheet[`R${i}`] !== undefined ? worksheet[`R${i}`].w : "",
                    corporationNum : worksheet[`L${i}`] !== undefined ? worksheet[`L${i}`].w : "",
                    businessNum : worksheet[`M${i}`] !== undefined ? worksheet[`M${i}`].w : "",
                    sales_2019: "",
                    scale: worksheet[`O${i}`] !== undefined ? worksheet[`O${i}`].w : "",
                    publicOffering: worksheet[`P${i}`] !== undefined ? worksheet[`P${i}`].w : "",
                    establishment: worksheet[`S${i}`] !== undefined ? worksheet[`S${i}`].w : "",
                    product: worksheet[`W${i}`] !== undefined ? worksheet[`W${i}`].w : "",
                    state: worksheet[`Y${i}`].w === "정상" ? "normal":"fail",
                    addrSiDo: worksheet[`T${i}`] !== undefined ? worksheet[`T${i}`].w : "",
                    addrGuGun: worksheet[`U${i}`] !== undefined ? worksheet[`U${i}`].w : "",
                    addrDong: worksheet[`V${i}`] !== undefined ? worksheet[`V${i}`].w : "",
                }
            );

            link.push({
                standardKedcd: worksheet[`D${i}`].w,
                targetKedcd: worksheet[`J${i}`].w,
                relation: worksheet[`N${i}`].w === "매입" ? "buy" : "sell",
                transactionAmount: worksheet[`X${i}`] !== undefined ? worksheet[`X${i}`].w : "",
            });
        }
        if (worksheet[`AB${i}`] !== undefined && worksheet[`AC${i}`] !== undefined && worksheet[`AB${i}`].w !== "") { //구매처1
            standardCompanyData.set(
                worksheet[`AB${i}`].w, {
                    kind: "",
                    companyName: worksheet[`AC${i}`].w,
                    kedcd: worksheet[`AB${i}`].w,
                    industryCode: worksheet[`AE${i}`] !== undefined ? worksheet[`AE${i}`].w : "",
                    industryName: worksheet[`AF${i}`] !== undefined ? worksheet[`AF${i}`].w : "",
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`AF${i}`] !== undefined ? worksheet[`AF${i}`].w : "",
                    scale: worksheet[`AH${i}`] !== undefined ? worksheet[`AH${i}`].w : "",
                    publicOffering: worksheet[`AI${i}`] !== undefined ? worksheet[`AI${i}`].w : "",
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`AD${i}`] !== undefined ? worksheet[`AD${i}`].w : "",
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`AB${i}`].w,
                relation: "buy",
                transactionAmount: worksheet[`AJ${i}`] !== undefined ? worksheet[`AJ${i}`].w : "",
            });
        }
        if (worksheet[`AK${i}`] !== undefined && worksheet[`AL${i}`] !== undefined && worksheet[`AK${i}`].w !== "") { //구매처2
            standardCompanyData.set(
                worksheet[`AK${i}`].w, {
                    kind: "",
                    companyName: worksheet[`AL${i}`].w,
                    kedcd: worksheet[`AK${i}`].w,
                    industryCode: worksheet[`AN${i}`] !== undefined ? worksheet[`AN${i}`].w : "",
                    industryName: worksheet[`AO${i}`] !== undefined ? worksheet[`AO${i}`].w : "",
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`AP${i}`] !== undefined ? worksheet[`AP${i}`].w : "",
                    scale: worksheet[`AQ${i}`] !== undefined ? worksheet[`AQ${i}`].w : "",
                    publicOffering: worksheet[`AR${i}`] !== undefined ? worksheet[`AR${i}`].w : "",
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`AM${i}`] !== undefined ? worksheet[`AM${i}`].w : "",
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`AK${i}`].w,
                relation: "buy",
                transactionAmount: worksheet[`AS${i}`] !== undefined ? worksheet[`AS${i}`].w : "",
            });
        }
        if (worksheet[`AT${i}`] !== undefined && worksheet[`AU${i}`] !== undefined && worksheet[`AT${i}`].w !== "") { //구매처3
            standardCompanyData.set(
                worksheet[`AT${i}`].w, {
                    kind: "",
                    companyName: worksheet[`AU${i}`].w,
                    kedcd: worksheet[`AT${i}`].w,
                    industryCode: worksheet[`AW${i}`] !== undefined ? worksheet[`AW${i}`].w : "",
                    industryName: worksheet[`AX${i}`] !== undefined ? worksheet[`AX${i}`].w : "",
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`AY${i}`] !== undefined ? worksheet[`AY${i}`].w : "",
                    scale: worksheet[`AZ${i}`] !== undefined ? worksheet[`AZ${i}`].w : "",
                    publicOffering: worksheet[`BA${i}`] !== undefined ? worksheet[`BA${i}`].w : "",
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`AV${i}`] !== undefined ? worksheet[`AV${i}`].w : "",
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`AT${i}`].w,
                relation: "buy",
                transactionAmount: worksheet[`BB${i}`] !== undefined ? worksheet[`BB${i}`].w : "",
            });
        }

        if (worksheet[`BC${i}`] !== undefined && worksheet[`BD${i}`] !== undefined && worksheet[`BC${i}`].w !== "") { //판매처1
            standardCompanyData.set(
                worksheet[`BC${i}`].w, {
                    kind: "",
                    companyName: worksheet[`BD${i}`].w,
                    kedcd: worksheet[`BC${i}`].w,
                    industryCode: worksheet[`BF${i}`] !== undefined ? worksheet[`BF${i}`].w : "",
                    industryName: worksheet[`BG${i}`] !== undefined ? worksheet[`BG${i}`].w : "",
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`BH${i}`] !== undefined ? worksheet[`BH${i}`].w : "",
                    scale: worksheet[`BI${i}`] !== undefined ? worksheet[`BI${i}`].w : "",
                    publicOffering: worksheet[`BJ${i}`] !== undefined ? worksheet[`BJ${i}`].w : "",
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`BE${i}`] !== undefined ? worksheet[`BE${i}`].w: "",
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`BC${i}`].w,
                relation: "sell",
                transactionAmount: worksheet[`BL${i}`] !== undefined ? worksheet[`BL${i}`].w : "",
            });
        }

        if (worksheet[`BL${i}`] !== undefined && worksheet[`BM${i}`] !== undefined && worksheet[`BL${i}`].w !== "") { //판매처2
            standardCompanyData.set(
                worksheet[`BL${i}`].w, {
                    kind: "",
                    companyName: worksheet[`BM${i}`].w,
                    kedcd: worksheet[`BL${i}`].w,
                    industryCode: worksheet[`BO${i}`] !== undefined ? worksheet[`BO${i}`].w : "",
                    industryName: worksheet[`BP${i}`] !== undefined ? worksheet[`BP${i}`].w : "",
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`BQ${i}`] !== undefined ? worksheet[`BQ${i}`].w : "",
                    scale: worksheet[`BR${i}`] !== undefined ? worksheet[`BR${i}`].w : "",
                    publicOffering: worksheet[`BS${i}`] !== undefined ? worksheet[`BS${i}`].w : "",
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`BN${i}`] !== undefined ? worksheet[`BN${i}`].w : "",
                    addrGuGun: "",
                    addrDong: "",
                }
            );

            link.push({
                standardKedcd: worksheet[`J${i}`].w,
                targetKedcd: worksheet[`BL${i}`].w,
                relation: "sell",
                transactionAmount: worksheet[`BT${i}`] !== undefined ? worksheet[`BT${i}`].w : "",
            });
        }

        if (worksheet[`BU${i}`] !== undefined && worksheet[`BV${i}`] !== undefined && worksheet[`BU${i}`].w !== "") { //판매처3
            standardCompanyData.set(
                worksheet[`BU${i}`].w, {
                    kind: "",
                    companyName: worksheet[`BV${i}`].w,
                    kedcd: worksheet[`BU${i}`].w,
                    industryCode: worksheet[`BX${i}`] !== undefined ? worksheet[`BX${i}`].w : "",
                    industryName: worksheet[`BY${i}`] !== undefined ? worksheet[`BY${i}`].w : "",
                    corporationNum : "",
                    businessNum : "",
                    sales_2019: worksheet[`BZ${i}`] !== undefined ? worksheet[`BZ${i}`].w : "",
                    scale: worksheet[`CA${i}`] !== undefined ? worksheet[`CA${i}`].w : "",
                    publicOffering: worksheet[`CB${i}`] !== undefined ? worksheet[`CB${i}`].w : "",
                    establishment: "",
                    product: "",
                    state: "",
                    addrSiDo: worksheet[`BW${i}`] !== undefined ? worksheet[`BW${i}`].w : "",
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
                conn.query("select * from whasung.node where kedcd = "+item.kedcd)
                    .then(res => {
                        if (res.length !== 0) {
                            ++i;
                            console.log("skip : " + item.companyName)
                        } else {
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
                        }
                    })
            })
        );
        go(link,
            forEach(item => {
                conn.query(`select * from whasung.link where standardKedcd = ${item.standardKedcd} and targetkedcd = ${item.targetKedcd} and relation = '${item.relation}'`)
                    .then(res => {
                        if (res.length !== 0) {
                            ++i;
                            console.log("link skip : " +item.standardKedcd+ " : " +item.targetKedcd+ " : " +item.relation)
                        } else {
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
                        }
                    })
            })
        );
    })
    .catch(err => {console.log(err)});
