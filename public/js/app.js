(function() {

    var loading = '<div style="text-align: center; height: 10em; line-height: 9em">Template not given</div>'
    var sammyApp = Sammy('#content', function() {
        var $content = $('#content');
        var content = document.querySelector('#content');
        var header = document.querySelector('header');

        this.bind('run-route', function(r, a) {
            if (a.path == "/#/home") {
                header.className = 'home';
            } else {
                header.className = '';
            }
            var current = '';
            switch(true){
                case(a.path.indexOf('home')>0): current = 'home'; break;
                case(a.path.indexOf('posts')>0): current='posts'; break;
            }
            content.className = current + ' container-fluid';
        });


        this.get('#/', function() {
            this.redirect('#/home')
        });
        this.get('#/home', function(context) {
            templates.get('home').then(function(template) {
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
            postController.getAll(context);
        });
        this.get('#/posts/:id', function(context) {
            var id = this.params['id'];
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
