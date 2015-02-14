var config = require('clientconfig');

var Firebase = require('firebase');

module.exports = new Firebase(config.firebaseURL);

