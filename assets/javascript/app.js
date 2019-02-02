$(document).ready(function() {

/* ----- IDs -----------------
search form: #input-field
search button: #search-button
left section: #left-card
right section: #right-card
previous searches: #history
---------------------------- */

/*queries APIs upon button click */
$(document).on("click", "#search-button", function() {

    /*clears previously searched content */
    $("#left-data").empty();
    $("#right-data").empty();

    /*Ajax variable shenanigans */
    var wordToSearch = $("#input-field").val().split(' ').join('+').trim();
    var googleURL = "https://googledictionaryapi.eu-gb.mybluemix.net/?define=" + wordToSearch + "&lang=en";
    var urbanURL = "http://api.urbandictionary.com/v0/define?term={" + wordToSearch + "}";

    var $leftData = $("#left-data");
    var $rightData = $("#right-data");

    /* queries google URL */
    $.ajax({
        url: googleURL,
        method: "GET"
    })

        .then(function(response) {

            var searchedWord = response[0].word;
            var getDefinition = response[0].meaning;
            var values = $.map(getDefinition, function(value, key) {
                return value;
            });
            var definition = values[0].definition;
            console.log(searchedWord);
            console.log(definition);

            $leftData.text(definition);
            
        /* closes then function */
        }); 

    /* 

    /* queries urban dictionary
    $.ajax({
        url: urbanURL,
        method: "GET"
    })

        .then(function(response) {
            console.log(response.data);
            $rightCard.text(response);
            
        /* closes then function
        }); 

    
/*closes click function */
});


/*last closing bracket */
});