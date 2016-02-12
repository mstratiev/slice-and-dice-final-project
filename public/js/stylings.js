//styles
(function() {
        var toggleClasses = function() {
            var wi = $(window).width();
            if (wi < 950) {
                $('.row-fixed').each(function(index, el) {
                    $(el).removeClass('triggered')
                });
                $('.navbar-collapse').removeClass('center-block');
                
                if (wi < 768) {
                    $('body').addClass('mobile')
                }

                if (wi > 768) {

                    $('body').removeClass('mobile')
                }
            } else if (wi > 951) {
                $('.row-fixed').each(function(index, el) {
                    $(el).addClass('triggered')
                });
                $('.navbar-collapse').addClass('center-block');
                
                if (wi > 768) {

                    $('body').removeClass('mobile')
                }
            }
        };

            $(document).ready(function($) {
                templates.get('header').then(function(data) {
                    $('#header').html(data)
                    templates.get('footer').then(function(data) {
                        $('#footer').html(data)
                        toggleClasses();
                    });
                });

            });

            $(window).resize(function(event) {
                toggleClasses();
            });
        })();

    //events

    (function() {
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
        $('#content').on('click', '.btn-login', function() {
            var user = $('#inputUsername').val();
            var pass = $('#inputPassword').val();
            userController.login({
                username: user,
                password: pass
            });
        });
        $('#content').on('click', '.btn-register', function() {
            var user = $('#inputUsername').val();
            var pass = $('#inputPassword').val();
            userController.register({
                username: user,
                password: pass
            }).then(function(res) {
                console.log(res);
                window.location.href = '#/login'
            });
        });


    })();
