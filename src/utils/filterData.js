const moment = require('moment')
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const filterData = (originalData, keys) => {
    const filteredData = []
    for ( i = originalData.length === 1? 0 : 1  ; i < originalData.length ; i++ ) {
        const data = originalData[i]
        const filteredDatum = {}
        for( j = 0 ; j < keys.length ; j++ ) {
            const key = keys[j]
            switch (key) {
                case 'time': 
                    if ( i === 1 ) {
                        filteredDatum[key] = 'Today'
                    } else {
                        filteredDatum[key] = dayOfWeek[moment.unix(data[key]).day()];
                    }
                    break;
                case 'temperature': 
                    filteredDatum[key] = Math.round(data[key]);
                    break;
                case 'humidity':
                    filteredDatum[key] = Math.floor(data[key] * 100);
                    break;
                case 'precipProbability':
                    filteredDatum[key] = Math.floor(data[key] * 100);
                    break;
                case 'temperatureLow': 
                    filteredDatum[key] = Math.round(data[key]);
                    break; 
                case 'temperatureHigh': 
                    filteredDatum[key] = Math.round(data[key]);
                    break; 
                default: 
                    filteredDatum[key] = data[key];
            }   
        }
        filteredData.push(filteredDatum)
    }
    return filteredData
}

module.exports = filterData