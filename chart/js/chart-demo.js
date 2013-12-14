var chartData = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : [65,59,90,81,56,55,40]
        },
        {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : [28,48,40,19,96,27,100]
        }
    ]
};


//all-time top-grossing movies in inflation-adjusted dollars
var topMovies = [
    {
        "rank": "1",
        "year": "1977",
        "title": "Star Wars Ep. IV: A New Hope",
        "revenue": 1284600464
    },
    {
        "rank": "2",
        "year": "1997",
        "title": "Titanic",
        "revenue": 1110601190
    },
    {
        "rank": "3",
        "year": "1982",
        "title": "ET: The Extra-Terrestrial",
        "revenue": 1060155772
    },
    {
        "rank": "4",
        "year": "2009",
        "title": "Avatar",
        "revenue": 805469145
    },
    {
        "rank": "5",
        "year": "1980",
        "title": "Star Wars Ep. V: The Empire Strikes Back",
        "revenue": 761835156
    },
    {
        "rank": "6",
        "year": "1994",
        "title": "The Lion King",
        "revenue": 737246722
    },
    {
        "rank": "7",
        "year": "1999",
        "title": "Star Wars Ep. I: The Phantom Menace",
        "revenue": 736934284
    },
    {
        "rank": "8",
        "year": "1993",
        "title": "Jurassic Park",
        "revenue": 736267832
    },
    {
        "rank": "9",
        "year": "1983",
        "title": "Star Wars Ep. VI: Return of the Jedi",
        "revenue": 733586163
    },
    {
        "rank": "10",
        "year": "1981",
        "title": "Raiders of the Lost Ark",
        "revenue": 685705118
    },
    {
        "rank": "11",
        "year": "2012",
        "title": "Marvel's The Avengers",
        "revenue": 638939832
    },
    {
        "rank": "12",
        "year": "1994",
        "title": "Forrest Gump",
        "revenue": 633678391
    },
    {
        "rank": "13",
        "year": "1977",
        "title": "Close Encounters of the Third Kind",
        "revenue": 587327355
    },
    {
        "rank": "14",
        "year": "2008",
        "title": "The Dark Knight",
        "revenue": 585975751
    },
    {
        "rank": "15",
        "year": "1978",
        "title": "Grease",
        "revenue": 583630724
    },
    {
        "rank": "16",
        "year": "2004",
        "title": "Shrek 2",
        "revenue": 554550157
    },
    {
        "rank": "17",
        "year": "2002",
        "title": "Spider-Man",
        "revenue": 548234646
    },
    {
        "rank": "18",
        "year": "1996",
        "title": "Independence Day",
        "revenue": 546452224
    },
    {
        "rank": "19",
        "year": "1984",
        "title": "Beverly Hills Cop",
        "revenue": 521554398
    },
    {
        "rank": "20",
        "year": "1990",
        "title": "Home Alone",
        "revenue": 519397359
    }
];

//doc ready function
$(function(){

    //Demo: build basic line chart
    var canvas = document.getElementById('chart');
    var ctx = canvas.getContext('2d');

    //Demo: build basic bar chart

    var moviesChartData = {
        labels: [],
        datasets: [{
            data: []
        }] 
    };

    //write code to loop over topMovies array and
    //populate the labels and data arrays in
    //moviesChartData
    var idx;
    for (idx = 0; idx < topMovies.length; ++idx) {
        moviesChartData.labels.push(topMovies[idx].title);
        moviesChartData.datasets[0].data.push(topMovies[idx].revenue);
    }

   new Chart(ctx).Bar(moviesChartData);
    

    /*
        In-Class Challenge!
        The topMovies array (see above) contains the 20 highest-grossing movies
        since 1977 in inflation-adjusted dollars. This is an array of objects,
        each of which is like a database record with a similar set of columns.
        Your mission (if you choose to accept it) is to write some JavaScript
        to convert this array of objects into a data structure that the Chart.js
        library can consume, and build a bar chart showing that data.
        
        See the 'chartData' variable at the top of the file for an example of 
        what that format looks like. The data structure should be an object with
        two propertes--labels and datasets--both of which should be arrays. The
        labels array should be an array of strings, one for each movie title.

        The datasets array should have only one element in it, as we have only
        one measure to plot: revenue. So datasets[0] should refer to that one
        and only dataset. The dataset is an object with a few optional formatting
        properites, and then the very critical 'data' property, which should be
        an array of numbers. Add the revenue property from each movie to that
        'data' array.

        After you've built the data structure, create a Bar chart using Chart.js
        and hand that data structure to it as the first parameter. See the "Bar Chart"
        section of http://www.chartjs.org/docs/ for a code example.

        For an added challenge, use the second parameter (the options object) to
        format the revenue scale values as dollars rather than simple numbers.
        See the 'scaleLabel' options property, which can be set to an expression
        involving the variable 'value', which will be set to the current scale
        label value.

        (data source: http://www.the-numbers.com/movie/records/#inflation_adjusted)
    */


}); //doc ready
