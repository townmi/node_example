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

// router.get("/", function (req, res){

	superagent.get('http://www.jd.com/').end(function (error, body){
		var $ = cheerio.load(body.text);
		// var len = $("a").length, index = 0, timer = null;
		// console.log(len)
		// function getE (i, e){
			
		// 	return superagent.get(e).end(function (error, b){
		// 		if(error) return index++;
		// 		console.log(i,b.text.substring(0,19));
		// 		index++;
		// 		return b.text;
		// 	});
		// }
		// var result = [];

		// $("a").each(function (i, e){

		// 	result.push(getE(i, e.href));

		// })

		// timer = setInterval(function(){
		// 	console.log(result);
		// 	if(index >= len-1){
		// 		clearInterval(timer);
		// 		res.render("index",{key: result});
		// 	}
		// },1000)
		var result = [];

		$("a").each(function (i,e){
			if(e.attribs.href){

				// console.log(e.attribs.href.match(/javascript/g));
				if(e.attribs.href.match(/javascript/g)){

				}else{
					result.push(e.attribs.href);
				}

			}
			
			// if(e.attribs.href.match(/javascript/g)){

			// }else{
			// 	result.push(e.attribs.href);
			// }
			
		})

		console.log(result.length);


		// ep 并发
		ep.after('superagent', result.length, function (list) {
		// 在所有文件的异步执行结束后将被执行
		// 所有文件的内容都存在list数组中
			console.log(list[1].res.text);
		});
		for (var i = 0; i < result.length; i++) {
			superagent.get(result[i]).end(function (err, body){
		// 触发结果事件
				ep.emit('superagent', body);
			});
		}


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

// });
// function foo(result) {
//     console.log(result);
//     return result+result;
// }
// var funcs = [foo,foo,foo];
// var result = Q('hello');
// funcs.forEach(function(func){
//     result = result.then(func);
// });
