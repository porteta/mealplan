var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        name: ['string', true, ''],
        date: ['date', true],
        locationQuery: ['string', true]
    },
    session: {

    },
    derived: {

    },
    initialize: function() {
        this.date = this.date || new Date();
    }
});
