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
                let total_newcost=0,total_oldcost=0;
                let total_profitcost=0;
                result[0].allSchedule.forEach(element => {
                    console.log("element:::",element)
                    if(element['new cost']!==undefined || element['new cost']!== null)
                    total_newcost+=element['new cost'];
                    if(element['old cost']!==undefined || element['old cost']!== null)
                    total_oldcost+=element['old cost'];
                    if(element['profit']!==undefined || element['profit']!== null)
                    total_profitcost+=element['profit'];
                    // for(let each in element['schedule'])
                    // {
                    //     if(each === 'Dish Washer')
                    //         total_dishwashsercost+=element['appliance info'][each]['Cost Incurred']

                    //     if(each === 'Air Conditioner')
                    //     total_airconditionercost+=element['appliance info'][each]['Cost Incurred']

                    //     if(each === 'Cloth Dryer')
                    //     total_clothdryercost+=element['appliance info'][each]['Cost Incurred']

                    //     if(each === 'Heater')
                    //     total_heatercost+=element['appliance info'][each]['Cost Incurred']

                    //     if(each === 'Iron')
                    //     total_ironcost+=element['appliance info'][each]['Cost Incurred']

                    //     if(each === 'Pool Pump')
                    //     total_poolpumpcost+=element['appliance info'][each]['Cost Incurred']

                    //     if(each === 'Vacuum Cleaner')
                    //     total_vacuumcleanercost+=element['appliance info'][each]['Cost Incurred']

                    //     if(each === 'Washing Machine')
                    //     total_washingmachinecost+=element['appliance info'][each]['Cost Incurred']
                    // }
                });
                let results={
                    a:['total_newcost', 'total_oldcost', 'total_profit'],
                    total:[total_newcost, total_oldcost, total_profitcost]
                }
                console.log("total_dishwashsercost--------- ",results);
                callback(null,results);
            };
        });
    };
exports.handle_request = handle_request;