var main = function() {
    $('.terms__header').click(function() {
        $('.terms__content').toggleClass('hide');

        var tag = $('#terms__content');
        $('html,body').animate({scrollTop: tag.offset().top},'slow');

    });
};

$(document).ready(main);


