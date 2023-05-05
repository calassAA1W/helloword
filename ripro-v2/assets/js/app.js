var body = jQuery("body"),
    st = 0,
    lastSt = 0,
    iconspin = '<i class="fa fa-spinner fa-spin"></i> ',
    iconcheck = '<i class="fa fa-check"></i> ',
    iconwarning = '<i class="fa fa-warning "></i> ',
    is_qq_captcha_verify = !0;

function site_notify(t) {
    "use strict";
    if (0 == riprov2.site_notice.is) return !1;
    (null == Cookies.get("ripro_notice_cookie") || t) && Swal.fire({
        html: riprov2.site_notice.html,
        background: riprov2.site_notice.color,
        showConfirmButton: !1,
        width: 560,
        padding: "0",
        allowOutsideClick: t,
        showCloseButton: !0
    })
        .then(t => {
            Cookies.set("ripro_notice_cookie", 1)
        })
}

function search() {
    "use strict";
    body.on("click", "[data-action]", function(t) {
        t.preventDefault();
        var e = $(this),
            i = e.data("action"),
            n = e.data("target"),
            a = getScrollbarWidth();
        switch (i) {
            case "omnisearch-open":
                n = e.data("target"), e.addClass("active"), $(n)
                    .addClass("show"), $(n)
                    .find(".form-control")
                    .focus(), $("body")
                    .addClass("omnisearch-open")
                    .append('<div class="mask-body mask-body-dark" data-action="omnisearch-close" data-target="' + n + '" />'), $("body")
                    .css("padding-right", a + "px");
                break;
            case "omnisearch-close":
                n = e.data("target"), $('[data-action="search-open"]')
                    .removeClass("active"), $(n)
                    .removeClass("show"), $("body")
                    .removeClass("omnisearch-open")
                    .find(".mask-body")
                    .remove(), $("body")
                    .css("padding-right", "0px")
        }
    })
}

function signup() {
    "use strict";
    body.on("click", ".login-btn,.must-log-in a,.comment-reply-login", function(t) {
        t.preventDefault(), open_signup_popup("login")
    }), body.on("click", ".switch-mod-btn", function(t) {
        t.preventDefault(), open_signup_popup($(this)
            .data("mod"))
    }), body.on("click", ".go-login", function(t) {
        t.preventDefault();
        var e = $(this),
            i = $("input[name='username']")
                .val(),
            n = $("input[name='password']")
                .val(),
            a = e.html();
        i ? n ? is_qq_captcha_verify ? rizhuti_v2_ajax({
            action: "user_login",
            username: i,
            password: n,
            rememberme: 1
        }, function(t) {
            e.html(iconspin + a), e.attr("disabled", "true")
        }, function(t) {
            1 == t.status ? this_deft_icon_msg(e, a, iconcheck, t.msg, function() {
                location.reload()
            }) : this_deft_icon_msg(e, a, iconwarning, t.msg)
        }, function() {}) : this_deft_icon_msg(e, a, iconwarning, riprov2.site_js_text.login_txt) : $("input[name='password']")
            .focus() : $("input[name='username']")
            .focus()
    }), body.on("click", ".go-register", function(t) {
        t.preventDefault();
        var e = $(this),
            i = e.text(),
            n = $("input[name='user_email']")
                .val(),
            a = $("input[name='user_pass']")
                .val(),
            o = $("input[name='user_pass2']")
                .val(),
            r = $("input[name='email_verify_code']")
                .val();
        is_check_mail(n) ? is_qq_captcha_verify ? a ? o ? rizhuti_v2_ajax({
            action: "user_register",
            user_email: n,
            user_pass: a,
            user_pass2: o,
            email_verify_code: r
        }, function() {
            e.html(iconspin + i), e.attr("disabled", "true")
        }, function(t) {
            1 == t.status ? this_deft_icon_msg(e, i, iconcheck, t.msg, function() {
                location.reload()
            }) : this_deft_icon_msg(e, i, iconwarning, t.msg)
        }, function() {}) : $("input[name='user_pass2']")
            .focus() : $("input[name='user_pass']")
            .focus() : this_deft_icon_msg(e, i, iconwarning, riprov2.site_js_text.reg2_txt) : this_deft_icon_msg(e, i, iconwarning, riprov2.site_js_text.reg1_txt)
    }), body.on("click", ".go-rest-password", function(t) {
        t.preventDefault();
        var e = $(this),
            i = e.text(),
            n = $("input[name='user_email']")
                .val();
        n ? is_qq_captcha_verify ? rizhuti_v2_ajax({
            action: "user_lostpassword",
            user_email: n
        }, function() {
            e.html(iconspin + i)
        }, function(t) {
            1 == t.status ? this_deft_icon_msg(e, i, iconcheck, t.msg) : this_deft_icon_msg(e, i, iconwarning, t.msg)
        }) : this_deft_icon_msg(e, i, iconwarning, riprov2.site_js_text.pass_txt) : $("input[name='user_email']")
            .focus()
    })
}

function open_signup_popup(t) {
    "use strict";
    var e = '<div class="logo-wrapper" style="max-width: 40%; margin: 0 auto; padding-top: 20px;">' + $(".logo-wrapper")
        .html() + "</div>";
    Swal.fire({
        html: e,
        showConfirmButton: !1,
        width: 340,
        padding: "0",
        focusConfirm: !1,
        showConfirmButton: !1,
        allowOutsideClick: !1,
        showCloseButton: !0,
        onBeforeOpen: () => {
            Swal.showLoading();
            const e = Swal.getContent();
            $.ajax({
                url: riprov2.admin_url,
                type: "POST",
                cache: !0,
                data: {
                    action: "get_signup_html",
                    mod: t,
                    rurl: window.location.href
                },
                success: function(t) {
                    e.innerHTML = t
                },
                error: function(t) {
                    console.log(t)
                },
                complete: function() {
                    Swal.hideLoading()
                }
            })
        },
        onClose: () => {}
    })
}

function rollbar() {
    "use strict";
    $(window)
        .scroll(function() {
            $(this)
                .scrollTop() > 80 ? $(".rollbar")
                .fadeIn() : $(".rollbar")
                .fadeOut()
        }), $(".back-to-top")
        .click(function() {
            return $("html, body")
                .animate({
                    scrollTop: 0
                }, 500), !1
        })
}

function navbar() {
    "use strict";
    st = jQuery(window)
        .scrollTop();
    var t = jQuery(".site-header")
            .height(),
        e = jQuery(".navbar-sticky");
    st > lastSt && st > t ? e.addClass("slide-now") : e.removeClass("slide-now"), lastSt = st
}

function offCanvas() {
    "use strict";
    var t = jQuery(".burger"),
        e = jQuery(".canvas-close");
    jQuery(".main-menu .nav-list")
        .slicknav({
            label: "",
            prependTo: ".mobile-menu"
        }), t.on("click", function() {
        body.toggleClass("canvas-opened"), body.addClass("canvas-visible"), dimmer("open", "medium")
    }), e.on("click", function() {
        body.hasClass("canvas-opened") && (body.removeClass("canvas-opened"), dimmer("close", "medium"))
    }), jQuery(".dimmer")
        .on("click", function() {
            body.hasClass("canvas-opened") && (body.removeClass("canvas-opened"), dimmer("close", "medium"))
        }), jQuery(document)
        .keyup(function(t) {
            27 == t.keyCode && body.hasClass("canvas-opened") && (body.removeClass("canvas-opened"), dimmer("close", "medium"))
        })
}

function toggleDark() {
    "use strict";
    let t = !0 === body.hasClass("dark-open") ? "1" : "0",
        e = localStorage.getItem("dark-open");
    var i = () => {
            body.addClass("dark-open"), localStorage.setItem("dark-open", "1")
        },
        n = () => {
            body.removeClass("dark-open"), localStorage.setItem("dark-open", "0")
        };
    "1" === e ? i() : null == e ? localStorage.setItem("dark-open", t) : "0" === e && n();
    const a = document.querySelector(".toggle-dark");
    a && a.addEventListener("click", () => {
        "1" === localStorage.getItem("dark-open") ? n() : i()
    })
}

function dimmer(t, e) {
    "use strict";
    var i = jQuery(".dimmer");
    switch (t) {
        case "open":
            i.fadeIn(e);
            break;
        case "close":
            i.fadeOut(e)
    }
}

function megaMenu() {
    "use strict";
    jQuery(".menu-posts")
        .not(".owl-loaded")
        .owlCarousel({
            items: 6,
            margin: 15,
            dots: !0,
            nav: !1
        })
}

function sidebar() {
    "use strict";
    if ($(window)
        .width() < 992) $(".widget-area .ripro-v2-widget-shop-down")
        .insertAfter($("#header-widget-shop-down p"));
    else {
        jQuery(".container .sidebar-column")
            .theiaStickySidebar({
                additionalMarginTop: 30
            }), jQuery(".container .content-column")
            .theiaStickySidebar({
                additionalMarginTop: 30
            })
    }
}

function carousel() {
    "use strict";
    var t = {
            autoplay: !0,
            autoplaySpeed: 800,
            loop: !0
        },
        e = jQuery(".slider.img-center.module"),
        i = {
            dots: !0,
            items: 1,
            nav: !0,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            navElement: "div"
        };
    e.each(function(e, n) {
        if (jQuery(n)
            .hasClass("autoplay")) {
            var a = Object.assign(t, i);
            jQuery(n)
                .owlCarousel(a)
        } else jQuery(n)
            .owlCarousel(i)
    });
    var n = jQuery(".slider.big.module"),
        a = {
            dots: !0,
            items: 1,
            nav: !0,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            navElement: "div"
        };
    n.each(function(e, i) {
        if (jQuery(i)
            .hasClass("autoplay")) {
            var n = Object.assign(t, a);
            jQuery(i)
                .owlCarousel(n)
        } else jQuery(i)
            .owlCarousel(a)
    });
    var o = jQuery(".slider.center.module"),
        r = {
            center: !0,
            dotsSpeed: 800,
            dots: !0,
            loop: !0,
            margin: 0,
            nav: !0,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            navElement: "div",
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        };
    o.each(function(e, i) {
        if (jQuery(i)
            .hasClass("autoplay")) {
            var n = Object.assign(t, r);
            jQuery(i)
                .owlCarousel(n)
        } else jQuery(i)
            .owlCarousel(r)
    });
    var s = jQuery(".slider.thumbnail.module"),
        c = {
            dotsData: !0,
            dotsSpeed: 800,
            items: 1
        };
    s.each(function(e, i) {
        if (jQuery(i)
            .hasClass("autoplay")) {
            var n = Object.assign(t, c);
            jQuery(i)
                .owlCarousel(n)
        } else jQuery(i)
            .owlCarousel(c)
    });
    var l = jQuery(".carousel.module"),
        d = {
            autoHeight: !0,
            dots: !1,
            margin: 30,
            nav: !0,
            navSpeed: 500,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            navElement: "div",
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        };
    body.hasClass("wide-screen") && (d.margin = 20, d.responsive = {
        0: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        }
    }), $(window)
        .width() < 992 && (d.margin = 10), l.each(function(e, i) {
        if (jQuery(i)
            .hasClass("autoplay")) {
            var n = Object.assign(t, d);
            jQuery(i)
                .owlCarousel(n)
        } else jQuery(i)
            .owlCarousel(d)
    });
    var u = jQuery(".catbox-carousel.module"),
        p = {
            autoHeight: !0,
            dots: !1,
            margin: 20,
            nav: !0,
            navSpeed: 500,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            navElement: "div",
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                }
            }
        };
    u.each(function(e, i) {
        if (jQuery(i)
            .hasClass("autoplay")) {
            var n = Object.assign(t, p);
            jQuery(i)
                .owlCarousel(n)
        } else jQuery(i)
            .owlCarousel(p)
    })
}

function pagination() {
    "use strict";
    var t = jQuery(".posts-wrapper.scroll"),
        e = jQuery(".infinite-scroll-button"),
        i = {
            append: ".posts-wrapper.scroll > *",
            debug: !1,
            hideNav: ".pagination",
            history: !1,
            path: ".pagination a.next",
            prefill: !0,
            status: ".infinite-scroll-status"
        };
    body.hasClass("pagination-infinite_button") && (i.button = ".infinite-scroll-button", i.prefill = !1, i.scrollThreshold = !1, t.on("request.infiniteScroll", function(t, i) {
        e.html(iconspin + riprov2.infinite_loading)
    }), t.on("load.infiniteScroll", function(t, i, n) {
        e.text(riprov2.infinite_load)
    })), (body.hasClass("pagination-infinite_button") || body.hasClass("pagination-infinite_scroll")) && body.hasClass("paged-next") && t.infiniteScroll(i), $(".home-cat-nav>a")
        .on("click", function(t) {
            t.preventDefault();
            var e = $(this),
                i = e.html();
            e.html(iconspin + i), e.addClass("active"), e.siblings("a")
                .removeClass("active");
            var n = e.data("paged"),
                a = e.data("cat"),
                o = e.data("warp"),
                r = e.data("layout");
            o ? (e.html(i), e.parents(".container")
                .find(".posts-wrapper")
                .html(o)) : (e.index() > 0 && !$(".home-cat-nav>a:first")
                .data("warp") && $(".home-cat-nav>a:first")
                .data("warp", e.parents(".container")
                    .find(".posts-wrapper")
                    .html()), $.post(riprov2.admin_url, {
                action: "ajax_get_posts",
                paged: n,
                cat: a,
                layout: r
            }, function(t) {
                e.html(i), e.parents(".container")
                    .find(".posts-wrapper")
                    .html(t), e.data("warp", t)
            })), $(".infinite-scroll-action")
                .hide()
        })
}

function is_weixin_view() {
    return "micromessenger" == navigator.userAgent.toLowerCase()
        .match(/MicroMessenger/i)
}

function weixin_imgview() {
    if (is_weixin_view()) {
        for (var t = [], e = $(".article-content .entry-content img:not(.avatar)"), i = "", n = "", a = 0; a < e.length; a++) i = e.eq(a)
            .attr("data-src"), n = e[a].src, t[a] = i || n;
        e.on("click", function(e) {
            e.preventDefault();
            var i = $(this)
                    .attr("data-src"),
                n = $(this)
                    .attr("src");
            WeixinJSBridge.invoke("imagePreview", {
                urls: t,
                current: i || n
            })
        })
    }
}

function other_click() {
    "use strict";
    body.on("click", ".go-send-email-code", function(t) {
        var e = $(this),
            i = e.html(),
            n = $("input[name='user_email']")
                .val();
        e.html(iconspin + i), e.attr("disabled", "true"), is_check_mail(n) ? rizhuti_v2_ajax({
            action: "send_email_verify_code",
            user_email: n
        }, null, function(t) {
            1 == t.status ? this_deft_icon_msg(e, i, iconcheck, t.msg, function() {
                e.attr("disabled", "true"), $("input[name='email_verify_code']")
                    .removeAttr("disabled")
            }) : this_deft_icon_msg(e, i, iconwarning, t.msg, function() {
                e.removeAttr("disabled")
            })
        }) : this_deft_icon_msg(e, i, iconwarning, "邮箱格式错误")
    }), body.on("click", ".go-bind-email", function(t) {
        t.preventDefault();
        var e = $(this),
            i = e.text(),
            n = $("input[name='user_email']")
                .val(),
            a = $("input[name='email_verify_code']")
                .val();
        e.html(iconspin + i), e.attr("disabled", "true"), is_qq_captcha_verify ? rizhuti_v2_ajax({
            action: "user_bind_email",
            email_verify_code: a,
            user_email: n
        }, null, function(t) {
            1 == t.status ? ripro_v2_toast_msg("success", t.msg, function() {
                location.reload()
            }) : ripro_v2_toast_msg("info", t.msg, function() {
                e.html(i), e.removeAttr("disabled")
            })
        }) : ripro_v2_toast_msg("info", riprov2.site_js_text.bind_txt, function() {
            e.removeAttr("disabled"), e.html(i)
        })
    }), body.on("click", ".mpweixin", function(t) {
        t.preventDefault();
        $(this);
        rizhuti_v2_ajax({
            action: "get_mpweixin_qr"
        }, function(t) {
            Swal.showLoading()
        }, function(t) {
            if (1 == riprov2.jquey && 1 == t.status) {
                display_pay_qr('<p class="pt-4 m-0 text-success"><i class="fa fa-weixin"></i> ' + riprov2.site_js_text.mpwx1_txt + '</p><img class="pl-4 pr-4" src="' + t.ticket_img + '"><p class="small">' + riprov2.site_js_text.mpwx2_txt + "</p>");
                var e = setInterval(function() {
                    rizhuti_v2_ajax({
                        action: "check_mpweixin_qr",
                        scene_id: t.scene_id
                    }, null, function(t) {
                        1 == t.status ? (clearInterval(e), ripro_v2_toast_msg("success", t.msg, function() {
                            location.reload()
                        })) : "" !== t.msg && (clearInterval(e), ripro_v2_toast_msg("info", t.msg))
                    })
                }, 3e3)
            } else ripro_v2_toast_msg("info", t.ticket_img)
        }, function(t) {
            Swal.hideLoading()
        })
    })
}

function singular_poster() {
    "use strict";
    $(".archive-filter .dropdown")
        .each(function(t, e) {
            jQuery(e)
                .find(".dropdown-item.active")
                .length && (jQuery(e)
                .find(".dropdown-toggle")
                .html(iconspin), jQuery(e)
                .find(".dropdown-toggle")
                .html(jQuery(e)
                    .find(".dropdown-item.active")
                    .html()))
        }), body.on("click", ".go-copy", function(t) {
        var e = new ClipboardJS(t.currentTarget);
        t.currentTarget.click(), t.currentTarget.click(), e.on("success", function(t) {
            ripro_v2_toast_msg("success", $(t.trigger)
                .text() + riprov2.site_js_text.copy_txt), t.clearSelection(), e.destroy()
        })
    }), riprov2.singular_id > 0 && rizhuti_v2_ajax({
        action: "add_post_views_num",
        id: riprov2.singular_id
    }, function() {}, function(t) {}), $(".go-star-btn")
        .on("click", function() {
            var t = $(this);
            t.html();
            rizhuti_v2_ajax({
                action: "go_fav_post",
                post_id: t.data("id")
            }, function(e) {
                t.html(iconspin)
            }, function(e) {
                1 == e.status ? (t.toggleClass("ok"), t.attr("disabled", "true")
                    .html(e.msg)) : t.attr("disabled", "true")
                    .html(e.msg)
            })
        }), $(".share-poster")
        .on("click", function() {
            var t = $(this);
            Swal.fire({
                html: '<div id="poster-html" class="poster-html"></div>',
                showConfirmButton: !1,
                width: 320,
                padding: 0,
                background: "transparent",
                showCloseButton: !0,
                onBeforeOpen: () => {
                    Swal.showLoading(), $.post(riprov2.admin_url, {
                        action: "get_poster_html",
                        id: t.data("id")
                    }, function(t) {
                        t ? (t.callback = function(t) {
                            Swal.hideLoading(), $(".poster-html")
                                .html('<div class="poster-canvas"><img src="' + t + '"></div>')
                        }, canvas_poster(t)) : ripro_v2_toast_msg("info", riprov2.site_js_text.poster_txt)
                    })
                },
                onClose: () => {}
            })
        })
}

function singular_media() {
    "use strict";
    let t = ".posts-wrapper .entry-media.video-thum";
    body.on("mouseenter", t, function() {
        var t = $(this),
            e = setTimeout(function() {
                var e = t.data("mp4"),
                    i = t.data("webm") ? e.rsplit(".", 1)[0] + ".webm" : "",
                    n = '<source type="video/mp4" src="'.concat(e, '">'),
                    a = i ? '<source type="video/webm" src="'.concat(i, '">') : "",
                    o = '<video width="' + t.width() + '" height="' + t.height() + '" style="display:none" onloadeddata="$(this).addClass(\'playing\').show();" autoplay muted loop>\n '.concat(n, "\n ")
                        .concat(a, "\n </video>");
                t.prepend(o)
            }, 300);
        t.data("loadTimeout", e)
    })
        .on("mouseleave", t, function() {
            var t = $(this),
                e = t.data("loadTimeout");
            clearTimeout(e), t.find("video")
                .remove()
        }), $("iframe")
        .css("min-height", .66 * $("iframe")
            .width()), !is_weixin_view() && riprov2.is_single_gallery > 0 && jQuery(".article-content .entry-content")
        .on("click", "img:not(.avatar)", function(t) {
            t.preventDefault();
            var e = [],
                i = jQuery(this),
                n = 0;
            if (i.parents(".entry-media")
                .length > 0) location.href = i.parent("a")
                .attr("href");
            else {
                if (i.parents(".gallery-item")
                    .length > 0) n = i.parents(".gallery-item")
                    .index(), jQuery.each(i.parents(".gallery-item")
                        .siblings()
                        .addBack(),
                    function(t, i) {
                        var n = jQuery(i)
                                .find("a")
                                .attr("href"),
                            a = (jQuery(i)
                                .find("img")
                                .attr("src"), jQuery(i)
                                .find("a")
                                .attr("alt") || jQuery(i)
                                .find(".gallery-caption")
                                .text());
                        "#" !== n && e.push({
                            src: n,
                            description: a
                        })
                    });
                else {
                    if (!(i.parent("a")
                        .length > 0)) return;
                    e.push({
                        src: i.parent("a")
                            .attr("href") || i.attr("src"),
                        description: i.attr("alt")
                    })
                }
                var a = !0 === body.hasClass("dark-open") ? "dark" : "white";
                Spotlight.show(e, {
                    index: n + 1,
                    theme: a,
                    animation: "slide,fade,scale",
                    autohide: !0,
                    control: ["page", "fullscreen", "autofit", "zoom", "close"]
                })
            }
        })
}

function post_pay() {
    "use strict";
    body.on("click", ".click-pay-post", function() {
        var t = $(this);
        select_pay_mode({
            action: "go_post_pay",
            post_id: t.data("postid"),
            pay_type: 1,
            pay_price: t.data("price"),
            nonce: t.data("nonce")
        })
    })
}

function reload_this_href() {
    $.ajax({
        url: window.location.href,
        data: {},
        dataType: "html",
        async: !0,
        cache: !1,
        success: function() {
            location.reload()
        },
        error: function() {
            location.reload()
        }
    })
}

function select_pay_mode(t) {
    Swal.fire({
        title: "",
        html: riprov2.pay_type_html.html,
        showConfirmButton: !1,
        width: 300,
        padding: 10,
        showCloseButton: !0,
        onBeforeOpen: () => {
            const e = Swal.getContent(),
                i = e.querySelector.bind(e),
                n = i("#alipay"),
                a = i("#weixinpay"),
                o = i("#iconpay"),
                r = i("#paypal");
                u = i("#usdt");
            n && n.addEventListener("click", () => {
                t.pay_type = riprov2.pay_type_html.alipay, to_pay_data(t)
            }), a && a.addEventListener("click", () => {
                t.pay_type = riprov2.pay_type_html.weixinpay, to_pay_data(t)
            }), r && r.addEventListener("click", () => {
                t.pay_type = riprov2.pay_type_html.paypal, to_pay_data(t)
            }),u && u.addEventListener("click", () => {
                t.pay_type = riprov2.pay_type_html.usdt, to_pay_data(t)
            }), o && o.addEventListener("click", () => {
                t.pay_type = riprov2.pay_type_html.iconpay, to_pay_data(t)
            })
        },
        onClose: () => {}
    })
}

function check_pay_status(t, e) {
    var i = setInterval(function() {
        rizhuti_v2_ajax({
            action: "check_pay",
            num: e,
            post_id: t
        }, null, function(t) {
            1 == t.status && (clearInterval(i), Cookies.remove("current_pay_ordernum"), ripro_v2_toast_msg("success", t.msg, function() {
                location.reload()
            }))
        })
    }, 2e3)
}

function to_pay_data(t) {
    rizhuti_v2_ajax(t, function(t) {
        Swal.showLoading()
    }, function(e) {
        1 == e.status ? 2 == e.type ? (Cookies.set("current_pay_ordernum", e.num), window.location.href = e.msg) : 3 == e.type ? (Cookies.set("current_pay_ordernum", e.num), "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", function() {
            onBridgeReady(e.msg)
        }, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", function() {
            onBridgeReady(e.msg)
        }), document.attachEvent("onWeixinJSBridgeReady", function() {
            onBridgeReady(e.msg)
        })) : onBridgeReady(e.msg)) : 4 == e.type ? (Swal.showLoading(), ripro_v2_toast_msg("success", e.msg, function() {
            reload_this_href()
        })) : (display_pay_qr(e.msg), check_pay_status(t.post_id, e.num)) : Swal.fire("", e.msg, "info")
    }, function(t) {
        Swal.hideLoading()
    })
}

function display_pay_qr(t) {
    Swal.fire({
        html: t,
        showConfirmButton: !1,
        width: 300,
        padding: "0",
        background: "#fff",
        allowOutsideClick: !1,
        showCloseButton: !0,
        timer: 1e5,
        timerProgressBar: !0,
        onClose: () => {
            setTimeout(function() {
                location.reload()
            }, 500)
        }
    })
}

function onBridgeReady(t) {
    WeixinJSBridge.invoke("getBrandWCPayRequest", JSON.parse(t), function(t) {
        "get_brand_wcpay_request:ok" === t.err_msg ? ripro_v2_toast_msg("success", riprov2.site_js_text.pay3_txt, function() {
            reload_this_href()
        }) : setTimeout(function() {
            location.reload()
        }, 500)
    })
}

function rizhuti_v2_ajax(t, e, i, n) {
    i = i || function(t) {
        console.log(t)
    }, e = e || function(t) {}, n = n || function(t) {};
    $.ajax({
        url: riprov2.admin_url,
        data: t,
        type: "post",
        dataType: "json",
        async: !0,
        success: i,
        error: function(t) {
            ripro_v2_toast_msg("info", t.responseText)
        },
        beforeSend: e,
        complete: n
    })
}

function rizhuti_v2_ajax_html(t, e, i, n) {
    i = i || function(t) {
        console.log(t)
    }, e = e || function(t) {}, n = n || function(t) {};
    $.ajax({
        url: riprov2.admin_url,
        data: t,
        type: "post",
        dataType: "html",
        async: !0,
        success: i,
        error: function(t) {
            ripro_v2_toast_msg("info", t.responseText)
        },
        beforeSend: e,
        complete: n
    })
}

function ripro_v2_toast_msg(t, e, i) {
    var n = i || function(t) {};
    Swal.mixin({
        toast: !0,
        position: "top",
        showConfirmButton: !1,
        timer: 2e3,
        timerProgressBar: !0,
        onOpen: t => {
            t.addEventListener("mouseenter", Swal.stopTimer), t.addEventListener("mouseleave", Swal.resumeTimer)
        }
    })
        .fire({
            icon: t,
            title: e,
            onClose: n
        })
}

function get_async() {
    var t = $(".async-shop-down");
    t.length > 0 && rizhuti_v2_ajax_html({
        action: "get_async_shop_down",
        post_id: riprov2.singular_id
    }, null, function(e) {
        t.html(e)
    }, null)
}

function this_deft_icon_msg(t, e, i, n, a = null) {
    t.html(i + n), t.attr("disabled", "true"), setTimeout(function() {
        t.html(e), t.removeAttr("disabled"), a && new a
    }, 2e3)
}

function is_check_name(t) {
    return /^[\w]{3,16}$/.test(t)
}

function is_check_mail(t) {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(t)
}

function getScrollbarWidth() {
    var t, e, i = document.createElement("div"),
        n = {
            width: "100px",
            height: "100px",
            overflowY: "scroll"
        };
    for (t in n) i.style[t] = n[t];
    return document.body.appendChild(i), e = i.offsetWidth - i.clientWidth, i.remove(), e
}

function embedImage() {
    var t = prompt(riprov2.site_js_text.prompt_txt, "http://");
    t && (document.getElementById("comment")
        .value = document.getElementById("comment")
        .value + "" + t)
}

function AutoScroll(t) {
    $(t)
        .find("ul:first")
        .animate({
            marginTop: "-25px"
        }, 500, function() {
            $(this)
                .css({
                    marginTop: "0px"
                })
                .find("li:first")
                .appendTo(this)
        })
}

function canvas_poster(t) {
    var e = document.createElement("canvas"),
        i = e.getContext("2d"),
        n = 720,
        a = 1100;

    function o(t, e, i, n, a) {
        for (var o = 0, r = 0, s = 0; s < t.length; s++)(o += a.measureText(t[s])
            .width) > f.main_width - 20 && (a.fillText(t.substring(r, s), e, i), i += n, o = 0, r = s), s == t.length - 1 && (a.fillText(t.substring(r, s + 1), e, i), i += n);
        return i
    }
    e.width = n, e.height = 1e4, console.log("this canvas poster method copyright by zmingcx.com"), i.fillStyle = "#fff", i.fillRect(0, 0, e.width, e.height), f = {
        padding_left: 40,
        padding_year: 43,
        padding_cat: 68,
        padding_left_logo: 40,
        padding_top: 0,
        head_width: n,
        main_width: 640,
        name_width: 100,
        with_content: 1,
        with_domain: 0
    },
        function(e, a) {
            var o = new Image;
            o.crossOrigin = "anonymous", t.head.match(/^\/\//) && (t.head = window.location.protocol + t.head), o.src = t.head, o.onerror = function(t) {
                ripro_v2_toast_msg("info", "Post Thumbnail Error")
            }, o.onload = function() {
                var t = parseInt(2 * f.head_width / 3),
                    r = parseInt(2 * o.width / 3),
                    s = 0,
                    c = o.width,
                    l = o.height,
                    d = f.head_width,
                    u = t,
                    p = (n - f.head_width) / 2,
                    m = f.padding_top;
                o.height === o.width ? (p = parseInt((f.head_width - t) / 2) + (n - f.head_width) / 2 + 20, u = d = t - 40, m = 40 + f.padding_top) : o.height > r ? l = r : o.height < r && (c = parseInt(3 * l / 2), s = parseInt((o.width - c) / 2)), e += t + f.padding_top, i.drawImage(this, s, 0, c, l, p, m, d, u), a && a(e)
            }
        }(0, function(r) {
            (function(e, n) {
                i.stroke(), i.fillStyle = "#fff", i.textAlign = "left", i.font = "700 90px sans-serif", e += -80, e = o(jQuery("<div>")
                    .html(t.day)
                    .text(), f.padding_left, e, 40, i), n && n(e)
            })(r, function(t) {}),
                function(e, n) {
                    i.stroke(), i.fillStyle = "#fff", i.textAlign = "left", i.font = "300 23px sans-serif", e += -40, e = o(jQuery("<div>")
                        .html(t.year)
                        .text(), f.padding_year, e, 40, i), n && n(e)
                }(r, function(t) {}),
                function(e, n) {
                    i.stroke(), i.fillStyle = "#c40000", i.textAlign = "left", i.font = "700 25px sans-serif", e += 42, e = o(jQuery("<div>")
                        .html(t.ico_cat)
                        .text(), f.padding_left, e, 48, i), n && n(e)
                }(r, function(t) {}),
                function(e, n) {
                    i.stroke(), i.fillStyle = "#666", i.textAlign = "left", i.font = "700 18px sans-serif", e += 40, e = o(jQuery("<div>")
                        .html(t.post_cat)
                        .text(), f.padding_cat, e, 48, i), n && n(e)
                }(r, function(t) {}),
                function(e, n) {
                    i.stroke(), i.fillStyle = "#333", i.textAlign = "left", i.font = "700 34px sans-serif", e += 90, e = o(jQuery("<div>")
                        .html(t.title)
                        .text(), f.padding_left, e, 48, i), n && n(e)
                }(r, function(t) {}),
                function(e, n) {
                    i.textAlign = "left", i.fillStyle = "#555", i.font = "300 28px sans-serif", e += 200, e = o(jQuery("<div>")
                        .html(t.excerpt)
                        .text(), f.padding_left, e, 48, i), n && n(e)
                }(r, function(t) {}),
                function(e, n) {
                    var a = new Image;
                    a.crossOrigin = "anonymous", t.logo.match(/^\/\//) && (t.logo = window.location.protocol + t.logo), a.src = t.logo, a.onerror = function(t) {
                        ripro_v2_toast_msg("info", "Site Logo Error")
                    }, a.onload = function() {
                        e += 390;
                        var t = 400 / a.width * a.height;
                        t = 50 < t ? 50 : t;
                        var o = a.width / (a.height / t);
                        t = (o = 400 < o ? 400 : o) / a.width * a.height, i.drawImage(this, 0, 0, a.width, a.height, f.padding_left_logo, e + (80 - t) / 2, o, t), n && n(e, t)
                    }
                }(r, function(o, r) {
                    ! function(o, r, s) {
                        var c = new Image;
                        c.src = t.qrcode, c.onerror = function(t) {
                            ripro_v2_toast_msg("info", "Qrcode Error")
                        }, c.onload = function() {
                            var l = n - f.padding_left - 120;
                            i.drawImage(this, 0, 0, c.width, c.height, l, 876, 120, 120 / c.width * c.height);
                            var d = 120 / c.width * c.height;
                            o += r < d ? d : r, o = a;
                            var u = i.getImageData(0, 0, n, o);
                            e.height = o, i.putImageData(u, 0, 0);
                            var p = e.toDataURL("image/jpeg", 1);
                            t.callback(p), s && s(o)
                        }
                    }(o, r)
                }),
                function(e, n) {
                    i.textAlign = "left", i.fillStyle = "#666", i.font = "700 20px sans-serif", e += 485, e = o(jQuery("<div>")
                        .html(t.get_name)
                        .text(), f.padding_left_logo, e, 42, i), n && n(e)
                }(r),
                function(e, n) {
                    i.textAlign = "left", i.fillStyle = "#666", i.font = "300 14px sans-serif", e += 510, e = o(jQuery("<div>")
                        .html(t.web_home)
                        .text(), f.padding_left_logo, e, 42, i), n && n(e)
                }(r),
                function(e, n) {
                    i.textAlign = "left", i.fillStyle = "#444", i.font = "300 16px sans-serif", e += 580, e = o(jQuery("<div>")
                        .html(t.warn)
                        .text(), 256, e, 42, i), n && n(e)
                }(r)
        })
}
1 == riprov2.is_qq_captcha && (is_qq_captcha_verify = !1), console.log("\n %c Theme By RiPro-V2 %c https://ritheme.com \n\n", "color: #fff; background: #34495e; padding:5px 0;", "background: #fadfa3; padding:5px 0;"), jQuery(function() {
    "use strict";
    offCanvas(), toggleDark(), megaMenu(), signup(), pagination(), sidebar(), search(), carousel(), post_pay(), other_click(), weixin_imgview(), singular_media(), singular_poster(), get_async(), rollbar(), $('[data-toggle="tooltip"]')
        .tooltip(), 1 == riprov2.site_notice.auto && site_notify()
}), jQuery(".toggle-notify")
    .on("click", function() {
        site_notify(!0)
    }), $(".selectpicker")
    .selectpicker("setStyle", "btn-white"), jQuery(window)
    .scroll(function() {
        "use strict";
        body.hasClass("navbar-sticky") && window.requestAnimationFrame(navbar)
    }), document.addEventListener("lazyloaded", function(t) {
    var e = {
        disableParallax: /iPad|iPhone|iPod|Android/,
        disableVideo: /iPad|iPhone|iPod|Android/,
        speed: .1
    };
    try {
        !jQuery(t.target)
            .parents(".hero")
            .length && !jQuery(t.target)
            .hasClass("hero") || body.hasClass("hero-video") || jQuery(t.target)
            .jarallax(e), jQuery(t.target)
            .parent()
            .hasClass("module") && jQuery(t.target)
            .parent()
            .hasClass("parallax") && jQuery(t.target)
            .parent()
            .jarallax(e), jQuery(t.target)
            .hasClass("jarallax-sarch") && jQuery(t.target)
            .jarallax(e)
    } catch (t) {
        console.log("function" == typeof jarallax)
    }
}), jQuery(function() {
    var t = Cookies.get("current_pay_ordernum");
    t && rizhuti_v2_ajax({
        action: "check_pay",
        num: t,
        post_id: 0
    }, null, function(t) {
        1 == t.status ? ripro_v2_toast_msg("success", t.msg, function() {
            Cookies.remove("current_pay_ordernum"), window.location.href = t.back_url
        }) : Swal.fire({
            html: t.msg,
            icon: "warning",
            showCancelButton: !0,
            allowOutsideClick: !1,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: riprov2.site_js_text.pay1_txt,
            cancelButtonText: riprov2.site_js_text.pay2_txt
        })
            .then(e => {
                e.isDismissed && Cookies.remove("current_pay_ordernum"), window.location.href = t.back_url
            })
    })
}), body.on("click", "#TencentCaptchaBtn", function(t) {
    t.preventDefault();
    var e = $(this)
        .data("appid")
        .toString();
    new TencentCaptcha(e, function(t) {
        if (0 === t.ret) {
            var e = $(".TencentCaptchaBtn");
            rizhuti_v2_ajax({
                action: "qq_captcha_verify",
                Ticket: t.ticket,
                Randstr: t.randstr
            }, function(t) {
                e.html(iconspin + "&nbsp;" + riprov2.site_js_text.capt_txt), e.attr("disabled", "disabled")
            }, function(t) {
                1 == t.response ? (e.css({
                    "background-color": "#8bc34a",
                    color: "#fff"
                }), e.html(iconcheck + "&nbsp;" + riprov2.site_js_text.capt1_txt), e.attr("disabled", "disabled"), is_qq_captcha_verify = !0) : (e.html(iconwarning + "&nbsp;" + riprov2.site_js_text.capt2_txt), e.attr("disabled", "disabled"))
            })
        }
    })
        .show()
}), jQuery(document)
    .ready(function(t) {
        t("#cancel-comment-reply-link")
            .text();
        var e = "comments-list";
        t(document)
            .on("submit", "#commentform", function(i) {
                return i.preventDefault(), t.ajax({
                    url: riprov2.admin_url,
                    data: t(this)
                        .serialize() + "&action=ajax_comment",
                    type: t(this)
                        .attr("method"),
                    beforeSend: faAjax.createButterbar(riprov2.site_js_text.comment_txt),
                    error: function(t) {
                        faAjax.createButterbar(t.responseText)
                    },
                    success: function(i) {
                        t("textarea")
                            .each(function() {
                                this.value = ""
                            });
                        var n = faAjax,
                            a = n.I("cancel-comment-reply-link"),
                            o = n.I("wp-temp-form-div"),
                            r = n.I(n.respondId);
                        n.I("comment_post_ID")
                            .value;
                        "0" != n.I("comment_parent")
                            .value ? t("#respond")
                            .before('<ul class="comment-children">' + i + "</ul>") : t("." + e)
                            .length ? "asc" == riprov2.comment_list_order ? t("." + e)
                            .append(i) : t("." + e)
                            .prepend(i) : t("#respond")
                            .after('<ul class="' + e + '">' + i + "</ul>"), n.createButterbar(riprov2.site_js_text.comment1_txt), a.style.display = "none", a.onclick = null, n.I("comment_parent")
                            .value = "0", o && r && (o.parentNode.insertBefore(r, o), o.parentNode.removeChild(o))
                    }
                }), !1
            }), faAjax = {
            I: function(t) {
                return document.getElementById(t)
            },
            clearButterbar: function(e) {
                t(".butterBar")
                    .length > 0 && t(".butterBar")
                    .remove()
            },
            createButterbar: function(e) {
                this.clearButterbar(), t("#commentform")
                    .append('<div class="butterBar"><p class="butterBar-message">' + e + "</p></div>"), setTimeout("jQuery('.butterBar').remove()", 3e3)
            }
        }
    });