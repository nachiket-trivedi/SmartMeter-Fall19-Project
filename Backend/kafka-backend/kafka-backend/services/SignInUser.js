var db = require('../models/schema');
var userModel = db.userModel;
const bcrypt = require('bcrypt');

// var mongoose = require('mongoose');

function handle_request(msg, callback) {
    userModel.find({ email: msg.email }, function (error, results) {
        if (error) {
            console.log("error in results : error returned from database");
            throw error;
        }
        else if (results.length == 0) {
            output = "Incorrect userId";
            callback(null,output)
            //res.status(200).send(output);
        } else {
            console.log('Body Content', msg.password);
            console.log(results[0].password);

            bcrypt.compare(msg.password, results[0].password, function (error, resSt) {
                if (error) {
                    console.log("error in results ", error);
                    callback(error, "Error")
                }
                else {
                    console.log(results);
                    // res.cookie('section', result, { maxAge: 900000, httpOnly: false, path: '/' });
                    callback(null, results);
                };
            });
        };
    });
}
exports.handle_request = handle_request;