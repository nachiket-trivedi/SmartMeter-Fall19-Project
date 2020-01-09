var db = require('../models/schema');
var userModel = db.userModel;
var mongoose = require('mongoose');

function handle_request(msg, callback){
    userModel.updateOne({ email: msg.email},
            {
                $push: {
                    allSchedule: msg.psoResult
                }
            },
            function (error, results) {
            if (error) {
                console.log("error in results ", error);
                callback(error,"Error")
            }
            else {
                console.log("Successfully added");
                userModel.find({ email: msg.email }, { allSchedule: 1 }, function (err, result) {
                    if (err) {
                        callback(error,"fetch item after addition error");
                    } else {
                        // result = JSON.stringify(result);
                        callback(null,result[0]);
            };
        })}
        });
    
    };
exports.handle_request = handle_request;