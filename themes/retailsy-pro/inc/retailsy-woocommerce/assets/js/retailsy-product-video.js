function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
jQuery(document).ready(function() {
    setTimeout(function(e) {
        if (jQuery('#product_video_iframe').length > 0 && jQuery('#product_video_iframe').attr('video-type') == 'youtube') {
            function getId(url) {
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regExp);
                if (match && match[2].length == 11) {
                    return match[2];
                } else {
                    return 'error';
                }
            }
            var rel = 1;
            //if(wc_prd_vid_slider_setting.retailsy_pv_related == 'yes'){ rel=1; }
            var iframe_src = getId(jQuery('#product_video_iframe').attr('data_src'));
            let start = getParameterByName('start', jQuery('#product_video_iframe').attr('data_src'));
            let autoplay = getParameterByName('autoplay', jQuery('#product_video_iframe').attr('data_src'));
            jQuery('#product_video_iframe').attr('src', 'https://www.youtube.com/embed/' + iframe_src + '?rel=' + rel + '&autoplay=' + autoplay + '&showinfo=0&enablejsapi=1&start=' + start);
            jQuery('#product_video_iframe_light').attr('href', 'https://www.youtube.com/embed/' + iframe_src + '?enablejsapi=1&wmode=opaque&start=' + start + '&rel=' + rel);
            if (jQuery('.product_video_img').attr('custom_thumbnail') != 'yes') {
                jQuery('.product_video_img').attr('src', 'https://img.youtube.com/vi/' + iframe_src + '/hqdefault.jpg');
            }
            jQuery('#product_video_iframe').css({
                'height': jQuery('#product_video_iframe').parent('div').width()
            });
            var tag = document.createElement('script');
            tag.id = 'iframe-demo';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    }, 500);

    jQuery(".single-video-thumbnail").click(function() {
        jQuery('.tc_video_slide iframe').show();
        jQuery('.retailsy_magnifier_zoom_wrap').hide();
    });

    jQuery("img.size-shop_thumbnail").click(function() {
        jQuery('.tc_video_slide iframe').hide();
        jQuery('.retailsy_magnifier_zoom_wrap').show();
    });
});