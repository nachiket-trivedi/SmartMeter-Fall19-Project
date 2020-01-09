var db = require('../models/schema');
var userModel = db.userModel;
var mongoose = require('mongoose');

function handle_request(msg, callback){
    userModel.find(
        { email: msg.email},
            {allSchedule:1},
            function (error, result) {
            if (error) {
                console.log("error in results ", error);
                callback(error,"Error")
            }
            else {
                console.log("Successfully compiled: ",result[0]);
                
                let total_dishwashsercost=0,total_airconditionercost=0;
                let total_clothdryercost=0, total_heatercost=0, total_ironcost=0;
                let total_poolpumpcost=0, total_vacuumcleanercost=0, total_washingmachinecost=0;
                result[0].allSchedule.forEach(element => {
                    console.log("element:::",element)
                    for(let each in element['appliance info'])
                    {
                        if(each === 'Dish Washer')
                            total_dishwashsercost+=element['appliance info'][each]['Cost Incurred']

                        if(each === 'Air Conditioner')
                        total_airconditionercost+=element['appliance info'][each]['Cost Incurred']

                        if(each === 'Cloth Dryer')
                        total_clothdryercost+=element['appliance info'][each]['Cost Incurred']

                        if(each === 'Heater')
                        total_heatercost+=element['appliance info'][each]['Cost Incurred']

                        if(each === 'Iron')
                        total_ironcost+=element['appliance info'][each]['Cost Incurred']

                        if(each === 'Pool Pump')
                        total_poolpumpcost+=element['appliance info'][each]['Cost Incurred']

                        if(each === 'Vacuum Cleaner')
                        total_vacuumcleanercost+=element['appliance info'][each]['Cost Incurred']

                        if(each === 'Washing Machine')
                        total_washingmachinecost+=element['appliance info'][each]['Cost Incurred']
                    }
                });
                let results={
                    applianceName:['Dish Washer', 'Air Conditioner', 'Cloth Dryer', 'Heater', 'Iron', 'Pool Pump', 'Vacuum Cleaner', 'Washing Machine'],
                    total:[total_dishwashsercost, total_airconditionercost, total_clothdryercost, total_heatercost, total_ironcost, total_poolpumpcost, total_vacuumcleanercost, total_washingmachinecost]
                }
                console.log("total_dishwashsercost--------- ",results);
                callback(null,results);
            };
        });
    };
exports.handle_request = handle_request;