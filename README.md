# Angular Review Topics

## scope in Angular

Quick Facts about `scope`:

Scope is the glue between application controller and the view.

Both controllers and directives have reference to the scope, but not to each other.

## File structure with MEANish apps

A reasonable strategy when building a full-stack JS app from scratch is to start with everything in the `server.js` or `app.js` file that serves up your file, and then slowly split out your code into separate files based on their functionality.

So the idea is to take this:

```markdown
<!-- old file structure -->

    - public            <!-- holds all our files for our frontend angular application -->
    ----- core.js       <!-- all angular code for our app -->
    ----- index.html    <!-- main view -->
    - package.json      <!-- npm configuration to install dependencies/modules -->
    - server.js         <!-- Node configuration -->
```

```javascript
<!-- server.js -->

// set up ======================================================================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var port = process.env.PORT || 8080;

// configuration ===============================================================

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model ================================================================
var Todo = mongoose.model('Todo', {
    text : String,
    done : Boolean
});

// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {
        ...
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {
        ...
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        ...
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
```

And turn it into this:

```markdown
<!-- new file structure -->

    - app               <!-- holds all our files for node components (models, routes) -->
    ----- models
    ---------- todo.js  <!-- defines the todo model -->
    ----- routes.js     <!-- all routes will be handled here -->

    - config            <!-- all our configuration will be here -->
    ----- database.js

    - public            <!-- holds all our files for our frontend angular application -->
      - js                <!-- holds all our JS files for our frontend angular application -->
      ----- core.js       <!-- declaring angular app -->
        - controllers     <!-- all angular controllers -->
        ----- wineController.js <!-- controller to manipulate single resource -->
        - directives      <!-- all angular directives -->
        ----- cardDirective.js  <!-- directive to manipulate data from single tag name or attribute-->
      - css                <!-- holds all our CSS files for our frontend angular application -->
      ----- style.css       <!-- our page's CSS -->  
      - templates
        ----- cardTemplate.html <!-- any template that we will display with ng-route, directives, etc. -->
        ----- wineTemplate.html <!-- any template that we will display with ng-route, directives, etc. -->
    ----- index.html    <!-- main view -->

    - package.json      <!-- npm configuration to install dependencies/modules -->
    - server.js         <!-- Node configuration -->
```

```javascript
// server.js (final)

    // set up ======================================================================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var port     = process.env.PORT || 8080;                // set the port
    var database = require('./config/database');            // load the database config
        var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration ===============================================================
    mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // routes ======================================================================
    require('./app/routes.js')(app);

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port " + port);
```

Further Resources: 
[scope Documentation](https://docs.angularjs.org/guide/scope)
