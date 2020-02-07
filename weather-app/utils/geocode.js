const request = require('request')
const yargs = require('yargs')

// const url = 'https://api.darksky.net/forecast/7ab58f556e8016bcad12a1facb508463/26.9124,75.7873?units=si'

// way - 1
// request({url: url}, (error, response) => {
//     // console.log(response)
//     const data = JSON.parse(response.body)
//     console.log(data.currently)
// })



// way - 2
// request({url: url, json: true}, (error, response) => {
//     // console.log(response.body.currently.temp)
//     if( error ) {
//         console.log('Connect to internet')
//     } else if(response.body.error){
//         console.log('unable to find location')
//     } else {
//         console.log(response.body.daily.data[0].summary +" It is currently " + response.body.currently.temperature + " degrees out. There is " + response.body.currently.precipProbability +"% chance of Rain!")
//     }
// })

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2FuaXNoMDciLCJhIjoiY2s2YXY3MHB4MGJqdzNvdGl0OGJpdDk2ZSJ9.nAxYshZ7tqgD3fFxnVowAg'
    
    request({ url: url, json: true}, (error, response) => {
        if (error){
            callback('coonect to inetnert', undefined)
        } else if(response.body.features.length === 0) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name 
            })
            // console.log(response.body.daily.data[0].summary +" It is currently " + response.body.currently.temperature + " degrees out. There is " + response.body.currently.precipProbability +"% chance of Rain!")
        }
    })
}

module.exports = geocode