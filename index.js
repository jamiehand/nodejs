var express = require('express');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development'; // gets current env or defaults to development
var knex = require('knex')(require('./knexfile')[env]);

var app = express();  //  make a new instance of express
    // express is the package that we're using to create our web server
    // returned a fcn to 'app'; when we call the function, it serves
    // things! :)

/* middleware: stack of fcns w/ which we do actions on our
 * request -- perform steps on request
 * e.g. parsing body; authenticating user; figuring out user's
 * session
 * Express is build on middleware
 * Express is just a big use() function
 * takes in a request and response, and calls next */
 // e.g. we could write our own middleware!
 // app.use(function(req, res, next) {
 //     console.log("my middleware!");
 //     next();
 // });

/* express  */
// use() is middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');

/* respond to the request */
app.get('/', function(req, res) {
    /* version 1 */
    // res.send('Hello, world!');
    /* version 2 */
    // res.render('index', {
    //     user: 'Jamie',
    //     courses: []
    // });
    knex('course').select('name', 'code')
    .then(function(courses){ // returns a promise -- promise is anything I can call 'then()'
                             // on once it returns.
        res.render('index', {
            user: 'Jamie',
            courses: courses
        });
    });
});

app.post('/', function(req, res) {
    // console.log(req.body);
    // res.send('OK'); // get something from the body of the request
    knex('course').insert({
        name: req.body.name,
        code: req.body.code
    })
    .then(function(course) {
        res.redirect('/');
    });
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log('Listening on port'+ port +'...');
});  // arbitrary high port number
