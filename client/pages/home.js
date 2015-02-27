var PageView = require('./base');
var templates = require('../templates');
var PlanMealForm = require('../forms/planMeal');
var Meal = require('../models/meal');
var MealCollection = require('../models/mealCollection')

module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates.pages.home,
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                var meal = new Meal();
                return new PlanMealForm({
                    el: el,
                    model: meal
                });
            }
        }
    }
});
