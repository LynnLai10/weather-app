const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const cityMesg = document.querySelector('#city')
const countryMesg = document.querySelector('#country')

fetch('/bg').then(response => {
    console.log('trigged')
    response.json().then(data => {
        if(data.error) {
            console.log('Unable to get background image.')
        } else {
            document.getElementById('bg-container').style.backgroundImage = "url("+data.data.url+")"
            document.getElementById('bg-content').style.backgroundImage = "url("+data.data.url+")"
            document.getElementById('imgAuthor').textContent = `Photo: ${data.data.userName}`
        }
    })
})

cityMesg.textContent = 'Loading...'
countryMesg.textContent = ''

//Render 7 days default 
const panel = document.getElementById('panel')
for ( let i = 0 ; i < 7 ; i++ ) {
    panel.innerHTML += `
        <div class="col-lg-1.5 mt-2 ml-4 text-center">
            <p class="h4 pb-2">-</p>
            <i class="fas fa-sun fa-3x"></i>
            <p class="pt-3 h5">
                <span id="temperatureLow0">  </span>
                -
                <span id="temperatureHigh0">  </span>
            </p>
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
            <div class="col-lg-1.5 mt-2 ml-2 mr-1 text-center ">
                <p class="h4 pb-2">${data[i].time}</p>
                <i class="fas ${data[i].icon} fa-3x"></i>
                <p class="pt-3 h5">
                    <span id="temperatureLow0">${data[i].temperatureLow}</span>&deg;
                    -
                    <span id="temperatureHigh0">${data[i].temperatureHigh}</span>&deg;
                </p>
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
    console.log(cityMesg.textContent)
    const location = search.value
    const url = `/weather?address=${location}`
    cityMesg.textContent = 'Loading...'
    countryMesg.textContent = ''
    fetchData(url)
    search.value = ''
})