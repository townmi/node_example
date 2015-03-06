var express = require('express');
var app = express();
var router = express.Router();

// exports
module.exports = router;

router.get("/", function (req, res){

	res.render("index")

})

router.get("/login", function (req, res){

	res.render("login");

});

router.post("/reg", function (req, res){

	// console.log(req.body);

	res.redirect("/");

})