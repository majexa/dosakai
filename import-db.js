const axios = require('axios');
require('dotenv').config();

require('mongodb').MongoClient.connect('mongodb://' +
    (process.env.MONGO_HOST || 'localhost') +
    ':' +
    (process.env.MONGO_PORT || '27017') +
    '/helpme', function (err, db) {
    axios.get('http://' +
        process.env.MONGO_EXPORT_HOST + ':' + process.env.MONGO_EXPORT_PORT +
        '/dump/helpme.json', {
        headers: {
            'Authorization': 'Bearer ' + process.env.MONGO_EXPORT_SECRET
        }
    }).then((r) => {
        let imports = [];
        for (let v of r.data) {
            imports.push(new Promise((resolve, reject) => {
                db.collection(v.collection).removeMany({}, (err, r) => {
                    if (err) throw new Error(err);
                    db.collection(v.collection).insertMany(v.data, {
                        ordered: false
                    }, (err, r) => {
                        if (err) reject(err);
                        resolve([v.collection, r.result]);
                    });
                });
            }));
        }
        Promise.all(imports).then((r) => {
            console.log('db imported');
            console.log(r);
            process.exit(0);
        })
    });
});