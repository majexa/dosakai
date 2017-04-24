'use strict';

const screenshots = [];

module.exports = {
    add: function(err) {
        screenshots.push(err);
    },

    get: function() {
        return screenshots;
    }
};
