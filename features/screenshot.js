const {defineSupportCode} = require('cucumber');

const takeScreenShot = function (_this, result, resolve, reject) {
    _this.driver.takeScreenshot().then(function (data) {
        const base64Data = data.replace(/^data:image\/png;base64,/, "");
        const file = "screenshots/out" + new Date().getMilliseconds() + ".png";
        require('fs').writeFile(file, base64Data, 'base64', function (err) {
            console.log('Screenshot stored: ' + file);
        });
        // if (result.status === 'failed') {
        //     errors.add({
        //         filename: `${result.scenario.feature.name} ${result.scenario.name}.png`,
        //         content: base64Data,
        //         encoding: 'base64'
        //     });
        // }
        _this.driver.quit().then(() => resolve());
    });
};

defineSupportCode(function ({After}) {
    After(function (result) {
        let _this = this;
        return new Promise((resolve, reject) => {
            takeScreenShot(_this, result, resolve, reject);
        });
    });
});