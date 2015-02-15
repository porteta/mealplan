var PageView = require('./base');
var templates = require('../templates');
var PlanMealForm = require('../forms/planMeal');
var Meal = require('../models/meal');

module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates.pages.home,
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                return new PlanMealForm({
                    el: el,
                    model: new Meal()
                });
            }
        }
    }
});
