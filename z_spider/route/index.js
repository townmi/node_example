var cp = require("child_process");

var express = require('express');
var superagent = require("superagent");
// var needle = require("needle");
var cheerio = require("cheerio");

var EventProxy = require("eventproxy");

var ep = new EventProxy();

var app = express();

var mem = require("./mem.js");

var router = express.Router();

// exports
module.exports = router;

router.get("/", function (req, res){

	res.render("index");

});


// search
router.post("/search", function (req ,res){

	var d1 = new Date().getTime();

	var key = req.body.key.split(",");

	var reg = new RegExp(key.join("|"),"gi")
	
	superagent.get(req.body.url).set({'API-Key': 'foobar', Accept: 'application/json'}).end(function (error, body){

		
		var $ = cheerio.load(body.text);

		var result = [];

		$("a").each(function (i,e){
			if(e.attribs.href){
				if(!e.attribs.href.match(/javascript/g)){
					result.push(e.attribs.href);
				}
			}
		})

		// ep 并发
		ep.after('superagent', result.length, function (list) {

			var last = [];
			list.forEach(function (ele){
				if(ele){
					var body = ele.blob.toString();
					console.log("这里是解析DOM节点")
					mem();
					// var $ = cheerio.load(body);
					// var html = $("body").html();

					if(typeof body === "string" && reg.test(body)){

						last.push(ele.url);
					}

					body = $ = body = null;
				}
				
			});

			console.log("爬取首页有效连接共："+result.length+"条", "解析后页面共有链接："+last.length+"条");

			var d2 = new Date().getTime();
			res.send({arr:last, time:(d2-d1)/1000, ls: list})
			mem();
			return false;

		});
		for (var i = 0; i < result.length; i++) {

			superagent.get(result[i]).set({'API-Key': 'foobar', Accept: 'application/json'}).end(function (err, body){
				// 触发结果事件
				console.log("这里在发起GET请求");
				mem();
				if(body && body.res && body.res.text){
					
					ep.emit('superagent', {blob: new Buffer(body.res.text), url: body.request.url});
				}else{
					// console.log(err, body);
					ep.emit("superagent", "")
				}
				
			});
		}
		
	});

	mem();
})