const axios = require('axios');
var convert = require('xml-js');
const config = require('./config')

if (config.COOKIE === "") throw new Error("Please provide your cookie in settings.js");
const headers = { 'Cookie':  config.COOKIE};
const today = new Date();
let m = config.MONTH ? config.MONTH - 1 : today.getMonth();
let y = config.YEAR || today.getFullYear();

const getTimeSpan = (d) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.google.com/maps/timeline/kml?authuser=0^&pb=!1m8!1m3!1i${y}!2i${m}!3i${d}!2m3!1i${y}!2i${m}!3i${d}`, { headers })
            .then(response => {
                let result = JSON.parse(convert.xml2json(response.data, { compact: true }));
                let timeSpan = {};
                if (!result.kml.Document.Placemark) return resolve(timeSpan)
                if (Array.isArray(result.kml.Document.Placemark)) {
                    result.kml.Document.Placemark.forEach(place => {
                        if (place.name._text.search('Trabalho') === 0) {
                            timeSpan = place.TimeSpan;
                        }
                    });
                } else timeSpan = result.kml.Document.Placemark.TimeSpan;
                return resolve(timeSpan)
            })
            .catch(error => {
                return reject(error.message)
            })
    })
}

const loopMonth = async () => {
    let month = []
    let days = [...Array(31).keys()].slice(1);
    for (let day of days) 
        await getTimeSpan(day).then((timeSpan) => month.push(timeSpan))
    console.log(month)
}

exports.loopMonth = loopMonth;
exports.getTimeSpan = getTimeSpan;