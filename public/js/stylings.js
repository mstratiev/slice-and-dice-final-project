//styles
(function(){$(document).ready(function($) {
    templates.get('header').then(function(data) {
        $('#header').html(data)
    });
    templates.get('footer').then(function(data) {
        $('#footer').html(data)
    });
});
})();

//events

(function(){
    setTimeout(function() {
        $('.nav').on('click', function(ev) {
            var t = $(ev.target);

            t.parents('ul').children('li').each(function(index, el) {
                var e = $(el);
                if (e.hasClass('active')) {
                    e.removeClass('active')
                }
            });
            t.parents('li').addClass('active')
        })
    }, 500);

    //login and register hanldes
    console.log('events')
    $('#content').on('click','#login',  function(){
        var user = $('#inputUsername').val();
        var pass = $('#inputPassword').val();
        userController.login({username: user, password:pass});
    });
    $('#content').on('click', '#register', function(){
        var user = $('#inputUsername').val();
        var pass = $('#inputPassword').val();
        userController.register({username: user, password:pass});
    });


})();