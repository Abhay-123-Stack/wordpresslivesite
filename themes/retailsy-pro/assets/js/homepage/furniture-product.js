jQuery(function($) {
    var section5 = $('.jcs-section-5 .owl-carousel.owl-theme').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        "autoplayTimeout": furniture_product_settings.animationSpeed,
        responsive: {
            0: {
                items: 1
            },

            460: {
                items: 2
            },

            1200: {
                items: furniture_product_settings.items,
            }
        }
    });

    $('.owl-filter-bar-5').on('click', '.item', function() {
        var $item = $(this);
        var filter = $item.data('owl-filter')
        section5.owlcarousel2_filter(filter);
    });
});