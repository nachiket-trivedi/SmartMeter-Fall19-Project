var db = require('../models/schema');
var userModel = db.userModel;
var mongoose = require('mongoose');

function handle_request(msg, callback){
    userModel.find({ email: msg.email }, { allSchedule: 1 }, function (err, result) {
        if (err) {
            callback(error,"fetch allSchedule error");
        } else {
            // result = JSON.stringify(result);
            callback(null,result[0]);
};
})
};
exports.handle_request = handle_request;