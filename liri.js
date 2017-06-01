var twitter = require("twitter");
var request = requires("request");
var spotify = requires("spotify");
var OMDB = requires("OMDB");

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

}
