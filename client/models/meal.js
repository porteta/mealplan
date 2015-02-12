// var AmpersandModel = require('ampersand-model');
var AmpersandFire = require('ampersand-fire');
var config = require('clientconfig');

module.exports = AmpersandFire.Model.extend({
    props: {
        id: 'any',
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
        this.date = this.date || new Date();
    }
});
