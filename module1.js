var fetch = require('node-fetch');

var url_1 = 'https://jsonplaceholder.typicode.com/users';
var url_2 = 'https://jsonplaceholder.typicode.com/posts';

//Task 2.. starts...
var users = null;
//This function fetch the list of users from the api........
function get_users(){
	fetch(url_1)
	.then(function(res){
	    return res.json();
	}).then(function(json){
	   users = json;
	});
};

var posts = null;
//This function fetch the list of posts from the api........
function get_posts(){
	fetch(url_2)
	.then(function(res){
		return res.json();
	}).then(function(json){
	    posts = json;
	});
};

var post_arr = [];

module.exports = (req,res)=>{
  if(users == null){
     get_users();
   res.send("<h1>Please refresh again!!</h1>");
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
}

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
