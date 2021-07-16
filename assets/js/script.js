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
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=c8aa884e6f28d929f55e9ba1856815bd")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Get current weather
            var currentWeather = {
                weatherIcon: "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png",
                temp: data.current.temp + " F",
                windSpeed: data.current.wind_speed + " MPH",
                humidity: data.current.humidity + "%",
                UVI: data.current.uvi,
            };

            var forecastArray = [];
            // Get 5-day forecast weather, push objects into forecastArray
            for (i = 0; i < 5; i++) {
                forecastArray.push(
                    {
                        weatherIcon: "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png",
                        temp: data.daily[i].temp.max + " F",
                        windSpeed: data.daily[i].wind_speed + " MPH",
                        humidity: data.daily[i].humidity + "%",
                    }
                );
            }

            renderCurrentWeather(currentWeather);
            renderForecast(forecastArray);
        })
}

// Render current weather to page
function renderCurrentWeather(currentWeather) {
    currentWeatherIconEl.setAttribute("src", currentWeather.weatherIcon);
    currentTempEl.textContent = currentWeather.temp;
    currentWindSpeedEl.textContent = currentWeather.windSpeed;
    currentHumidityEl.textContent = currentWeather.humidity;
    currentUVIEl.textContent = currentWeather.UVI;
}

function renderForecast(forecastArray) {

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