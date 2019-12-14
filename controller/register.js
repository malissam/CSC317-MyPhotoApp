var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var fileUpload = require('express-fileupload')

var DB = require('../myDatabase')
/* GET users listing. */

// create application/json parser
var jsonParser = bodyParser.json();

router.post('/register', function(req, res) {
    console.log(req.body);
    res.redirect("../profile.html");

    let queryStatment = "INSERT INTO `photoposting`.`user` (`user_name`, `user_email`, `password`) VALUES ('"+req.body.username+"', '"+req.body.username+"', '"+req.body.password+"');"
    //console.log("THIS IS THE STATEMENT:" + queryStatment);
    DB.query(queryStatment, function(error, result, fields){
        console.log("THIS IS THE STATEMENT:" + queryStatment);
        //console.log(result);
    });
});   

//added for sessions
router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/', function(req, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});
//end add for sessions 


router.post('/login',function(req,res)
{
    var login = req.body.login_username;
    var password = req.body.login_password;
    
    DB.query("SELECT * FROM user WHERE user_name = '"+login+"' AND password = '" + password +"'", function(error,results,fields){

    console.log(results.length);
    if (results.length > 0){
        req.session.loggedin = true;
res.cookie
        res.redirect('../profile.html');
    }else{
        res.send('Nope.');
        res.redirect('../login.html')
    }
});
});
  
router.get('/home', function(req, response) {
	if (req.session.loggedin) {
		response.send('Welcome back, ' + req.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

router.post('/post',function(req,res)
{
    var url = req.body.image;
    var description = req.body.description;
    var title = req.body.title;

    DB.query("INSERT INTO `photoposting`.`post` (`post_title`, `post_url`) VALUES ('"+title+"', '"+url+"'", function(error,results,fields){

    console.log(results);

});
});



module.exports = router;