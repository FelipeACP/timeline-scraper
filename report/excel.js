const Excel = require('exceljs');
const business = require('moment-business');
const moment = require('moment');
const path = require('path');
const modelSheet = path.join(__dirname, '/model.xlsx');

let workbook = new Excel.Workbook();
workbook.addWorksheet("Extrato de Banco de horas");

const exportToExcel = (timeSpan) => {
    workbook.xlsx.writeFile(modelSheet)
        .then(() => {
            var worksheet = workbook.getWorksheet(1);
            timeSpan.forEach((time, day) => {
                let index1 = 4 * (day + 2);
                let begin = time.begin ? time : null;
                let end = time.end ? time.end : null;
                let date = begin ? moment(begin) : null;
                index1 = index1.toString();
                if(date && business.isWeekDay(date)){
                    worksheet.getCell('B' + index1).value = date.format("ddd, D MMM YY");
                    worksheet.getCell('C' + index1).value = moment(begin).format("HH:mm");
                    worksheet.getCell('D' + index1).value = moment(end).format("HH:mm");
                }
            })
        })
        .catch(e => console.error(e))
}

exports.exportToExcel = exportToExcel;