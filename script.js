'use strict';

/*** Location Section ***/

//variable to hold apiKey
const apiKeyOpenCage = '186aeff2de054932ad6fc90fa36c6c37';

//variable to hold base url
const baseURLOpenCage = 'https://api.opencagedata.com/geocode/v1/json';

//format query params
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
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
        .then(responseJson => console.log(responseJson))
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


/*** Results Section ***/

//variable to hold apiKey

//variable to hold base url

//function to format query params

//function to display results

//function to get weather data


/*** Document Ready ***/

//document ready
$(watchSearchButton);