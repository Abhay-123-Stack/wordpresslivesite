(function($) {
    'use strict';

    $(window).resize(function() {
        let srw_wid = $(window).outerWidth();
        let srw_hght = $(window).outerHeight();
    });
    let sw_wid = $(window).outerWidth();
    let sw_hght = $(window).outerHeight();


    $(".bi-dash,.bi-plus,.modal-item-close").on("keydown", function(t) {
        if (t.keyCode == 13) {
            $(this).click();
        }
    });


    $("#pagewrapper").hide();
    $("html,body").css("overflow-y", "auto");
    // END:PAGELOADER
    $(function() {

        //Header
        $("ul.menu-right-list .cart-wrapper").clone().appendTo(".mobile-menu-right ul.header-wrap-right");


        //STICKY HEADER AND MENU
        var headerHeight;
        var newElement = $("<div class='d-none'></div>");
        $(".header").after(newElement);

        function stikHeader() {
            /* Get Header Height */
            headerHeight = $(".header").outerHeight();
            newElement.css("height", headerHeight);

            if ($(window).scrollTop() > headerHeight + 100) {
                $("#above-header").slideUp();
                $(".header").addClass("sticky-header");
                newElement.removeClass("d-none");
            }

            if ($(window).scrollTop() == 0) {
                $("#above-header").slideDown();
                $(".header").removeClass("sticky-header");
                newElement.addClass("d-none");
            }
        }

        stikHeader();

        $(window).on("scroll", function() {
            stikHeader();
        });


        //PAGE SCROLLUP TO START
        $(".scrollup").click(function() {
            $("body,html").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });



        //ACTIVE MENU LINK PAGE

        // Get current page URL
        var url = window.location.href;

        // Loop all menu items
        $(".menubar a, .theme-mobile-menu a").each(function() {

            // select href
            var href = $(this).attr('href');
            // console.log(href)

            // Check filename
            if (url == href) {

                // Select parent class
                var parentClass = $(this).parents("ul.menu-wrap").children("li").children("a").attr('class');
                // console.log(parentClass)
                if (parentClass == 'nav-link') {
                    // Add class
                    $(this).parents(".nav-item").children("a").addClass('hover-color').css("font-weight", "800");
                    $(this).parents(".dropdown-menu").find(".hover-color").css({
                        "background-color": "#f4f7fc"
                    });
                    // console.log("pass");
                } else {
                    // console.log("fail");
                }
            }
        });


        //BOTTOM APP MENU ACTIVE
        $(".fixed-bottom-menu a").each(function() {

            // select href
            var href = $(this).attr('href');
            // console.log(href)
            // Check filename
            if (url == href) {

                $(this).addClass('hover-color');
                if ($(this).parent().attr("id") == "fix-3") {
                    $(this).children().css("color", "#ffffff");
                } else {
                    $(this).children().addClass('hover-color');

                }
            }
        });



        $(".product-statics-bar .fa").on("keypress", function(e) {
            if (e.which == 13) {
                $(this).click();
            }
        });


        //START: SLIDER NAV BULLET ACTIVATION INDICATOR
        setInterval(() => {
            $(".tns-nav-active").parent().children().css("background-color", "rgba(var(--color-icon),1)");
            $(".tns-nav-active").css("background-color", "rgba(var(--color-hover),1)");
        }, 500);
        //END: SLIDER NAV BULLET ACTIVATION INDICATOR


        //SCALE WIDTH CALCULATION
        $(".sold-count").each(function() {
            var sld = $(this).children(".sold").text();
            var cnt = $(this).children(".total").text();
            var scale_width = (sld * 100) / cnt;
            $(this).siblings(".sold-scale").css({
                "--scale-width": `${scale_width}%`
            });
        });


        //PRODUCT PAGE GRID + LIST VIEW CONCEPT
        var defaultcolview = $(".tiles-container>div").attr("class");
        $(".sorting i").click(function() {
            if (!$(this).hasClass("view-selected")) {
                $(this).parent().children("i").toggleClass("view-selected");
            }
            var class_list = [defaultcolview, "col-12"];
            var i = class_list.length;
            console.log(class_list[0]);
            if ($(this).hasClass("list-view")) {
                $(".tiles-container>div").attr("class", class_list[1]);
                $(".tiles-container .section-content").addClass("jcs-row align-items-start");
                $(".tiles-container .section-content").find(".list-content").show();
                $(".tiles-container .section-content .hover").children("a").hide();
                if ($("body").hasClass("product")) {
                    $(".tiles-container .section-content").children(".section-image").addClass("col-sm-4");
                    $(".tiles-container .section-content").children(".section-description").addClass("col-sm-8 pl-4");
                } else {
                    $(".tiles-container .section-content").children(".section-image").addClass("col-sm-4 col-md-3");
                    $(".tiles-container .section-content").children(".section-description").addClass("col-sm-8 col-md-9 pl-4");
                }

            } else {
                $(".tiles-container>div").attr("class", class_list[0]);
                $(".tiles-container .section-content").removeClass("jcs-row align-items-start");
                $(".tiles-container .section-content").find(".list-content").hide();
                $(".tiles-container .section-content .hover").children("a").show();
                if ($("body").hasClass("product")) {
                    $(".tiles-container .section-content").children(".section-image").removeClass("col-sm-4");
                    $(".tiles-container .section-content").children(".section-description").removeClass("col-sm-8 pl-4");
                } else {
                    $(".tiles-container .section-content").children(".section-image").removeClass("col-sm-4 col-md-3");
                    $(".tiles-container .section-content").children(".section-description").removeClass("col-sm-8 col-md-9 pl-4");
                }

            }
        });


        //  START: MOBILE NAVIGATION
        $(".toggle-lines.menu-toggle").click(function() {
            $(this).parents(".menu-toggle-wrap").siblings(".mobile-menu").addClass("modal-opened").css({
                "transform": "translateX(0)",
                "visibility": "visible"
            });
            $(".header").addClass("no-animation");
        });

        //SHOW LINKS
        $(".theme-mobile-menu .menu-item").on("click", function(e) {
            e.stopPropagation();
            $(this).toggleClass("active");
            $(this).children(".mobile-toggler").children().toggleClass("active");
            if (!$(this).hasClass("active")) {
                //hide all dropdown menus
                $(this).find(".dropdown-menu").slideUp();
                $(this).find(".dropdown-menu").children().removeClass("active");
            } else {
                $(this).children(".dropdown-menu").slideDown();
            }
        });


        //HAMBURGER CLOSE
        $(".theme-mobile-menu .close-style").click(function() {
            $(this).parent().removeClass("modal-opened").css({
                "transform": "translateX(-150%)",
                "visibility": "hidden"
            });
            $(".toggle-lines").focus();
            $(".header").removeClass("no-animation");
        });

        // END: MOBILE NAVIGATION

        //BOTTOM FOOTER FIXED SEARCH
        $(".fixed-bottom-menu a#bottom-search-area").on("click", function() {
            // productsearchTrap
            var productsearchTrap = function(elem) {
                let tabbable = elem.find('select, input, textarea, button, a,button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').filter(':visible');

                let firstTabbable = tabbable.first();
                let lastTabbable = tabbable.last();
                /*set focus on first input*/
                firstTabbable.focus();

                /*redirect last tab to first input*/
                lastTabbable.on('keydown', function(e) {
                    if ((e.which === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        firstTabbable.focus();
                    }
                });

                /*redirect first shift+tab to last input*/
                firstTabbable.on('keydown', function(e) {
                    if ((e.which === 9 && e.shiftKey)) {
                        e.preventDefault();
                        lastTabbable.focus();
                    }
                });
            };

            $(".navigation-middle").addClass("active");
            $(".header").addClass("no-animation");
            $(".navigation-middle").children().fadeIn(1400);
            productsearchTrap($(".footer-search-overlay"));
        });

        //SMALL SCREEN SEARCH CLOSE
        $(".footer-search-overlay .close-style").on("click", function(e) {
            $(".navigation-middle").removeClass("active");
            $(".header").removeClass("no-animation");
            $(".navigation-middle").children().fadeOut(1400);
            $("a#bottom-search-area").focus();
        });

        $(window).resize(function() {
            let srw_wid = $(window).outerWidth();
            if (srw_wid > 991) {
                if ($(".navigation-middle").hasClass("active")) {
                    $(".navigation-middle").removeClass("active");
                } else {
                    $(".navigation-middle").children().show();
                }
            }
        });

        //BOTTOM FOOTER CATEGORIES
        $(".fixed-bottom-menu a#footer-bottom-category").on("click", function() {
            $(".toggle-lines").click();
            $(".switcher-tab > button.cat-menu-bt").click();
            $(".header-close-menu.close-style").focus();
        });



        // dropclick//
        $(".faq-singular").on("click", function() {
            if ($(this).hasClass("active")) {
                $(this).parent().find(".faq-answer").slideUp(700);
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
                $(this).parent().find(".faq-answer").slideDown(700);
            }
        });

        // FAQ FILTER

        $(".faq-filter a").click(function() {
            $(this).parents("#faq-filter-container").nextAll(".quest").children().hide();
            if ($(this).hasClass("faq-all")) {
                $(this).parents("#faq-filter-container").nextAll(".quest").children().show();
            } else {
                var filter_b_result = $(this).attr("data-cat");
                $(this).parents("#faq-filter-container").nextAll(".quest").find(".faq-label").filter(`[aria-cat*=${filter_b_result}]`).parent().show();
            }
        });


        $(".trial-for-quote").click(function() {
            $(this).siblings().removeClass("faq-filter-active");
            $(this).addClass("faq-filter-active");
        });

        // FILTER TEAM
        $("#faq-filter a").click(function() {
            $(this).parents("#faq-filter-container").next().children().hide();
            if ($(this).hasClass("faq-all")) {
                $(this).parents("#faq-filter-container").next().children().show();
            } else {
                var filter_team_result = $(this).attr("data-cat");
                $(this).parents("#faq-filter-container").next().find(".team-card").filter(`[aria-cat*=${filter_team_result}]`).show();
            }
        });

        //CART CLOSE



        //WISH ITEM COUNTING
        $(".wish-quantity i,.pp i").click(function() {
            if ($(this).hasClass("bi-dash")) {
                var minus = $(this).siblings(".wish-value").html();
                if (minus == 1) {
                    $(this).css("pointer-events", "pointer");
                } else {
                    minus--;
                    $(this).siblings(".wish-value").html(minus);
                }
            } else {
                var plus = $(this).siblings(".wish-value").html();
                plus++;
                $(this).siblings(".wish-value").html(plus);
            }

            // var tot = $(this).parent().next().html();
            var tot = $(this).parent().children(".wish-value").html() * $(this).parents(".quantity-box").prev().children().html();
            tot_val = tot.toFixed(2);
            console.log($(this).parents(".quantity-box").next().children().html(tot_val));
            console.log($(this).parents(".quantity-box").prev().children().html());
        });


        //Newsletter Popup
        $(".signin-model-details .signin-close").click(function() {
            $(".signin-overlay").fadeOut();
            $(".header-above-info .widget-left .widget:first-child .contact-area").focus();
        });


        //PURCHASE POPUP

        setTimeout(function() {
            $("#purchase-popup").animate({
                "right": "0"
            }, function() {
                setTimeout(function() {
                    $("#purchase-popup").fadeOut();
                }, 10000);
            });
        }, 30000);


        $(".purchase-close").on("click", function() {
            $("#purchase-popup").effect("explode");
        });

        // ANNOUNCEMENT BAR 

        setTimeout(function() {
            $("#announcement-section").fadeIn();
        }, 20000);

        $(".announce-close").on("click", function() {
            $("#announcement").animate({
                "right": "100%"
            }).hide(400);
        });


        // DETAIL-PRODUCT-IMAGE-CHANGING
        $(".sm-imgs-slider .image-blog").click(function(e) {
            var sm_img_add = $(this).find("img").attr("src");
            var sm_img_zoom = $(this).find("img").attr("data-zoom")
            // console.log(sm_img_add)
            $(".big-details-img img").attr("src", sm_img_add);
            $(".big-details-img img").attr("data-zoom", sm_img_zoom);
        });



        $(".close").click(function() {
            $(this).parent().hide();
        });

        //MENU CATEGORY DROPDOWN
        //new

        $(".product-category-browse>.product-category-btn").on("click", function(e) {
            if ($(window).width() > 991) {
                $(this).parent().toggleClass("active modal-opened");
                $(this).next().find(".main-menu").slideToggle();
                if ($(this).parent().hasClass("active")) {
                    $(".outer-nav-wrapper.in2:not(.no)").addClass("active");
                    $(".banner .jcs-row:not(.home3 .banner .jcs-row,.home2 .banner .bubble-flex) ").css("width", "calc(100% - 320px)");
                    $(".home3 .page2-slider-wrapper").addClass("down");
                    $(".banner-main-content").addClass("down");
                    $(".offer,.banner-item-desc").addClass("down");
                } else {
                    $(".outer-nav-wrapper.in2:not(.no)").removeClass("active");
                    $(".banner .jcs-row ").css("width", "100%");
                    $(".home3 .page2-slider-wrapper").removeClass("down");
                    $(".banner-main-content").removeClass("down");
                    $(".offer,.banner-item-desc").removeClass("down");
                }
            }
        });

        var category_limit = MyAjax.category_limit;

        if ($('.product-category-menus-list ul.main-menu').children().length >= category_limit) {
            $(".product-category-menus-list").addClass("active");
            $(".product-category-menus-list ul.main-menu").append('<li class="menu-item more-item"><button type="button" class="browse-more"><i class="fa fa-plus"></i> <span>More Category</span></button></li>');
            $(".product-category-menus-list > ul.main-menu > li:not(.more-item)").slice(0, category_limit).show();
            $(".browse-more").on('click', function(e) {
                if (!$(".browse-more").hasClass("active")) {
                    $(".browse-more").addClass("active");
                    $('.browse-more i').removeClass('fa-plus').addClass("fa-minus");
                    $(".browse-more").animate({
                            display: "block"
                        }, 500,
                        function() {
                            $(".product-category-menus-list > ul.main-menu > li:not(.more-item):hidden").addClass('actived').slideDown(200);
                            if ($(".product-category-menus-list > ul.main-menu > li:not(.more-item):hidden").length === 0) {
                                $(".browse-more").html('<i class="fa fa-minus"></i> <span>No More</span>');
                            }
                        }
                    );
                } else {
                    $(".browse-more").removeClass("active");
                    $(".browse-more").animate({
                            display: "none"
                        }, 500,
                        function() {
                            if ($(".product-category-menus-list > ul.main-menu > li:not(.more-item)").hasClass('actived')) {
                                $(".product-category-menus-list > ul.main-menu > li:not(.more-item).actived").slice(0, category_limit).slideUp(200);
                                $(".browse-more").html('<i class="fa fa-plus"></i> <span>More Category</span>');
                            }
                        }
                    );
                }
            });
        }

        $(window).on("scroll", function() {
            if ($("header").hasClass("sticky-header")) {
                $(".home3 .product-category-menus-list.active").css("margin-top", "0");
                //console.log("sticky-header")
            } else {
                $(".home3 .product-category-menus-list.active").css("margin-top", "30px");
                // console.log("non-sticky")
            }
        });


        //SPINNER DISPLAY TOGGLE
        var spinner_count = 0;
        $(window).on("scroll", function() {
            if ($(".header").hasClass("sticky-header") && spinner_count == 0 && $(".product-category-browse").hasClass("active")) {
                $(".fa.fa-spinner").addClass("active");
                $(".product-category-browse.active").click(function() {
                    spinner_count = 1;
                    $(".fa-spinner").hide();
                });
            } else {
                $(".fa.fa-spinner").removeClass("active");
            }
        });


        //TAB SWITCHING
        $(".product-detail-mid>.nav-link a").click(function() {
            var filter_link = $(this).attr("data-link");
            $(this).parent().children().removeClass("active-link");
            $(this).addClass("active-link");
            $(this).parent().siblings(".details-tab-switch").children().hide();
            $(this).parent().siblings(".details-tab-switch").children().filter(`[aria-link*=${filter_link}]`).show();
        });

        //CONTENT PAGE TAB SWITCHING
        $(".content-p-left a").click(function() {
            var filter_content = $(this).attr("data-policy");
            $(this).parents(".content-p-left").parent().next().children().removeClass("active");
            $(this).parents(".content-p-left").parent().next().children().filter(`[aria-policy*=${filter_content}]`).addClass("active");
        });

        //CONTENT ALL PAGE ACTIVE LINK
        $(".content-p-left a").click(function() {
            $(".content-p-left a").removeClass("activated");
            $(this).addClass("activated");
        });


        //wishcloce
        $(".bi-x-lg.clos").click(function() {
            $(this).parents("tr").hide();
        });

        //SCROLL UP
        $(window).on("scroll", function() {
            // console.log($(window).scrollTop());
            var scrol = $(window).scrollTop();
            if (scrol <= 500) {
                $(".scrollup").hide();
            } else {
                $(".scrollup").fadeIn(300);
            }
        });

        $(".scrollup").click(function() {
            $("body,html").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });

        // Preloader

        // $(".prealoader").delay(2000).fadeOut("slow");


        //form-password-toggle
        $('label[for="password"],label[for="conformpassword"]').attr({
            "data-show": "\uF340"
        });
        $('label[for="password"],label[for="conformpassword"]').click(function(e) {
            if ($(this).attr("data-show") == "\uF340") {
                $(this).attr("data-show", "\uF341");
                $(this).next().attr("type", "text");
            } else {
                $(this).attr("data-show", "\uF340");
                $(this).next().attr("type", "password");
            }
        });




        //ADD CART POPUP
        $("a").click(function(e) {
            if ($(this).hasClass('add-cart') || $(this).hasClass('add-to-cart') || $(this).hasClass('home3-add-cart')) {
                e.preventDefault();
                $(this).attr("href", "javascript:void(0)");
                if ($(this).hasClass('add-cart')) {
                    $(this).after('<a href="shopping-cart.html" class="view-cart">View Cart</a>'); //Change button on grid view
                    $(this).parents(".section-image").next().children(".list-content").find(".view-to-cart").show(); //change button in list view "view cart"
                    // $(cart_button).next().show();
                    $(this).hide(); //hide default button on grid view
                    $(this).parents(".section-image").next().children(".list-content").find(".add-to-cart").hide(); //change button in list view
                }

                if ($(this).hasClass('add-to-cart')) {
                    $(this).hide();
                    $(this).next().show();
                    $(this).parents(".section-content").find(".add-cart").after('<a href="shopping-cart.html" class="view-cart">View Cart</a>'); //add element
                    $(this).parents(".section-content").find(".view-cart").hide();
                    $(this).parents(".section-content").find(".add-cart").hide();
                }
                if ($(this).hasClass('home3-add-cart')) {
                    $(this).after('<a href="shopping-cart.html" class="view-cart cbb blue">View Cart</a>').css({
                        "top": "1px",
                        "bottom": "-11px"
                    });
                    $(this).next().css({
                        "top": "1px",
                        "bottom": "-11px",
                        "position": "relative"
                    });
                    $(this).hide();
                }
                // alert("you are done");
                var check = `
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"
                width="70">
                <circle class="checkmark-circle" cx="26" cy="26" r="23" fill="none" />
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <div>
                <p class="text-center">Item added successfully</p>
                   </div>`;
                var cart_pop = $('<div id="cart-add-check"></div>').html(check);
                $(cart_pop).appendTo("body");
                setTimeout(function() {
                    $(cart_pop).remove();
                    $(window).css("pointer-event", "none");
                }, 3000);
                var newval = Number($(".cart-main .e-commerce-corn + span").html()) + 1;
                $(".cart-main .e-commerce-corn + span").html(newval);

            }
        });


        //   QUICK VIEW PRODUCT
        $(".view-trigger").click(function() {
            $("body").addClass("overlay");

            var view_src = $(this).parents(".section-content").find(".section-image").find("img").attr("src");

            var sec_name = $(this).parents(".section-content").find(".section-name").text();

            var wish_price = $(this).parents(".section-content").find(".section-price").children("span").text();

            display_view = $("#v_pop_id").html(`
     <button class="view-close" style="padding:8px 15px;"><i class="fa fa-times"></i></button>
     <div class="pop-item-container">
     <div class="jcs-row detail-product align-items-start">
     <div class="details images-section jcs-row col-md-5 col-lg-6">
         <div class="jcs-row ais gap10 jcs-jf-c" id="v2-imgs">
             <div class="big-details-img">
                 <img src="${view_src}" alt=""
                     data-zoom="${view_src}">

             </div>
             <div class="sm-details-imgs-v2 item-wrapper ais">
                           <div class="sm-imgs-slider item-wrapper gap10">
                     <button class="image-blog"><img src="assets/images/product-detail/image2.png"
                             alt="" data-zoom="assets/images/product-detail/image2.png"></button>
                     <button class="image-blog"><img src="assets/images/product-detail/image3.png"
                             alt="" data-zoom="assets/images/product-detail/image3.png"></button>
                     <button class="image-blog"><img src="assets/images/product-detail/image2.png"
                             alt="" data-zoom="assets/images/product-detail/image2.png"></button>
                     <button class="image-blog"><img src="assets/images/product-detail/image3.png"
                             alt="" data-zoom="assets/images/product-detail/image3.png"></button>
            </div>
             </div>
         </div>
     </div>
     <div class="details product-det col-md-7 col-lg-6">
         <div class="pane-area"></div>
         <div class="title30">${sec_name}</div>
         <div class="jcs-row gap10">
             <div class="p-reviews item-wrapper gap10">
                 <div class="section-rating">
                     <i class="bi-star-fill"></i>
                     <i class="bi-star-fill"></i>
                     <i class="bi-star-fill"></i>
                     <i class="bi-star-fill"></i>
                     <i class="bi-star"></i>
                 </div>
                 <div class="rviews-count title14 ">Reviews <span>3</span></div>
             </div>
             <div class="categories">
                 <div class="title14 bold">Categories: <span>Furniture</span></div>
             </div>
         </div>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A accusamus hic saepe quidem culpa
             quaerat est beatae laborum repudiandae adipisci.
         </p>
         <hr>
         <div class="title24 bold primary">$<span>${wish_price}</span></div>
         <div class="item-wrapper gap10">
             <div class="title14 bold primary">Quantity</div>
             <div class="wish-quantity">
                 <div class="item-wrapper">
                     <i class="bi-dash" tabindex="0"></i>
                     <div class="wish-value">0</div>
                     <i class="bi-plus" tabindex="0"></i>
                 </div>
             </div>
         </div>
         <div class="item-wrapper gap10">
             <div class="title14 bold primary">Color:</div>
             <a href="javascript:void(0)" id="c-default" class="product-color"></a>
             <a href="javascript:void(0)" id="c-1" class="product-color"></a>
             <a href="javascript:void(0)" id="c-2" class="product-color"></a>
         </div>

         <div class="item-wrapper ais gap10">
             <div class="title14 bold primary" style="width:40px;margin-top:5px;">Size:</div>
             <div class="d-flex gap10 selector-circle">
             <a href="javascript:void(0)" id="s-xs" class="product-size">XS</a>
             <a href="javascript:void(0)" id="s-s" class="product-size">S</a>
             <a href="javascript:void(0)" id="s-m" class="product-size">M</a>
             <a href="javascript:void(0)" id="s-l" class="product-size">L</a>
             <a href="javascript:void(0)" id="s-xl" class="product-size">XL</a>
             <a href="javascript:void(0)" id="s-xxl" class="product-size">XXL</a>
             </div>
         </div>
         <div id="timer5"></div>
         <div class="chek-before jcs-row gap10">
             <div class="button-bubble-container ">
                 <a href="#" class="cbb blue add-to-cart pv">Add To
                     Cart</a>
                 <a href="shopping-cart.html" class="cbb blue view-to-cart pv">View
                     Cart
                 </a>
             </div>
             <div class="cvw">
                 <div class="item-wrapper">
                     <a href="" class="form-social c-icon"><i class="fa fa-heart"></i><i
                             class="fa fa-heart"></i></a>
                     <a href="" class="form-social c-icon"><i class="fa fa-sync"></i><i
                             class="fa fa-sync"></i></a>
                     <a href="" class="form-social c-icon"><i class="fa fa-eye"></i><i
                             class="fa fa-eye"></i></a>
                 </div>
             </div>
         </div>
         <hr>
         <div class="jcs-row gap10">
             <a href="#" class="trust trust-bedge"><img
                     src="assets/images/product-detail/trust-bedges/1.png" alt=""></a>
             <a href="#" class="trust trust-bedge"><img
                     src="assets/images/product-detail/trust-bedges/2.png" alt=""></a>
             <a href="#" class="trust trust-bedge"><img
                     src="assets/images/product-detail/trust-bedges/3.png" alt=""></a>
             <a href="#" class="trust trust-bedge"><img
                     src="assets/images/product-detail/trust-bedges/4.png" alt=""></a>
         </div>

         <div class="likeandshare item-wrapper ais gap10">
             <div class="title14 bold primary" style="margin-top:5px;width:50px;">Share:</div>

             <div class="social-link off-white">
                 <div class="jcs-row contact-icon-wrap" style="gap:0;">
                     <a href="" class="form-social c-icon"><i class="fa fa-facebook-f"></i><i
                             class="fab fa-facebook-f"></i></a>
                     <a href="" class="form-social c-icon"><i class="fa fa-twitter"></i><i
                             class="fab fa-twitter"></i></a>
                     <a href="" class="form-social c-icon"><i class="fa fa-instagram"></i><i
                             class="fab fa-instagram"></i></a>
                     <a href="" class="form-social c-icon"><i class="fa fa-linkedin-in"></i><i
                             class="fab fa-linkedin-in"></i></a>
                 </div>
             </div>
         </div>
     </div>
 </div>
     </div>`);
            $(".v_pop").css({
                "transform": "translate3d(-50%,-50%,0) scale(1)"
            });

            $(".view-close").click(function() {
                $("body").removeClass("overlay");
                $(this).parents(".v_pop").css({
                    "transform": "translate3d(-50%,-50%,0) scale(0)"
                });
            });
        });







        // COMPARE POPUP

        let compare = $("<div class='compare_table_pop' id='compare_pop'></div>").appendTo("body");

        let display_comp = $(compare).html(`
    <button class="compare-close"><i class="fa fa-times"></i></button>
    <div class="pop-item-container">
        <table class="comparing">
            <tr>
                <th>Product Image</th>
            </tr>
            <tr>
                <th>Product Name</th> 
            </tr>
            <tr>
                <th>Rating</th>  
            </tr>
            <tr>
                <th>Price</th> 
            </tr>
            <tr>
                <th>Description</th>
            </tr>
            <tr>
                <th>Color</th>  
            </tr>
            <tr>
                <th>Size</th> 
            </tr>
            <tr>
                <th>Brand</th>
            </tr>
            <tr>
                <th>Add To Cart</th>
            </tr>

        </table>
     </div>`);
        let compare_count = 0;

        $(".compare-trigger").click(function() {
            $("body").addClass("overlay");
            compare_count++;

            var d_prop = $(this).children(".fa-refresh").attr("style");
            if ((d_prop == undefined || d_prop == "display:block") && compare_count < 4) {
                $(this).children().animate({
                    deg: 720
                }, {
                    duration: 500,
                    step: function(now) {
                        $(this).css({
                            transform: 'rotate(' + now + 'deg)'
                        });
                    }
                });
                $(this).children().hide(700, function() {
                    $(this).parent().append("<i class='bi-check' style='color:teal;'></i>");
                });


                var view_src = $(this).parents(".section-content").find(".section-image").find("img").attr("src");

                var sec_name = $(this).parents(".section-content").find(".section-name").text();

                var wish_price = $(this).parents(".section-content").find(".section-price").children("span").text();

                $(".compare_table_pop .comparing tbody tr:nth-child(1)").append(`<td> <div class="table-image image-blog"><img src="${view_src}" alt=""></div></td>`);
                $(".comparing tbody tr:nth-child(2)").append(`<td> <a href="" class="table-name">${sec_name}</a></td>`);
                $(".comparing tbody tr:nth-child(3)").append(`<td> <div class="table-image"><i class="bi-star-fill"></i>
        <i class="bi-star-fill"></i>
        <i class="bi-star-fill"></i>
        <i class="bi-star-fill"></i>
        <i class="bi-star-fill"></i></div></td>`);
                $(".compare_table_pop .comparing tbody tr:nth-child(4)").append(`<td><div class="table-price">$35</div></td>`);
                $(".compare_table_pop .comparing tbody tr:nth-child(5)").append(`<td>  <div class="table-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</div></td>`);
                $(".compare_table_pop .comparing tbody tr:nth-child(6)").append(`<td><div class="table-color"><a href="javascript:void(0)" id="c-default"
        class="product-color"></a>
        <a href="javascript:void(0)" id="c-1" class="product-color"></a>
        <a href="javascript:void(0)" id="c-2" class="product-color"></a>
        <a href="javascript:void(0)" id="c-3" class="product-color"></a></div></td>`);
                $(".compare_table_pop .comparing tbody tr:nth-child(7)").append(`<td> <div class="table-size">
        <a href="javascript:void(0)" id="small" class="product-size">S</a>
        <a href="javascript:void(0)" id="medium" class="product-size">M</a>
        <a href="javascript:void(0)" id="large" class="product-size">L</a>
        <a href="javascript:void(0)" id="x-large" class="product-size">XL</a>
        <a href="javascript:void(0)" id="2x-large" class="product-size">2XL</a></div></td>`);
                $(".compare_table_pop .comparing tbody tr:nth-child(8)").append(`<td> <div class="table-brand">Easy</div></td>`);
                $(".compare_table_pop .comparing tbody tr:nth-child(9)").append(`<td><div class="table-cart">
        <div class="button-bubble-container" style="width: 100%;">
            <a href="javascript:void(0)" class="add-to-cart cbb blue"                style="display: block;">Add To Cart</a>
            <a href="" class="view-to-cart cbb blue" style="display:none;">View Cart</a>
                    </div>
    </div></td>`);
                $(".compare_table_pop .comparing").css({
                    "width": "unset"
                });
                $(".compare_table_pop .comparing td").css({
                    "width": "270px"
                });
                $(".compare_table_pop .comparing th").css({
                    "min-width": "200px"
                });
                $(".compare_table_pop").css({
                    "transform": "translate3d(-50%,-50%,0) scale(1)"
                });
                var newval = Number($(".arrow .e-commerce-corn + span").html()) + 1;
                $(".arrow .e-commerce-corn + span").html(newval);
            }
            $(".compare-close").click(function() {
                $("body").removeClass("overlay");
                $(this).parents(".compare_table_pop").css({
                    "transform": "translate3d(-50%,-50%,0) scale(0)"
                });
            });

        });



        // WISHLIST POPUP

        let display_wish = $(".wish_pop").html(` <button class="wishlist-close"><i class="fa fa-times"></i></button>
    <div class="pop-item-container">
        <table>
            <thead class="wishlist">
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th colspan="2">Total</th>
                </tr>
            </thead>

            <tbody>
               
            </tbody>
        </table>
    </div>

     `);
        $(".wish-trigger").click(function() {
            $("body").addClass("overlay");
            $(display_wish).css({
                "transform": "translate3d(-50%,-50%,0) scale(1)"
            });

            $(".wishlist-close").click(function() {
                $("body").removeClass("overlay");
                $(display_wish).css({
                    "transform": "translate3d(-50%,-50%,0) scale(0)"
                });
            });

            var view_src = $(this).parents(".section-content").find(".section-image").find("img").attr("src");

            var sec_name = $(this).parents(".section-content").find(".section-name").text();

            var wish_price = $(this).parents(".section-content").find(".section-price").children("span").text();

            var d_prop = $(this).children(".fa-heart-o").attr("style"); //CHECK FOR ORIGINAL ICON DISPLAY PROPERTY
            if ((d_prop == undefined || d_prop == "display:block")) {
                var newval = Number($(".favourite .e-commerce-corn + span").html()) + 1;
                $(".favourite .e-commerce-corn + span").html(newval);


                $(this).children().hide(700, function() {
                    $(this).parent().append(`<i class="fa fa-heart" style="color:red"></i>`);
                });

                $(".wish_pop table tbody").append(`	<tr>
                <td class="wish-product">
                    <div class="image-blog">
                        <img src="${view_src}" alt="" class="wish-image" style="width:100px;height:100px;">
                    </div>
                    <a href="">${sec_name}</a>
                </td>
                <td class="wish-price">$<span class="wish-pricing">${wish_price}</span></td>
                <td class=" quantity-box">
                    <div class="wish-quantity">
                        <div class="item-wrapper">
                            <i class="bi-dash" tabindex="0"></i>
                            <div class="wish-value">1</div>
                            <i class="bi-plus" tabindex="0"></i>
                        </div>
                    </div>
                </td>
                <td class="wish-total">$<span>89.22</span></td>
                <td>
                    <div class="item-wrapper">
                        <i class="bi-x-lg clos" tabindex="0"></i>
                        <a href="" class="wish-purchase"><i class="fa fa-cart-plus"></i><i class="fa fa-cart-plus"></i>
                        </a>
                    </div>
                </td>
            </tr>`);
                $(".wish_pop .bi-x-lg").click(function() {
                    // d_prop = $(this).children(".fa-heart-o").attr("style","");//CHECK FOR ORIGINAL ICON DISPLAY PROPERTY

                    var newval = Number($(".menu-wish .pop-wish").html()) - 1;
                    $(".menu-wish .pop-wish").html(newval);



                })

            }
        });





    });


    //Slider focus events handler


    // pop ajax
    $(document).ready(function() {
        $(".jc_embed_signup > form").submit(function(e) {
            e.preventDefault(); // Prevent a new window from opening upon clicking 'Subscribe now' button

            var validForm = true; // Set initial state of valid form to true
            var inputArray = $(this).find("input.required"); // Find all required inputs and store them in array

            // Simple check for all inputs to make sure the value is not empty
            inputArray.each(function(item) {
                if ($(this).val() == "") {
                    validForm = false;
                    $(".jc_embed_signup .error-message").show(); // if empty, show error message
                    $('.jc_embed_signup input.required').addClass('error'); // and highlight empty inputs
                }
            });

            // Everything checks out! Continue...
            if (validForm == true) {
                var formContainer = $(".jc_embed_signup");
                var formData = $(this).serialize(); // Format all info and get it ready for sendoff
                $(this).find("input.required").val("");
                $(".jc_embed_signup .error-message").hide();
                // AJAX magic coming up...
                $.ajax({
                        type: $(this).attr("method"),
                        url: $(this).attr("action"),
                        data: formData,
                        cache: false,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        encode: true,
                        error: function(err) {
                            console.log("Uh, oh. There was an error:", err); // You broke something...
                        },
                        success: function(data) {
                            console.log("Success! Here is the data:", data); // Yay!
                        }
                    }) // All done! Let's show the user a success message:
                    .done(function(data) {
                        // $(formContainer).hide(); // Hide the initial form

                        $(".success-message").show(); // Show the checkmark
                        setTimeout(() => {
                            $(".success-message").hide(); // Show the checkmark
                        }, 5000);
                        $("svg").addClass("active"); // Start animation of checkmark
                    });
            }

            return; // No go on form...
        }); // end of submit function



        //PERMANENT HOVER ON ICONS
        $(".social-links a,.top-menu-icon,.form-social,.c-icon").on({
            "focus mouseenter": function() {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            }
        });
        $(".widget_social_widget a:not(.header .widget_social_widget a)").on({
            "focus mouseenter": function() {
                $(".widget_social_widget a").removeClass("active");
                $(this).addClass("active");
            }
        });
        $("a.top-menu-icon.in2").on({
            "focus mouseenter": function() {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            }
        });
        $(".header .widget_social_widget a").on({
            "mouseenter focus": function() {
                $(this).parent().siblings().find("i").removeClass("hover-color");
                $(this).children().addClass("hover-color");
            }
        });

        $(".menu-right-list a").on({
            "focus mouseenter": function() {
                $(this).parents("li").siblings().find("a").removeClass("active");
                $(this).addClass("active");
            }
        })
        $(".side__flex").on({
            "focus mouseenter": function() {
                $(this).siblings().removeClass("blue-bg");
                $(this).addClass("blue-bg");
                $(this).siblings().find(".side__name,.side__icon>i").css({
                    "color": "unset"
                });
                $(this).find(".side__name").css({
                    "color": "#ffffff"
                });
                $(this).find(".side__icon>i").css({
                    "color": "var(--color-hover"
                });
            }
        });



        // START: STYLE CONFIGURATOR

        // function colorscheme() {
        // $("#color-scheme>a").find("i").toggle();
        // if ($("#color-scheme>a").hasClass("open")) {
        // $("#color-scheme>a").removeClass("open");
        // $("#color-scheme").animate({
        // "right": "-294"
        // });
        // }
        // else {
        // $("#color-scheme>a").addClass("open");
        // $("#color-scheme").animate({
        // "right": "-16px"
        // });
        // }
        // }

        // $("#color-scheme>a").on({
        // "click": function () {
        // colorscheme();
        // },
        // "keydown": function (e) {
        // if (e.which == 13 && !$(this).hasClass("open")) {
        // e.preventDefault();
        // // trapfocus("#theme-changer");
        // colorscheme();
        // }
        // }
        // // $("#color-scheme").animate
        // });

        //CHECK WHEN RELOAD PERFORM
        // if (performance.type == performance.TYPE_RELOAD) {
        // if (localStorage.getItem('custombox') !== '' || localStorage.getItem('custombox') !== null || localStorage.getItem('custombox') !== undefined) {
        // $(":root").css({ "--color-hover": localStorage.getItem('custombox') });
        // }


        // //BOXED OR WIDE
        // if (localStorage.getItem("layout") == "boxed") {
        // if (localStorage.getItem('back-pattern') !== '' || localStorage.getItem('back-pattern') !== null || localStorage.getItem('back-pattern') !== undefined) {
        // $("body,.sticky-header").addClass("boxed");
        // $("#bg").slideDown();
        // $("html").css("background-image", localStorage.getItem('back-pattern'));
        // // console.log("boxed.......");
        // }
        // } else {
        // $("body").removeClass("boxed");
        // // console.log("Fulllllll.....");
        // }

        // } else {
        // console.info("This page is not reloaded");
        // $(":root").css({ "--color-primary": "var(--color-hover)" });
        // }


        // //CUSTOM COLOR
        // $(".color-changer").click(function () {
        // $(this).parent().siblings().children().removeClass("clicked");
        // $(this).addClass("clicked");
        // var col_val = $(this).attr("data-myval");
        // localStorage.setItem("custombox", col_val);
        // $(":root").css({ "--color-hover": col_val });
        // });

        // //COLOR PICKER
        // $("[data-jscolor]").change(function () {
        // var col_val2 = $(this).val();
        // /* HEX TO RGB */
        // var col_val7 = tinycolor(col_val2).toRgbString();
        // const col_val8 = col_val7.slice(4);
        // const col_val9 = col_val8.slice(0, -1);
        // /* Conversion Complete */
        // $(":root").css({ "--color-hover": col_val9 });
        // localStorage.setItem("custombox", col_val9);
        // });


        // //RESET COLOR
        // $("#resetColor").click(function () {
        // $(":root").css({ "--color-hover": "247, 124, 41" });
        // localStorage.setItem("custombox", "247, 124, 41");
        // })


        // //PATTERN APPLICATION
        // $(".style-palette-bg .pattern-changer").click(function () {
        // // console.log($(this).find("span").css("background-image"));
        // $(this).parent().siblings().children().removeClass("clicked");
        // $(this).addClass("clicked");
        // var apply_pattern = $(this).find("span").css("background-image");
        // $("html").css("background-image", apply_pattern);
        // localStorage.setItem("back-pattern", apply_pattern);
        // });


        // //BOXED OR WIDE CLICK CHECK FOR PATTERN
        // $(".style-palette-bx li a").click(function () {
        // var layout = $(this).attr("id");
        // if (layout == "boxed") {
        // $("body").addClass("boxed");
        // localStorage.setItem("layout", "boxed");
        // $("#bg").slideDown();
        // } else {
        // $("body").removeClass("boxed");
        // localStorage.setItem("layout", "wide");
        // $("#bg").slideUp();
        // }
        // });


        // END: STYLE CONFIGURATOR

        // START: MESONRY LAYOUT CALCULATION
        /**
         * Set appropriate spanning to any masonry item
         *
         * Get different properties we already set for the masonry, calculate 
         * height or spanning for any cell of the masonry grid based on its 
         * content-wrapper's height, the (row) gap of the grid, and the size 
         * of the implicit row tracks.
         *
         * @param item Object A brick/tile/cell inside the masonry
         */
        function resizeMasonryItem(item) {
            /* Get the grid object, its row-gap, and the size of its implicit rows */
            var grid = document.getElementsByClassName('masonry')[0],
                rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
                rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

            /*
             * Spanning for any brick = S
             * Grid's row-gap = G
             * Size of grid's implicitly create row-track = R
             * Height of item content = H
             * Net height of the item = H1 = H + G
             * Net height of the implicit row-track = T = G + R
             * S = H1 / T
             */
            var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

            /* Set the spanning as calculated above (S) */
            item.style.gridRowEnd = 'span ' + rowSpan;

            /* Make the images take all the available space in the cell/item */
            item.querySelector('.masonry-content').style.height = rowSpan * 30 + "px";
        }

        /**
         * Apply spanning to all the masonry items
         *
         * Loop through all the items and apply the spanning to them using 
         * `resizeMasonryItem()` function.
         *
         * @uses resizeMasonryItem
         */
        function resizeAllMasonryItems() {
            // Get all item class objects in one list
            var allItems = document.getElementsByClassName('masonry-item');

            /*
             * Loop through the above list and execute the spanning function to
             * each list-item (i.e. each masonry item)
             */
            for (var i = 0; i > allItems.length; i++) {
                resizeMasonryItem(allItems[i]);
            }
        }

        /**
         * Resize the items when all the images inside the masonry grid 
         * finish loading. This will ensure that all the content inside our
         * masonry items is visible.
         *
         * @uses ImagesLoaded
         * @uses resizeMasonryItem
         */
        function waitForImages() {
            var allItems = document.getElementsByClassName('masonry-item');
            for (var i = 0; i < allItems.length; i++) {
                imagesLoaded(allItems[i], function(instance) {
                    var item = instance.elements[0];
                    resizeMasonryItem(item);
                });
            }
        }

        /* Resize all the grid items on the load and resize events */
        var masonryEvents = ['load', 'resize'];
        masonryEvents.forEach(function(event) {
            window.addEventListener(event, resizeAllMasonryItems);
        });

        /* Do a resize once more when all the images finish loading */
        waitForImages();
        // END: MESONRY LAYOUT CALCULATION




        //ITEM COUNTER
        $(".modal-item-quantity i").click(function() {
            if ($(this).hasClass("bi-dash")) {
                var minus = $(this).siblings(".wish-value").html();
                if (minus == 1) {
                    $(this).css("pointer-events", "pointer");
                } else {
                    minus--;
                    $(this).siblings(".wish-value").html(minus);
                }
            } else {
                var plus = $(this).siblings(".wish-value").html();
                plus++;
                $(this).siblings(".wish-value").html(plus);
            }

        });


        //END: MODAL CART BAR


        //KEYBOARD TRAP

        function restorefocus() {
            if (preactive) {
                preactive.focus();
                preactive = null;
            }
        }

        function trapfocus(e) {
            var capture = $(e).attr("tabindex", "-1").focus();
            capture.keydown(function(event) {
                if (event.key.toLowerCase() !== 'tab') {
                    return;
                }
                var tabbable = $().add(capture.find("button,input,select,textarea,[href],[tabindex]:not([tabindex='-1'])"));
                var target = $(event.target);
                if (event.shiftKey) {
                    if (target.is(capture) || target.is(tabbable.first())) {
                        event.preventDefault();
                        tabbable.last().focus();
                    }
                } else {
                    if (target.is(tabbable.last())) {
                        event.preventDefault();
                        tabbable.first().focus();
                    }

                }
            });
        }

        // , ".product-category-browse", "product-category-btn"
        var preactive, target, trigger;
        var triggers = ["bottom-search-area", "mob-toggle-lines", "cart", "cart-bag"];
        var targets = ["#search-trap", "#mobile-m", "#modal-cart-box", "#modal-cart-box"];

        $(window).click(function(event) {
            trigger = event.target.id || event.target.classList[0];
            var pos = triggers.indexOf(trigger);
            target = targets[pos];
            // console.log(target);
            if (target == undefined) { // && $(target).hasClass("cart-modal-close")
                restorefocus();
            } else {
                preactive = document.activeElement || document.body;
                trapfocus(target);
            }
        });

        if ($("body").hasClass("home1")) {
            setTimeout(() => {
                $(".signin-overlay").show();
            }, 5000);
            setTimeout(() => {

                //Newsletter Trap

                var newsTrap = function(elem) {
                    let tabbable = elem.find('select, input, textarea, button, a,button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').filter(':visible');

                    let firstTabbable = tabbable.first();
                    let lastTabbable = tabbable.last();
                    /*set focus on first input*/
                    $('.signin-close').focus();

                    /*redirect last tab to first input*/
                    lastTabbable.on('keydown', function(e) {
                        if ((e.which === 9 && !e.shiftKey)) {
                            e.preventDefault();
                            firstTabbable.focus();
                        }
                    });

                    /*redirect first shift+tab to last input*/
                    firstTabbable.on('keydown', function(e) {
                        if ((e.which === 9 && e.shiftKey)) {
                            e.preventDefault();
                            lastTabbable.focus();
                        }
                    });

                    /* allow escape key to close insiders div */
                    elem.on('keyup', function(e) {
                        if (e.keyCode === 27) {
                            $(".signin-close").click();
                        };
                    });
                };
                newsTrap($('.signin-overlay'));
            }, 5200);

            // var in2slider = tns({
            // "container": ".page2-slider",
            // "autoplay": true,
            // "loop": false,
            // "items": "6",
            // "mouseDrag": true,
            // "controls": false,
            // "nav": true,
            // "navContainer": "#bullet-wrapper",
            // "autoplayButtonOutput": false,
            // "controlsContainer": "#nav-wrapper",
            // "swipeAngle": false,
            // "preventScrollOnTouch": "auto",
            // "autoplayHoverPause": true,
            // "autoplayTimeout": 10000,
            // "preventActionWhenRunning": true
            // });



            // $(".products").addClass("owl-carousel owl-theme").removeClass("row");
            // var product = $('.jcs-section-3 .owl-carousel.owl-theme').owlCarousel({
            // loop: true,
            // margin: 30,
            // dots: false,
            // nav: true,
            // autoplay: true,
            // responsive: {
            // 0: {
            // items: 1
            // },
            // 600: {
            // items: 2
            // },
            // 1000: {
            // items: 3
            // },
            // 1200: {
            // items: 4
            // }

            // }
            // });


            //SLIDER FILTER FUNCTION

            $("nav a").click(function() {
                $(this).siblings().removeClass("orange-text");
                $(this).addClass("orange-text");
            });


            // ANNOUNCE TIMER
            var date = $("#announcement").children("div").attr("data-timer");
            let msec = Date.parse(`${date}`);
            const d = new Date(msec);
            let timer = setInterval(function() {
                timeBetweenDates(d);
            }, 1000);

            function timeBetweenDates(toDate) {
                var dateEntered = toDate;
                var now = new Date();
                var difference = dateEntered.getTime() - now.getTime();
                if (difference <= 0) {
                    // Timer done
                    clearInterval(timer);
                } else {
                    var seconds = Math.floor(difference / 1000);
                    var minutes = Math.floor(seconds / 60);
                    var hours = Math.floor(minutes / 60);
                    var days = Math.floor(hours / 24);
                    hours %= 24;
                    minutes %= 60;
                    seconds %= 60;

                    hours = hours < 10 ? `0${hours}` : hours;
                    minutes = minutes < 10 ? `0${minutes}` : minutes;
                    seconds = seconds < 10 ? `0${seconds}` : seconds;

                    $(".announce-day").text(days);
                    $(".announce-hour").text(hours);
                    $(".announce-minute").text(minutes);
                    $(".announce-sec").text(seconds);
                }
            }


            //Section 4 Timer
            if ($("section").hasClass("jcs-section-4")) {
                var date = $(".jcs-section-4 .section-right-home .easy_ct-countdown").attr("data-timer");
                let msec = Date.parse(`${date}`);
                const d = new Date(msec);
                timer = setInterval(function() {
                    timeBetweenDates(d);
                }, 1000);

                function timeBetweenDates(toDate) {
                    var dateEntered = toDate;
                    var now = new Date();
                    var difference = dateEntered.getTime() - now.getTime();
                    if (difference <= 0) {
                        // Timer done
                        clearInterval(timer);
                    } else {
                        var seconds = Math.floor(difference / 1000);
                        var minutes = Math.floor(seconds / 60);
                        var hours = Math.floor(minutes / 60);
                        var days = Math.floor(hours / 24);
                        hours %= 24;
                        minutes %= 60;
                        seconds %= 60;
                        $("#days1").text(days);
                        $("#hours1").text(hours);
                        $("#minutes1").text(minutes);
                        $("#seconds1").text(seconds);
                    }
                }
            }
        }

        if ($("body").hasClass("home2")) {
            $(".jcs-section-02 ul.products,.jcs-section-06 ul.products").addClass("row");
            //$(".jcs-section-02 .products > li").addClass("col-xl-4 col-md-6");
            $(".jcs-section-06 .products > li").addClass("col-lg-3 col-md-4 col-sm-6");
            // var in2slider = tns({
            // "container": ".page2-slider",
            // "autoplay": true,
            // "loop": false,
            // // "items": "6",
            // "mouseDrag": true,
            // "controls": false,
            // "nav": true,
            // "navContainer": "#bullet-wrapper",
            // "autoplayButtonOutput": false,
            // "swipeAngle": false,
            // "preventScrollOnTouch": "auto",
            // "autoplayHoverPause": true,
            // "autoplayTimeout": 10000,
            // "preventActionWhenRunning": true
            // });

            $(function() {
                $(".about-left").click(function() {
                    in2news.goTo('prev');
                });
                $(".about-right").click(function() {
                    in2news.goTo('next');
                });

            });
            var brand = tns({
                "container": ".brand-carousel",
                "autoplay": true,
                "items": "6",
                "mouseDrag": true,
                "controls": false,
                "nav": false,
                "gutter": "30",
                // "center":true,
                "autoplayButtonOutput": false,
                "swipeAngle": false,
                "responsive": {
                    0: {
                        items: 2
                    },
                    500: {
                        items: 3
                    },
                    768: {
                        items: 4
                    },
                    992: {
                        items: 5
                    },
                    1024: {
                        items: 6
                    }

                }
            });
        }


        if ($("body").hasClass("home3")) {
            $(".home3 .jcs-section-3 ul.products").removeClass("row");
            $(".home3 .jcs-section-3 ul.products>li").addClass("col-xl-5c col-lg-3 col-md-4 col-sm-6");
            $(".home3 ul.products>li").addClass("shadow");
            $(".home3 ul.products li:first-of-type").before(`<div class="shadow-indicator"></div>`);
            $(".add_to_cart_button ").addClass("cbb blue");
            $(".home3 .jcs-section-5 ul.products>li").addClass("col-sm-6");
            $(".home3 .jcs-section-5 .shadow-indicator").remove();
            $(".home3 .jcs-section-6 ul.products").removeClass("row").addClass("d-flex");
            $(".home3 .jcs-section-6 ul.products>li").addClass("col-6 col-lg-3 col-md-4 col-sm-6").removeClass("col-12");
            $(".home3 .extra-product ul.products").removeClass("row").addClass("d-flex");
            $(".home3 .extra-product ul.products>li").addClass("col-6 col-md-12").removeClass("col-12");

            /*SHADOW INDICATOR */
            $(".home3 .shadow").on({
                "mouseenter focusin": function() {
                    var item_width = $(this).innerWidth();
                    var item_height = $(this).innerHeight();
                    $(this).siblings(".shadow-indicator").css({
                        "width": item_width,
                        "height": item_height,
                        "box-shadow": "rgb(0 0 0 / 1%) 0px 0px 4px 4px"
                    });

                    $(this).siblings(".shadow-indicator").css("left", $(this).position().left);
                    $(this).siblings(".shadow-indicator").css("top", $(this).position().top);
                },
                "mouseleave focusout": function() {
                    $(this).siblings(".shadow-indicator").css({
                        "width": 0,
                        "height": 0,
                        "box-shadow": "unset"
                    });
                }
            });

            /* END: SHADOW INDICATOR */

        }

        $(".woocommerce-form-login__submit,.woocommerce-form-register__submit,button[name='woocommerce_checkout_place_order'],.easy-woocompare-row .add_to_cart_button,.product-sidebar-column .sidebar .widget_custom_html .sale_wrap .sale_item>a,.tag-cloud-link,.product-sidebar-column .sidebar .widget_product_search .woocommerce-product-search button[type='submit'],.product-sidebar-column .sidebar .widget_price_filter .price_slider_wrapper .price_slider_amount button,.cart-section table .actions button[type='submit'],.cart-section .cart-collaterals .checkout-button,.sidebar .cart-ft-buttons-cont .cart-ft-btn,.widget_mail button[type='submit'],.cart-footer .cart-ft-buttons-cont a").addClass("cbb orange");

        if ($("body").hasClass("woocommerce-page")) {
            var test = tns({
                "container": ".testimonial_wrap",
                "autoplay": true,
                "autoplayButtonOutput": false,
                "nav": true,
                "controls": false
            });
            var sale = tns({
                "container": ".sale_wrap",
                "autoplay": true,
                "autoplayButtonOutput": false,
                "nav": true,
                "controls": false
            });

        }


        // COMPARE ACTION
        $(".easy-woowishlist-item .cart-ft-totals").after(`<div class="action-wrap"><a href="?add-to-cart=32" data-quantity="1" class="button product_type_simple add_to_cart_button ajax_add_to_cart cbb orange" data-product_id="32" data-product_sku="" aria-label="Add “Airpods pro” to your cart" rel="nofollow">Add
    to cart</a></div>`);

        //Product single 

        if ($("body").hasClass("single-product")) {
            // if ($(".product-single-section").attr("id") == "product-single-section1") {
            // var prmain = tns({
            // "container": ".vertical-slider",
            // "axis": "vertical",
            // "autoplay": true,
            // "autoplayButtonOutput": false,
            // "nav": false,
            // "controls": false,
            // "gutter": "10",
            // "responsive": {
            // 0: {
            // "items": 4,
            // "center": false
            // }
            // }
            // });
            // }

            // if ($(".product-single-section").attr("id") == "product-single-section2") {
            // var prmain = tns({
            // "container": ".horizontal-slider",
            // "autoplay": true,
            // "autoplayButtonOutput": false,
            // "nav": false,
            // "controls": true,
            // "responsive": {
            // 0: {
            // "items": 2,
            // "center": false
            // },
            // 360: {
            // "items": 3, "center": true
            // },
            // 480: {
            // "items": 4, "center": false
            // },
            // 768: {
            // "items": 3, "center": true
            // },
            // 1200: {
            // "items": 4,
            // "center": false
            // }
            // }
            // });
            // }
            // $("ul.products").addClass("owl-carousel owl-theme").removeClass("row");
            // var relate = $('.owl-carousel').owlCarousel({
            // loop: true,
            // margin: 10,
            // nav: true,
            // dots: false,
            // margin: 30,
            // autoplay: true,

            // responsive: {
            // 0: {
            // items: 1
            // },
            // 768: {
            // items: 2
            // },
            // 992: {
            // items: 3
            // },

            // }
            // });

            // $("#new1 .next").click(function () {
            // relate.trigger('next.owl.carousel');
            // });

            // $("#new1 .prev").click(function () {
            // relate.trigger('prev.owl.carousel');
            // });

            $(".tabs.wc-tabs>li a").addClass("cbb orange");
            $(".woocommerce #review_form #respond .form-submit input").addClass("cbb orange");
            $(".contact-form input[type='submit']").addClass("cbb orange");
            $(".faq-ask input[type='submit']").addClass("cbb orange");
            // product zoom
            // $('.mainimage').imageZoom({
            // zoom: 300
            // });

            $(".button.easy_psc_call_popup,.single_add_to_cart_button").addClass("cbb orange");
            $(".easy_woocompare_product_actions_tip:not(.easy-related-products .easy_woocompare_product_actions_tip)").addClass("cbb blue");
            $(".tabs.wc-tabs>li a").click(function(e) {
                e.preventDefault();
                var get_control = $(this).parent().attr("aria-controls");
                // console.log(get_control)
                $(this).parents(".tabs.wc-tabs").siblings().hide();
                $(this).parents(".tabs.wc-tabs").siblings().filter(`#${get_control}`).show();
            });

            $(".card-header").click(function() {
                $(this).next().slideToggle();
                $(this).children().toggleClass("opened");
                $(this).toggleClass("active-header");
            });
        }

        if ($("body").hasClass("page-template-template-about-page")) {
            var slider = tns({
                "container": ".slider-client",
                "mouseDrag": true,
                "controls": false,
                "loop": false,
                "gutter": 30,
                "controlsContainer": "#direction",
                "nav": false,
                "autoplayButtonOutput": false,
                "swipeAngle": false,
                "autoplay": true,
                "responsive": {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    }
                }
            });

            $(function() {
                $(".about-left").click(function() {
                    slider.goTo('prev');
                });
                $(".about-right").click(function() {
                    slider.goTo('next');
                });

                var i = 0;
                $(".slider-client>div").each(function() {
                    i++;
                });

                setInterval(() => {
                    if ($(`div#tns1-item3`).hasClass("tns-slide-active")) {
                        $(".about-left").addClass("bg-hover-color");
                    } else {
                        console.log(i);
                        $(".about-left").removeClass("bg-hover-color");
                    }
                }, 100);

                var a = 0;
                $(window).scroll(function() {
                    var o_top = $(".counter-section").position().top - window.innerHeight; //or - $(window).innerHeight();
                    if (a == 0 && $(window).scrollTop() > o_top) {
                        $('.about-counter span:first-child').each(function() {
                            $(this).prop('Counter', 0).animate({
                                Counter: $(this).text()
                            }, {
                                duration: 5000,
                                easing: 'swing',
                                step: function(now) {
                                    $(this).text(Math.ceil(now));
                                }
                            });
                        });
                        a = 1;
                    }
                });

            });
        }

        $(".faq-ask input[type='submit'],.contact-form input[type='submit']").addClass("cbb blue");

        // BANNER SLIDER TEXT ANIMATION

        //Counting Slides
        var banner_slides = $("#tns1").children(".tns-item").length;
        var banner_title_text = [];
        var banner_offer_text = [];

        for (var j = 0; j < banner_slides; j++) {
            banner_title_text[j] = $(`#tns1-item${j} .banner-main-content`).text();
            banner_offer_text[j] = $(`#tns1-item${j} .offer`).text();
            $(`#tns1-item${j} .banner-main-content`).text("");
            $(`#tns1-item${j} .offer`).text("");
        }
        // console.log(banner_title_text); //Array of banner title
        // console.log(banner_offer_text); //Arrays of offer text

        for (var k = 0; k < banner_slides; k++) {
            //ASSIGN TEXTS TO SLIDE
            // banner_title_text[k] = $(`#tns1-item${k} .banner-main-content`).text(banner_title_text[k]);
            // banner_offer_text[k] = $(`#tns1-item${k} .offer`).text(banner_offer_text[k]);

            //SPLIT TEXT INTO CHARACTER
            let text1 = banner_title_text[k].split("");
            let text11 = banner_offer_text[k].split("");
            // console.log(text1)
            var txt1 = "",
                txt11 = "";

            for (var n = 0; n < text1.length; n++) {
                if (text1[n] == " ") {
                    text1[n] = "&nbsp;"
                }
                txt1 = txt1 + text1[n];
                $(`<span>${text1[n]}</span>`).appendTo(`#tns1-item${k} .banner-main-content`);
            }

            for (var p = 0; p < text11.length; p++) {
                if (text11[p] == " ") {
                    text11[p] = "&nbsp;"
                }
                txt11 = txt11 + text11[p];
                $(`<span>${text11[p]}</span>`).appendTo(`#tns1-item${k} .offer`);
            }
        }


        $(".page2-slider-wrapper,#nav-wrapper").hover(
            function() {
                $("#nav-wrapper").children().addClass("visible");
                if ($("#tns1-item0").hasClass("tns-slide-active")) {
                    $("#nav-wrapper").children(".next").addClass("visible");
                    $("#nav-wrapper").children(".prev").removeClass("visible");
                }
                if ($(`#tns1-item${banner_slides - 1}`).hasClass("tns-slide-active")) {
                    $("#nav-wrapper").children(".next").removeClass("visible");
                    $("#nav-wrapper").children(".prev").addClass("visible");
                }
            },
            function() {
                $("#nav-wrapper").children().removeClass("visible");
            }
        );



        setInterval(() => {
            // $("#nav-wrapper").children().addClass("visible");
            if ($("#tns1-item0").hasClass("tns-slide-active")) {
                $("#nav-wrapper").children(".next").addClass("visible");
                $("#nav-wrapper").children(".prev").removeClass("visible");
            }
            if ($(`#tns1-item${banner_slides - 1}`).hasClass("tns-slide-active")) {
                $("#nav-wrapper").children(".next").removeClass("visible");
                $("#nav-wrapper").children(".prev").addClass("visible");
            }
        }, 100);


        $("a[class*='button product']:not(.product-img a[class*='button product']),a.added_to_cart:not(.product-img a.added_to_cart)").addClass("cbb blue");

        $("[class*='-woowishlist'] a[class*='button product'],[class*='-woowishlist'] a.added_to_cart").wrap("<div class='product-action'></div>");

        //wishlist table
        //Insert dash when stock status is not available
        $(".easy-woowishlist-item:not(.wishlist-head)").not(":has(p)").children("span.price").after("<p>-</p>");

        //Wishlist item removal 
        $(".dashicons-dismiss").click(function() {
            startadd = setInterval(function() {
                if (!$(".easy-woowishlist-item:not(.wishlist-head)").children(".product-action").length > 0) {
                    $("[class*='-woowishlist'] a[class*='button product'],[class*='-woowishlist'] a.added_to_cart").wrap("<div class='product-action'></div>");
                }
                $(".easy-woowishlist-item:not(.wishlist-head) >a").addClass("cbb blue");
                $(".easy-woowishlist-item:not(.wishlist-head)").not(":has(p)").children("span.price").after("<p>-</p>");
            }, 100);
        });



        //SIDEBAR CART

        //CART TRAP

        var cartTrap = function(elem) {
            let tabbable = elem.find('select, input, textarea, button, a,button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').filter(':visible');

            let firstTabbable = tabbable.first();
            let lastTabbable = tabbable.last();
            /*set focus on first input*/
            firstTabbable.focus();

            /*redirect last tab to first input*/
            lastTabbable.on('keydown', function(e) {
                if ((e.which === 9 && !e.shiftKey)) {
                    e.preventDefault();
                    firstTabbable.focus();
                }
            });

            /*redirect first shift+tab to last input*/
            firstTabbable.on('keydown', function(e) {
                if ((e.which === 9 && e.shiftKey)) {
                    e.preventDefault();
                    lastTabbable.focus();
                }
            });

            /* allow escape key to close insiders div */
            elem.on('keyup', function(e) {
                if (e.keyCode === 27) {
                    $(".cart-close").click();
                };
            });
        };

        $(".cart-trigger").on("click", function() {
            // cartTrap($('.cart-container'));
            $(".cart-modal").toggleClass("active-cart");
            if ($(".cart-modal").hasClass("active-cart")) {
                $(".cart-modal").fadeIn(100);
                $(".cart-modal").css("right", "0");
            } else {
                $(".cart-modal").css("right", "-100%");
                $(".cart-modal").fadeOut(1000);
            }
        });

        $(".cart-close").click(function() {
            $(".cart-modal").toggleClass("active-cart");
            $(".cart-modal").css("right", "-100%");
            $(".cart-modal").fadeOut(1000);
            $(".cart-trigger").focus();
        });
        $(".cart-trigger").on("click", function() {
            cartTrap($('.cart-container'));
        });

        // Mobile - menu Trap
        var menuTrap = function(elem) {
            let tabbable = elem.find('select, input, textarea, button, a,button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').filter(':visible');

            let firstTabbable = tabbable.first();
            let lastTabbable = tabbable.last();
            /*set focus on first input*/
            firstTabbable.focus();

            /*redirect last tab to first input*/
            lastTabbable.on('keydown', function(e) {
                if ((e.which === 9 && !e.shiftKey)) {
                    e.preventDefault();
                    firstTabbable.focus();
                }
            });

            /*redirect first shift+tab to last input*/
            firstTabbable.on('keydown', function(e) {
                if ((e.which === 9 && e.shiftKey)) {
                    e.preventDefault();
                    lastTabbable.focus();
                }
            });

            /* allow escape key to close insiders div */
            elem.on('keyup', function(e) {
                if (e.keyCode === 27) {
                    $(".header-close-menu").click();
                };
            });
        };

        $(".toggle-lines").click(function() {
            menuTrap($('.mobile-menu'));
        });


        // Category Trap
        var catTrap = function(elem) {
            let tabbable = elem.find('select, input, textarea, button, a,button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').filter(':visible');

            let firstTabbable = tabbable.first();
            let lastTabbable = tabbable.last();
            /*set focus on first input*/
            firstTabbable.focus();

            /*redirect last tab to first input*/
            lastTabbable.on('keydown', function(e) {
                if ((e.which === 9 && !e.shiftKey)) {
                    e.preventDefault();
                    firstTabbable.focus();
                }
            });

            /*redirect first shift+tab to last input*/
            firstTabbable.on('keydown', function(e) {
                if ((e.which === 9 && e.shiftKey)) {
                    e.preventDefault();
                    lastTabbable.focus();
                }
            });

            /* allow escape key to close insiders div */
            elem.on('keyup', function(e) {
                if (e.keyCode === 27) {
                    $(".product-category-btn").click();
                };
            });
        };

        $(".product-category-btn").on("click", function() {
            catTrap($('.product-category-browse'));
        });

    });


    //ADD Wishlist POPUP
    $("a").click(function(e) {
        if ($(this).hasClass('add_to_wishlist') || $(this).hasClass('single_add_to_wishlist')) {
            e.preventDefault();
            $(this).attr("href", "javascript:void(0)");
            //alert("you are done");
            var check = `
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"
                width="70">
                <circle class="checkmark-circle" cx="26" cy="26" r="23" fill="none" />
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>

            <div>
                <p class="text-center">Item Added to Wishlist</p>
                   </div>`;
            var cart_pop = $('<div id="cart-add-check"></div>').html(check);
            $(cart_pop).appendTo("body");
            setTimeout(function() {
                $(cart_pop).remove();
                $(window).css("pointer-event", "none");
            }, 4000);
            var newval = Number($(".menu-right-list .favourite .yith-wcwl-items-count").html()) + 1;
            $(".menu-right-list .favourite .yith-wcwl-items-count").html(newval);

        }
    });

    //ADD Compare POPUP
    $("a").click(function(e) {
        if ($(this).hasClass('compare-btn') || $(this).hasClass('compare')) {
            e.preventDefault();
            $(this).attr("href", "javascript:void(0)");
            //alert("you are done");
            var check = `
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"
                width="70">
                <circle class="checkmark-circle" cx="26" cy="26" r="23" fill="none" />
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>

            <div>
                <p class="text-center">Item Added to Compare</p>
                   </div>`;
            var cart_pop = $('<div id="cart-add-check"></div>').html(check);
            $(cart_pop).appendTo("body");
            setTimeout(function() {
                $(cart_pop).remove();
                $(window).css("pointer-event", "none");
            }, 4000);
            var newval = Number($(".menu-right-list .arrow span").html()) + 1;
            $(".menu-right-list .arrow span").html(newval);

        }
    });

    /*
    Experimenting with the jquery offset and position
    */
    $(document).ready(function() {
        var cartCountValue = $('.cart .count').html()
        var cartCount = $('.cart .count');
        $(cartCount).text(cartCountValue);

        $('.add_to_cart_button').on('click', function() {
            var cartBtn = this;
            var cartCountPosition = $(cartCount).offset();
            var btnPosition = $(this).offset();
            var leftPos =
                cartCountPosition.left < btnPosition.left ?
                btnPosition.left - (btnPosition.left - cartCountPosition.left) :
                cartCountPosition.left;
            var topPos =
                cartCountPosition.top < btnPosition.top ?
                cartCountPosition.top :
                cartCountPosition.top;
            $(cartBtn)
                .append("<span class='count'>1</span>");

            $(cartBtn).find(".count").each(function(i, count) {
                $(count).offset({
                        left: leftPos,
                        top: topPos
                    })
                    .animate({
                            opacity: 0
                        },
                        800,
                        function() {
                            $(this).remove();
                            cartCountValue++;
                            $(cartCount).text(cartCountValue);
                        }
                    );
            });
        });

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    });


    /*
    Stock Alert
    */
    let numberPercent = document.querySelectorAll('.stock-countbar')
    let getPercent = Array.from(numberPercent)

    getPercent.map((items) => {
        let startCount = 0
        let progressBar = () => {
            startCount++
            // items.innerHTML = `<h3>${startCount}%</h3>`
            if (startCount > 100) {
                items.style.width = `100%`
            } else {
                items.style.width = `${startCount}%`
            }
            if (startCount == items.dataset.percentnumber) {
                clearInterval(stop)
            }
        }
        let stop = setInterval(() => {
            progressBar()
        }, 25)
    });


    // Quick Veiw Trigger
    $('.quickview-trigger').on('click', function(e) {
        e.preventDefault();
        if (!$('.quickview-overlay').hasClass("active")) {
            $('.quickview-overlay').addClass('active');
            $('.quickview-close').focus();
            var e, t, i, n = document.querySelector(".quickview-overlay");
            let a = document.querySelector(".quickview-close"),
                s = n.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
                o = s[s.length - 1];
            if (!n) return !1;
            for (t = 0, i = (e = n.getElementsByTagName("a")).length; t < i; t++) e[t].addEventListener("focus", c, !0), e[t].addEventListener("blur", c, !0);

            function c() {
                for (var e = this; - 1 === e.className.indexOf("quickview-model-details");) "li" === e.tagName.toLowerCase() && (-1 !== e.className.indexOf("focus") ? e.className = e.className.replace(" focus", "") : e.className += " focus"), e = e.parentElement
            }
            document.addEventListener("keydown", function(e) {
                ("Tab" === e.key || 9 === e.keyCode) && (e.shiftKey ? document.activeElement === a && (o.focus(), e.preventDefault()) : document.activeElement === o && (a.focus(), e.preventDefault()))
            })
        } else {
            $('.quickview-trigger').focus();
            $('.quickview-overlay').removeClass('active');
        }
    });
    $('.quickview-close').on('click', function(e) {
        e.preventDefault();
        $('.quickview-trigger').focus();
        $('.quickview-overlay').removeClass('active');
    });


    /*
    Experimenting with the jquery offset and position
    */
    $(document).ready(function() {
        var cartCountValue = $('.cart .count').html()
        var cartCount = $('.cart .count');
        $(cartCount).text(cartCountValue);

        $('.add_to_cart_button').on('click', function() {
            var cartBtn = this;
            var cartCountPosition = $(cartCount).offset();
            var btnPosition = $(this).offset();
            var leftPos =
                cartCountPosition.left < btnPosition.left ?
                btnPosition.left - (btnPosition.left - cartCountPosition.left) :
                cartCountPosition.left;
            var topPos =
                cartCountPosition.top < btnPosition.top ?
                cartCountPosition.top :
                cartCountPosition.top;
            $(cartBtn)
                .append("<span class='count'>1</span>");

            $(cartBtn).find(".count").each(function(i, count) {
                $(count).offset({
                        left: leftPos,
                        top: topPos
                    })
                    .animate({
                            opacity: 0
                        },
                        800,
                        function() {
                            $(this).remove();
                            cartCountValue++;
                            $(cartCount).text(cartCountValue);
                        }
                    );
            });
        });

        $('.remove_from_cart_button').on('click', function() {
            var cartBtn = this;
            var cartCountPosition = $(cartCount).offset();
            var btnPosition = $(this).offset();
            var leftPos =
                cartCountPosition.left < btnPosition.left ?
                btnPosition.left - (btnPosition.left - cartCountPosition.left) :
                cartCountPosition.left;
            var topPos =
                cartCountPosition.top < btnPosition.top ?
                cartCountPosition.top :
                cartCountPosition.top;
            $(cartBtn)
                .append("<span class='count'>1</span>");

            $(cartBtn).find(".count").each(function(i, count) {
                $(count).offset({
                        left: leftPos,
                        top: topPos
                    })
                    .animate({
                            opacity: 0
                        },
                        800,
                        function() {
                            $(this).remove();
                            cartCountValue--;
                            $(cartCount).text(cartCountValue);
                        }
                    );
            });
        });

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        $('#grid').click(function() {
            $(this).addClass('active');
            $('#list').removeClass('active');
            $('ul.products').fadeOut(300, function() {
                $(this).addClass('grid').removeClass('list').fadeIn(300);
            });
            return false;
        });

        $('#list').click(function() {
            $(this).addClass('active');
            $('#grid').removeClass('active');
            $('ul.products').fadeOut(300, function() {
                $(this).removeClass('grid').addClass('list').fadeIn(300);
            });
            return false;
        });

        $('#gridlist-toggle a').click(function(event) {
            event.preventDefault();
        });

        // Mobile Menu Browse Category
        $(".switcher-tab > button").click(function() {
            if (!$(this).hasClass("active-bg")) {
                $(".product-categories, .main-menu.menu-wrap").toggleClass("d-none");
                $(this).parent().children().toggleClass("active-bg");
            }
        });
    });

    /* ------------  Header Above Bar ------------------ */
    $(document).ready(function() {
        $(" .header-above-index button.header-above-collapse").click(function() {
            $(".header-above-index .header-above-bar").removeClass("active");
            $(".header-above-index .header-above-bar").addClass("active");
            $(".header-above-index .header-above-bar").toggle("active");
        });
    });

    $(document).ready(function() {
        $(".product-category-btn").click(function() {
            $('.dropdown-content').slideToggle(1000);
        });
    });


    /* Subscription Element */
    jQuery(".spanco-subscription").on('submit', function(e) {
        e.preventDefault();
        var formSelector = jQuery(this);
        var data = jQuery(this).serializeArray();
        data.push({
            name: "action",
            value: "spanco_mailchimp"
        });
        jQuery.ajax({
            type: "post",
            url: MyAjax.ajaxurl,
            data: data,
            success: function(response) {
                formSelector[0].reset();
                formSelector.find('.spanco-subscription-msg').html(response);
                setInterval(function() {
                    formSelector.find('.spanco-subscription-msg').empty(5000);
                }, 5000);
            }
        })
    });
    /* Subscription Element END */
}(jQuery));