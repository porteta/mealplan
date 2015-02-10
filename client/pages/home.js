var PageView = require('./base');
var templates = require('../templates');
var CurrentUser = require('../models/currentUser.js');

module.exports = PageView.extend({
    pageTitle: 'home',
    template: templates.pages.home
});
