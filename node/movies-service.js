/*
    movies-service.js

    A very simple web service that can report about 2012 box-office sales.

    This service offers 4 top level resources, all available via GET:
        /movies/ = all movie records
        /genres/ = list of distinct movie genres
        /studios/ = list of distinct movie studios
        /ratings/ = list of distinct movie ratings

    To get info about a particular genre, studio, or rating,
    do a GET on:
        /genres/<genre-name>/ = total revenue, ticket sales, and num movies for the given genre
        /studios/<studio-name>/ = total revenue, ticket sales, and num movies for the given studio
        /ratings/<rating-ame>/ = total revenue, ticket sales, and num movies for the given rating

    To get all movies for a particlar genre, studio, or rating,
    do a GET on:
        /genres/<genre-name>/movies/
        /studios/<studio-name>/movies/
        /ratings/<rating-name>/movies/

*/

"use strict;"

//required Node.js modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

//port number our server will listen on
var port = 8080;

//relative path to the master data file
var dataFile = './data/movies.json';

//all movies loaded form the data file
var movies = [];

//various indexes over the movie array
//each of these objects will have a property for each
//distinct category in the data (each genre, each studio, etc.)
//and the value of the property will be another object with the
//properties:
//  movies: array of movies in that category
//  totalRevenue: total revenue of all movies in that category
//  totalTickets: total number of ticket sales for all movies in category
//
var indexes = {
    studios: {},
    genres: {},
    ratings: {}
}

//general loop counters and element variables
var idx;
var movie;

//adds a movie to the specified index, using the value
//of the property specified in propertyName
function addToIndex(movie, index, propertyName) {
    var propValue = movie[propertyName];
    
    //ignore if property value is undefined or null
    if (undefined === propValue || null === propValue)
        return;

    //normalize to trimmed and lower-case
    propValue = propValue.trim().toLowerCase();

    //and replace '/' with '-' to allow use in URLs
    propValue = propValue.replace('/', '-');
    
    //ignore zero-length string props
    if (0 == propValue.length)
        return;

    //if index entry doesn't exist yet, create it
    var indexEntry = index[propValue];
    if (!indexEntry) {
        index[propValue] = indexEntry = {
            totalRevenue: 0,
            totalTickets: 0,
            movies: []
        };
    }

    //add movie to list of movies for this entry
    indexEntry.movies.push(movie);

    //keep a running total for revenue and tickets
    //for this entry
    indexEntry.totalRevenue += movie.revenue;
    indexEntry.totalTickets += movie.tickets;
}

//load the data file (this will be synchronous)
console.log('loading movies data file...');
movies = require(dataFile);

//build the various indexes
for (idx = 0; idx < movies.length; ++idx) {
    movie = movies[idx];
    addToIndex(movie, indexes.studios, 'studio');
    addToIndex(movie, indexes.genres, 'genre');
    addToIndex(movie, indexes.ratings, 'rating');
}

console.log('finished loading and indexing ' + movies.length + ' movies...');


//helper response functions
//these are used by the specific routing functions below
function sendJSON(response, data) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));   
}

function sendNotFound(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('That resource does not exist!');
}

function sendError(response, e) {
    response.writeHead(500, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(e));
}

//list of routes
//each route represents a mapping between a requested path pattern and
//a function that should be called when that path is requested
//the pattern prop is a regular expression against which the requested path
//is tested
//the fn prop is a function to call if the path matches
//the function will be passed the request and response objects, plus any
//captures produced by the regular expression
var routes = [
    {pattern: new RegExp('^/$'), fn: sendRoot},
    {pattern: new RegExp('^/movies/?$'), fn: sendAllMovies},
    {pattern: new RegExp('^/(genres|studios|ratings)/?$'), fn: sendIndexEntries},
    {pattern: new RegExp('^/(genres|studios|ratings)/([^/]+)/?$'), fn: sendIndexEntry},    
    {pattern: new RegExp('^/(genres|studios|ratings)/([^/]+)/movies/?$'), fn: sendMoviesForEntry}
];


//handler functions
function sendRoot(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream("./pages/root.html").pipe(response);
}

function sendAllMovies(request, response) {
    sendJSON(response, movies);
}

function sendIndexEntries(request, response, captures) {
    //console.log('sendIndexEntries (' + captures[1] + ')');

    //captures[1] is index name
    var data = [];
    var entry;
    for (entry in indexes[captures[1]]) {
        data.push(entry);
    }
    sendJSON(response, data);
}

function sendIndexEntry(request, response, captures) {
    //console.log('sendIndexEntry (' + captures[1] + ', ' + captures[2] + ')');

    //captures[1] is index name
    //captures[2] is index entry name
    var indexEntry = indexes[captures[1]][decodeURIComponent(captures[2])];
    if (!indexEntry) {
        sendNotFound(response);
    }
    else {
        //send everything except the movies array
        var data = {};
        var prop;
        for (prop in indexEntry) {
            if ('movies' != prop)
                data[prop] = indexEntry[prop];
        }

        data.numMovies = indexEntry.movies.length;
        
        sendJSON(response, data);        
    }
}

function sendMoviesForEntry(request, response, captures) {
    //console.log('sendMoviesForEntry (' + captures[1] + ', ' + captures[2] + ')');

    //captures[1] is index name
    //captures[2] is index entry name
    var indexEntry = indexes[captures[1]][decodeURIComponent(captures[2])];
    if (!indexEntry) {
        sendNotFound(response);
    }
    else {
        sendJSON(response, indexEntry.movies);
    }
}

//start the web server
http.createServer(function (request, response) {

    //parse the URL and use the path to determine which resource is being requested
    var parsedUrl = url.parse(request.url, true);
    var path = parsedUrl.path;
    console.log('request for ' + path);

    //test the requested path against our various routes
    //if one matches, then call the requested function passing any
    //captures from the regular expression
    var captures;
    var route;
    var idx;
    for (idx = 0; idx < routes.length; ++idx) {
        route = routes[idx];
        captures = route.pattern.exec(path);
        if (null != captures) {
            try {
                route.fn(request, response, captures);
            }
            catch(e) {
                sendError(response, e);
            }

            return;
        } //if pattern matched
    } //for each route

    //if we got here, no route matched
    sendNotFound(response);

}).listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');

