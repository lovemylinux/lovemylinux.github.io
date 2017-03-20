$(document).ready(function () {
    $('.card div.slider').simpleSlider('.card_left .photo');
    $('#slider').simpleSlider();
});

$.fn.simpleSlider = function (target) {
    var slider = this;
    var leftArrow = slider.find('a.control.toLeft').addClass('disabled');
    var rightArrow = slider.find('a.control.toRight');
    var bodySlider = slider.find('.bodySlider');
//    if (bodySlider.width() >= bodySlider.find('ul').width()) {
//        leftArrow.add(rightArrow).addClass('disabled').click(function () {
//            return false;
//        });
//    }
    leftArrow.click(function () {
        slide('prev', 3);
        return false;
    });
    rightArrow.click(function () {
        slide('next', 3);
        return false;
    });
    if (target) {
        var $target = $(target);
        bodySlider.on('click', 'a', function () {
            var src = $(this).attr('href');
            var alt = $(this).attr('alt');
            var title = $(this).attr('title');
            var targetImg = $target.find('img');
            if (!targetImg.length) {
                targetImg = $('<img/>').appendTo(target);
            }
            targetImg.attr('src', src);
            targetImg.attr('alt', alt);
            targetImg.attr('title', title);
            $(this).closest('li').addClass('selected').siblings('li').removeClass('selected');
            return false;
        });
    } else {
        var t = setInterval(function () {
            slide('next');
        }, 5000);
        slider.hover(
                function () {
                    clearInterval(t);
                    t = false;
                },
                function () {
                    t = setInterval(function () {
                        slide('next');
                    }, 5000);
                }
        );
    }


    function slide(direction, number) {
        var sign;
        switch (direction) {
            case 'prev':
            case 0:
                sign = -1;
                break;
            case 'next':
            case 1:
                sign = 1;
        }
        // Определяем текущий слайд (первый видимый)
        var curentSlide;
        slider.find('.slide').parent('li').each(function (i) {
            if ($(this).parent().position().left + $(this).children().eq(0).position().left >= 0) {
                curentSlide = $(this);
                return false;
            }
        });
        // Предыдущий и следующий слайды
        var nextSlide = curentSlide.next();
        var prevSlide = curentSlide.prev();

        if (sign > 0) {
            if (nextSlide.length) {
                // Координата правого края последнего слайда
                var isLastSlide = function () {
                    var lastSlide = slider.find('.slide').parent('li').last();
                    return (lastSlide.offset().left + lastSlide.width()) <= (bodySlider.offset().left + bodySlider.width()) ? true : false;
                };
                if (isLastSlide()) {
//                rightArrow.addClass('disabled');
                }
                leftArrow.removeClass('disabled');
                slider.find('ul').animate({
                    left: -sign * nextSlide.children().eq(0).position().left
                }, 800, isLastSlide);
            } else {
                slider.find('ul').animate({
                    left: 0
                }, 800);
            }
        }
        if (sign < 0) {
            if (prevSlide.length) {
                var firstSlide = slider.find('.slide').parent('li').first();
                var isLastSlide = function () {
                    if (firstSlide.offset().left >= bodySlider.offset().left) {
                        return true;
                    }
                };
                if (isLastSlide()) {
                    leftArrow.addClass('disabled');
                    return false;
                }
                rightArrow.removeClass('disabled');
                slider.find('ul').animate({
                    left: sign * prevSlide.children().eq(0).position().left
                }, 800, isLastSlide);
            } else {

            }
        }
        return false;
    }
};
