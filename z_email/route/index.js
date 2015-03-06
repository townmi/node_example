var express = require('express');
var nodemailer = require('nodemailer');

var app = express();
var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: "xxxxxxxx@qq.com", // 账号
        pass: "xxxxxx" // 密码
    }
});

// exports
module.exports = router;

router.get("/", function (req, res){

	res.render("index");

});

router.post("/email", function (req, res){

	var mailOptions = {
	    from: 'TEST <xxxxxxxxx@qq.com>', // sender address
	    to: req.body.email, // list of receivers
	    subject: 'Hello World✔', // Subject line
	    text: 'Hello world ✔', // plaintext body
	    html: '<b>Hello world ✔</b> <b>form Nodejs ✔</b>' // html body
	};

	// console.log(req.body);
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        // console.log(error);
	        res.send(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});

});
