/*global app*/
var View = require('ampersand-view');
// var _ = require('underscore');
var templates = require('../templates');
// var NavView = require('./nav');


module.exports = View.extend({
    template: templates.nav,
    bindings: {
        'model.fullName': '[data-hook~=name]',
        'model.loggedIn': {
            type: 'booleanClass',
            name: 'logged-in'
        }
    },
    events: {
        'click [data-hook~=login]': 'login',
        'click [data-hook~=logout]': 'logout'
    },
    login: function() {
        app.currentUser.loginWithGoogle(function(){
            app.navigate('/');
        });
    },
    logout: function () {
        app.currentUser.logout();
        app.navigate('info', true);
    }
});
