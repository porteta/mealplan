/*global app*/
var PageView = require('./base');
var templates = require('../templates');

module.exports = PageView.extend({
    pageTitle: 'more mealz',
    template: templates.pages.info,
    bindings: {
        'model.loginError': '[data-hook~=error]'
    },
    events: {
        'click [data-hook~=login]': 'login'
    },
    login: function() {
        app.currentUser.loginWithGoogle(function(){
            app.navigate('/');
        });
    }
});
