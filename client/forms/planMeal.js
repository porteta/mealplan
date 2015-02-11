var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});
var DateTimeView = require('../views/inputs/datetime');

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
            new DateTimeView({
                name: 'date',
                rootElementClass: 'date',
                value: this.model && this.model.date,
                parent: this
            }),
            new ExtendedInput({
                value: this.model && this.model.locationQuery,
                rootElementClass: 'location',
                placeholder: 'city, state, or zipcode',
                parent: this
            })
        ];
    }
});
