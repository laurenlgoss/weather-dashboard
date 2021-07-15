var searchButtonEl = document.querySelector("#custom-search-button");
var cityInputEl = document.querySelector("#city-input")

// Add event listener to search button
searchButtonEl.addEventListener("click", handleSearch);

// Upon button click,
function handleSearch() {
    var cityInput = cityInputEl.value.trim();
    
    fetchLatLon(cityInput);
}
    // Fetch current weather data from API
        // Temp
        // Wind
        // Humidity
        // UV index

function fetchLatLon(cityName) {
    
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