var searchButtonEl = document.querySelector("#custom-search-button");
var cityInputEl = document.querySelector("#city-input")
var currentWeatherTitleEl = document.querySelector("#current-weather-title");
var currentWeatherIconEl = document.querySelector("#current-weather-icon");
var currentDateEl = document.querySelector("#current-date");
var currentTempEl = document.querySelector("#current-temp");
var currentWindSpeedEl = document.querySelector("#current-wind-speed");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUVIEl = document.querySelector("#current-uvi");

var currentDate = moment();

function init() {
    // Add event listener to search button
    searchButtonEl.addEventListener("click", handleSearch);
}

// Upon button click,
function handleSearch() {
    // Get user input
    var cityInput = cityInputEl.value.trim();

    // Render city name and current date to current weather card
    var currentWeatherTitle = cityInput + " (" + currentDate.format("M/D/YYYY") + ")";
    currentWeatherTitleEl.textContent = currentWeatherTitle;

    fetchLatLon(cityInput);
}

// Get latitude/longitude of city input
function fetchLatLon(cityInput) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=c8aa884e6f28d929f55e9ba1856815bd")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            fetchWeather(lat, lon);
        })
}

// Get weather data of latitude/longitude of city input
function fetchWeather(lat, lon) {
    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=c8aa884e6f28d929f55e9ba1856815bd")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Get current weather
            var currentWeatherIcon = data.current.weather[0].icon;
            var currentTemp = data.current.temp + " F";
            var currentWindSpeed = data.current.wind_speed + " MPH";
            var currentHumidity = data.current.humidity + "%";
            var currentUVI = data.current.uvi;

            // Get 5-day forecast weather
            var forecastWeatherIconArray = [];
            var forecastTempArray = [];
            var forecastWindSpeedArray = [];
            var forecastHumidityArray = [];

            for (var i = 0; i < 5; i++) {
                forecastWeatherIconArray.push(data.daily[i].weather[0].icon);
            }
            for (var i = 0; i < 5; i++) {
                forecastTempArray.push(data.daily[i].temp.max + " F");
            }
            for (var i = 0; i < 5; i++) {
                forecastWindSpeedArray.push(data.daily[i].wind_speed) + " MPH";
            }
            for (var i = 0; i < 5; i++) {
                forecastHumidityArray.push(data.daily[i].humidity + "%");
            }

            renderCurrentWeather(currentWeatherIcon, currentTemp, currentWindSpeed, currentHumidity, currentUVI);
        })
}

// Render current weather to current weather card
function renderCurrentWeather(currentWeatherIcon, currentTemp, currentWindSpeed, currentHumidity, currentUVI) {
    currentWeatherIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");
    
    currentTempEl.textContent = currentTemp;
    currentWindSpeedEl.textContent = currentWindSpeed;
    currentHumidityEl.textContent = currentHumidity;
    currentUVIEl.textContent = currentUVI;
}

        // Render information to page
            // Display name of city

            // Display today's date

            // Display icon representing weather conditions

            // Color code UV index

    // Fetch 5-day forecast data from API
        // Temp
        // Wind
        // Humidity

        // Render information to page
            // For each card,
                // Display future date

                // Display icon representing weather conditions

    // Add current search to local storage
        // Render cities from local storage to page

        // Add event listener to city buttons

            // Upon button click,
                // Repeat search button function with that city's input

init();