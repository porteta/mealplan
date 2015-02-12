// var Collection = require('ampersand-rest-collection');
var Meal = require('./meal');
var config = require('clientconfig');
var AmpersandFire = require('../ampersand-fire');

module.exports = AmpersandFire.Collection.extend({
    model: Meal,
    url: config.firebaseURl + '/meals'
});
