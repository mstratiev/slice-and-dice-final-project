var postController = (function() {
    var getDaily = function(context) {
        data.news.getDaily().then(function(res) {
            templates.get('demons').then(function(template) {
                context.$element().html(template(res))
            })
        })
    };

    var getAbstract = function(context) {
        templates.get('abstract').then(function(template) {
            context.$element().html(template)
        })
    };

    var getDemons = function(context) {
        var daemons = demonsCompleteFront;

        templates.get('descriptions').then(function(template) {
            context.$element().html(template(daemons))
        })
    };



    return {
    }
})();
