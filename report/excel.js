//const Excel = require('exceljs');
const XlsxTemplate = require('xlsx-template-ex');
const business = require('moment-business');
const moment = require('moment');
const path = require('path');
const modelSheet = path.join(__dirname, '/model.xlsx');
const fs = require('fs');


const exportToExcel = (timeSpan) => {
        let dates = timeSpan
        .map((time, day) => {
            let index1 = 4 * (day + 2);
            let begin = time.begin ? time.begin._text : null;
            let end = time.end ? time.end._text : null;
            let date = begin ? moment(begin) : null;
            index1 = index1.toString();
            if(date && business.isWeekDay(date)){
                date = date.format("ddd, D MMM YY");
                begin = moment(begin).format("HH:mm");
                end = moment(end).format("HH:mm");
                return {date, begin, end}
            } else return null
        })
        .filter(v => v !== null)
        let data = {time: dates}
        XlsxTemplate.xlsxBuildByTemplate(data, modelSheet)
            .then((buffer) => fs.writeFileSync('./report/out.xlsx', buffer))
            .catch((error) => console.log('xlsxHelper error:', error));
}

exports.exportToExcel = exportToExcel;