/*global app*/
var AmpersandModel = require('ampersand-model');
// var AmpersandFire = require('ampersand-fire');
var config = require('clientconfig');
var moment = require('moment');
var _ = require('underscore');

module.exports = AmpersandModel.extend({
    props: {
        name: ['string', true, ''],
        date: ['date', true],
        locationQuery: ['string', true]
    },
    derived: {

    },
    url: config.firebaseURL + 'meals',
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
    },
    serialize: function () {
        var res = AmpersandModel.prototype.serialize.call(this);
        res.id = this.id;
        return res;
    }
});
