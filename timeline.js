const fs = require('fs');
//var xl = require('excel4node');
const {getTimeSpan, loopMonth} = require('./time.js')
const config = require('./config')
const d = config.DAY;

if(d) getTimeSpan(d); else loopMonth();


/* fs.writeFile("folha.txt", fl, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); */