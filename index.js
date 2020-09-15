const XLSX = require("xlsx");
const {go, range, forEach, map} = require("fxjs/Strict");

let workbook = XLSX.readFile(__dirname + "/222.xlsx")
let worksheet = workbook.Sheets["Sheet1"]
// console.log(worksheet)
let standardCompanyData = new Set();
// 기준기업정보
go(
    range(2, 4),
    forEach(i => {
        data.add({
            kind: worksheet[`B${i}`].w,
            companyName: worksheet[`C${i}`].w,
            kedcd: worksheet[`D${i}`].w,
            industryNum: worksheet[`E${i}`].w,
            industryName: worksheet[`F${i}`].w,
            sales: worksheet[`G${i}`].w,
            scale: worksheet[`H${i}`].w,
            publicOffering: worksheet[`H${i}`].w,
        });
    }),
)

console.log(data)