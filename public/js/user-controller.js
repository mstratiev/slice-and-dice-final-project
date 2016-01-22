var userController = (function() {
    //encrypt pass - pass a pass hash

    var login = function(user) {
        return new Promise(function(resolve, reject) {
            data.usets.login(user.username, user.password)
                .then(function(res) {
                    resolve(res)
                })
        })
    };
    var register = function(user) {
        return new Promise(function(resolve, reject) {
            data.usets.login(user.username, user.password)
                .then(function(res) {
                    resolve(res)
                })
        })
    };
    var logout = function(user) {
        return new Promise(function(resolve, reject) {
            data.usets.login(user.username)
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
