jQuery(function($) {
    var section6 = $('.jcs-section-6 .owl-carousel.owl-theme').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        "autoplayTimeout": modern_product_settings.animationSpeed,
        responsive: {
            0: {
                items: 1
            },

            460: {
                items: 2
            },

            1200: {
                items: modern_product_settings.items,
            }
        }
    });

    $('.owl-filter-bar-6').on('click', '.item', function() {
        var $item = $(this);
        var filter = $item.data('owl-filter')
        section6.owlcarousel2_filter(filter);
    });
});