var express = require('express');
var app = express();
var path = require("path");
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./route/index');
var mem = require("./route/mem.js");

var http = require('http').Server(app);
var io = require('socket.io')(http);



// set
app.set('port', process.env.PROT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));

// body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('view engine', 'ejs');

// route
app.get('/',routes);
app.post('/post',routes);
app.post('/delete',routes);
app.get('/home',routes);

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('chat message', function(msg){
		mem();
    	console.log('message: ' + msg, typeof msg);
    	if(msg>100){
    		socket.emit('chat message', msg);
    	}else{
    		io.emit('chat message', msg)
    	}
    	

	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

// 404
app.use(function(req, res, next){
	var err = new ERROR('NOT FOUND');
	err.status = 404;
	next(err);
});



http.listen(3000, function(){
	console.log('listening on *:3000');
});