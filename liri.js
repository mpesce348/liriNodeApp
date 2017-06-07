//request node
var fs = requires("fs");
//request libraries
var tweet = require("twitter");
var say = requires("request");
var song = requires("spotify");
var movie = requires("omdb");
var neededInfo = require("./keys.js");

var command = process.argv[2];
var input = process.argv.slice(3).join("+");

var tweetSearch = {
	screen_name: "BreakfstBurrit0",
	count: 20,
}

//switchcase argument to grab command input
switch (command) {

    case "my-tweets":
        tweet.getTweets();
        break;

    case "spotify-this-song":
        song.getSong(input);
        break;

    case "movie-this":
        movie.getMovie(input);
        break;

    case "do-what-it-says":
        say.doIt(input);
        break;

    default
    	console.log("No input.");
};

//function to pull ifo from spotify API
function getSong(input) {
	if (!input) {
		//assigned as default in case input not entered after command
		input = "never"+"gonna"+"give"+"you"+"up"; 
  }
  var queryUrl = 'https://api.spotify.com/v1/search?q=' + input + '&limit=5&type=track';	
  request(queryUrl, function(error, response, body) { 
    if (error) {
      console.log(error);
    }
    body = JSON.parse(body);
    for (var i = 0; i < body.tracks.items.length; i++) {
      console.log('artist(s) = ' + body.tracks.items[i].artists[0].name);
      console.log('song title = ' + body.tracks.items[i].name);
      console.log('preview = ' + body.tracks.items[i].preview_url);
      console.log('album = ' + body.tracks.items[i].album.name);
  }; 
}

//function to pull info from twitter API
function getTweets() {

    var tweets = new tweet({
        consumer_key: keys.twitterKeys.consumer_key,
  		consumer_secret: keys.twitterKeys.consumer_sercret,
  		access_token_key: keys.twitterKeys.access_token_key,
  		access_token_secret: keys.twitterKeys.access_token_secret
    });

tweets.get('statuses/user_timeline', tweetSearch, function(error, response) {
    if (error) {
      console.log(error);
    };
    console.log("Last tweets: " + response.length )
   for ( var i = 0; i < response.length; i++) {
   	console.log(" Tweet#: " + (i + 1) + "=" + response[i].text);
   	 // console log the publish date 
   	console.log("Published: " + response[i].created_at);
}; 
})

function getMovie() {

};

function doIt() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      console.log(error);
    }
    //splits string from random.txt into an array
    var output = data.toString().split(','); 
    //set command from random.txt array
    command = output[0]; 
    //set request from random.txt array
    input = output[1]; 
    //runs new parameters back through switch case
    switch (command) {
      case 'my-tweets':
        getTweets();
        break;
      case 'spotify-this-song':
        getSong(input);
        break;
      case 'movie-this':
        getMovie(input);
        break;
        
      default:
        console.log("Check your spelling");
    }; 
  }); 
};
};