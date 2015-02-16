/*global app*/
var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});
var SelectView = require('ampersand-select-view');
var AmpersandPikadayView = require('ampersand-pikaday-view');
var moment = require('moment');

module.exports = FormView.extend({
    fields: function () {
        return [
            new ExtendedInput({
                name: 'name',
                rootElementClass: 'name',
                value: this.model && this.model.name,
                placeholder: 'name your meal',
                parent: this
            }),
            new ExtendedInput({
                value: this.model && this.model.locationQuery,
                name: 'locationQuery',
                rootElementClass: 'location',
                placeholder: 'city, state, or zipcode',
                parent: this
            }),
            new AmpersandPikadayView({
                name: 'date',
                rootElementClass: 'date',
                value: this.model && this.model.date,
                parent: this
            }),
            new ExtendedInput({
                value: this.model && moment(this.model.date).format('hh'),
                name: 'hour',
                rootElementClass: 'hour',
                placeholder: 'HH',
                parent: this
            }),
            new ExtendedInput({
                value: this.model && moment(this.model.date).format('mm'),
                name: 'minute',
                rootElementClass: 'minute',
                placeholder: 'MM',
                parent: this
            }),
            new SelectView({
                label: ' ',
                name: 'meridiem',
                parent: this,
                options: ['am', 'pm'],
                rootElementClass: 'minute',
                value: moment(this.model.date).format('a'),
                required: true,
                template: templates.includes.selectInput()
            })
        ];
    },
    submitCallback: function(data) {
        data.minute = parseInt(data.minute, 10);
        data.hour = parseInt(data.hour, 10);
        var newDate = moment(data.date);
        newDate.minutes(data.minute);
        if(data.meridiem == 'pm' && data.hour < 12) {
            data.hour = data.hour + 12;
        }
        newDate.hours(data.hour);
        data.date = new Date(newDate.format());
        this.model.set('date', data.date);
        this.model.set('name', data.name);
        this.model.set('locationQuery', data.locationQuery);
        app.navigate('meal/' + this.model.id);
    }
});
