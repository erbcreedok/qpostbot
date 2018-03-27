$( document ).ready(function() {

    var nav = $('nav');

    $(document).scroll(function() {
        nav.toggleClass('navbar-filled', window.scrollY > 0);
    });

});
