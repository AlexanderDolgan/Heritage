var main = function () {
    $('.terms__header').click(function () {
        $('.terms__content').toggleClass('hide');

        var tag = $('#terms__content');
        $('html,body').animate({scrollTop: tag.offset().top}, 'slow');

    });

    $('.sec-menu-btn').click(function () {
        $('.header-top-bar__nav').toggleClass('show');

    });
};

$(document).ready(main);

var slides = document.querySelectorAll('#slides .slides__item');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
    slides[currentSlide].className = 'slides__item';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'slides__item showing';
}

$(document).ready(nextSlide);
