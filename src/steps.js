const {defineSupportCode} = require('cucumber');
const controllers = require('./controllers');
//const controllers = require('cucumber-lad/controllers');

defineSupportCode(function ({Given, When, Then}) {
    Then(/^(я )?выбираю период$/, function (me) {
        controllers.setDriver(this.driver);
        return controllers.iChooseDate();
    });
});
