jQuery(document).ready(function($) {
    jQuery(".quickview-trigger").click(function() {
        var product_value = jQuery(this).attr("data-product_id")
        var data = {
            action: 'retailsy_quick_view',
            security: MyAjax.security,
            retailsy_product_d: product_value
        };
        $.post(MyAjax.ajaxurl, data, function(response) {
            jQuery("#theme-quickview-body").html(response);

            // $('.quickview-overlay .quickview-product').attr('id',data.retailsy_product_d)
            //$("#"+product_value).css("display", "block");
            //$(`.quickview-overlay .quickview-product #${data.retailsy_product_d}`).css("display", "block")
            //alert('Product id is: ' + data.retailsy_product_d);

            // Product Slider
            var $owlProduct = $('.single-product .product .woocommerce-product-gallery__wrapper');
            var $owlProductThumb = $(".single-product .product .product-control-nav");
            var $slidesPerPage = 5;
            var $owledSecondary = true;
            $owlProduct.owlCarousel({
                rtl: $("html").attr("dir") == 'rtl' ? true : false,
                items: 1,
                autoplay: true,
                autoplayTimeout: 10000,
                margin: 0,
                loop: $('.owl-carousel .item').size() > 1 ? true : false,
                dots: false,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                singleItem: true,
                transitionStyle: "fade",
                touchDrag: true,
                mouseDrag: true,
                slideSpeed: 2000,
                responsiveRefreshRate: 200,
                responsive: {
                    0: {
                        nav: false
                    },
                    992: {
                        nav: true
                    }
                }
            }).on('changed.owl.carousel', owlPosition);
            $owlProductThumb.on('initialized.owl.carousel', function() {
                $owlProductThumb.find(".owl-item").eq(0).addClass("current");
            }).owlCarousel({
                dots: false,
                nav: false,
                margin: 20,
                smartSpeed: 200,
                slideSpeed: 500,
                touchDrag: true,
                mouseDrag: true,
                responsiveRefreshRate: 100,
                responsive: {
                    0: {
                        items: 3,
                        slideBy: 3
                    },
                    396: {
                        items: 4,
                        slideBy: 4
                    },
                    499: {
                        items: 5,
                        slideBy: 5
                    },
                    768: {
                        items: 3,
                        slideBy: 3
                    },
                    992: {
                        items: 3,
                        slideBy: 3
                    },
                    1400: {
                        items: 3,
                        slideBy: 3
                    }
                }
            }).on('changed.owl.carousel', owlPosition2);

            function owlPosition(el) {
                var count = el.item.count - 1;
                var current = Math.round(el.item.index - (el.item.count / 2) - .5);
                if (current < 0) {
                    current = count;
                }
                if (current > count) {
                    current = 0;
                }
                $owlProductThumb.find(".owl-item").removeClass("current").eq(current).addClass("current");
                var onscreen = $owlProductThumb.find('.owl-item.active').length - 1;
                var start = $owlProductThumb.find('.owl-item.active').first().index();
                var end = $owlProductThumb.find('.owl-item.active').last().index();
                if (current > end) {
                    $owlProductThumb.data('owl.carousel').to(current, 100, true);
                }
                if (current < start) {
                    $owlProductThumb.data('owl.carousel').to(current - onscreen, 100, true);
                }
            }

            function owlPosition2(el) {
                if ($owledSecondary) {
                    var number = el.item.index;
                    $owlProduct.data('owl.carousel').to(number, 100, true);
                }
            }
            $owlProductThumb.on("click", ".owl-item", function(e) {
                e.preventDefault();
                var number = $(this).index();
                $owlProduct.data('owl.carousel').to(number, 300, true);
            });


            jQuery('input[name="quantity"]').change(function() {
                var q = jQuery(this).val();
                jQuery('input[name="quantity"]').parent().next().attr('data-quantity', q);
            });
        });


    });
});