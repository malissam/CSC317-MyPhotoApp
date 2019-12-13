var mysql = require('mysql');

//attempting to link mysql

var pool = mysql.createPool({
    connectionLimit : 50,
	host     : 'localhost',
	user     : 'root',
	password : '1234',
    database : 'photoposting',
    port: 3306,
    insecureAuth: true,
    debug : false

});

pool.query('SELECT * FROM user;', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});

// connection.connect(function(error){
//   if(!!error){
//     console.log('error');
//   }
//   else{
//     console.log('connected');
//   }
// });



module.exports = pool;