var PageView = require('./base');
var templates = require('../templates');
var firebase = require('../firebase');
var $ = require('jquery-browserify');

module.exports = PageView.extend({
    pageTitle: 'more info',
    template: templates.pages.info,
    events: {
        'click [data-hook~=login]': 'login'
    },
    login: function() {
        var self = this;
        var $error = $(self.queryByHook('error'));
        $error.hide();
        firebase.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            $error.text('There was a problem logging in. Please try again.').show();
          } else {
            app.auth.trigger('login');
            app.navigate('/');
          }
        });
        
    }
});
