/*!
 * Variations Plugin
 */
! function(a, b, c, d) {
    a.fn.wc_variation_form = function() {
        var c = this,
            f = c.closest(".product"),
            g = parseInt(c.data("product_id"), 10),
            h = c.data("product_variations"),
            i = h === !1,
            j = !1,
            k = c.find(".reset_variations");
        return c.unbind("check_variations update_variation_values found_variation"), c.find(".reset_variations").unbind("click"), c.find(".variations select").unbind("change focusin"), c.on("click", ".reset_variations", function() {
            return c.find(".variations select").val("").change(), c.trigger("reset_data"), !1
        }).on("reload_product_variations", function() {
            h = c.data("product_variations"), i = h === !1
        }).on("reset_data", function() {
            var b = {
                ".sku": "o_sku",
                ".product_weight": "o_weight",
                ".product_dimensions": "o_dimensions"
            };
            a.each(b, function(a, b) {
                var c = f.find(a);
                c.attr("data-" + b) && c.text(c.attr("data-" + b))
            }), c.wc_variations_description_update(""), c.trigger("reset_image"), c.find(".single_variation_wrap").slideUp(200).trigger("hide_variation")
        }).on("reset_image", function() {
            var a = f.find("div.images img:eq(0)"),
                b = f.find("div.images a.zoom:eq(0)"),
                c = a.attr("data-o_src"),
                e = a.attr("data-o_title"),
                g = a.attr("data-o_title"),
                h = b.attr("data-o_href");
            c !== d && a.attr("src", c), h !== d && b.attr("href", h), e !== d && (a.attr("title", e), b.attr("title", e)), g !== d && a.attr("alt", g)
        }).on("change", ".variations select", function() {
            if (c.find('input[name="variation_id"], input.variation_id').val("").change(), c.find(".wc-no-matching-variations").remove(), i) {
                j && j.abort();
                var b = !0,
                    d = !1,
                    e = {};
                c.find(".variations select").each(function() {
                    var c = a(this).data("attribute_name") || a(this).attr("name");
                    0 === a(this).val().length ? b = !1 : d = !0, e[c] = a(this).val()
                }), b ? (e.product_id = g, j = a.ajax({
                    url: wc_cart_fragments_params.wc_ajax_url.toString().replace("%%endpoint%%", "get_variation"),
                    type: "POST",
                    data: e,
                    success: function(a) {
                        a ? (c.find('input[name="variation_id"], input.variation_id').val(a.variation_id).change(), c.trigger("found_variation", [a])) : (c.trigger("reset_data"), c.find(".single_variation_wrap").after('<p class="wc-no-matching-variations woocommerce-info">' + wc_add_to_cart_variation_params.i18n_no_matching_variations_text + "</p>"), c.find(".wc-no-matching-variations").slideDown(200))
                    }
                })) : c.trigger("reset_data"), d ? "hidden" === k.css("visibility") && k.css("visibility", "visible").hide().fadeIn() : k.css("visibility", "hidden")
            } else c.trigger("woocommerce_variation_select_change"), c.trigger("check_variations", ["", !1]), a(this).blur();
            c.trigger("woocommerce_variation_has_changed")
        }).on("focusin touchstart", ".variations select", function() {
            i || (c.trigger("woocommerce_variation_select_focusin"), c.trigger("check_variations", [a(this).data("attribute_name") || a(this).attr("name"), !0]))
        }).on("found_variation", function(a, b) {
            var e = f.find("div.images img:eq(0)"),
                g = f.find("div.images a.zoom:eq(0)"),
                h = e.attr("data-o_src"),
                i = e.attr("data-o_title"),
                j = e.attr("data-o_alt"),
                k = g.attr("data-o_href"),
                l = b.image_src,
                m = b.image_link,
                n = b.image_caption,
                o = b.image_title;
            c.find(".single_variation").html(b.price_html + b.availability_html), h === d && (h = e.attr("src") ? e.attr("src") : "", e.attr("data-o_src", h)), k === d && (k = g.attr("href") ? g.attr("href") : "", g.attr("data-o_href", k)), i === d && (i = e.attr("title") ? e.attr("title") : "", e.attr("data-o_title", i)), j === d && (j = e.attr("alt") ? e.attr("alt") : "", e.attr("data-o_alt", j)), l && l.length > 1 ? (e.attr("src", l).attr("alt", o).attr("title", o), g.attr("href", m).attr("title", n)) : (e.attr("src", h).attr("alt", j).attr("title", i), g.attr("href", k).attr("title", i));
            var p = c.find(".single_variation_wrap"),
                q = f.find(".product_meta").find(".sku"),
                r = f.find(".product_weight"),
                s = f.find(".product_dimensions");
            q.attr("data-o_sku") || q.attr("data-o_sku", q.text()), r.attr("data-o_weight") || r.attr("data-o_weight", r.text()), s.attr("data-o_dimensions") || s.attr("data-o_dimensions", s.text()), b.sku ? q.text(b.sku) : q.text(q.attr("data-o_sku")), b.weight ? r.text(b.weight) : r.text(r.attr("data-o_weight")), b.dimensions ? s.text(b.dimensions) : s.text(s.attr("data-o_dimensions"));
            var t = !1,
                u = !1;
            b.is_purchasable && b.is_in_stock && b.variation_is_visible || (u = !0), b.variation_is_visible || c.find(".single_variation").html("<p>" + wc_add_to_cart_variation_params.i18n_unavailable_text + "</p>"), "" !== b.min_qty ? p.find(".quantity input.qty").attr("min", b.min_qty).val(b.min_qty) : p.find(".quantity input.qty").removeAttr("min"), "" !== b.max_qty ? p.find(".quantity input.qty").attr("max", b.max_qty) : p.find(".quantity input.qty").removeAttr("max"), "yes" === b.is_sold_individually && (p.find(".quantity input.qty").val("1"), t = !0), t ? p.find(".quantity").hide() : u || p.find(".quantity").show(), u ? p.is(":visible") ? c.find(".variations_button").slideUp(200) : c.find(".variations_button").hide() : p.is(":visible") ? c.find(".variations_button").slideDown(200) : c.find(".variations_button").show(), c.wc_variations_description_update(b.variation_description), p.slideDown(200).trigger("show_variation", [b])
        }).on("check_variations", function(c, d, f) {
            if (!i) {
                var g = !0,
                    j = !1,
                    k = {},
                    l = a(this),
                    m = l.find(".reset_variations");
                l.find(".variations select").each(function() {
                    var b = a(this).data("attribute_name") || a(this).attr("name");
                    0 === a(this).val().length ? g = !1 : j = !0, d && b === d ? (g = !1, k[b] = "") : k[b] = a(this).val()
                });
                var n = e.find_matching_variations(h, k);
                if (g) {
                    var o = n.shift();
                    o ? (l.find('input[name="variation_id"], input.variation_id').val(o.variation_id).change(), l.trigger("found_variation", [o])) : (l.find(".variations select").val(""), f || l.trigger("reset_data"), b.alert(wc_add_to_cart_variation_params.i18n_no_matching_variations_text))
                } else l.trigger("update_variation_values", [n]), f || l.trigger("reset_data"), d || l.find(".single_variation_wrap").slideUp(200).trigger("hide_variation");
                j ? "hidden" === m.css("visibility") && m.css("visibility", "visible").hide().fadeIn() : m.css("visibility", "hidden")
            }
        }).on("update_variation_values", function(b, d) {
            i || (c.find(".variations select").each(function(b, c) {
                var e, f = a(c);
                f.data("attribute_options") || f.data("attribute_options", f.find("option:gt(0)").get()), f.find("option:gt(0)").remove(), f.append(f.data("attribute_options")), f.find("option:gt(0)").removeClass("attached"), f.find("option:gt(0)").removeClass("enabled"), f.find("option:gt(0)").removeAttr("disabled"), e = "undefined" != typeof f.data("attribute_name") ? f.data("attribute_name") : f.attr("name");
                for (var g in d)
                    if ("undefined" != typeof d[g]) {
                        var h = d[g].attributes;
                        for (var i in h)
                            if (h.hasOwnProperty(i)) {
                                var j = h[i];
                                if (i === e) {
                                    var k = "";
                                    d[g].variation_is_active && (k = "enabled"), j ? (j = a("<div/>").html(j).text(), j = j.replace(/'/g, "\\'"), j = j.replace(/"/g, '\\"'), f.find('option[value="' + j + '"]').addClass("attached " + k)) : f.find("option:gt(0)").addClass("attached " + k)
                                }
                            }
                    }
                f.find("option:gt(0):not(.attached)").remove(), f.find("option:gt(0):not(.enabled)").attr("disabled", "disabled")
            }), c.trigger("woocommerce_update_variation_values"))
        }), c.trigger("wc_variation_form"), c
    };
    var e = {
        find_matching_variations: function(a, b) {
            for (var c = [], d = 0; d < a.length; d++) {
                var f = a[d];
                e.variations_match(f.attributes, b) && c.push(f)
            }
            return c
        },
        variations_match: function(a, b) {
            var c = !0;
            for (var e in a)
                if (a.hasOwnProperty(e)) {
                    var f = a[e],
                        g = b[e];
                    f !== d && g !== d && 0 !== f.length && 0 !== g.length && f !== g && (c = !1)
                }
            return c
        }
    };
    a.fn.wc_variations_description_update = function(b) {
        var c = this,
            d = c.find(".woocommerce-variation-description");
        if (0 === d.length) b && (c.find(".single_variation_wrap").prepend(a('<div class="woocommerce-variation-description" style="border:1px solid transparent;">' + b + "</div>").hide()), c.find(".woocommerce-variation-description").slideDown(200));
        else {
            var e = d.outerHeight(!0),
                f = 0,
                g = !1;
            d.css("height", e), d.html(b), d.css("height", "auto"), f = d.outerHeight(!0), Math.abs(f - e) > 1 && (g = !0, d.css("height", e)), g && d.animate({
                height: f
            }, {
                duration: 200,
                queue: !1,
                always: function() {
                    d.css({
                        height: "auto"
                    })
                }
            })
        }
    }, a(function() {
        "undefined" != typeof wc_add_to_cart_variation_params && a(".variations_form").each(function() {
            a(this).wc_variation_form().find(".variations select:eq(0)").change()
        })
    })
}(jQuery, window, document);;
document.documentElement.className += ' js_active ';
document.documentElement.className += 'ontouchstart' in document.documentElement ? ' vc_mobile ' : ' vc_desktop ';
(function() {
    var prefix = [
        '-webkit-',
        '-moz-',
        '-ms-',
        '-o-',
        ''
    ];
    for (var i = 0; i < prefix.length; i++) {
        if (prefix[i] + 'transform' in document.documentElement.style) {
            document.documentElement.className += " vc_transform ";
        }
    }
})();
/*
 On document ready jQuery will fire set of functions.
 If you want to override function behavior then copy it to your theme js file
 with the same name.
 */

jQuery(window).load(function() {

});

function vc_js() {
    vc_twitterBehaviour();
    vc_toggleBehaviour();
    vc_tabsBehaviour();
    vc_accordionBehaviour();
    vc_teaserGrid();
    vc_carouselBehaviour();
    vc_slidersBehaviour();
    vc_prettyPhoto();
    vc_googleplus();
    vc_pinterest();
    vc_progress_bar();
    vc_plugin_flexslider();
    vc_google_fonts();
    vc_gridBehaviour();
    vc_rowBehaviour();
    vc_ttaActivation(); // @since 4.5
    jQuery(document).trigger('vc_js');
    window.setTimeout(vc_waypoints, 500);
}
jQuery(document).ready(function($) {
    window.vc_js();
});

if ('function' !== typeof(window['vc_plugin_flexslider'])) {
    window.vc_plugin_flexslider = function($parent) {
        var $slider = $parent ? $parent.find('.wpb_flexslider') : jQuery('.wpb_flexslider');
        $slider.each(function() {
            var this_element = jQuery(this);
            var sliderSpeed = 800,
                sliderTimeout = parseInt(this_element.attr('data-interval')) * 1000,
                sliderFx = this_element.attr('data-flex_fx'),
                slideshow = true;
            if (0 === sliderTimeout) {
                slideshow = false;
            }

            this_element.is(':visible') && this_element.flexslider({
                animation: sliderFx,
                slideshow: slideshow,
                slideshowSpeed: sliderTimeout,
                sliderSpeed: sliderSpeed,
                smoothHeight: true
            });
        });
    };
}

/* Twitter
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_twitterBehaviour'])) {
    window.vc_twitterBehaviour = function() {
        jQuery('.wpb_twitter_widget .tweets').each(function(index) {
            var this_element = jQuery(this),
                tw_name = this_element.attr('data-tw_name'),
                tw_count = this_element.attr('data-tw_count');

            this_element.tweet({
                username: tw_name,
                join_text: "auto",
                avatar_size: 0,
                count: tw_count,
                template: "{avatar}{join}{text}{time}",
                auto_join_text_default: "",
                auto_join_text_ed: "",
                auto_join_text_ing: "",
                auto_join_text_reply: "",
                auto_join_text_url: "",
                loading_text: '<span class="loading_tweets">loading tweets...</span>'
            });
        });
    };
}

/* Google plus
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_googleplus'])) {
    window.vc_googleplus = function() {
        if (0 < jQuery('.wpb_googleplus').length) {
            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'plusone-1.js' /*tpa=https://apis.google.com/js/plusone.js*/ ;
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();
        }
    }
}

/* Pinterest
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_pinterest'])) {
    window.vc_pinterest = function() {
        if (0 < jQuery('.wpb_pinterest').length) {
            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'pinit.js' /*tpa=http://assets.pinterest.com/js/pinit.js*/ ;
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();
        }
    }
}

/* Progress bar
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_progress_bar'])) {
    window.vc_progress_bar = function() {
        if ('undefined' !== typeof(jQuery.fn.waypoint)) {

            jQuery('.vc_progress_bar').waypoint(function() {
                jQuery(this).find('.vc_single_bar').each(function(index) {
                    var $this = jQuery(this),
                        bar = $this.find('.vc_bar'),
                        val = bar.data('percentage-value');

                    setTimeout(function() {
                        bar.css({
                            "width": val + '%'
                        });
                    }, index * 200);
                });
            }, {
                offset: '85%'
            });
        }
    }
}

/* Waypoints magic
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_waypoints'])) {
    window.vc_waypoints = function() {
        if ('undefined' !== typeof(jQuery.fn.waypoint)) {
            jQuery('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').waypoint(function() {
                jQuery(this).addClass('wpb_start_animation');
            }, {
                offset: '85%'
            });
        }
    }
}

/* Toggle/FAQ
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_toggleBehaviour'])) {
    window.vc_toggleBehaviour = function($el) {
        function event(e) {
            e && e.preventDefault && e.preventDefault();
            var title = jQuery(this);
            var element = title.closest('.vc_toggle');
            var content = element.find('.vc_toggle_content');
            if (element.hasClass('vc_toggle_active')) {
                content.slideUp({
                    duration: 300,
                    complete: function() {
                        element.removeClass('vc_toggle_active');
                    }
                });
            } else {
                content.slideDown({
                    duration: 300,
                    complete: function() {
                        element.addClass('vc_toggle_active');
                    }
                });
            }
        }

        if ($el) {
            if ($el.hasClass('vc_toggle_title')) {
                $el.unbind('click').click(event);
            } else {
                $el.find(".vc_toggle_title").unbind('click').click(event);
            }
        } else {
            jQuery(".vc_toggle_title").unbind('click').on('click', event);
        }
    }
}

/* Tabs + Tours
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_tabsBehaviour'])) {
    window.vc_tabsBehaviour = function($tab) {
        if (jQuery.ui) {
            var $call = $tab || jQuery('.wpb_tabs, .wpb_tour'),
                ver = jQuery.ui && jQuery.ui.version ? jQuery.ui.version.split('.') : 'http://demo.roadthemes.com/maroko/wp-content/cache/minify/000000/1.10',
                old_version = 1 === parseInt(ver[0]) && 9 > parseInt(ver[1]);
            $call.each(function(index) {
                var $tabs,
                    interval = jQuery(this).attr("data-interval"),
                    tabs_array = [];
                //
                $tabs = jQuery(this).find('.wpb_tour_tabs_wrapper').tabs({
                    show: function(event, ui) {
                        wpb_prepare_tab_content(event, ui);
                    },
                    beforeActivate: function(event, ui) {
                        1 !== ui.newPanel.index() && ui.newPanel.find('.vc_pie_chart:not(.vc_ready)');
                    },
                    activate: function(event, ui) {
                        wpb_prepare_tab_content(event, ui);
                    }
                });
                if (interval && 0 < interval) {
                    try {
                        $tabs.tabs('rotate', interval * 1000);
                    } catch (e) {
                        // nothing.
                        window.console && window.console.log && console.log(e);
                    }
                }

                jQuery(this).find('.wpb_tab').each(function() {
                    tabs_array.push(this.id);
                });

                jQuery(this).find('.wpb_tabs_nav li').click(function(e) {
                    e.preventDefault();
                    if (old_version) {
                        $tabs.tabs("select", jQuery('a', this).attr('href'));
                    } else {
                        $tabs.tabs("option", "active", jQuery(this).index());
                    }
                    return false;
                });

                jQuery(this).find('.wpb_prev_slide a, .wpb_next_slide a').click(function(e) {
                    e.preventDefault();
                    if (old_version) {
                        var index = $tabs.tabs('option', 'selected');
                        if (jQuery(this).parent().hasClass('wpb_next_slide')) {
                            index++;
                        } else {
                            index--;
                        }
                        if (0 > index) {
                            index = $tabs.tabs("length") - 1;
                        } else if (index >= $tabs.tabs("length")) {
                            index = 0;
                        }
                        $tabs.tabs("select", index);
                    } else {
                        var index = $tabs.tabs("option", "active"),
                            length = $tabs.find('.wpb_tab').length;

                        if (jQuery(this).parent().hasClass('wpb_next_slide')) {
                            index = (index + 1) >= length ? 0 : index + 1;
                        } else {
                            index = 0 > index - 1 ? length - 1 : index - 1;
                        }

                        $tabs.tabs("option", "active", index);
                    }

                });

            });
        }
    }
}

/* Tabs + Tours
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_accordionBehaviour'])) {
    window.vc_accordionBehaviour = function() {
        jQuery('.wpb_accordion').each(function(index) {
            var $this = jQuery(this);
            var $tabs,
                interval = $this.attr("data-interval"),
                active_tab = !isNaN(jQuery(this).data('active-tab')) && 0 < parseInt($this.data('active-tab')) ? parseInt($this.data('active-tab')) - 1 : false,
                collapsible = false === active_tab || 'yes' === $this.data('collapsible');
            $tabs = $this.find('.wpb_accordion_wrapper').accordion({
                header: "> div > h3",
                autoHeight: false,
                heightStyle: "content",
                active: active_tab,
                collapsible: collapsible,
                navigation: true,

                activate: vc_accordionActivate,
                change: function(event, ui) {
                    if ('undefined' !== typeof(jQuery.fn.isotope)) {
                        ui.newContent.find('.isotope').isotope("layout");
                    }
                    vc_carouselBehaviour(ui.newPanel);
                }
            });
            if (true === $this.data('vcDisableKeydown')) {
                $tabs.data('uiAccordion')._keydown = function() {};
            }
        });
    }
}

/* Teaser grid: isotope
 ---------------------------------------------------------- */
if ('function' !== typeof(window['vc_teaserGrid'])) {
    window.vc_teaserGrid = function() {
        var layout_modes = {
            fitrows: 'fitRows',
            masonry: 'masonry'
        };
        jQuery('.wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)').each(function() {
            var $container = jQuery(this);
            var $thumbs = $container.find('.wpb_thumbnails');
            var layout_mode = $thumbs.attr('data-layout-mode');
            $thumbs.isotope({
                // options
                itemSelector: '.isotope-item',
                layoutMode: ('undefined' === typeof(layout_modes[layout_mode]) ? 'fitRows' : layout_modes[layout_mode])
            });
            $container.find('.categories_filter a').data('isotope', $thumbs).click(function(e) {
                e.preventDefault();
                var $thumbs = jQuery(this).data('isotope');
                jQuery(this).parent().parent().find('.active').removeClass('active');
                jQuery(this).parent().addClass('active');
                $thumbs.isotope({
                    filter: jQuery(this).attr('data-filter')
                });
            });
            jQuery(window).bind('load resize', function() {
                $thumbs.isotope("layout");
            });
        });
    }
}

if ('function' !== typeof(window['vc_carouselBehaviour'])) {
    window.vc_carouselBehaviour = function($parent) {
        var $carousel = $parent ? $parent.find(".wpb_carousel") : jQuery(".wpb_carousel");
        $carousel.each(function() {
            var $this = jQuery(this);
            if (true !== $this.data('carousel_enabled') && $this.is(':visible')) {
                $this.data('carousel_enabled', true);
                var visible_count = getColumnsCount(jQuery(this)),
                    carousel_speed = 500;
                if (jQuery(this).hasClass('columns_count_1')) {
                    carousel_speed = 900;
                }
                /* Get margin-left value from the css grid and apply it to the carousele li items (margin-right), before carousele initialization */
                var carousele_li = jQuery(this).find('.wpb_thumbnails-fluid li');
                carousele_li.css({
                    "margin-right": carousele_li.css("margin-left"),
                    "margin-left": 0
                });

                jQuery(this).find('.wpb_wrapper:eq(0)').jCarouselLite({
                        btnNext: jQuery(this).find('.next'),
                        btnPrev: jQuery(this).find('.prev'),
                        visible: visible_count,
                        speed: carousel_speed
                    })
                    .width('100%');

                var fluid_ul = jQuery(this).find('ul.wpb_thumbnails-fluid');
                fluid_ul.width(fluid_ul.width() + 300);

                jQuery(window).resize(function() {
                    var before_resize = screen_size;
                    screen_size = getSizeName();
                    if (before_resize != screen_size) {
                        window.setTimeout('location.reload()', 20);
                    }
                });
            }

        });
    }
}

if ('function' !== typeof(window['vc_slidersBehaviour'])) {
    window.vc_slidersBehaviour = function() {
        jQuery('.wpb_gallery_slides').each(function(index) {
            var this_element = jQuery(this);
            var $imagesGrid;

            if (this_element.hasClass('wpb_slider_nivo')) {
                var sliderSpeed = 800,
                    sliderTimeout = this_element.attr('data-interval') * 1000;

                if (0 === sliderTimeout) {
                    sliderTimeout = 9999999999;
                }

                this_element.find('.nivoSlider').nivoSlider({
                    effect: 'boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse', // Specify sets like: 'fold,fade,sliceDown'
                    slices: 15, // For slice animations
                    boxCols: 8, // For box animations
                    boxRows: 4, // For box animations
                    animSpeed: sliderSpeed, // Slide transition speed
                    pauseTime: sliderTimeout, // How long each slide will show
                    startSlide: 0, // Set starting Slide (0 index)
                    directionNav: true, // Next & Prev navigation
                    directionNavHide: true, // Only show on hover
                    controlNav: true, // 1,2,3... navigation
                    keyboardNav: false, // Use left & right arrows
                    pauseOnHover: true, // Stop animation while hovering
                    manualAdvance: false, // Force manual transitions
                    prevText: 'Prev', // Prev directionNav text
                    nextText: 'Next' // Next directionNav text
                });
            } else if (this_element.hasClass('wpb_image_grid')) {
                if (jQuery.fn.imagesLoaded) {
                    $imagesGrid = this_element.find('.wpb_image_grid_ul').imagesLoaded(function() {
                        $imagesGrid.isotope({
                            // options
                            itemSelector: '.isotope-item',
                            layoutMode: 'fitRows'
                        });
                    });
                } else {
                    this_element.find('.wpb_image_grid_ul').isotope({
                        // options
                        itemSelector: '.isotope-item',
                        layoutMode: 'fitRows'
                    });
                }
            }
        });
    }
}

if ('function' !== typeof(window['vc_prettyPhoto'])) {
    window.vc_prettyPhoto = function() {
        try {
            // just in case. maybe prettyphoto isn't loaded on this site
            if (jQuery && jQuery.fn && jQuery.fn.prettyPhoto) {
                jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({
                    animationSpeed: 'normal',
                    /* fast/slow/normal */
                    padding: 15,
                    /* padding for each side of the picture */
                    opacity: 0.7,
                    /* Value betwee 0 and 1 */
                    showTitle: true,
                    /* true/false */
                    allowresize: true,
                    /* true/false */
                    counter_separator_label: '/',
                    /* The separator for the gallery counter 1 "of" 2 */
                    //theme: 'light_square', /* light_rounded / dark_rounded / light_square / dark_square */
                    hideflash: false,
                    /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
                    deeplinking: false,
                    /* Allow prettyPhoto to update the url to enable deeplinking. */
                    modal: false,
                    /* If set to true, only the close button will close the window */
                    callback: function() {
                        var url = location.href;
                        var hashtag = (url.indexOf('#!prettyPhoto')) ? true : false;
                        if (hashtag) {
                            location.hash = "!";
                        }
                    } /* Called when prettyPhoto is closed */ ,
                    social_tools: ''
                });
            }
        } catch (err) {
            window.console && window.console.log && console.log(err);
        }
    }
}

if ('function' !== typeof(window['vc_google_fonts'])) {
    window.vc_google_fonts = function() {
        return false; // TODO: check this for what this is needed
    }
}
window.vcParallaxSkroll = false;
if ('function' !== typeof(window['vc_rowBehaviour'])) {
    window.vc_rowBehaviour = function() {
        var $ = window.jQuery;

        function localFunction() {
            var $elements = $('[data-vc-full-width="true"]');
            $.each($elements, function(key, item) {
                var $el = $(this);
                $el.addClass('vc_hidden');

                var $el_full = $el.next('.vc_row-full-width');
                var el_margin_left = parseInt($el.css('margin-left'), 10);
                var el_margin_right = parseInt($el.css('margin-right'), 10);
                var offset = 0 - $el_full.offset().left - el_margin_left;
                var width = $(window).width();
                $el.css({
                    'position': 'relative',
                    'left': offset,
                    'box-sizing': 'border-box',
                    'width': $(window).width()
                });
                if (!$el.data('vcStretchContent')) {
                    var padding = (-1 * offset);
                    if (0 > padding) {
                        padding = 0;
                    }
                    var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
                    if (0 > paddingRight) {
                        paddingRight = 0;
                    }
                    $el.css({
                        'padding-left': padding + 'px',
                        'padding-right': paddingRight + 'px'
                    });
                }
                $el.attr("data-vc-full-width-init", "true");
                $el.removeClass('vc_hidden');
            });
        }

        /**
         * @todo refactor as plugin.
         * @returns {*}
         */
        function parallaxRow() {
            var vcSkrollrOptions, vcParallaxSkroll,
                callSkrollInit = false;
            if (vcParallaxSkroll) {
                vcParallaxSkroll.destroy();
            }
            $('.vc_parallax-inner').remove();
            $('[data-5p-top-bottom]').removeAttr('data-5p-top-bottom data-30p-top-bottom');
            $('[data-vc-parallax]').each(function() {
                var skrollrSpeed,
                    skrollrSize,
                    skrollrStart,
                    skrollrEnd,
                    $parallaxElement,
                    parallaxImage,
                    youtubeId;
                callSkrollInit = true; // Enable skrollinit;
                if ('on' === $(this).data('vcParallaxOFade')) {
                    $(this).children().attr('data-5p-top-bottom', 'opacity:0;').attr('data-30p-top-bottom',
                        'opacity:1;');
                }

                skrollrSize = $(this).data('vcParallax') * 100;
                $parallaxElement = $('<div />').addClass('vc_parallax-inner').appendTo($(this));
                $parallaxElement.height(skrollrSize + '%');

                parallaxImage = $(this).data('vcParallaxImage');

                youtubeId = vcExtractYoutubeId(parallaxImage);

                if (youtubeId) {
                    insertYoutubeVideoAsBackground($parallaxElement, youtubeId);
                } else if ('undefined' !== typeof(parallaxImage)) {
                    $parallaxElement.css('background-image', 'url(' + parallaxImage + ')');
                }

                skrollrSpeed = skrollrSize - 100;
                skrollrStart = -skrollrSpeed;
                skrollrEnd = 0;

                $parallaxElement.attr('data-bottom-top', 'top: ' + skrollrStart + '%;').attr('data-top-bottom',
                    'top: ' + skrollrEnd + '%;');
            });

            if (callSkrollInit && window.skrollr) {
                vcSkrollrOptions = {
                    forceHeight: false,
                    smoothScrolling: false,
                    mobileCheck: function() {
                        return false;
                    }
                };
                vcParallaxSkroll = skrollr.init(vcSkrollrOptions);
                return vcParallaxSkroll;
            }
            return false;
        }

        /**
         * @todo refactor as plugin.
         * @returns {*}
         */
        function fullHeightRow() {
            $('.vc_row-o-full-height:first').each(function() {
                var $window,
                    windowHeight,
                    offsetTop,
                    fullHeight;
                $window = $(window);
                windowHeight = $window.height();
                offsetTop = $(this).offset().top;
                if (offsetTop < windowHeight) {
                    fullHeight = 100 - offsetTop / (windowHeight / 100);
                    $(this).css('min-height', fullHeight + 'vh');
                }
            });

            $('.vc_row-o-full-height.vc_row-o-content-middle').each(function() {
                var elHeight = $(this).height();
                $('<div><!-- IE flexbox min height vertical align fixer --></div>')
                    .addClass('vc_row-full-height-fixer')
                    .height(elHeight)
                    .prependTo($(this));
            });
        }

        $(window).unbind('resize.vcRowBehaviour').bind('resize.vcRowBehaviour', localFunction);
        $(window).bind('resize.vcRowBehaviour', fullHeightRow);
        localFunction();
        fullHeightRow();
        initVideoBackgrounds(); // must be called before parallax
        parallaxRow();
    }
}

if ('function' !== typeof(window['vc_gridBehaviour'])) {
    window.vc_gridBehaviour = function() {
        jQuery.fn.vcGrid && jQuery('[data-vc-grid]').vcGrid();
    }
}
/* Helper
 ---------------------------------------------------------- */
if ('function' !== typeof(window['getColumnsCount'])) {
    window.getColumnsCount = function(el) {
        var find = false,
            i = 1;

        while (false === find) {
            if (el.hasClass('columns_count_' + i)) {
                find = true;
                return i;
            }
            i++;
        }
    }
}

var screen_size = getSizeName();

function getSizeName() {
    var screen_w = jQuery(window).width();

    if (1170 < screen_w) {
        return 'desktop_wide';
    }

    if (960 < screen_w && 1169 > screen_w) {
        return 'desktop';
    }

    if (768 < screen_w && 959 > screen_w) {
        return 'tablet';
    }

    if (300 < screen_w && 767 > screen_w) {
        return 'mobile';
    }

    if (300 > screen_w) {
        return 'mobile_portrait';
    }

    return '';
}

function loadScript(url, $obj, callback) {

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if ("loaded" === script.readyState ||
                "complete" === script.readyState) {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        //Others
    }

    script.src = url;
    $obj.get(0).appendChild(script);
}

if ('function' !== typeof(window['wpb_prepare_tab_content'])) {
    /**
     * Prepare html to correctly display inside tab container
     *
     * @param event - ui tab event 'show'
     * @param ui - jquery ui tabs object
     */
    window.wpb_prepare_tab_content = function(event, ui) {
        var panel = ui.panel || ui.newPanel,
            $pie_charts = panel.find('.vc_pie_chart:not(.vc_ready)'),
            $round_charts = panel.find('.vc_round-chart'),
            $line_charts = panel.find('.vc_line-chart'),
            $carousel = panel.find('[data-ride="vc_carousel"]'),
            $ui_panel, $google_maps;
        vc_carouselBehaviour();
        vc_plugin_flexslider(panel);
        if (ui.newPanel.find('.vc_masonry_media_grid, .vc_masonry_grid').length) {
            ui.newPanel.find('.vc_masonry_media_grid, .vc_masonry_grid').each(function() {
                var grid = jQuery(this).data('vcGrid');
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
            });
        }
        if (panel.find('.vc_masonry_media_grid, .vc_masonry_grid').length) {
            panel.find('.vc_masonry_media_grid, .vc_masonry_grid').each(function() {
                var grid = jQuery(this).data('vcGrid');
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
            });
        }
        $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat();
        $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({
            reload: false
        });
        $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({
            reload: false
        });
        $carousel.length && jQuery.fn.carousel && $carousel.carousel('resizeAction');
        $ui_panel = panel.find('.isotope, .wpb_image_grid_ul'); // why var name '$ui_panel'?
        $google_maps = panel.find('.wpb_gmaps_widget');
        if (0 < $ui_panel.length) {
            $ui_panel.isotope("layout");
        }
        if ($google_maps.length && !$google_maps.is('.map_ready')) {
            var $frame = $google_maps.find('iframe');
            $frame.attr('src', $frame.attr('src'));
            $google_maps.addClass('map_ready');
        }
        if (panel.parents('.isotope').length) {
            panel.parents('.isotope').each(function() {
                jQuery(this).isotope("layout");
            });
        }
    }
}

function vc_ttaActivation() {
    jQuery('[data-vc-accordion]').on('show.vc.accordion', function(e) {
        var $ = window.jQuery,
            ui = {};
        ui.newPanel = $(this).data('vc.accordion').getTarget();
        window.wpb_prepare_tab_content(e, ui);
    });
}

function vc_accordionActivate(event, ui) {
    if (ui.newPanel.length && ui.newHeader.length) {
        var $pie_charts = ui.newPanel.find('.vc_pie_chart:not(.vc_ready)'),
            $round_charts = ui.newPanel.find('.vc_round-chart'),
            $line_charts = ui.newPanel.find('.vc_line-chart'),
            $carousel = ui.newPanel.find('[data-ride="vc_carousel"]');
        if ('undefined' !== typeof(jQuery.fn.isotope)) {
            ui.newPanel.find('.isotope, .wpb_image_grid_ul').isotope("layout");
        }
        if (ui.newPanel.find('.vc_masonry_media_grid, .vc_masonry_grid').length) {
            ui.newPanel.find('.vc_masonry_media_grid, .vc_masonry_grid').each(function() {
                var grid = jQuery(this).data('vcGrid');
                grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
            });
        }
        vc_carouselBehaviour(ui.newPanel);
        vc_plugin_flexslider(ui.newPanel);
        $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat();
        $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({
            reload: false
        });
        $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({
            reload: false
        });
        $carousel.length && jQuery.fn.carousel && $carousel.carousel('resizeAction');
        if (ui.newPanel.parents('.isotope').length) {
            ui.newPanel.parents('.isotope').each(function() {
                jQuery(this).isotope("layout");
            });
        }
    }
}

/**
 * Reinitialize all video backgrounds
 */
function initVideoBackgrounds() {
    jQuery('.vc_row').each(function() {
        var $row = jQuery(this),
            youtubeUrl,
            youtubeId;

        if ($row.data('vcVideoBg')) {
            youtubeUrl = $row.data('vcVideoBg');
            youtubeId = vcExtractYoutubeId(youtubeUrl);

            if (youtubeId) {
                $row.find('.vc_video-bg').remove();
                insertYoutubeVideoAsBackground($row, youtubeId);
            }

            jQuery(window).on('grid:items:added', function(event, $grid) {
                if (!$row.has($grid).length) {
                    return;
                }

                vcResizeVideoBackground($row);
            });
        } else {
            $row.find('.vc_video-bg').remove();
        }
    });
}

/**
 * Insert youtube video into element.
 *
 * Video will be w/o controls, muted, autoplaying and looping.
 */
function insertYoutubeVideoAsBackground($element, youtubeId, counter) {
    if ('undefined' === typeof(YT.Player)) {
        // wait for youtube iframe api to load. try for 10sec, then abort
        counter = 'undefined' === typeof(counter) ? 0 : counter;
        if (100 < counter) {
            console.warn('Too many attempts to load YouTube api');
            return;
        }

        setTimeout(function() {
            insertYoutubeVideoAsBackground($element, youtubeId, counter++);
        }, 100);

        return;
    }

    var $container = $element.prepend('<div class="vc_video-bg"><div class="inner"></div></div>').find('.inner');

    new YT.Player($container[0], {
        width: '100%',
        height: '100%',
        videoId: youtubeId,
        playerVars: {
            playlist: youtubeId,
            iv_load_policy: 3, // hide annotations
            enablejsapi: 1,
            disablekb: 1,
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1
        },
        events: {
            onReady: function(event) {
                event.target.mute().setLoop(true);
            }
        }
    });

    vcResizeVideoBackground($element);

    jQuery(window).bind('resize', function() {
        vcResizeVideoBackground($element);
    });
}

/**
 * Resize background video iframe so that video content covers whole area
 */
function vcResizeVideoBackground($element) {
    var iframeW,
        iframeH,
        marginLeft,
        marginTop,
        containerW = $element.innerWidth(),
        containerH = $element.innerHeight(),
        ratio1 = 16,
        ratio2 = 9;

    if ((containerW / containerH) < (ratio1 / ratio2)) {
        iframeW = containerH * (ratio1 / ratio2);
        iframeH = containerH;

        marginLeft = -Math.round((iframeW - containerW) / 2) + 'px';
        marginTop = -Math.round((iframeH - containerH) / 2) + 'px';

        iframeW += 'px';
        iframeH += 'px';
    } else {
        iframeW = containerW;
        iframeH = containerW * (ratio2 / ratio1);

        marginTop = -Math.round((iframeH - containerH) / 2) + 'px';
        marginLeft = -Math.round((iframeW - containerW) / 2) + 'px';

        iframeW += 'px';
        iframeH += 'px';
    }

    $element.find('.vc_video-bg iframe').css({
        maxWidth: '1000%',
        marginLeft: marginLeft,
        marginTop: marginTop,
        width: iframeW,
        height: iframeH
    });
}

/**
 * Extract video ID from youtube url
 */
function vcExtractYoutubeId(url) {
    if ('undefined' === typeof(url)) {
        return false;
    }

    var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

    if (null !== id) {
        return id[1];
    }

    return false;
}; // Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.2
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);;
(function($) {
    $.fn.validationEngineLanguage = function() {};
    $.validationEngineLanguage = {
        newLang: function() {
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* This field is required",
                    "alertTextCheckboxMultiple": "* Please select an option",
                    "alertTextCheckboxe": "* This checkbox is required",
                    "alertTextDateRange": "* Both date range fields are required"
                },
                "requiredInFunction": {
                    "func": function(field, rules, i, options) {
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Range"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Time Range"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* Minimum ",
                    "alertText2": " characters required"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " characters allowed"
                },
                "groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields",
                    "alertTextCheckboxMultiple": "* Please select an option",
                    "alertTextCheckboxe": "* This checkbox is required"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* Minimum value is "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* Maximum value is "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* Date prior to "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* Date past "
                },
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " options allowed"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* Please select ",
                    "alertText2": " options"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* Fields do not match"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* Invalid credit card number"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,
                    "alertText": "* Invalid phone number"
                },
                "email": {
                    // HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#    e-mail-state-%28type=email%29 )
                    "regex": /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "alertText": "* Invalid email address"
                },
                "fullname": {
                    "regex": /^([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]*)+[ ]([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]+)+$/,
                    "alertText": "* Must be first and last name"
                },
                "zip": {
                    "regex": /^\d{5}$|^\d{5}-\d{4}$/,
                    "alertText": "* Invalid zip format"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* Not a valid integer"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* Invalid floating decimal number"
                },
                "date": {
                    //	Check if date is valid by leap year
                    "func": function(field) {
                        var pattern = new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);
                        var match = pattern.exec(field.val());
                        if (match == null)
                            return false;

                        var year = match[1];
                        var month = match[2] * 1;
                        var day = match[3] * 1;
                        var date = new Date(year, month - 1, day); // because months starts from 0.

                        return (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day);
                    },
                    "alertText": "* Invalid date, must be in YYYY-MM-DD format"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Invalid IP address"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* Numbers only"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* Letters only"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* No special characters allowed"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxUserCallPhp": {
                    "url": "http://demo.roadthemes.com/maroko/wp-content/cache/minify/000000/phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This username is available",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* This name is already taken",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This name is available",
                    // speaks by itself
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCallPhp": {
                    // remote json service location
                    "url": "http://demo.roadthemes.com/maroko/wp-content/cache/minify/000000/phpajax/ajaxValidateFieldName.php",
                    // error
                    "alertText": "* This name is already taken",
                    // speaks by itself
                    "alertTextLoad": "* Validating, please wait"
                },
                "validate2fields": {
                    "alertText": "* Please input HELLO"
                },
                //tls warning:homegrown not fielded
                "dateFormat": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* Invalid Date"
                },
                //tls warning:homegrown not fielded
                "dateTimeFormat": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* Invalid Date or Date Format",
                    "alertText2": "Expected Format: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ",
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
                }
            };

        }
    };

    $.validationEngineLanguage.newLang();

})(jQuery);

;
/*
 * Inline Form Validation Engine 2.6.2, jQuery plugin
 *
 * Copyright(c) 2010, Cedric Dugas
 * http://www.position-absolute.com
 *
 * 2.0 Rewrite by Olivier Refalo
 * http://www.crionics.com
 *
 * Form validation engine allowing custom regex rules to be added.
 * Licensed under the MIT License
 */
(function($) {

    "use strict";

    var methods = {

        /**
         * Kind of the constructor, called before any action
         * @param {Map} user options
         */
        init: function(options) {
            var form = this;
            if (!form.data('jqv') || form.data('jqv') == null) {
                options = methods._saveOptions(form, options);
                // bind all formError elements to close on click
                $(document).on("click", ".formError", function() {
                    $(this).fadeOut(150, function() {
                        // remove prompt once invisible
                        $(this).parent('.formErrorOuter').remove();
                        $(this).remove();
                    });
                });
            }
            return this;
        },
        /**
         * Attachs jQuery.validationEngine to form.submit and field.blur events
         * Takes an optional params: a list of options
         * ie. jQuery("#formID1").validationEngine('attach', {promptPosition : "centerRight"});
         */
        attach: function(userOptions) {

            var form = this;
            var options;

            if (userOptions)
                options = methods._saveOptions(form, userOptions);
            else
                options = form.data('jqv');

            options.validateAttribute = (form.find("[data-validation-engine*=validate]").length) ? "data-validation-engine" : "class";
            if (options.binded) {

                // delegate fields
                form.on(options.validationEventTrigger, "[" + options.validateAttribute + "*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", methods._onFieldEvent);
                form.on("click", "[" + options.validateAttribute + "*=validate][type=checkbox],[" + options.validateAttribute + "*=validate][type=radio]", methods._onFieldEvent);
                form.on(options.validationEventTrigger, "[" + options.validateAttribute + "*=validate][class*=datepicker]", {
                    "delay": 300
                }, methods._onFieldEvent);
            }
            if (options.autoPositionUpdate) {
                $(window).bind("resize", {
                    "noAnimation": true,
                    "formElem": form
                }, methods.updatePromptsPosition);
            }
            form.on("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", methods._submitButtonClick);
            form.removeData('jqv_submitButton');

            // bind form.submit
            form.on("submit", methods._onSubmitEvent);
            return this;
        },
        /**
         * Unregisters any bindings that may point to jQuery.validaitonEngine
         */
        detach: function() {

            var form = this;
            var options = form.data('jqv');

            // unbind fields
            form.find("[" + options.validateAttribute + "*=validate]").not("[type=checkbox]").off(options.validationEventTrigger, methods._onFieldEvent);
            form.find("[" + options.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").off("click", methods._onFieldEvent);

            // unbind form.submit
            form.off("submit", methods.onAjaxFormComplete);

            // unbind form.submit
            form.off("submit", methods.onAjaxFormComplete);
            form.removeData('jqv');

            form.off("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", methods._submitButtonClick);
            form.removeData('jqv_submitButton');

            if (options.autoPositionUpdate)
                $(window).unbind("resize", methods.updatePromptsPosition);

            return this;
        },
        /**
         * Validates either a form or a list of fields, shows prompts accordingly.
         * Note: There is no ajax form validation with this method, only field ajax validation are evaluated
         *
         * @return true if the form validates, false if it fails
         */
        validate: function() {
            var element = $(this);
            var valid = null;

            if (element.is("form") || element.hasClass("validationEngineContainer")) {
                if (element.hasClass('validating')) {
                    // form is already validating.
                    // Should abort old validation and start new one. I don't know how to implement it.
                    return false;
                } else {
                    element.addClass('validating');
                    var options = element.data('jqv');
                    var valid = methods._validateFields(this);

                    // If the form doesn't validate, clear the 'validating' class before the user has a chance to submit again
                    setTimeout(function() {
                        element.removeClass('validating');
                    }, 100);
                    if (valid && options.onSuccess) {
                        options.onSuccess();
                    } else if (!valid && options.onFailure) {
                        options.onFailure();
                    }
                }
            } else if (element.is('form') || element.hasClass('validationEngineContainer')) {
                element.removeClass('validating');
            } else {
                // field validation
                var form = element.closest('form, .validationEngineContainer'),
                    options = (form.data('jqv')) ? form.data('jqv') : $.validationEngine.defaults,
                    valid = methods._validateField(element, options);

                if (valid && options.onFieldSuccess)
                    options.onFieldSuccess();
                else if (options.onFieldFailure && options.InvalidFields.length > 0) {
                    options.onFieldFailure();
                }
            }
            if (options.onValidationComplete) {
                // !! ensures that an undefined return is interpreted as return false but allows a onValidationComplete() to possibly return true and have form continue processing
                return !!options.onValidationComplete(form, valid);
            }
            return valid;
        },
        /**
         *  Redraw prompts position, useful when you change the DOM state when validating
         */
        updatePromptsPosition: function(event) {

            if (event && this == window) {
                var form = event.data.formElem;
                var noAnimation = event.data.noAnimation;
            } else
                var form = $(this.closest('form, .validationEngineContainer'));

            var options = form.data('jqv');
            // No option, take default one
            form.find('[' + options.validateAttribute + '*=validate]').not(":disabled").each(function() {
                var field = $(this);
                if (options.prettySelect && field.is(":hidden"))
                    field = form.find("#" + options.usePrefix + field.attr('id') + options.useSuffix);
                var prompt = methods._getPrompt(field);
                var promptText = $(prompt).find(".formErrorContent").html();

                if (prompt)
                    methods._updatePrompt(field, $(prompt), promptText, undefined, false, options, noAnimation);
            });
            return this;
        },
        /**
         * Displays a prompt on a element.
         * Note that the element needs an id!
         *
         * @param {String} promptText html text to display type
         * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
         * @param {String} possible values topLeft, topRight, bottomLeft, centerRight, bottomRight
         */
        showPrompt: function(promptText, type, promptPosition, showArrow) {
            var form = this.closest('form, .validationEngineContainer');
            var options = form.data('jqv');
            // No option, take default one
            if (!options)
                options = methods._saveOptions(this, options);
            if (promptPosition)
                options.promptPosition = promptPosition;
            options.showArrow = showArrow == true;

            methods._showPrompt(this, promptText, type, false, options);
            return this;
        },
        /**
         * Closes form error prompts, CAN be invidual
         */
        hide: function() {
            var form = $(this).closest('form, .validationEngineContainer');
            var options = form.data('jqv');
            var fadeDuration = (options && options.fadeDuration) ? options.fadeDuration : 0.3;
            var closingtag;

            if ($(this).is("form") || $(this).hasClass("validationEngineContainer")) {
                closingtag = "parentForm" + methods._getClassName($(this).attr("id"));
            } else {
                closingtag = methods._getClassName($(this).attr("id")) + "formError";
            }
            $('.' + closingtag).fadeTo(fadeDuration, 0.3, function() {
                $(this).parent('.formErrorOuter').remove();
                $(this).remove();
            });
            return this;
        },
        /**
         * Closes all error prompts on the page
         */
        hideAll: function() {

            var form = this;
            var options = form.data('jqv');
            var duration = options ? options.fadeDuration : 300;
            $('.formError').fadeTo(duration, 300, function() {
                $(this).parent('.formErrorOuter').remove();
                $(this).remove();
            });
            return this;
        },
        /**
         * Typically called when user exists a field using tab or a mouse click, triggers a field
         * validation
         */
        _onFieldEvent: function(event) {
            var field = $(this);
            var form = field.closest('form, .validationEngineContainer');
            var options = form.data('jqv');
            options.eventTrigger = "field";
            // validate the current field
            window.setTimeout(function() {
                methods._validateField(field, options);
                if (options.InvalidFields.length == 0 && options.onFieldSuccess) {
                    options.onFieldSuccess();
                } else if (options.InvalidFields.length > 0 && options.onFieldFailure) {
                    options.onFieldFailure();
                }
            }, (event.data) ? event.data.delay : 0);

        },
        /**
         * Called when the form is submited, shows prompts accordingly
         *
         * @param {jqObject}
         *            form
         * @return false if form submission needs to be cancelled
         */
        _onSubmitEvent: function() {
            var form = $(this);
            var options = form.data('jqv');

            //check if it is trigger from skipped button
            if (form.data("jqv_submitButton")) {
                var submitButton = $("#" + form.data("jqv_submitButton"));
                if (submitButton) {
                    if (submitButton.length > 0) {
                        if (submitButton.hasClass("validate-skip") || submitButton.attr("data-validation-engine-skip") == "true")
                            return true;
                    }
                }
            }

            options.eventTrigger = "submit";

            // validate each field
            // (- skip field ajax validation, not necessary IF we will perform an ajax form validation)
            var r = methods._validateFields(form);

            if (r && options.ajaxFormValidation) {
                methods._validateFormWithAjax(form, options);
                // cancel form auto-submission - process with async call onAjaxFormComplete
                return false;
            }

            if (options.onValidationComplete) {
                // !! ensures that an undefined return is interpreted as return false but allows a onValidationComplete() to possibly return true and have form continue processing
                return !!options.onValidationComplete(form, r);
            }
            return r;
        },
        /**
         * Return true if the ajax field validations passed so far
         * @param {Object} options
         * @return true, is all ajax validation passed so far (remember ajax is async)
         */
        _checkAjaxStatus: function(options) {
            var status = true;
            $.each(options.ajaxValidCache, function(key, value) {
                if (!value) {
                    status = false;
                    // break the each
                    return false;
                }
            });
            return status;
        },

        /**
         * Return true if the ajax field is validated
         * @param {String} fieldid
         * @param {Object} options
         * @return true, if validation passed, false if false or doesn't exist
         */
        _checkAjaxFieldStatus: function(fieldid, options) {
            return options.ajaxValidCache[fieldid] == true;
        },
        /**
         * Validates form fields, shows prompts accordingly
         *
         * @param {jqObject}
         *            form
         * @param {skipAjaxFieldValidation}
         *            boolean - when set to true, ajax field validation is skipped, typically used when the submit button is clicked
         *
         * @return true if form is valid, false if not, undefined if ajax form validation is done
         */
        _validateFields: function(form) {
            var options = form.data('jqv');

            // this variable is set to true if an error is found
            var errorFound = false;

            // Trigger hook, start validation
            form.trigger("jqv.form.validating");
            // first, evaluate status of non ajax fields
            var first_err = null;
            form.find('[' + options.validateAttribute + '*=validate]').not(":disabled").each(function() {
                var field = $(this);
                var names = [];
                if ($.inArray(field.attr('name'), names) < 0) {
                    errorFound |= methods._validateField(field, options);
                    if (errorFound && first_err == null)
                        if (field.is(":hidden") && options.prettySelect)
                            first_err = field = form.find("#" + options.usePrefix + methods._jqSelector(field.attr('id')) + options.useSuffix);
                        else
                            first_err = field;
                    if (options.doNotShowAllErrosOnSubmit)
                        return false;
                    names.push(field.attr('name'));

                    //if option set, stop checking validation rules after one error is found
                    if (options.showOneMessage == true && errorFound) {
                        return false;
                    }
                }
            });

            // second, check to see if all ajax calls completed ok
            // errorFound |= !methods._checkAjaxStatus(options);

            // third, check status and scroll the container accordingly
            form.trigger("jqv.form.result", [errorFound]);

            if (errorFound) {
                if (options.scroll) {
                    var destination = first_err.offset().top;
                    var fixleft = first_err.offset().left;

                    //prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
                    var positionType = options.promptPosition;
                    if (typeof(positionType) == 'string' && positionType.indexOf(":") != -1)
                        positionType = positionType.substring(0, positionType.indexOf(":"));

                    if (positionType != "bottomRight" && positionType != "bottomLeft") {
                        var prompt_err = methods._getPrompt(first_err);
                        if (prompt_err) {
                            destination = prompt_err.offset().top;
                        }
                    }

                    // Offset the amount the page scrolls by an amount in px to accomodate fixed elements at top of page
                    if (options.scrollOffset) {
                        destination -= options.scrollOffset;
                    }

                    // get the position of the first error, there should be at least one, no need to check this
                    //var destination = form.find(".formError:not('.greenPopup'):first").offset().top;
                    if (options.isOverflown) {
                        var overflowDIV = $(options.overflownDIV);
                        if (!overflowDIV.length) return false;
                        var scrollContainerScroll = overflowDIV.scrollTop();
                        var scrollContainerPos = -parseInt(overflowDIV.offset().top);

                        destination += scrollContainerScroll + scrollContainerPos - 5;
                        var scrollContainer = $(options.overflownDIV + ":not(:animated)");

                        scrollContainer.animate({
                            scrollTop: destination
                        }, 1100, function() {
                            if (options.focusFirstField) first_err.focus();
                        });

                    } else {
                        $("html, body").animate({
                            scrollTop: destination
                        }, 1100, function() {
                            if (options.focusFirstField) first_err.focus();
                        });
                        $("html, body").animate({
                            scrollLeft: fixleft
                        }, 1100)
                    }

                } else if (options.focusFirstField)
                    first_err.focus();
                return false;
            }
            return true;
        },
        /**
         * This method is called to perform an ajax form validation.
         * During this process all the (field, value) pairs are sent to the server which returns a list of invalid fields or true
         *
         * @param {jqObject} form
         * @param {Map} options
         */
        _validateFormWithAjax: function(form, options) {

            var data = form.serialize();
            var type = (options.ajaxFormValidationMethod) ? options.ajaxFormValidationMethod : "GET";
            var url = (options.ajaxFormValidationURL) ? options.ajaxFormValidationURL : form.attr("action");
            var dataType = (options.dataType) ? options.dataType : "json";
            $.ajax({
                type: type,
                url: url,
                cache: false,
                dataType: dataType,
                data: data,
                form: form,
                methods: methods,
                options: options,
                beforeSend: function() {
                    return options.onBeforeAjaxFormValidation(form, options);
                },
                error: function(data, transport) {
                    methods._ajaxError(data, transport);
                },
                success: function(json) {
                    if ((dataType == "json") && (json !== true)) {
                        // getting to this case doesn't necessary means that the form is invalid
                        // the server may return green or closing prompt actions
                        // this flag helps figuring it out
                        var errorInForm = false;
                        for (var i = 0; i < json.length; i++) {
                            var value = json[i];

                            var errorFieldId = value[0];
                            var errorField = $($("#" + errorFieldId)[0]);

                            // make sure we found the element
                            if (errorField.length == 1) {

                                // promptText or selector
                                var msg = value[2];
                                // if the field is valid
                                if (value[1] == true) {

                                    if (msg == "" || !msg) {
                                        // if for some reason, status==true and error="", just close the prompt
                                        methods._closePrompt(errorField);
                                    } else {
                                        // the field is valid, but we are displaying a green prompt
                                        if (options.allrules[msg]) {
                                            var txt = options.allrules[msg].alertTextOk;
                                            if (txt)
                                                msg = txt;
                                        }
                                        if (options.showPrompts) methods._showPrompt(errorField, msg, "pass", false, options, true);
                                    }
                                } else {
                                    // the field is invalid, show the red error prompt
                                    errorInForm |= true;
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertText;
                                        if (txt)
                                            msg = txt;
                                    }
                                    if (options.showPrompts) methods._showPrompt(errorField, msg, "", false, options, true);
                                }
                            }
                        }
                        options.onAjaxFormComplete(!errorInForm, form, json, options);
                    } else
                        options.onAjaxFormComplete(true, form, json, options);

                }
            });

        },
        /**
         * Validates field, shows prompts accordingly
         *
         * @param {jqObject}
         *            field
         * @param {Array[String]}
         *            field's validation rules
         * @param {Map}
         *            user options
         * @return false if field is valid (It is inversed for *fields*, it return false on validate and true on errors.)
         */
        _validateField: function(field, options, skipAjaxValidation) {
            if (!field.attr("id")) {
                field.attr("id", "form-validation-field-" + $.validationEngine.fieldIdCounter);
                ++$.validationEngine.fieldIdCounter;
            }

            if (!options.validateNonVisibleFields && (field.is(":hidden") && !options.prettySelect || field.parent().is(":hidden")))
                return false;

            var rulesParsing = field.attr(options.validateAttribute);
            var getRules = /validate\[(.*)\]/.exec(rulesParsing);

            if (!getRules)
                return false;
            var str = getRules[1];
            var rules = str.split(/\[|,|\]/);

            // true if we ran the ajax validation, tells the logic to stop messing with prompts
            var isAjaxValidator = false;
            var fieldName = field.attr("name");
            var promptText = "";
            var promptType = "";
            var required = false;
            var limitErrors = false;
            options.isError = false;
            options.showArrow = true;

            // If the programmer wants to limit the amount of error messages per field,
            if (options.maxErrorsPerField > 0) {
                limitErrors = true;
            }

            var form = $(field.closest("form, .validationEngineContainer"));
            // Fix for adding spaces in the rules
            for (var i = 0; i < rules.length; i++) {
                rules[i] = rules[i].replace(" ", "");
                // Remove any parsing errors
                if (rules[i] === '') {
                    delete rules[i];
                }
            }

            for (var i = 0, field_errors = 0; i < rules.length; i++) {

                // If we are limiting errors, and have hit the max, break
                if (limitErrors && field_errors >= options.maxErrorsPerField) {
                    // If we haven't hit a required yet, check to see if there is one in the validation rules for this
                    // field and that it's index is greater or equal to our current index
                    if (!required) {
                        var have_required = $.inArray('required', rules);
                        required = (have_required != -1 && have_required >= i);
                    }
                    break;
                }


                var errorMsg = undefined;
                switch (rules[i]) {

                    case "required":
                        required = true;
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._required);
                        break;
                    case "custom":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._custom);
                        break;
                    case "groupRequired":
                        // Check is its the first of group, if not, reload validation with first field
                        // AND continue normal validation on present field
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        var firstOfGroup = form.find(classGroup).eq(0);
                        if (firstOfGroup[0] != field[0]) {

                            methods._validateField(firstOfGroup, options, skipAjaxValidation);
                            options.showArrow = true;

                        }
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._groupRequired);
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;
                    case "ajax":
                        // AJAX defaults to returning it's loading message
                        errorMsg = methods._ajax(field, rules, i, options);
                        if (errorMsg) {
                            promptType = "load";
                        }
                        break;
                    case "minSize":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._minSize);
                        break;
                    case "maxSize":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._maxSize);
                        break;
                    case "min":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._min);
                        break;
                    case "max":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._max);
                        break;
                    case "past":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._past);
                        break;
                    case "future":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._future);
                        break;
                    case "dateRange":
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        options.firstOfGroup = form.find(classGroup).eq(0);
                        options.secondOfGroup = form.find(classGroup).eq(1);

                        //if one entry out of the pair has value then proceed to run through validation
                        if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
                            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._dateRange);
                        }
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;

                    case "dateTimeRange":
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        options.firstOfGroup = form.find(classGroup).eq(0);
                        options.secondOfGroup = form.find(classGroup).eq(1);

                        //if one entry out of the pair has value then proceed to run through validation
                        if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
                            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._dateTimeRange);
                        }
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;
                    case "maxCheckbox":
                        field = $(form.find("input[name='" + fieldName + "']"));
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._maxCheckbox);
                        break;
                    case "minCheckbox":
                        field = $(form.find("input[name='" + fieldName + "']"));
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._minCheckbox);
                        break;
                    case "equals":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._equals);
                        break;
                    case "funcCall":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._funcCall);
                        break;
                    case "creditCard":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._creditCard);
                        break;
                    case "condRequired":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._condRequired);
                        if (errorMsg !== undefined) {
                            required = true;
                        }
                        break;

                    default:
                }

                var end_validation = false;

                // If we were passed back an message object, check what the status was to determine what to do
                if (typeof errorMsg == "object") {
                    switch (errorMsg.status) {
                        case "_break":
                            end_validation = true;
                            break;
                            // If we have an error message, set errorMsg to the error message
                        case "_error":
                            errorMsg = errorMsg.message;
                            break;
                            // If we want to throw an error, but not show a prompt, return early with true
                        case "_error_no_prompt":
                            return true;
                            break;
                            // Anything else we continue on
                        default:
                            break;
                    }
                }

                // If it has been specified that validation should end now, break
                if (end_validation) {
                    break;
                }

                // If we have a string, that means that we have an error, so add it to the error message.
                if (typeof errorMsg == 'string') {
                    promptText += errorMsg + "<br/>";
                    options.isError = true;
                    field_errors++;
                }
            }
            // If the rules required is not added, an empty field is not validated
            if (!required && !(field.val()) && field.val().length < 1) options.isError = false;

            // Hack for radio/checkbox group button, the validation go into the
            // first radio/checkbox of the group
            var fieldType = field.prop("type");
            var positionType = field.data("promptPosition") || options.promptPosition;

            if ((fieldType == "radio" || fieldType == "checkbox") && form.find("input[name='" + fieldName + "']").size() > 1) {
                if (positionType === 'inline') {
                    field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:last"));
                } else {
                    field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:first"));
                }
                options.showArrow = false;
            }

            if (field.is(":hidden") && options.prettySelect) {
                field = form.find("#" + options.usePrefix + methods._jqSelector(field.attr('id')) + options.useSuffix);
            }

            if (options.isError && options.showPrompts) {
                methods._showPrompt(field, promptText, promptType, false, options);
            } else {
                if (!isAjaxValidator) methods._closePrompt(field);
            }

            if (!isAjaxValidator) {
                field.trigger("jqv.field.result", [field, options.isError, promptText]);
            }

            /* Record error */
            var errindex = $.inArray(field[0], options.InvalidFields);
            if (errindex == -1) {
                if (options.isError)
                    options.InvalidFields.push(field[0]);
            } else if (!options.isError) {
                options.InvalidFields.splice(errindex, 1);
            }

            methods._handleStatusCssClasses(field, options);

            /* run callback function for each field */
            if (options.isError && options.onFieldFailure)
                options.onFieldFailure(field);

            if (!options.isError && options.onFieldSuccess)
                options.onFieldSuccess(field);

            return options.isError;
        },
        /**
         * Handling css classes of fields indicating result of validation
         *
         * @param {jqObject}
         *            field
         * @param {Array[String]}
         *            field's validation rules
         * @private
         */
        _handleStatusCssClasses: function(field, options) {
            /* remove all classes */
            if (options.addSuccessCssClassToField)
                field.removeClass(options.addSuccessCssClassToField);

            if (options.addFailureCssClassToField)
                field.removeClass(options.addFailureCssClassToField);

            /* Add classes */
            if (options.addSuccessCssClassToField && !options.isError)
                field.addClass(options.addSuccessCssClassToField);

            if (options.addFailureCssClassToField && options.isError)
                field.addClass(options.addFailureCssClassToField);
        },

        /********************
         * _getErrorMessage
         *
         * @param form
         * @param field
         * @param rule
         * @param rules
         * @param i
         * @param options
         * @param originalValidationMethod
         * @return {*}
         * @private
         */
        _getErrorMessage: function(form, field, rule, rules, i, options, originalValidationMethod) {
            // If we are using the custon validation type, build the index for the rule.
            // Otherwise if we are doing a function call, make the call and return the object
            // that is passed back.
            var rule_index = jQuery.inArray(rule, rules);
            if (rule === "custom" || rule === "funcCall") {
                var custom_validation_type = rules[rule_index + 1];
                rule = rule + "[" + custom_validation_type + "]";
                // Delete the rule from the rules array so that it doesn't try to call the
                // same rule over again
                delete(rules[rule_index]);
            }
            // Change the rule to the composite rule, if it was different from the original
            var alteredRule = rule;


            var element_classes = (field.attr("data-validation-engine")) ? field.attr("data-validation-engine") : field.attr("class");
            var element_classes_array = element_classes.split(" ");

            // Call the original validation method. If we are dealing with dates or checkboxes, also pass the form
            var errorMsg;
            if (rule == "future" || rule == "past" || rule == "maxCheckbox" || rule == "minCheckbox") {
                errorMsg = originalValidationMethod(form, field, rules, i, options);
            } else {
                errorMsg = originalValidationMethod(field, rules, i, options);
            }

            // If the original validation method returned an error and we have a custom error message,
            // return the custom message instead. Otherwise return the original error message.
            if (errorMsg != undefined) {
                var custom_message = methods._getCustomErrorMessage($(field), element_classes_array, alteredRule, options);
                if (custom_message) errorMsg = custom_message;
            }
            return errorMsg;

        },
        _getCustomErrorMessage: function(field, classes, rule, options) {
            var custom_message = false;
            var validityProp = methods._validityProp[rule];
            // If there is a validityProp for this rule, check to see if the field has an attribute for it
            if (validityProp != undefined) {
                custom_message = field.attr("data-errormessage-" + validityProp);
                // If there was an error message for it, return the message
                if (custom_message != undefined)
                    return custom_message;
            }
            custom_message = field.attr("data-errormessage");
            // If there is an inline custom error message, return it
            if (custom_message != undefined)
                return custom_message;
            var id = '#' + field.attr("id");
            // If we have custom messages for the element's id, get the message for the rule from the id.
            // Otherwise, if we have custom messages for the element's classes, use the first class message we find instead.
            if (typeof options.custom_error_messages[id] != "undefined" &&
                typeof options.custom_error_messages[id][rule] != "undefined") {
                custom_message = options.custom_error_messages[id][rule]['message'];
            } else if (classes.length > 0) {
                for (var i = 0; i < classes.length && classes.length > 0; i++) {
                    var element_class = "." + classes[i];
                    if (typeof options.custom_error_messages[element_class] != "undefined" &&
                        typeof options.custom_error_messages[element_class][rule] != "undefined") {
                        custom_message = options.custom_error_messages[element_class][rule]['message'];
                        break;
                    }
                }
            }
            if (!custom_message &&
                typeof options.custom_error_messages[rule] != "undefined" &&
                typeof options.custom_error_messages[rule]['message'] != "undefined") {
                custom_message = options.custom_error_messages[rule]['message'];
            }
            return custom_message;
        },
        _validityProp: {
            "required": "value-missing",
            "custom": "custom-error",
            "groupRequired": "value-missing",
            "ajax": "custom-error",
            "minSize": "range-underflow",
            "maxSize": "range-overflow",
            "min": "range-underflow",
            "max": "range-overflow",
            "past": "type-mismatch",
            "future": "type-mismatch",
            "dateRange": "type-mismatch",
            "dateTimeRange": "type-mismatch",
            "maxCheckbox": "range-overflow",
            "minCheckbox": "range-underflow",
            "equals": "pattern-mismatch",
            "funcCall": "custom-error",
            "creditCard": "pattern-mismatch",
            "condRequired": "value-missing"
        },
        /**
         * Required validation
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @param {bool} condRequired flag when method is used for internal purpose in condRequired check
         * @return an error string if validation failed
         */
        _required: function(field, rules, i, options, condRequired) {
            switch (field.prop("type")) {
                case "text":
                case "password":
                case "textarea":
                case "file":
                case "select-one":
                case "select-multiple":
                default:
                    var field_val = $.trim(field.val());
                    var dv_placeholder = $.trim(field.attr("data-validation-placeholder"));
                    var placeholder = $.trim(field.attr("placeholder"));
                    if (
                        (!field_val) || (dv_placeholder && field_val == dv_placeholder) || (placeholder && field_val == placeholder)
                    ) {
                        return options.allrules[rules[i]].alertText;
                    }
                    break;
                case "radio":
                case "checkbox":
                    // new validation style to only check dependent field
                    if (condRequired) {
                        if (!field.attr('checked')) {
                            return options.allrules[rules[i]].alertTextCheckboxMultiple;
                        }
                        break;
                    }
                    // old validation style
                    var form = field.closest("form, .validationEngineContainer");
                    var name = field.attr("name");
                    if (form.find("input[name='" + name + "']:checked").size() == 0) {
                        if (form.find("input[name='" + name + "']:visible").size() == 1)
                            return options.allrules[rules[i]].alertTextCheckboxe;
                        else
                            return options.allrules[rules[i]].alertTextCheckboxMultiple;
                    }
                    break;
            }
        },
        /**
         * Validate that 1 from the group field is required
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _groupRequired: function(field, rules, i, options) {
            var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
            var isValid = false;
            // Check all fields from the group
            field.closest("form, .validationEngineContainer").find(classGroup).each(function() {
                if (!methods._required($(this), rules, i, options)) {
                    isValid = true;
                    return false;
                }
            });

            if (!isValid) {
                return options.allrules[rules[i]].alertText;
            }
        },
        /**
         * Validate rules
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _custom: function(field, rules, i, options) {
            var customRule = rules[i + 1];
            var rule = options.allrules[customRule];
            var fn;
            if (!rule) {
                alert("jqv:custom rule not found - " + customRule);
                return;
            }

            if (rule["regex"]) {
                var ex = rule.regex;
                if (!ex) {
                    alert("jqv:custom regex not found - " + customRule);
                    return;
                }
                var pattern = new RegExp(ex);

                if (!pattern.test(field.val())) return options.allrules[customRule].alertText;

            } else if (rule["func"]) {
                fn = rule["func"];

                if (typeof(fn) !== "function") {
                    alert("jqv:custom parameter 'function' is no function - " + customRule);
                    return;
                }

                if (!fn(field, rules, i, options))
                    return options.allrules[customRule].alertText;
            } else {
                alert("jqv:custom type not allowed " + customRule);
                return;
            }
        },
        /**
         * Validate custom function outside of the engine scope
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _funcCall: function(field, rules, i, options) {
            var functionName = rules[i + 1];
            var fn;
            if (functionName.indexOf('.') > -1) {
                var namespaces = functionName.split('.');
                var scope = window;
                while (namespaces.length) {
                    scope = scope[namespaces.shift()];
                }
                fn = scope;
            } else
                fn = window[functionName] || options.customFunctions[functionName];
            if (typeof(fn) == 'function')
                return fn(field, rules, i, options);

        },
        /**
         * Field match
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _equals: function(field, rules, i, options) {
            var equalsField = rules[i + 1];

            if (field.val() != $("#" + equalsField).val())
                return options.allrules.equals.alertText;
        },
        /**
         * Check the maximum size (in characters)
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _maxSize: function(field, rules, i, options) {
            var max = rules[i + 1];
            var len = field.val().length;

            if (len > max) {
                var rule = options.allrules.maxSize;
                return rule.alertText + max + rule.alertText2;
            }
        },
        /**
         * Check the minimum size (in characters)
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _minSize: function(field, rules, i, options) {
            var min = rules[i + 1];
            var len = field.val().length;

            if (len < min) {
                var rule = options.allrules.minSize;
                return rule.alertText + min + rule.alertText2;
            }
        },
        /**
         * Check number minimum value
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _min: function(field, rules, i, options) {
            var min = parseFloat(rules[i + 1]);
            var len = parseFloat(field.val());

            if (len < min) {
                var rule = options.allrules.min;
                if (rule.alertText2) return rule.alertText + min + rule.alertText2;
                return rule.alertText + min;
            }
        },
        /**
         * Check number maximum value
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _max: function(field, rules, i, options) {
            var max = parseFloat(rules[i + 1]);
            var len = parseFloat(field.val());

            if (len > max) {
                var rule = options.allrules.max;
                if (rule.alertText2) return rule.alertText + max + rule.alertText2;
                //orefalo: to review, also do the translations
                return rule.alertText + max;
            }
        },
        /**
         * Checks date is in the past
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _past: function(form, field, rules, i, options) {

            var p = rules[i + 1];
            var fieldAlt = $(form.find("input[name='" + p.replace(/^#+/, '') + "']"));
            var pdate;

            if (p.toLowerCase() == "now") {
                pdate = new Date();
            } else if (undefined != fieldAlt.val()) {
                if (fieldAlt.is(":disabled"))
                    return;
                pdate = methods._parseDate(fieldAlt.val());
            } else {
                pdate = methods._parseDate(p);
            }
            var vdate = methods._parseDate(field.val());

            if (vdate > pdate) {
                var rule = options.allrules.past;
                if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                return rule.alertText + methods._dateToString(pdate);
            }
        },
        /**
         * Checks date is in the future
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _future: function(form, field, rules, i, options) {

            var p = rules[i + 1];
            var fieldAlt = $(form.find("input[name='" + p.replace(/^#+/, '') + "']"));
            var pdate;

            if (p.toLowerCase() == "now") {
                pdate = new Date();
            } else if (undefined != fieldAlt.val()) {
                if (fieldAlt.is(":disabled"))
                    return;
                pdate = methods._parseDate(fieldAlt.val());
            } else {
                pdate = methods._parseDate(p);
            }
            var vdate = methods._parseDate(field.val());

            if (vdate < pdate) {
                var rule = options.allrules.future;
                if (rule.alertText2)
                    return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                return rule.alertText + methods._dateToString(pdate);
            }
        },
        /**
         * Checks if valid date
         *
         * @param {string} date string
         * @return a bool based on determination of valid date
         */
        _isDate: function(value) {
            var dateRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
            return dateRegEx.test(value);
        },
        /**
         * Checks if valid date time
         *
         * @param {string} date string
         * @return a bool based on determination of valid date time
         */
        _isDateTime: function(value) {
            var dateTimeRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
            return dateTimeRegEx.test(value);
        },
        //Checks if the start date is before the end date
        //returns true if end is later than start
        _dateCompare: function(start, end) {
            return (new Date(start.toString()) < new Date(end.toString()));
        },
        /**
         * Checks date range
         *
         * @param {jqObject} first field name
         * @param {jqObject} second field name
         * @return an error string if validation failed
         */
        _dateRange: function(field, rules, i, options) {
            //are not both populated
            if ((!options.firstOfGroup[0].value && options.secondOfGroup[0].value) || (options.firstOfGroup[0].value && !options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }

            //are not both dates
            if (!methods._isDate(options.firstOfGroup[0].value) || !methods._isDate(options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }

            //are both dates but range is off
            if (!methods._dateCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
        },
        /**
         * Checks date time range
         *
         * @param {jqObject} first field name
         * @param {jqObject} second field name
         * @return an error string if validation failed
         */
        _dateTimeRange: function(field, rules, i, options) {
            //are not both populated
            if ((!options.firstOfGroup[0].value && options.secondOfGroup[0].value) || (options.firstOfGroup[0].value && !options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
            //are not both dates
            if (!methods._isDateTime(options.firstOfGroup[0].value) || !methods._isDateTime(options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
            //are both dates but range is off
            if (!methods._dateCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
        },
        /**
         * Max number of checkbox selected
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _maxCheckbox: function(form, field, rules, i, options) {

            var nbCheck = rules[i + 1];
            var groupname = field.attr("name");
            var groupSize = form.find("input[name='" + groupname + "']:checked").size();
            if (groupSize > nbCheck) {
                options.showArrow = false;
                if (options.allrules.maxCheckbox.alertText2)
                    return options.allrules.maxCheckbox.alertText + " " + nbCheck + " " + options.allrules.maxCheckbox.alertText2;
                return options.allrules.maxCheckbox.alertText;
            }
        },
        /**
         * Min number of checkbox selected
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _minCheckbox: function(form, field, rules, i, options) {

            var nbCheck = rules[i + 1];
            var groupname = field.attr("name");
            var groupSize = form.find("input[name='" + groupname + "']:checked").size();
            if (groupSize < nbCheck) {
                options.showArrow = false;
                return options.allrules.minCheckbox.alertText + " " + nbCheck + " " + options.allrules.minCheckbox.alertText2;
            }
        },
        /**
         * Checks that it is a valid credit card number according to the
         * Luhn checksum algorithm.
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return an error string if validation failed
         */
        _creditCard: function(field, rules, i, options) {
            //spaces and dashes may be valid characters, but must be stripped to calculate the checksum.
            var valid = false,
                cardNumber = field.val().replace(/ +/g, '').replace(/-+/g, '');

            var numDigits = cardNumber.length;
            if (numDigits >= 14 && numDigits <= 16 && parseInt(cardNumber) > 0) {

                var sum = 0,
                    i = numDigits - 1,
                    pos = 1,
                    digit, luhn = new String();
                do {
                    digit = parseInt(cardNumber.charAt(i));
                    luhn += (pos++ % 2 == 0) ? digit * 2 : digit;
                } while (--i >= 0)

                for (i = 0; i < luhn.length; i++) {
                    sum += parseInt(luhn.charAt(i));
                }
                valid = sum % 10 == 0;
            }
            if (!valid) return options.allrules.creditCard.alertText;
        },
        /**
         * Ajax field validation
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         *            user options
         * @return nothing! the ajax validator handles the prompts itself
         */
        _ajax: function(field, rules, i, options) {

            var errorSelector = rules[i + 1];
            var rule = options.allrules[errorSelector];
            var extraData = rule.extraData;
            var extraDataDynamic = rule.extraDataDynamic;
            var data = {
                "fieldId": field.attr("id"),
                "fieldValue": field.val()
            };

            if (typeof extraData === "object") {
                $.extend(data, extraData);
            } else if (typeof extraData === "string") {
                var tempData = extraData.split("&");
                for (var i = 0; i < tempData.length; i++) {
                    var values = tempData[i].split("=");
                    if (values[0] && values[0]) {
                        data[values[0]] = values[1];
                    }
                }
            }

            if (extraDataDynamic) {
                var tmpData = [];
                var domIds = String(extraDataDynamic).split(",");
                for (var i = 0; i < domIds.length; i++) {
                    var id = domIds[i];
                    if ($(id).length) {
                        var inputValue = field.closest("form, .validationEngineContainer").find(id).val();
                        var keyValue = id.replace('#', '') + '=' + escape(inputValue);
                        data[id.replace('#', '')] = inputValue;
                    }
                }
            }

            // If a field change event triggered this we want to clear the cache for this ID
            if (options.eventTrigger == "field") {
                delete(options.ajaxValidCache[field.attr("id")]);
            }

            // If there is an error or if the the field is already validated, do not re-execute AJAX
            if (!options.isError && !methods._checkAjaxFieldStatus(field.attr("id"), options)) {
                $.ajax({
                    type: options.ajaxFormValidationMethod,
                    url: rule.url,
                    cache: false,
                    dataType: "json",
                    data: data,
                    field: field,
                    rule: rule,
                    methods: methods,
                    options: options,
                    beforeSend: function() {},
                    error: function(data, transport) {
                        methods._ajaxError(data, transport);
                    },
                    success: function(json) {

                        // asynchronously called on success, data is the json answer from the server
                        var errorFieldId = json[0];
                        //var errorField = $($("#" + errorFieldId)[0]);
                        var errorField = $("#" + errorFieldId).eq(0);

                        // make sure we found the element
                        if (errorField.length == 1) {
                            var status = json[1];
                            // read the optional msg from the server
                            var msg = json[2];
                            if (!status) {
                                // Houston we got a problem - display an red prompt
                                options.ajaxValidCache[errorFieldId] = false;
                                options.isError = true;

                                // resolve the msg prompt
                                if (msg) {
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertText;
                                        if (txt) {
                                            msg = txt;
                                        }
                                    }
                                } else
                                    msg = rule.alertText;

                                if (options.showPrompts) methods._showPrompt(errorField, msg, "", true, options);
                            } else {
                                options.ajaxValidCache[errorFieldId] = true;

                                // resolves the msg prompt
                                if (msg) {
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertTextOk;
                                        if (txt) {
                                            msg = txt;
                                        }
                                    }
                                } else
                                    msg = rule.alertTextOk;

                                if (options.showPrompts) {
                                    // see if we should display a green prompt
                                    if (msg)
                                        methods._showPrompt(errorField, msg, "pass", true, options);
                                    else
                                        methods._closePrompt(errorField);
                                }

                                // If a submit form triggered this, we want to re-submit the form
                                if (options.eventTrigger == "submit")
                                    field.closest("form").submit();
                            }
                        }
                        errorField.trigger("jqv.field.result", [errorField, options.isError, msg]);
                    }
                });

                return rule.alertTextLoad;
            }
        },
        /**
         * Common method to handle ajax errors
         *
         * @param {Object} data
         * @param {Object} transport
         */
        _ajaxError: function(data, transport) {
            if (data.status == 0 && transport == null)
                alert("The page is not served from a server! ajax call failed");
            else if (typeof console != "undefined")
                console.log("Ajax error: " + data.status + " " + transport);
        },
        /**
         * date -> string
         *
         * @param {Object} date
         */
        _dateToString: function(date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        },
        /**
         * Parses an ISO date
         * @param {String} d
         */
        _parseDate: function(d) {

            var dateParts = d.split("-");
            if (dateParts == d)
                dateParts = d.split("/");
            if (dateParts == d) {
                dateParts = d.split(".");
                return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
            }
            return new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);
        },
        /**
         * Builds or updates a prompt with the given information
         *
         * @param {jqObject} field
         * @param {String} promptText html text to display type
         * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
         * @param {boolean} ajaxed - use to mark fields than being validated with ajax
         * @param {Map} options user options
         */
        _showPrompt: function(field, promptText, type, ajaxed, options, ajaxform) {
            var prompt = methods._getPrompt(field);
            // The ajax submit errors are not see has an error in the form,
            // When the form errors are returned, the engine see 2 bubbles, but those are ebing closed by the engine at the same time
            // Because no error was found befor submitting
            if (ajaxform) prompt = false;
            // Check that there is indded text
            if ($.trim(promptText)) {
                if (prompt)
                    methods._updatePrompt(field, prompt, promptText, type, ajaxed, options);
                else
                    methods._buildPrompt(field, promptText, type, ajaxed, options);
            }
        },
        /**
         * Builds and shades a prompt for the given field.
         *
         * @param {jqObject} field
         * @param {String} promptText html text to display type
         * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
         * @param {boolean} ajaxed - use to mark fields than being validated with ajax
         * @param {Map} options user options
         */
        _buildPrompt: function(field, promptText, type, ajaxed, options) {

            // create the prompt
            var prompt = $('<div>');
            prompt.addClass(methods._getClassName(field.attr("id")) + "formError");
            // add a class name to identify the parent form of the prompt
            prompt.addClass("parentForm" + methods._getClassName(field.closest('form, .validationEngineContainer').attr("id")));
            prompt.addClass("formError");

            switch (type) {
                case "pass":
                    prompt.addClass("greenPopup");
                    break;
                case "load":
                    prompt.addClass("blackPopup");
                    break;
                default:
                    /* it has error  */
                    //alert("unknown popup type:"+type);
            }
            if (ajaxed)
                prompt.addClass("ajaxed");

            // create the prompt content
            var promptContent = $('<div>').addClass("formErrorContent").html(promptText).appendTo(prompt);

            // determine position type
            var positionType = field.data("promptPosition") || options.promptPosition;

            // create the css arrow pointing at the field
            // note that there is no triangle on max-checkbox and radio
            if (options.showArrow) {
                var arrow = $('<div>').addClass("formErrorArrow");

                //prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
                if (typeof(positionType) == 'string') {
                    var pos = positionType.indexOf(":");
                    if (pos != -1)
                        positionType = positionType.substring(0, pos);
                }

                switch (positionType) {
                    case "bottomLeft":
                    case "bottomRight":
                        prompt.find(".formErrorContent").before(arrow);
                        arrow.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                        break;
                    case "topLeft":
                    case "topRight":
                        arrow.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                        prompt.append(arrow);
                        break;
                }
            }
            // Add custom prompt class
            if (options.addPromptClass)
                prompt.addClass(options.addPromptClass);

            // Add custom prompt class defined in element
            var requiredOverride = field.attr('data-required-class');
            if (requiredOverride !== undefined) {
                prompt.addClass(requiredOverride);
            } else {
                if (options.prettySelect) {
                    if ($('#' + field.attr('id')).next().is('select')) {
                        var prettyOverrideClass = $('#' + field.attr('id').substr(options.usePrefix.length).substring(options.useSuffix.length)).attr('data-required-class');
                        if (prettyOverrideClass !== undefined) {
                            prompt.addClass(prettyOverrideClass);
                        }
                    }
                }
            }

            prompt.css({
                "opacity": 0
            });
            if (positionType === 'inline') {
                prompt.addClass("inline");
                if (typeof field.attr('data-prompt-target') !== 'undefined' && $('#' + field.attr('data-prompt-target')).length > 0) {
                    prompt.appendTo($('#' + field.attr('data-prompt-target')));
                } else {
                    field.after(prompt);
                }
            } else {
                field.before(prompt);
            }

            var pos = methods._calculatePosition(field, prompt, options);
            prompt.css({
                'position': positionType === 'inline' ? 'relative' : 'absolute',
                "top": pos.callerTopPosition,
                "left": pos.callerleftPosition,
                "marginTop": pos.marginTopSize,
                "opacity": 0
            }).data("callerField", field);


            if (options.autoHidePrompt) {
                setTimeout(function() {
                    prompt.animate({
                        "opacity": 0
                    }, function() {
                        prompt.closest('.formErrorOuter').remove();
                        prompt.remove();
                    });
                }, options.autoHideDelay);
            }
            return prompt.animate({
                "opacity": 0.87
            });
        },
        /**
         * Updates the prompt text field - the field for which the prompt
         * @param {jqObject} field
         * @param {String} promptText html text to display type
         * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
         * @param {boolean} ajaxed - use to mark fields than being validated with ajax
         * @param {Map} options user options
         */
        _updatePrompt: function(field, prompt, promptText, type, ajaxed, options, noAnimation) {

            if (prompt) {
                if (typeof type !== "undefined") {
                    if (type == "pass")
                        prompt.addClass("greenPopup");
                    else
                        prompt.removeClass("greenPopup");

                    if (type == "load")
                        prompt.addClass("blackPopup");
                    else
                        prompt.removeClass("blackPopup");
                }
                if (ajaxed)
                    prompt.addClass("ajaxed");
                else
                    prompt.removeClass("ajaxed");

                prompt.find(".formErrorContent").html(promptText);

                var pos = methods._calculatePosition(field, prompt, options);
                var css = {
                    "top": pos.callerTopPosition,
                    "left": pos.callerleftPosition,
                    "marginTop": pos.marginTopSize
                };

                if (noAnimation)
                    prompt.css(css);
                else
                    prompt.animate(css);
            }
        },
        /**
         * Closes the prompt associated with the given field
         *
         * @param {jqObject}
         *            field
         */
        _closePrompt: function(field) {
            var prompt = methods._getPrompt(field);
            if (prompt)
                prompt.fadeTo("fast", 0, function() {
                    prompt.parent('.formErrorOuter').remove();
                    prompt.remove();
                });
        },
        closePrompt: function(field) {
            return methods._closePrompt(field);
        },
        /**
         * Returns the error prompt matching the field if any
         *
         * @param {jqObject}
         *            field
         * @return undefined or the error prompt (jqObject)
         */
        _getPrompt: function(field) {
            var formId = $(field).closest('form, .validationEngineContainer').attr('id');
            var className = methods._getClassName(field.attr("id")) + "formError";
            var match = $("." + methods._escapeExpression(className) + '.parentForm' + formId)[0];
            if (match)
                return $(match);
        },
        /**
         * Returns the escapade classname
         *
         * @param {selector}
         *            className
         */
        _escapeExpression: function(selector) {
            return selector.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
        },
        /**
         * returns true if we are in a RTLed document
         *
         * @param {jqObject} field
         */
        isRTL: function(field) {
            var $document = $(document);
            var $body = $('body');
            var rtl =
                (field && field.hasClass('rtl')) ||
                (field && (field.attr('dir') || '').toLowerCase() === 'rtl') ||
                $document.hasClass('rtl') ||
                ($document.attr('dir') || '').toLowerCase() === 'rtl' ||
                $body.hasClass('rtl') ||
                ($body.attr('dir') || '').toLowerCase() === 'rtl';
            return Boolean(rtl);
        },
        /**
         * Calculates prompt position
         *
         * @param {jqObject}
         *            field
         * @param {jqObject}
         *            the prompt
         * @param {Map}
         *            options
         * @return positions
         */
        _calculatePosition: function(field, promptElmt, options) {

            var promptTopPosition, promptleftPosition, marginTopSize;
            var fieldWidth = field.width();
            var fieldLeft = field.position().left;
            var fieldTop = field.position().top;
            var fieldHeight = field.height();
            var promptHeight = promptElmt.height();


            // is the form contained in an overflown container?
            promptTopPosition = promptleftPosition = 0;
            // compensation for the arrow
            marginTopSize = -promptHeight;


            //prompt positioning adjustment support
            //now you can adjust prompt position
            //usage: positionType:Xshift,Yshift
            //for example:
            //   bottomLeft:+20 means bottomLeft position shifted by 20 pixels right horizontally
            //   topRight:20, -15 means topRight position shifted by 20 pixels to right and 15 pixels to top
            //You can use +pixels, - pixels. If no sign is provided than + is default.
            var positionType = field.data("promptPosition") || options.promptPosition;
            var shift1 = "";
            var shift2 = "";
            var shiftX = 0;
            var shiftY = 0;
            if (typeof(positionType) == 'string') {
                //do we have any position adjustments ?
                if (positionType.indexOf(":") != -1) {
                    shift1 = positionType.substring(positionType.indexOf(":") + 1);
                    positionType = positionType.substring(0, positionType.indexOf(":"));

                    //if any advanced positioning will be needed (percents or something else) - parser should be added here
                    //for now we use simple parseInt()

                    //do we have second parameter?
                    if (shift1.indexOf(",") != -1) {
                        shift2 = shift1.substring(shift1.indexOf(",") + 1);
                        shift1 = shift1.substring(0, shift1.indexOf(","));
                        shiftY = parseInt(shift2);
                        if (isNaN(shiftY)) shiftY = 0;
                    };

                    shiftX = parseInt(shift1);
                    if (isNaN(shift1)) shift1 = 0;

                };
            };


            switch (positionType) {
                default:
                    case "topRight":
                    promptleftPosition += fieldLeft + fieldWidth - 30;
                promptTopPosition += fieldTop;
                break;

                case "topLeft":
                        promptTopPosition += fieldTop;
                    promptleftPosition += fieldLeft;
                    break;

                case "centerRight":
                        promptTopPosition = fieldTop + 4;
                    marginTopSize = 0;
                    promptleftPosition = fieldLeft + field.outerWidth(true) + 5;
                    break;
                case "centerLeft":
                        promptleftPosition = fieldLeft - (promptElmt.width() + 2);
                    promptTopPosition = fieldTop + 4;
                    marginTopSize = 0;

                    break;

                case "bottomLeft":
                        promptTopPosition = fieldTop + field.height() + 5;
                    marginTopSize = 0;
                    promptleftPosition = fieldLeft;
                    break;
                case "bottomRight":
                        promptleftPosition = fieldLeft + fieldWidth - 30;
                    promptTopPosition = fieldTop + field.height() + 5;
                    marginTopSize = 0;
                    break;
                case "inline":
                        promptleftPosition = 0;
                    promptTopPosition = 0;
                    marginTopSize = 0;
            };



            //apply adjusments if any
            promptleftPosition += shiftX;
            promptTopPosition += shiftY;

            return {
                "callerTopPosition": promptTopPosition + "px",
                "callerleftPosition": promptleftPosition + "px",
                "marginTopSize": marginTopSize + "px"
            };
        },
        /**
         * Saves the user options and variables in the form.data
         *
         * @param {jqObject}
         *            form - the form where the user option should be saved
         * @param {Map}
         *            options - the user options
         * @return the user options (extended from the defaults)
         */
        _saveOptions: function(form, options) {

            // is there a language localisation ?
            if ($.validationEngineLanguage)
                var allRules = $.validationEngineLanguage.allRules;
            else
                $.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
            // --- Internals DO NOT TOUCH or OVERLOAD ---
            // validation rules and i18
            $.validationEngine.defaults.allrules = allRules;

            var userOptions = $.extend(true, {}, $.validationEngine.defaults, options);

            form.data('jqv', userOptions);
            return userOptions;
        },

        /**
         * Removes forbidden characters from class name
         * @param {String} className
         */
        _getClassName: function(className) {
            if (className)
                return className.replace(/:/g, "_").replace(/\./g, "_");
        },
        /**
         * Escape special character for jQuery selector
         * http://totaldev.com/content/escaping-characters-get-valid-jquery-id
         * @param {String} selector
         */
        _jqSelector: function(str) {
            return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
        },
        /**
         * Conditionally required field
         *
         * @param {jqObject} field
         * @param {Array[String]} rules
         * @param {int} i rules index
         * @param {Map}
         * user options
         * @return an error string if validation failed
         */
        _condRequired: function(field, rules, i, options) {
            var idx, dependingField;

            for (idx = (i + 1); idx < rules.length; idx++) {
                dependingField = jQuery("#" + rules[idx]).first();

                /* Use _required for determining wether dependingField has a value.
                 * There is logic there for handling all field types, and default value; so we won't replicate that here
                 * Indicate this special use by setting the last parameter to true so we only validate the dependingField on chackboxes and radio buttons (#462)
                 */
                if (dependingField.length && methods._required(dependingField, ["required"], 0, options, true) == undefined) {
                    /* We now know any of the depending fields has a value,
                     * so we can validate this field as per normal required code
                     */
                    return methods._required(field, ["required"], 0, options);
                }
            }
        },

        _submitButtonClick: function(event) {
            var button = $(this);
            var form = button.closest('form, .validationEngineContainer');
            form.data("jqv_submitButton", button.attr("id"));
        }
    };

    /**
     * Plugin entry point.
     * You may pass an action as a parameter or a list of options.
     * if none, the init and attach methods are being called.
     * Remember: if you pass options, the attached method is NOT called automatically
     *
     * @param {String}
     *            method (optional) action
     */
    $.fn.validationEngine = function(method) {

        var form = $(this);
        if (!form[0]) return form; // stop here if the form does not exist

        if (typeof(method) == 'string' && method.charAt(0) != '_' && methods[method]) {

            // make sure init is called once
            if (method != "showPrompt" && method != "hide" && method != "hideAll")
                methods.init.apply(form);

            return methods[method].apply(form, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {

            // default constructor with or without arguments
            methods.init.apply(form, arguments);
            return methods.attach.apply(form);
        } else {
            $.error('Method ' + method + ' does not exist in jQuery.validationEngine');
        }
    };



    // LEAK GLOBAL OPTIONS
    $.validationEngine = {
        fieldIdCounter: 0,
        defaults: {

            // Name of the event triggering field validation
            validationEventTrigger: "blur",
            // Automatically scroll viewport to the first error
            scroll: true,
            // Focus on the first input
            focusFirstField: true,
            // Show prompts, set to false to disable prompts
            showPrompts: true,
            // Should we attempt to validate non-visible input fields contained in the form? (Useful in cases of tabbed containers, e.g. jQuery-UI tabs)
            validateNonVisibleFields: false,
            // Opening box position, possible locations are: topLeft,
            // topRight, bottomLeft, centerRight, bottomRight, inline
            // inline gets inserted after the validated field or into an element specified in data-prompt-target
            promptPosition: "topRight",
            bindMethod: "bind",
            // internal, automatically set to true when it parse a _ajax rule
            inlineAjax: false,
            // if set to true, the form data is sent asynchronously via ajax to the form.action url (get)
            ajaxFormValidation: false,
            // The url to send the submit ajax validation (default to action)
            ajaxFormValidationURL: false,
            // HTTP method used for ajax validation
            ajaxFormValidationMethod: 'get',
            // Ajax form validation callback method: boolean onComplete(form, status, errors, options)
            // retuns false if the form.submit event needs to be canceled.
            onAjaxFormComplete: $.noop,
            // called right before the ajax call, may return false to cancel
            onBeforeAjaxFormValidation: $.noop,
            // Stops form from submitting and execute function assiciated with it
            onValidationComplete: false,

            // Used when you have a form fields too close and the errors messages are on top of other disturbing viewing messages
            doNotShowAllErrosOnSubmit: false,
            // Object where you store custom messages to override the default error messages
            custom_error_messages: {},
            // true if you want to vind the input fields
            binded: true,
            // set to true, when the prompt arrow needs to be displayed
            showArrow: true,
            // did one of the validation fail ? kept global to stop further ajax validations
            isError: false,
            // Limit how many displayed errors a field can have
            maxErrorsPerField: false,

            // Caches field validation status, typically only bad status are created.
            // the array is used during ajax form validation to detect issues early and prevent an expensive submit
            ajaxValidCache: {},
            // Auto update prompt position after window resize
            autoPositionUpdate: false,

            InvalidFields: [],
            onFieldSuccess: false,
            onFieldFailure: false,
            onSuccess: false,
            onFailure: false,
            validateAttribute: "class",
            addSuccessCssClassToField: "",
            addFailureCssClassToField: "",

            // Auto-hide prompt
            autoHidePrompt: false,
            // Delay before auto-hide
            autoHideDelay: 10000,
            // Fade out duration while hiding the validations
            fadeDuration: 0.3,
            // Use Prettify select library
            prettySelect: false,
            // Add css class on prompt
            addPromptClass: "",
            // Custom ID uses prefix
            usePrefix: "",
            // Custom ID uses suffix
            useSuffix: "",
            // Only show one message per error prompt
            showOneMessage: false
        }
    };
    $(function() {
        $.validationEngine.defaults.promptPosition = methods.isRTL() ? 'topLeft' : "topRight"
    });
})(jQuery);