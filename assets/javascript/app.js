$(document).ready(function() {

/* ----- IDs -----------------
search form: #input-field
search button: #search-button
left section: #left-card
right section: #right-card
---------------------------- */

/*queries APIs upon button click */
$(document).on("click", "#search-button", function() {

    /*clears previously searched content */
    $("#left-card").empty();
    $("#right-card").empty();

    /*Ajax variable shenanigans */
    var wordToSearch = $("#input-field").val().trim();
    var googleURL = "https://googledictionaryapi.eu-gb.mybluemix.net/?define=" + wordToSearch + "&lang=en";
    var urbanURL = "http://api.urbandictionary.com/v0/define?term={" + wordToSearch + "}";

    

});


/*last closing bracket */
});