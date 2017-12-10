var express = require('express');
var path = require('Path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fetch = require('node-fetch');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine','ejs'); //For ejs(embeded java Script) files to run.....


//Task 1 .....
app.get('/', function(req ,res){
	res.send('Hello world - Mukesh');
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
})

//Task 2.. starts...
var users = null;
//This function fetch the list of users from the api........
function get_users(){
	fetch('https://jsonplaceholder.typicode.com/users')
	.then(function(res){
	    return res.json();
	}).then(function(json){
	   users = json;
	});
};

var posts = null;
//This function fetch the list of posts from the api........
function get_posts(){  
	fetch('https://jsonplaceholder.typicode.com/posts')
	.then(function(res){
		return res.json();
	}).then(function(json){
	    posts = json;
	});
};

var post_arr = [];
//This function take get request and responds with list of users and their posts......
app.get('/authors',function(req ,res){
    if(users == null){
	     get_users();
		 res.send("<h1>Please refresh again!!<br> or check the network!!! </h1>");
    }else{	 
	     var name = 'Solanki';
	     res.render('index',{users : users , name : name , pa : post_arr});//Here we render the ejs file...
	}
    for(var i=1;i<users.length;i++){
	  var x = post(i);
	    if(x != undefined){
	       post_arr.push(x);
	    }
    }		
});

//Main function for posts couting.....
function post(userid){
	if(posts == null){
		get_posts();
	}else{
		var count = 0;
			for(var i=0;i < posts.length;i++){
		    	if(posts[i].userId == userid){
		        count++;
	    	}
    }
    return count;
  }
}

//Task 2...ends.....

//This is out port on which our server is running....
var port = 8080;
app.listen(8080,function(){
	console.log(`Your app is running at port ${port} !`);
});
