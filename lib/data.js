'use strict'

var data = (function() {
    var db = require('./db');
    var _ = require('underscore');

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
        var p = new Promise((resolve, reject) => {
            db.posts.read().then((posts) => {
                resolve(posts);
            }, function(err) {
                reject(err)
            })
        });
        return p
    };

    var addUser = (user) => {
        return new Promise((resolve, reject) => {
            db.users.add({
                username: user.username,
                password: user.password
            }).then((res) => {
                resolve(user.username);
            })
        })
    };

    var checkUser = (username, password) => {
        return new Promise((resolve, reject) => {
            db.users.read().then((users) => {
                let ind = users.find((u) => {
                    return u.username === username;
                });
                if (ind < 0) {
                    reject("No such user found")
                } else {
                    if (password === users[ind].password) {
                        resolve(true)
                    }
                }
            })
        })

    };
    var addComment = (comment, user, postId) => {
        return new Promise((resolve, reject) => {
            db.comments.add(comment, user, postId).then((res) => {
                resolve(true);
            }, (err) => {
                reject(err);
            })
        })

    };

    var getAllComments = () => {
        return new Promise((resolve, reject) => {
            db.comments.read().then((com) => {
                resolve(com);
            }, (err) => {
                reject(err);
            })
        })
    };
    var getRecentPosts = () => {
        return new Promise((resolve, reject) => {
            getAllPosts().then((posts) => {
                _(posts).sortBy((p)=>{
                    return -p.date
                });
                if(posts.length < 5){
                    resolve(posts);
                }else{
                    resolve(posts.slice(0,5))
                }

            })
        })
    };
    var getRecentComments = () => {
        return new Promise((resolve, reject)=> {
            getAllPosts().then((comments)=>{
                _(comments).sortBy((p)=>{
                    return -p.date
                });
                if(comments.length < 5){
                    resolve(comments);
                }else{
                    resolve(comments.slice(0,5))
                }


            })
        })
    };

    return {
        posts: {
            getOne: getOnePost,
            getAll: getAllPosts,
            getRecent: getRecentPosts
        },
        comments: {
            getAll: getAllComments,
            add: addComment,
            getRecent: getRecentComments
        }
    }



})();

module.exports = data;
