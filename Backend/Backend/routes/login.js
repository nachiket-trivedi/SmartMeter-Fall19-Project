var express = require('express');
var router = express.Router();
// import the require dependencies
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var cors = require('cors');
// var mysql = require('mysql');
var db = require('./schema');
var jwt = require('jsonwebtoken');
var userModel = db.userModel;
var kafka = require('../kafka/client')

const bcrypt = require('bcrypt');

var passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("token");
opts.secretOrKey = "jsdklajklwer";
passport.use("jwt", new JwtStrategy(opts, function (jwt_payload, done) {
    // kafka.make_request('jwtValidation', jwt_payload, function (error, results) {

        userModel.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } 
        });
}));

const saltRounds = 10;
app.use(bodyParser.json());

router.post('/login', function (req, res, next) {
    kafka.make_request('signInUser', req.body, function (error, results) {

        if (results) {
            console.log("COMPARE working-------------------")
            output = "SuccessFull Login";

            // Create and assign a token
            const token = jwt.sign({ _id: results[0]._id }, "jsdklajklwer");
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            res.header('Authorization', "token " + token).send(results[0]);

        }
        else {
            console.log("not compare working-------------------");
            data = {
                error: "Invalid login credentials"
            };
            output = "Invalid login credentials";
            res.status(200).send(JSON.parse(data));
        }
    });
});

//Route to handle Post Request Call
router.post('/signUpUser', function (req, res) {

    console.log("Inside signUpBuyer Post Request");
    console.log("Req Body : ", req.body);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    // pool.getConnection(function (error, conn) {

    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        req.body.hash = hash;
        kafka.make_request('signUpUser', req.body, function (error, results) {

            if (error) {
                res.status(200).send("error");
                res.end();
            }
            else {
                console.log("done");
                res.status(201).send(results);
            }
        });
    });
});

module.exports=router;