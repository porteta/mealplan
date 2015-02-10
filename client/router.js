/*global app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var InfoPage = require('./pages/info');
var CurrentUser = require('./models/currentUser');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'collections': 'collectionDemo',
        'info': 'info',
        'logout': 'logout',
        '(*path)': 'catchAll'
    },

    route: function(route, name, callback) {
        var router = this;
        var currentUser = new CurrentUser();

        if (!callback) callback = this[name];

        var f = function() {
            // redirect non-users to info page

            if(name === 'info' || app.currentUser.loggedIn) {
                // Pre route
                callback.apply(router, arguments);
                // Post route
            } else {
                this.navigate('info',true);
            }
        };

        return Router.prototype.route.call(this, route, name, f);
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('page', new HomePage());
    },

    info: function () {
        this.trigger('page', new InfoPage({
            model: app.currentUser
        }));
    },

    logout: function () {
        app.currentUser.logout();
        this.navigate('info', true);
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
