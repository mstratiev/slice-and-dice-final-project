var userController = (function() {
    //encrypt pass - pass a pass hash

    var validator = (function(){

        var username = function(user){
            return (/[0-z]{8-32}/i).test(user);
        };
        var password = function(user){
            return (/[0-z]{8-32}/i).test(user);
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
                    toastr.success('Login successfull')
                    resolve(res)
                }, function (err) {
                    toastr.error('Invalid username of passoword')
                    reject(err)
                })
        })
    };
    var register = function(user) {
        return new Promise(function(resolve, reject) {
            if(!validator.username(user.username) || !validator.password(user.password)){
                toastr.error('Input valid username and password')
                reject('Invalid inputs')
            }else {
            data.users.register(user.username, user.password)
                .then(function(res) {
                    toastr.success('Registration successfull!')
                    resolve(res)
                })
                }
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
