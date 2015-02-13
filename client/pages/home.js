var PageView = require('./base');
var templates = require('../templates');
var PlanMealForm = require('../forms/planMeal');
var Meal = require('../models/meal');
var moment = require('moment');

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
                        // var date = moment(data.date);
                        // date.minutes(data.minute);//.hours(data.hours);
                        // if(data.meridiem == 'pm' && data.hour < 12) {
                        //     data.hour = parseInt(data.hour, 10) + 12;
                        // }
                        // date.hours(data.hour);
                        // console.log(date.hours(), date.minutes());
                        // console.log(data);
                        // console.log(data.date);
                        // console.log(time.minutes(data.minutes));
                        // console.log(data);
                        this.model.save(data, function(response) {
                            console.log(response);
                        }, function(error) {
                            console.log(error);
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
