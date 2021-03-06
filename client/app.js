/*global document, window*/
// var _ = require('underscore');
// var logger = require('andlog');
// var config = require('clientconfig');
// var tracking = require('./helpers/metrics');
var Router = require('./router');
var MainView = require('./views/main');
var domReady = require('domready');
var CurrentUser = require('./models/currentUser');

module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        var self = window.app = this;

        this.currentUser = new CurrentUser();

        // init our URL handlers and the history tracker
        this.router = new Router();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            var mainView = self.view = new MainView({
                el: document.body
            });

            // ...and render it
            mainView.render();

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: true, root: '/'});
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    },

    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    generateGuid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
    }
};

// run it
module.exports.blastoff();
