'use strict';

(function($) {
    var stwpb_timeout = null;

    $(function() {
        if (!$('.stwsb-wrap').length) {
            return;
        }

        $('.stwsb-wrap').each(function() {
            stwpb_init($(this));
        });
    });

    $(document).on('woosq_loaded', function() {
        // product bundles in quick view popup
        stwpb_init($('#woosq-popup .stwsb-wrap'));
    });

    $(document).
    on('click touch', '.stwsb-qty-input-plus, .stwsb-qty-input-minus',
        function() {
            // get values
            var $qty = $(this).closest('.stwsb-qty-input').find('.qty'),
                val = parseFloat($qty.val()),
                max = parseFloat($qty.attr('max')),
                min = parseFloat($qty.attr('min')),
                step = $qty.attr('step');

            // format values
            if (!val || val === '' || val === 'NaN') {
                val = 0;
            }

            if (max === '' || max === 'NaN') {
                max = '';
            }

            if (min === '' || min === 'NaN') {
                min = 0;
            }

            if (step === 'any' || step === '' || step === undefined ||
                parseFloat(step) === 'NaN') {
                step = 1;
            } else {
                step = parseFloat(step);
            }

            // change the value
            if ($(this).is('.stwsb-qty-input-plus')) {
                if (max && (
                        max == val || val > max
                    )) {
                    $qty.val(max);
                } else {
                    $qty.val((val + step).toFixed(stwpb_decimal_places(step)));
                }
            } else {
                if (min && (
                        min == val || val < min
                    )) {
                    $qty.val(min);
                } else if (val > 0) {
                    $qty.val((val - step).toFixed(stwpb_decimal_places(step)));
                }
            }

            // trigger change event
            $qty.trigger('change');
        });

    $(document).on('click touch', '.single_add_to_cart_button', function(e) {
        var $this = $(this);

        if ($this.hasClass('stwsb-disabled')) {
            e.preventDefault();
        }
    });

    $(document).on('change', '.stwsb-qty .qty', function() {
        var $this = $(this);

        stwpb_check_qty($this);
    });

    $(document).on('keyup', '.stwsb-qty .qty', function() {
        var $this = $(this);

        if (stwpb_timeout != null) clearTimeout(stwpb_timeout);
        stwpb_timeout = setTimeout(stwpb_check_qty, 1000, $this);
    });
})(jQuery);

function stwpb_init($wrap) {
    stwpb_check_ready($wrap);
    stwpb_calc_price($wrap);
    stwpb_save_ids($wrap);

    jQuery(document).trigger('stwpb_init', [$wrap]);
}

function stwpb_check_ready($wrap) {
    var total = 0;
    var selection_name = '';
    var is_selection = false;
    var is_empty = true;
    var is_min = false;
    var is_max = false;
    var wid = $wrap.attr('data-id');
    var $products = $wrap.find('.stwsb-products');
    var $alert = $wrap.find('.stwsb-alert');
    var $ids = jQuery('.stwsb-ids-' + wid);
    var $btn = $ids.closest('form.cart').find('.single_add_to_cart_button');

    // remove ajax add to cart
    $btn.removeClass('ajax_add_to_cart');

    if (!$products.length ||
        (($products.attr('data-variables') === 'no') &&
            ($products.attr('data-optional') === 'no'))) {
        // don't need to do anything
        return;
    }

    $products.find('.stwsb-product').each(function() {
        var $this = jQuery(this);

        if ((
                parseFloat($this.attr('data-qty')) > 0
            ) && (
                parseInt($this.attr('data-id')) === 0
            )) {
            is_selection = true;

            if (selection_name === '') {
                selection_name = $this.attr('data-name');
            }
        }

        if (parseFloat($this.attr('data-qty')) > 0) {
            is_empty = false;
            total += parseFloat($this.attr('data-qty'));
        }
    });

    // check min
    if ((
            $products.attr('data-optional') === 'yes'
        ) && $products.attr('data-min') && (
            total < parseFloat($products.attr('data-min'))
        )) {
        is_min = true;
    }

    // check max
    if ((
            $products.attr('data-optional') === 'yes'
        ) && $products.attr('data-max') && (
            total > parseFloat($products.attr('data-max'))
        )) {
        is_max = true;
    }

    if (is_selection || is_empty || is_min || is_max) {
        $btn.addClass('stwsb-disabled');

        if (is_selection) {
            $alert.
            html(stwpb_vars.alert_selection.replace('[name]',
                '<strong>' + selection_name + '</strong>')).slideDown();
        } else if (is_empty) {
            $alert.html(stwpb_vars.alert_empty).slideDown();
        } else if (is_min) {
            $alert.html(
                stwpb_vars.alert_min.replace('[min]', $products.attr('data-min')).replace('[selected]', total)).slideDown();
        } else if (is_max) {
            $alert.html(
                stwpb_vars.alert_max.replace('[max]', $products.attr('data-max')).replace('[selected]', total)).slideDown();
        }

        jQuery(document).
        trigger('stwpb_check_ready', [false, is_selection, is_empty, is_min, is_max, $wrap]);
    } else {
        $alert.html('').slideUp();
        $btn.removeClass('stwsb-disabled');

        // ready
        jQuery(document).
        trigger('stwpb_check_ready', [true, is_selection, is_empty, is_min, is_max, $wrap]);
    }
}

function stwpb_calc_price($wrap) {
    var total = 0;
    var total_sale = 0;
    var wid = $wrap.attr('data-id');
    var $products = $wrap.find('.stwsb-products');
    var price_suffix = $products.attr('data-price-suffix');
    var $total = $wrap.find('.stwsb-total');
    var $price = jQuery('.stwsb-price-' + wid);
    var $woobt = jQuery('.woobt-wrap-' + wid);
    var total_woobt = parseFloat($woobt.length ? $woobt.attr('data-total') : 0);
    var discount = parseFloat($products.attr('data-discount'));
    var discount_amount = parseFloat($products.attr('data-discount-amount'));
    var fixed_price = $products.attr('data-fixed-price');
    var saved = '';
    var fix = Math.pow(10, Number(stwpb_vars.price_decimals) + 1);
    var is_discount = discount > 0 && discount < 100;
    var is_discount_amount = discount_amount > 0;

    $products.find('.stwsb-product').each(function() {
        var $this = jQuery(this);
        if (parseFloat($this.attr('data-price')) > 0) {
            var this_price = parseFloat($this.attr('data-price')) *
                parseFloat($this.attr('data-qty'));
            total += this_price;
            if (!is_discount_amount && is_discount) {
                this_price *= (100 - discount) / 100;
                this_price = Math.round(this_price * fix) / fix;
            }
            total_sale += this_price;
        }
    });

    // fix js number https://www.w3schools.com/js/js_numbers.asp
    total = stwpb_round(total, stwpb_vars.price_decimals);

    if (is_discount_amount && discount_amount < total) {
        total_sale = total - discount_amount;
        saved = stwpb_format_price(discount_amount);
    } else if (is_discount) {
        saved = stwpb_round(discount, 2) + '%';
    } else {
        total_sale = total;
    }

    if (fixed_price === 'yes') {
        total_sale = parseFloat($products.attr('data-price'));
    }

    var total_html = stwpb_price_html(total, total_sale);
    var total_all_html = stwpb_price_html(total + total_woobt,
        total_sale + total_woobt);

    if (saved !== '') {
        total_html += ' <small class="woocommerce-price-suffix">' +
            stwpb_vars.saved_text.replace('[d]', saved) + '</small>';
    }

    // change the bundle total
    $total.html(stwpb_vars.price_text + ' ' + total_html + price_suffix).
    slideDown();

    if ((
            stwpb_vars.change_price !== 'no'
        ) && (
            $products.attr('data-fixed-price') === 'no'
        ) && (
            (
                $products.attr('data-variables') === 'yes'
            ) || (
                $products.attr('data-optional') === 'yes'
            )
        )) {
        if ((stwpb_vars.change_price === 'yes_custom') &&
            (stwpb_vars.price_selector != null) &&
            (stwpb_vars.price_selector !== '')) {
            $price = jQuery(stwpb_vars.price_selector);
        }

        // change the main price
        if ($woobt.length) {
            // woobt
            $price.html(total_all_html + price_suffix);
        } else {
            $price.html(total_html + price_suffix);
        }
    }

    if ($woobt.length) {
        // woobt
        $woobt.find('.woobt-products').attr('data-product-price-html', total_html);
        $woobt.find('.woobt-product-this').
        attr('data-price', total_sale).
        attr('data-regular-price', total);

        woobt_init($woobt);
    }

    jQuery(document).
    trigger('stwpb_calc_price', [total_sale, total, total_html, price_suffix, $wrap]);
}

function stwpb_save_ids($wrap) {
    var ids = Array();
    var wid = $wrap.attr('data-id');
    var $ids = jQuery('.stwsb-ids-' + wid);
    var $products = $wrap.find('.stwsb-products');

    $products.find('.stwsb-product').each(function() {
        var $this = jQuery(this);
        var id = parseInt($this.attr('data-id'));
        var qty = parseFloat($this.attr('data-qty'));
        var attrs = $this.attr('data-attrs');

        if ((id > 0) && (qty > 0)) {
            if (attrs != undefined) {
                attrs = encodeURIComponent(attrs);
            } else {
                attrs = '';
            }

            ids.push(id + '/' + qty + '/' + attrs);
        }
    });

    $ids.val(ids.join(','));

    jQuery(document).trigger('stwpb_save_ids', [ids, $wrap]);
}

function stwpb_check_qty($qty) {
    var $wrap = $qty.closest('.stwsb-wrap');
    var qty = parseFloat($qty.val());
    var min = parseFloat($qty.attr('min'));
    var max = parseFloat($qty.attr('max'));

    if ((qty === '') || isNaN(qty)) {
        qty = 0;
    }

    if (!isNaN(min) && (
            qty < min
        )) {
        qty = min;
    }

    if (!isNaN(max) && (
            qty > max
        )) {
        qty = max;
    }

    $qty.val(qty);
    $qty.closest('.stwsb-product').attr('data-qty', qty);

    // change subtotal
    if (stwpb_vars.bundled_price === 'subtotal') {
        var $products = $wrap.find('.stwsb-products');
        var $product = $qty.closest('.stwsb-product');
        var price_suffix = $product.attr('data-price-suffix');
        var ori_price = parseFloat($product.attr('data-price')) *
            parseFloat($product.attr('data-qty'));

        $product.find('.stwsb-price-ori').hide();

        if (parseFloat($products.attr('data-discount')) > 0 &&
            $products.attr('data-fixed-price') === 'no') {
            var new_price = ori_price *
                (100 - parseFloat($products.attr('data-discount'))) / 100;

            $product.find('.stwsb-price-new').
            html(stwpb_price_html(ori_price, new_price) + price_suffix).show();
        } else {
            $product.find('.stwsb-price-new').
            html(stwpb_price_html(ori_price) + price_suffix).
            show();
        }
    }

    jQuery(document).trigger('stwpb_check_qty', [qty, $qty]);

    stwpb_init($wrap);
}

function stwpb_change_price($product, price, regular_price, price_html) {
    var $products = $product.closest('.stwsb-products');
    var price_suffix = $product.attr('data-price-suffix');

    // hide ori price
    $product.find('.stwsb-price-ori').hide();

    // calculate new price
    if (stwpb_vars.bundled_price === 'subtotal') {
        var ori_price = parseFloat(price) *
            parseFloat($product.attr('data-qty'));

        if (stwpb_vars.bundled_price_from === 'regular_price' &&
            regular_price !== undefined) {
            ori_price = parseFloat(regular_price) *
                parseFloat($product.attr('data-qty'));
        }

        var new_price = ori_price;

        if (parseFloat($products.attr('data-discount')) > 0) {
            new_price = ori_price *
                (100 - parseFloat($products.attr('data-discount'))) / 100;
        }

        $product.find('.stwsb-price-new').
        html(stwpb_price_html(ori_price, new_price) + price_suffix).show();
    } else {
        if (parseFloat($products.attr('data-discount')) > 0) {
            var ori_price = parseFloat(price);

            if (stwpb_vars.bundled_price_from === 'regular_price' &&
                regular_price !== undefined) {
                ori_price = parseFloat(regular_price);
            }

            var new_price = ori_price *
                (100 - parseFloat($products.attr('data-discount'))) / 100;
            $product.find('.stwsb-price-new').
            html(stwpb_price_html(ori_price, new_price) + price_suffix).show();
        } else {
            if (stwpb_vars.bundled_price_from === 'regular_price' &&
                regular_price !== undefined) {
                $product.find('.stwsb-price-new').
                html(stwpb_price_html(regular_price) + price_suffix).
                show();
            } else if (price_html !== '') {
                $product.find('.stwsb-price-new').
                html(price_html).
                show();
            }
        }
    }
}

function stwpb_round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function stwpb_format_money(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : '$';
    thousand = thousand || ',';
    decimal = decimal || '.';

    var negative = number < 0 ? '-' : '',
        i = parseInt(
            number = stwpb_round(Math.abs(+number || 0), places).toFixed(places),
            10) + '',
        j = 0;

    if (i.length > 3) {
        j = i.length % 3;
    }

    return symbol + negative + (
        j ? i.substr(0, j) + thousand : ''
    ) + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (
        places ?
        decimal +
        stwpb_round(Math.abs(number - i), places).toFixed(places).slice(2) :
        ''
    );
}

function stwpb_format_price(price) {
    var price_html = '<span class="woocommerce-Price-amount amount">';
    var price_formatted = stwpb_format_money(price, stwpb_vars.price_decimals, '',
        stwpb_vars.price_thousand_separator, stwpb_vars.price_decimal_separator);

    switch (stwpb_vars.price_format) {
        case '%1$s%2$s':
            //left
            price_html += '<span class="woocommerce-Price-currencySymbol">' +
                stwpb_vars.currency_symbol + '</span>' + price_formatted;
            break;
        case '%1$s %2$s':
            //left with space
            price_html += '<span class="woocommerce-Price-currencySymbol">' +
                stwpb_vars.currency_symbol + '</span> ' + price_formatted;
            break;
        case '%2$s%1$s':
            //right
            price_html += price_formatted +
                '<span class="woocommerce-Price-currencySymbol">' +
                stwpb_vars.currency_symbol + '</span>';
            break;
        case '%2$s %1$s':
            //right with space
            price_html += price_formatted +
                ' <span class="woocommerce-Price-currencySymbol">' +
                stwpb_vars.currency_symbol + '</span>';
            break;
        default:
            //default
            price_html += '<span class="woocommerce-Price-currencySymbol">' +
                stwpb_vars.currency_symbol + '</span> ' + price_formatted;
    }

    price_html += '</span>';

    return price_html;
}

function stwpb_price_html(regular_price, sale_price) {
    var price_html = '';

    if (sale_price < regular_price) {
        price_html = '<del>' + stwpb_format_price(regular_price) + '</del> <ins>' +
            stwpb_format_price(sale_price) + '</ins>';
    } else {
        price_html = stwpb_format_price(regular_price);
    }

    return price_html;
}

function stwpb_decimal_places(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

    if (!match) {
        return 0;
    }

    return Math.max(
        0,
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0)
        // Adjust for scientific notation.
        -
        (match[2] ? +match[2] : 0));
}