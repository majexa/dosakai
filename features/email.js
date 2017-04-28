var {defineSupportCode} = require('cucumber');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

defineSupportCode(function ({registerHandler}) {
    registerHandler('AfterFeatures', function (features, callback) {
        const screenshots = require('../src/screenshots').get();
        if (screenshots.length) {
            transport.sendMail(
                {
                    from: process.env.EMAIL_SENDER, // sender address
                    to: process.env.EMAIL_SCREENSHOTS_TO, // list of receivers
                    subject: "Screenshots", // Subject line
                    text: "Test result",
                    html: "",
                    attachments: screenshots
                },
                function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Message sent to ' +
                            process.env.EMAIL_SCREENSHOTS_TO +
                            ': ' + info.response);
                    }
                    callback();
                }
            );
        } else {
            callback();
        }
    });
});