var data = (function() {
    var COOKIE_NAME = 'auth-kы';

    function setAuthKey(key) {
        cookie.set(COOKIE_NAME, key, 0.01);
    }

    function getAuthKey() {
        return cookie.get(COOKIE_NAME);
    }

    function removeAuthKey() {
        cookie.remove(COOKIE_NAME);
    }


    function rnd(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    var getAllPosts = function() {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: '/posts',
                method: "GET",
                data: {},
                success: function(res) {
                    console.log(res)
                    resolve(res)
                },
                error: function(err) {
                    console.log(err)
                }
            });
        });
        return promise
    };

    var getOnePost = function(id) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: '/posts/' + id,
                method: "GET",
                data: {},
                success: function(res) {
                    resolve(res)
                },
                error: function(err) {
                    console.log(err)
                }
            })

        });
        return promise
    };


    return {
        posts: {
            getAll: getAllPosts,
            getPost: getOnePost
        }
    }
})();
