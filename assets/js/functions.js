$( document ).ready(function() {
    $('.first-section').slick({
        arrows: false,
        dots: false,
        draggable: false,
        swipe: false,
        fade: true,
        touchMove: false,
        autoplay: true,
        autoplaySpeed: 8000
    });
    $('.first-section .slider-arrow.slider-arrow-next').click(function () {
        $('.first-section').slick('slickNext');
    });
    $('.first-section .slider-arrow.slider-arrow-prev').click(function () {
        $('.first-section').slick('slickPrev');
    });

    $('.certificates').slick({
        dots: false,
        slidesToShow: 3,
        prevArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-prev"><span class="icon-arrow-left"></span></div>',
        nextArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-next"><span class="icon-arrow-right"></span></div>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});
