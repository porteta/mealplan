/*global app*/
// var AmpersandModel = require('ampersand-model');
var AmpersandFire = require('ampersand-fire');
var config = require('clientconfig');
var moment = require('moment');

module.exports = AmpersandFire.Model.extend({
    props: {
        id: ['any', true],
        name: ['string', true, ''],
        date: ['date', true],
        locationQuery: ['string', true]
    },
    derived: {

    },

    urlRoot: config.firebaseURL + 'meals',

    initialize: function() {
        console.log(this.prototype);
        this.id = app.generateGuid();
        var datetime = new moment().startOf('minute');
        if(datetime.minutes() > 45) {
            datetime.add(1, 'hour').minutes(0);
        } else {
            var diff = 15 - (datetime.minutes() % 15);
            datetime.minutes(datetime.minutes() + diff);
        }
        this.date = datetime;
    },
    save: function(attrs, options) {
        if(attrs.date && attrs.hour && attrs.minute && attrs.meridiem) {
            attrs.minute = parseInt(attrs.minute, 10);
            attrs.hour = parseInt(attrs.hour, 10);
            var newDate = moment(attrs.date);
            newDate.minutes(attrs.minute);//.hours(this.hours);
            if(attrs.meridiem == 'pm' && attrs.hour < 12) {
                attrs.hour = attrs.hour + 12;
            }
            newDate.hours(attrs.hour);
            attrs.date = new Date(newDate.format());
            delete attrs.hour;
            delete attrs.minute;
            delete attrs.meridiem;
        }
        AmpersandFire.Model.prototype.save.call(this, attrs, options);
    }
});
