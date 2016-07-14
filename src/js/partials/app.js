var main = function() {
    $('.term-header').click(function() {
        $('.terms').toggleClass('hide');

        var tag = $('#terms');
        $('html,body').animate({scrollTop: tag.offset().top},'slow');

    });
};

$(document).ready(main);


