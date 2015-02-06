/*global app, me, $*/
var _ = require('underscore');
var logger = require('andlog');
var config = require('clientconfig');

var Firebase = require("firebase");

module.exports = new Firebase(config.firebaseURL);

