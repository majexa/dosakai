const seleniumWebdriver = require('selenium-webdriver');

module.exports = {
    setDriver: function (newDriver) {
        this.driver = newDriver;
    },
    iChooseDate: function () {
        let condition = seleniumWebdriver.until.elementLocated({xpath:
            `//div[@class='column column_2']/table/tbody/tr[@class='week week2']/td[@class='day day1']`
        });
        return this.driver.wait(condition, 10).then((element) => {
            condition = seleniumWebdriver.until.elementLocated({
                xpath: `//div[@class='column column_2']/table/tbody/tr[@class='week week2']/td[@class='day day3']`
            });
            return this.driver.wait(condition, 10).then((element) => {
                return element.click();
            });
        });
    }
};