var express = require('express');
var app = express();

var mem = require("./mem.js");

var router = express.Router();

// exports
module.exports = router;



router.get("/", function (req, res){

	res.render("index");

	mem();

});
