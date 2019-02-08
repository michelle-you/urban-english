$(document).ready(function() {

//Firebase//
var config = {
    apiKey: "AIzaSyB9qb1i9kbIP0Ln5rKS_wvdMpXzyzFg_74",
    authDomain: "urbanenglish-30247.firebaseapp.com",
    databaseURL: "https://urbanenglish-30247.firebaseio.com",
    projectId: "urbanenglish-30247",
    storageBucket: "urbanenglish-30247.appspot.com",
    messagingSenderId: "114402639941"
  };
  
  firebase.initializeApp(config);
  
  var userData = firebase.database();

/* ----- IDs -----------------
search form: #input-field
search button: #search-button
left section: #left-card
right section: #right-card
previous searches: #history
---------------------------- */

/*queries APIs upon button click */
$(document).on("click", "#search-button", function() {

    if ($("#input-field").val() === "") {

        //Changed background color when input field is empty and change inner text//
        $("#search-button").text("Search for something, yo").css("background-color", "plum");

    }
    
    else {

        //Once a search with an input exists, change buttons text and color back to original state//
        $("#search-button").text("Search").css("background-color", "#7FC7B9");

        /*clears previously searched content */
        $("#left-data").empty();
        $("#right-data").empty();
        $("#card-body").empty();

        /*Ajax variable shenanigans */
        var wordToSearch = $("#input-field").val().split(' ').join('+').trim();
        var aKey = "&api_key=7K9LQeTsgpgNcUHfzSivmYoR4EkxZ8x5&rating=g&limit=4";
        var googleURL = "https://googledictionaryapi.eu-gb.mybluemix.net/?define=" + wordToSearch + "&lang=en";
        var urbanURL = "http://api.urbandictionary.com/v0/define?term={" + wordToSearch + "}";
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + wordToSearch + aKey;

        var $leftData = $("#left-data");
        var $rightData = $("#right-data");

        //Object for storing data in Firebase//
        var addedWord = {
                word: wordToSearch
            };
            
        //Push word to Firebase//
        userData.ref().push(addedWord);

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
                
            //closes then function
            }); 

    

        //queries urban dictionary
        $.ajax({
            url: urbanURL,
            method: "GET"
        })

            .then(function(response) {
                console.log(response.list[0].definition);
                var dictDef = response.list[0].definition;
                $rightData.text(dictDef);
                
            //closes then function
            });

        //adds giphy functionality
        $.ajax ({
            url: giphyURL,
            method: "GET"
        })

            .then(function(response) {

                var theGifs = response.data;

                for (i = 0; i<theGifs.length; i++) {
                    
                    var gifDiv = $("<div>").attr("class", "image-holder");
                    var gifItself = $("<img>").attr("class", "an-image").attr("src", theGifs[i].images.fixed_height.url);

                    gifDiv.append(gifItself);
                    $("#card-body").append(gifDiv);
                }
            
            //closes then function
            });

    //if else test bracket
    };

/*closes click function */
});

//Append firebase data to page// 
userData.ref().on("child_added", function(childSnapshot) {
    var pushedWord = childSnapshot.val().word;
    $("#history-data").append(pushedWord + ", ");

});

/*last closing bracket */
});