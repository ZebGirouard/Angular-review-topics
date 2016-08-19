# Angular Review Topics

## MVC vs Angular model (on board)

## scope in Angular

### Quick Facts about `scope`:

- Scope is an object that refers to the application model.
- Scope is the glue between application controller and the view.
- Both controllers and directives have reference to the scope, but not to each other.
- Everything that is added to the $scope variable during controller initialization will be accessible to the view; better said: it represents what the view can see.
- Each Angular application has exactly one root scope, but may have several child scopes.
- Child scopes are created using the $new() method.
    - And what do we know that uses the $new() method?
- Scopes provide APIs ($watch) to observe model mutations.
- Scopes provide APIs ($apply) to propagate any model changes through the system into the view from *outside* of the "Angular realm".
    - This is given to you already on things *inside* the "Angular realm" (controllers, services, Angular event handlers).

### The difference between `self` / `this` and $scope.
    
Controllers are constructors, so you can make variables available by putting them in `this`, and then accessing that object with 
    
    ng-controller="MyPopcornController as popcorn (in HTML)
        
    this.name = "Caramel" (in JS)
        
and then ```{{popcorn.name}}``` will show up as ```Caramel``` in our page
    
```$scope``` makes variables immediately available to the view so we can access them with
    
    $scope.name = "Caramel"
        
and then ```{{name}}``` will show up as ```Caramel``` in our page

## Angular and OAuth

## $http and its connection to back-end (on board)

## The back-end with Node, Express, and Mongo (JP)

![](Angular vs Express App Structure.png)

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

## Server- vs Client-side Rendering (discussion)

Further Resources: 
- [scope Documentation](https://docs.angularjs.org/guide/scope)
- [rootScope Documentation](https://docs.angularjs.org/api/ng/type/$rootScope.Scope)
- [AngularJS in a Nutshell](https://blog.informatech.cr/2014/04/15/jsapps-101-angular-js/)
- [Client-side vs server-side rendering](http://techbeacon.com/understanding-front-end-vs-back-end-performance-metrics-mobile-apps)
