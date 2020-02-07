const request = require('request')

const forecast = (latitude, longitude, callback) => {

    // console.log(lat, lon) 
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+lat+','+lon+'.json?access_token=pk.eyJ1Ijoia2FuaXNoMDciLCJhIjoiY2s2YXY3MHB4MGJqdzNvdGl0OGJpdDk2ZSJ9.nAxYshZ7tqgD3fFxnVowAg'
    const url = 'https://api.darksky.net/forecast/7ab58f556e8016bcad12a1facb508463/' + latitude + ',' + longitude + '?units=si'

    request({ url: url, json: true}, (error, response) => {

        // console.log(response.body.features.length)

        if (error){
            callback('coonect to inetnert', undefined)
        } else if(response.body.error) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, 
                
                // summary: response.body.daily.data[0].summary,
                // temperature: response.body.currently.temperature,
                // precipProbability: response.body.currently.precipProbability

            response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. \nThere is ' + response.body.currently.precipProbability + '% chance of Rain!' 

 
            )
            // console.log(response.body.daily.data[0].summary +" It is currently " + response.body.currently.temperature + " degrees out. There is " + response.body.currently.precipProbability +"% chance of Rain!")
        }
    })

}

module.exports = forecast