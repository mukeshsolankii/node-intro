var express = require('express');
var path = require('Path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var module1 = require('./module1.js');//Here we import the our own module....

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine','ejs'); //For ejs(embeded java Script) files to run.....

//Task 1 .....
app.get('/', function(req ,res){
	res.send('Hello world - Mukesh');
});

//Task 2......
//This function take get request and responds with list of users and their posts......
app.get('/authors',(req ,res)=>{ module1(req , res); }); //Here we call that module....

//Task 3 .....
app.get('/setcookie', function(req ,res){
	res.cookie('mukesh','This is very sweet cookie',{maxAge : 3600000000}).send('cookie is set successfully!!!!');
});

//Task 4 .....
app.get('/getcookies', function(req ,res){
	res.send('cookie you set is : ' + JSON.stringify(req.cookies));
})

//Task 5......
app.get('/robots.txt',function(req ,res){
	res.sendFile(path.join(__dirname,'ui','error.txt'));
});

//Task 6.....
app.get('/html',function(req ,res){
	res.sendFile(path.join(__dirname,'ui','musa.html'))
});

//Task 6.....
app.get('/image',function(req ,res) {
	res.sendFile(path.join(__dirname,'ui','joker.ico'));
});

//Task 7.....
app.get('/input',function(req ,res){
	res.sendFile(path.join(__dirname,'ui','input.html'));
});

//Task 7......
app.post('/musa',(req ,res)=>{ res.send('You typed this : '+req.body.text); });

//This is out port on which our server is running....
var port = 8080;
app.listen(8080,()=>{ console.log(`App is running at port ${port}!`); });
