'use strict';

/*** Location Section ***/

//variable to hold apiKey

//variable to hold base url

//function to get lat/long coordinates in console.log (for errors, make sure to unhide <h4> error message)

//function to handle search input
function watchSearchButton() {

    $('.location-form').submit(event => {
        event.preventDefault();

        const location = $('.location-text-input').val();

        console.log(location);
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