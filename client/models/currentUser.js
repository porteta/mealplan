var AmpersandModel = require('ampersand-model');
var firebase = require('../firebase');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any'
    },
    session: {
        auth: ['object'],
        loginError: ['string', false]
    },
    derived: {
        fullName: {
            deps: ['auth'],
            fn: function () {
                // console.log(this.auth)
                // if(this.auth && )
                return 'hey';//this.firstName + ' ' + this.lastName;
            }
        },
        loggedIn: {
            deps: ['auth'],
            fn: function () {
                return (this.auth && this.auth.token) ? true : false ;
            }
        }
    },
    initialize: function() {
        this.auth = firebase.getAuth();
    },
    logout: function() {
        firebase.unauth();
        this.auth = firebase.getAuth();
    },
    loginWithGoogle: function(callback) {
        var self = this;
        firebase.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            self.loginError = 'There was a problem logging in with Google. Please try again.';
          } else {
            self.loginError = undefined;
            self.auth = firebase.getAuth();
            callback();
          }
        });
    }
});
