/*global app*/
var AmpersandModel = require('ampersand-model');
var AmpersandFire = require('ampersand-fire');
var config = require('clientconfig');
var moment = require('moment');

module.exports = AmpersandModel.extend({
    props: {
        id: ['any', true],
        name: ['string', true, ''],
        date: ['date', true],
        locationQuery: ['string', true]
    },
    derived: {

    },

    initialize: function() {
        this.id = this.id || app.generateGuid();
        var datetime = new moment().startOf('minute');
        if(datetime.minutes() > 45) {
            datetime.add(1, 'hour').minutes(0);
        } else {
            var diff = 15 - (datetime.minutes() % 15);
            datetime.minutes(datetime.minutes() + diff);
        }
        this.date = datetime;
    }
});
