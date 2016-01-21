var postController = (function() {

    var getAll = function(context) {
        data.posts.getAll().then(function(res) {
            var data = res;
            templates.get('posts').then(function(template) {
                context.$element().html(template({posts:res}))
            })
        }, function(err){
            console.log(err)
        });

    };

    var getPost = function(context, id) {
        data.posts.getPost(id).then(function(res) {
            var data = res;
            templates.get('post').then(function(template) {
                context.$element().html(template(data))
            })
        })
    };


    return {
        getAll: getAll,
        getPost:getPost
    }
})();
