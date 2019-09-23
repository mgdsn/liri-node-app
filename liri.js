require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const axios = require('axios');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");

var askQuestion = function() {
    inquirer.prompt([
      {
        name: "activity",
        message: "What would you like to do? Enter OPTIONS for available options.\n"
      }
    ]).then(function(answers) {
      
     var activity = answers.activity;
     switch (activity) {
      case "OPTIONS":
        displayOptions();
        break;
      case "concert-this":
        concertThis();
        break;
      case "spotify-this-song":
        spotifyThis();
        break;
      case "movie-this":
        movieThis();
        break;
      case "EXIT":
        process.exit();
        break;
      default:
        console.log("Sorry, I don't understand that command. Enter OPTIONS for available options.");
        askQuestion();
        break;
    }
    
    });
};

askQuestion();

const displayOptions = function(){
  console.log("OPTIONS");
  console.log("concert-this: Displays concert information for artist entered.");
  console.log("spotify-this-song: Displays song information for song entered.");
  console.log("movie-this: Displays movie information for movie entered.");
  console.log("EXIT: exits the program.");
  askQuestion();
}

const concertThis = function(){
  inquirer.prompt([
    {
      name: "artist",
      message: "Which artist would you like concert information for?\n"
    }
  ]).then(function(answers) {
    
   var artist = answers.artist;

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
      function(response) {
        this.data = response.data;
        console.log("Upcoming shows for " + artist + "\n");
        this.data.forEach((item) => {
          date = moment(item.datetime).format('MM/DD/YYYY');
          console.log("Venue: ", item.venue.name);
          console.log("Location: ", item.venue.city + ", " + item.venue.country);
          console.log("Date: " + date);
          console.log("");
        });
        askQuestion();    
      })
      .catch(function(error) {
        console.log(error);
      });
   
  })
};

const spotifyThis = function(){
  inquirer.prompt([
    {
      name: "song",
      message: "Which song would you like information for?\n"
    }
  ]).then(function(answers) {
    var song = answers.song;
    if (song === ""){
      song = "The Sign";
    }
    console.log("Song results for " + song + "\n");
    spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
     this.data = response.tracks.items;   
      this.data.forEach((item) => {
        console.log("Artist: ", item.album.artists[0].name );
        console.log("Song name: ", item.name );
        console.log("Album: ", item.album.name);
        console.log("Preview URL: ", item.preview_url);
        console.log("");
      });
      askQuestion();
    })
    .catch(function(err) {
      console.log(err);
    });
  })
};

const movieThis = function(){
  inquirer.prompt([
    {
      name: "movie",
      message: "Which movie would you like information for?\n"
    }
  ]).then(function(answers) {
    
   var movie = answers.movie;

    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log("Movie information for " + movie + "\n");
        console.log("Movie Title: ", response.data.Title);
        console.log("Year: ", response.data.Year);
        console.log("IMDB Rating: ", response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value);
        console.log("Country: ", response.data.Country);
        console.log("Language: ", response.data.Language);
        console.log("Plot: ", response.data.Plot);
        console.log("Actors: ", response.data.Actors);
        console.log("");
    
        askQuestion();    
      })
      .catch(function(error) {
        console.log(error);
      });
   
  })
};

