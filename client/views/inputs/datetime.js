
var DateView = require('ampersand-date-view');
var SelectView = require('ampersand-select-view');
var InputView = require('ampersand-input-view');
var templates = require('../../templates');
var moment = require('moment');
// var NavView = require('./nav');


module.exports = DateView.extend({
    template: templates.includes.dateTimeInput(),
    render: function() {
        DateView.prototype.render.call(this);

        this.hourView = this.renderSubview(new InputView({
            template: '<input class="form-control" maxlength="2">',
            name: 'hour_do_not_use_directly',
            required: true,
            placeholder: 'H',
            value: this.dateValid ? moment(this.value).format('h') : '',
            requiredMessage: 'hour is required.',
            tests: [
                function (val) {
                    if (val < 1 || val > 11){
                        return 'Invalid hour.';
                    }
                },
                function (val) {
                    if (!/^[0-9]+$/.test(val)){
                        return 'hour must be a number.';
                    }
                }
            ]
        }), '[data-hook=hour]');
        this.hourInput = this.hourView.query('input');

        this.minuteView = this.renderSubview(new InputView({
            template: '<input class="form-control" maxlength="2">',
            name: 'minute_do_not_use_directly',
            required: true,
            placeholder: 'DD',
            value: this.dateValid ? moment(this.value).format('mm') : '',
            requiredMessage: 'minute is required.',
            tests: [
                function (val) {
                    if (val < 1 || val > 59){
                        return 'Invalid minute.';
                    }
                },
                function (val) {
                    if (!/^[0-9]+$/.test(val)){
                        return 'minute must be a number.';
                    }
                }
            ]
        }), '[data-hook=minute]');
        this.minuteInput = this.minuteView.query('input');

        this.meridiemView = this.renderSubview(new SelectView({
            template: '<select class="form-control"></select>',
            name: 'meridiem_do_not_use_directly',
            options: [['am','am'], ['pm','pm']],
            unselectedText: '--',
            value: this.dateValid ? moment(this.value).format('a') : '',
            required: true,
            requiredMessage: 'Meridiem is required.',
        }), '[data-hook=meridiem]');
        this.meridiemSelect = this.meridiemView.select;
    }
});
