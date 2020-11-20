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
    /*
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
        */

        myData.lat = 32.717;
        myData.lng = -117.163;

        getWeatherData();
}




/*** Results Section Functions ***/

//function to get weather data
function getWeatherData() {
    /*
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${myData.lat}&lon=${myData.lng}&units=imperial&appid=${apiKeyOpenWeather}`)
        .then(function(response) {
            return response.json();
        })
        .then(function (responseJson) {
            console.log(responseJson);
            myData.cityName = responseJson.name;
            myData.temp = responseJson.main.temp;
            myData.humidity = responseJson.main.humidity;
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
    */
    
   myData.cityName = "San Diego";
   myData.temp = 53;
   myData.humidity = 93;
   myData.timezone = -28800;
   myData.weatherType = "Mist";
   myData.weatherTypeDescription = "mist";
   myData.weatherTypeIcon = "50d";
   myData.windSpeed = 1.45;
   getTideData();
    

}


//function to get tide data
function getTideData() {
    /*
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
    */
   myData.tides = [{time: "2020-11-20T02:52:00+00:00", type: "low"}, {time: "2020-11-20T10:18:00+00:00", type: "high"}, {time: "2020-11-20T13:59:00+00:00", type: "low"}, {time: "2020-11-20T20:04:00+00:00", type: "high"}]
   getAstronomyData();

}

//function to get astronomy data
function getAstronomyData() {
    /*
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
        myData.sunrise = responseJson.data[0].sunrise;
        myData.sunset = responseJson.data[0].sunset;
        console.log(myData);
        displayData();
    })
    .catch(function (error) {
        $('.invalid-message').removeAttr('hidden');
    });
    */

   myData.moonPhase = "Waxing crescent";
   myData.sunrise = "2020-11-20T14:25:13+00:00";
   myData.sunset = "2020-11-20T00:46:35+00:00";
   console.log(myData);
   displayData();

}

//function to display weather data
function displayData(tide1, sunrise) {

$('.city').empty();
    $('.results-weather').empty();
    $('.results-tides').empty();
    $('.results-sun-moon').empty();

    
    $('.city').text('City: ' + myData.cityName);
    $('.city').removeAttr('hidden');
    $('.city-message').removeAttr('hidden');

    
    $('.results-weather').append(`<li>Temperature: ${myData.temp}˚F</li>`);
    $('.results-weather').append(`<li>Weather Type: ${myData.weatherType} - ${myData.weatherTypeDescription} ${myData.WeatherTypeIcon}</li>`);
    $('.results-weather').append(`<li>Wind Speed: ${myData.windSpeed}mph</li>`);
    $('.results-weather').append(`<li>Humidity: ${myData.humidity}%</li>`);
    $('.results-weather').removeAttr('hidden');

    $('.results-tides').append(`<li>${myData.tides[0].type}: ${new Date(myData.tides[0].time).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'})}</li>`);
    $('.results-tides').append(`<li>${myData.tides[1].type}: ${new Date(myData.tides[1].time).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'})}</li>`);
    $('.results-tides').append(`<li>${myData.tides[2].type}: ${new Date(myData.tides[2].time).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'})}</li>`);
    $('.results-tides').append(`<li>${myData.tides[3].type}: ${new Date(myData.tides[3].time).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'})}</li>`);
    $('.results-tides').removeAttr('hidden');

    $('.results-sun-moon').append(`<li>Sunrise: ${new Date(myData.sunrise).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'})}</li>`);
    $('.results-sun-moon').append(`<li>Sunset: ${new Date(myData.sunset).toLocaleTimeString([], {hour12: true, hour: '2-digit', minute: '2-digit'})}</li>`);
    $('.results-sun-moon').append(`<li>Moon Phase: ${myData.moonPhase}</li>`);
    $('.results-sun-moon').removeAttr('hidden');
}

/*** Document Ready ***/

//document ready
$(watchSearchButton);