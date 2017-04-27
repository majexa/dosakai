var {defineSupportCode} = require('cucumber');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'ivan.lebedev321@gmail.com',
        pass: 'q3gf8wqegfv97'
    }
});

defineSupportCode(function ({registerHandler}) {
    registerHandler('AfterFeatures', function (features, callback) {
        const screenshots = require('../src/screenshots').get();
        console.log('Кол-во скриншотов: ', screenshots.length);
        if (screenshots.length) {
            transport.sendMail(
                {
                    from: 'test@envdshka.ru', // sender address
                    to: process.env.EMAIL_SCREENSHOTS_TO, // list of receivers
                    subject: "Ошибки", // Subject line
                    text: "Проверка",
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