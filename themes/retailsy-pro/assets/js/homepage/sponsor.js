jQuery(function($) {
    var brand = tns({
        "container": ".brand-carousel",
        "autoplay": true,
        "items": "6",
        "mouseDrag": true,
        "controls": false,
        "nav": false,
        "gutter": "30",
        // "center":true,
        "autoplayButtonOutput": false,
        "swipeAngle": false,
        "responsive": {
            0: {
                items: 2
            },
            500: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1024: {
                items: cosmetic_sponsor_settings.items,
            }

        }
    });
});