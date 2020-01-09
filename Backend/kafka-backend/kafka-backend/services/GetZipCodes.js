var db = require('../models/schema');
var userModel = db.userModel;
var mongoose = require('mongoose');

function handle_request(msg, callback){
    userModel.find(
        {},
            {zipCode:1,_id:0},
            function (error, result) {
            if (error) {
                console.log("error in results ", error);
                callback(error,"Error")
            }
            else {
                console.log("Successfully compiled: ",result);
                let results=[];
                for(let item of result){
                    if(item.zipCode!=null){
                        results.push(item.zipCode)
                    }
                }
                console.log(results)
                callback(null,results);
            };
        });
    };
exports.handle_request = handle_request;