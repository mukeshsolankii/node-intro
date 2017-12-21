const fetchJson = require('node-fetch-json');

var url = 'https://jsonplaceholder.typicode.com/users';
var url2 = 'https://jsonplaceholder.typicode.com/posts';

var post_api = null;
var post_arr = [];
module.exports = (req ,res)=>{
	fetchJson(url,{method: 'GET'})
	.then(function(data){
		fetchJson(url2,{method: 'GET'})
		.then(function(posts){
			post_api = posts;
			//console.log(post_api.length);
			for(var i=1;i <= data.length;i++){
			  var x = post(i);
			  //console.log('x = '+x);
			   if(x != undefined){
			   post_arr.push(x);
			}
			//console.log(post_arr);
        }
			res.render('index',{data : data , posts : post_arr});
		})	
	}).catch(console.log);
}

//Main function for posts counting.....
function post(userid){
	if(post_api != null){
		var count = 0;
			for(var i=0;i < post_api.length;i++){
		    	if(post_api[i].userId == userid){
		          count++;
	    	    }
            }
        return count;
    }else{ console.log('post_api == null');}	
}