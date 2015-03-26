var express = require('express');
var mysql = require("mysql");

var config = require("../config/config.js");
var mem = require("./mem.js");

var app = express();
var router = express.Router();

var pool = mysql.createPool({
	connectionLimit : 10,
	host : config.host,
	port : config.port,
	user : config.user,
	database : 'test',
	password : config.password,
	multipleStatements : true
})

// exports
module.exports = router;

router.get("/", function (req, res){

	res.render("index");

});

router.post("/login", function (req, res){

	

})



var base = {
	username : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^1[3,4,5,7,8]{1}[0-9]{9}$/,
	phone : /^1[3,4,5,7,8]{1}[0-9]{9}$/,
	email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	password:/^(?!\d+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,18}$/,
	nickname : /^[A-Za-z0-9\u4E00-\u9FA5]+$/,
	identity : /^\d{17}[\d,x,X]$/,
	bankcard : /^\d{16,19}$/,
	chinname : /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/,
	captcha : /^\w{4}$/,
	meassage : {
		username : ["手机或邮箱格式错误","手机或邮箱已注册","手机或邮箱未注册"],
		phone : ["手机号码不能为空！", "请输入正确手机号！"],
		email : ["邮箱格式有误"],
		password : ["密码不能为空！","密码格式错误","密码不正确"],
		nickname : ["昵称只能用中文、英文、数字组合"],
		identity : ["身份证格式错误"],
		checkIdCard : ["身份证号码错误"],
		bankcard : ["银行卡格式错误"],
		chinname : ["中文姓名格式有误"],
		captcha : ["验证码不能为空！","验证码输入有误"]
	}
};