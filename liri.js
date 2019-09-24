// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var action = process.argv[2];
var addtlWords = process.argv;

switch (action) {
  case "movie-this":
  getMovie();
  break;

case "spotify-this-song":
  getSong();
  break;

case "concert-this":
  getConcert();
  break;

case "do-what-it-says":
  DWIS();
  break;
}

function getMovie() {
  
var movie = "";
for (var i = 3; i < addtlWords.length; i++) {
  if (i > 3 && i < addtlWords.length) {
    movie = movie + "+" + addtlWords[i];
  }
  else {
    movie += addtlWords[i];
  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

if (movie){
  axios.get(queryUrl).then(
    function(response) {
      console.log("Movie: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country where produced: " + response.data.Country);
      console.log("Language in: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function(error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Headers---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    })
  }
else {
  axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
    function(response) {
      console.log("Movie: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country where produced: " + response.data.Country);
      console.log("Language in: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function(error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Headers---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }
}