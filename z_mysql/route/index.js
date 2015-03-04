var express = require('express');
var mysql = require("mysql");
var config = require("../config/config.js");
var app = express();
var router = express.Router();

// exports
module.exports = router;

var pool = mysql.createPool({
	connectionLimit : 10,
	host : config.host,
	port : config.port,
	user : config.user,
	database : 'test',
	password : config.password
})


router.get("/", function (req, res){

	pool.getConnection(function (err, connection) {

		connection.query('SELECT * FROM pro', function (err, rows) {

			connection.release();

			res.render("index",{"rows" : rows});

		});

	});

})

// delete
router.post('/delete', function (req, res){

	pool.getConnection(function (err, connection) {

		connection.query("DELETE FROM pro WHERE id = "+req.body.del, function (err, rows) {

			connection.release();

			// res.redirect(301,"/");

			res.send({"target" : true});

		});

	});

});

// tijiao
router.post('/post', function (req, res){

	var STR = '"'+req.body.name +'","'+ req.body.price +'","'+ req.body.number +'","'+ req.body.date +'","'+ req.body.pro_u +'","'+ req.body.user+'"';

	pool.getConnection(function (err, connection) {

		// 'INSERT INTO test(name, sex) values("hanmeimei", "1"),("lilie", "0")'

		connection.query('INSERT INTO pro(name, price, number, date, pro_u, user) values('+STR+')', function (err, rows) {

			connection.release();

			// res.redirect(301,"/");

			res.send({"target" : true});

		});

	});

});


