var userController = (function() {
    //encrypt pass - pass a pass hash

    var validator = (function(){

        var username = function(user){
            return user.test(/[0-z]{8-32}/i);
        };
        var password = function(user){
            return user.test(/[0-z]{8-32}/i);
        };

        return {
            username:username,
            password:password
        }

    })();

    var login = function(user) {
        return new Promise(function(resolve, reject) {
            data.users.login(user.username, user.password)
                .then(function(res) {
                    resolve(res)
                })
        })
    };
    var register = function(user) {
        return new Promise(function(resolve, reject) {
            data.users.login(user.username, user.password)
                .then(function(res) {
                    resolve(res)
                })
        })
    };
    var logout = function(user) {
        return new Promise(function(resolve, reject) {
            data.users.login(user.username)
                .then(function(res) {
                    resolve(res)
                })
        })
    };






    return {
        login: login,
        register: register,
        logout: logout
    }

})();
