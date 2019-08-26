const fs = require('fs');
const {getTimeSpan, loopMonth} = require('./time.js')
const config = require('./config')
const {exportToExcel} = require('./report/excel');
const d = config.DAY;

if(d){
    getTimeSpan(day).then((timeSpan) => console.log(timeSpan));
} else {
    loopMonth()
        .then(timeSpan => {
                exportToExcel(timeSpan)
            })
        .catch(e => console.error(e))
};




/* fs.writeFile("folha.txt", fl, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); */