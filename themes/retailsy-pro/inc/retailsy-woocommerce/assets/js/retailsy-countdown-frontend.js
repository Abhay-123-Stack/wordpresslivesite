'use strict';

(function($) {
    $(function() {
        retailsy_ct_init();
    });

    // WPC Smart Quick View
    $(document).on('woosq_loaded', function() {
        retailsy_ct_init();
    });

    // WPC Smart Notifications
    $(document).on('wpcsn_build_template', function() {
        retailsy_ct_init();
    });
})(jQuery);

function retailsy_ct_init() {
    jQuery('.retailsy_ct-countdown').each(
        function() {
            var $this = jQuery(this);
            var timer = $this.attr('data-timer');
            var style = $this.attr('data-style');
            var text_ended = $this.attr('data-ended');
            var timer_tz = moment.tz(timer, 'MM/DD/YYYY hh:mm a',
                retailsy_ct_vars.timezone);

            if ($this.hasClass('retailsy_ct-flipper')) {
                var timestamp = Date.parse(timer_tz.toDate());
                var timer_str = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');

                $this.find('.flipper').
                attr('data-datetime', timer_str).
                flipper('init');

                var interval = setInterval(function() {
                    if (Date.now() > timestamp) {
                        if (text_ended !== '') {
                            $this.removeClass('retailsy_ct-running').
                            addClass('retailsy_ct-ended').
                            html('<div class="retailsy_ct-text-ended">' + text_ended +
                                '</div>');
                        } else {
                            $this.remove();
                        }
                        clearInterval(interval);
                    }
                }, 1000);
            } else if (!$this.hasClass('retailsy_ct-ended')) {
                var timer_format = retailsy_ct_vars.timer_format;

                if (retailsy_ct_vars.hasOwnProperty('timer_format_' + style)) {
                    timer_format = retailsy_ct_vars['timer_format_' + style];
                }

                $this.find('.retailsy_ct-timer').
                countdown(timer_tz.toDate(), function(event) {
                    jQuery(this).html(event.strftime(timer_format));
                }).
                on('finish.countdown', function() {
                    if (text_ended !== '') {
                        $this.removeClass('retailsy_ct-running').
                        addClass('retailsy_ct-ended').
                        html('<div class="retailsy_ct-text-ended">' + text_ended +
                            '</div>');
                    } else {
                        $this.remove();
                    }
                });
            }
        },
    );
}