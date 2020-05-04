const request = require('request')

const getBgImg = (callback) => {
    const url = 'https://api.unsplash.com/photos/random?query=nature&orientation=landscape&per_page=1&client_id=vTZlMYiWsZObTT5shoxFjZx0CHPmQW_y0itXGU-N8tg'
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect the location server!', undefined)
        } else {
            callback(undefined, {
                url: response.body.urls.regular,
                userName: response.body.user.name
            })
        }

    })
}

module.exports = getBgImg