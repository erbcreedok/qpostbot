$(document).ready(function(){

    $('.slider-button-left').click(function(){
        onSliderChange(this, 'left');
    });
    $('.slider-button-right').click(function(){
        onSliderChange(this, 'right');
    });

    var onSliderChange = function(element, direction) {
        var parent = document.querySelector(element.dataset.target);
        if (!parent) return;
        var increment = direction === 'right' ? 1 : -1;
        var sliderElements = [].slice.call(parent.querySelectorAll('.slider-element'));
        var sliderNumberActiveElement = document.querySelector('.slider-number-active');
        var sliderNumberAllElement = document.querySelector('.slider-number-all');
        var sliderLength = sliderElements.length;
        var activeElement = parent.querySelector('.slider-element.active');
        var index = sliderElements.indexOf(activeElement);
        var next = ((index + increment) + sliderLength) % sliderLength;
        sliderNumberAllElement.innerHTML = sliderLength;
        sliderNumberActiveElement.innerHTML = next + 1;
        animateSlider(activeElement, sliderElements[next], direction === 'right');
    };

    var animateSlider = function(elementPrev, elementNext, isReverse) {
        elementNext.classList.remove('prev', 'active', 'reverse');
        elementPrev.classList.remove('next', 'active', 'reverse');
        if (isReverse === false) {
            elementNext.classList.add('next', 'reverse');
            elementPrev.classList.add('prev', 'reverse');
        } else {
            elementNext.classList.add('next');
            elementPrev.classList.add('prev');
        }

        var makeItActive = function () {
            elementNext.classList.add('active');
            elementNext.classList.remove('next', 'reverse');
            elementPrev.classList.remove('prev', 'reverse', 'active');
        };

        var values = window.getComputedStyle(elementNext);
        var delay = parseFloat(values.getPropertyValue('animation-delay')) + parseFloat(values.getPropertyValue('animation-duration'));

        setTimeout(makeItActive, delay * 1000);

    }

});