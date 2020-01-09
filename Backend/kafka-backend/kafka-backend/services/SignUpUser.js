var db = require('../models/schema');
var userModel = db.userModel;
// var mongoose = require('mongoose');

function handle_request(msg, callback) {
    userModel.find({ email: msg.email }, function (err, results) {
        if (results.length > 0) {
            console.log("email id exists");
            callback(err, "Email Id already exists!");

        }
    });
    console.log("msg----", msg)
    var insertSignUp = new userModel({
        firstName: msg.firstName,
        lastName: msg.lastName,
        address: msg.address,
        city: msg.city,
        state: msg.state,
        zipCode: msg.zipCode,
        email: msg.email,
        password: msg.hash
    })
    insertSignUp.save(function (error, results) {
        if (error) {
            console.log("error in results ", error);
            callback(error, "Error")
        }
        else {
            console.log(results);
            callback(null, results);
        };
    });

};
exports.handle_request = handle_request;