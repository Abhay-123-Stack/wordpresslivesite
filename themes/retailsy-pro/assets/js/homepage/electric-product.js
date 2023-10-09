jQuery(function($) {
    var section4 = $('.jcs-section-4 .owl-carousel.owl-theme').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        "autoplayTimeout": electric_product_settings.animationSpeed,
        responsive: {
            0: {
                items: 1
            },

            460: {
                items: 2
            },

            1200: {
                items: electric_product_settings.items,
            }
        }
    });

    $('.owl-filter-bar-4').on('click', '.item', function() {
        var $item = $(this);
        var filter = $item.data('owl-filter')
        section4.owlcarousel2_filter(filter);
    });
});