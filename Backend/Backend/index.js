// // import the require dependencies
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var cookieParser = require('cookie-parser');
// var cors = require('cors');
// var mysql = require('mysql');
// //require('dotenv').config();
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const pool = require('./db');
// var cors = require('cors');

// //use cors to allow cross origin resource sharing
// app.use(cors({ origin: 'http://localhost:3001:3000', credentials: true }));
// app.use(bodyParser.json());

// // //Allow Access Control
// // app.use(function (req, res, next) {
// //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001:3000');
// //     res.setHeader('Access-Control-Allow-Credentials', 'true');
// //     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
// //     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
// //     res.setHeader('Cache-Control', 'no-cache');
// //     next();
// // });


// //Sign in Buyer
// app.post('/signInBuyer', function (req, res) {
//     let pass = `Select password from mydb.buyer where email='${req.body.email}'`;
//     let output="Not success";
//     pool.query(pass, function (error, results) {
//         if (error) {
//             console.log("error in results ",results[0]);
//             throw error;
//         }
//         else {
//             console.log('Body Content',req.body.password);
//             console.log(results[0].password);

//             //const match = bcrypt.compare(hash, results.password);S
//             bcrypt.compare(req.body.password, results[0].password, function (err, resSt) {
//                 if (resSt) {
//                     console.log("COMPARE working-------------------")      
//                     output="SuccessFull Login";
//                     res.status(200).send(output);
//                 }
//                 else {
//                     console.log("not compare working-------------------")      
//                     output="UnnSuccessFull Login";   
//                     res.status(200).send(output);          
//                 }
//             });

//         };
//     });
//     console.log(output);
    
// });

// //Route to handle Post Request Call
// app.post('/signUpBuyer', function (req, res) {

//     console.log("Inside signUpBuyer Post Request");
//     console.log("Req Body : ", req.body);
//     let name = req.body.name;
//     let email = req.body.email;
//     let password = req.body.password;

//     pool.getConnection(function (error, conn) {
//         bcrypt.hash(password, saltRounds, function (err, hash) {
//             // Store hash in your password DB.

//             var insertSignUp = `Insert into mydb.buyer (name, email, password) Values ('${name}' ,'${email}' ,'${hash}')`;
//             pool.query(insertSignUp, function (error, results) {
//                 if (error) {
//                     throw error;
//                 }
//                 else {
//                     console.log("done");
//                     pool.query("Select* from buyer");
                    
//                 }
//             });
//         });
//     });

// })


// // restOwner signUp
// app.post('/signUpOwner', function (req, res) {

//     console.log("Inside signUpBuyer Post Request");
//     console.log("Req Body : ", req.body);
//     let name = req.body.name;
//     let email = req.body.email;
//     let password = req.body.password;
//     let restaurantName = req.body.restaurantName;
//     let zipCode = req.body.zipCode;

//     pool.getConnection(function (error, conn) {
//         bcrypt.hash(password, saltRounds, function (err, hash) {
//             // Store hash in your password DB.

//             var insertSignUp = `Insert into mydb.restOwner (name, email, password,restaurantName,zipCode) Values ('${name}' ,'${email}' ,'${hash}','${restaurantName}','${zipCode}')`;
//             pool.query(insertSignUp, function (error, results) {
//                 if (error) {
//                     throw error;
//                 }
//                 else {
//                     console.log("done");
//                     pool.query("Select* from restOwner");
//                 }
//             });
//         });
//     });
//     res.writeHead(200, {
//         'Content-Type': 'application/json'
//     });
//     res.end("Added Successfully");

// })

// //Sign in Owner
// app.post('/signInOwner', function (req, res) {

//     let pass = `Select password from mydb.restOwner where name='${req.body.name}'`;
//     console.log(pass);
//     pool.query(pass, function (error, results) {
//         if (error) {
//             throw error;
//         }
//         else if(results[0].password ==null){
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             });
//             res.end("No Record found");
//         }else{
//             console.log(results[0].password);
        
//             bcrypt.compare(req.body.password, results[0].password, function (err, res) {
//                 if (err) {
//                     //login
//                     console.log("its COMPARE NOT working");
//                 }
//                 else {

//                     console.log("COMPARE working-------------------")
//                 }
//             });

//         };
//     });
//     res.writeHead(200, {
//         'Content-Type': 'application/json'
//     });
//     res.end("Successfully SignIn Owner");
// });

// //pool.releaseConnection();
// //     pool.query( insertSignUp )
// //     .then( () => {
// //         return pool.query( 'SELECT * FROM buyer' );
// //     } )
// //     .then( () => {
// //         return pool.close();
// //     }, err => {
// //         return pool.close().then( () => { throw err; } )
// //     } )
// //     .catch( err => {
// //         // handle the error
// //     } )
// // });

// //start your server on port 3001
// app.listen(3001);
// console.log("Server Listening on port 3001");