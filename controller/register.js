var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var DB = require('../myDatabase')
/* GET users listing. */

// create application/json parser
var jsonParser = bodyParser.json();

router.post('/register', function(req, res) {
    console.log(req.body);
    res.send("success Post");

    let queryStatment = "INSERT INTO `photoposting`.`user` (`user_name`, `user_email`, `password`) VALUES ('"+req.body.username+"', 'memurga@gmail.com', '12345678A,12345678A');"

    //console.log("THIS IS THE STATEMENT:" + queryStatment);
    DB.query(queryStatment, function(error, result, fields){
        console.log("THIS IS THE STATEMENT:" + queryStatment);
        //console.log(result);
    });
});   

router.post('/login',function(req,res)
{
    var login = req.body.login_username;
    var password = req.body.login_password;

    DB.query("SELECT * FROM user WHERE user_name = '"+login+"' AND password = '" + password +"'", function(error,results,fields){

    console.log(results.length);
    if (results.length > 0){
        res.redirect('../profile.html');
    }else{
        res.send('failed.');
    }
});
});
  

 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// // POST /login gets urlencoded bodies
// router.post('/login', urlencodedParser, function (req, res) {
//   res.send('welcome, ' + req.body.username)
// });

// // POST /api/users gets JSON bodies
// router.post('/api/users', jsonParser, function (req, res) {
//   // create user in req.body
// });

module.exports = router;