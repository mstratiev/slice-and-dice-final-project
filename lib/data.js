'use strict'

var data = (function() {
    var db = require('./db');

    var getOnePost = (id) => {
        return new Promise((resolve, reject) => {
            db.posts.read().then((posts) => {
                let ind = posts.findIndex((p) => {
                    return p.id == id;
                });
                if (ind > -1) {
                    resolve(posts[ind])
                } else {
                    reject("Post is not found");
                }
            })
        })
    };

    var getAllPosts = () => {
    	var p= new Promise((resolve, reject)=>{
    		db.posts.read().then((posts)=>{
    			resolve(posts);
    		}, function(err){
                reject(err)
            })
    	});
        return p
    };

    var addUser = (user) =>{
    	return new Promise((resolve, reject)=>{
    		db.users.add({username:user.username, password:user.password}).then((res)=>{
    			resolve(user.username);
    		})
    	})
    };

    var checkUser = (username, password) =>{
    	return new Promise((resolve, reject)=>{
    		db.users.read().then((users)=>{
    			let ind = users.find((u)=>{
    				return u.username === username;
    			});
    			if(ind<0){
    				reject("No such user found")
    			} else {
    				if(password === users[ind].password){
    					resolve(true)
    				}
    			}
    		})
    	})

    };

    return {
        posts: {
            getOne: getOnePost,
            getAll: getAllPosts
        }
    }



})();

module.exports = data;