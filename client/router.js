/*global app*/
var Router = require('ampersand-router');
var firebase = require('./firebase');
var HomePage = require('./pages/home');
var CollectionDemo = require('./pages/collection-demo');
var InfoPage = require('./pages/info');
var PersonAddPage = require('./pages/person-add');
var PersonEditPage = require('./pages/person-edit');
var PersonViewPage = require('./pages/person-view');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'collections': 'collectionDemo',
        'info': 'info',
        'logout': 'logout',
        'person/add': 'personAdd',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        '(*path)': 'catchAll'
    },

    route: function(route, name, callback) {
        var router = this;
        if (!callback) callback = this[name];

        var f = function() {
            // redirect non-users to info page
            if(name === 'info' || firebase.getAuth()) {
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

    collectionDemo: function () {
        this.trigger('page', new CollectionDemo({
            collection: app.people
        }));
    },

    info: function () {
        this.trigger('page', new InfoPage());
    },

    logout: function () {
        firebase.unauth();
        app.auth.trigger('logout');
        this.navigate('info', true);
    },

    personAdd: function () {
        this.trigger('page', new PersonAddPage());
    },

    personEdit: function (id) {
        this.trigger('page', new PersonEditPage({
            id: id
        }));
    },

    personView: function (id) {
        this.trigger('page', new PersonViewPage({
            id: id
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
