jQuery(function($) {
    jQuery(document).ready(function($) {
        $("#color-scheme>a").click(function() {
            $(this).find("i").toggle();
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $("#color-scheme").animate({
                    "right": "-310"
                });
            } else {
                $(this).addClass("open");
                $("#color-scheme").animate({
                    "right": "0"
                });
            }
            $("#color-scheme").animate
        });

        //CHECK WHEN RELOAD PERFORM
        if (performance.type == performance.TYPE_RELOAD) {
            if (localStorage.getItem('custombox') !== '' || localStorage.getItem('custombox') !== null || localStorage.getItem('custombox') !== undefined) {
                $(":root").css({
                    "--color-hover": localStorage.getItem('custombox')
                });
            }


            //BOXED OR WIDE
            if (localStorage.getItem("layout") == "boxed") {
                if (localStorage.getItem('back-pattern') !== '' || localStorage.getItem('back-pattern') !== null || localStorage.getItem('back-pattern') !== undefined) {
                    $("body,.sticky-header").addClass("boxed");
                    $("#bg").slideDown();
                    $("html").css("background-image", localStorage.getItem('back-pattern'));
                    //console.log("boxed.......");
                }
            } else {
                $("body").removeClass("boxed");
                //console.log("Fulllllll.....");
            }

        } else {
            console.info("This page is not reloaded");
            $(":root").css({
                "--color-hover": "var(--color-hover)"
            });
        }


        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                var r = parseInt(result[1], 16);
                var g = parseInt(result[2], 16);
                var b = parseInt(result[3], 16);
                return r + "," + g + "," + b; //return 23,14,45 -> reformat if needed 
            }
            return null;
        }

        //CUSTOM COLOR
        $(".color-changer").click(function() {
            $(this).parent().siblings().children().removeClass("clicked");
            $(this).addClass("clicked");
            var col_val = $(this).attr("data-myval");
            localStorage.setItem("custombox", hexToRgb(col_val));
            $(":root").css({
                "--color-hover": hexToRgb(col_val)
            });
        });

        //COLOR PICKER
        $("[data-jscolor]").change(function() {
            var col_val2 = $(this).val();
            $(":root").css({
                "--color-hover": hexToRgb(col_val2)
            });
            localStorage.setItem("custombox", hexToRgb(col_val2));
        });


        //RESET COLOR
        $("#resetColor").click(function() {
            $(":root").css({
                "--color-hover": hexToRgb(style_settings.themeColor)
            });
            localStorage.setItem("custombox", hexToRgb(style_settings.themeColor));
        })


        //PATTERN APPLICATION
        $(".style-palette-bg .pattern-changer").click(function() {
            // console.log($(this).find("span").css("background-image"));
            $(this).parent().siblings().children().removeClass("clicked");
            $(this).addClass("clicked");
            var apply_pattern = $(this).find("span").css("background-image");
            $("html").css("background-image", apply_pattern);
            localStorage.setItem("back-pattern", apply_pattern);
        });


        //BOXED OR WIDE CLICK CHECK FOR PATTERN
        $(".style-palette-bx li a").click(function() {
            var layout = $(this).attr("id");
            if (layout == "boxed") {
                $("body").addClass("boxed");
                localStorage.setItem("layout", "boxed");
                $("#bg").slideDown();
            } else {
                $("body").removeClass("boxed");
                localStorage.setItem("layout", "wide");
                $("#bg").slideUp();
            }
        });

    });
});