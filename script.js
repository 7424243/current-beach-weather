'use strict';

/*** API Keys & Base URLS ***/

//variable to hold apiKeys
const apiKeyOpenCage = '186aeff2de054932ad6fc90fa36c6c37';
const apiKeyStormGlass = '';

//variable to hold base urls
const baseURLOpenCage = 'https://api.opencagedata.com/geocode/v1/json';
const baseWeatherURLStormGlass = 'https://api.stormglass.io/v2/weather/point';
const baseTideURLStormGlass = 'https://api.stormglass.io/v2/tide/extremes/point';
const baseAstronomyURLStormGlass = 'https://api.stormglass.io/v2/astronomy/point';


/*** Helper Functions ***/

//function to format query params
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


/*** Location Section ***/

//display lat/lng results
function displayCoordinates(responseJson) {

    console.log(responseJson);
    $('.coordinates').empty();

    $('.lat').text(responseJson.results[0].geometry.lat);
    
    
    $('.lng').text(responseJson.results[0].geometry.lng);
}

//function to get lat/long coordinates in console.log (for errors, make sure to unhide <h4> error message)
function getCoordinates(location) {
    const params = {
        key: apiKeyOpenCage,
        q: location,
        limit: 1
    };

    const queryString = formatQueryParams(params);
    const urlOpenCage = baseURLOpenCage + '?' + queryString;

    console.log(urlOpenCage);

    fetch(urlOpenCage)
        .then(response => response.json())
        .then(responseJson => displayCoordinates(responseJson))
        .catch(error => {
            $('.invalid-message').removeAttr('hidden');
        });
}

//function to handle search input
function watchSearchButton() {

    $('.location-form').submit(event => {
        event.preventDefault();

        const location = $('.location-text-input').val();

        console.log(location);

        getCoordinates(location);
    });

}


/*** Results Section Functions ***/


//function to display weather results
function displayWeatherData() {

}

//function to get weather data
function getWeatherData(responseJson) {
    const lat = responseJson.results[0].geometry.lat;
    //const lng = responseJson.data.results[0].geometry.lng;

    console.log(lat);
    //console.log(lng);
}

//function to display tide data
function displayTideData() {

}

//function to get tide data
function getTideData() {

}

//function to display astronomy data
function displayAstronomyData() {

}

//function to get astronomy data
function getAstronomyData() {

}


/*** Document Ready ***/

//document ready
$(watchSearchButton);