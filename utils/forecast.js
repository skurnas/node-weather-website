const request = require('./node_modules/request');


const forecast = (lat, long, callback) => {
    const url = ('https://api.darksky.net/forecast/95dfe6cb13eada1a6d258db0782676eb/' + lat + ',' + long)
    
    request({url, json: true} , (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service', undefined);
        } else if (body.error){
            callback('unable to find location', undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                pProb: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast;