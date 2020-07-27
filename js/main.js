const lat = '-34.651';
const lon = '-58.622';
const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=b11a2cba6daf36f38a00247eaef3851b&units=metric`;
const iconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature-value");
const maxTemperatureElement = document.querySelector(".max-temp");
const minTemperatureElement = document.querySelector(".min-temp");
const temperatureDescriptionElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");
const humidityDescrElement = document.querySelector(".value-humidity");
const pressureValueElement = document.querySelector(".value-pressure");
const windValueElement = document.querySelector(".value-wind");
const sunriseValueElement = document.querySelector(".value-sunrise");
const sunsetValueElement = document.querySelector(".value-sunset");
const daytimeValueElement = document.querySelector(".value-daytime");
const cityImageElement = document.querySelector(".img-fluid");
const cityElement = document.getElementById("place");

const weather = {};

function getWeather() {
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.icon = data.current.weather[0].icon;
            weather.sunrise = data.current.sunrise;
            weather.sunset = data.current.sunset;
            weather.daytime = data.current.dt;
            weather.humidity = data.current.humidity;
            weather.pressure = data.current.pressure;
            weather.windSpeed = data.current.wind_speed;
            weather.description = data.current.weather[0].description;
            weather.max = Math.round(data.daily[0].temp.max);
            weather.min = Math.round(data.daily[0].temp.min);
            weather.temperature = Math.round(data.current.temp);
        })
        .then(function () {
            displayWeather();
        });
    console.log(api);
}

function displayWeather() {
    // daytimeValueElement.innerHTML =
    pressureValueElement.innerHTML = `${weather.pressure}` + "mBar";
    windValueElement.innerHTML = `${weather.windSpeed}` + " km/H";
    humidityDescrElement.innerHTML = `${weather.humidity}` + " %";
    temperatureElement.innerHTML = `${weather.temperature}`;
    temperatureDescriptionElement.innerHTML = weather.description;
    maxTemperatureElement.innerHTML = `${weather.max}` + "°C ↑";
    minTemperatureElement.innerHTML = `${weather.min}` + "°C ↓";

    var currentClimaIcon = new Image();
    currentClimaIcon.id = "currentIcon";
    currentClimaIcon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    iconElement.append(currentClimaIcon);

    var localPlace = new Image();
    localPlace.src = "/images/icons/dist/Facebook Places.png";
    cityElement.append(localPlace)

    var sunsetTime = new Date(parseInt(weather.sunset * 1000))
    sunsetValueElement.innerHTML = getPmAm(sunsetTime);

    var sunriseTime = new Date(parseInt(weather.sunrise * 1000))
    sunriseValueElement.innerHTML = getPmAm(sunriseTime);
    
    var daytime = new Date(parseInt(weather.daytime) * 1000)
    daytimeValueElement.innerHTML = daytime.toString().substr(16, 5);
    
}

var dateTime = new Date();
document.getElementById("date").innerHTML = `${daysToString()} ${dateTime.getDate()} ${monthsToString()} ${dateTime.getFullYear()}`;
document.getElementById("time").innerHTML = `${getPmAm(dateTime)}`;

function getPmAm(date){
    var hrs = date.getHours();
    var min = date.getMinutes();
    var when = 'AM';
    
    if (hrs > 12) {
        hrs = hrs - 12;
        when = 'PM';
    }
    
    if (hrs == 0) {
        hrs = 12;
    }
    if (min < 10) {
        min = '0' + min;
    }
    return (`${hrs}:${min} ${when}`)
}

// var cityImageTime = new Image();
// cityImageTime.id = "cityNight"
// cityImageTime.alt="Responsive Image";
// if (when == 'AM')
// cityImageTime.src = "/images/graphic.png";
// else {
//     cityImageTime.src = "/images/niht-4931189_1280.png";
// }

// cityImageElement.append(cityImageTime);

function daysToString() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dateTime.getDay()]
}

function monthsToString() {
    const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthsNames[dateTime.getMonth()]
}

function init() {
    getWeather();
}
document.addEventListener('DOMContentLoaded', init());