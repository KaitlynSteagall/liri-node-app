require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var action = process.argv[2];
var addtlWords = process.argv;

switch (action) {
  case "movie-this":
  getMovie();
  break;

  case "concert-this":
    getConcert();
    break;

  case "spotify-this-song":
    getSong();
    break;

  case "do-what-it-says": // may need to make this into a separate case/switch so do-what-it-says is argv 2 and then takes the first part of random.txt as argv 3 and the last part as argv4??? or split on comma in the function and make those two separate argvs within the function
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

  if (movie) {
    axios.get(queryUrl).then(
      function(response) {
        console.log("                ");
        console.log("Movie: " + response.data.Title);
        console.log("                ");
        console.log("Release Year: " + response.data.Year);
        console.log("                ");
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("                ");
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("                ");
        console.log("Country where produced: " + response.data.Country);
        console.log("                ");
        console.log("Language in: " + response.data.Language);
        console.log("                ");
        console.log("Plot: " + response.data.Plot);
        console.log("                ");
        console.log("Actors: " + response.data.Actors);
      }
    )
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
        console.log("                ");
        console.log("Movie: " + response.data.Title);
        console.log("                ");
        console.log("Release Year: " + response.data.Year);
        console.log("                ");
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("                ");
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("                ");
        console.log("Country where produced: " + response.data.Country);
        console.log("                ");
        console.log("Language in: " + response.data.Language);
        console.log("                ");
        console.log("Plot: " + response.data.Plot);
        console.log("                ");
        console.log("Actors: " + response.data.Actors);
      }
    )
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
};

function getConcert() {

  var artist = "";

  for (var i = 3; i < addtlWords.length; i++) {
    if (i > 3 && i < addtlWords.length) {
      artist = artist + "%20" + addtlWords[i];
    }
    else {
      artist += addtlWords[i];
    }
  }

  var queryUrl ="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


  if (artist) {
    axios.get(queryUrl).then(
      function(response) {
        for (var i = 0; i < 20; i++) { //will display up to 20 events (soonest first)
          console.log("                ");
          console.log("Venue: " + response.data[i].venue.name);
          console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
          console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("                ");
        }
      }
    )
    .catch(function(error) {
      console.log ("There are no more booked events to show."); //this will declare there are no more events to show if the amount of events is shorter than 20
      console.log("                ");
      console.log("Error Message:")
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

};

function getSong() {

};
