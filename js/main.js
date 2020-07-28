const lat = '-34.651';
const lon = '-58.622';
const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=b11a2cba6daf36f38a00247eaef3851b&units=metric`;
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

const dayOneIconElement = document.querySelector(".weather-iconDay1");
const dayTwoIconElement = document.querySelector(".weather-iconDay2");
const dayThrIconElement = document.querySelector(".weather-iconDay3");
const day1Element = document.querySelector(".nextDay1")
const day2Element = document.querySelector(".nextDay2")
const day3Element = document.querySelector(".nextDay3")
const iconElement = document.querySelector(".weather-icon");

const weather = {};

function getWeather() {
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.dayOneIcon = data.daily[1].weather[0].icon;
            weather.maxProxDay1Temperature = Math.round(data.daily[1].temp.max);
            weather.minProxDay1Temperature = Math.round(data.daily[1].temp.min);
            weather.dayTwoIcon = data.daily[2].weather[0].icon;
            weather.maxProxDay2Temperature = Math.round(data.daily[2].temp.max);
            weather.minProxDay2Temperature = Math.round(data.daily[2].temp.min);
            weather.dayThrIcon = data.daily[3].weather[0].icon;
            weather.maxProxDay3Temperature = Math.round(data.daily[3].temp.max);
            weather.minProxDay3Temperature = Math.round(data.daily[3].temp.min);
            weather.icon = data.current.weather[0].icon;
            weather.sunrise = data.current.sunrise;
            weather.sunset = data.current.sunset;
            weather.daytime = data.current.dt;
            weather.humidity = data.current.humidity;
            weather.pressure = data.current.pressure;
            weather.windSpeed = data.current.wind_speed;
            weather.description = data.current.weather[0].main;
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


    document.getElementById("maxMin1").innerHTML = `${weather.maxProxDay1Temperature}` + "°C↑" + " " + `${weather.minProxDay1Temperature}` + "°C↓";
    document.getElementById("maxMin2").innerHTML = `${weather.maxProxDay2Temperature}` + "°C↑" + " " + `${weather.minProxDay2Temperature}` + "°C↓";
    document.getElementById("maxMin3").innerHTML = `${weather.maxProxDay3Temperature}` + "°C↑" + " " + `${weather.minProxDay3Temperature}` + "°C↓";
    pressureValueElement.innerHTML = `${weather.pressure} mBar`;
    windValueElement.innerHTML = `${weather.windSpeed} km/H`;
    humidityDescrElement.innerHTML = `${weather.humidity}%`;
    temperatureElement.innerHTML = `${weather.temperature}`;
    temperatureDescriptionElement.innerHTML = weather.description;
    maxTemperatureElement.innerHTML = `${weather.max}°C↑`;
    minTemperatureElement.innerHTML = `${weather.min}°C↓`;

    var currentIcon = new Image();
    currentIcon.id = "currentIcon";
    currentIcon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    iconElement.append(currentIcon);

    var iconDay1 = new Image();
    iconDay1.id = "proxDay1Id";
    iconDay1.src = `http://openweathermap.org/img/wn/${weather.dayOneIcon}@2x.png`;
    dayOneIconElement.append(iconDay1);

    var iconDay2 = new Image();
    iconDay2.id = "proxDay2Id";
    iconDay2.src = `http://openweathermap.org/img/wn/${weather.dayTwoIcon}@2x.png`;
    dayTwoIconElement.append(iconDay2);

    var iconDay3 = new Image();
    iconDay3.id = "proxDay3Id";
    iconDay3.src = `http://openweathermap.org/img/wn/${weather.dayThrIcon}@2x.png`;
    dayThrIconElement.append(iconDay3);

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

function getPmAm(date) {
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

var dateTime = new Date();
var weekday = new Array(7);
weekday[6] = "Sun";
weekday[0] = "Mon";
weekday[1] = "Tue";
weekday[2] = "Wed";
weekday[3] = "Thu";
weekday[4] = "Fri";
weekday[5] = "Sat";

var n = weekday[dateTime.getDay()];

document.getElementById("date").innerHTML = `${daysToString()} ${dateTime.getDate()} ${monthsToString()} ${dateTime.getFullYear()}`;
document.getElementById("time").innerHTML = `${getPmAm(dateTime)}`;
document.getElementById("shortDay1").innerHTML = `${weekday[dateTime.getDay()]},${dateTime.getDate()}`;
document.getElementById("shortDay2").innerHTML = `${weekday[dateTime.getDay() + 1 ]},${dateTime.getDate() + 1}`;
document.getElementById("shortDay3").innerHTML = `${weekday[dateTime.getDay() + 2 ]},${dateTime.getDate() + 2}`;

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


// Put night sky after 18PM

// var cityImageTime = new Image();
// cityImageTime.id = "cityNight"
// cityImageTime.alt="Responsive Image";
// if (when == 'AM')
// cityImageTime.src = "/images/graphic.png";
// else {
//     cityImageTime.src = "/images/niht-4931189_1280.png";
// }

// cityImageElement.append(cityImageTime);