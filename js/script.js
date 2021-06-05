/**
 * .
 */

$(document).ready(function(){
    $('.reviews-slides').bxSlider({
        nextSelector: '.r-slider-control__next',
        prevSelector: '.r-slider-control__prev',
        nextText: ' ',
        prevText: ' ',
        onSliderLoad: function () {
            $(".reviews-slider .bx-pager.bx-default-pager").remove();
        }
    });

    $('.callback__btn, .header__btn, .reason__btn, .price-item__btn').click(function (e) {
        if($(this).hasClass('reason__btn')) {
            $('.popup-callback .popup__title').css('font-size', '21px').text($(this).parents('.reason').find('.reason__desc').text());
            $('.popup-callback input[name=form]')
                .val($(this).parents('.reason').find('.reason__desc').text().replace(/\s{2,}/g, ' '));
        } else {
            $('.popup-callback .popup__title').css('font-size', '23px').text($(this).text());
            $('.popup-callback input[name=form]')
                .val($(this).text().replace(/\s{2,}/g, ' '));
        }
        e.preventDefault();

        $('.overlay').fadeIn(400,
            function () {
                $('.popup-callback')
                    .css('display', 'block')
                    .animate({opacity: 1}, 200);
            });
        return false;
    });

    $('.popup__close, .overlay').click(function () {
        $('.popup')
            .animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('.overlay').fadeOut(400);
            }
        );
    });

    $('.header-decor__item').each(function(){
        var $bgobj = $(this);
        $(window).scroll(function() {
            var yPos = ($(window).scrollTop() / $bgobj.data('speed')) + $bgobj.data('pos');
            $bgobj.css({ top: yPos });
        });
    });

    $('form').submit(function(e){
        e.preventDefault();
        var self = this;

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            success: function (data, textStatus, jqXHR) {
                $(self).parents('.popup')
                    .animate({opacity: 0}, 200,
                    function () {
                        $(this).css('display', 'none');
                    }
                );
                $('.overlay').fadeIn(400,
                    function () {
                        $('.popup-thank')
                            .css('display', 'block')
                            .animate({opacity: 1}, 200);
                    });
            }
        });
    });

    $('.price__more').on('click', function(){
        if($(this).hasClass('open')) {
            $('.price-list_add').slideUp();
            $(this).removeClass('open').find('span').text('Развернуть прайс');
        } else {
            $('.price-list_add').slideDown();
            $(this).addClass('open').find('span').text('Свернуть прайс');
        }
    });

    $("input[name=phone]").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 189]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
            (e.keyCode == 57 && e.shiftKey === true) ||
                // Allow: Ctrl+C
            (e.keyCode == 48 && e.shiftKey === true) ||
                // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });



    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            alert("Спасибо!");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

   
});

// function initMap() {
//     var myLatLng = {lat: 47.218694, lng: 39.716990};

//     // Create a map object and specify the DOM element for display.
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 47.218694, lng: 39.716990},
//         scrollwheel: false,
//         zoom: 17
//     });

//     // Create a marker and set its position.
//     var marker = new google.maps.Marker({
//         map: map,
//         position: myLatLng,
//         title: 'г. Ростов-на-Дону, ул. Газетная, 71, оф. 410'
//     });
// }

// initMap();
