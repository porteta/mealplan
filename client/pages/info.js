var PageView = require('./base');
var templates = require('../templates');
var $ = require('jquery-browserify');

module.exports = PageView.extend({
    pageTitle: 'more info',
    template: templates.pages.info,
    bindings: {
        'model.loginError': '[data-hook~=error]'
    },
    events: {
        'click [data-hook~=login]': 'login'
    },
    login: function() {
        var self = this;
        app.currentUser.loginWithGoogle(function(){
            app.navigate('/');
        });
    },
    render: function() {
        this.model = app.currentUser;
        return PageView.prototype.render.call(this);
    }
});
