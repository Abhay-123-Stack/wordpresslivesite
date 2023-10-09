jQuery(document).ready(function($) {
    "use strict";

    var modal = $("#retailsy_psc_modal");
    var htmlbody = $('html, body');
    htmlbody.on('click', '.retailsy_psc_call_popup', function() {
        htmlbody.find("#retailsy_psc_modal").show();
        htmlbody.css({
            overflow: 'hidden',
            height: '100%'
        });
    });

    htmlbody.on('click', '.retailsy_psc_modal_close', function() {
        htmlbody.find("#retailsy_psc_modal").hide();
        htmlbody.css({
            overflow: 'auto',
            height: 'auto'
        });
    });
    htmlbody.on('click', '#retailsy_psc_modal', function(event) {
        if (!event.target.closest('.retailsy_psc_modal_content')) {
            htmlbody.find("#retailsy_psc_modal").hide();
            htmlbody.css({
                overflow: 'auto',
                height: 'auto'
            });
        }
    });
});