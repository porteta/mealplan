/* global console */
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var compress = require('compression');
var config = require('getconfig');
var semiStatic = require('semi-static');
var serveStatic = require('serve-static');
var sass = require('node-sass');
var templatizer = require('templatizer');
var fs = require('fs');
var neat = require('node-neat');
var app = express();

// a little helper for fixing paths for various environments
var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};


// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(fixPath('public')));

// we only want to expose tests in dev
if (config.isDev) {
    app.use(serveStatic(fixPath('test/assets')));
    app.use(serveStatic(fixPath('test/spacemonkey')));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// in order to test this with spacemonkey we need frames
if (!config.isDev) {
    app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

app.set('view engine', 'jade');

// -----------------
// Enable the functional test site in development
// -----------------
if (config.isDev) {
    app.get('/test*', semiStatic({
        folderPath: fixPath('test'),
        root: '/test'
    }));
}


// -----------------
// Set our client config cookie
// -----------------
app.use(function (req, res, next) {
    res.cookie('config', JSON.stringify(config.client));
    next();
});


// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
new Moonboots({
    moonboots: {
        jsFileName: 'mealplan',
        cssFileName: 'mealplan',
        main: fixPath('client/app.js'),
        developmentMode: config.isDev,
        libraries: [
        ],
        stylesheets: [
            fixPath('node_modules/normalize.css/normalize.css'),
            fixPath('node_modules/ampersand-pikaday-view/node_modules/pikaday/css/pikaday.css'),
            fixPath('public/css/app.css')
        ],
        browserify: {
            debug: false
        },
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested. Which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(fixPath('templates'), fixPath('client/templates.js'));
            }
        },
        beforeBuildCSS: function (done) {
            // This re-builds css from stylus each time the app's main
            // css file is requested. Which means you can seamlessly change stylus files
            // and see new styles on refresh.
            if (config.isDev) {
                sass.render({
                    file: fixPath('sass/app.scss'),
                    includePaths: neat.includePaths,
                    success: function(result) {
                        fs.writeFileSync('public/css/app.css', result.css);
                        console.log('sass compiled');
                        done();
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            } else {
                done();
            }
        }
    },
    server: app
});


// listen for incoming http requests on the port as specified in our config
app.listen(config.http.port);
console.log('Mealplan is running at: http://localhost:' + config.http.port + ' Yep. That\'s pretty awesome.');
