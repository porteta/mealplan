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
                    model: new Meal(),
                    submitCallback: function (data) {

                        this.model.save(data, function(response) {
                            console.log(response);
                        });
                        // Meal.create(data, {
                        //     wait: true,
                        //     success: function () {
                        //         console.log('success');
                        //     }
                        // });
                    // },
                    // validCallback: function (valid) {
                    //     if (valid) {
                    //         console.log('The form is valid!');
                    //     } else {
                    //         console.log('The form is not valid!');
                    //     }
                    }
                });
            }
        }
    }
});
