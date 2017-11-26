window.Modernizr = function(a, b, c) {
    function z(a) {
        j.cssText = a
    }

    function A(a, b) {
        return z(m.join(a + ";") + (b || ""))
    }

    function B(a, b) {
        return typeof a === b
    }

    function C(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function D(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!C(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
        }
    return !1
}

function E(a, b, d) {
    for (var e in a) {
        var f = b[a[e]];
        if (f !== c) return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f
    }
return !1
}

function F(a, b, c) {
    var d = a.charAt(0).toUpperCase() + a.slice(1),
    e = (a + " " + o.join(d + " ") + d).split(" ");
    return B(b, "string") || B(b, "undefined") ? D(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), E(e, b, c))
}
var d = "2.6.2",
e = {},
f = !0,
g = b.documentElement,
h = "modernizr",
i = b.createElement(h),
j = i.style,
k, l = {}.toString,
m = " -webkit- -moz- -o- -ms- ".split(" "),
n = "Webkit Moz O ms",
o = n.split(" "),
p = n.toLowerCase().split(" "),
q = {},
r = {},
s = {},
t = [],
u = t.slice,
v, w = function(a, c, d, e) {
    var f, i, j, k, l = b.createElement("div"),
    m = b.body,
    n = m || b.createElement("body");
    if (parseInt(d, 10))
        while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
    return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
},
x = {}.hasOwnProperty,
y;
!B(x, "undefined") && !B(x.call, "undefined") ? y = function(a, b) {
    return x.call(a, b)
} : y = function(a, b) {
    return b in a && B(a.constructor.prototype[b], "undefined")
}, Function.prototype.bind || (Function.prototype.bind = function(b) {
    var c = this;
    if (typeof c != "function") throw new TypeError;
    var d = u.call(arguments, 1),
    e = function() {
        if (this instanceof e) {
            var a = function() {};
            a.prototype = c.prototype;
            var f = new a,
            g = c.apply(f, d.concat(u.call(arguments)));
            return Object(g) === g ? g : f
        }
        return c.apply(b, d.concat(u.call(arguments)))
    };
    return e
}), q.csstransforms = function() {
    return !!F("transform")
}, q.csstransforms3d = function() {
    var a = !!F("perspective");
    return a && "webkitPerspective" in g.style && w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
        a = b.offsetLeft === 9 && b.offsetHeight === 3
    }), a
}, q.csstransitions = function() {
    return F("transition")
};
for (var G in q) y(q, G) && (v = G.toLowerCase(), e[v] = q[G](), t.push((e[v] ? "" : "no-") + v));
    return e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a) y(a, d) && e.addTest(d, a[d]);
                else {
                    a = a.toLowerCase();
                    if (e[a] !== c) return e;
                    b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
                }
                return e
            }, z(""), i = k = null, e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.testProp = function(a) {
                return D([a])
            }, e.testAllProps = F, e.testStyles = w, e.prefixed = function(a, b, c) {
                return b ? F(a, b, c) : F(a, "pfx")
            }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), e
        }(this, this.document);;
/*
 * Shuffle.js by @Vestride
 * Categorize, sort, and filter a responsive grid of items.
 * Dependencies: jQuery 1.9+, Modernizr 2.6.2+
 * @license MIT license
 * @version 3.0.0
 */
 ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery", "modernizr"], a) : window.Shuffle = a(window.jQuery, window.Modernizr)
}(function(a, b, c) {
    "use strict";

    function d(a) {
        return a ? a.replace(/([A-Z])/g, function(a, b) {
            return "-" + b.toLowerCase()
        }).replace(/^ms-/, "-ms-") : ""
    }

    function e(b, c, d) {
        var e, f, g, h = null,
        i = 0;
        d = d || {};
        var j = function() {
            i = d.leading === !1 ? 0 : a.now(), h = null, g = b.apply(e, f), e = f = null
        };
        return function() {
            var k = a.now();
            i || d.leading !== !1 || (i = k);
            var l = c - (k - i);
            return e = this, f = arguments, 0 >= l || l > c ? (clearTimeout(h), h = null, i = k, g = b.apply(e, f), e = f = null) : h || d.trailing === !1 || (h = setTimeout(j, l)), g
        }
    }

    function f(a, b, c) {
        for (var d = 0, e = a.length; e > d; d++)
            if (b.call(c, a[d], d, a) === {}) return
        }

    function g(b, c, d) {
        return setTimeout(a.proxy(b, c), d)
    }

    function h(a) {
        return Math.max.apply(Math, a)
    }

    function i(a) {
        return Math.min.apply(Math, a)
    }

    function j(b) {
        return a.isNumeric(b) ? b : 0
    }

    function k(a) {
        var b, c, d = a.length;
        if (!d) return a;
        for (; --d;) c = Math.floor(Math.random() * (d + 1)), b = a[c], a[c] = a[d], a[d] = b;
            return a
    }
    if ("object" != typeof b) throw new Error("Shuffle.js requires Modernizr.\nhttp://vestride.github.io/Shuffle/#dependencies");
    var l = b.prefixed("transition"),
    m = b.prefixed("transitionDelay"),
    n = b.prefixed("transitionDuration"),
    o = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[l],
    p = b.prefixed("transform"),
    q = d(p),
    r = b.csstransforms && b.csstransitions,
    s = b.csstransforms3d,
    t = "shuffle",
    u = .3,
    v = "all",
    w = "groups",
    x = 1,
    y = .001,
    z = function(a, b) {
        this.x = j(a), this.y = j(b)
    };
    z.equals = function(a, b) {
        return a.x === b.x && a.y === b.y
    };
    var A = 0,
    B = a(window),
    C = function(b, c) {
        c = c || {}, a.extend(this, C.options, c, C.settings), this.$el = a(b), this.element = b, this.unique = "shuffle_" + A++, this._fire(C.EventType.LOADING), this._init(), g(function() {
            this.initialized = !0, this._fire(C.EventType.DONE)
        }, this, 16)
    };
    return C.EventType = {
        LOADING: "loading",
        DONE: "done",
        LAYOUT: "layout",
        REMOVED: "removed"
    }, C.ClassName = {
        BASE: t,
        SHUFFLE_ITEM: "shuffle-item",
        FILTERED: "filtered",
        CONCEALED: "concealed"
    }, C.options = {
        group: v,
        speed: 250,
        easing: "ease-out",
        itemSelector: "",
        sizer: null,
        gutterWidth: 0,
        columnWidth: 0,
        delimeter: null,
        buffer: 0,
        initialSort: null,
        throttle: e,
        throttleTime: 300,
        sequentialFadeDelay: 150,
        supported: r
    }, C.settings = {
        useSizer: !1,
        itemCss: {
            position: "absolute",
            top: 0,
            left: 0,
            visibility: "visible"
        },
        revealAppendedDelay: 300,
        lastSort: {},
        lastFilter: v,
        enabled: !0,
        destroyed: !1,
        initialized: !1,
        _animations: [],
        styleQueue: []
    }, C.Point = z, C._getItemTransformString = function(a, b) {
        return s ? "translate3d(" + a.x + "px, " + a.y + "px, 0) scale3d(" + b + ", " + b + ", 1)" : "translate(" + a.x + "px, " + a.y + "px) scale(" + b + ")"
    }, C._getNumberStyle = function(b, c) {
        return C._getFloat(a(b).css(c))
    }, C._getInt = function(a) {
        return j(parseInt(a, 10))
    }, C._getFloat = function(a) {
        return j(parseFloat(a))
    }, C._getOuterWidth = function(a, b) {
        var c = a.offsetWidth;
        if (b) {
            var d = C._getNumberStyle(a, "marginLeft"),
            e = C._getNumberStyle(a, "marginRight");
            c += d + e
        }
        return c
    }, C._getOuterHeight = function(a, b) {
        var c = a.offsetHeight;
        if (b) {
            var d = C._getNumberStyle(a, "marginTop"),
            e = C._getNumberStyle(a, "marginBottom");
            c += d + e
        }
        return c
    }, C._skipTransition = function(a, b, c) {
        var d = a.style[n];
        a.style[n] = "0ms", b.call(c);
        var e = a.offsetWidth;
        e = null, a.style[n] = d
    }, C.prototype._init = function() {
        this.$items = this._getItems(), this.sizer = this._getElementOption(this.sizer), this.sizer && (this.useSizer = !0), this.$el.addClass(C.ClassName.BASE), this._initItems(), B.on("resize." + t + "." + this.unique, this._getResizeFunction());
        var a = this.$el.css(["position", "overflow"]),
        b = C._getOuterWidth(this.element);
        this._validateStyles(a), this._setColumns(b), this.shuffle(this.group, this.initialSort), this.supported && g(function() {
            this._setTransitions(), this.element.style[l] = "height " + this.speed + "ms " + this.easing
        }, this)
    }, C.prototype._getResizeFunction = function() {
        var b = a.proxy(this._onResize, this);
        return this.throttle ? this.throttle(b, this.throttleTime) : b
    }, C.prototype._getElementOption = function(a) {
        return "string" == typeof a ? this.$el.find(a)[0] || null : a && a.nodeType && 1 === a.nodeType ? a : a && a.jquery ? a[0] : null
    }, C.prototype._validateStyles = function(a) {
        "static" === a.position && (this.element.style.position = "relative"), "hidden" !== a.overflow && (this.element.style.overflow = "hidden")
    }, C.prototype._filter = function(a, b) {
        a = a || this.lastFilter, b = b || this.$items;
        var c = this._getFilteredSets(a, b);
        return this._toggleFilterClasses(c.filtered, c.concealed), this.lastFilter = a, "string" == typeof a && (this.group = a), c.filtered
    }, C.prototype._getFilteredSets = function(b, c) {
        var d = a(),
        e = a();
        return b === v ? d = c : f(c, function(c) {
            var f = a(c);
            this._doesPassFilter(b, f) ? d = d.add(f) : e = e.add(f)
        }, this), {
            filtered: d,
            concealed: e
        }
    }, C.prototype._doesPassFilter = function(b, c) {
        if (a.isFunction(b)) return b.call(c[0], c, this);
        var d = c.data(w),
        e = this.delimeter && !a.isArray(d) ? d.split(this.delimeter) : d;
        return a.inArray(b, e) > -1
    }, C.prototype._toggleFilterClasses = function(a, b) {
        a.removeClass(C.ClassName.CONCEALED).addClass(C.ClassName.FILTERED), b.removeClass(C.ClassName.FILTERED).addClass(C.ClassName.CONCEALED)
    }, C.prototype._initItems = function(a) {
        a = a || this.$items, a.addClass([C.ClassName.SHUFFLE_ITEM, C.ClassName.FILTERED].join(" ")), a.css(this.itemCss).data("point", new z).data("scale", x)
    }, C.prototype._updateItemCount = function() {
        this.visibleItems = this._getFilteredItems().length
    }, C.prototype._setTransition = function(a) {
        a.style[l] = q + " " + this.speed + "ms " + this.easing + ", opacity " + this.speed + "ms " + this.easing
    }, C.prototype._setTransitions = function(a) {
        a = a || this.$items, f(a, function(a) {
            this._setTransition(a)
        }, this)
    }, C.prototype._setSequentialDelay = function(a) {
        this.supported && f(a, function(a, b) {
            a.style[m] = "0ms," + (b + 1) * this.sequentialFadeDelay + "ms"
        }, this)
    }, C.prototype._getItems = function() {
        return this.$el.children(this.itemSelector)
    }, C.prototype._getFilteredItems = function() {
        return this.$items.filter("." + C.ClassName.FILTERED)
    }, C.prototype._getConcealedItems = function() {
        return this.$items.filter("." + C.ClassName.CONCEALED)
    }, C.prototype._getColumnSize = function(b, c) {
        var d;
        return d = a.isFunction(this.columnWidth) ? this.columnWidth(b) : this.useSizer ? C._getOuterWidth(this.sizer) : this.columnWidth ? this.columnWidth : this.$items.length > 0 ? C._getOuterWidth(this.$items[0], !0) : b, 0 === d && (d = b), d + c
    }, C.prototype._getGutterSize = function(b) {
        var c;
        return c = a.isFunction(this.gutterWidth) ? this.gutterWidth(b) : this.useSizer ? C._getNumberStyle(this.sizer, "marginLeft") : this.gutterWidth
    }, C.prototype._setColumns = function(a) {
        var b = a || C._getOuterWidth(this.element),
        c = this._getGutterSize(b),
        d = this._getColumnSize(b, c),
        e = (b + c) / d;
        Math.abs(Math.round(e) - e) < u && (e = Math.round(e)), this.cols = Math.max(Math.floor(e), 1), this.containerWidth = b, this.colWidth = d
    }, C.prototype._setContainerSize = function() {
        this.$el.css("height", this._getContainerSize())
    }, C.prototype._getContainerSize = function() {
        return h(this.positions)
    }, C.prototype._fire = function(a, b) {
        this.$el.trigger(a + "." + t, b && b.length ? b : [this])
    }, C.prototype._resetCols = function() {
        var a = this.cols;
        for (this.positions = []; a--;) this.positions.push(0)
    }, C.prototype._layout = function(a, b) {
        f(a, function(a) {
            this._layoutItem(a, !!b)
        }, this), this._processStyleQueue(), this._setContainerSize()
    }, C.prototype._layoutItem = function(b, c) {
        var d = a(b),
        e = d.data(),
        f = e.point,
        g = e.scale,
        h = {
            width: C._getOuterWidth(b, !0),
            height: C._getOuterHeight(b, !0)
        },
        i = this._getItemPosition(h);
        z.equals(f, i) && g === x || (e.point = i, e.scale = x, this.styleQueue.push({
            $item: d,
            point: i,
            scale: x,
            opacity: c ? 0 : 1,
            skipTransition: c,
            callfront: function() {
                c || d.css("visibility", "visible")
            },
            callback: function() {
                c && d.css("visibility", "hidden")
            }
        }))
    }, C.prototype._getItemPosition = function(a) {
        for (var b = this._getColumnSpan(a.width, this.colWidth, this.cols), c = this._getColumnSet(b, this.cols), d = this._getShortColumn(c, this.buffer), e = new z(Math.round(this.colWidth * d), Math.round(c[d])), f = c[d] + a.height, g = this.cols + 1 - c.length, h = 0; g > h; h++) this.positions[d + h] = f;
            return e
    }, C.prototype._getColumnSpan = function(a, b, c) {
        var d = a / b;
        return Math.abs(Math.round(d) - d) < u && (d = Math.round(d)), Math.min(Math.ceil(d), c)
    }, C.prototype._getColumnSet = function(a, b) {
        if (1 === a) return this.positions;
        for (var c = b + 1 - a, d = [], e = 0; c > e; e++) d[e] = h(this.positions.slice(e, e + a));
            return d
    }, C.prototype._getShortColumn = function(a, b) {
        for (var c = i(a), d = 0, e = a.length; e > d; d++)
            if (a[d] >= c - b && a[d] <= c + b) return d;
        return 0
    }, C.prototype._shrink = function(b) {
        var c = b || this._getConcealedItems();
        f(c, function(b) {
            var c = a(b),
            d = c.data();
            d.scale !== y && (d.scale = y, this.styleQueue.push({
                $item: c,
                point: d.point,
                scale: y,
                opacity: 0,
                callback: function() {
                    c.css("visibility", "hidden")
                }
            }))
        }, this)
    }, C.prototype._onResize = function() {
        if (this.enabled && !this.destroyed && !this.isTransitioning) {
            var a = C._getOuterWidth(this.element);
            a !== this.containerWidth && this.update()
        }
    }, C.prototype._getStylesForTransition = function(a) {
        var b = {
            opacity: a.opacity
        };
        return this.supported ? b[p] = C._getItemTransformString(a.point, a.scale) : (b.left = a.point.x, b.top = a.point.y), b
    }, C.prototype._transition = function(b) {
        var c = this._getStylesForTransition(b);
        this._startItemAnimation(b.$item, c, b.callfront || a.noop, b.callback || a.noop)
    }, C.prototype._startItemAnimation = function(b, c, d, e) {
        function f(b) {
            b.target === b.currentTarget && (a(b.target).off(o, f), e())
        }
        if (d(), !this.initialized) return b.css(c), void e();
        if (this.supported) b.css(c), b.on(o, f);
        else {
            var g = b.stop(!0).animate(c, this.speed, "swing", e);
            this._animations.push(g.promise())
        }
    }, C.prototype._processStyleQueue = function(b) {
        var c = a();
        f(this.styleQueue, function(a) {
            a.skipTransition ? this._styleImmediately(a) : (c = c.add(a.$item), this._transition(a))
        }, this), c.length > 0 && this.initialized ? (this.isTransitioning = !0, this.supported ? this._whenCollectionDone(c, o, this._movementFinished) : this._whenAnimationsDone(this._movementFinished)) : b || g(this._layoutEnd, this), this.styleQueue.length = 0
    }, C.prototype._styleImmediately = function(a) {
        C._skipTransition(a.$item[0], function() {
            a.$item.css(this._getStylesForTransition(a))
        }, this)
    }, C.prototype._movementFinished = function() {
        this.isTransitioning = !1, this._layoutEnd()
    }, C.prototype._layoutEnd = function() {
        this._fire(C.EventType.LAYOUT)
    }, C.prototype._addItems = function(a, b, c) {
        this._initItems(a), this._setTransitions(a), this.$items = this._getItems(), this._shrink(a), f(this.styleQueue, function(a) {
            a.skipTransition = !0
        }), this._processStyleQueue(!0), b ? this._addItemsToEnd(a, c) : this.shuffle(this.lastFilter)
    }, C.prototype._addItemsToEnd = function(a, b) {
        var c = this._filter(null, a),
        d = c.get();
        this._updateItemCount(), this._layout(d, !0), b && this.supported && this._setSequentialDelay(d), this._revealAppended(d)
    }, C.prototype._revealAppended = function(b) {
        g(function() {
            f(b, function(b) {
                var c = a(b);
                this._transition({
                    $item: c,
                    opacity: 1,
                    point: c.data("point"),
                    scale: x
                })
            }, this), this._whenCollectionDone(a(b), o, function() {
                a(b).css(m, "0ms"), this._movementFinished()
            })
        }, this, this.revealAppendedDelay)
    }, C.prototype._whenCollectionDone = function(b, c, d) {
        function e(b) {
            b.target === b.currentTarget && (a(b.target).off(c, e), f++, f === g && d.call(h))
        }
        var f = 0,
        g = b.length,
        h = this;
        b.on(c, e)
    }, C.prototype._whenAnimationsDone = function(b) {
        a.when.apply(null, this._animations).always(a.proxy(function() {
            this._animations.length = 0, b.call(this)
        }, this))
    }, C.prototype.shuffle = function(a, b) {
        this.enabled && !this.isTransitioning && (a || (a = v), this._filter(a), this._updateItemCount(), this._shrink(), this.sort(b))
    }, C.prototype.sort = function(a) {
        if (this.enabled && !this.isTransitioning) {
            this._resetCols();
            var b = a || this.lastSort,
            c = this._getFilteredItems().sorted(b);
            this._layout(c), this.lastSort = b
        }
    }, C.prototype.update = function(a) {
        this.enabled && !this.isTransitioning && (a || this._setColumns(), this.sort())
    }, C.prototype.layout = function() {
        this.update(!0)
    }, C.prototype.appended = function(a, b, c) {
        this._addItems(a, b === !0, c !== !1)
    }, C.prototype.disable = function() {
        this.enabled = !1
    }, C.prototype.enable = function(a) {
        this.enabled = !0, a !== !1 && this.update()
    }, C.prototype.remove = function(b) {
        function c() {
            b.remove(), this.$items = this._getItems(), this._updateItemCount(), this._fire(C.EventType.REMOVED, [b, this]), b = null
        }
        b.length && b.jquery && (this._toggleFilterClasses(a(), b), this._shrink(b), this.sort(), this.$el.one(C.EventType.LAYOUT + "." + t, a.proxy(c, this)))
    }, C.prototype.destroy = function() {
        B.off("." + this.unique), this.$el.removeClass(t).removeAttr("style").removeData(t), this.$items.removeAttr("style").removeData("point").removeData("scale").removeClass([C.ClassName.CONCEALED, C.ClassName.FILTERED, C.ClassName.SHUFFLE_ITEM].join(" ")), this.$items = null, this.$el = null, this.sizer = null, this.element = null, this.destroyed = !0
    }, a.fn.shuffle = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
            e = d.data(t);
            e ? "string" == typeof b && e[b] && e[b].apply(e, c) : (e = new C(this, b), d.data(t, e))
        })
    }, a.fn.sorted = function(b) {
        var d = a.extend({}, a.fn.sorted.defaults, b),
        e = this.get(),
        f = !1;
        return e.length ? d.randomize ? k(e) : (a.isFunction(d.by) && e.sort(function(b, e) {
            if (f) return 0;
            var g = d.by(a(b)),
            h = d.by(a(e));
            return g === c && h === c ? (f = !0, 0) : h > g || "sortFirst" === g || "sortLast" === h ? -1 : g > h || "sortLast" === g || "sortFirst" === h ? 1 : 0
        }), f ? this.get() : (d.reverse && e.reverse(), e)) : []
    }, a.fn.sorted.defaults = {
        reverse: !1,
        by: null,
        randomize: !1
    }, C
});;
/* Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
 ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
        h = i.call(arguments, 1),
        j = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
            var k = a.event.special.mousewheel = {
                version: "http://demo.roadthemes.com/maroko/wp-content/cache/minify/000000/3.1.12",
                setup: function() {
                    if (this.addEventListener)
                        for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
                            else this.onmousewheel = b;
                        a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
                    },
                    teardown: function() {
                        if (this.removeEventListener)
                            for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
                                else this.onmousewheel = null;
                            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
                        },
                        getLineHeight: function(b) {
                            var c = a(b),
                            d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
                        },
                        getPageHeight: function(b) {
                            return a(b).height()
                        },
                        settings: {
                            adjustOldDeltas: !0,
                            normalizeOffset: !0
                        }
                    };
                    a.fn.extend({
                        mousewheel: function(a) {
                            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
                        },
                        unmousewheel: function(a) {
                            return this.unbind("mousewheel", a)
                        }
                    })
                });;
(function($) {
    "use strict";
    jQuery(document).mouseup(function(e) {
        var container = jQuery('.atc-notice-wrapper');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            jQuery('.atc-notice-wrapper').fadeOut();
        }
        container = jQuery('#searchform');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            jQuery("#ws").removeClass("show");
        }
    });
    jQuery(document).ready(function() {
        jQuery('.sidebar-toggler').on('click', function() {
            if (jQuery('.sidebar-sub').hasClass('sub-open')) {
                jQuery('.sidebar-sub').addClass('sub-close');
                jQuery('.sidebar-sub').removeClass('sub-open');
                jQuery('.wrapper').addClass('sub-close');
                jQuery('.wrapper').removeClass('sub-open');
                jQuery('.home-slider').addClass('sub-close');
                jQuery('.home-slider').removeClass('sub-open');
            } else {
                jQuery('.sidebar-sub').removeClass('sub-close');
                jQuery('.sidebar-sub').addClass('sub-open');
                jQuery('.wrapper').removeClass('sub-close');
                jQuery('.wrapper').addClass('sub-open');
                jQuery('.home-slider').removeClass('sub-close');
                jQuery('.home-slider').addClass('sub-open');
            }
        });
        jQuery("#wsearchsubmit").click(function() {
            if (jQuery("#ws").width() == 0) {
                if (jQuery("#ws").hasClass("show")) {
                    jQuery("#ws").removeClass("show");
                } else {
                    jQuery("#ws").addClass("show");
                    return false;
                }
            }
        });
        jQuery('.horizontal-menu .nav-menu > ul').superfish({
            delay: 100,
            speed: 'fast'
        });
        jQuery('.primary-menu-container ul.nav-menu').superfish({
            delay: 100,
            speed: 'fast'
        });
        jQuery('.top-menu-container .nav-menu > ul').superfish({
            delay: 100,
            speed: 'fast'
        });
        jQuery('.top-menu-container ul.nav-menu').superfish({
            delay: 100,
            speed: 'fast'
        });
        var mobileMenuWrapper = jQuery('.mobile-menu-container');
        mobileMenuWrapper.find('.menu-item-has-children').each(function() {
            var linkItem = jQuery(this).find('a').first();
            linkItem.after('<i class="fa fa-plus"></i>');
        });
        var totalMenuLevelFirst = jQuery('.mobile-menu-container .nav-menu > li').length;
        var mobileMenuH = totalMenuLevelFirst * 40 + 10;
        jQuery('.mbmenu-toggler').on('click', function() {
            if (mobileMenuWrapper.hasClass('open')) {
                mobileMenuWrapper.removeClass('open');
                mobileMenuWrapper.animate({
                    'height': 0
                }, 'fast');
            } else {
                mobileMenuWrapper.addClass('open');
                mobileMenuWrapper.animate({
                    'height': mobileMenuH
                }, 'fast');
            }
        });
        jQuery('.mobile-menu-container li.menu-item-has-children').each(function() {
            jQuery(this).css({
                'height': 40,
                'overflow': 'hidden'
            });
        });
        jQuery('.mobile-menu-container li.menu-item-has-children').each(function() {
            var parentLi = jQuery(this);
            var dropdownUl = parentLi.find('ul.sub-menu').first();
            parentLi.find('.fa').first().on('click', function() {
                parentLi.parents('li.menu-item-has-children').css('height', 'auto');
                mobileMenuWrapper.css({
                    'height': 'auto'
                });
                var dropdownUlheight = dropdownUl.outerHeight() + 40;
                if (parentLi.hasClass('opensubmenu')) {
                    parentLi.removeClass('opensubmenu');
                    parentLi.animate({
                        'height': 40
                    }, 'fast', function() {
                        mobileMenuH = mobileMenuWrapper.outerHeight();
                    });
                    parentLi.find('.fa').first().removeClass('fa-minus');
                    parentLi.find('.fa').first().addClass('fa-plus');
                } else {
                    parentLi.addClass('opensubmenu');
                    parentLi.animate({
                        'height': dropdownUlheight
                    }, 'fast', function() {
                        mobileMenuH = mobileMenuWrapper.outerHeight();
                    });
                    parentLi.find('.fa').first().addClass('fa-minus');
                    parentLi.find('.fa').first().removeClass('fa-plus');
                }
            });
        });
        if (jQuery(window).width() > 1024) {
            jQuery('.widget_shopping_cart').on('mouseover', function() {
                var mCartHeight = jQuery('.mini_cart_inner').outerHeight();
                var cCartHeight = jQuery('.mini_cart_content').outerHeight();
                if (cCartHeight < mCartHeight) {
                    jQuery('.mini_cart_content').stop(true, false).animate({
                        'height': mCartHeight
                    });
                }
            });
            jQuery('.widget_shopping_cart').on('mouseleave', function() {
                jQuery('.mini_cart_content').animate({
                    'height': '0'
                });
            });
        }
        jQuery('.widget_shopping_cart').on('click', function(event) {
            if (jQuery(window).width() < 1025) {
                var closed = false;
                var mCartHeight = jQuery('.mini_cart_inner').outerHeight();
                var mCartToggler = jQuery('.cart-toggler');
                if (jQuery('.mini_cart_content').height() == 0) {
                    closed = true;
                }
                if (mCartToggler.is(event.target) || mCartToggler.has(event.target).length != 0 || mCartToggler.is(event.target)) {
                    event.preventDefault();
                    if (closed) {
                        jQuery('.mini_cart_content').animate({
                            'height': mCartHeight
                        });
                        closed = false;
                    } else {
                        jQuery('.mini_cart_content').animate({
                            'height': '0'
                        }, function() {
                            closed = true;
                        });
                    }
                }
            }
        });
        jQuery('body').append('<div class="atc-notice-wrapper"><div class="atc-notice"></div><div class="close"><i class="fa fa-times-circle"></i></div></div>');
        jQuery('.atc-notice-wrapper .close').on('click', function() {
            jQuery('.atc-notice-wrapper').fadeOut();
            jQuery('.atc-notice').html('');
        });
        jQuery('body').on('adding_to_cart', function(event, button, data) {
            var ajaxPId = button.attr('data-product_id');
            var ajaxPQty = button.attr('data-quantity');
            jQuery.post(ajaxurl, {
                'action': 'get_productinfo',
                'data': {
                    'pid': ajaxPId,
                    'quantity': ajaxPQty
                }
            }, function(response) {
                jQuery('.atc-notice').html(response);
            });
        });
        jQuery('body').on('added_to_cart', function(event, fragments, cart_hash) {
            jQuery('.atc-notice-wrapper').fadeIn();
        });
        jQuery('.home-brands .wpb_wrapper > h3').each(function() {
            var pwidgetTitle = jQuery(this).html();
            jQuery(this).html('<span>' + pwidgetTitle + '</span>');
        });
        jQuery('.brands-carousel').slick({
            rtl: road_rtl,
            infinite: true,
            slidesToShow: road_brandnumber,
            slidesToScroll: road_brandscrollnumber,
            speed: road_brandanimate,
            easing: 'linear',
            autoplay: road_brandscroll,
            autoplaySpeed: road_brandpause,
            swipeToSlide: true,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.categories-carousel').slick({
            rtl: road_rtl,
            infinite: true,
            slidesToShow: road_catenumber,
            slidesToScroll: road_catescrollnumber,
            speed: road_cateanimate,
            easing: 'linear',
            autoplay: road_catescroll,
            autoplaySpeed: road_catepause,
            swipeToSlide: true,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.products-carousel .wpb_wrapper > h3').each(function() {
            var pwidgetTitle = jQuery(this).html();
            jQuery(this).html('<span>' + pwidgetTitle + '</span>');
        });
        jQuery('.products-carousel .shop-products').slick({
            rtl: road_rtl,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 1000,
            easing: 'linear',
            swipeToSlide: true,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.products-carousel2 .wpb_wrapper > h3').each(function() {
            var pwidgetTitle = jQuery(this).html();
            jQuery(this).html('<span>' + pwidgetTitle + '</span>');
        });
        jQuery('.products-carousel2 .shop-products').slick({
            rtl: road_rtl,
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            speed: 1000,
            easing: 'linear',
            swipeToSlide: true,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.products-carousel3 .shop-products').slick({
            rtl: road_rtl,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 1000,
            easing: 'linear',
            swipeToSlide: true,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.latest-posts .wpb_wrapper > h3').each(function() {
            var pwidgetTitle = jQuery(this).html();
            jQuery(this).html('<span>' + pwidgetTitle + '</span>');
        });
        jQuery('.latest-posts .posts-carousel').slick({
            rtl: road_rtl,
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            speed: road_bloganimate,
            easing: 'linear',
            autoplay: road_blogscroll,
            swipeToSlide: true,
            autoplaySpeed: road_blogpause,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.cross-carousel .shop-products').slick({
            rtl: road_rtl,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 1000,
            easing: 'linear',
            swipeToSlide: true,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.zoom_in_marker').on('click', function() {
            jQuery.fancybox({
                href: jQuery('.woocommerce-main-image').attr('href'),
                openEffect: 'elastic',
                closeEffect: 'elastic'
            });
        });
        jQuery('.upsells .shop-products').slick({
            rtl: road_rtl,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 1000,
            easing: 'linear',
            swipeToSlide: true,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 760,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.related .shop-products').slick({
            rtl: road_rtl,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 1000,
            easing: 'linear',
            swipeToSlide: true,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 760,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        jQuery('.view-mode').each(function() {
            jQuery(this).find('.grid').on('click', function(event) {
                event.preventDefault();
                jQuery('.view-mode').find('.grid').addClass('active');
                jQuery('.view-mode').find('.list').removeClass('active');
                jQuery('#archive-product .shop-products').removeClass('list-view');
                jQuery('#archive-product .shop-products').addClass('grid-view');
                jQuery('.list-col4').removeClass('col-xs-12 col-sm-4');
                jQuery('.list-col8').removeClass('col-xs-12 col-sm-8');
            });
            jQuery(this).find('.list').on('click', function(event) {
                event.preventDefault();
                jQuery('.view-mode').find('.list').addClass('active');
                jQuery('.view-mode').find('.grid').removeClass('active');
                jQuery('#archive-product .shop-products').addClass('list-view');
                jQuery('#archive-product .shop-products').removeClass('grid-view');
                jQuery('.list-col4').addClass('col-xs-12 col-sm-4');
                jQuery('.list-col8').addClass('col-xs-12 col-sm-8');
            });
        });
        jQuery('.yith-wcwl-add-to-wishlist a').each(function() {
            roadtip(jQuery(this), 'html');
        });
        jQuery('.compare-button a').each(function() {
            roadtip(jQuery(this), 'html');
        });
        jQuery('.add_to_cart_inline a').each(function() {
            roadtip(jQuery(this), 'html');
        });
        jQuery('.quickviewbtn .quickview').each(function() {
            roadtip(jQuery(this), 'html');
        });
        jQuery('.sharefriend a').each(function() {
            roadtip(jQuery(this), 'html');
        });
        jQuery('.social-icons a').each(function() {
            roadtip(jQuery(this), 'title');
        });
        jQuery('.product-wrapper').each(function() {
            jQuery(this).on('mouseover click', function() {
                jQuery(this).addClass('hover');
            });
            jQuery(this).on('mouseleave', function() {
                jQuery(this).removeClass('hover');
            });
        });
        jQuery('body').append('<div class="quickview-wrapper"><div class="quick-modal"><span class="closeqv"><i class="fa fa-times"></i></span><div id="quickview-content"></div><div class="clearfix"></div></div></div>');
        jQuery('.quickview').each(function() {
            var quickviewLink = jQuery(this);
            var productID = quickviewLink.attr('data-quick-id');
            quickviewLink.on('click', function(event) {
                event.preventDefault();
                jQuery('#quickview-content').html('');
                jQuery('body').addClass('quickview');
                window.setTimeout(function() {
                    jQuery('.quickview-wrapper').addClass('open');
                    jQuery('.quick-modal').addClass('loading');
                    jQuery.post(ajaxurl, {
                        'action': 'product_quickview',
                        'data': productID
                    }, function(response) {
                        jQuery('#quickview-content').html(response);
                        jQuery('.quick-modal').removeClass('loading');
                        jQuery('.variations_form').wc_variation_form();
                        jQuery('.variations_form .variations select').change();
                        jQuery('.quick-thumbnails')
                        jQuery('.quick-thumbnails').slick({
                            rtl: road_rtl,
                            slidesToScroll: 1,
                            slidesToShow: 4
                        });
                        jQuery('.quick-thumbnails a').each(function() {
                            var quickThumb = jQuery(this);
                            var quickImgSrc = quickThumb.attr('href');
                            quickThumb.on('click', function(event) {
                                event.preventDefault();
                                jQuery('.main-image').find('img').attr('src', quickImgSrc);
                            });
                        });
                        jQuery('.woocommerce-review-link').on('click', function(event) {
                            event.preventDefault();
                            var reviewLink = jQuery('.see-all').attr('href');
                            window.location.href = reviewLink + '#reviews';
                        });
                    });
                }, 300);
            });
        });
        jQuery('.closeqv').on('click', function(event) {
            jQuery('.quickview-wrapper').removeClass('open');
            window.setTimeout(function() {
                jQuery('body').removeClass('quickview');
            }, 500);
        });
        jQuery(".fancybox").fancybox({
            openEffect: 'elastic',
            closeEffect: 'fade',
            beforeShow: function() {
                if (this.title) {
                    this.title += '<div class="fancybox-social">';
                    this.title += '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="' + this.href + '">Tweet</a> ';
                    this.title += '<iframe src="//www.facebook.com/plugins/like.php?href=' + this.href + '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:110px; height:23px;" allowTransparency="true"></iframe></div>';
                }
            },
            afterShow: function() {
                twttr.widgets.load();
            },
            helpers: {
                title: {
                    type: 'inside'
                },
                overlay: {
                    showEarly: false
                }
            }
        });
        jQuery('#back-top').on('click', function() {
            jQuery("html, body").animate({
                scrollTop: 0
            }, "slow");
        });
    });
var currentP = 0;
jQuery(window).scroll(function() {
    var headerH = jQuery('.header-container').height();
    var navH = jQuery('.nav-container').height();
    headerH += navH;
    var scrollP = jQuery(window).scrollTop();
    if (jQuery(window).width() > 1024) {
        if (scrollP != currentP) {
            if (scrollP >= headerH) {
                jQuery('#back-top').addClass('show');
                jQuery('.nav-container').addClass('ontop');
            } else {
                jQuery('#back-top').removeClass('show');
                jQuery('.nav-container').removeClass('ontop');
            }
            currentP = jQuery(window).scrollTop();
        }
    }
});
})(jQuery);
"use strict";

function RoadgetParameterByName(name, string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(string);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function roadtabCarousel(element, itemnumber) {
    jQuery(element).slick({
        rtl: road_rtl,
        infinite: false,
        slidesToShow: itemnumber,
        slidesToScroll: 1,
        speed: 700,
        easing: 'linear',
        swipeToSlide: true,
        autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: itemnumber,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 960,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 760,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
}

function roadMiniCartRemove(url, itemid) {
    jQuery('.mini_cart_content').addClass('loading');
    jQuery('.cart-form').addClass('loading');
    jQuery.get(url, function(data, status) {
        if (status == 'success') {
            jQuery.post(ajaxurl, {
                'action': 'get_cartinfo'
            }, function(response) {
                var cartinfo = response.split("|");
                var itemAmount = cartinfo[0];
                var cartTotal = cartinfo[1];
                var orderTotal = cartinfo[2];
                jQuery('.cart-quantity').html(itemAmount);
                jQuery('.cart-total .amount').html(cartTotal);
                jQuery('.total .amount').html(cartTotal);
                jQuery('.cart-subtotal .amount').html(cartTotal);
                jQuery('.order-total .amount').html(orderTotal);
            });
            jQuery('#mcitem-' + itemid).animate({
                'height': '0',
                'margin-bottom': '0',
                'padding-bottom': '0',
                'padding-top': '0'
            });
            setTimeout(function() {
                jQuery('#mcitem-' + itemid).remove();
                jQuery('#lcitem-' + itemid).remove();
                var mCartHeight = jQuery('.mini_cart_inner').outerHeight();
                jQuery('.mini_cart_content').animate({
                    'height': mCartHeight
                });
            }, 1000);
            jQuery('.mini_cart_content').removeClass('loading');
            jQuery('.cart-form').removeClass('loading');
        }
    });
}

function roadtip(element, content) {
    if (content == 'html') {
        var tipText = element.html();
    } else {
        var tipText = element.attr('title');
    }
    element.on('mouseover', function() {
        if (jQuery('.roadtip').length == 0) {
            element.before('<span class="roadtip">' + tipText + '</span>');
            var tipWidth = jQuery('.roadtip').outerWidth();
            var tipPush = -(tipWidth / 2 - element.outerWidth() / 2);
            jQuery('.roadtip').css('margin-left', tipPush);
        }
    });
    element.on('mouseleave', function() {
        jQuery('.roadtip').remove();
    });
};
(function($) {
    jQuery(document).ready(function() {
        jQuery('#mega_main_menu, #mega_main_menu *').unbind();
        mmm_reversal_z_index();
        // mmm_smooth_scroll_to_anchor();
        mmm_sticky_menu();
        mmm_fullwidth_menu();
        mmm_height_of_tabs_dropdown();
        mmm_keep_open();
        mmm_pushing_content();
        mmm_mobile_double_tap_to_go();
        mmm_mobile_toggle_menu();
        jQuery(window).on('resize orientationchange', function() {
            jQuery('#mega_main_menu, #mega_main_menu *').unbind();
            mmm_smooth_scroll_to_anchor();
            mmm_sticky_menu();
            mmm_fullwidth_menu();
            mmm_height_of_tabs_dropdown();
            mmm_keep_open();
            mmm_pushing_content();
            mmm_mobile_toggle_menu();
            mmm_mobile_double_tap_to_go();
        });

        function mmm_reversal_z_index() {
            var z_index = 5000;
            jQuery('.mega_main_menu').each(function(index, element) {
                z_index = z_index - 10;
                jQuery(element).css({
                    'z-index': z_index
                });
            });
        }

        function mmm_mobile_toggle_menu() {
            jQuery('.mobile_menu_active').removeClass('mobile_menu_active');
            jQuery('.mobile_toggle').on('click', function() {
                if (jQuery(this).parent().hasClass('mobile_menu_active')) {
                    jQuery(this).parent().removeClass('mobile_menu_active');
                    jQuery('#mega_main_menu .keep_open').removeClass('keep_open');
                } else {
                    jQuery(this).parent().addClass('mobile_menu_active');
                }
            });
        }

        function mmm_mobile_double_tap_to_go() {
            if (/iphone|ipad|ipod|android|webos|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
                var clicked_item = false;
                jQuery('#mega_main_menu li:has(.mega_dropdown) > .item_link').on('click', function(index) {
                    if (clicked_item != this) {
                        index.preventDefault();
                        if (jQuery(this).parent().parent().parent().hasClass('keep_open')) {} else {
                            jQuery('#mega_main_menu .keep_open').removeClass('keep_open');
                        }
                        jQuery(this).parent().addClass('keep_open');
                        clicked_item = this;
                    }
                });
            }
        }

        function mmm_sticky_menu() {;
            jQuery('#mega_main_menu > .menu_holder').each(function(index, element) {
                var stickyoffset = [];
                var menu_inner_width = [];
                var menu_inner = [];
                var style_attr = [];
                menu_inner[index] = jQuery(element).find('.menu_inner');
                stickyoffset[index] = jQuery(element).data('stickyoffset') * 1;
                if (jQuery(element).attr('data-sticky') == '1' && stickyoffset[index] == 0) {
                    menu_inner_width[index] = menu_inner[index].parents('.mega_main_menu').width();
                    menu_inner[index].attr('style', 'width:' + menu_inner_width[index] + 'px;');
                    jQuery(element).addClass('sticky_container');
                } else {;
                    jQuery(window).on('scroll', function() {
                        if (jQuery(element).attr('data-sticky') == '1') {
                            scrollpath = jQuery(window).scrollTop();
                            if (scrollpath > stickyoffset[index]) {
                                menu_inner_width[index] = menu_inner[index].parents('.mega_main_menu').width();
                                jQuery(element).find('.menu_inner').attr('style', 'width:' + menu_inner_width[index] + 'px;');
                                if (!jQuery(element).hasClass('sticky_container')) {
                                    jQuery(element).addClass('sticky_container');
                                }
                            } else {
                                mmm_fullwidth_menu();
                                jQuery(element).removeClass('sticky_container');
                                style_attr[index] = jQuery(menu_inner[index]).attr('style');
                                if (typeof style_attr[index] !== 'undefined' && style_attr[index] !== false) {
                                    menu_inner[index].removeAttr('style');
                                }
                            }
                        } else {
                            jQuery(element).removeClass('sticky_container');
                        }
                    });
                }
            });
        }

        function mmm_fullwidth_menu() {
            body_width = jQuery('body').width();
            jQuery('.mega_main_menu.direction-horizontal.fullwidth-enable').each(function(index, element) {
                offset_left = jQuery(element).offset().left;
                if (jQuery(element).hasClass('coercive_styles-enable')) {
                    rules_priority = ' !important';
                } else {
                    rules_priority = '';
                }
                jQuery(element).find('.mmm_fullwidth_container').attr('style', 'width:' + body_width + 'px' + rules_priority + ';left: -' + offset_left + 'px' + rules_priority + ';right:auto' + rules_priority + ';');
            });
        }

        function mmm_height_of_tabs_dropdown() {
            jQuery('#mega_main_menu.dropdowns_trigger-hover .tabs_dropdown > .mega_dropdown > li').on('hover', function() {
                jQuery(this).parent().css({
                    "min-height": jQuery(this).find(' > .mega_dropdown').outerHeight(true)
                });
            });
            jQuery('#mega_main_menu.dropdowns_trigger-hover .tabs_dropdown > .mega_dropdown > li').on('mouseleave', function() {
                jQuery(this).parent().css({
                    "min-height": '0px'
                });
            });
            jQuery('#mega_main_menu.dropdowns_trigger-click .tabs_dropdown > .mega_dropdown > li').on('click', function() {
                jQuery(this).parent().parent().find('.mega_dropdown').css({
                    "min-height": '0px'
                });
                jQuery(this).parent().css({
                    "min-height": jQuery(this).find(' > .mega_dropdown').outerHeight(true)
                });
            });
        }

        function mmm_pushing_content() {
            jQuery('.mega_main_menu.direction-horizontal.pushing_content-enable').each(function(index, element) {
                if (jQuery(element).hasClass('coercive_styles-enable')) {
                    rules_priority = ' !important';
                } else {
                    rules_priority = '';
                }
                menu_holder_height = jQuery(element).find('.menu_holder').outerHeight(true);
                click_item = false;
                if (jQuery(element).hasClass('dropdowns_trigger-click')) {
                    dropdowns_trigger = 'click';
                    if (jQuery('.mega_main_menu .nav_logo.mobile_menu_active').length) {} else {
                        jQuery('body').on(dropdowns_trigger, function(body_el) {
                            menu_item_class = jQuery(body_el.target).closest('.menu-item').attr('class');
                            if (typeof jQuery(body_el.target).parents('.menu-item').attr('class') != 'undefined') {
                                jQuery(element).css({
                                    height: menu_holder_height + jQuery(this).find('.mega_main_menu_ul > li.keep_open > .mega_dropdown').outerHeight(true) + rules_priority
                                });
                                if (click_item == menu_item_class) {
                                    jQuery(element).css({
                                        height: menu_holder_height
                                    });
                                    click_item = false;
                                } else {
                                    click_item = jQuery(body_el.target).closest('.menu-item').attr('class');
                                }
                            } else {
                                jQuery(element).css({
                                    height: menu_holder_height
                                });
                                click_item = false;
                            }
                        });
                    }
                } else {
                    dropdowns_trigger = 'hover mouseleave';
                    if (jQuery('.mega_main_menu .nav_logo.mobile_menu_active').length) {} else {
                        jQuery(element).find('li').on(dropdowns_trigger, function(body_el) {
                            jQuery(element).css({
                                height: menu_holder_height + jQuery(element).find('.mega_main_menu_ul > li:hover > .mega_dropdown').outerHeight(true) + rules_priority
                            });
                        });
                    }
                }
            });
        }

        // function mmm_smooth_scroll_to_anchor() {
        //     jQuery('#mega_main_menu a[href*=#]:not([href=#])').click(function() {
        //         if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        //             var target = jQuery(this.hash);
        //             target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + '], [id=' + this.hash.slice(1) + ']');
        //             if (target.length) {
        //                 jQuery('#mega_main_menu .current-menu-item').removeClass('current-menu-item');
        //                 jQuery(this).parent().addClass('current-menu-item');
        //                 jQuery('html,body').animate({
        //                     scrollTop: target.offset().top - 90
        //                 }, 600);
        //                 return false;
        //             }
        //         }
        //     });
        // };

        function mmm_keep_open() {
            jQuery('#mega_main_menu .menu-item *').on('focus', function(index) {
                jQuery(this).parents('.menu-item, .post_item').addClass('keep_open');
            })
            jQuery('#mega_main_menu .menu-item *').on('blur', function(index) {
                jQuery(this).parents('.menu-item, .post_item').removeClass('keep_open');
            })
            click_item_2 = false;
            jQuery('body').on('click', function(body_el) {
                menu_item_class = jQuery(body_el.target).closest('.menu-item').attr('class');
                if ((click_item_2 != menu_item_class) && (typeof jQuery(body_el.target).parents('#mega_main_menu.dropdowns_trigger-click .menu-item:has(.mega_dropdown) > .item_link').attr('class') != 'undefined')) {
                    body_el.preventDefault();
                    jQuery(body_el.target).parents('.menu-item').addClass('keep_open');
                    click_item_2 = jQuery(body_el.target).closest('.menu-item').attr('class');
                } else if ((click_item_2 == menu_item_class)) {
                    jQuery(body_el.target).closest('.menu-item').removeClass('keep_open');
                    click_item_2 = false;
                } else {
                    jQuery('.menu-item').removeClass('keep_open');
                    click_item_2 = false;
                }
            });
        }
    });
})(jQuery);;
! function(a, b) {
    "use strict";

    function c() {
        if (!e) {
            e = !0;
            var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
            h = !!navigator.userAgent.match(/Trident.*rv:11\./),
            i = b.querySelectorAll("iframe.wp-embedded-content");
            for (c = 0; c < i.length; c++) {
                if (d = i[c], !d.getAttribute("data-secret")) f = Math.random().toString(36).substr(2, 10), d.src += "#?secret=" + f, d.setAttribute("data-secret", f);
                if (g || h) a = d.cloneNode(!0), a.removeAttribute("security"), d.parentNode.replaceChild(a, d)
            }
    }
}
var d = !1,
e = !1;
if (b.querySelector)
    if (a.addEventListener) d = !0;
if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage)
    if (a.wp.receiveEmbedMessage = function(c) {
        var d = c.data;
        if (d.secret || d.message || d.value)
            if (!/[^a-zA-Z0-9]/.test(d.secret)) {
                var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
                k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
                for (e = 0; e < k.length; e++) k[e].style.display = "none";
                    for (e = 0; e < j.length; e++)
                        if (f = j[e], c.source === f.contentWindow) {
                            if (f.removeAttribute("style"), "height" === d.message) {
                                if (g = parseInt(d.value, 10), g > 1e3) g = 1e3;
                                else if (~~g < 200) g = 200;
                                f.height = g
                            }
                            if ("link" === d.message)
                                if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host)
                                    if (b.activeElement === f) a.top.location.href = d.value
                                } else;
                        }
                    }, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
}(window, document);
(function($) {
    "use strict";
    jQuery('a.yith_magnifier_thumbnail').live('click', function() {
        jQuery('a.yith_magnifier_thumbnail').removeClass('active');
        jQuery(this).addClass('active');
    });
    jQuery('.toolbar .orderby').chosen({
        disable_search: true,
        width: "auto"
    });
    jQuery('.wcml_currency_switcher').chosen({
        disable_search: true,
        width: "auto"
    });
})(jQuery);
"use strict";