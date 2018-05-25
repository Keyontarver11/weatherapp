// declare variables
var ROOT_URL = 'http://api.openweathermap.org/data/2.5/weather?zip='
var API_KEY = '5b8b7ba0038601680bea61610c7af662'
var cityTitle = document.querySelector(".cityTitle")
var zip = document.querySelector(".zip")
var weather = document.querySelector(".weather")
var icon = document.querySelector(".icon")
var temp = document.querySelector(".temp")
var humid = document.querySelector(".humid")
var degree = document.querySelector(".deg")
var button = document.querySelector(".submit")
var fc
var icons = {
    "Clouds":"img/cloudy.png",
    "Clear": "img/sun.png",
    "Rain": "img/rain.png",
    "Thunderstorm": "img/thunderstorm.png",
    "Partly Cloudy": "img/partly-cloudy.png",
    "Snow":"img/snow.png"
}










// define functions
function iconSelector(weather){
    
    return icons[weather]

    
    
}

function celsToFaren(cels){
return Math.round((cels * 1.8) + (32))
}

function farenToCelsius(faren){
return Math.round((faren - 32) * (.5556))
}

function kelvinToFaren(kelvin){
    return Math.round(kelvin * 1.8 - 459.67)
};
function getWeather(zipCode) {
    console.log(zipCode)
    $.ajax({
        url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            cityTitle.textContent = data.name
            weather.textContent = data.weather[0].main
            temp.textContent = kelvinToFaren(data.main.temp)
            icon.src = iconSelector(data.weather[0].main)
            humid.textContent = data.main.humidity
            fc = "f"
            

        },
        error: function (error) {
            console.log("error")
        }
    })
}





getWeather('33055')


// call functions add event listeners
zip.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getWeather(zip.value)
    }
})

button.addEventListener('click',function(e){
    if(fc === "f"){
        temp.textContent = farenToCelsius(temp.textContent)
        degree.innerHTML = '&deg; C'
        button.textContent = 'Convert to F'
        fc = "c"
    }  else {
        temp.textContent =celsToFaren(temp.textContent)
        degree.innerHTML = '&deg; F'
        button.textContent = 'Convert to C'
        fc="f"
    }
})

