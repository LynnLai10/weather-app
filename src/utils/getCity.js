const request = require('request')

const getCity = (longitude, latitude, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
        + longitude + ',' + latitude
        + '.json?types=place&limit=1&access_token=pk.eyJ1IjoibHlsbHlubiIsImEiOiJjazgyczIzcm0wMnRiM2xvZzNzbG93ZXB4In0.nTb-8kocnYTBVsuZ3oavxw'
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect the location server!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location!', undefined)
        } else {
            const { center, text, context } = response.body.features[0]
            const country = context[context.length-1].text
            const location = {
                city: text,
                country: country === text ? '':country
            }
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location
            })
        }
    })
}

module.exports = getCity