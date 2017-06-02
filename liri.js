var tweet = require("twitter");
var say = requires("request");
var song = requires("spotify");
var movie = requires("omdb");

var command = process.argv[2];

switch (command) {

    case "my-tweets":
        tweet.getTweets();
        break;

    case "spotify-this-song":
        song.getSong();
        break;

    case "movie-this":
        movie.getMovie();
        break;

    case "do-what-it-says":
        say.doIt();
        break;

};

function getSong() {

    var artist = process.argv[3];
    // Running an initial search to identify the artist's unique Spotify id
    var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist&limit=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    })
};

function getTweets() {

};
function getMovie() {

};
function doIt() {

};