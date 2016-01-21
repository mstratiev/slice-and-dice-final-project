'use strict'
var db = (function() {
    var fs = require('fs');

    var p = new Promise(function(resolve, reject) {


    });

    var readJSON = (callback) => {
        callback = callback || () => {};
        try {
            fs.readFile('./db/db.json', (err, data) => {
                if (!err) {
                    let json = JSON.parse(data);
                    callback(null, json);
                } else {
                    callback(err, null)
                }
            })
        } catch (e) {
            console.log(e);
            callback(e, null);
        }

    };

    var writeJSON = (data, callback) => {
        callback = callback || () => {};
        try {
            fs.writeFile('./db/db.json', JSON.stringify(data), 'utf-8', (err) => {
                if (!err) {
                    callback(null, true)
                }
            })
        } catch (e) {
            console.log(e);
            callback(e, null);
        }
    };

    var readPosts = () => {
        return new Promise((resolve, reject) => {
            readJSON((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.posts)
                }
            })
        })

    };

    var addPost = (post, user) => {
        return new Promise((resolve, reject) => {
            readJSON((err, data) => {
                if (err) {
                    reject(err)
                }
                let d = data;
                d.posts.push(post);
                writeJSON(d, (err) => {
                    if (!err) {
                        resolve(true)
                    }
                })
            })
        })

    };

    var readUsers = () => {
        return new Promise(function(resolve, reject) {
            readJSON((err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data.users)
            })
        });
    };

    var addUser = (username, password) => {
        return new Promise((resolve, reject) => {
            readJSON((err, data) => {
                if (err) {
                    reject(err)
                }
                let d = data;
                d.users.push({
                    username, password
                });
                writeJSON(d, (err) => {
                    if (!err) {
                        resolve(true)
                    }
                });
            });
        });
    };

    var readComments = () => {
        return new Promise((resolve, reject) => {
            readJSON((err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data.comment);
            })
        })

    };

    var addComment = (comment, user) => {
        return new Promise((resolve, reject) => {
            readJSON((err, data) => {
                if (err) {
                    reject(err)
                }
                let d = data;
                d.comments.push(comment);
                writeJSON(d, (err) => {
                    if (!err) {
                        resolve(true)
                    }
                });

            })
        })

    };

    var deleteComment = (commentId, user) => {
        return new Promise((resolve, reject) => {
            readJSON((err, data) => {
                if (err) {
                    reject(err)
                }
                let d = data;
                let ind = d.comments.findIndex((c, i) => {
                    return c.id == commentId
                });
                if (ind > -1) {
                    d.splice(ind, 1);
                    writeJSON(d, (err) => {
                        if (!err) {
                            resolve(true)
                        }
                    });
                } else {
                    reject("Comment ID not found")
                }
            })
        })
    };




    return {
        json: {
            read: readJSON,
            write: writeJSON
        },
        posts: {
            read: readPosts,
            add: addPost
        },
        users: {
            read: readUsers,
            add: addUser
        },
        comments: {
            read: readComments,
            add: addComment,
            remove: deleteComment
        }
    }
}());

module.exports = db;
