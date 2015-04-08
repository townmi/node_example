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

	var d1 = new Date().getTime();

	superagent.get('http://www.goubaa.com/login/').set({'API-Key': 'foobar', Accept: 'application/json'}).end(function (error, body){

		// console.log(body.request.url);
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
			// console.log(list);


			var last = [];
			list.forEach(function (ele){
				if(ele){
					var body = ele.blob.toString();
					//console.log("这里是解析DOM节点")
					//mem();
					var $ = cheerio.load(body);
					var html = $("body").html();
					// console.log(html)
					if(typeof html === "string" && html.match(/1/gi)){
						last.push(ele.url);
					}

					body = $ = html = null;
				}
				
			});
			// cp.spawn(res(list));
			console.log("爬取首页有效连接共："+result.length+"条", "解析后页面共有链接："+last.length+"条");
			console.log(list[2].url);
			var d2 = new Date().getTime();
			res.render("index",{key: last});
			mem();
			return console.log("耗时"+(d2-d1)/1000+"秒");

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

		// function res(arr){
		// 	var result = [];
		// 	arr.forEach(function (e){
		// 		console.log("---->for________>>>>>>>")
		// 		mem();
		// 		var $ = cheerio.load(e);
		// 		$("a").each(function (i,e){
		// 			if(e.attribs.href){
		// 				if(e.attribs.href.match(/javascript/g)){

		// 				}else{
		// 					result.push(e.attribs.href);
		// 				}

		// 			}
					
		// 		})
		// 	});

		// 	return result;
		// }

		// Promise.promisifyAll(superagent);
		// var options = {};

		// var current = Promise.resolve();
		// // console.log(needle)

		// Promise.map(result, function(URL) {
		//     current = current.then(function () {
		//     	return superagent.get(URL).end(function (err, body){

		//     		// console.log(body)
		//     		return body.res;

		//     	});
		//     });
		//     console.log(current);
		//     return current;
		// }).then(function (results) {
		// 	console.log(results);
		    

		// }).then(function(){
		//     console.log('All Needle requests saved');
		// }).catch(function (e) {
		//     console.log(e);
		// });
		// res.render("index", {key:result})
		
	})

	mem();

});
// function foo(result) {
//     console.log(result);
//     return result+result;
// }
// var funcs = [foo,foo,foo];
// var result = Q('hello');
// funcs.forEach(function(func){
//     result = result.then(func);
// });
