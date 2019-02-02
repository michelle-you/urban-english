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
    var wordToSearch = $("#input-field").val().split(' ').join('+').trim();
    var googleURL = "https://googledictionaryapi.eu-gb.mybluemix.net/?define=" + wordToSearch + "&lang=en";
    var urbanURL = "http://api.urbandictionary.com/v0/define?term={" + wordToSearch + "}";

    var $leftCard = $("#left-card");
    var $rightCard = $("#right-card");

    /* queries google URL */
    $.ajax({
        url: googleURL,
        method: "GET"
    })

        .then(function(response) {
            console.log(response.data);
            $leftCard.text(response);
            
        /* closes then function */
        }); 

    /* queries urban dictionary API */
    $.ajax({
        url: urbanURL,
        method: "GET"
    })

        .then(function(response) {
            console.log(response.data);
            $rightCard.text(response);
            
        /* closes then function */
        }); 

    
/*closes click function */
});


/*last closing bracket */
});