//index page
$( document ).ready(function() {
    if ($('#sitepage').val() !== 'index' ) return;

    var firstSectionSlides = $('.first-section-slides');
    var firstSectionSliderNavItems = $('.first-section-slider-nav>div>.slider-nav-item');
    firstSectionSlides.slick({
        arrows: false,
        dots: true,
        draggable: false,
        swipe: false,
        fade: true,
        touchMove: false,
        autoplay: true,
        autoplaySpeed: 5000,
    });
    firstSectionSliderNavItems.on('click', function() {
        var index = $(firstSectionSliderNavItems).index(this);
        firstSectionSlides.slick('slickGoTo', index);
    });
    firstSectionSlides.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        setActiveSlide(nextSlide);
    });
    setActiveSlide(0);
    function setActiveSlide(index) {
        firstSectionSliderNavItems.removeClass('active');
        firstSectionSliderNavItems.eq(index).addClass('active');
    }




    $('.row-list').slick({
        arrows: false,
        asNavFor: '.row-tabs',
        infinite: true,
        adaptiveHeight: true,
        draggable: false,
        swipe: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    fade: false,
                    draggable: true,
                    swipe: true,
                    arrows: true,
                    prevArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-prev slider-arrow-abs"><span class="icon-arrow-left"></span></div>',
                    nextArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-next slider-arrow-abs"><span class="icon-arrow-right"></span></div>',
                }
            }
        ]
    });
    $('.row-tabs').slick({
        asNavFor: '.row-list',
        focusOnSelect: true,
        vertical: true,
        arrows: false,
        slidesToShow: 7,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    variableWidth: true,
                    infinite: true,
                    slidesToShow: 1,
                    adaptiveHeight: true,
                    centerMode: true
                }
            }
        ]
    });


    var logoList = $('.logo-list');
    logoList.slick({
        arrows: true,
        adaptiveHeight: true,
        prevArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-prev slider-arrow-abs"><span class="icon-arrow-left"></span></div>',
        nextArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-next slider-arrow-abs"><span class="icon-arrow-right"></span></div>'
    });
    $('.logo-tabs a').click(function() {
        if (this.classList.contains('active')) return;
        logoList.slick('slickGoTo', this.dataset.goto);
        $('.logo-tabs a.active').removeClass('active');
        $(this).addClass('active');
    });
    logoList.on('afterChange', function () {
       var currentSlide = logoList.slick('slickCurrentSlide');
        $('.logo-tabs a.active').removeClass('active');
        $('.logo-tabs a[data-goto=' + currentSlide + ']').addClass('active');
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
    $('.certificates').magnificPopup({
        delegate: '.certificate:not(.slick-cloned) a',
        type: 'image',
        tLoading: 'Загрузка изображения #%curr%...',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }
    });
});


//partners page
$(document).ready(function() {
    if ($('#sitepage').val() !== 'partners') return;
    var lists = $('.clients-list, .partners-list');
    var initLists = function() {
        lists.slick({
            arrows: true,
            adaptiveHeight: true,
            prevArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-prev slider-arrow-abs"><span class="icon-arrow-left"></span></div>',
            nextArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-next slider-arrow-abs"><span class="icon-arrow-right"></span></div>'
        });
    };
    initLists();
    $('.logo-tabs a').click(function() {
        if (this.classList.contains('active')) return;
        lists.removeClass('active');
        lists.closest(this.dataset.target).addClass('active');
        $('.logo-tabs a.active').removeClass('active');
        $(this).addClass('active');
        lists.slick('unslick');
        initLists();
    });
    setTimeout(function(){
        $('.partners-list').removeClass('active').removeClass('opacity-0');
    },1000)


    var reviewList = $('.review-list');
    $('.review-list-total-here').html(reviewList.children().length );
    reviewList.slick({
        adaptiveHeight: true,
        arrows: false
    });

    $('.review-list-arrows .slider-arrow.slider-arrow-next').click(function () {
        reviewList.slick('slickNext');
    });
    $('.review-list-arrows .slider-arrow.slider-arrow-prev').click(function () {
        reviewList.slick('slickPrev');
    });

    reviewList.on('afterChange', function (event, slick) {
       $('.review-list-current-here').html( 1 + slick.currentSlide );
       $('.review-list-total-here').html( slick.slideCount );
    });
});


$(document).ready(function () {
    $('input[name="phone"]').inputmask("+9 (999) 999 99 99");

    $('.callbackForm, #callbackForm').submit(function(e) {
        e.preventDefault();
        var nameElement = this.elements.name;
        var phoneElement = this.elements.phone;
        var name = nameElement.value.trim();
        var phone = phoneElement.value.trim();
        var valid = true;
        if (name === '') {
            nameElement.classList.add('no-valid');
            valid = false;
        } else {
            nameElement.classList.remove('no-valid');
        }
        if (phone.indexOf('_') !== -1) {
            phoneElement.classList.add('no-valid');
            valid = false;
        } else {
            phoneElement.classList.remove('no-valid');
        }
        if (!valid) return;

        sendMessage(this, name, phone);

    });

    var sendMessage = function(form, name, phone) {
        var message = '💡Новая заявка от ' + name;
        message += '\n    <i> Телефон: </i> ' + phone;
        message = encodeURIComponent(message);

        $('.ajax-status').html('Отправляем <span class="icon-spinner spin-me" style="display: inline-block;"></span>');

        $(form).attr('disabled', true);
        $(form.elements).attr('disabled', true);

        setTimeout(function() {
            console.log(message);
            $('.ajax-status').html('Отправлено <span class="icon-checkmark" style="display: inline-block;"></span>');
            $('.modal-form').fadeOut(function () {
                $('.modal-thanks').fadeIn(function () {
                    setTimeout(function () {
                        $('#callbackModal').modal('hide');
                    },3000)
                });
            });
        }, 3000);
    }
});

