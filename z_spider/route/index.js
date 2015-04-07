var express = require('express');
var superagent = require("superagent");
var cheerio = require("cheerio");
var Q = require("q");
var app = express();

var mem = require("./mem.js");

var router = express.Router();

// exports
module.exports = router;



router.get("/", function (req, res){

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
		res.render("index", {key:result})
		
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
