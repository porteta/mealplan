/*global app*/
// var AmpersandModel = require('ampersand-model');
var AmpersandFire = require('ampersand-fire');
var config = require('clientconfig');

module.exports = AmpersandFire.Model.extend({
    props: {
        id: ['any', true],
        name: ['string', true, ''],
        date: ['date', true],
        locationQuery: ['string', true]
    },
    session: {

    },
    derived: {

    },

    urlRoot: config.firebaseURL + 'meals',

    initialize: function() {
        this.id = app.generateGuid();
        this.date = this.date || new Date();
    }
});
