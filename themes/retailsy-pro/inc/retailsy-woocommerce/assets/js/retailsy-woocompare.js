(function($) {

    'use strict';

    $(document).ready(function() {

        var retailsyWooLoadingClass = 'loading',
            retailsyWooAddedClass = 'added in_compare',
            btnSelector = '.compare-btn';

        $(document).on('retailsy_compare_update_fragments', updateFragments)

        function productButtonsInit() {

            $(btnSelector).each(function() {

                var button = $(this);

                button.on('click', function(event) {

                    event.preventDefault();

                    var url = retailsyWoocompare.ajaxurl,
                        data = {
                            action: 'retailsy_woocompare_add_to_list',
                            pid: button.data('id'),
                            nonce: button.data('nonce'),
                            single: button.hasClass('compare-btn-single')
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

                                switch (response.data.action) {

                                    case 'add':

                                        $(btnSelector + '[data-id=' + data.pid + ']')
                                            .addClass(retailsyWooAddedClass)
                                            .find('.text')
                                            .html(retailsyWoocompare.removeText);

                                        if (response.data.comparePageBtn) {

                                            button.after(response.data.comparePageBtn);
                                        }
                                        break;

                                    case 'remove':

                                        $(btnSelector + '[data-id=' + data.pid + ']')
                                            .removeClass(retailsyWooAddedClass)
                                            .find('.text')
                                            .text(retailsyWoocompare.compareText);

                                        $('.retailsy-woocompare-page-button').remove();

                                        break;

                                    default:

                                        break;
                                }
                                data = {
                                    action: 'retailsy_woocompare_update'
                                };
                                retailsyWoocompareAjax(null, data);
                            }

                            if (undefined !== response.data.counts) {
                                $(document).trigger('retailsy_compare_update_fragments', {
                                    response: response.data.counts
                                });
                            }

                        }
                    );
                });
            });
        }

        function retailsyWoocompareAjax(event, data) {

            if (event) {

                event.preventDefault();
            }

            var url = retailsyWoocompare.ajaxurl,
                widgetWrapper = $('div.retailsy-woocompare-widget-wrapper'),
                compareList = $('div.retailsy-woocompare-list');

            data.isComparePage = !!compareList.length;
            data.isWidget = !!widgetWrapper.length;

            if ('retailsy_woocompare_update' === data.action && !data.isComparePage && !data.isWidget) {

                return;
            }
            compareList.addClass(retailsyWooLoadingClass);
            widgetWrapper.addClass(retailsyWooLoadingClass);

            $.post(
                url,
                data,
                function(response) {

                    compareList.removeClass(retailsyWooLoadingClass);
                    widgetWrapper.removeClass(retailsyWooLoadingClass);

                    if (response.success) {

                        if (data.isComparePage) {

                            $('div.retailsy-woocompare-wrapper').html(response.data.compareList);
                            $(document).trigger('enhance.tablesaw');
                        }
                        if (data.isWidget) {

                            widgetWrapper.html(response.data.widget);
                        }
                        if ('retailsy_woocompare_empty' === data.action) {

                            $(btnSelector)
                                .removeClass(retailsyWooAddedClass)
                                .find('.text')
                                .text(retailsyWoocompare.compareText);

                            $('.retailsy-woocompare-page-button').remove();
                        }
                        if ('retailsy_woocompare_remove' === data.action) {

                            $(btnSelector + '[data-id=' + data.pid + ']')
                                .removeClass(retailsyWooAddedClass)
                                .find('.text')
                                .text(retailsyWoocompare.compareText);

                            $('.retailsy-woocompare-page-button').remove();
                        }
                    }

                    if (undefined !== response.data.counts) {
                        $(document).trigger('retailsy_compare_update_fragments', {
                            response: response.data.counts
                        });
                    }

                    widgetButtonsInit();
                }
            );
        }

        function retailsyWoocompareRemove(event) {

            var button = $(event.currentTarget),
                data = {
                    action: 'retailsy_woocompare_remove',
                    pid: button.data('id'),
                    nonce: button.data('nonce')
                };

            retailsyWoocompareAjax(event, data);
        }

        function retailsyWoocompareEmpty(event) {

            var data = {
                action: 'retailsy_woocompare_empty'
            };

            retailsyWoocompareAjax(event, data);
        }

        function widgetButtonsInit() {

            $('.retailsy-woocompare-remove')
                .off('click')
                .on('click', function(event) {
                    retailsyWoocompareRemove(event);
                    var newval = Number($(".menu-right-list .arrow span").html()) - 1;
                    $(".menu-right-list .arrow span").html(newval);
                });

            $('.retailsy-woocompare-empty')
                .off('click')
                .on('click', function(event) {
                    retailsyWoocompareEmpty(event);
                });
        }

        function getRefreshedFragments() {

            $.ajax({
                url: retailsyWoocompare.ajaxurl,
                type: 'get',
                dataType: 'json',
                data: {
                    action: 'retailsy_compare_get_fragments'
                }
            }).done(function(response) {

                $(document).trigger('retailsy_compare_update_fragments', {
                    response: response.data
                });

            });

        }

        function updateFragments(event, data) {

            if (!$.isEmptyObject(data.response.defaultFragments)) {
                $.each(data.response.defaultFragments, function(key, val) {
                    var $item = $(key),
                        $count = $('.compare-count', $item);
                    if (0 === $count.length) {
                        $item.append(retailsyWoocompare.countFormat.replace('%count%', val));
                    } else {
                        $item.find('.compare-count').html(val);
                    }
                });
            }

            if (!$.isEmptyObject(data.response.customFragments)) {
                $.each(data.response.customFragments, function(key, val) {
                    var $item = $(key);
                    if ($item.length) {
                        $item.html(val);
                    }
                });
            }

        }

        widgetButtonsInit();
        productButtonsInit();
        getRefreshedFragments();

        $(document).on('retailsy_wc_products_changed', function() {
            widgetButtonsInit();
            productButtonsInit();
        });
    });
}(jQuery));