jQuery(function($) {
    // var in2slider = tns({
    // "container": ".page2-slider",
    // "autoplay": true,
    // "loop": false,
    // // "items": "6",
    // "mouseDrag": true,
    // "controls": false,
    // "nav": true,
    // "navContainer": "#bullet-wrapper",
    // "autoplayButtonOutput": false,
    // "controlsContainer": "#nav-wrapper",
    // "swipeAngle": false,
    // "preventScrollOnTouch": "auto",
    // "autoplayHoverPause": true,
    // "autoplayTimeout": slider_settings.animationSpeed,
    // "preventActionWhenRunning": true
    // });


    // $("#nav-wrapper .next").click(function () {
    // in2slider.goTo("next");
    // });
    // $("#nav-wrapper .prev").click(function () {
    // in2slider.goTo("prev");
    // });

    var in2slider = tns({
        "container": ".page2-slider",
        // "nav":false,
        "loop": false,
        "controls": false,
        "mouseDrag": true,
        "autoplay": true,
        //"autoplayTimeout":10000,
        "autoplayTimeout": slider_settings.animationSpeed,
        "autoplayButtonOutput": false
    });

    $("#nav-wrapper .next").click(function() {
        in2slider.goTo("next");
    });
    $("#nav-wrapper .prev").click(function() {
        in2slider.goTo("prev");
    });

    in2slider.events.on('indexChanged', function(event) {
        var data_anim = $("[data-animation]:not(.side-slide [data-animation])");
        data_anim.each(function() {
            var anim_name = $(this).data('animation');
            $(this).removeClass('animated ' + anim_name).css('opacity', '0');
        });
    });
    $("[data-delay]").each(function() {
        var anim_del = $(this).data('delay');
        $(this).css('animation-delay', anim_del);
    });
    $("[data-duration]").each(function() {
        var anim_dur = $(this).data('duration');
        $(this).css('animation-duration', anim_dur);
    });
    in2slider.events.on('indexChanged', function() {
        var data_anim = $(".home-slider").find('.tns-slide-active').find("[data-animation]");
        data_anim.each(function() {
            var anim_name = $(this).data('animation');
            $(this).addClass('animated ' + anim_name).css('opacity', '1');
        });
    });


});