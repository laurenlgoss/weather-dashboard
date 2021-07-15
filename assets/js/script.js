var searchButtonEl = document.querySelector("#custom-search-button");
var cityInputEl = document.querySelector("#city-input")

function init() {

}

// Add event listener to search button
searchButtonEl.addEventListener("click", handleSearch);

// Upon button click,
function handleSearch() {
    var cityInput = cityInputEl.value.trim();

    fetchLatLon(cityInput);
}

// Get latitude/longitude of city input
function fetchLatLon(cityName) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=c8aa884e6f28d929f55e9ba1856815bd")
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
            var currentTemp = data.current.temp;
            var currentWindSpeed = data.current.wind_speed;
            var currentHumidity = data.current.humidity;
            var currentUVI = data.current.uvi;
            var currentWeatherIcon = data.current.weather[0].icon;
        })
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