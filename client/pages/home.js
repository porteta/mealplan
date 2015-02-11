var PageView = require('./base');
var templates = require('../templates');
var PlanMealForm = require('../forms/planMeal');
var Meal = require('../models/meal');

module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates.pages.home,
    subviews: {
        form: {
            container: '[data-hook~=plan-form-fields]',
            prepareView: function (el) {
                return new PlanMealForm({
                    el: el,
                    model: new Meal()
                    // submitCallback: function (data) {
                    //     app.people.create(data, {
                    //         wait: true,
                    //         success: function () {
                    //             app.navigate('/collections');
                    //             app.people.fetch();
                    //         }
                    //     });
                    // }
                });
            }
        }
    }
});
