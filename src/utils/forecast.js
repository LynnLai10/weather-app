const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/1d7d2f251ee651309ee8ff9f032fa5eb/${latitude},${longitude}?units=si&exclude=[minutely,hourly,alerts,flags]`
    
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather server!', undefined, undefined)
        } else if (response.body.error) {
            callback('Unable to find the location!', undefined, undefined)
        } else {
            let { currently, daily } = response.body
            callback(undefined, {
                currently,
                daily
            })
        }
    })
}

module.exports = forecast