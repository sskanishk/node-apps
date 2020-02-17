let request = require('request');
const argv = require('yargs').argv;

let apiKey = '930700b5112047269e9748757cbf35b4';
// let city = 'jaipur';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`



request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body);
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
    // console.log(response)
    // console.log(JSON.parse(body))
  }
});