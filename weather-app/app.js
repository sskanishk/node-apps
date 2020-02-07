const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const chalk = require('chalk')
// const yargs = require('yargs')
const argv = require('yargs')

// location = argv.location
// console.log(location)
// if(!argv.location){
//     return console.log("plz add")
// }

// console.log(process.argv)
const address = process.argv[2]



    if(!address){
        return console.log("Please provide an address")
    } else {
        geocode(address, (error, data) => {
            if (error) {
                return console.log(error)
            }
            
            // console.log('Error: ', error)
            // console.log('Data: ', data)
        
            forecast(data.longitude, data.latitude, (error, forecastData) => {
        
                if (error) {
                    return console.log(error)
                }
        
                console.log(chalk.green(data.location))
                console.log(chalk.green(forecastData))
                // console.log('Error', error)
                // console.log('Data', data)
            })
        
        })

    }

    