var express = require('express');
var router = express.Router();
var db = require('./schema');
var passport = require("passport");
const kafka = require("../kafka/client");

// add new section
router.post('/storeResults', function (req, res) {

    console.log("Inside storeResults Post Request");
    console.log("Req Body : ", req.body);
    
    kafka.make_request('storeResults', req.body, function (error, result) {
        
            if (error) {
                res.status(200).send("storeResults query error", error);
            }
            else {
                    res.status(201).send(result);
            }
        });
});

// bachat
router.post('/getApplianceCosts', function (req, res) {

    console.log("Inside getApplianceCosts Post Request");
    console.log("Req Body : ", req.body);
    
    kafka.make_request('getApplianceCosts', req.body, function (error, result) {
        
            if (error) {
                res.status(200).send("getApplianceCosts query error", error);
            }
            else {
                    res.status(200).send(result);
            }
        });
});

// bachat
router.post('/getZipCodes', function (req, res) {

    console.log("Inside getZipCodes Post Request");
    console.log("Req Body : ", req.body);
    
    kafka.make_request('getZipCodes', req.body, function (error, result) {
        
            if (error) {
                res.status(200).send("getZipCodes query error", error);
            }
            else {
                    res.status(200).send(result);
            }
        });
});

router.post('/getAllSchedule', function (req, res) {

    console.log("Inside getAllSchedule Post Request");
    console.log("Req Body : ", req.body);
    
    kafka.make_request('getAllSchedule', req.body, function (error, result) {
        
            if (error) {
                res.status(200).send("getAllSchedule query error", error);
            }
            else {
                    res.status(200).send(result);
            }
        });
});

router.post('/getTotalCost', function (req, res) {

    console.log("Inside getTotalCost Post Request");
    console.log("Req Body : ", req.body);
    
    kafka.make_request('getTotalCost', req.body, function (error, result) {
        
            if (error) {
                res.status(200).send("getTotalCost query error", error);
            }
            else {
                    res.status(200).send(result);
            }
        });
});
module.exports = router;