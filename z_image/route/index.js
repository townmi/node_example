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

//console.log(gm);

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
	
	var w = req.body.width, h = req.body.height, l = req.body.left, t = req.body.top;
	
	var t = new Date().getTime();

	var basedir = "./public" + req.body.name;
	
	var dir = "./public/images/";
	
	var dir1 = "upload/"+t+"150150.jpg";
	
	var dir2 = "upload/"+t+"9090.jpg";
	
	var dir3 = "upload/"+t+"5050.jpg";

	var buf = require('fs').readFileSync(basedir);

	// console.log(buf);
	imageMagick(buf).resize(w, h).crop(150,150,l,t).autoOrient().write(dir+dir1, function(err){
		
		if (err) {
			console.log(err);
			return res.end();
		}
		
		imageMagick(buf).resize(w*9/15, h*9/15).crop(90, 90, l*9/15, t*9/15).autoOrient().write(dir+dir2, function(err){
			
			if (err) {
				console.log(err);
				return res.end();
			}
			
			imageMagick(buf).resize(w*5/15, h*5/15).crop(50, 50, l*5/15, t*5/15).autoOrient().write(dir+dir3, function(err){
			
				if (err) {
					console.log(err);
					 return res.end();
				}
			
				return res.send({
					"target" : true,
					"arr" : [dir1, dir2, dir3]
				})
			
			});
			
		});
		
    });

})

