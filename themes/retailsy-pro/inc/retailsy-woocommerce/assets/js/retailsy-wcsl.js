'use strict';

(function($) {
    var retailsy_woosl_cookie = 'retailsy_woosl_products';

    if (retailsy_woosl_vars.user_id !== '') {
        retailsy_woosl_cookie = 'retailsy_woosl_products_' + retailsy_woosl_vars.user_id;
    }

    $(document).on('click touch', '.woosl-button', function(e) {
        var product_id = $(this).data('id');

        $(this).addClass('loading');

        if ($(this).hasClass('add')) {
            var cart_key = $(this).data('key');

            retailsy_woosl_add_product(product_id);

            var data = {
                action: 'retailsy_woosl_add',
                product_id: product_id,
                cart_key: cart_key,
                nonce: retailsy_woosl_vars.nonce,
            };

            $.post(retailsy_woosl_vars.ajax_url, data, function(response) {
                $(this).removeClass('loading');
                window.location.replace(retailsy_woosl_vars.cart_url);
            });
        } else if ($(this).hasClass('remove')) {
            retailsy_woosl_remove_product(product_id);

            var data = {
                action: 'retailsy_woosl_remove',
                product_id: product_id,
                nonce: retailsy_woosl_vars.nonce,
            };

            $.post(retailsy_woosl_vars.ajax_url, data, function(response) {
                $(this).removeClass('loading');
                window.location.replace(retailsy_woosl_vars.cart_url);
            });
        } else if ($(this).hasClass('add-to-cart')) {
            var data = {
                action: 'retailsy_woosl_add_to_cart',
                product_id: product_id,
                nonce: retailsy_woosl_vars.nonce,
            };

            $.post(retailsy_woosl_vars.ajax_url, data, function(response) {
                if (response.indexOf('//') !== -1) {
                    window.location.replace(response);
                } else if (parseInt(response) > 0) {
                    retailsy_woosl_remove_product(parseInt(response));
                    $(this).removeClass('loading');
                    window.location.replace(retailsy_woosl_vars.cart_url);
                }
            });
        }

        e.preventDefault();
    });

    $(document).on('click touch', '.woosl-heading', function() {
        $(this).closest('.retailsy_woosl_table').toggleClass('close');
    });

    function retailsy_woosl_add_product(product_id) {
        if (retailsy_woosl_get_cookie(retailsy_woosl_cookie) != '') {
            var wooslProducts = retailsy_woosl_get_cookie(retailsy_woosl_cookie).split(',');

            wooslProducts = $.grep(wooslProducts, function(value) {
                return value != product_id;
            });

            wooslProducts.unshift(product_id);

            var wooslProductsStr = wooslProducts.join();

            retailsy_woosl_set_cookie(retailsy_woosl_cookie, wooslProductsStr, 7);
        } else {
            retailsy_woosl_set_cookie(retailsy_woosl_cookie, product_id, 7);
        }

        $(document).trigger('retailsy_woosl_add_product', [product_id, retailsy_woosl_cookie]);
    }

    function retailsy_woosl_remove_product(product_id) {
        if (retailsy_woosl_get_cookie(retailsy_woosl_cookie) != '') {
            var wooslProducts = retailsy_woosl_get_cookie(retailsy_woosl_cookie).split(',');

            wooslProducts = $.grep(wooslProducts, function(value) {
                return value != product_id;
            });

            var wooslProductsStr = wooslProducts.join();

            retailsy_woosl_set_cookie(retailsy_woosl_cookie, wooslProductsStr, 7);
        }

        $(document).
        trigger('retailsy_woosl_remove_product', [product_id, retailsy_woosl_cookie]);
    }

    function retailsy_woosl_set_cookie(cname, cvalue, exdays) {
        var d = new Date();

        d.setTime(d.getTime() + (
            exdays * 24 * 60 * 60 * 1000
        ));

        var expires = 'expires=' + d.toUTCString();

        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
    }

    function retailsy_woosl_get_cookie(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return decodeURIComponent(c.substring(name.length, c.length));
            }
        }

        return '';
    }
})(jQuery);