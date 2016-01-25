var postController = (function() {
    var recent = {
        recentPosts: [],
        recentComments: []
    };

    var updateRecent = function() {
        return new Promise(function(resolve, reject) {
            data.comments.getRecent().then(function(recentComments) {
                recent.recentComments = recentComments;
                data.posts.getRecent().then(function(recentPosts) {
                    recent.recentPosts = recentPosts;
                    resolve(true)
                })
            })
        })
    };
    var getAll = function(context) {
        data.posts.getAll().then(function(posts) {
            updateRecent().then(function() {
                templates.get('posts').then(function(template) {
                    context.$element().html(template({
                        posts: posts,
                        recentComments: recent.recentComments,
                        recentPosts: recent.recentPosts
                    }))
                })
            })

        }, function(err) {
            console.log(err)
        });
    };

    var getPost = function(context, id) {
        data.posts.getPost(id).then(function(post) {
            updateRecent().then(function() {
                templates.get('post').then(function(template) {
                    context.$element().html(template({
                        post: post,
                        recentComments: recent.recentComments,
                        recentPosts: recent.recentPosts
                    }))
                })

            })

        })
    };


    return {
        getAll: getAll,
        getPost: getPost
    }
})();
