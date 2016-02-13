var data = (function() {
    var COOKIE_NAME = 'auth-kы';

    var setAuthKey = function(key) {
        cookie.set(COOKIE_NAME, key, 0.01);
    };

    var getAuthKey = function() {
        return cookie.get(COOKIE_NAME);
    };

    var removeAuthKey = function() {
        cookie.remove(COOKIE_NAME);
    };

    var rnd = function(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    };

    var xhr = {
        get: function(url) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: url,
                    method: "GET",
                    data: {},
                    success: function(res) {
                        resolve(res);
                    },
                    error: function(err) {
                        console.log(err);
                        reject(err);
                    }
                });
            })
        },
        post: function(url, data) {
            var json = JSON.stringify(data);
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: url,
                    method: "POST",
                    data: json,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function(res) {
                        resolve(res);
                    },
                    error: function(err) {
                        console.log(err.message);
                        reject(err);
                    }
                });
            });
        }
    };

    var getAllPosts = function() {
        return xhr.get('/posts');
    };
    var getOnePost = function(id) {
        return xhr.get('/posts/' + id);
    };
    var getRecentPosts = function() {
        return xhr.get('api/recent-posts');
    };
    var getAllComments = function() {
        return xhr.get('api/comments');
    };
    var getRecentComments = function() {
        return xhr.get('api/recent-comments');
    };
    var userLogin = function(username, password) {
        console.log(username, password);
        var dataCrypted = {
            username: username,
            password: hash(password)
        };
        return xhr.post('api/user/login', dataCrypted);
    };
    var userRegister = function(username, password) {
        var dataCrypted = {
            username: username,
            password: hash(password)
        };
        return xhr.post('api/user/register', dataCrypted);
    };
    var userLogout = function(username) {
        return xhr.post('api/user/logout', username);
    };
    return {
        posts: {
            getAll: getAllPosts,
            getPost: getOnePost,
            getRecent: getRecentPosts
        },
        comments: {
            getAll: getAllComments,
            getRecent: getRecentComments
        },
        users: {
            login: userLogin,
            register: userRegister,
            logout: userLogout
        }
    };
})();