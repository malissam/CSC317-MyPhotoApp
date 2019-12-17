var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');
var DB = require('../myDatabase');
/* GET users listing. */

// create application/json parser
var jsonParser = bodyParser.json();

router.post('/register', function(req, res) {
    console.log(req.body);
//   res.redirect("../profile.html");

    let queryStatment = "INSERT INTO `photoposting`.`user` (`user_name`, `user_email`, `password`) VALUES ('"+req.body.username+"', '"+req.body.email+"', '"+req.body.password+"');"
    console.log("THIS IS THE STATEMENT:" + queryStatment);
    DB.query(queryStatment, function(error, result, fields){
        console.log("THIS IS THE STATEMENT:" + queryStatment);
    //    res.send(error);
        //console.log(result);
    });
});   

//added for sessions
router.use(session({
    key: 'user_sessionID',
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
    cookie:{expires:6000000}
}));

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sessionID) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};
// route for user logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sessionID) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});
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
        req.session.username = login;
        
        //res.cookie('login_status', req.session.loggedin) // options is optional
        console.log("image posted")
        
        
        //end add for cookie

    //    res.redirect('../profile.html');
    }else{
       // res.send('Nope.');
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

// default options
router.use(fileUpload());

router.post('/post',function(req,res,error)
{
    console.log(req.files.postedImage);
    console.log(req.body);
    console.log(error)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    if(req.session.loggedin){
     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.postedImage;
      let photopath = '/public/pictures/'+sampleFile;
    
     // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('public/pictures/'+sampleFile.name, function(err) {
        if (err)
        {return res.status(500).send(err);}
    
        let queryInsert = "INSERT INTO `photoposting`.`post` (`post_title`, `description`, `pic_url`,`user_id`) VALUES ('"+req.body.title+"', '"+req.body.description+"', '"+sampleFile.name+"','"+1+"');"
        DB.query(queryInsert, function(error, result, fields){
            // res.send(error);
            if(error) {
                res.send(error);
            } else {
                res.send('File uploaded!');

            }
         });  
});
    }
});


router.get('/showPicture',function(req,res)
{
    var login = req.body.login_username;
    var password = req.body.login_password;
    
    DB.query("SELECT pic_url FROM post;", function(error,results,fields) {
        console.log(results.map(result => result.pic_url));
        res.send({
            'images': results.map(result => "pictures/" + result.pic_url)
        })
    });
    
});


module.exports = router;