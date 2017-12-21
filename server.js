const express = require('express');
const path = require('Path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const module1 = require('./module');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine','ejs'); //For ejs(embeded java Script) files to run.....


//Task 1 .....
app.get('/', function(req ,res){
	res.send('Hello world - Mukesh');
});

//Task 2.. starts...
app.get('/authors',(req ,res)=>{
	module1(req , res);	
}); 

//Task 3 .....
app.get('/setcookie', function(req ,res){
	res.cookie('mukesh','This is very sweet cookie',{maxAge : 3600000}).send('cookie is set successfully!!!!');
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
app.post('/musa',function(req ,res) {
	res.send('You typed this : '+req.body.text);
	console.log('you Insert: '+req.body.text);
});

//This is the port on which our server is running....
var port = 8080;
app.listen(8080,()=>{ console.log(`Your app is running at port ${port} !`);});