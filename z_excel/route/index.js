var util = require('util');
var fs = require("fs");

var express = require('express');
var mysql = require("mysql");
var formidable = require('formidable');

var xlsx = require('node-xlsx');
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

		connection.query('SELECT * FROM excel', function (err, rows){

			connection.release();

			res.render("index",{"data" : rows});

		});

	});

})

router.get("/file", function (req, res){

	res.render("index", {});

})

// delete
// router.post('/delete', function (req, res){

// 	pool.getConnection(function (err, connection) {

// 		connection.query("DELETE FROM pro WHERE id = "+req.body.del, function (err, rows){

// 			connection.release();

// 			res.redirect(301,"/");

// 		});

// 	});

// });

// tijiao
router.post('/file', function (req, res){

	var form = new formidable.IncomingForm();

	form.uploadDir="./upload";

    form.parse(req, function (err, fields, files){

    	// fs.renameSync(files.file.path, "./upload/"+files.file.name);

    	var obj = xlsx.parse(fs.readFileSync(files.file.path));

    	obj[0].data.forEach(function (e, i){

    		if(i === 0) return;

   			var STR = '"'+e[1] +'","'+ e[2] +'","'+ e[3] +'"';

   			pool.getConnection(function (err, connection) {

				connection.query('INSERT INTO excel(name, phone, address) values('+STR+')', function (err, rows){

					connection.release();

					res.send({"target" : true})

				});

			});

    	})

    });

});


