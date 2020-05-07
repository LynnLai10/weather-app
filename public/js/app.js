const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const cityMesg = document.querySelector('#city')
const countryMesg = document.querySelector('#country')

const fetchBg = () => {
    fetch('/bg').then(response => {
        response.json().then(data => {
            if(data.error) {
                console.log('Unable to get background image.')
                document.getElementById('container').style.backgroundImage = "url('../img/bg.jpg')"
            } else {
                document.getElementById('container').style.backgroundImage = "url("+data.data.url+")"
                document.getElementById('imgAuthor').textContent = `Photo: ${data.data.userName}`
            }
        })
    })
}

fetchBg()
cityMesg.textContent = 'Loading...'
countryMesg.textContent = ''

//Render 7 days default 
const panel = document.getElementById('panel')
for ( let i = 0 ; i < 7 ; i++ ) {
    panel.innerHTML += `
        <div class="forecast-items">
            <h3 class="forecast-item">Today</h3>
            <i class="fas fa-sun fa-2x forecast-item"></i>
            <h3 class="forecast-item"> &deg;- &deg;</h3>
        </div>
    `
}
//Render Currently Data
const renderCurrently = (data) => {
    const keys = Object.keys(data) 
    for( let i = 0 ; i < keys.length ; i++ ) {
        const key = keys[i]
        if (key === 'icon') {
            document.getElementById(key).classList.replace('fa-sun', data[key])
        } else {
            document.getElementById(key).textContent = data[key]
        }
    }
}
//Render Daily Data
const renderDaily = (data) => {
    panel.innerHTML = ''
    for ( let i = 0 ; i < 7 ; i++ ) {
        panel.innerHTML += `
            <div class="forecast-items">
                <h3 class="forecast-item">${data[i].time}</h3>
                <i class="fas ${data[i].icon} fa-2x forecast-item"></i>
                <h3 class="forecast-item">${data[i].temperatureLow}&deg;-${data[i].temperatureHigh}&deg;</h3>
            </div>
        `
    }
}
//Fetch Weather Data
const fetchData = (url) => {
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
    fetchBg()
    const location = search.value.trim().replace(' ','')
    const url = `/weather?address=${location}`
    cityMesg.textContent = 'Loading...'
    countryMesg.textContent = ''
    fetchData(url)
    search.value = ''
})