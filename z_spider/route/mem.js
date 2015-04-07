var showMen = function(){

	var mem = process.memoryUsage();

	var format = function (bytes){

		return (bytes / 1024 / 1024).toFixed(2) + "MB";

	}

	console.log("process: heapTotal " + format(mem.heapTotal) + " heapUsed " + format(mem.heapUsed) + " rss " + format(mem.rss));

	console.log("------------------------------------------------------------------");

}

module.exports = showMen;