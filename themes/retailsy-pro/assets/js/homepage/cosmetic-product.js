jQuery(function($) {
    var section7 = $('.jcs-section-7 .owl-carousel.owl-theme').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        "autoplayTimeout": cosmetic_product_settings.animationSpeed,
        responsive: {
            0: {
                items: 1
            },

            460: {
                items: 2
            },

            1200: {
                items: cosmetic_product_settings.items,
            }
        }
    });

    $('.owl-filter-bar-7').on('click', '.item', function() {
        var $item = $(this);
        var filter = $item.data('owl-filter')
        section7.owlcarousel2_filter(filter);
    });
});