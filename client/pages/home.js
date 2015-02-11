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
                        console.log(data);

                        // app.people.create(data, {
                        //     wait: true,
                        //     success: function () {
                        //         app.navigate('/collections');
                        //         app.people.fetch();
                        //     }
                        // });
                    },
                    validCallback: function (valid) {
                        if (valid) {
                            console.log('The form is valid!');
                        } else {
                            console.log('The form is not valid!');
                        }
                    }
                });
            }
        }
    }
});
