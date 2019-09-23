# LIRI

## Overview
LIRI is a command-line Node app for the UO code bootcamp which takes user input and queries various APIs to display results.

### Usage

Start the app with `node liri.js`

Entering `OPTIONS` displays all options.

![options](./images/1)

### Bands in Town

Enter the command `node liri concert-this <band name>` for a list of upcoming concerts

![concert-this](./images/concert-this.gif)

### OMBD

Enter the command `node liri movie-this <movie name>` for details about a film

![movie-this](./images/movie-this.gif)

### Random

There in the `random.txt` file, there is a preformatted command that can be called with `node liri do-what-it-says`

![do-what-it-says](./images/do-what-it-says.gif)

### Guided input

If the application is called with no or invalid parameters, a prompt is displayed to guide the user or display the valid commands

![inquirer](./images/inquirer.gif)
