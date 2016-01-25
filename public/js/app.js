(function() {
    $(document).ready(function($) {
        templates.get('header').then(function(data){
            $('#header').html(data)
        });
        templates.get('footer').then(function(data){
            $('#footer').html(data)
        });
        setTimeout(function(){
        $('.nav').on('click', function(ev){
            var t =$(ev.target);

            t.parents('ul').children('li').each(function(index, el) {
                var e = $(el);
                if(e.hasClass('active')){
                    e.removeClass('active')
                }
            });
            t.parents('li').addClass('active')
        })},500) 
    });

    var loading = '<div style="text-align: center">Under Construction</div>'
    var sammyApp = Sammy('#content', function() {
        var $content = $('#content');

        this.get('#/', function() {
            this.redirect('#/home')
        });
        this.get('#/home', function(context) {
            templates.get('home').then(function(data){
                $content.html(data);
            })
        });
        this.get('#/posts', function(context) {
            postController.getAll(context);
        });
        this.get('#/posts/:id', function(context) {
            var id = this.params['id'];
            console.log(id);
            postController.getPost(context, id)
        });
    })
    sammyApp.run('#/');
}())
