(function($) {

    'use strict';

    $(document).ready(function() {

        var retailsyWooLoadingClass = 'loading',
            retailsyWooAddedClass = 'added in_wishlist',
            buttonSelector = '.retailsy-woowishlist-button';

        function productButtonsInit() {

            $(buttonSelector).each(function() {

                var button = $(this);

                button.on('click', function(event) {

                    event.preventDefault();

                    if (button.hasClass('in_wishlist')) {

                        return;
                    }

                    var url = retailsyWoowishlist.ajaxurl,
                        data = {
                            action: 'retailsy_woowishlist_add',
                            pid: button.data('id'),
                            nonce: button.data('nonce'),
                            single: button.hasClass('.retailsy-woowishlist-button-single')
                        };

                    button
                        .removeClass(retailsyWooAddedClass)
                        .addClass(retailsyWooLoadingClass);

                    $.post(
                        url,
                        data,
                        function(response) {

                            button.removeClass(retailsyWooLoadingClass);

                            if (response.success) {

                                button
                                    .addClass(retailsyWooAddedClass)
                                    .find('.text')
                                    .html(retailsyWoowishlist.addedText);

                                if (response.data.wishlistPageBtn) {

                                    button.after(response.data.wishlistPageBtn);
                                }
                                var data = {
                                    action: 'retailsy_woowishlist_update'
                                };
                                retailsyWoowishlistAjax(null, data);
                            }
                        }
                    );
                });
            });
        }

        function retailsyWoowishlistAjax(event, data) {

            if (event) {
                event.preventDefault();
            }

            var url = retailsyWoowishlist.ajaxurl,
                widgetWrapper = $('div.retailsy-woocomerce-wishlist-widget-wrapper'),
                wishList = $('div.retailsy-woowishlist');

            data.isWishlistPage = !!wishList.length;
            data.isWidget = !!widgetWrapper.length;

            if ('retailsy_woowishlist_update' === data.action && !data.isWishlistPage && !data.isWidget) {
                return;
            }
            if (data.isWishlistPage) {

                data.wishListData = JSON.stringify(wishList.data());
            }
            wishList.addClass(retailsyWooLoadingClass);

            widgetWrapper.addClass(retailsyWooLoadingClass);

            $.post(
                url,
                data,
                function(response) {

                    wishList.removeClass(retailsyWooLoadingClass);

                    widgetWrapper.removeClass(retailsyWooLoadingClass);

                    if (response.success) {

                        if (data.isWishlistPage) {

                            $('div.retailsy-woowishlist-wrapper').html(response.data.wishList);
                        }
                        if (data.isWidget) {

                            widgetWrapper.html(response.data.widget);
                        }
                        if ('retailsy_woowishlist_remove' === data.action) {

                            $(buttonSelector + '[data-id=' + data.pid + ']').removeClass(retailsyWooAddedClass).find('.text').text(retailsyWoowishlist.addText);

                            $(buttonSelector + '[data-id=' + data.pid + ']').next('.retailsy-woowishlist-page-button').remove();
                        }
                    }
                    widgetButtonsInit();
                }
            );
        }

        function retailsyWoowishlistRemove(event) {

            console.log(event);

            var button = $(event.currentTarget),
                data = {
                    action: 'retailsy_woowishlist_remove',
                    pid: button.data('id'),
                    nonce: button.data('nonce')
                };

            retailsyWoowishlistAjax(event, data);
        }

        function widgetButtonsInit() {

            $('.retailsy-woowishlist-remove')
                .off('click')
                .on('click', function(event) {
                    retailsyWoowishlistRemove(event);
                    // var newval = Number($(".menu-right-list .favourite .yith-wcwl-items-count").html()) - 1;
                    // $(".menu-right-list .favourite .yith-wcwl-items-count").html(newval);
                });
        }
        widgetButtonsInit();
        productButtonsInit();

        $(document).on('retailsy_wc_products_changed', function() {
            widgetButtonsInit();
            productButtonsInit();
        });
    });
}(jQuery));