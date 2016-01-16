(function() {
    var sammyApp = Sammy('#content', function() {
        var $content = $('#content');

        this.get('#/', function() {
            this.redirect('#/home')
        });
        this.get('#/home', function(context) {
            $content.html(loading);
            postController.getDemon(context)
        });
    })
    sammyApp.run('#/');
}())
