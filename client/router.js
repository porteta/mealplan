/*global app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var InfoPage = require('./pages/info');
var MealPage = require('./pages/meal');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'info': 'info',
        'meal/:id': 'meal',
        '(*path)': 'catchAll'
    },

    route: function(route, name, callback) {
        var router = this;

        if (!callback) {
            callback = this[name];
        }

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

    meal: function(id) {
        console.log('meal', id);
        this.trigger('page', new MealPage({
            model: app.currentUser
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
