const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const cityMesg = document.querySelector('#city')
const countryMesg = document.querySelector('#country')

cityMesg.textContent = 'Loading...'
countryMesg.textContent = ''
//render 7 days default 
const panel = document.getElementById('panel')
for ( let i = 0 ; i < 7 ; i++ ) {
    panel.innerHTML += `
        <div class="col-lg-1.5 mt-2 ml-4 text-center">
            <p class="h4 pb-2">Today</p>
            <i class="fas fa-sun fa-3x"></i>
            <p class="pt-3 h5">
                <span id="temperatureLow0">  </span>
                -
                <span id="temperatureHigh0">  </span>
            </p>
        </div>
    `
}

const renderCurrently = (data) => {
    const keys = Object.keys(data) 
    console.log(data, keys)
    for( let i = 0 ; i < keys.length ; i++ ) {
        const key = keys[i]
        if (key === 'icon') {
            let iconName = ''
            switch (data[key]) {
                case 'clear-day':
                    iconName = 'sun';
                case 'clear-night':
                    iconName = 'moon';
                case 'rain':
                    iconName = 'cloud-rain';
                case 'cloudy':
                    iconName = 'cloud';
                case 'sleet':
                    iconName = 'cloud-showers-heavy';
                case 'wind':
                    iconName = 'wind';
                case 'snow':
                    iconName = 'snowflake';
                case 'fog':
                    iconName = 'smog';
                case 'partly-cloudy-day':
                    iconName = 'cloud-sun';
                case 'partly-cloudy-night': 
                    iconName = 'cloud-moon'
            }
            document.getElementById(key).classList.replace('fa-sun', `fa-${iconName}`)
        } else {
            document.getElementById(key).textContent = data[key]  
        }
    }
}

const renderDaily = (data) => {
    panel.innerHTML = ''
    for ( let i = 0 ; i < data.length ; i++ ) {
        console.log(i)
        panel.innerHTML += `
            <div class="col-lg-1.5 mt-2 ml-2 text-center">
                <p class="h4 pb-2">${data[i].time}</p>
                <i class="fas fa-sun fa-3x"></i>
                <p class="pt-3 h5">
                    <span id="temperatureLow0">${data[i].temperatureLow}</span>&deg;
                    -
                    <span id="temperatureHigh0">${data[i].temperatureHigh}</span>&deg;
                </p>
            </div>
        `
    }
}

const fetchData = (url) => {
    console.log(url)
    fetch(url).then(response => {
        response.json().then(data => {
            if(data.error) {
                cityMesg.textContent = data.error
            } else {
                cityMesg.textContent = data.city
                countryMesg.textContent = data.country
                renderCurrently(data.currently)
                renderDaily(data.daily)   
            }
        })
    })
}

const myWeather = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const url = `/weather?longitude=${longitude}&latitude=${latitude}`
    fetchData(url)
}

navigator.geolocation.getCurrentPosition(myWeather)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(cityMesg.textContent)
    const location = search.value
    const url = `/weather?address=${location}`
    cityMesg.textContent = 'Loading...'
    countryMesg.textContent = ''
    fetchData(url)
    search.value = ''
})