jQuery(function($) {
    $(".products").addClass("owl-carousel owl-theme").removeClass("row");
    var product = $('.jcs-section-3 .owl-carousel.owl-theme').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        "autoplayTimeout": feature_product_settings.animationSpeed,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: feature_product_settings.items,
            }

        }
    });
    $('.owl-filter-bar').on('click', '.item', function() {
        var $item = $(this);
        var filter = $item.data('owl-filter')
        product.owlcarousel2_filter(filter);
    });
});