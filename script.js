'use strict';

/*** API Keys & Base URLS ***/

//variable to hold apiKeys
const apiKeyOpenCage = '186aeff2de054932ad6fc90fa36c6c37';
const apiKeyOpenWeather = '42f989035320f151b7d2e585ddc2d3f8';
const apiKeyStormGlass = '1307e8d4-29e9-11eb-8db0-0242ac130002-1307e960-29e9-11eb-8db0-0242ac130002';

//variable to hold base urls
const baseURLOpenCage = 'https://api.opencagedata.com/geocode/v1/json';
const baseTideURLStormGlass = 'https://api.stormglass.io/v2/tide/extremes/point';
const baseAstronomyURLStormGlass = 'https://api.stormglass.io/v2/astronomy/point';


let myData = {};

//function to handle search input
function watchSearchButton() {
    $('.location-form').submit(event => {
        event.preventDefault();
        const location = $('.location-text-input').val();
        console.log(location);
        getCoordinates(location);
    });
}


//function to format query params
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


/*** Location Section ***/

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
        .then(function (response) {
            return response.json();
        }) 
        .then(function (responseJson) {

            myData.lat = responseJson.results[0].geometry.lat;
            myData.lng = responseJson.results[0].geometry.lng;
            console.log(myData);

            getWeatherData();
            
        })
        .catch(function (error) {
            $('.invalid-message').removeAttr('hidden');
        });
}




/*** Results Section Functions ***/

//function to get weather data
function getWeatherData() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${myData.lat}&lon=${myData.lng}&units=imperial&appid=${apiKeyOpenWeather}`)
        .then(function(response) {
            return response.json();
        })
        .then(function (responseJson) {
            console.log(responseJson);
            myData.temp = responseJson.main.temp;
            myData.humidity = responseJson.main.humidity;
            myData.sunrise = responseJson.sys.sunrise;
            myData.sunset = responseJson.sys.sunset;
            myData.timezone = responseJson.timezone;
            myData.weatherType = responseJson.weather[0].main;
            myData.weatherTypeDescription = responseJson.weather[0].description;
            myData.weatherTypeIcon = responseJson.weather[0].icon;
            myData.windSpeed = responseJson.wind.speed;
            getTideData();
        })
        .catch(function (error) {
            $('.invalid-message').removeAttr('hidden');
        });

}


//function to get tide data
function getTideData() {

    fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${myData.lat}&lng=${myData.lng}`, {
        headers: {
            'Authorization': apiKeyStormGlass
        }
    }).then(function (response) {
        return response.json()
    })
    .then(function (responseJson) {
        console.log(responseJson);
        myData.tides = [responseJson.data[0], responseJson.data[1], responseJson.data[2], responseJson.data[3]]
        console.log(myData);
        getAstronomyData();
    })
    .catch(function (error) {
        $('.invalid-message').removeAttr('hidden');
    });
}

//function to get astronomy data
function getAstronomyData() {

    fetch(`https://api.stormglass.io/v2/astronomy/point?lat=${myData.lat}&lng=${myData.lng}`, {
        headers: {
            'Authorization': apiKeyStormGlass
        }
    }).then(function (response) {
        return response.json()
    })
    .then(function (responseJson) {
        console.log(responseJson);
        myData.moonPhase = responseJson.data[0].moonPhase.current.text;
        console.log(myData);
        displayData();
    })
    .catch(function (error) {
        $('.invalid-message').removeAttr('hidden');
    });
}

//function to display weather data
function displayData() {
    $('.results-weather').empty();
    $('.results-tides').empty();
    $('.results-sun-moon').empty();

    $('.results-weather').append(`<li>Temperature: ${myData.temp}˚F</li>`);
    $('.results-weather').append(`<li>Weather Type: ${myData.weatherType} - ${myData.weatherTypeDescription}</li>`);
    $('.results-weather').append(`<li>Wind Speed: ${myData.windSpeed}%</li>`);
    $('.results-weather').append(`<li>Humidity: ${myData.humidity}%</li>`);
    $('.results-weather').removeAttr('hidden');

    $('.results-tides').append(`<li>${myData.tides[0].type}: ${myData.tides[0].time}</li>`);
    $('.results-tides').append(`<li>${myData.tides[1].type}: ${myData.tides[1].time}</li>`);
    $('.results-tides').append(`<li>${myData.tides[2].type}: ${myData.tides[2].time}</li>`);
    $('.results-tides').append(`<li>${myData.tides[3].type}: ${myData.tides[3].time}</li>`);
    $('.results-tides').removeAttr('hidden');

    $('.results-sun-moon').append(`<li>Sunrise: ${myData.sunrise}</li>`);
    $('.results-sun-moon').append(`<li>Sunset: ${myData.sunset}</li>`);
    $('.results-sun-moon').append(`<li>Moon Phase: ${myData.moonPhase}</li>`);
    $('.results-sun-moon').removeAttr('hidden');
}

/*** Document Ready ***/

//document ready
$(watchSearchButton);