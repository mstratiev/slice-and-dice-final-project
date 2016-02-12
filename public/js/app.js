(function() {

    var loading = '<div style="text-align: center">Under Construction</div>'
    var sammyApp = Sammy('#content', function() {
        var $content = $('#content');
        var content = document.querySelector('#content');


        this.get('#/', function() {
            this.redirect('#/home')
        });
        this.get('#/home', function(context) {
            templates.get('home').then(function(template) {
                content.className = 'home container-fluid';
                $content.html(template);
            })
        });
        this.get('#/themes', function(context) {
            $content.html(loading);
        });
        this.get('#/features', function(context) {
            $content.html(loading);
        });
        this.get('#/about', function(context) {
            $content.html(loading);
        });

        this.get('#/posts', function(context) {
            content.className = 'posts container-fluid';
            postController.getAll(context);
        });
        this.get('#/posts/:id', function(context) {
            content.className = 'posts container-fluid';
            var id = this.params['id'];
            console.log(id);
            postController.getPost(context, id)
        });


        this.get('#/support', function(context) {
            $content.html(loading);
        });
        this.get('#/affiliates', function(context) {
            $content.html(loading);
        });
        this.get('#/login', function(context) {
            templates.get('login').then(function(template) {
                $content.html(template({
                    data: 'login',
                    login: true
                }));
            })
        });
        this.get('#/join', function(context) {
            templates.get('login').then(function(template) {
                $content.html(template({
                    data: 'register',
                    login: false
                }));
            })
        });
        this.get('#/quote', function(context) {
            $content.html(loading);
        });
        this.get('#/location', function(context) {
            $content.html(loading);
        });
        this.get('#/support', function(context) {
            $content.html(loading);
        });
    })
    sammyApp.run('#/');
}())
