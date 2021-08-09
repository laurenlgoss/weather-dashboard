var searchButtonEl = document.querySelector("#custom-search-button");
var cityInputEl = document.querySelector("#city-input")

var cityButtonContainerEl = document.querySelector(".custom-city-button-container");

var currentWeatherTitleEl = document.querySelector("#current-weather-title");
var currentWeatherIconEl = document.querySelector("#current-weather-icon");
var currentDateEl = document.querySelector("#current-date");
var currentTempEl = document.querySelector("#current-temp");
var currentWindSpeedEl = document.querySelector("#current-wind-speed");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUVIEl = document.querySelector("#current-uvi");

var forecastDateElArray = document.querySelectorAll(".forecast-date");
var forecastIconElArray = document.querySelectorAll(".forecast-icon");
var forecastTempElArray = document.querySelectorAll(".forecast-temp");
var forecastWindElArray = document.querySelectorAll(".forecast-wind");
var forecastHumidityElArray = document.querySelectorAll(".forecast-humidity");

const currentDate = moment();

// Create array for local storage
var storedCityArray = JSON.parse(localStorage.getItem("city")) || [];

function init() {
    // Add event listener to search button
    searchButtonEl.addEventListener("click", getUserInput);

    renderCityButtons();
}

// Get user input
function getUserInput(event) {
    // If a history button is clicked,
    if (event.target.classList.contains("custom-history-button")) {
        handleSearch(event.target.textContent);
    }
    // If the search button is clicked and input is populated,
    else if (cityInputEl.value !== "") {
        var uppercaseCity = capitalizeFirstLetter(cityInputEl.value.trim());

        // Push city input into local storage array
        storedCityArray.push(uppercaseCity);
        localStorage.setItem("city", JSON.stringify(storedCityArray));
        
        renderCityButtons();
        handleSearch(uppercaseCity);
    }
}

// Capitalize first letter of inputted string
function capitalizeFirstLetter(string) {
    var stringArray = string.split(" ");

    for (var i = 0; i < stringArray.length; i++) {
        stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
    }

    return stringArray.join(" ");
}

// Render city buttons to page
function renderCityButtons() {
    // Empty button container
    cityButtonContainerEl.innerHTML = "";

    // Render only last 10 search results
    var limitedStorageArray = storedCityArray.slice(0, 10);

    // Remove duplicate cities
    var uniqueCityArray = limitedStorageArray.filter((v, i, a) => a.indexOf(v) === i);

    // Render city buttons
    uniqueCityArray.forEach(city => {
        var cityButton = document.createElement("button");
        cityButton.setAttribute("class", "btn btn-secondary custom-history-button");
        cityButton.textContent = city;
        cityButtonContainerEl.appendChild(cityButton);
    
        // Add event listener to city buttons
        cityButton.addEventListener("click", getUserInput);
    })
}

function handleSearch(cityInput) {
    // Render city name and current date to current weather card
    var currentWeatherTitle = cityInput + " (" + currentDate.format("M/D/YYYY") + ")";
    currentWeatherTitleEl.textContent = currentWeatherTitle;

    fetchLatLon(cityInput);
}

// Get latitude/longitude of city input
function fetchLatLon(cityInput) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=c8aa884e6f28d929f55e9ba1856815bd")
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
            // Get current weather
            var currentWeather = {
                weatherIcon: "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png",
                temp: data.current.temp + " F",
                windSpeed: data.current.wind_speed + " MPH",
                humidity: data.current.humidity + "%",
                UVI: data.current.uvi,
            };

            var forecastArray = [];
            // Get 5-day forecast weather, push objects into forecastArray
            for (var i = 0; i < 5; i++) {
                forecastArray.push(
                    {
                        weatherIcon: "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png",
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

    // Color code UVI
    if (currentWeather.UVI < 3) {
        currentUVIEl.setAttribute("class", "card-text btn btn-success");
    } else if (currentWeather.UVI > 3 && currentWeather.UVI < 5) {
        currentUVIEl.setAttribute("class", "card-text btn btn-warning");
    } else {
        currentUVIEl.setAttribute("class", "card-text btn btn-danger");
    }
}

// Render forecast to page
function renderForecast(forecastArray) {
    for (var i = 0; i < forecastArray.length; i++) {
        // Render future dates
        var forecastDates = [
            currentDate.clone().add(1, "days"),
            currentDate.clone().add(2, "days"),
            currentDate.clone().add(3, "days"),
            currentDate.clone().add(4, "days"),
            currentDate.clone().add(5, "days"),
        ];
        forecastDateElArray[i].textContent = forecastDates[i].format("M/D/YYYY");

        // Render forecast weather
        forecastIconElArray[i].setAttribute("src", forecastArray[i].weatherIcon);
        forecastTempElArray[i].textContent = forecastArray[i].temp;
        forecastWindElArray[i].textContent = forecastArray[i].windSpeed;
        forecastHumidityElArray[i].textContent = forecastArray[i].humidity;
    }
}

init();