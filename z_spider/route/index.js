var express = require('express');
var superagent = require("superagent");
var needle = require("needle");
var cheerio = require("cheerio");

var Promise = require("bluebird");

var app = express();

var mem = require("./mem.js");

var router = express.Router();

// exports
module.exports = router;

// router.get("/", function (req, res){

	superagent.get('http://www.itoumi.com/').end(function (error, body){
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
		Promise.promisifyAll(needle);
		var options = {};

		var current = Promise.resolve();
		// console.log(needle)

		Promise.map(result, function(URL) {
		    current = current.then(function () {
		    	// return superagent.get(URL).set({ 'API-Key': 'foobar', Accept: 'application/json' }).end(function (err, body){

		    	// 	return body;

		    	// });
		        // return superagent.get(URL);
		        // console.log(needle.getAsync(URL, options))
		        return needle.getAsync(URL, options);
		    });
		    return current;
		}).map(function(responseAndBody){
    		return JSON.parse(responseAndBody[1]);
		}).then(function (results) {
			console.log(results[20]);
		    

		}).then(function(){
		    console.log('All Needle requests saved');
		}).catch(function (e) {
		    console.log(e);
		});
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
