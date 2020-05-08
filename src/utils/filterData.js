const moment = require('moment')
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const filterData = (originalData, keys) => {
    const filteredData = []
    for ( i = 0  ; i < originalData.length ; i++ ) {
        const data = originalData[i]
        const filteredDatum = {}
        for( j = 0 ; j < keys.length ; j++ ) {
            const key = keys[j]
            switch (key) {
                case 'time': 
                    if ( i === 0 ) {
                        filteredDatum[key] = 'Today';
                    } else {
                        filteredDatum[key] = moment.unix(data[key]);
                    }
                    break;
                case 'temperature': 
                    filteredDatum[key] = Math.round(data[key]);
                    break;
                case 'icon':
                    let iconName = '';
                    switch (data[key]) {
                        case 'clear-day':
                            iconName = 'sun';
                            break;
                        case 'clear-night':
                            iconName = 'moon';
                            break;
                        case 'rain':
                            iconName = 'cloud-rain';
                            break;
                        case 'cloudy':
                            iconName = 'cloud';
                            break;
                        case 'sleet':
                            iconName = 'cloud-showers-heavy';
                            break;
                        case 'wind':
                            iconName = 'wind';
                            break;
                        case 'snow':
                            iconName = 'snowflake';
                            break;
                        case 'fog':
                            iconName = 'smog';
                            break;
                        case 'partly-cloudy-day':
                            iconName = 'cloud-sun';
                            break;
                        case 'partly-cloudy-night': 
                            iconName = 'cloud-moon'
                            break;
                    }
                    filteredDatum[key] = `fa-${iconName}`;
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