const path = require('path')
const express = require('express')
const getLocation = require('./utils/getLocation')
const forecast = require('./utils/forecast')
const getCity = require('./utils/getCity')
const filterData = require('./utils/filterData')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

const currentlyKeys = [
    'icon',
    'temperature',
    'windSpeed',
    'humidity',
    'precipProbability'
]
const dailyKeys = [
    'icon',
    'time',
    'temperatureLow',
    'temperatureHigh'
]

app.get('/weather', (req, res) => {
    if (req.query.address) {


        return getLocation (req.query.address, (error, { latitude, longitude, location }= {}) => {
            if (error) {
                return res.send({ error })
            }
            const { city, country } = location
            forecast( longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                const daily = filterData(forecastData.daily.data, dailyKeys)
                const currently = filterData([forecastData.currently], currentlyKeys)[0]

                return res.send({ 
                    city,
                    country,
                    currently,
                    daily,
                })
            })
        })  
    }

    if (req.query.longitude && req.query.latitude) {
        const { longitude, latitude } = req.query
        return getCity(longitude, latitude, (error, { location } = {}) => {
            if (error) {
                return error
            }
            const { city, country } = location
            forecast( longitude, latitude, (error, forecastData) => {
                if (error) {
                    return error
                }
                const daily = filterData(forecastData.daily.data, dailyKeys)
                const currently = filterData([forecastData.currently], currentlyKeys)[0]
                return res.send({ 
                    city,
                    country,
                    currently,
                    daily,
                })
            })
        })
    }  
})

app.listen(port, () => {
    console.log('Server is up on port 3000.' + port)
})