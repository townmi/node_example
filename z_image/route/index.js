var util = require('util');
var fs = require("fs");

var express = require('express');
var formidable = require('formidable');
var gm = require("gm");

var app = express();
var router = express.Router();
var imageMagick = gm.subClass({ imageMagick : true });
	
// exports
module.exports = router;


router.get("/", function (req, res){

	res.render("index", {});

})

console.log(gm);

// tijiao
router.post('/file', function (req, res){

	var form = new formidable.IncomingForm();

	form.uploadDir="./public/upload";

    form.parse(req, function (err, fields, files){

    	fs.renameSync(files.file.path, "./public/upload/"+files.file.name);

		res.send({"target" : true,"name": "/upload/"+files.file.name})


    });

});


router.post("/edit", function (req, res){

	var dir = "./public" + req.body.name;

	// var buf = require('fs').readFileSync(dir);

	// console.log(buf);
	imageMagick(dir).resize(req.body.width, req.body.height).autoOrient().write(dir, function(err){
		if (err) {
			console.log(err);
			res.end();
		}
		fs.unlink(dir, function() {
			// return res.end('3');
		});
    });

})

