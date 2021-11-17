/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var m, aa = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    },
    ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    },
    ca = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    },
    da = ca(this),
    n = function(a, b) {
        if (b) a: {
            var c = da;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ba(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    };
n("Symbol", function(a) {
    if (a) return a;
    var b = function(f, g) {
        this.se = f;
        ba(this, "description", {
            configurable: !0,
            writable: !0,
            value: g
        })
    };
    b.prototype.toString = function() {
        return this.se
    };
    var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
        d = 0,
        e = function(f) {
            if (this instanceof e) throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + d++, f)
        };
    return e
});
n("Symbol.iterator", function(a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
        var d = da[b[c]];
        "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return ea(aa(this))
            }
        })
    }
    return a
});
var ea = function(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        };
        return a
    },
    t = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        }
    },
    fa = function(a) {
        if (!(a instanceof Array)) {
            a = t(a);
            for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
            a = c
        }
        return a
    },
    ha = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    },
    ia;
if ("function" == typeof Object.setPrototypeOf) ia = Object.setPrototypeOf;
else {
    var ja;
    a: {
        var ka = {
                a: !0
            },
            la = {};
        try {
            la.__proto__ = ka;
            ja = la.a;
            break a
        } catch (a) {}
        ja = !1
    }
    ia = ja ? function(a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
        return a
    } : null
}
var ma = ia,
    u = function(a, b) {
        a.prototype = ha(b.prototype);
        a.prototype.constructor = a;
        if (ma) ma(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.sa = b.prototype
    },
    na = function() {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
        return b
    };
n("Promise", function(a) {
    function b() {
        this.ia = null
    }

    function c(g) {
        return g instanceof e ? g : new e(function(h) {
            h(g)
        })
    }
    if (a) return a;
    b.prototype.bd = function(g) {
        if (null == this.ia) {
            this.ia = [];
            var h = this;
            this.cd(function() {
                h.bf()
            })
        }
        this.ia.push(g)
    };
    var d = da.setTimeout;
    b.prototype.cd = function(g) {
        d(g, 0)
    };
    b.prototype.bf = function() {
        for (; this.ia && this.ia.length;) {
            var g = this.ia;
            this.ia = [];
            for (var h = 0; h < g.length; ++h) {
                var k = g[h];
                g[h] = null;
                try {
                    k()
                } catch (l) {
                    this.Ee(l)
                }
            }
        }
        this.ia = null
    };
    b.prototype.Ee = function(g) {
        this.cd(function() {
            throw g;
        })
    };
    var e = function(g) {
        this.Ka = 0;
        this.hb = void 0;
        this.Fa = [];
        this.Kd = !1;
        var h = this.dc();
        try {
            g(h.resolve, h.reject)
        } catch (k) {
            h.reject(k)
        }
    };
    e.prototype.dc = function() {
        function g(l) {
            return function(p) {
                k || (k = !0, l.call(h, p))
            }
        }
        var h = this,
            k = !1;
        return {
            resolve: g(this.Wf),
            reject: g(this.Dc)
        }
    };
    e.prototype.Wf = function(g) {
        if (g === this) this.Dc(new TypeError("A Promise cannot resolve to itself"));
        else if (g instanceof e) this.ig(g);
        else {
            a: switch (typeof g) {
                case "object":
                    var h = null != g;
                    break a;
                case "function":
                    h = !0;
                    break a;
                default:
                    h = !1
            }
            h ? this.Vf(g) : this.vd(g)
        }
    };
    e.prototype.Vf = function(g) {
        var h = void 0;
        try {
            h = g.then
        } catch (k) {
            this.Dc(k);
            return
        }
        "function" == typeof h ? this.jg(h, g) : this.vd(g)
    };
    e.prototype.Dc = function(g) {
        this.oe(2, g)
    };
    e.prototype.vd = function(g) {
        this.oe(1, g)
    };
    e.prototype.oe = function(g, h) {
        if (0 != this.Ka) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.Ka);
        this.Ka = g;
        this.hb = h;
        2 === this.Ka && this.Zf();
        this.cf()
    };
    e.prototype.Zf = function() {
        var g = this;
        d(function() {
            if (g.Lf()) {
                var h = da.console;
                "undefined" !== typeof h && h.error(g.hb)
            }
        }, 1)
    };
    e.prototype.Lf = function() {
        if (this.Kd) return !1;
        var g = da.CustomEvent,
            h = da.Event,
            k = da.dispatchEvent;
        if ("undefined" === typeof k) return !0;
        "function" === typeof g ? g = new g("unhandledrejection", {
            cancelable: !0
        }) : "function" === typeof h ? g = new h("unhandledrejection", {
            cancelable: !0
        }) : (g = da.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
        g.promise = this;
        g.reason = this.hb;
        return k(g)
    };
    e.prototype.cf = function() {
        if (null != this.Fa) {
            for (var g =
                    0; g < this.Fa.length; ++g) f.bd(this.Fa[g]);
            this.Fa = null
        }
    };
    var f = new b;
    e.prototype.ig = function(g) {
        var h = this.dc();
        g.qb(h.resolve, h.reject)
    };
    e.prototype.jg = function(g, h) {
        var k = this.dc();
        try {
            g.call(h, k.resolve, k.reject)
        } catch (l) {
            k.reject(l)
        }
    };
    e.prototype.then = function(g, h) {
        function k(w, r) {
            return "function" == typeof w ? function(v) {
                try {
                    l(w(v))
                } catch (y) {
                    p(y)
                }
            } : r
        }
        var l, p, q = new e(function(w, r) {
            l = w;
            p = r
        });
        this.qb(k(g, l), k(h, p));
        return q
    };
    e.prototype.catch = function(g) {
        return this.then(void 0, g)
    };
    e.prototype.qb = function(g,
        h) {
        function k() {
            switch (l.Ka) {
                case 1:
                    g(l.hb);
                    break;
                case 2:
                    h(l.hb);
                    break;
                default:
                    throw Error("Unexpected state: " + l.Ka);
            }
        }
        var l = this;
        null == this.Fa ? f.bd(k) : this.Fa.push(k);
        this.Kd = !0
    };
    e.resolve = c;
    e.reject = function(g) {
        return new e(function(h, k) {
            k(g)
        })
    };
    e.race = function(g) {
        return new e(function(h, k) {
            for (var l = t(g), p = l.next(); !p.done; p = l.next()) c(p.value).qb(h, k)
        })
    };
    e.all = function(g) {
        var h = t(g),
            k = h.next();
        return k.done ? c([]) : new e(function(l, p) {
            function q(v) {
                return function(y) {
                    w[v] = y;
                    r--;
                    0 == r && l(w)
                }
            }
            var w = [],
                r = 0;
            do w.push(void 0), r++, c(k.value).qb(q(w.length - 1), p), k = h.next(); while (!k.done)
        })
    };
    return e
});
var oa = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
n("WeakMap", function(a) {
    function b() {}

    function c(k) {
        var l = typeof k;
        return "object" === l && null !== k || "function" === l
    }

    function d(k) {
        if (!oa(k, f)) {
            var l = new b;
            ba(k, f, {
                value: l
            })
        }
    }

    function e(k) {
        var l = Object[k];
        l && (Object[k] = function(p) {
            if (p instanceof b) return p;
            Object.isExtensible(p) && d(p);
            return l(p)
        })
    }
    if (function() {
            if (!a || !Object.seal) return !1;
            try {
                var k = Object.seal({}),
                    l = Object.seal({}),
                    p = new a([
                        [k, 2],
                        [l, 3]
                    ]);
                if (2 != p.get(k) || 3 != p.get(l)) return !1;
                p.delete(k);
                p.set(l, 4);
                return !p.has(k) && 4 == p.get(l)
            } catch (q) {
                return !1
            }
        }()) return a;
    var f = "$jscomp_hidden_" + Math.random();
    e("freeze");
    e("preventExtensions");
    e("seal");
    var g = 0,
        h = function(k) {
            this.Xa = (g += Math.random() + 1).toString();
            if (k) {
                k = t(k);
                for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
            }
        };
    h.prototype.set = function(k, l) {
        if (!c(k)) throw Error("Invalid WeakMap key");
        d(k);
        if (!oa(k, f)) throw Error("WeakMap key fail: " + k);
        k[f][this.Xa] = l;
        return this
    };
    h.prototype.get = function(k) {
        return c(k) && oa(k, f) ? k[f][this.Xa] : void 0
    };
    h.prototype.has = function(k) {
        return c(k) && oa(k, f) && oa(k[f],
            this.Xa)
    };
    h.prototype.delete = function(k) {
        return c(k) && oa(k, f) && oa(k[f], this.Xa) ? delete k[f][this.Xa] : !1
    };
    return h
});
n("Map", function(a) {
    if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var h = Object.seal({
                        x: 4
                    }),
                    k = new a(t([
                        [h, "s"]
                    ]));
                if ("s" != k.get(h) || 1 != k.size || k.get({
                        x: 4
                    }) || k.set({
                        x: 4
                    }, "t") != k || 2 != k.size) return !1;
                var l = k.entries(),
                    p = l.next();
                if (p.done || p.value[0] != h || "s" != p.value[1]) return !1;
                p = l.next();
                return p.done || 4 != p.value[0].x || "t" != p.value[1] || !l.next().done ? !1 : !0
            } catch (q) {
                return !1
            }
        }()) return a;
    var b = new WeakMap,
        c = function(h) {
            this.Ta = {};
            this.fa =
                f();
            this.size = 0;
            if (h) {
                h = t(h);
                for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
            }
        };
    c.prototype.set = function(h, k) {
        h = 0 === h ? 0 : h;
        var l = d(this, h);
        l.list || (l.list = this.Ta[l.id] = []);
        l.C ? l.C.value = k : (l.C = {
            next: this.fa,
            ga: this.fa.ga,
            head: this.fa,
            key: h,
            value: k
        }, l.list.push(l.C), this.fa.ga.next = l.C, this.fa.ga = l.C, this.size++);
        return this
    };
    c.prototype.delete = function(h) {
        h = d(this, h);
        return h.C && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.Ta[h.id], h.C.ga.next = h.C.next, h.C.next.ga = h.C.ga,
            h.C.head = null, this.size--, !0) : !1
    };
    c.prototype.clear = function() {
        this.Ta = {};
        this.fa = this.fa.ga = f();
        this.size = 0
    };
    c.prototype.has = function(h) {
        return !!d(this, h).C
    };
    c.prototype.get = function(h) {
        return (h = d(this, h).C) && h.value
    };
    c.prototype.entries = function() {
        return e(this, function(h) {
            return [h.key, h.value]
        })
    };
    c.prototype.keys = function() {
        return e(this, function(h) {
            return h.key
        })
    };
    c.prototype.values = function() {
        return e(this, function(h) {
            return h.value
        })
    };
    c.prototype.forEach = function(h, k) {
        for (var l = this.entries(),
                p; !(p = l.next()).done;) p = p.value, h.call(k, p[1], p[0], this)
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    var d = function(h, k) {
            var l = k && typeof k;
            "object" == l || "function" == l ? b.has(k) ? l = b.get(k) : (l = "" + ++g, b.set(k, l)) : l = "p_" + k;
            var p = h.Ta[l];
            if (p && oa(h.Ta, l))
                for (h = 0; h < p.length; h++) {
                    var q = p[h];
                    if (k !== k && q.key !== q.key || k === q.key) return {
                        id: l,
                        list: p,
                        index: h,
                        C: q
                    }
                }
            return {
                id: l,
                list: p,
                index: -1,
                C: void 0
            }
        },
        e = function(h, k) {
            var l = h.fa;
            return ea(function() {
                if (l) {
                    for (; l.head != h.fa;) l = l.ga;
                    for (; l.next != l.head;) return l =
                        l.next, {
                            done: !1,
                            value: k(l)
                        };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        },
        f = function() {
            var h = {};
            return h.ga = h.next = h.head = h
        },
        g = 0;
    return c
});
n("Array.prototype.find", function(a) {
    return a ? a : function(b, c) {
        a: {
            var d = this;d instanceof String && (d = String(d));
            for (var e = d.length, f = 0; f < e; f++) {
                var g = d[f];
                if (b.call(c, g, f, d)) {
                    b = g;
                    break a
                }
            }
            b = void 0
        }
        return b
    }
});
n("Set", function(a) {
    if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var c = Object.seal({
                        x: 4
                    }),
                    d = new a(t([c]));
                if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                        x: 4
                    }) != d || 2 != d.size) return !1;
                var e = d.entries(),
                    f = e.next();
                if (f.done || f.value[0] != c || f.value[1] != c) return !1;
                f = e.next();
                return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
            } catch (g) {
                return !1
            }
        }()) return a;
    var b = function(c) {
        this.aa = new Map;
        if (c) {
            c =
                t(c);
            for (var d; !(d = c.next()).done;) this.add(d.value)
        }
        this.size = this.aa.size
    };
    b.prototype.add = function(c) {
        c = 0 === c ? 0 : c;
        this.aa.set(c, c);
        this.size = this.aa.size;
        return this
    };
    b.prototype.delete = function(c) {
        c = this.aa.delete(c);
        this.size = this.aa.size;
        return c
    };
    b.prototype.clear = function() {
        this.aa.clear();
        this.size = 0
    };
    b.prototype.has = function(c) {
        return this.aa.has(c)
    };
    b.prototype.entries = function() {
        return this.aa.entries()
    };
    b.prototype.values = function() {
        return this.aa.values()
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function(c, d) {
        var e = this;
        this.aa.forEach(function(f) {
            return c.call(d, f, f, e)
        })
    };
    return b
});
var pa = function(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
};
n("Array.prototype.entries", function(a) {
    return a ? a : function() {
        return pa(this, function(b, c) {
            return [b, c]
        })
    }
});
n("Array.prototype.values", function(a) {
    return a ? a : function() {
        return pa(this, function(b, c) {
            return c
        })
    }
});
n("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return pa(this, function(b) {
            return b
        })
    }
});
n("Array.from", function(a) {
    return a ? a : function(b, c, d) {
        c = null != c ? c : function(h) {
            return h
        };
        var e = [],
            f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
        if ("function" == typeof f) {
            b = f.call(b);
            for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
        } else
            for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
        return e
    }
});
var qa = qa || {},
    x = this || self,
    ra = function() {},
    sa = function(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    },
    ta = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    },
    ua = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    },
    wa = function(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b,
                arguments)
        }
    },
    xa = function(a, b, c) {
        xa = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ua : wa;
        return xa.apply(null, arguments)
    },
    ya = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    },
    z = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.sa = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.ug = function(d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h -
                2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    },
    za = function(a) {
        return a
    };

function Aa(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Aa);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a))
}
z(Aa, Error);
Aa.prototype.name = "CustomError";
var Ba = function(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
    Aa.call(this, c + a[d])
};
z(Ba, Aa);
Ba.prototype.name = "AssertionError";
var Ca = function(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else a && (e += ": " + a, f = b);
        throw new Ba("" + e, f || []);
    },
    A = function(a, b, c) {
        a || Ca("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    },
    Da = function(a, b) {
        throw new Ba("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    },
    Ea = function(a, b, c) {
        "string" !== typeof a && Ca("Expected string but got %s: %s.", [sa(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Fa = function(a, b, c) {
        Array.isArray(a) || Ca("Expected array but got %s: %s.", [sa(a), a], b, Array.prototype.slice.call(arguments, 2))
    },
    Ha = function(a, b, c, d) {
        a instanceof b || Ca("Expected instanceof %s but got %s.", [Ga(b), Ga(a)], c, Array.prototype.slice.call(arguments, 3));
        return a
    },
    Ga = function(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };
var Ia = function(a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        255 < e && (b[c++] = e & 255, e >>= 8);
        b[c++] = e
    }
    return b
};
var Ja = Array.prototype.indexOf ? function(a, b) {
        A(null != a.length);
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function(a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    },
    Ka = Array.prototype.forEach ? function(a, b) {
        A(null != a.length);
        Array.prototype.forEach.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
    };

function La(a, b) {
    b = Ja(a, b);
    var c;
    if (c = 0 <= b) A(null != a.length), Array.prototype.splice.call(a, b, 1);
    return c
};
var Ma = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    },
    Na = /&/g,
    Oa = /</g,
    Pa = />/g,
    Qa = /"/g,
    Ra = /'/g,
    Sa = /\x00/g,
    Ta = /[\x00&<>"']/,
    Va = function(a, b) {
        var c = 0;
        a = Ma(String(a)).split(".");
        b = Ma(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || "",
                g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length) break;
                c = Ua(0 == f[1].length ? 0 : parseInt(f[1],
                    10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || Ua(0 == f[2].length, 0 == g[2].length) || Ua(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    },
    Ua = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
var Wa;
a: {
    var Xa = x.navigator;
    if (Xa) {
        var Ya = Xa.userAgent;
        if (Ya) {
            Wa = Ya;
            break a
        }
    }
    Wa = ""
}

function B(a) {
    return -1 != Wa.indexOf(a)
};

function Za() {
    return B("Opera")
}

function $a() {
    return B("Trident") || B("MSIE")
}

function ab() {
    return B("Firefox") || B("FxiOS")
}

function bb() {
    return B("Safari") && !(cb() || B("Coast") || Za() || B("Edge") || B("Edg/") || B("OPR") || ab() || B("Silk") || B("Android"))
}

function cb() {
    return (B("Chrome") || B("CriOS")) && !B("Edge")
}

function db() {
    return B("Android") && !(cb() || ab() || Za() || B("Silk"))
}

function eb(a) {
    var b = {};
    a.forEach(function(c) {
        b[c[0]] = c[1]
    });
    return function(c) {
        return b[c.find(function(d) {
            return d in b
        })] || ""
    }
}

function fb() {
    var a = Wa;
    if ($a()) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1]) a = b[1];
        else {
            b = "";
            var c = /MSIE +([\d\.]+)/.exec(a);
            if (c && c[1])
                if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
                    if (a && a[1]) switch (a[1]) {
                        case "4.0":
                            b = "8.0";
                            break;
                        case "5.0":
                            b = "9.0";
                            break;
                        case "6.0":
                            b = "10.0";
                            break;
                        case "7.0":
                            b = "11.0"
                    } else b = "7.0";
                    else b = c[1];
            a = b
        }
        return a
    }
    c = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g");
    b = [];
    for (var d; d = c.exec(a);) b.push([d[1], d[2], d[3] || void 0]);
    a = eb(b);
    return Za() ? a(["Version", "Opera"]) : B("Edge") ?
        a(["Edge"]) : B("Edg/") ? a(["Edg"]) : cb() ? a(["Chrome", "CriOS", "HeadlessChrome"]) : (a = b[2]) && a[1] || ""
};

function gb() {
    return B("iPhone") && !B("iPod") && !B("iPad")
}

function hb() {
    var a = Wa,
        b = "";
    B("Windows") ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : gb() || B("iPad") || B("iPod") ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : B("Macintosh") ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : -1 != Wa.toLowerCase().indexOf("kaios") ? (b = /(?:KaiOS)\/(\S+)/i, b = (a = b.exec(a)) && a[1]) : B("Android") ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : B("CrOS") && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,
        b = (a = b.exec(a)) && a[1]);
    return 0 <= Va(b || "", 12)
};
var ib = function(a) {
    ib[" "](a);
    return a
};
ib[" "] = ra;
var kb = function(a, b) {
    var c = jb;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
};
var lb = Za(),
    mb = $a(),
    nb = B("Edge"),
    ob = B("Gecko") && !(-1 != Wa.toLowerCase().indexOf("webkit") && !B("Edge")) && !(B("Trident") || B("MSIE")) && !B("Edge"),
    pb = -1 != Wa.toLowerCase().indexOf("webkit") && !B("Edge"),
    qb;
a: {
    var rb = "",
        sb = function() {
            var a = Wa;
            if (ob) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (nb) return /Edge\/([\d\.]+)/.exec(a);
            if (mb) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (pb) return /WebKit\/(\S+)/.exec(a);
            if (lb) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();sb && (rb = sb ? sb[1] : "");
    if (mb) {
        var tb, ub = x.document;
        tb = ub ? ub.documentMode : void 0;
        if (null != tb && tb > parseFloat(rb)) {
            qb = String(tb);
            break a
        }
    }
    qb = rb
}
var vb = qb,
    jb = {},
    wb = function(a) {
        return kb(a, function() {
            return 0 <= Va(vb, a)
        })
    };
var xb = ab();
db();
var yb = cb(),
    zb = bb() && !(gb() || B("iPad") || B("iPod"));
var Ab = {},
    Bb = null,
    Cb = function(a, b) {
        var c = sa(a);
        A("array" == c || "object" == c && "number" == typeof a.length, "encodeByteArray takes an array as a parameter");
        void 0 === b && (b = 0);
        if (!Bb) {
            Bb = {};
            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
            for (var d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                Ab[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g],
                        k = Bb[h];
                    void 0 === k ? Bb[h] = g : A(k === g)
                }
            }
        }
        b = Ab[b];
        c = Array(Math.floor(a.length / 3));
        d = b[64] || "";
        for (e = f = 0; f < a.length - 2; f +=
            3) {
            k = a[f];
            var l = a[f + 1];
            h = a[f + 2];
            g = b[k >> 2];
            k = b[(k & 3) << 4 | l >> 4];
            l = b[(l & 15) << 2 | h >> 6];
            h = b[h & 63];
            c[e++] = "" + g + k + l + h
        }
        g = 0;
        h = d;
        switch (a.length - f) {
            case 2:
                g = a[f + 1], h = b[(g & 15) << 2] || d;
            case 1:
                a = a[f], c[e] = "" + b[a >> 2] + b[(a & 3) << 4 | g >> 4] + h + d
        }
        return c.join("")
    };
var Db = function() {
    this.blockSize = -1
};
var Eb = function(a, b, c) {
    this.blockSize = -1;
    this.N = a;
    this.blockSize = c || a.blockSize || 16;
    this.Od = Array(this.blockSize);
    this.xc = Array(this.blockSize);
    a = b;
    a.length > this.blockSize && (this.N.update(a), a = this.N.digest(), this.N.reset());
    for (c = 0; c < this.blockSize; c++) b = c < a.length ? a[c] : 0, this.Od[c] = b ^ 92, this.xc[c] = b ^ 54;
    this.N.update(this.xc)
};
z(Eb, Db);
Eb.prototype.reset = function() {
    this.N.reset();
    this.N.update(this.xc)
};
Eb.prototype.update = function(a, b) {
    this.N.update(a, b)
};
Eb.prototype.digest = function() {
    var a = this.N.digest();
    this.N.reset();
    this.N.update(this.Od);
    this.N.update(a);
    return this.N.digest()
};
var Fb = function() {
    this.blockSize = -1;
    this.blockSize = 64;
    this.A = Array(4);
    this.He = Array(this.blockSize);
    this.Mb = this.Ra = 0;
    this.reset()
};
z(Fb, Db);
Fb.prototype.reset = function() {
    this.A[0] = 1732584193;
    this.A[1] = 4023233417;
    this.A[2] = 2562383102;
    this.A[3] = 271733878;
    this.Mb = this.Ra = 0
};
var Gb = function(a, b, c) {
    c || (c = 0);
    var d = Array(16);
    if ("string" === typeof b)
        for (var e = 0; 16 > e; ++e) d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
    else
        for (e = 0; 16 > e; ++e) d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
    b = a.A[0];
    c = a.A[1];
    e = a.A[2];
    var f = a.A[3];
    var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>>
        15);
    g = c + (b ^ e & (f ^ b)) + d[3] + 3250441966 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
    f = b + (g << 12 & 4294967295 |
        g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
    b = c + (g << 7 & 4294967295 | g >>> 25);
    g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
    f = b + (g << 12 & 4294967295 | g >>> 20);
    g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
    e = f + (g << 17 & 4294967295 | g >>> 15);
    g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
    c = e + (g << 22 & 4294967295 | g >>> 10);
    g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
    b = c + (g <<
        5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
    c =
        e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
    b = c + (g << 5 & 4294967295 | g >>> 27);
    g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
    f = b + (g << 9 & 4294967295 | g >>> 23);
    g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
    e = f + (g << 14 & 4294967295 | g >>> 18);
    g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
    c = e + (g << 20 & 4294967295 | g >>> 12);
    g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
    f = b + (g << 11 & 4294967295 |
        g >>> 21);
    g = e + (f ^ b ^ c) + d[7] + 4139469664 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
    b = c + (g << 4 & 4294967295 | g >>> 28);
    g = f + (b ^ c ^ e) + d[12] +
        3873151461 & 4294967295;
    f = b + (g << 11 & 4294967295 | g >>> 21);
    g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
    e = f + (g << 16 & 4294967295 | g >>> 16);
    g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
    c = e + (g << 23 & 4294967295 | g >>> 9);
    g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[12] + 1700485571 &
        4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[13] + 1309151649 &
        4294967295;
    c = e + (g << 21 & 4294967295 | g >>> 11);
    g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
    b = c + (g << 6 & 4294967295 | g >>> 26);
    g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
    f = b + (g << 10 & 4294967295 | g >>> 22);
    g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
    e = f + (g << 15 & 4294967295 | g >>> 17);
    g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
    a.A[0] = a.A[0] + b & 4294967295;
    a.A[1] = a.A[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
    a.A[2] = a.A[2] + e & 4294967295;
    a.A[3] = a.A[3] + f & 4294967295
};
Fb.prototype.update = function(a, b) {
    void 0 === b && (b = a.length);
    for (var c = b - this.blockSize, d = this.He, e = this.Ra, f = 0; f < b;) {
        if (0 == e)
            for (; f <= c;) Gb(this, a, f), f += this.blockSize;
        if ("string" === typeof a)
            for (; f < b;) {
                if (d[e++] = a.charCodeAt(f++), e == this.blockSize) {
                    Gb(this, d);
                    e = 0;
                    break
                }
            } else
                for (; f < b;)
                    if (d[e++] = a[f++], e == this.blockSize) {
                        Gb(this, d);
                        e = 0;
                        break
                    }
    }
    this.Ra = e;
    this.Mb += b
};
Fb.prototype.digest = function() {
    var a = Array((56 > this.Ra ? this.blockSize : 2 * this.blockSize) - this.Ra);
    a[0] = 128;
    for (var b = 1; b < a.length - 8; ++b) a[b] = 0;
    var c = 8 * this.Mb;
    for (b = a.length - 8; b < a.length; ++b) a[b] = c & 255, c /= 256;
    this.update(a);
    a = Array(16);
    for (b = c = 0; 4 > b; ++b)
        for (var d = 0; 32 > d; d += 8) a[c++] = this.A[b] >>> d & 255;
    return a
};
/*

 SPDX-License-Identifier: Apache-2.0
*/
var Hb = {};
var Ib = function() {},
    Jb = function(a, b) {
        if (b !== Hb) throw Error("Bad secret");
        this.ce = a
    };
u(Jb, Ib);
Jb.prototype.toString = function() {
    return this.ce
};
var Kb = new Jb("about:invalid#zTSz", Hb);
var Lb = function(a) {
    this.Cf = a
};

function Mb(a) {
    return new Lb(function(b) {
        return b.substr(0, a.length + 1).toLowerCase() === a + ":"
    })
}
var Nb = [Mb("data"), Mb("http"), Mb("https"), Mb("mailto"), Mb("ftp"), new Lb(function(a) {
    return /^[^:]*([/?#]|$)/.test(a)
})];

function Ob(a) {
    var b = void 0 === b ? Nb : b;
    a: {
        b = void 0 === b ? Nb : b;
        for (var c = 0; c < b.length; ++c) {
            var d = b[c];
            if (d instanceof Lb && d.Cf(a)) {
                a = new Jb(a, Hb);
                break a
            }
        }
        a = void 0
    }
    return a || Kb
};

function Pb(a, b) {
    for (var c in a)
        if (b.call(void 0, a[c], c, a)) return !0;
    return !1
}
var Qb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function Rb(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < Qb.length; f++) c = Qb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};
var Sb;
var Vb = function(a, b) {
    this.Lc = a === Tb && b || "";
    this.Ae = Ub
};
Vb.prototype.vb = !0;
Vb.prototype.Wa = function() {
    return this.Lc
};
Vb.prototype.toString = function() {
    return "Const{" + this.Lc + "}"
};
var Wb = function(a) {
        if (a instanceof Vb && a.constructor === Vb && a.Ae === Ub) return a.Lc;
        Da("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    },
    Ub = {},
    Tb = {};
var Yb = function(a, b) {
    this.Cc = b === Xb ? a : ""
};
m = Yb.prototype;
m.vb = !0;
m.Wa = function() {
    return this.Cc.toString()
};
m.Ed = !0;
m.mc = function() {
    return 1
};
m.toString = function() {
    return this.Cc.toString()
};
var Zb = function(a) {
        if (a instanceof Yb && a.constructor === Yb) return a.Cc;
        Da("expected object of type SafeUrl, got '" + a + "' of type " + sa(a));
        return "type_error:SafeUrl"
    },
    $b = RegExp('^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font/\\w+|image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$', "i"),
    ac = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    bc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
    Xb = {},
    cc = new Yb("about:invalid#zClosurez", Xb);
var dc = {},
    ec = function(a, b, c) {
        this.Bc = c === dc ? a : "";
        this.Ve = b;
        this.vb = this.Ed = !0
    };
ec.prototype.mc = function() {
    return this.Ve
};
ec.prototype.Wa = function() {
    return this.Bc.toString()
};
ec.prototype.toString = function() {
    return this.Bc.toString()
};
var fc = function(a) {
        if (a instanceof ec && a.constructor === ec) return a.Bc;
        Da("expected object of type SafeHtml, got '" + a + "' of type " + sa(a));
        return "type_error:SafeHtml"
    },
    hc = function(a) {
        if (a instanceof ec) return a;
        var b = "object" == typeof a,
            c = null;
        b && a.Ed && (c = a.mc());
        a = b && a.vb ? a.Wa() : String(a);
        Ta.test(a) && (-1 != a.indexOf("&") && (a = a.replace(Na, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(Oa, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(Pa, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(Qa, "&quot;")), -1 != a.indexOf("'") &&
            (a = a.replace(Ra, "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace(Sa, "&#0;")));
        return gc(a, c)
    },
    gc = function(a, b) {
        if (void 0 === Sb) {
            var c = null;
            var d = x.trustedTypes;
            if (d && d.createPolicy) try {
                c = d.createPolicy("goog#html", {
                    createHTML: za,
                    createScript: za,
                    createScriptURL: za
                })
            } catch (e) {
                x.console && x.console.error(e.message)
            }
            Sb = c
        }
        a = (c = Sb) ? c.createHTML(a) : a;
        return new ec(a, b, dc)
    },
    jc = new ec(x.trustedTypes && x.trustedTypes.emptyHTML || "", 0, dc);
var kc = function(a) {
    var b = b || 0;
    return function() {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
};
var lc = function(a) {
    var b = !1,
        c;
    return function() {
        b || (c = a(), b = !0);
        return c
    }
}(function() {
    if ("undefined" === typeof document) return !1;
    var a = document.createElement("div"),
        b = document.createElement("div");
    b.appendChild(document.createElement("div"));
    a.appendChild(b);
    if (!a.firstChild) return !1;
    b = a.firstChild.firstChild;
    a.innerHTML = fc(jc);
    return !b.parentElement
});
var mc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"),
    nc = function(a, b) {
        if (!b) return a;
        var c = a.indexOf("#");
        0 > c && (c = a.length);
        var d = a.indexOf("?");
        if (0 > d || d > c) {
            d = c;
            var e = ""
        } else e = a.substring(d + 1, c);
        a = [a.substr(0, d), e, a.substr(c)];
        c = a[1];
        a[1] = b ? c ? c + "&" + b : b : c;
        return a[0] + (a[1] ? "?" + a[1] : "") + a[2]
    },
    oc = function(a, b, c) {
        Ea(a);
        if (Array.isArray(b)) {
            Fa(b);
            for (var d = 0; d < b.length; d++) oc(a, String(b[d]), c)
        } else null != b &&
            c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
    },
    pc = function(a, b) {
        A(0 == Math.max(a.length - (b || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
        var c = [];
        for (b = b || 0; b < a.length; b += 2) oc(a[b], a[b + 1], c);
        return c.join("&")
    },
    qc = function(a, b) {
        var c = 2 == arguments.length ? pc(arguments[1], 0) : pc(arguments, 1);
        return nc(a, c)
    },
    rc = function(a, b, c) {
        c = null != c ? "=" + encodeURIComponent(String(c)) : "";
        return nc(a, b + c)
    },
    sc = function(a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
            var f = a.charCodeAt(b -
                1);
            if (38 == f || 63 == f)
                if (f = a.charCodeAt(b + e), !f || 61 == f || 38 == f || 35 == f) return b;
            b += e + 1
        }
        return -1
    },
    tc = /#|$/,
    uc = /[?&]($|#)/,
    vc = function(a, b) {
        for (var c = a.search(tc), d = 0, e, f = []; 0 <= (e = sc(a, d, b, c));) f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c);
        f.push(a.substr(d));
        return f.join("").replace(uc, "$1")
    },
    wc = function(a) {
        return rc(vc(document.location.href, "hl"), "hl", a)
    };
var xc = {
        Bg: !0
    },
    yc = function() {
        throw Error("Do not instantiate directly");
    };
yc.prototype.cc = null;
yc.prototype.toString = function() {
    return this.content
};
var zc = function() {
    yc.call(this)
};
z(zc, yc);
zc.prototype.ya = xc;
var Ac = function(a) {
    var b = null != a && a.ya === xc;
    b && A(a.constructor === zc);
    return b
};
var Bc = Object.freeze || function(a) {
    return a
};
var Cc = function(a) {
        if (null != a) switch (a.cc) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return 0
        }
        return null
    },
    Fc = function(a) {
        return Ac(a) ? a : a instanceof ec ? C(fc(a).toString(), a.mc()) : C(String(String(a)).replace(Dc, Ec), Cc(a))
    },
    C = function(a) {
        function b(c) {
            this.content = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            void 0 !== d && (c.cc = d);
            return c
        }
    }(zc),
    D = {},
    E = function(a) {
        if (Ac(a)) {
            var b = String;
            a = String(a.content).replace(Gc, "").replace(Hc, "&lt;");
            b = b(a).replace(Ic, Ec)
        } else b = String(a).replace(Dc,
            Ec);
        return b
    },
    Jc = function(a, b) {
        a || (a = b instanceof Function ? b.displayName || b.name || "unknown type name" : b instanceof Object ? b.constructor.displayName || b.constructor.name || Object.prototype.toString.call(b) : null === b ? "null" : typeof b, Da("expected @param origin of type string, but got " + a + "."))
    },
    Kc = {},
    Lc = function() {
        A(Kc === Kc, "found an incorrect call marker, was an internal function called from the top level?")
    },
    Mc = {
        "\x00": "&#0;",
        "\t": "&#9;",
        "\n": "&#10;",
        "\x0B": "&#11;",
        "\f": "&#12;",
        "\r": "&#13;",
        " ": "&#32;",
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "-": "&#45;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
        "\u0085": "&#133;",
        "\u00a0": "&#160;",
        "\u2028": "&#8232;",
        "\u2029": "&#8233;"
    },
    Ec = function(a) {
        return Mc[a]
    },
    Dc = /[\x00\x22\x26\x27\x3c\x3e]/g,
    Ic = /[\x00\x22\x27\x3c\x3e]/g,
    Gc = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    Hc = /</g;
var Nc = function(a, b) {
    return a + Math.random() * (b - a)
};
var Oc = function(a) {
    var b = document;
    return "string" === typeof a ? b.getElementById(a) : a
};
/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
function Pc(a, b, c, d) {
    c = b(c || Qc, d);
    if (ta(c))
        if (c instanceof yc) {
            if (c.ya !== xc) throw Error("Sanitized content was not of kind HTML.");
            b = c.toString();
            c = c.cc;
            d = new Vb(Tb, "Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value.");
            Ea(Wb(d), "must provide justification");
            A(!/^[\s\xa0]*$/.test(Wb(d)), "must provide non-empty justification");
            b = gc(b, c || null)
        } else Da("Soy template output is unsafe for use as HTML: " + c), b = hc("zSoyz");
    else b = hc(String(c));
    a = A(a);
    if (lc())
        for (; a.lastChild;) a.removeChild(a.lastChild);
    a.innerHTML = fc(b)
}
var Qc = {};
var Rc = function(a) {
        if (D["oauth2.gsi.soy.common.dialogHeader"]) return D["oauth2.gsi.soy.common.dialogHeader"](null, a);
        var b = '<div class="' + E("dialog-header") + '"><div class="' + E("google-icon") + '">';
        a = D["oauth2.gsi.soy.common.googleIcon"] ? D["oauth2.gsi.soy.common.googleIcon"](null, a) : C('<svg class="' + E("icon") + '" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/><path fill="none" d="M2 2h44v44H2z"/></svg>');
        return C(b + a + "</div><p>Continue with Google</p></div>")
    },
    Sc = function(a) {
        if (D["oauth2.gsi.soy.common.dialogFooter"]) var b = D["oauth2.gsi.soy.common.dialogFooter"](null, a);
        else {
            b = C;
            var c = '<div class="' + E("dialog-footer") + '">';
            if (D["oauth2.gsi.soy.common.languageSelector"]) var d = D["oauth2.gsi.soy.common.languageSelector"](null, a);
            else {
                var e = a.ec;
                d = a.languages;
                var f = '<div id="language_selector" class="' + E("language-selector") + '"><div class="' + E("language-selected") + '">';
                if ((e instanceof yc ? e.content : e) &&
                    (d instanceof yc ? d.content : d)) {
                    for (var g = "", h = d.length, k = 0; k < h; k++) {
                        var l = d[k],
                            p = l.code;
                        g += (p && e && p.Af && e.Af ? p.ya !== e.ya ? 0 : p.toString() === e.toString() : p instanceof yc && e instanceof yc ? p.ya != e.ya ? 0 : p.toString() == e.toString() : p == e) ? "" + l.displayName : ""
                    }
                    f += "<div>" + Fc(g) + "</div>"
                }
                f += '<div class="' + E("chevron") + '"></div></div><div id="language_list" class="' + E("language-list") + '">';
                if (d)
                    for (e = d.length, g = 0; g < e; g++) h = d[g], f += '<div class="' + E("language-option") + '" data-languagecode="' + E(h.code) + '">' + Fc(h.displayName) +
                        "</div>";
                d = C(f + "</div></div>")
            }
            c += d;
            D["oauth2.gsi.soy.common.footerMenu"] ? a = D["oauth2.gsi.soy.common.footerMenu"](null, a) : (a = '<ul class="' + E("footer-menu") + '"><li class="' + E("menu-item") + '"><a class="' + E("menu-content") + '" href="#">', a = a + 'Help</a></li><li class="' + (E("menu-item") + '"><a class="' + E("menu-content") + '" href="#">'), a = a + 'Privacy</a></li><li class="' + (E("menu-item") + '"><a class="' + E("menu-content") + '" href="#">'), a = C(a + "Terms</a></li></ul>"));
            b = b(c + a + "</div>")
        }
        return b
    };
var Tc = function(a, b) {
    var c = a.origin;
    Lc();
    if (D["oauth2.gsi.soy.itp.newgrant.dialog"]) b = D["oauth2.gsi.soy.itp.newgrant.dialog"]({
        origin: c
    }, b);
    else {
        Jc("string" === typeof c, c);
        a = C;
        var d = '<div class="' + E("dialog-container dialog-modal") + '"><div class="' + E("dialog inflated-dialog") + '"><div class="' + E("dialog-body") + '">' + Rc(b) + '<div class="' + E("dialog-content") + '">';
        if (D["oauth2.gsi.soy.itp.newgrant.title"]) var e = D["oauth2.gsi.soy.itp.newgrant.title"](null, b);
        else e = '<h1 class="' + E("title") + '">', e = C(e + "You'll need to give Safari permission to continue</h1>");
        d += e;
        Lc();
        D["oauth2.gsi.soy.itp.newgrant.consentForm"] ? c = D["oauth2.gsi.soy.itp.newgrant.consentForm"]({
            origin: c
        }, b) : (Jc("string" === typeof c, c), e = '<div class="' + E("consent-form") + '"><p class="' + E("consent-text") + '">', c = "In order to continue with your Google Account, Safari will ask if it's ok for Google to use cookies on " + Fc(c) + ".", c = C(e + c + "</p></div>"));
        c = d + c;
        D["oauth2.gsi.soy.itp.newgrant.buttonGroup"] ? d = D["oauth2.gsi.soy.itp.newgrant.buttonGroup"](null, b) : (d = '<div class="' + E("button-group") + '"><div class="' +
            E("button button-cancel") + '" id="confirm_no">', d = d + 'Cancel</div><div class="' + (E("button button-confirm") + '" id="confirm_yes">'), d = C(d + "Continue</div></div>"));
        b = a(c + d + "</div></div>" + Sc(b) + "</div></div>")
    }
    return b
};
var Uc = function(a, b) {
    var c = a.origin;
    Lc();
    if (D["oauth2.gsi.soy.itp.regrant.dialog"]) b = D["oauth2.gsi.soy.itp.regrant.dialog"]({
        origin: c
    }, b);
    else {
        Jc("string" === typeof c, c);
        a = C;
        var d = '<div class="' + E("dialog-container dialog-modal") + '"><div class="' + E("dialog") + '"><div class="' + E("dialog-body") + '">' + Rc(b) + '<div class="' + E("dialog-content") + '">';
        Lc();
        if (D["oauth2.gsi.soy.itp.regrant.title"]) var e = D["oauth2.gsi.soy.itp.regrant.title"]({
            origin: c
        }, b);
        else Jc("string" === typeof c, c), e = '<h1 class="' + E("title") +
            '">', c = "Do you still want Safari to let Google use cookies on " + Fc(c) + "?", e = C(e + c + "</h1>");
        d += e;
        D["oauth2.gsi.soy.itp.regrant.buttonGroup"] ? e = D["oauth2.gsi.soy.itp.regrant.buttonGroup"](null, b) : (e = '<div class="' + E("button-group button-group-high") + '"><div class="' + E("button button-cancel") + '" id="confirm_no">', e = e + 'No thanks</div><div class="' + (E("button button-confirm") + '" id="confirm_yes">'), e = C(e + "Yes</div></div>"));
        b = a(d + e + "</div></div>" + Sc(b) + "</div></div>")
    }
    return b
};

function Vc(a) {
    a && "function" == typeof a.T && a.T()
};
var Wc = function() {
    this.Ca = this.Ca;
    this.ra = this.ra
};
Wc.prototype.Ca = !1;
Wc.prototype.T = function() {
    this.Ca || (this.Ca = !0, this.ea())
};
var Xc = function(a, b) {
    a.Ca ? b() : (a.ra || (a.ra = []), a.ra.push(b))
};
Wc.prototype.ea = function() {
    if (this.ra)
        for (; this.ra.length;) this.ra.shift()()
};
var Yc = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.bb = !1
};
Yc.prototype.stopPropagation = function() {
    this.bb = !0
};
Yc.prototype.preventDefault = function() {
    this.defaultPrevented = !0
};
var Zc = function() {
    if (!x.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
        b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
    try {
        x.addEventListener("test", ra, b), x.removeEventListener("test", ra, b)
    } catch (c) {}
    return a
}();
var $c;
$c = pb ? "webkitTransitionEnd" : "transitionend";
var ad = function(a, b) {
    Yc.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.Va = null;
    a && this.U(a, b)
};
z(ad, Yc);
var bd = Bc({
    2: "touch",
    3: "pen",
    4: "mouse"
});
ad.prototype.U = function(a, b) {
    var c = this.type = a.type,
        d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    if (b = a.relatedTarget) {
        if (ob) {
            a: {
                try {
                    ib(b.nodeName);
                    var e = !0;
                    break a
                } catch (f) {}
                e = !1
            }
            e || (b = null)
        }
    } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY =
        d.screenY || 0) : (this.offsetX = pb || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = pb || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId =
        a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : bd[a.pointerType] || "";
    this.state = a.state;
    this.Va = a;
    a.defaultPrevented && ad.sa.preventDefault.call(this)
};
ad.prototype.stopPropagation = function() {
    ad.sa.stopPropagation.call(this);
    this.Va.stopPropagation ? this.Va.stopPropagation() : this.Va.cancelBubble = !0
};
ad.prototype.preventDefault = function() {
    ad.sa.preventDefault.call(this);
    var a = this.Va;
    a.preventDefault ? a.preventDefault() : a.returnValue = !1
};
var cd = "closure_listenable_" + (1E6 * Math.random() | 0);
var dd = 0;
var ed = function(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.m = e;
        this.key = ++dd;
        this.gb = this.pb = !1
    },
    fd = function(a) {
        a.gb = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.m = null
    };
var gd = function(a) {
    this.src = a;
    this.D = {};
    this.mb = 0
};
gd.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.D[f];
    a || (a = this.D[f] = [], this.mb++);
    var g = hd(a, b, d, e); - 1 < g ? (b = a[g], c || (b.pb = !1)) : (b = new ed(b, this.src, f, !!d, e), b.pb = c, a.push(b));
    return b
};
gd.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.D)) return !1;
    var e = this.D[a];
    b = hd(e, b, c, d);
    return -1 < b ? (fd(e[b]), A(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.D[a], this.mb--), !0) : !1
};
var id = function(a, b) {
    var c = b.type;
    c in a.D && La(a.D[c], b) && (fd(b), 0 == a.D[c].length && (delete a.D[c], a.mb--))
};
gd.prototype.nc = function(a, b, c, d) {
    a = this.D[a.toString()];
    var e = -1;
    a && (e = hd(a, b, c, d));
    return -1 < e ? a[e] : null
};
gd.prototype.hasListener = function(a, b) {
    var c = void 0 !== a,
        d = c ? a.toString() : "",
        e = void 0 !== b;
    return Pb(this.D, function(f) {
        for (var g = 0; g < f.length; ++g)
            if (!(c && f[g].type != d || e && f[g].capture != b)) return !0;
        return !1
    })
};
var hd = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.gb && f.listener == b && f.capture == !!c && f.m == d) return e
    }
    return -1
};
var jd = "closure_lm_" + (1E6 * Math.random() | 0),
    kd = {},
    ld = 0,
    nd = function(a, b, c, d, e) {
        if (d && d.once) return md(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) nd(a, b[f], c, d, e);
            return null
        }
        c = od(c);
        return a && a[cd] ? a.O(b, c, ta(d) ? !!d.capture : !!d, e) : pd(a, b, c, !1, d, e)
    },
    pd = function(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = ta(e) ? !!e.capture : !!e,
            h = qd(a);
        h || (a[jd] = h = new gd(a));
        c = h.add(b, c, d, g, f);
        if (c.proxy) return c;
        d = rd();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) Zc || (e = g), void 0 ===
            e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(sd(b.toString()), d);
        else if (a.addListener && a.removeListener) A("change" === b, "MediaQueryList only has a change event"), a.addListener(d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        ld++;
        return c
    },
    rd = function() {
        var a = td,
            b = function(c) {
                return a.call(b.src, b.listener, c)
            };
        return b
    },
    md = function(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) md(a, b[f], c, d, e);
            return null
        }
        c = od(c);
        return a &&
            a[cd] ? a.M.add(String(b), c, !0, ta(d) ? !!d.capture : !!d, e) : pd(a, b, c, !0, d, e)
    },
    ud = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++) ud(a, b[f], c, d, e);
        else d = ta(d) ? !!d.capture : !!d, c = od(c), a && a[cd] ? a.nb(b, c, d, e) : a && (a = qd(a)) && (b = a.nc(b, c, d, e)) && vd(b)
    },
    vd = function(a) {
        if ("number" !== typeof a && a && !a.gb) {
            var b = a.src;
            if (b && b[cd]) id(b.M, a);
            else {
                var c = a.type,
                    d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(sd(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                ld--;
                (c = qd(b)) ? (id(c, a), 0 == c.mb && (c.src = null, b[jd] = null)) : fd(a)
            }
        }
    },
    sd = function(a) {
        return a in kd ? kd[a] : kd[a] = "on" + a
    },
    td = function(a, b) {
        if (a.gb) a = !0;
        else {
            b = new ad(b, this);
            var c = a.listener,
                d = a.m || a.src;
            a.pb && vd(a);
            a = c.call(d, b)
        }
        return a
    },
    qd = function(a) {
        a = a[jd];
        return a instanceof gd ? a : null
    },
    wd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
    od = function(a) {
        A(a, "Listener can not be null.");
        if ("function" === typeof a) return a;
        A(a.handleEvent, "An object listener must have handleEvent method.");
        a[wd] || (a[wd] =
            function(b) {
                return a.handleEvent(b)
            });
        return a[wd]
    };
var xd = function() {
    this.Cb = new Set;
    this.rd = !1
};
xd.prototype.O = function(a, b, c) {
    a = nd(a, b, c);
    this.Cb.add(a);
    return a
};
xd.prototype.nb = function(a) {
    vd(a);
    this.Cb.delete(a)
};
xd.prototype.T = function() {
    this.rd || (this.Cb.forEach(function(a) {
        vd(a)
    }), this.Cb.clear(), this.rd = !0)
};
var yd = function() {
    xd.call(this);
    this.sb = null;
    this.bc = !1
};
u(yd, xd);
var zd = function(a, b) {
    if (a.sb) throw Error("Component already rendered.");
    a.bc = !1;
    a.sb = b
};
yd.prototype.T = function() {
    if (!this.bc) {
        xd.prototype.T.call(this);
        for (var a = this.sb, b; b = a.firstChild;) a.removeChild(b);
        this.sb = null;
        this.bc = !0
    }
};

function Ad(a) {
    if (a instanceof Ib)
        if (a instanceof Jb) a = a.ce;
        else throw Error("Unexpected type when unwrapping SafeUrl");
    else a = Zb(a);
    return a
};

function Bd(a, b) {
    a.href = Ad(b)
};
var Cd = function() {
    xd.call(this);
    this.la = this.Ib = this.Hb = null;
    this.ee = this.Rd = !1
};
u(Cd, xd);
Cd.prototype.register = function(a, b) {
    var c = this;
    if (this.ee) throw Error("LanguageSelectorModel is already registered.");
    this.ee = !0;
    this.Ib = a;
    this.la = b;
    this.Qd = this.O(this.Ib, "click", function() {
        return Dd(c)
    })
};
var Dd = function(a) {
        a.la.style.visibility = "visible";
        a.la.style.opacity = 1;
        a.nb(a.Qd);
        a.Ff = a.O(document, "mouseup", function(b) {
            return Ed(a, b)
        })
    },
    Ed = function(a, b) {
        a.Hb = b.target.getAttribute("data-languagecode");
        if (null != a.Hb || b.target != a.la) a.nb(a.Ff), a.Ef = a.O(a.la, $c, function() {
            return Fd(a)
        }), a.la.style.opacity = 0
    },
    Fd = function(a) {
        a.nb(a.Ef);
        a.la.style.visibility = "hidden";
        a.Qd = a.O(a.Ib, "click", function() {
            return Dd(a)
        });
        if (null != a.Hb) {
            var b = wc(a.Hb);
            Bd(document.location, Ob(b))
        }
    };
Cd.prototype.T = function() {
    this.Rd || (xd.prototype.T.call(this), this.la = this.Ib = null, this.Rd = !0)
};
var Gd = function(a) {
    var b = a.origin,
        c = a.ec;
    a = a.languages;
    yd.call(this);
    this.i = b;
    this.od = c;
    this.Sd = a;
    this.Nd = !1
};
u(Gd, yd);
Gd.prototype.Sf = function(a, b, c) {
    zd(this, a);
    Pc(a, Tc, {
        origin: this.i
    }, {
        ec: this.od,
        languages: this.Sd
    });
    a = Oc("confirm_yes");
    this.O(a, "click", function() {
        (void 0 == document.hasStorageAccess ? Promise.resolve() : document.requestStorageAccess()).then(function() {
            return b()
        }, function() {
            return c()
        })
    });
    a = Oc("confirm_no");
    this.O(a, "click", function() {
        return c()
    });
    Hd(this)
};
Gd.prototype.Tf = function(a, b, c) {
    zd(this, a);
    Pc(a, Uc, {
        origin: this.i
    }, {
        ec: this.od,
        languages: this.Sd
    });
    a = Oc("confirm_yes");
    this.O(a, "click", function() {
        return b()
    });
    a = Oc("confirm_no");
    this.O(a, "click", function() {
        return c()
    });
    Hd(this)
};
var Hd = function(a) {
    void 0 == a.Ab && (a.Ab = new Cd);
    var b = Oc("language_selector"),
        c = Oc("language_list");
    a.Ab.register(b, c)
};
Gd.prototype.T = function() {
    this.Nd || (yd.prototype.T.call(this), void 0 != this.Ab && this.Ab.T(), this.Nd = !0)
};
var Id, Jd, Kd = void 0,
    Ld = function(a) {
        try {
            return x.JSON.parse.call(x.JSON, a)
        } catch (b) {
            return !1
        }
    },
    Md = function(a) {
        return Object.prototype.toString.call(a)
    },
    Nd = Md(0),
    Od = Md(new Date(0)),
    Pd = Md(!0),
    Qd = Md(""),
    Rd = Md({}),
    Sd = Md([]),
    Td = function(a, b) {
        if (b)
            for (var c = 0, d = b.length; c < d; ++c)
                if (a === b[c]) throw new TypeError("Converting circular structure to JSON");
        d = typeof a;
        if ("undefined" !== d) {
            c = Array.prototype.slice.call(b || [], 0);
            c[c.length] = a;
            b = [];
            var e = Md(a);
            if (null != a && "function" === typeof a.toJSON && (Object.prototype.hasOwnProperty.call(a,
                    "toJSON") || (e !== Sd || a.constructor !== Array && a.constructor !== Object) && (e !== Rd || a.constructor !== Array && a.constructor !== Object) && e !== Qd && e !== Nd && e !== Pd && e !== Od)) return Td(a.toJSON.call(a), c);
            if (null == a) b[b.length] = "null";
            else if (e === Nd) a = Number(a), isNaN(a) || isNaN(a - a) ? a = "null" : -0 === a && 0 > 1 / a && (a = "-0"), b[b.length] = String(a);
            else if (e === Pd) b[b.length] = String(!!Number(a));
            else {
                if (e === Od) return Td(a.toISOString.call(a), c);
                if (e === Sd && Md(a.length) === Nd) {
                    b[b.length] = "[";
                    var f = 0;
                    for (d = Number(a.length) >> 0; f < d; ++f) f &&
                        (b[b.length] = ","), b[b.length] = Td(a[f], c) || "null";
                    b[b.length] = "]"
                } else if (e == Qd && Md(a.length) === Nd) {
                    b[b.length] = '"';
                    f = 0;
                    for (c = Number(a.length) >> 0; f < c; ++f) d = String.prototype.charAt.call(a, f), e = String.prototype.charCodeAt.call(a, f), b[b.length] = "\b" === d ? "\\b" : "\f" === d ? "\\f" : "\n" === d ? "\\n" : "\r" === d ? "\\r" : "\t" === d ? "\\t" : "\\" === d || '"' === d ? "\\" + d : 31 >= e ? "\\u" + (e + 65536).toString(16).substr(1) : 32 <= e && 65535 >= e ? d : "\ufffd";
                    b[b.length] = '"'
                } else if ("object" === d) {
                    b[b.length] = "{";
                    d = 0;
                    for (f in a) Object.prototype.hasOwnProperty.call(a,
                        f) && (e = Td(a[f], c), void 0 !== e && (d++ && (b[b.length] = ","), b[b.length] = Td(f), b[b.length] = ":", b[b.length] = e));
                    b[b.length] = "}"
                } else return
            }
            return b.join("")
        }
    },
    Ud = /[\0-\x07\x0b\x0e-\x1f]/,
    Vd = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,
    Wd = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,
    Xd = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,
    Yd = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,
    Zd = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,
    $d = /[ \t\n\r]+/g,
    ae = /[^"]:/,
    be = /""/g,
    ce = /true|false|null/g,
    de = /00/,
    ee = /[\{]([^0\}]|0[^:])/,
    fe = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,
    ge = /[^\[,:][\[\{]/,
    he = /^(\{|\}|\[|\]|,|:|0)+/,
    ie = /\u2028/g,
    je = /\u2029/g,
    ke = function(a) {
        a = String(a);
        if (Ud.test(a) || Vd.test(a) || Wd.test(a) || Xd.test(a)) return !1;
        var b = a.replace(Yd, '""');
        b = b.replace(Zd, "0");
        b = b.replace($d, "");
        if (ae.test(b)) return !1;
        b = b.replace(be, "0");
        b = b.replace(ce, "0");
        if (de.test(b) || ee.test(b) || fe.test(b) || ge.test(b) || !b || (b = b.replace(he, ""))) return !1;
        a = a.replace(ie, "\\u2028").replace(je,
            "\\u2029");
        b = void 0;
        try {
            b = Kd ? [Ld(a)] : eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" + a + "\n)")
        } catch (c) {
            return !1
        }
        return b && 1 === b.length ? b[0] : !1
    },
    le = function() {
        var a = ((x.document || {}).scripts || []).length;
        if ((void 0 === Id || void 0 === Kd || Jd !== a) && -1 !== Jd) {
            Id = Kd = !1;
            Jd = -1;
            try {
                try {
                    Kd = !!x.JSON && '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' === x.JSON.stringify.call(x.JSON, {
                        a: [3, !0, new Date(0)],
                        c: function() {}
                    }) && !0 === Ld("true") && 3 === Ld('[{"a":3}]')[0].a
                } catch (b) {}
                Id = Kd &&
                    !Ld("[00]") && !Ld('"\u0007"') && !Ld('"\\0"') && !Ld('"\\v"')
            } finally {
                Jd = a
            }
        }
    },
    me = !Date.prototype.toISOString || "function" !== typeof Date.prototype.toISOString || "1970-01-01T00:00:00.000Z" !== (new Date(0)).toISOString(),
    ne = function() {
        var a = Date.prototype.getUTCFullYear.call(this);
        return [0 > a ? "-" + String(1E6 - a).substr(1) : 9999 >= a ? String(1E4 + a).substr(1) : "+" + String(1E6 + a).substr(1), "-", String(101 + Date.prototype.getUTCMonth.call(this)).substr(1), "-", String(100 + Date.prototype.getUTCDate.call(this)).substr(1), "T",
            String(100 + Date.prototype.getUTCHours.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1), ".", String(1E3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1), "Z"
        ].join("")
    };
Date.prototype.toISOString = me ? ne : Date.prototype.toISOString;
var oe, pe = !1,
    F = function(a) {
        try {
            pe && window.console && window.console.log && window.console.log(a)
        } catch (b) {}
    },
    qe = function(a, b) {
        if (!a) return -1;
        if (a.indexOf) return a.indexOf(b, void 0);
        for (var c = 0, d = a.length; c < d; c++)
            if (a[c] === b) return c;
        return -1
    },
    G = function(a, b) {
        function c() {}
        if (!a) throw Error("Child class cannot be empty.");
        if (!b) throw Error("Parent class cannot be empty.");
        c.prototype = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    },
    re = function(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    },
    se = function(a) {
        var b = [],
            c;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var d = a[c];
                if (null === d || void 0 === d) d = "";
                b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d))
            }
        return b.join("&")
    },
    te = function(a) {
        var b = window.location.hash;
        a = new RegExp("[&#]" + a + "=([^&]*)");
        b = decodeURIComponent(b);
        b = a.exec(b);
        return null == b ? "" : b[1].replace(/\+/g, " ")
    },
    ue = function(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, !1);
        else if (a.attachEvent) a.attachEvent("on" + b, c);
        else throw Error("Add event handler for " + b + " failed.");
    },
    ve = function(a, b) {
        a = (a || "").split(" ");
        b = (b || "").split(" ");
        for (var c = 0; c < b.length; c++)
            if (b[c] && 0 > qe(a, b[c])) return !1;
        return !0
    },
    we = function() {
        if ("undefined" != typeof oe) return oe;
        a: {
            try {
                if (window.localStorage) {
                    var a = window.localStorage;
                    break a
                }
            } catch (b) {}
            a = void 0
        }
        if (!a) return oe = !1;
        try {
            a.setItem("test", "test"), a.removeItem("test"), oe = !0
        } catch (b) {
            oe = !1
        }
        return oe
    },
    xe = function() {
        var a = navigator.userAgent.toLowerCase();
        return -1 != a.indexOf("msie") && 8 == parseInt(a.split("msie")[1], 10)
    },
    ye = function() {
        return Object.hasOwnProperty.call(window,
            "ActiveXObject") && !window.ActiveXObject
    },
    ze = function() {
        var a = navigator.userAgent.toLowerCase();
        return 0 > a.indexOf("edge/") && (-1 < a.indexOf("chrome/") || -1 < a.indexOf("crios/"))
    },
    Ae = function() {
        var a = navigator.userAgent,
            b;
        if (b = !!a && -1 != a.indexOf("CriOS")) b = -1, (a = a.match(/CriOS\/(\d+)/)) && a[1] && (b = parseInt(a[1], 10) || -1), b = 48 > b;
        return b
    },
    Be = function() {
        var a = navigator.userAgent.toLowerCase();
        return -1 < a.indexOf("safari/") && 0 > a.indexOf("chrome/") && 0 > a.indexOf("crios/") && 0 > a.indexOf("android")
    },
    I = window.JSON,
    Ce = function(a) {
        this.Tc = a || [];
        this.P = {}
    };
Ce.prototype.addEventListener = function(a, b) {
    if (!(0 <= qe(this.Tc, a))) throw Error("Unrecognized event type: " + a);
    if (!re(b)) throw Error("The listener for event '" + a + "' is not a function.");
    this.P[a] || (this.P[a] = []);
    0 > qe(this.P[a], b) && this.P[a].push(b)
};
Ce.prototype.removeEventListener = function(a, b) {
    if (!(0 <= qe(this.Tc, a))) throw Error("Unrecognized event type: " + a);
    re(b) && this.P[a] && this.P[a].length && (b = qe(this.P[a], b), 0 <= b && this.P[a].splice(b, 1))
};
Ce.prototype.dispatchEvent = function(a) {
    var b = a.type;
    if (!(b && 0 <= qe(this.Tc, b))) throw Error("Failed to dispatch unrecognized event type: " + b);
    if (this.P[b] && this.P[b].length)
        for (var c = 0, d = this.P[b].length; c < d; c++) this.P[b][c](a)
};
I = {
    parse: function(a) {
        a = "[" + String(a) + "]"; - 1 === Jd ? a = !1 : (le(), a = (Id ? Ld : ke)(a));
        if (!1 === a || 1 !== a.length) throw new SyntaxError("JSON parsing failed.");
        return a[0]
    },
    stringify: function(a) {
        -1 !== Jd ? (le(), a = Kd ? x.JSON.stringify.call(x.JSON, a) : Td(a)) : a = void 0;
        return a
    }
};
var De = function(a) {
    this.hd = a
};
var Ee = function(a, b, c) {
    this.Za = a;
    this.Le = b;
    this.ub = c || [];
    this.wa = new Map
};
m = Ee.prototype;
m.eg = function(a) {
    this.wa.set(this.zd(na.apply(1, arguments)), [new De(a)])
};
m.xd = function() {
    var a = this.zd(na.apply(0, arguments));
    return this.wa.has(a) ? this.wa.get(a) : void 0
};
m.lf = function() {
    var a = this.xd(na.apply(0, arguments));
    return a && a.length ? a[0] : void 0
};
m.clear = function() {
    this.wa.clear()
};
m.zd = function() {
    var a = na.apply(0, arguments);
    return a ? a.join(",") : "key"
};
var Fe = function(a, b) {
    Ee.call(this, a, 3, b)
};
u(Fe, Ee);
Fe.prototype.Fd = function() {
    this.xb(1, na.apply(0, arguments))
};
Fe.prototype.xb = function(a) {
    var b = na.apply(1, arguments),
        c = 0,
        d = this.lf(b);
    d && (c = d.hd);
    this.eg(c + a, b)
};
var J = function() {
    Wc.call(this);
    this.M = new gd(this);
    this.Be = this;
    this.Ac = null
};
z(J, Wc);
J.prototype[cd] = !0;
m = J.prototype;
m.addEventListener = function(a, b, c, d) {
    nd(this, a, b, c, d)
};
m.removeEventListener = function(a, b, c, d) {
    ud(this, a, b, c, d)
};
m.dispatchEvent = function(a) {
    Ge(this);
    var b = this.Ac;
    if (b) {
        var c = [];
        for (var d = 1; b; b = b.Ac) c.push(b), A(1E3 > ++d, "infinite loop")
    }
    b = this.Be;
    d = a.type || a;
    if ("string" === typeof a) a = new Yc(a, b);
    else if (a instanceof Yc) a.target = a.target || b;
    else {
        var e = a;
        a = new Yc(d, b);
        Rb(a, e)
    }
    e = !0;
    if (c)
        for (var f = c.length - 1; !a.bb && 0 <= f; f--) {
            var g = a.currentTarget = c[f];
            e = He(g, d, !0, a) && e
        }
    a.bb || (g = a.currentTarget = b, e = He(g, d, !0, a) && e, a.bb || (e = He(g, d, !1, a) && e));
    if (c)
        for (f = 0; !a.bb && f < c.length; f++) g = a.currentTarget = c[f], e = He(g, d, !1, a) &&
            e;
    return e
};
m.ea = function() {
    J.sa.ea.call(this);
    if (this.M) {
        var a = this.M,
            b = 0,
            c;
        for (c in a.D) {
            for (var d = a.D[c], e = 0; e < d.length; e++) ++b, fd(d[e]);
            delete a.D[c];
            a.mb--
        }
    }
    this.Ac = null
};
m.O = function(a, b, c, d) {
    Ge(this);
    return this.M.add(String(a), b, !1, c, d)
};
m.nb = function(a, b, c, d) {
    this.M.remove(String(a), b, c, d)
};
var He = function(a, b, c, d) {
    b = a.M.D[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g && !g.gb && g.capture == c) {
            var h = g.listener,
                k = g.m || g.src;
            g.pb && id(a.M, g);
            e = !1 !== h.call(k, d) && e
        }
    }
    return e && !d.defaultPrevented
};
J.prototype.nc = function(a, b, c, d) {
    return this.M.nc(String(a), b, c, d)
};
J.prototype.hasListener = function(a, b) {
    return this.M.hasListener(void 0 !== a ? String(a) : void 0, b)
};
var Ge = function(a) {
    A(a.M, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
var Ie = function(a, b) {
    J.call(this);
    this.zb = a || 1;
    this.lb = b || x;
    this.dd = xa(this.qg, this);
    this.Vd = Date.now()
};
z(Ie, J);
m = Ie.prototype;
m.enabled = !1;
m.l = null;
m.setInterval = function(a) {
    this.zb = a;
    this.l && this.enabled ? (this.stop(), this.start()) : this.l && this.stop()
};
m.qg = function() {
    if (this.enabled) {
        var a = Date.now() - this.Vd;
        0 < a && a < .8 * this.zb ? this.l = this.lb.setTimeout(this.dd, this.zb - a) : (this.l && (this.lb.clearTimeout(this.l), this.l = null), this.dispatchEvent("tick"), this.enabled && (this.stop(), this.start()))
    }
};
m.start = function() {
    this.enabled = !0;
    this.l || (this.l = this.lb.setTimeout(this.dd, this.zb), this.Vd = Date.now())
};
m.stop = function() {
    this.enabled = !1;
    this.l && (this.lb.clearTimeout(this.l), this.l = null)
};
m.ea = function() {
    Ie.sa.ea.call(this);
    this.stop();
    delete this.lb
};
var Je = function(a, b, c) {
    if ("function" === typeof a) c && (a = xa(a, c));
    else if (a && "function" == typeof a.handleEvent) a = xa(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : x.setTimeout(a, b || 0)
};
var Ke = function(a) {
    this.og = a;
    this.Eb = new Map;
    this.Xe = new Set;
    this.vc = 0;
    this.yf = 100;
    this.jf = 3E4;
    this.s = new Ie(this.jf);
    this.s.O("tick", this.Hc, !1, this);
    this.ag = !1
};
m = Ke.prototype;
m.Hc = function() {
    var a = this.Eb.values();
    a = [].concat(fa(a)).filter(function(b) {
        return b.wa.size
    });
    a.length && this.og.flush(a, this.ag);
    Le(a);
    this.vc = 0;
    this.s.enabled && this.s.stop()
};
m.Ce = function(a) {
    var b = na.apply(1, arguments);
    this.Eb.has(a) || this.Eb.set(a, new Fe(a, b))
};
m.oc = function(a) {
    return this.Xe.has(a) ? void 0 : this.Eb.get(a)
};
m.Fd = function(a) {
    this.xb.apply(this, [a, 1].concat(fa(na.apply(1, arguments))))
};
m.xb = function(a, b) {
    var c = na.apply(2, arguments),
        d = this.oc(a);
    d && d instanceof Fe && (d.xb(b, c), this.s.enabled || this.s.start(), this.vc++, this.vc >= this.yf && this.Hc())
};
var Le = function(a) {
    for (var b = 0; b < a.length; b++) a[b].clear()
};
var Me = function(a) {
    this.Za = "/client_streamz/google_sign_in_web_client/idpiframe/cookie_blocked_count";
    this.Kc = a;
    this.Kc.Ce(this.Za, {
        td: 3,
        sd: "browser"
    }, {
        td: 3,
        sd: "browser_version"
    })
};
Me.prototype.tc = function(a, b) {
    this.Kc.Fd(this.Za, a, b)
};
Me.prototype.oc = function() {
    return this.Kc.oc(this.Za)
};
A(!0);
var Ne = "function" === typeof Uint8Array;
var Oe = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol("INTERNAL_ARRAY_STATE") : void 0;

function Pe(a, b) {
    Object.isFrozen(a) || (Oe ? a[Oe] |= b : void 0 !== a.yb ? a.yb |= b : Object.defineProperties(a, {
        yb: {
            value: b,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    }))
}

function Qe(a) {
    if (!Array.isArray(a)) return a;
    Pe(a, 1);
    return a
};

function Re(a) {
    return null !== a && "object" === typeof a && a.constructor === Object
}

function Se(a) {
    switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "object":
            return Ne && null != a && a instanceof Uint8Array ? Cb(a) : a;
        default:
            return a
    }
}
var Te, Ue = Symbol("exempted jspb subclass"),
    Ve = Symbol("generated by jspb");

function We(a, b) {
    if (null != a) return Array.isArray(a) || Re(a) ? Xe(a, b) : b(a)
}

function Xe(a, b) {
    if (Array.isArray(a)) {
        for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = We(a[d], b);
        a ? (a = Oe ? a[Oe] : a.yb, a = null == a ? 0 : a) : a = 0;
        a & 1 && Qe(c);
        return c
    }
    c = {};
    for (d in a) c[d] = We(a[d], b);
    return c
}

function Ye(a) {
    return Ne && null != a && a instanceof Uint8Array ? new Uint8Array(a) : a
};
var $e = function(a, b) {
    this.ca = a;
    this.Na = b;
    this.map = {};
    this.Qa = !0;
    this.zf = !1;
    if (0 < this.ca.length) {
        for (a = 0; a < this.ca.length; a++) {
            b = this.ca[a];
            var c = b[0];
            this.map[c.toString()] = new Ze(c, b[1])
        }
        this.Qa = !0
    }
};
m = $e.prototype;
m.W = function() {
    if (this.Qa) {
        if (this.Na) {
            var a = this.map,
                b;
            for (b in a)
                if (Object.prototype.hasOwnProperty.call(a, b)) {
                    var c = a[b].ta;
                    c && c.W()
                }
        }
    } else {
        this.ca.length = 0;
        a = af(this);
        a.sort();
        for (b = 0; b < a.length; b++) {
            c = this.map[a[b]];
            var d = c.ta;
            d && d.W();
            this.ca.push([c.key, c.value])
        }
        this.Qa = !0
    }
    return this.ca
};
m.clear = function() {
    this.map = {};
    this.Qa = !1
};
m.entries = function() {
    var a = [],
        b = af(this);
    b.sort();
    for (var c = 0; c < b.length; c++) {
        var d = this.map[b[c]];
        a.push([d.key, bf(this, d)])
    }
    return new cf(a)
};
m.keys = function() {
    var a = [],
        b = af(this);
    b.sort();
    for (var c = 0; c < b.length; c++) a.push(this.map[b[c]].key);
    return new cf(a)
};
m.values = function() {
    var a = [],
        b = af(this);
    b.sort();
    for (var c = 0; c < b.length; c++) a.push(bf(this, this.map[b[c]]));
    return new cf(a)
};
m.forEach = function(a, b) {
    var c = af(this);
    c.sort();
    for (var d = 0; d < c.length; d++) {
        var e = this.map[c[d]];
        a.call(b, bf(this, e), e.key, this)
    }
};
m.set = function(a, b) {
    var c = new Ze(a);
    this.Na ? (c.ta = b, c.value = b.W()) : c.value = b;
    this.map[a.toString()] = c;
    this.Qa = !1;
    return this
};
var bf = function(a, b) {
    if (a.Na) {
        if (!b.ta && (b.ta = new a.Na(b.value), a.zf)) {
            a = b.ta;
            A(!1);
            a = a.$;
            if (!Array.isArray(a)) throw Error("cannot mark non-array as immutable");
            Pe(a, 2)
        }
        return b.ta
    }
    return b.value
};
$e.prototype.get = function(a) {
    if (a = this.map[a.toString()]) return bf(this, a)
};
$e.prototype.has = function(a) {
    return a.toString() in this.map
};
var af = function(a) {
    a = a.map;
    var b = [],
        c;
    for (c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
    return b
};
$e.prototype[Symbol.iterator] = function() {
    return this.entries()
};
var Ze = function(a, b) {
        this.key = a;
        this.value = b;
        this.ta = void 0
    },
    cf = function(a) {
        this.Cd = 0;
        this.ca = a
    };
cf.prototype.next = function() {
    return this.Cd < this.ca.length ? {
        done: !1,
        value: this.ca[this.Cd++]
    } : {
        done: !0,
        value: void 0
    }
};
cf.prototype[Symbol.iterator] = function() {
    return this
};
var df;
var K = function(a, b, c) {
        Ha(this, K, "The message constructor should only be used by subclasses");
        A(this.constructor !== K, "Message is an abstract class and cannot be directly constructed");
        if (!0 !== this[Ue]) {
            A(!0 === this[Ve], "Message can only be subclassed by proto gencode.");
            var d = Object.getPrototypeOf(A(Object.getPrototypeOf(this)));
            A(d.hasOwnProperty(Ve), "Generated jspb classes should not be extended")
        }
        d = df;
        df = null;
        a || (a = d);
        d = this.constructor.zg;
        a || (a = d ? [d] : []);
        this.ua = (d ? 0 : -1) - (this.constructor.xg || 0);
        this.j = null;
        this.$ = a;
        a: {
            d = this.$.length;a = d - 1;
            if (d && (d = this.$[a], Re(d))) {
                this.Ha = a - this.ua;
                this.ka = d;
                break a
            }
            void 0 !== b && -1 < b ? (this.Ha = Math.max(b, a + 1 - this.ua), this.ka = null) : this.Ha = Number.MAX_VALUE
        }
        if (c)
            for (b = 0; b < c.length; b++) a = c[b], a < this.Ha ? (a += this.ua, (d = this.$[a]) ? Qe(d) : this.$[a] = ef) : (ff(this), (d = this.ka[a]) ? Qe(d) : this.ka[a] = ef)
    },
    ef = Object.freeze(Qe([])),
    ff = function(a) {
        var b = a.Ha + a.ua;
        a.$[b] || (a.ka = a.$[b] = {})
    },
    gf = function(a, b, c) {
        return -1 === b ? null : (void 0 === c ? 0 : c) || b >= a.Ha ? a.ka ? a.ka[b] : void 0 :
            a.$[b + a.ua]
    },
    hf = function(a, b) {
        var c = void 0 === c ? !1 : c;
        var d = gf(a, b, c);
        null == d && (d = ef);
        d === ef && (d = Qe(d.slice()), L(a, b, d, c));
        return d
    },
    jf = function(a, b) {
        a = gf(a, 1);
        return null == a ? b : a
    },
    kf = function(a, b, c) {
        a.j || (a.j = {});
        if (b in a.j) return a.j[b];
        var d = gf(a, b);
        d || (d = Qe([]), L(a, b, d));
        c = new $e(d, c);
        return a.j[b] = c
    },
    L = function(a, b, c, d) {
        (void 0 === d ? 0 : d) || b >= a.Ha ? (ff(a), a.ka[b] = c) : a.$[b + a.ua] = c;
        return a
    },
    lf = function(a, b, c) {
        var d = void 0 === d ? !1 : d;
        return L(a, b, Qe(c || []), d)
    },
    mf = function(a, b, c, d) {
        for (var e = 0, f = 0; f < c.length; f++) {
            var g =
                c[f];
            null != gf(a, g) && (0 !== e && L(a, e, void 0), e = g)
        }(c = e) && c !== b && null != d && (a.j && c in a.j && (a.j[c] = void 0), L(a, c, void 0));
        L(a, b, d)
    },
    nf = function(a, b, c, d, e) {
        if (-1 === c) return null;
        a.j || (a.j = {});
        var f = a.j[c];
        if (f) return f;
        e = gf(a, c, void 0 === e ? !1 : e);
        if (null == e && !d) return f;
        b = new b(e);
        return a.j[c] = b
    },
    of = function(a, b, c) {
        a.j || (a.j = {});
        var d = a.j[c];
        if (!d) {
            var e = hf(a, c);
            d = [];
            for (var f = 0; f < e.length; f++) d[f] = new b(e[f]);
            a.j[c] = d
        }
        return d
    },
    pf = function(a, b, c) {
        var d = void 0 === d ? !1 : d;
        a.j || (a.j = {});
        var e = c ? c.W() : c;
        a.j[b] =
            c;
        return L(a, b, e, d)
    },
    qf = function(a, b, c) {
        var d = void 0 === d ? !1 : d;
        if (c) {
            var e = Qe([]);
            for (var f = 0; f < c.length; f++) e[f] = c[f].W();
            a.j || (a.j = {});
            a.j[b] = c
        } else a.j && (a.j[b] = void 0), e = ef;
        return L(a, b, e, d)
    };
K.prototype.toJSON = function() {
    var a = this.W();
    return Te ? a : Xe(a, Se)
};
K.prototype.W = function() {
    if (this.j)
        for (var a in this.j) {
            var b = this.j[a];
            if (Array.isArray(b))
                for (var c = 0; c < b.length; c++) b[c] && b[c].W();
            else b && b.W()
        }
    return this.$
};

function rf(a, b) {
    return Se(b)
}
var sf = function(a) {
    Te = !0;
    try {
        return JSON.stringify(a.toJSON(), rf)
    } finally {
        Te = !1
    }
};
K.prototype.toString = function() {
    return this.W().toString()
};
K.prototype.getExtension = function(a) {
    var b = a.hf,
        c = a.Re;
    return a.Bf ? c ? of (this, c, b) : hf(this, b) : c ? nf(this, c, b, void 0, !0) : gf(this, b, !0)
};
K.prototype.clone = function() {
    var a = Ha(this, K),
        b = a.constructor,
        c = Xe(a.W(), Ye);
    df = c;
    b = new b(c);
    df = null;
    tf(b, a);
    return b
};

function tf(a, b) {
    A(a, "expected `to` to be non-null");
    A(b, "expected `from` to be non-null");
    b.Hd && (a.Hd = b.Hd.slice());
    var c = b.j;
    if (c) {
        b = b.ka;
        var d = {},
            e;
        for (e in c) {
            var f = c[e];
            if (f) {
                var g = !(!b || !b[e]),
                    h = +e;
                if (Array.isArray(f)) {
                    if (f.length)
                        for (g = of (a, f[0].constructor, h), h = 0; h < Math.min(g.length, f.length); h++) tf(g[h], Ha(f[h], K))
                } else f instanceof $e ? f.Na && (d.Qb = kf(a, h, f.Na), f.forEach(function(k) {
                    return function(l, p) {
                        return tf(k.Qb.get(p), l)
                    }
                }(d))) : (Ha(f, K), (g = nf(a, f.constructor, h, void 0, g)) && tf(g, f))
            }
            d = {
                Qb: d.Qb
            }
        }
    }
};
var M = function() {
    K.apply(this, arguments)
};
u(M, K);
M.prototype[Ve] = !0;
var vf = function(a) {
    M.call(this, a, -1, uf)
};
u(vf, M);
var uf = [2];
var wf = function(a) {
    if (!a) return "";
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    0 == a.indexOf("//") && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !== c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !==
        c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (-1 != d) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e
    }
    return c + "://" + b + a
};

function xf() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        p = l = 0
    }

    function b(q) {
        for (var w = g, r = 0; 64 > r; r += 4) w[r / 4] = q[r] << 24 | q[r + 1] << 16 | q[r + 2] << 8 | q[r + 3];
        for (r = 16; 80 > r; r++) q = w[r - 3] ^ w[r - 8] ^ w[r - 14] ^ w[r - 16], w[r] = (q << 1 | q >>> 31) & 4294967295;
        q = e[0];
        var v = e[1],
            y = e[2],
            H = e[3],
            X = e[4];
        for (r = 0; 80 > r; r++) {
            if (40 > r)
                if (20 > r) {
                    var U = H ^ v & (y ^ H);
                    var va = 1518500249
                } else U = v ^ y ^ H, va = 1859775393;
            else 60 > r ? (U = v & y | H & (v | y), va = 2400959708) : (U = v ^ y ^ H, va = 3395469782);
            U = ((q << 5 | q >>> 27) & 4294967295) +
                U + X + va + w[r] & 4294967295;
            X = H;
            H = y;
            y = (v << 30 | v >>> 2) & 4294967295;
            v = q;
            q = U
        }
        e[0] = e[0] + q & 4294967295;
        e[1] = e[1] + v & 4294967295;
        e[2] = e[2] + y & 4294967295;
        e[3] = e[3] + H & 4294967295;
        e[4] = e[4] + X & 4294967295
    }

    function c(q, w) {
        if ("string" === typeof q) {
            q = unescape(encodeURIComponent(q));
            for (var r = [], v = 0, y = q.length; v < y; ++v) r.push(q.charCodeAt(v));
            q = r
        }
        w || (w = q.length);
        r = 0;
        if (0 == l)
            for (; r + 64 < w;) b(q.slice(r, r + 64)), r += 64, p += 64;
        for (; r < w;)
            if (f[l++] = q[r++], p++, 64 == l)
                for (l = 0, b(f); r + 64 < w;) b(q.slice(r, r + 64)), r += 64, p += 64
    }

    function d() {
        var q = [],
            w = 8 * p;
        56 > l ? c(h, 56 - l) : c(h, 64 - (l - 56));
        for (var r = 63; 56 <= r; r--) f[r] = w & 255, w >>>= 8;
        b(f);
        for (r = w = 0; 5 > r; r++)
            for (var v = 24; 0 <= v; v -= 8) q[w++] = e[r] >> v & 255;
        return q
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var l, p;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        Ue: function() {
            for (var q = d(), w = "", r = 0; r < q.length; r++) w += "0123456789ABCDEF".charAt(Math.floor(q[r] / 16)) + "0123456789ABCDEF".charAt(q[r] % 16);
            return w
        }
    }
};
var zf = function(a, b, c) {
        var d = String(x.location.href);
        return d && a && b ? [b, yf(wf(d), a, c || null)].join(" ") : null
    },
    yf = function(a, b, c) {
        var d = [],
            e = [];
        if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a], Ka(d, function(h) {
            e.push(h)
        }), Af(e.join(" "));
        var f = [],
            g = [];
        Ka(c, function(h) {
            g.push(h.key);
            f.push(h.value)
        });
        c = Math.floor((new Date).getTime() / 1E3);
        e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
        Ka(d, function(h) {
            e.push(h)
        });
        a = Af(e.join(" "));
        a = [c, a];
        0 == g.length || a.push(g.join(""));
        return a.join("_")
    },
    Af = function(a) {
        var b =
            xf();
        b.update(a);
        return b.Ue().toLowerCase()
    };
var Bf = {};
var Cf = function(a) {
    this.tb = a || {
        cookie: ""
    }
};
m = Cf.prototype;
m.isEnabled = function() {
    if (!x.navigator.cookieEnabled) return !1;
    if (this.tb.cookie) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        Wd: 60
    });
    if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
m.set = function(a, b, c) {
    var d = !1;
    if ("object" === typeof c) {
        var e = c.Ag;
        d = c.$f || !1;
        var f = c.domain || void 0;
        var g = c.path || void 0;
        var h = c.Wd
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    this.tb.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
};
m.get = function(a, b) {
    for (var c = a + "=", d = (this.tb.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
        f = Ma(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
        if (f == a) return ""
    }
    return b
};
m.remove = function(a, b, c) {
    var d = void 0 !== this.get(a);
    this.set(a, "", {
        Wd: 0,
        path: b,
        domain: c
    });
    return d
};
m.clear = function() {
    for (var a = Df(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b])
};
var Df = function(a) {
        a = (a.tb.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++) e = Ma(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    },
    Ef = new Cf("undefined" == typeof document ? null : document);
var Ff = function(a) {
        return !!Bf.FPA_SAMESITE_PHASE2_MOD || !(void 0 === a || !a)
    },
    Gf = function(a, b, c, d) {
        (a = x[a]) || (a = (new Cf(document)).get(b));
        return a ? zf(a, c, d) : null
    },
    Hf = function(a, b) {
        b = void 0 === b ? !1 : b;
        var c = wf(String(x.location.href)),
            d = [];
        var e = b;
        e = void 0 === e ? !1 : e;
        var f = x.__SAPISID || x.__APISID || x.__3PSAPISID || x.__OVERRIDE_SID;
        Ff(e) && (f = f || x.__1PSAPISID);
        if (f) e = !0;
        else {
            var g = new Cf(document);
            f = g.get("SAPISID") || g.get("APISID") || g.get("__Secure-3PAPISID") || g.get("SID");
            Ff(e) && (f = f || g.get("__Secure-1PAPISID"));
            e = !!f
        }
        e && (e = (c = 0 == c.indexOf("https:") || 0 == c.indexOf("chrome-extension:") || 0 == c.indexOf("moz-extension:")) ? x.__SAPISID : x.__APISID, e || (e = new Cf(document), e = e.get(c ? "SAPISID" : "APISID") || e.get("__Secure-3PAPISID")), (e = e ? zf(e, c ? "SAPISIDHASH" : "APISIDHASH", a) : null) && d.push(e), c && Ff(b) && ((b = Gf("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && d.push(b), (a = Gf("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && d.push(a)));
        return 0 == d.length ? null : d.join(" ")
    };
var Jf = function(a) {
    M.call(this, a, -1, If)
};
u(Jf, M);
var Lf = function(a) {
    M.call(this, a, -1, Kf)
};
u(Lf, M);
var Mf = function(a) {
    M.call(this, a)
};
u(Mf, M);
var Nf = function(a) {
    M.call(this, a)
};
u(Nf, M);
var If = [3, 6, 4],
    Kf = [1],
    Of = [1, 2, 3],
    Pf = [1, 2, 3];
var Rf = function(a) {
    M.call(this, a, -1, Qf)
};
u(Rf, M);
var Qf = [1];
var Sf = function(a, b) {
    this.name = a;
    this.value = b
};
Sf.prototype.toString = function() {
    return this.name
};
var Tf = new Sf("OFF", Infinity),
    Uf = new Sf("SEVERE", 1E3),
    Vf = new Sf("WARNING", 900),
    Wf = new Sf("INFO", 800),
    Xf = new Sf("CONFIG", 700),
    Yf = new Sf("FINE", 500),
    Zf = function() {
        this.rb = 0;
        this.clear()
    },
    $f;
Zf.prototype.clear = function() {
    this.ed = Array(this.rb);
    this.nd = -1;
    this.Id = !1
};
var ag = function(a, b, c) {
    this.reset(a || Tf, b, c, void 0, void 0)
};
ag.prototype.reset = function() {};
var bg = function(a, b) {
        this.level = null;
        this.uf = [];
        this.parent = (void 0 === b ? null : b) || null;
        this.children = [];
        this.R = {
            pc: function() {
                return a
            }
        }
    },
    cg = function(a) {
        if (a.level) return a.level;
        if (a.parent) return cg(a.parent);
        Da("Root logger has no level set.");
        return Tf
    },
    dg = function(a, b) {
        for (; a;) a.uf.forEach(function(c) {
            c(b)
        }), a = a.parent
    },
    eg = function() {
        this.entries = {};
        var a = new bg("");
        a.level = Xf;
        this.entries[""] = a
    },
    fg, gg = function(a, b, c) {
        var d = a.entries[b];
        if (d) return void 0 !== c && (d.level = c), d;
        d = gg(a, b.substr(0,
            b.lastIndexOf(".")));
        var e = new bg(b, d);
        a.entries[b] = e;
        d.children.push(e);
        void 0 !== c && (e.level = c);
        return e
    },
    hg = function() {
        fg || (fg = new eg);
        return fg
    },
    ig = function(a, b, c) {
        var d;
        if (d = a)
            if (d = a && b) {
                d = b.value;
                var e = a ? cg(gg(hg(), a.pc())) : Tf;
                d = d >= e.value
            }
        if (d) {
            b = b || Tf;
            d = gg(hg(), a.pc());
            "function" === typeof c && (c = c());
            $f || ($f = new Zf);
            e = $f;
            a = a.pc();
            if (0 < e.rb) {
                var f = (e.nd + 1) % e.rb;
                e.nd = f;
                e.Id ? (e = e.ed[f], e.reset(b, c, a), a = e) : (e.Id = f == e.rb - 1, a = e.ed[f] = new ag(b, c, a))
            } else a = new ag(b, c, a);
            dg(d, a)
        }
    },
    jg = function(a, b) {
        a &&
            ig(a, Wf, b)
    },
    N = function(a, b) {
        a && ig(a, Yf, b)
    };
var kg = function(a) {
    A(0 < a, "Initial value must be greater than zero.");
    A(3E5 >= a, "Max value should be at least as large as initial value.");
    A(!0, "Randomness factor should be between 0 and 1.");
    this.Gd = a;
    this.Xd = 3E5;
    this.Sa = this.za = a;
    this.de = .1;
    this.Ge = 2
};
kg.prototype.reset = function() {
    this.Sa = this.za = this.Gd
};
var lg = function() {};
lg.prototype.gd = null;
var ng = function(a) {
    var b;
    (b = a.gd) || (b = {}, mg(a) && (b[0] = !0, b[1] = !0), b = a.gd = b);
    return b
};
var og, pg = function() {};
z(pg, lg);
var qg = function(a) {
        return (a = mg(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    },
    mg = function(a) {
        if (!a.Dd && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.Dd = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.Dd
    };
og = new pg;
var O = function(a) {
    J.call(this);
    this.headers = new Map;
    this.Pb = a || null;
    this.ha = !1;
    this.Ob = this.g = null;
    this.Ya = this.Ud = this.Bb = "";
    this.qa = this.sc = this.wb = this.ic = !1;
    this.La = 0;
    this.Lb = null;
    this.fe = "";
    this.Nb = this.Qf = this.Uc = !1;
    this.Oc = null
};
z(O, J);
O.prototype.K = gg(hg(), "goog.net.XhrIo", void 0).R;
var rg = /^https?$/i,
    sg = ["POST", "PUT"],
    tg = [],
    ug = function(a, b, c, d, e, f, g) {
        var h = new O;
        tg.push(h);
        b && h.O("complete", b);
        h.M.add("ready", h.Ne, !0, void 0, void 0);
        f && (h.La = Math.max(0, f));
        g && (h.Uc = g);
        h.send(a, c, d, e)
    };
O.prototype.Ne = function() {
    this.T();
    La(tg, this)
};
O.prototype.setTrustToken = function(a) {
    this.Oc = a
};
O.prototype.send = function(a, b, c, d) {
    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Bb + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.Bb = a;
    this.Ya = "";
    this.Ud = b;
    this.ic = !1;
    this.ha = !0;
    this.g = this.Pb ? qg(this.Pb) : qg(og);
    this.Ob = this.Pb ? ng(this.Pb) : ng(og);
    this.g.onreadystatechange = xa(this.ae, this);
    this.Qf && "onprogress" in this.g && (this.g.onprogress = xa(function(g) {
        this.$d(g, !0)
    }, this), this.g.upload && (this.g.upload.onprogress = xa(this.$d, this)));
    try {
        N(this.K, P(this, "Opening Xhr")),
            this.sc = !0, this.g.open(b, String(a), !0), this.sc = !1
    } catch (g) {
        N(this.K, P(this, "Error opening Xhr: " + g.message));
        vg(this, g);
        return
    }
    a = c || "";
    c = new Map(this.headers);
    if (d)
        if (Object.getPrototypeOf(d) === Object.prototype)
            for (var e in d) c.set(e, d[e]);
        else if ("function" === typeof d.keys && "function" === typeof d.get) {
        e = t(d.keys());
        for (var f = e.next(); !f.done; f = e.next()) f = f.value, c.set(f, d.get(f))
    } else throw Error("Unknown input type for opt_headers: " + String(d));
    d = Array.from(c.keys()).find(function(g) {
        return "content-type" ==
            g.toLowerCase()
    });
    e = x.FormData && a instanceof x.FormData;
    !(0 <= Ja(sg, b)) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    b = t(c);
    for (d = b.next(); !d.done; d = b.next()) c = t(d.value), d = c.next().value, c = c.next().value, this.g.setRequestHeader(d, c);
    this.fe && (this.g.responseType = this.fe);
    "withCredentials" in this.g && this.g.withCredentials !== this.Uc && (this.g.withCredentials = this.Uc);
    if ("setTrustToken" in this.g && this.Oc) try {
        this.g.setTrustToken(this.Oc)
    } catch (g) {
        N(this.K, P(this, "Error SetTrustToken: " +
            g.message))
    }
    try {
        wg(this), 0 < this.La && (this.Nb = xg(this.g), N(this.K, P(this, "Will abort after " + this.La + "ms if incomplete, xhr2 " + this.Nb)), this.Nb ? (this.g.timeout = this.La, this.g.ontimeout = xa(this.pe, this)) : this.Lb = Je(this.pe, this.La, this)), N(this.K, P(this, "Sending request")), this.wb = !0, this.g.send(a), this.wb = !1
    } catch (g) {
        N(this.K, P(this, "Send error: " + g.message)), vg(this, g)
    }
};
var xg = function(a) {
    return mb && wb(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout
};
O.prototype.pe = function() {
    "undefined" != typeof qa && this.g && (this.Ya = "Timed out after " + this.La + "ms, aborting", N(this.K, P(this, this.Ya)), this.dispatchEvent("timeout"), this.abort(8))
};
var vg = function(a, b) {
        a.ha = !1;
        a.g && (a.qa = !0, a.g.abort(), a.qa = !1);
        a.Ya = b;
        yg(a);
        zg(a)
    },
    yg = function(a) {
        a.ic || (a.ic = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
O.prototype.abort = function() {
    this.g && this.ha && (N(this.K, P(this, "Aborting")), this.ha = !1, this.qa = !0, this.g.abort(), this.qa = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), zg(this))
};
O.prototype.ea = function() {
    this.g && (this.ha && (this.ha = !1, this.qa = !0, this.g.abort(), this.qa = !1), zg(this, !0));
    O.sa.ea.call(this)
};
O.prototype.ae = function() {
    this.Ca || (this.sc || this.wb || this.qa ? Ag(this) : this.Mf())
};
O.prototype.Mf = function() {
    Ag(this)
};
var Ag = function(a) {
    if (a.ha && "undefined" != typeof qa)
        if (a.Ob[1] && 4 == Bg(a) && 2 == Cg(a)) N(a.K, P(a, "Local request error detected and ignored"));
        else if (a.wb && 4 == Bg(a)) Je(a.ae, 0, a);
    else if (a.dispatchEvent("readystatechange"), 4 == Bg(a)) {
        N(a.K, P(a, "Request complete"));
        a.ha = !1;
        try {
            if (Dg(a)) a.dispatchEvent("complete"), a.dispatchEvent("success");
            else {
                try {
                    var b = 2 < Bg(a) ? a.g.statusText : ""
                } catch (c) {
                    N(a.K, "Can not get status: " + c.message), b = ""
                }
                a.Ya = b + " [" + Cg(a) + "]";
                yg(a)
            }
        } finally {
            zg(a)
        }
    }
};
O.prototype.$d = function(a, b) {
    A("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
    this.dispatchEvent(Eg(a, "progress"));
    this.dispatchEvent(Eg(a, b ? "downloadprogress" : "uploadprogress"))
};
var Eg = function(a, b) {
        return {
            type: b,
            lengthComputable: a.lengthComputable,
            loaded: a.loaded,
            total: a.total
        }
    },
    zg = function(a, b) {
        if (a.g) {
            wg(a);
            var c = a.g,
                d = a.Ob[0] ? ra : null;
            a.g = null;
            a.Ob = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
                (a = a.K) && ig(a, Uf, "Problem encountered resetting onreadystatechange: " + e.message)
            }
        }
    },
    wg = function(a) {
        a.g && a.Nb && (a.g.ontimeout = null);
        a.Lb && (x.clearTimeout(a.Lb), a.Lb = null)
    },
    Dg = function(a) {
        var b = Cg(a);
        a: switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                var c = !0;
                break a;
            default:
                c = !1
        }
        if (!c) {
            if (b = 0 === b) a = String(a.Bb).match(mc)[1] || null, !a && x.self && x.self.location && (a = x.self.location.protocol, a = a.substr(0, a.length - 1)), b = !rg.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    },
    Bg = function(a) {
        return a.g ? a.g.readyState : 0
    },
    Cg = function(a) {
        try {
            return 2 < Bg(a) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    };
O.prototype.getResponseHeader = function(a) {
    if (this.g && 4 == Bg(this)) return a = this.g.getResponseHeader(a), null === a ? void 0 : a
};
O.prototype.getAllResponseHeaders = function() {
    return this.g && 4 == Bg(this) ? this.g.getAllResponseHeaders() || "" : ""
};
var P = function(a, b) {
    return b + " [" + a.Ud + " " + a.Bb + " " + Cg(a) + "]"
};
var Fg = function(a) {
    M.call(this, a)
};
u(Fg, M);
var Gg = function() {
    var a = new Fg,
        b = document.documentElement.getAttribute("lang");
    return L(a, 5, b)
};
Fg.prototype.ib = function(a) {
    L(this, 7, a)
};
var Hg = function(a) {
    M.call(this, a)
};
u(Hg, M);
var Jg = function(a) {
    M.call(this, a, 31, Ig)
};
u(Jg, M);
Jg.prototype.jb = function(a) {
    return L(this, 26, a)
};
var Ig = [3, 20, 27];
var Lg = function(a) {
    M.call(this, a, 17, Kg)
};
u(Lg, M);
var Mg = function(a, b) {
        return qf(a, 3, b)
    },
    Ng = function(a, b) {
        return L(a, 14, b)
    };
Lg.prototype.je = function(a) {
    pf(this, 13, a)
};
var Kg = [3, 5];
var Pg = function(a) {
    M.call(this, a, 6, Og)
};
u(Pg, M);
var Og = [5];
var Qg = function(a) {
    M.call(this, a)
};
u(Qg, M);
var Rg = new function(a, b, c) {
    this.hf = a;
    this.Re = b;
    this.Bf = c
}(175237375, Qg, 0);
var Tg = function(a, b, c, d, e, f, g, h, k, l, p) {
    J.call(this);
    var q = this;
    this.ja = "";
    this.L = [];
    this.Td = "";
    this.Pc = this.Rc = this.$b = !1;
    this.Yd = this.Ic = -1;
    this.ld = !1;
    this.pa = this.Y = null;
    this.$a = 0;
    this.bg = 1;
    this.ac = null;
    this.Mc = 0;
    this.Jb = !1;
    J.call(this);
    this.Db = a;
    this.wd = b || ra;
    this.va = new Lg;
    this.yc = d;
    this.Fb = p;
    this.bufferSize = 1E3;
    this.rg = ya(Nc, 0, 1);
    this.Zb = e || null;
    this.Ia = c || null;
    this.hc = g || !1;
    this.zc = k || null;
    this.R = gg(hg(), "playlog.clearcut.ClearcutBase", void 0).R;
    this.withCredentials = !h;
    this.Md = f || !1;
    this.Ld = !this.Md && (yb && wb(65) || xb && wb(45) || zb && wb(12) || (gb() || B("iPad") || B("iPod")) && hb()) && !!window && !!window.navigator && !!window.navigator.sendBeacon;
    a = L(new Hg, 1, 1);
    f || (f = Gg(), pf(a, 11, f));
    pf(this.va, 1, a);
    L(this.va, 2, this.Db);
    this.oa = new kg(1E4);
    this.s = new Ie(this.oa.za);
    Xc(this, ya(Vc, this.s));
    nd(this.s, "tick", kc(Sg(this, l)), !1, this);
    this.Yb = new Ie(6E5);
    Xc(this, ya(Vc, this.Yb));
    nd(this.Yb, "tick", kc(Sg(this, l)), !1, this);
    this.hc || this.Yb.start();
    this.Md || (nd(document, "visibilitychange", function() {
        "hidden" ===
        document.visibilityState && q.jc()
    }), nd(document, "pagehide", this.jc, !1, this))
};
u(Tg, J);
var Sg = function(a, b) {
    return b ? function() {
        b().then(a.flush.bind(a))
    } : a.flush
};
Tg.prototype.ea = function() {
    this.jc();
    J.prototype.ea.call(this)
};
var Ug = function(a) {
    a.Zb || (a.Zb = .01 > a.rg() ? "https://www.google.com/log?format=json&hasfast=true" : "https://play.google.com/log?format=json&hasfast=true");
    return a.Zb
};
m = Tg.prototype;
m.Gc = function(a) {
    gf(a, 1) || L(a, 1, 1);
    pf(this.va, 1, a)
};
m.jb = function(a) {
    this.ja = a
};
m.ne = function(a) {
    this.Y || (this.Y = new vf);
    lf(this.Y, 2, a)
};
m.ie = function(a) {
    a ? (this.Y || (this.Y = new vf), a = sf(a), L(this.Y, 4, a)) : this.Y && L(this.Y, 4, void 0)
};
m.je = function(a) {
    this.ac = a
};
m.me = function(a) {
    this.pa = a
};
m.ib = function(a) {
    var b = nf(this.va, Hg, 1),
        c = nf(b, Fg, 11);
    c || (c = new Fg);
    c.ib(a);
    pf(b, 11, c);
    this.Gc(b)
};
m.le = function(a) {
    this.ld = !0;
    Vg(this, a)
};
var Vg = function(a, b) {
    a.oa = new kg(1 > b ? 1 : b);
    a.s.setInterval(a.oa.za)
};
Tg.prototype.log = function(a) {
    a = a.clone();
    var b = this.bg++;
    L(a, 21, b);
    this.ja && a.jb(this.ja);
    gf(a, 1) || L(a, 1, Date.now().toString());
    null != gf(a, 15) || L(a, 15, 60 * (new Date).getTimezoneOffset());
    this.Y && (b = this.Y.clone(), pf(a, 16, b));
    for (; this.L.length >= this.bufferSize;) this.L.shift(), ++this.$a;
    this.L.push(a);
    this.dispatchEvent(new Wg(a));
    this.hc || this.s.enabled || this.s.start()
};
Tg.prototype.flush = function(a, b) {
    var c = this;
    if (0 === this.L.length) a && a();
    else if (this.Jb) Xg(this);
    else {
        var d = Date.now();
        if (this.Yd > d && this.Ic < d) jg(this.R, "Not flushing because server requested delay."), b && b("throttled");
        else {
            var e = Ng(Mg(L(this.va.clone(), 4, Date.now().toString()), this.L), this.$a);
            this.ac && e.je(this.ac);
            d = {};
            var f = this.wd();
            f && (d.Authorization = f);
            var g = Ug(this);
            this.Ia && (d["X-Goog-AuthUser"] = this.Ia, g = rc(g, "authuser", this.Ia));
            this.zc && (d["X-Goog-PageId"] = this.zc, g = rc(g, "pageId", this.zc));
            if (f && this.Td === f) jg(this.R, "XHR with unauthorized request not retried"), b && b("stale-auth-token");
            else if (jg(this.R, "Flushing log to clearcut."), this.L = [], this.s.enabled && this.s.stop(), this.$a = 0, this.$b) jg(this.R, sf(e)), d && jg(this.R, JSON.stringify(d)), a && a();
            else {
                var h = sf(e),
                    k;
                this.pa && this.pa.yg(h.length) && (k = this.pa.wg(h));
                var l = {
                        url: g,
                        body: h,
                        Ie: 1,
                        Ec: d,
                        Uf: "POST",
                        withCredentials: this.withCredentials,
                        Mc: this.Mc
                    },
                    p = function(r) {
                        c.oa.reset();
                        c.s.setInterval(c.oa.za);
                        if (r) {
                            var v = null;
                            try {
                                var y = JSON.parse(r.replace(")]}'\n",
                                    ""));
                                v = new Pg(y)
                            } catch (H) {
                                (r = c.R) && ig(r, Vf, "Response parse failed: " + H.toString())
                            }
                            v && (r = Number(jf(v, "-1")), 0 < r && (c.Ic = Date.now(), c.Yd = c.Ic + r), v = v.getExtension(Rg)) && (v = jf(v, -1), -1 != v && (c.ld || Vg(c, v)))
                        }
                        a && a()
                    },
                    q = function(r) {
                        var v = of (e, Jg, 3),
                            y = c.oa;
                        y.Sa = Math.min(y.Xd, y.Sa * y.Ge);
                        y.za = Math.min(y.Xd, y.Sa + (y.de ? Math.round(y.de * (Math.random() - .5) * 2 * y.Sa) : 0));
                        c.s.setInterval(c.oa.za);
                        401 === r && f && (c.Td = f);
                        if (500 <= r && 600 > r || 401 === r || 0 === r) c.L = v.concat(c.L), c.hc || c.s.enabled || c.s.start();
                        (v = c.R) && ig(v, Vf, "Flush failed. Status code: " +
                            r);
                        b && b("net-send-failed", r)
                    },
                    w = function() {
                        c.Fb ? c.Fb.send(l, p, q) : c.yc(l, p, q)
                    };
                k ? k.then(function(r) {
                    l.Ec["Content-Encoding"] = "gzip";
                    l.Ec["Content-Type"] = "application/binary";
                    l.body = r;
                    l.Ie = 2;
                    w()
                }, function() {
                    w()
                }) : w()
            }
        }
    }
};
Tg.prototype.jc = function() {
    this.$b || (this.Rc && Xg(this), this.Pc && Yg(this), this.flush())
};
var Xg = function(a) {
        jg(a.R, "Flushing log using sendBeacon.");
        Zg(a, 32, 10, function(b, c) {
            b = rc(b, "format", "json");
            b = window.navigator.sendBeacon(b, sf(c));
            a.Jb && !b && (a.Jb = !1);
            return b
        })
    },
    Yg = function(a) {
        jg(a.R, "Flushing log using Image GET.");
        Zg(a, 6, 5, function(b, c) {
            c = sf(c);
            c = Cb(Ia(c), 3);
            c = qc(b, "format", "base64json", "p", c);
            if (15360 < c.length) return !1;
            b = new Image;
            a: {
                try {
                    var d = b && b.ownerDocument,
                        e = d && (d.defaultView || d.parentWindow);
                    e = e || x;
                    if (e.Element && e.Location) {
                        var f = e;
                        break a
                    }
                } catch (h) {}
                f = null
            }
            if (f && "undefined" !=
                typeof f.HTMLImageElement && (!b || !(b instanceof f.HTMLImageElement) && (b instanceof f.Location || b instanceof f.Element))) {
                if (ta(b)) try {
                    var g = b.constructor.displayName || b.constructor.name || Object.prototype.toString.call(b)
                } catch (h) {
                    g = "<object could not be stringified>"
                } else g = void 0 === b ? "undefined" : null === b ? "null" : typeof b;
                Da("Argument is not a %s (or a non-Element, non-Location mock); got: %s", "HTMLImageElement", g)
            }
            if (c instanceof Yb) f = c;
            else a: if (f = c, d = /^data:image\//i.test(c), !(f instanceof Yb)) {
                f =
                    "object" == typeof f && f.vb ? f.Wa() : String(f);
                if (d && /^data:/i.test(f) && (d = String(f), d = d.replace(/(%0A|%0D)/g, ""), d = ((e = d.match(ac)) && $b.test(e[1]) ? new Yb(d, Xb) : null) || cc, d.Wa() == f)) {
                    f = d;
                    break a
                }
                A(bc.test(f), "%s does not match the safe URL pattern", f) || (f = "about:invalid#zClosurez");
                f = new Yb(f, Xb)
            }
            b.src = Zb(f);
            return !0
        })
    },
    Zg = function(a, b, c, d) {
        if (0 !== a.L.length) {
            var e = vc(Ug(a), "format");
            e = qc(e, "auth", a.wd(), "authuser", a.Ia || "0");
            for (var f = 0; f < c && a.L.length; ++f) {
                var g = a.L.slice(0, b),
                    h = Mg(L(a.va.clone(), 4,
                        Date.now().toString()), g);
                0 === f && Ng(h, a.$a);
                if (!d(e, h)) break;
                a.L = a.L.slice(g.length)
            }
            a.s.enabled && a.s.stop();
            a.$a = 0
        }
    },
    Wg = function() {
        Yc.call(this, "event-logged", void 0)
    };
u(Wg, Yc);

function $g(a, b, c) {
    ug(a.url, function(d) {
        d = d.target;
        if (Dg(d)) {
            try {
                var e = d.g ? d.g.responseText : ""
            } catch (f) {
                N(d.K, "Can not get responseText: " + f.message), e = ""
            }
            b(e)
        } else c(Cg(d))
    }, a.Uf, a.body, a.Ec, a.Mc, a.withCredentials)
};

function ah(a) {
    this.Db = a;
    this.Ia = "0";
    this.pd = "https://play.google.com/log?format=json&hasfast=true";
    this.We = !1;
    this.Df = !0;
    this.qd = !1;
    this.yc = $g;
    this.ja = "";
    this.Ze = this.Qc = this.Sc = !1
}
m = ah.prototype;
m.ib = function(a) {
    this.fd = a
};
m.me = function(a) {
    this.pa = a
};
m.jb = function(a) {
    this.ja = a;
    return this
};
m.ie = function(a) {
    this.jd = a
};
m.ne = function(a) {
    this.be = a
};
m.Gc = function(a) {
    this.kd = a
};
m.Rc = function() {
    this.Sc = !0;
    return this
};
m.Pc = function() {
    this.Qc = !0;
    return this
};
m.le = function(a) {
    this.ud = Math.max(a, 5E3)
};
var bh = function() {
    var a = 1609;
    a = void 0 === a ? -1 : a;
    var b = void 0 === b ? "" : b;
    var c = void 0 === c ? "" : c;
    var d = void 0 === d ? !1 : d;
    var e = void 0 === e ? "" : e;
    var f = (new ah(a)).jb(b);
    "" != c && (f.pd = c);
    d && (f.qd = !0);
    e && f.ib(e);
    c = new Tg(f.Db, f.kf ? f.kf : Hf, f.Ia, f.yc, f.pd, f.qd, f.We, void 0, void 0, void 0, f.Fb ? f.Fb : void 0);
    f.Df || (c.$b = !0);
    f.kd && c.Gc(f.kd);
    f.fd && c.ib(f.fd);
    f.pa && c.me(f.pa);
    f.ja && c.jb(f.ja);
    f.jd && c.ie(f.jd);
    f.be && c.ne(f.be);
    f.Sc && (c.Rc = f.Sc && c.Ld);
    f.Qc && (c.Pc = f.Qc);
    f.ud && c.le(f.ud);
    f.Ze && (c.Jb = c.Ld);
    this.Db = a;
    this.ja =
        b;
    this.qe = c
};
bh.prototype.flush = function(a) {
    var b = a || [];
    if (b.length) {
        a = new Rf;
        for (var c = [], d = 0; d < b.length; d++) {
            var e = b[d],
                f = e;
            var g = new Jf;
            g = L(g, 1, f.Za);
            for (var h = f, k = [], l = 0; l < h.ub.length; l++) k.push(h.ub[l].sd);
            g = lf(g, 3, k);
            h = [];
            k = [];
            l = t(f.wa.keys());
            for (var p = l.next(); !p.done; p = l.next()) k.push(p.value.split(","));
            for (l = 0; l < k.length; l++) {
                p = k[l];
                var q = f.Le;
                for (var w = f.xd(p) || [], r = [], v = 0; v < w.length; v++) {
                    var y = w[v];
                    y = y && y.hd;
                    var H = new Nf;
                    switch (q) {
                        case 3:
                            mf(H, 1, Pf, Number(y));
                            break;
                        case 2:
                            mf(H, 2, Pf, Number(y))
                    }
                    r.push(H)
                }
                q = r;
                for (w = 0; w < q.length; w++) {
                    r = q[w];
                    v = new Lf;
                    r = pf(v, 2, r);
                    v = p;
                    y = [];
                    H = f;
                    for (var X = [], U = 0; U < H.ub.length; U++) X.push(H.ub[U].td);
                    H = X;
                    for (X = 0; X < H.length; X++) {
                        U = H[X];
                        var va = v[X],
                            ic = new Mf;
                        switch (U) {
                            case 3:
                                mf(ic, 1, Of, String(va));
                                break;
                            case 2:
                                mf(ic, 2, Of, Number(va));
                                break;
                            case 1:
                                mf(ic, 3, Of, "true" == va)
                        }
                        y.push(ic)
                    }
                    qf(r, 1, y);
                    h.push(r)
                }
            }
            qf(g, 4, h);
            c.push(g);
            e.clear()
        }
        qf(a, 1, c);
        b = this.qe;
        a instanceof Jg ? b.log(a) : (c = new Jg, a = sf(a), a = L(c, 8, a), b.log(a));
        this.qe.flush()
    }
};
var Q = {
        tg: {}
    },
    R = R || {};
R.Xb = "APISID";
R.Wb = "SAPISID";
R.Ub = "__Secure-3PAPISID";
R.Z = function(a) {
    a = encodeURIComponent(a);
    if (a = Ef.get(a)) return decodeURIComponent(a)
};
R.kc = function(a) {
    var b;
    (a = R.Z(a)) && (b = String(ch(a)));
    return b
};
R.fg = function(a, b, c) {
    Ef.set(a, b, c)
};
Q = Q || {};
Q.wf = function(a, b, c, d) {
    d = void 0 === d ? !1 : d;
    if (!0 === Q.uc) a();
    else {
        var e = 2,
            f = function() {
                e--;
                0 == e && (Q.uc = !0, a())
            },
            g = function(h) {
                b(h)
            };
        switch (dh()) {
            case "sessionStorage":
                Q.kb = new eh;
                Q.kb.U(f, g);
                if (c) try {
                    Q.kb.clear()
                } catch (h) {}
                break;
            case "inMemoryStorage":
                Q.kb = new fh;
                Q.kb.U(f, g);
                break;
            default:
                c = Error("Unsupported storage type: " + dh());
                b(c);
                return
        }
        switch (gh()) {
            case "localStorage":
                Q.Ga = new hh;
                Q.Ga.U(f, g);
                break;
            case "indexedDb":
                Q.Ga = new ih;
                Q.Ga.U(f, g);
                break;
            case "cookieStorage":
                Q.Ga = new jh;
                d ? f() : Q.Ga.U(f, g);
                break;
            default:
                c = Error("Unsupported storage type: " + gh()), b(c)
        }
    }
};
Q.Ad = function() {
    if (!Q.uc) throw Error("Storages are not initialized yet!");
    return Q.Ga
};
Q.sf = function() {
    if (!Q.uc) throw Error("Storages are not initialized yet!");
    return Q.kb
};
var hh = function() {
    this.Da = null
};
m = hh.prototype;
m.U = function(a, b) {
    we() ? (this.Da = window.localStorage, a()) : b && b(Error("localStorage is not available in the current environment."))
};
m.getItem = function(a, b) {
    b(this.Da.getItem(a))
};
m.setItem = function(a, b, c) {
    void 0 === b || null === b ? this.Da.removeItem(a) : this.Da.setItem(a, b);
    c && c()
};
m.removeItem = function(a, b) {
    this.Da.removeItem(a);
    b && b()
};
m.clear = function(a) {
    this.Da.clear();
    a && a()
};
var ih = function() {
    this.Ua = void 0
};
m = ih.prototype;
m.U = function(a, b) {
    var c = this,
        d = window.indexedDB.open("oauth");
    d.onsuccess = function(e) {
        c.Ua = e.target.result;
        a()
    };
    d.onupgradeneeded = function(e) {
        e.target.result.createObjectStore("oauth")
    };
    d.onerror = function(e) {
        e = e.target.errorCode;
        b && b(Error("IndexedDb initialization failed: " + e))
    }
};
m.getItem = function(a, b) {
    var c = this.Ua.transaction("oauth", "readwrite").objectStore("oauth").get(a);
    c.onsuccess = function() {
        b(c.result)
    }
};
m.setItem = function(a, b, c) {
    var d = this.Ua.transaction("oauth", "readwrite").objectStore("oauth");
    if (void 0 === b || null === b) d["delete"](a);
    else d.put(b, a);
    d.transaction.oncomplete = function() {
        c && c()
    }
};
m.removeItem = function(a, b) {
    var c = this.Ua.transaction("oauth", "readwrite").objectStore("oauth");
    c["delete"](a);
    c.transaction.oncomplete = function() {
        b && b()
    }
};
m.clear = function(a) {
    var b = this.Ua.transaction("oauth", "readwrite").objectStore("oauth");
    b.clear();
    b.transaction.oncomplete = function() {
        a && a()
    }
};
var fh = function() {};
m = fh.prototype;
m.U = function(a) {
    this.Kb = {};
    a()
};
m.getItem = function(a, b) {
    b(this.Kb[a] || null)
};
m.setItem = function(a, b, c) {
    this.Kb[a] = b;
    c && c()
};
m.removeItem = function(a, b) {
    delete this.Kb[a];
    b && b()
};
m.clear = function(a) {
    this.Kb = {};
    a && a()
};
var eh = function() {
    this.Ja = null
};
m = eh.prototype;
m.U = function(a, b) {
    we() ? (this.Ja = window.sessionStorage, a()) : b && b(Error("sessionStorage is not available in the current environment."))
};
m.getItem = function(a, b) {
    b(this.Ja.getItem(a))
};
m.setItem = function(a, b, c) {
    void 0 === b || null === b ? this.Ja.removeItem(a) : this.Ja.setItem(a, b);
    c && c()
};
m.removeItem = function(a, b) {
    this.Ja.removeItem(a);
    b && b()
};
m.clear = function(a) {
    this.Ja.clear();
    a && a()
};
var jh = function() {
    this.If = S.ue
};
m = jh.prototype;
m.U = function(a, b) {
    navigator.cookieEnabled ? a() : b && b(Error("Cookies are not enabled in current environment."))
};
m.getItem = function(a, b) {
    for (var c = null, d = kh(a), e = 0; e < d.length; e++)
        if (d[e].key == a) {
            c = d[e].value;
            break
        }
    b(c)
};
m.setItem = function(a, b, c) {
    var d = S.lc(a.split(S.v)[0]);
    if (d) {
        var e = lh(d);
        b = {
            key: a,
            value: b
        };
        for (var f = 0; f < e.length; f++)
            if (e[f].key == a) {
                e.splice(f, 1);
                break
            }
        e.push(b);
        mh(this, d, e)
    }
    c && c()
};
m.removeItem = function(a, b) {
    for (var c = kh(a), d = 0; d < c.length; d++)
        if (c[d].key == a) {
            c.splice(d, 1);
            break
        }(a = S.lc(a.split(S.v)[0])) && mh(this, a, c);
    b && b()
};
m.clear = function(a) {
    Q.Pe();
    a && a()
};
var kh = function(a) {
        return (a = S.lc(a.split(S.v)[0])) ? lh(a) : []
    },
    lh = function(a) {
        a = R.Z(a);
        return Q.Te(a || null)
    },
    mh = function(a, b, c) {
        var d = Q.af(c);
        d.length > a.If ? (c.splice(0, 1), 0 < c.length ? mh(a, b, c) : F("Failed to write Cookie based cache due to the big size.")) : Q.ke(b, d)
    };
Q.Se = function(a) {
    try {
        return atob(a)
    } catch (b) {
        return a
    }
};
Q.$e = function(a) {
    try {
        return btoa(a)
    } catch (b) {
        return a
    }
};
Q.Te = function(a) {
    if (!a) return [];
    a = Q.Se(a);
    try {
        return I.parse(a).items || []
    } catch (b) {
        return F("Error while parsing items from cookie:" + b.message), []
    }
};
Q.af = function(a) {
    return Q.$e(I.stringify({
        items: a
    }))
};
Q.ke = function(a, b) {
    var c = window.location.pathname;
    c = {
        domain: window.location.hostname,
        path: -1 != navigator.userAgent.toLowerCase().indexOf("msie") || ye() ? void 0 : c,
        $f: "https:" === window.location.protocol ? !0 : void 0
    };
    R.fg(encodeURIComponent(a), encodeURIComponent(b), c)
};
Q.Pe = function() {
    var a = S.Sb;
    var b = Df(Ef).keys;
    for (var c = 0; c < b.length; c++) {
        var d = decodeURIComponent(b[c]);
        0 == d.indexOf(a) && Q.ke(d, "")
    }
};
var nh = function(a) {
    this.Pd = a;
    this.l = void 0;
    Ce.call(this, ["storageValueChanged"])
};
G(nh, Ce);
var oh = function(a, b) {
    Q.Ad().getItem(a.Pd, b)
};
nh.prototype.addListener = function(a) {
    this.addEventListener("storageValueChanged", a)
};
nh.prototype.start = function() {
    var a = this;
    oh(this, function(b) {
        a.Of = b;
        a.Zd = 0;
        a.l = new Ie;
        nd(a.l, "tick", ph(a));
        a.l.setInterval(200);
        a.l.start()
    })
};
nh.prototype.stop = function() {
    void 0 !== this.l && (this.l.stop(), this.l = void 0)
};
var ph = function(a) {
        return function() {
            a.Zd++;
            oh(a, function(b) {
                b != a.Of ? (a.dispatchEvent({
                    type: "storageValueChanged",
                    key: a.Pd,
                    newValue: b
                }), a.stop()) : 1500 <= a.Zd && a.stop()
            })
        }
    },
    ch = function(a) {
        var b = 0,
            c;
        if (a) {
            var d = 0;
            for (c = a.length; d < c; d++) {
                var e = a.charCodeAt(d);
                b = (b << 5) - b + e;
                b |= 0
            }
        }
        return b
    },
    T = function(a) {
        return !!a && 0 <= a.indexOf(S.v)
    },
    qh = function(a, b) {
        if (!a && !b) return !0;
        if (!a || !b) return !1;
        a = a.extraQueryParams;
        b = b.extraQueryParams;
        if (!a && !b) return !0;
        if (!a || !b || Object.keys && Object.keys(a).length != Object.keys(b).length) return !1;
        for (var c in a)
            if (a[c] !== b[c]) return !1;
        if (!Object.keys)
            for (c in b)
                if (a[c] !== b[c]) return !1;
        return !0
    },
    S = S || {};
S.te = 100;
S.ad = "/oauth2/sessionstate/action/updateState";
S.Vc = "/oauth2/sessionstate/action/checkOrigin";
S.Zc = "/oauth2/permission/action/refresh";
S.Yc = "/oauth2/permission/action/code";
S.Vb = "/oauth2/permission/action/listSessions";
S.ze = "/o/oauth2/revoke";
S.ob = "response_type login_hint client_id origin scope ss_domain authuser hd enable_serial_consent include_granted_scopes nonce".split(" ");
S.we = "login_hint client_id origin scope ss_domain authuser hd enable_serial_consent include_granted_scopes".split(" ");
S.xe = "client_id origin scope ss_domain authuser hd enable_serial_consent".split(" ");
S.v = "::";
S.Tb = "_ss_";
S.Xc = "_tr_";
S.Pa = "oauth2_ss";
S.Wc = "oauth2_cs";
S.$c = "oauth2_tr";
S.ve = "oauth2_is";
S.Oa = "oauth2_ar";
S.Sb = "oauth2c_";
S.ue = 1500;
S.sg = function() {
    var a = {
            Tb: 1,
            Xc: 2,
            Pa: 3,
            Wc: 4,
            $c: 5,
            Oa: 6
        },
        b;
    for (b in a)
        if (a = S[b], !a || 0 <= a.indexOf(S.v)) throw Error("Invalid value for 'oauth2.spi." + b + "'.");
};
S.sg();
S.ye = 512;
S.De = function(a) {
    var b;
    (b = void 0 === a.hint) || (b = a.hint, b = ("" === b ? !0 : b ? "string" == typeof b || "object" == typeof b && b.constructor === String : !1) && a.hint.length <= S.ye);
    return !a.id && b
};
S.qf = function() {
    var a = R.Z("https:" == window.location.protocol ? R.Wb : R.Xb);
    a || (a = R.Z(R.Ub));
    return a
};
S.lc = function(a) {
    switch (a) {
        case S.Oa:
            return S.Sb + S.Oa;
        case S.Pa:
            return S.Sb + S.Pa;
        default:
            return null
    }
};
var gh = function() {
        return (Be() || ze()) && !we() || ye() && !window.indexedDB ? "cookieStorage" : ye() ? "indexedDb" : "localStorage"
    },
    dh = function() {
        return !Be() && !ze() || we() ? "sessionStorage" : "inMemoryStorage"
    };
R = R || {};
R.Rb = "cookieValueChanged";
var rh = function(a) {
    this.l = void 0;
    this.xf = a;
    Ce.call(this, [R.Rb])
};
G(rh, Ce);
rh.prototype.Z = function() {
    return R.Z(R.Xb) || R.Z(R.Wb) || R.Z(R.Ub)
};
var sh = function() {
    return R.kc(R.Xb) || R.kc(R.Wb) || R.kc(R.Ub)
};
rh.prototype.addListener = function(a) {
    this.addEventListener(R.Rb, a)
};
var vh = function(a) {
        th(a);
        a.Gb = a.Z();
        a.l = new Ie;
        nd(a.l, "tick", uh(a));
        a.l.setInterval(a.xf);
        a.l.start();
        F("IDP Session Cookie monitor is started.")
    },
    th = function(a) {
        void 0 !== a.l && (a.l.stop(), a.l = void 0, F("IDP Session Cookie monitor is stoped."))
    },
    uh = function(a) {
        return function() {
            var b = a.Z();
            if (a.Gb != b) {
                var c = {
                    type: R.Rb,
                    newHash: b && ch(b),
                    oldHash: a.Gb && ch(a.Gb)
                };
                a.Gb = b;
                a.dispatchEvent(c)
            }
        }
    },
    wh = function(a) {
        this.i = a;
        this.re = void 0
    },
    xh = function(a, b, c) {
        var d = S.ze,
            e = new XMLHttpRequest;
        e.onreadystatechange = function() {
            if (4 ==
                e.readyState && 200 == e.status) {
                var h;
                e.responseText && (h = I.parse(e.responseText));
                c(h)
            } else 4 == e.readyState && 0 == e.status ? c({
                error: "network_error"
            }) : 4 == e.readyState && c({
                error: "server_error",
                error_subtype: e.responseText
            })
        };
        e.open("POST", d, !0);
        e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var f = "xsrfToken=";
        a.re && (f += a.re);
        if (b)
            for (var g in b) g && b[g] && (f += "&" + g + "=" + encodeURIComponent(b[g]));
        F("Call " + d + " with postData: " + f);
        e.send(f)
    },
    yh = function(a, b, c, d) {
        var e = new XMLHttpRequest;
        e.onreadystatechange = function() {
            if (4 == e.readyState && 200 == e.status) {
                var g;
                if (e.responseText && (g = I.parse(e.responseText))) {
                    var h = g;
                    if (h.error) {
                        h.thrown_by = "server";
                        try {
                            h.error = h.error.toLowerCase()
                        } catch (k) {}
                    }
                }
                d(g)
            } else 4 == e.readyState && 0 == e.status ? d({
                error: "network_error"
            }) : 4 == e.readyState && d({
                error: "server_error",
                error_subtype: e.responseText
            })
        };
        if (b = se(b)) a += 0 > a.indexOf("?") ? "?" : "&", a += b;
        e.open("GET", a, !0);
        e.setRequestHeader("X-Requested-With", "XmlHttpRequest");
        if (c)
            for (var f in c)
                if (c.hasOwnProperty(f)) {
                    b =
                        c[f];
                    if (null === b || void 0 === b) b = "";
                    e.setRequestHeader(f, b)
                }
        F("Call " + a + " with Get method.");
        e.send()
    },
    zh = function(a, b, c) {
        yh(S.Vc, {
            origin: a.i,
            client_id: b
        }, null, c)
    },
    Ah = function(a, b, c) {
        b && b.length ? yh(S.ad, {
            login_hint: b.join(" "),
            origin: a.i
        }, null, c) : c({
            activeHints: {}
        })
    },
    Ch = function(a, b, c) {
        b.origin = a.i;
        0 > S.ob.indexOf("enable_serial_consent") && S.ob.push("enable_serial_consent");
        b = Bh(b, S.ob);
        yh(S.Zc, b, null, c)
    },
    Dh = function(a, b, c) {
        b.origin = a.i;
        b = Bh(b, S.we);
        yh(S.Yc, b, null, c)
    },
    Eh = function(a, b, c) {
        b.origin = a.i;
        b = Bh(b, S.xe);
        yh(S.Vb, b, null, c)
    };
wh.prototype.revoke = function(a, b) {
    xh(this, {
        token: a
    }, b)
};
var Bh = function(a, b) {
    for (var c = {}, d = 0; d < b.length; d++) {
        var e = b[d];
        void 0 !== a[e] && null !== a[e] && (c[e] = a[e])
    }
    return c
};
Q = Q || {};
var Fh = function() {};
Fh.prototype.J = function() {
    return !1
};
var Gh = {};
Q.Rf = function() {
    var a = new Hh;
    if (!a) throw Error("policy cannot be empty.");
    if (Q.Jd("DEFAULT")) throw Error("Duplicate policyName [DEFAULT].");
    Gh.DEFAULT = a
};
Q.Jd = function(a) {
    for (var b in Gh)
        if (a == b) return !0;
    return !1
};
Q.yd = function(a) {
    return a && Q.Jd(a) ? a : "DEFAULT"
};
Q.mf = function(a) {
    return Gh[Q.yd(a)]
};
Q.J = function(a, b, c, d) {
    return Q.mf(d).J(a, b, c)
};
Q.vg = function(a, b, c, d) {
    if (!Q.J(a, b, c, d)) throw Error("permission_error");
};
var Ih = function() {};
G(Ih, Fh);
Ih.prototype.J = function(a, b, c) {
    a = c ? this.qc(a) : this.rc(a);
    return 0 <= qe(a, b)
};
Ih.prototype.rc = function(a) {
    var b = [];
    if (a && (b.push(a), "http://" == a.substring(0, 7) || "https://" == a.substring(0, 8))) {
        var c = document.createElement("a");
        c.href = a;
        a != c.protocol + "//" + c.hostname && b.push(c.protocol + "//" + c.hostname);
        "https:" == c.protocol && b.push("http://" + c.hostname)
    }
    return b
};
Ih.prototype.qc = function(a) {
    var b = [];
    if (a) {
        b.push(a);
        var c = document.createElement("a");
        c.href = a;
        if ("http:" == c.protocol || "https:" == c.protocol)
            for (a = c.hostname.split("."); 1 < a.length;) b.push(c.protocol + "//" + a.join(".")), "https:" == c.protocol && b.push("http://" + a.join(".")), a.shift()
    }
    return b
};
var Hh = function() {};
G(Hh, Fh);
Hh.prototype.J = function(a, b, c) {
    a = c ? this.qc(a) : this.rc(a);
    return 0 <= qe(a, b)
};
Hh.prototype.rc = function(a) {
    var b = [];
    if (a && (b.push(a), "https://" == a.substring(0, 8))) {
        var c = document.createElement("a");
        c.href = a;
        "" != c.port && 0 != c.port && 443 != c.port || b.push("http://" + c.hostname)
    }
    return b
};
Hh.prototype.qc = function(a) {
    var b = [];
    if (a) {
        var c = document.createElement("a");
        c.href = a;
        if ("https:" == c.protocol && ("" == c.port || 0 == c.port || 443 == c.port) || "http:" == c.protocol && ("" == c.port || 0 == c.port || 80 == c.port))
            for (a = c.hostname.split("."); 1 < a.length;) b.push(c.protocol + "//" + a.join(".")), "https:" == c.protocol && b.push("http://" + a.join(".")), a.shift();
        else b.push(a)
    }
    return b
};
Q.Rf();
var Jh = function() {};
Jh.prototype.wc = function() {
    return !0
};
var V = function(a) {
    return a.wc() ? Q.sf() : Q.Ad()
};
Jh.prototype.u = function() {
    throw Error("unimplemented abstract method");
};
Jh.prototype.Ea = function() {
    throw Error("unimplemented abstract method");
};
Jh.prototype.G = function() {
    throw Error("unimplemented abstract method");
};
Jh.prototype.H = function() {
    throw Error("unimplemented abstract method");
};
var W = function() {};
G(W, Jh);
W.prototype.G = function(a, b, c) {
    var d = this,
        e = this.u(a);
    V(this).getItem(e, function(f) {
        if (f) try {
            var g = I.parse(f);
            if (g.cookieHash != b) {
                V(d).removeItem(e, function() {
                    c(void 0)
                });
                return
            }
            var h = g && g.cachedValue
        } catch (k) {}
        c(h)
    })
};
W.prototype.H = function(a, b, c, d) {
    a = this.u(a);
    void 0 === b || null === b ? V(this).removeItem(a, d) : (b = I.stringify({
        cookieHash: c,
        cachedValue: b
    }), V(this).setItem(a, b, d))
};
var Kh = function() {};
G(Kh, Jh);
Kh.prototype.G = function(a, b, c) {
    V(this).getItem(this.u(a), function(d) {
        if (d) try {
            var e = I.parse(d);
            var f = e && e.cachedValue
        } catch (g) {}
        c(f)
    })
};
Kh.prototype.H = function(a, b, c, d) {
    a = this.u(a);
    void 0 === b || null === b ? V(this).removeItem(a, d) : (b = I.stringify({
        cachedValue: b
    }), V(this).setItem(a, b, d))
};
var Lh = function() {};
G(Lh, Kh);
Lh.prototype.wc = function() {
    return !1
};
Lh.prototype.u = function(a) {
    return [S.Oa, a.origin, a.clientId, a.id].join(S.v)
};
Lh.prototype.Ea = function(a) {
    var b = {};
    a && (a = a.split(S.v), 4 == a.length && (b.origin = a[1], b.clientId = a[2], b.id = a[3]));
    return b
};
var Mh = function() {};
G(Mh, W);
Mh.prototype.u = function(a) {
    return [S.Wc, a.origin, a.clientId].join(S.v)
};
Mh.prototype.Ea = function(a) {
    a = a.split(S.v);
    var b = {};
    3 == a.length && (b.origin = a[1], b.clientId = a[2]);
    return b
};
var Nh = function() {};
G(Nh, W);
Nh.prototype.u = function(a) {
    return [S.ve, a.origin, a.clientId].join(S.v)
};
Nh.prototype.G = function(a, b, c) {
    var d = this;
    W.prototype.G.call(this, a, b, function(e) {
        e && e.expires_at ? 6E4 > e.expires_at - (new Date).getTime() ? V(d).removeItem(d.u(a), c) : ve(e.scope, a.scope) && ve(a.scope, e.scope) ? (e.expires_in = Math.floor((e.expires_at - (new Date).getTime()) / 1E3), c && c(e)) : V(d).removeItem(d.u(a), c) : c && c(void 0)
    })
};
Nh.prototype.H = function(a, b, c, d) {
    var e;
    b && b.expires_at && 18E4 < b.expires_at - (new Date).getTime() && (e = b);
    W.prototype.H.call(this, a, e, c, d)
};
var Oh = function() {};
G(Oh, Kh);
Oh.prototype.wc = function() {
    return !1
};
Oh.prototype.u = function(a) {
    return [S.Pa, a.domain, a.crossSubDomains ? "1" : "0", Q.yd(a.policy), a.id || S.Tb].join(S.v)
};
Oh.prototype.Ea = function(a) {
    a = a.split(S.v);
    var b = {};
    5 == a.length && (b.domain = a[1], b.crossSubDomains = "1" == a[2], b.policy = a[3], b.id = a[4]);
    "DEFAULT" == b.policy && delete b.policy;
    b.id == S.Tb && delete b.id;
    return b
};
var Ph = function(a) {
    this.Nf = a || S.$c
};
G(Ph, W);
Ph.prototype.u = function(a) {
    return [this.Nf, a.origin, a.clientId, a.id || S.Xc].join(S.v)
};
Ph.prototype.G = function(a, b, c) {
    var d = this;
    W.prototype.G.call(this, a, b, function(e) {
        e && e.Ma && e.Ma.expires_at ? a.loginHint != e.Ma.login_hint ? V(d).removeItem(d.u(a), c) : 6E4 > e.Ma.expires_at - (new Date).getTime() ? V(d).removeItem(d.u(a), c) : ve(e.Ma.scope, a.scope) ? ve(e.responseType, a.responseType) ? (e = e.Ma, e.expires_in = Math.floor((e.expires_at - (new Date).getTime()) / 1E3), c && c(e)) : V(d).removeItem(d.u(a), c) : V(d).removeItem(d.u(a), c) : c && c(void 0)
    })
};
Ph.prototype.H = function(a, b, c, d) {
    var e;
    b && b.expires_at && 18E4 < b.expires_at - (new Date).getTime() && (e = {
        Ma: b,
        responseType: a.responseType
    });
    W.prototype.H.call(this, a, e, c, d)
};
var Qh = function(a, b) {
        this.i = a;
        this.Fc = b;
        this.fc = !1;
        this.fb = {};
        this.eb = {};
        this.cb = {}
    },
    Rh = function(a, b) {
        if (!b) throw Error("message object cannot be null.");
        b.rpcToken = a.Fc;
        b = I.stringify(b);
        F("IDP IFrame sends message: " + b);
        window.parent.postMessage(b, a.i)
    },
    Y = function(a, b, c) {
        b && Rh(a, {
            id: b,
            result: c
        })
    };
Qh.prototype.Pf = function(a) {
    if (a.source == window.parent && a.origin == this.i) {
        F("IDP Session State IFrame receive message:" + a.data);
        try {
            var b = I.parse(a.data)
        } catch (d) {
            return
        }
        if ((b.rpcToken || this.Fc) && b.rpcToken != this.Fc) F("RPC token mismatch.");
        else if (b && b.method && ("showDialog" == b.method || this.fb[b.method]))
            if ("showDialog" == b.method)
                if (this.fc) Rh(this, {
                    id: b.id,
                    error: "dialog_already_displayed"
                });
                else if (a = b.params, b.id && a && a.dialogType && this.cb[a.dialogType]) {
            var c = this.cb[a.dialogType];
            c.B && !c.B(a) ?
                (F("Bad request."), Rh(this, {
                    id: b.id,
                    error: "bad_request"
                })) : c.m(b)
        } else F("Bad dialog request.");
        else a = this.fb[b.method], a.ba && !b.id ? F("Bad request.") : a.B && !a.B(b) ? (F("Bad request."), Rh(this, {
            id: b.id,
            error: "bad_request"
        })) : a.m(b);
        else F("Bad request.")
    }
};
var Sh = function(a, b) {
        if (b && b.type && a.eb[b.type]) {
            var c = a.eb[b.type].filter;
            c && !c(b) || Rh(a, {
                method: "fireIdpEvent",
                params: b
            })
        } else F("Invalid event type.")
    },
    Th = function(a) {
        Sh(a, {
            type: "displayIFrame",
            vf: !1,
            options: {
                fullScreen: !0
            }
        });
        a.fc = !0
    },
    Uh = function(a) {
        Sh(a, {
            type: "displayIFrame",
            vf: !0
        });
        a.fc = !1
    },
    Vh = function(a, b) {
        a.fb = {};
        a.eb = {};
        a.cb = {};
        if (b) {
            if (b.F)
                for (var c = 0; c < b.F.length; c++) {
                    var d = b.F[c];
                    if (!d.method || !d.m) throw Error("Error in RPC policy: method or handler is empty.");
                    if (a.fb[d.method]) throw Error("Error in RPC policy: duplicate entry for RPC '" +
                        d.method + "'.");
                    var e = d.method;
                    a.fb[e] = {
                        m: d.m,
                        ba: d.ba,
                        B: d.B,
                        method: e
                    }
                }
            if (b.X)
                for (c = 0; c < b.X.length; c++) {
                    d = b.X[c];
                    if (!d.type) throw Error("Error in Event policy: type is empty.");
                    if (a.eb[d.type]) throw Error("Error in Event policy: duplicate entry for type '" + d.type + "'.");
                    e = d.type;
                    a.eb[e] = {
                        filter: d.filter,
                        type: e
                    }
                }
            if (b.Aa)
                for (c = 0; c < b.Aa.length; c++) {
                    d = b.Aa[c];
                    if (!d.Ba) throw Error("Error in Dialog policy: dialogType is empty.");
                    if (a.cb[d.Ba]) throw Error("Error in Dialog policy: duplicate entry for dialogType '" +
                        d.Ba + "'.");
                    e = d.Ba;
                    a.cb[e] = {
                        Ba: e,
                        m: d.m,
                        B: d.B
                    }
                }
        }
    },
    Wh = function(a, b, c, d) {
        Sh(a, {
            type: "sessionStateChanged",
            clientId: b,
            user: c,
            sessionState: d
        })
    },
    Xh = function(a) {
        var b = new Oh,
            c = S.Pa + S.v;
        return function(d) {
            if (d.key && 0 === d.key.indexOf(c)) {
                var e = b.Ea(d.key);
                if (Q.J(a.i, e.domain, e.crossSubDomains, e.policy)) {
                    var f;
                    if (d.newValue) try {
                        var g = I.parse(d.newValue);
                        g && (f = g.cachedValue)
                    } catch (h) {
                        return
                    }
                    Sh(a, {
                        type: "sessionSelectorChanged",
                        newValue: f,
                        crossSubDomains: e.crossSubDomains,
                        domain: e.domain,
                        policy: e.policy,
                        id: e.id
                    })
                }
            }
        }
    },
    Yh = function(a) {
        var b = new Lh,
            c = [S.Oa, a.i].join(S.v) + S.v;
        return function(d) {
            if (!d.key && xe()) {
                var e = null,
                    f = [];
                for (d = 0; d < window.localStorage.length; d++) {
                    var g = window.localStorage.key(d);
                    if (0 === g.indexOf(c))
                        if (e) f.push(g);
                        else {
                            var h = window.localStorage.getItem(g);
                            f.push(g);
                            if (h) {
                                try {
                                    var k = I.parse(h)
                                } catch (l) {
                                    continue
                                }
                                k && k.cachedValue && (e = b.Ea(g), e = {
                                    type: "authResult",
                                    clientId: e.clientId,
                                    id: e.id,
                                    authResult: k.cachedValue
                                })
                            }
                        }
                }
                for (d = 0; d < f.length; d++) window.localStorage.removeItem(f[d]);
                (k = e) && Sh(a, k)
            } else if (d.key &&
                0 === d.key.indexOf(c) && d.newValue) {
                try {
                    f = I.parse(d.newValue)
                } catch (l) {
                    return
                }
                f && f.cachedValue && (k = b.Ea(d.key), k = {
                    type: "authResult",
                    clientId: k.clientId,
                    id: k.id,
                    authResult: f.cachedValue
                }, Sh(a, k))
            }
        }
    },
    Zh = function(a, b) {
        this.i = a;
        this.na = b;
        this.md = new Mh;
        this.he = new Oh;
        this.Nc = new Ph;
        this.Bd = new Nh
    },
    $h = function(a, b, c, d, e) {
        a.md.H({
            origin: a.i,
            clientId: b
        }, {
            user: c.S,
            session: c.S ? c.ma : void 0
        }, d, e)
    },
    ai = function(a, b, c) {
        a.md.G({
            origin: a.i,
            clientId: b
        }, sh(), c)
    },
    bi = function(a, b, c, d, e, f, g) {
        a.Nc.G({
            loginHint: b,
            origin: a.i,
            clientId: c,
            responseType: d,
            scope: e,
            id: f
        }, sh(), g)
    },
    ci = function(a, b, c, d, e, f, g) {
        a.Nc.H({
            origin: a.i,
            clientId: c,
            responseType: d,
            id: f
        }, e, b, g)
    },
    di = function(a, b, c) {
        var d = a.Nc;
        a = {
            origin: a.i,
            clientId: b
        };
        V(d).removeItem(d.u(a), c)
    },
    ei = function(a, b, c, d, e, f) {
        if (!a.J(b, c, e)) throw Error("Permission denied for '" + a.i + "' to read session selector for domain '" + b + "'.");
        a.he.G({
            domain: b,
            crossSubDomains: c,
            policy: e,
            id: d
        }, void 0, function(g) {
            f && f(g)
        })
    },
    fi = function(a, b, c, d, e, f, g) {
        if (!a.J(b, c, f)) throw Error("Permission denied for '" +
            a.i + "' to write session selector for domain '" + b + "'.");
        a.he.H({
            domain: b,
            crossSubDomains: c,
            policy: f,
            id: e
        }, d, void 0, g)
    };
Zh.prototype.J = function(a, b, c) {
    return Q.J(this.i, a, b, c)
};
var gi = function(a, b, c, d) {
        a.Bd.G({
            origin: a.i,
            clientId: b,
            scope: c
        }, sh(), d)
    },
    hi = function(a, b, c, d, e) {
        a.Bd.H({
            origin: a.i,
            clientId: c
        }, d, b, e)
    },
    ii = function(a, b, c) {
        this.xa = a;
        this.h = b;
        this.o = c;
        this.ma = this.S = void 0
    },
    ji = function(a, b, c) {
        a.S ? c && void 0 !== c[a.S] ? (c = c[a.S], qh(a.ma, c) || (a.ma = c, $h(a.o, a.xa, a, b, function() {
            Wh(a.h, a.xa, a.S, a.ma)
        }))) : a.ma && (a.ma = void 0, $h(a.o, a.xa, a, b, function() {
            Wh(a.h, a.xa, a.S, void 0)
        })) : b && Wh(a.h, a.xa, a.S, void 0)
    },
    li = function(a, b, c, d) {
        this.na = a;
        this.h = b;
        this.V = c;
        this.o = d;
        this.ab = void 0;
        this.I = {};
        this.Jc = [];
        var e = this;
        this.na.addListener(function(f) {
            ki(e, f)
        })
    },
    mi = function(a) {
        var b = [],
            c;
        for (c in a.I) {
            var d = a.I[c].S;
            d && b.push(d)
        }
        return b
    },
    ki = function(a, b) {
        if (b.newHash) Ah(a.V, mi(a), function(d) {
            for (var e in a.I) ji(a.I[e], b.newHash, d && d.activeHints)
        });
        else
            for (var c in a.I) ji(a.I[c], b.newHash, void 0)
    },
    ni = function(a, b, c, d, e) {
        var f = a.I[b];
        f || (f = new ii(b, a.h, a.o), a.I[b] = f);
        a = f;
        b = c.login_hint;
        c = c.session_state;
        a.S != b ? (a.S = b, a.ma = b ? c : void 0, $h(a.o, a.xa, a, d, e)) : e && e()
    },
    oi = function(a, b, c) {
        var d =
            a.I[b];
        d ? c(!0) : ai(a.o, b, function(e) {
            e ? (d = new ii(b, a.h, a.o), a.I[b] = d, d.S = e.user, d.ma = e.session, c(!0)) : zh(a.V, b, function(f) {
                f && f.valid ? (f = new ii(b, a.h, a.o), a.I[b] = f, $h(a.o, b, f, sh(), function() {
                    c(!0)
                })) : c(!1)
            })
        })
    },
    pi = function(a, b) {
        ye() || Ae() ? a.Jc.push(b) : ue(xe() ? document : window, "storage", b)
    },
    qi = function(a, b, c, d) {
        this.i = a;
        this.Oe = c;
        this.pg = void 0 === d ? !1 : d;
        this.h = new Qh(a, b);
        this.na = new rh(S.te);
        this.V = new wh(a);
        this.o = new Zh(a, this.na);
        this.da = new li(this.na, this.h, this.V, this.o)
    };
m = qi.prototype;
m.start = function() {
    var a = this,
        b = function() {
            a.h.Pf.apply(a.h, arguments)
        },
        c = function() {
            Sh(a.h, {
                type: "idpReady",
                cookieDisabled: !navigator.cookieEnabled
            });
            F("Initialize IDP IFrame successfully.")
        },
        d = function(e) {
            var f = window;
            if (f.removeEventListener) f.removeEventListener("message", b, !1);
            else if (f.detachEvent) f.detachEvent("onmessage", b);
            else throw Error("Remove event handler for message failed.");
            th(a.na);
            Sh(a.h, {
                type: "idpError",
                error: e.message
            })
        };
    try {
        Vh(this.h, this.createPolicy()), ue(window, "message",
            b), pi(this.da, Xh(this.h)), pi(this.da, Yh(this.h)), vh(this.na), Q.wf(c, d, this.Oe, this.pg)
    } catch (e) {
        d(e)
    }
};
m.Jf = function(a) {
    var b = this;
    oi(this.da, (a.params || {}).clientId, function(c) {
        Y(b.h, a.id, c)
    })
};
m.gf = function(a) {
    var b = a.params || {},
        c = this,
        d = function(q) {
            Y(c.h, a.id, q)
        },
        e = b.clientId,
        f = b.loginHint,
        g = b.request,
        h = b.sessionSelector;
    g.client_id = e;
    g.login_hint = f;
    g.ss_domain = h.domain;
    var k = sh();
    if (k) {
        var l = !!g.enable_serial_consent,
            p = function(q) {
                q && !q.error && q.login_hint ? (q.first_issued_at = (new Date).getTime(), q.expires_at = q.first_issued_at + 1E3 * q.expires_in, q.session_state || (q.session_state = {}), l || q.scope || (q.scope = g.scope), b.skipCache ? ni(c.da, e, q, k, function() {
                    d(q)
                }) : ci(c.o, k, e, g.response_type, q, b.id,
                    function() {
                        ni(c.da, e, q, k, function() {
                            d(q)
                        })
                    })) : (q = q || {}, d(q))
            };
        b.forceRefresh ? Ch(this.V, g, p) : bi(this.o, f, e, g.response_type, g.scope, b.id, function(q) {
            q && 18E4 < q.expires_at - (new Date).getTime() ? ni(c.da, e, q, k, function() {
                d(q)
            }) : Ch(c.V, g, p)
        })
    } else Y(c.h, a.id, {
        error: "user_logged_out"
    }), b.userInteracted && (f = ri(), si(f).tc(), f.flush())
};
m.nf = function(a) {
    var b = this,
        c = function(g) {
            Y(b.h, a.id, g)
        };
    if (sh()) {
        var d = a.params || {},
            e = d.request,
            f = d.sessionSelector;
        e.client_id = d.clientId;
        e.login_hint = d.loginHint;
        e.ss_domain = f.domain;
        Dh(this.V, e, c)
    } else c({
        error: "user_logged_out"
    })
};
m.Xf = function(a) {
    var b = a.params || {},
        c = b.clientId,
        d = this;
    this.V.revoke(b.token, function(e) {
        di(d.o, c, function() {
            Y(d.h, a.id, e)
        })
    })
};
m.mg = function(a) {
    if (ye() || Ae()) {
        var b = a.params || {},
            c = (new Lh).u({
                clientId: b.clientId,
                id: b.id,
                origin: b.origin
            });
        b = this.da;
        if (ye() || Ae()) {
            b.ab && b.ab.stop();
            b.ab = new nh(c);
            for (c = 0; c < b.Jc.length; c++) b.ab.addListener(b.Jc[c]);
            b.ab.start()
        }
    }
    Y(this.h, a.id, !0)
};
m.ff = function(a) {
    var b = this,
        c = a.params || {};
    ei(this.o, c.domain, c.crossSubDomains, c.id, c.policy, function(d) {
        Y(b.h, a.id, d)
    })
};
m.gg = function(a) {
    var b = a.params || {},
        c = b.hint,
        d = !!b.disabled,
        e = b.domain,
        f = b.crossSubDomains,
        g = b.id,
        h = b.policy,
        k = this;
    if (c || d) var l = {
        hint: c,
        disabled: d
    };
    fi(this.o, e, f, l, g, h, function() {
        Sh(k.h, {
            type: "sessionSelectorChanged",
            newValue: l,
            domain: e,
            crossSubDomains: f,
            id: g,
            policy: h
        });
        Y(k.h, a.id, !0)
    })
};
m.Gf = function(a) {
    var b = a.params || {},
        c = this,
        d = function(l) {
            Y(c.h, a.id, l)
        },
        e = b.clientId,
        f = b.request,
        g = b.sessionSelector;
    f.client_id = e;
    f.response_type = "id_token";
    f.ss_domain = g.domain;
    var h = sh();
    if (h) {
        var k = function(l) {
            l && !l.error ? (l.first_issued_at = (new Date).getTime(), l.expires_at = l.first_issued_at + 1E3 * l.expires_in, l.scope = f.scope, hi(c.o, h, e, l, function() {
                d(l)
            })) : (l = l || {
                error: "No response returned from Server."
            }, d(l))
        };
        b.forceRefresh ? Eh(this.V, f, k) : gi(this.o, e, f.scope, function(l) {
            l ? d(l) : Eh(c.V, f, k)
        })
    } else d({
        scope: f.scope,
        sessions: []
    })
};
m.Me = function(a) {
    if (document.hasStorageAccess && re(document.hasStorageAccess)) {
        var b = this;
        document.hasStorageAccess().then(function(c) {
            Y(b.h, a.id, {
                hasAccess: c
            })
        }, function(c) {
            F("CheckStorageAccess failed: " + c);
            Y(b.h, a.id, {
                hasAccess: !1
            })
        })
    } else Y(this.h, a.id, {
        hasAccess: !0
    })
};
m.Kf = function(a) {
    a = a && a.params || {};
    return a.clientId && !T(a.clientId)
};
m.tf = function(a) {
    var b = a && a.params || {};
    a = b.loginHint;
    var c = !T(b.id),
        d = b.clientId && !T(b.clientId),
        e = !!b.request,
        f = e && b.request.scope;
    (b = (e = e && b.request.response_type) && 0 <= b.request.response_type.indexOf("code")) && F("Bad request: 'code' response_type is not supported.");
    return a && c && d && f && e && !b
};
m.pf = function(a) {
    a = a && a.params || {};
    var b = !T(a.id),
        c = a.clientId && !T(a.clientId),
        d = !!a.request && a.request.scope;
    return a.loginHint && b && c && d
};
m.rf = function(a) {
    a = a && a.params || {};
    var b = a.domain && !T(a.domain),
        c = !T(a.policy);
    return !T(a.id) && b && c && this.o.J(a.domain, !!a.crossSubDomains, a.policy)
};
m.hg = function(a) {
    a = a && a.params || {};
    var b = a.domain && !T(a.domain),
        c = !T(a.policy);
    return !T(a.id) && b && c && this.o.J(a.domain, !!a.crossSubDomains, a.policy) && S.De(a)
};
m.Hf = function(a) {
    a = a && a.params || {};
    var b = a.clientId && !T(a.clientId),
        c = !!a.request && a.request.scope;
    return !T(a.id) && b && c
};
m.Yf = function(a) {
    a = a && a.params || {};
    var b = !!a.token,
        c = a.clientId && !T(a.clientId);
    return !T(a.id) && b && c
};
m.ng = function(a) {
    a = a && a.params || {};
    var b = a.origin && !T(a.origin),
        c = a.id && !T(a.id);
    return a.clientId && !T(a.clientId) && b && c
};
m.dg = function(a) {
    var b;
    if (b = a.clientId) a = a.clientId, b = !(!a || !this.da.I[a]);
    return b
};
m.Fe = function(a) {
    var b;
    if (b = a.clientId) b = a.clientId, b = !(!b || !this.da.I[b]);
    return b && a.id && a.authResult
};
m.Ye = function(a) {
    return !!a.hide || !!a.options
};
m.cg = function(a) {
    return a.domain && this.o.J(a.domain, a.crossSubDomains, a.policy)
};
var Z = function(a, b) {
    return function() {
        return b.apply(a, arguments)
    }
};
qi.prototype.createPolicy = function() {
    var a = {
        F: [],
        X: [],
        Aa: []
    };
    ti(this, a);
    return a
};
var ti = function(a, b) {
        b.F.push({
            method: "monitorClient",
            m: Z(a, a.Jf),
            ba: !1,
            B: Z(a, a.Kf)
        });
        b.F.push({
            method: "getTokenResponse",
            m: Z(a, a.gf),
            ba: !0,
            B: Z(a, a.tf)
        });
        b.F.push({
            method: "getOnlineCode",
            m: Z(a, a.nf),
            ba: !0,
            B: Z(a, a.pf)
        });
        b.F.push({
            method: "getSessionSelector",
            m: Z(a, a.ff),
            ba: !0,
            B: Z(a, a.rf)
        });
        b.F.push({
            method: "setSessionSelector",
            m: Z(a, a.gg),
            ba: !1,
            B: Z(a, a.hg)
        });
        b.F.push({
            method: "listIdpSessions",
            m: Z(a, a.Gf),
            ba: !0,
            B: Z(a, a.Hf)
        });
        b.F.push({
            method: "revoke",
            m: Z(a, a.Xf),
            B: Z(a, a.Yf)
        });
        b.F.push({
            method: "startPolling",
            m: Z(a, a.mg),
            B: Z(a, a.ng)
        });
        b.X.push({
            type: "idpReady"
        });
        b.X.push({
            type: "idpError"
        });
        b.X.push({
            type: "sessionStateChanged",
            filter: Z(a, a.dg)
        });
        b.X.push({
            type: "sessionSelectorChanged",
            filter: Z(a, a.cg)
        });
        b.X.push({
            type: "authResult",
            filter: Z(a, a.Fe)
        });
        b.X.push({
            type: "displayIFrame",
            filter: Z(a, a.Ye)
        });
        b.F.push({
            method: "checkStorageAccess",
            m: Z(a, a.Me),
            ba: !0
        })
    },
    ui = function(a) {
        this.ge = a
    },
    si = function(a) {
        a = new Me(a.ge);
        return new vi(a)
    };
ui.prototype.flush = function() {
    this.ge.Hc()
};
var ri = function() {
        var a = new bh;
        a = new Ke(a);
        return new ui(a)
    },
    vi = function(a) {
        this.Qe = a;
        this.Ke = $a() ? "IE" : Za() ? "Opera" : B("OPR") ? "OPR" : B("Edge") ? "Edge" : B("Edg/") ? "Edg" : db() ? "Android" : cb() ? "Chrome" : ab() ? "Firefox" : !B("iPad") && !B("iPhone") || bb() || cb() || B("Coast") || ab() || !B("AppleWebKit") ? bb() ? "Safari" : "Other" : "iOS Webview";
        (a = fb()) ? (a = a.split("."), a = 2 > a.length ? a[0] : a[0] + "." + a[1]) : a = "N/A";
        this.Je = a
    };
vi.prototype.tc = function() {
    this.Qe.tc(this.Ke, this.Je)
};
var wi = "client_id origin ss_domain scope privileged authuser".split(" ");
S.ob = "response_type login_hint client_id origin scope ss_domain authuser hd include_granted_scopes nonce spec_compliant".split(" ");
var xi = function() {};
G(xi, W);
xi.prototype.u = function(a) {
    a = void 0 === a ? {} : a;
    return ["gsi_gs", void 0 === a.origin ? null : a.origin, void 0 === a.clientId ? null : a.clientId].join(S.v)
};
xi.prototype.G = function(a, b, c) {
    var d = this;
    c = void 0 === c ? function() {} : c;
    W.prototype.G.call(this, a, b, function(e) {
        e ? !e.expires_at || e.expires_at <= (new Date).getTime() ? V(d).removeItem(d.u(a), function() {
            return c(null)
        }) : (e.expires_at = void 0, c(e)) : c(null)
    })
};
xi.prototype.H = function(a, b, c, d) {
    b && (b.expires_at = (new Date).getTime() + 864E5);
    W.prototype.H.call(this, a, b, c, d)
};
var zi = function(a, b, c) {
    b.origin = a.i;
    b.privileged = !0;
    b = Bh(b, wi);
    yh(S.Vb, b, yi(a.i), function(d) {
        c(d)
    })
};

function yi(a) {
    var b = {},
        c = S.qf();
    if (c) {
        if (!c) throw Error("Session cookie value cannot be empty.");
        c = new Eb(new Fb, Ia(c));
        a = Ia(a);
        c.reset();
        c.update(a);
        a = c.digest();
        a = Cb(a);
        b["X-Csrf-Token"] = a
    }
    return b
};
qi.prototype.df = function(a) {
    var b = this;
    a = void 0 === a ? {} : a;
    var c = a.id,
        d = void 0 === a.params ? {} : a.params,
        e = function(p) {
            p && p.sessions ? (p = Ai(f, p.sessions), Y(b.h, c, p)) : Y(b.h, c, null)
        },
        f = d.loginHint;
    delete d.loginHint;
    var g = sh();
    if (g) {
        a = d.clientId;
        var h = d.request;
        d = d.sessionSelector;
        h.client_id = a;
        h.ss_domain = d.domain;
        var k = new xi,
            l = {
                clientId: a,
                origin: this.i
            };
        k.G(l, g, function(p) {
            p ? e(p) : zi(b.V, h, function(q) {
                !q || q.error ? e(null) : k.H(l, q, g, function() {
                    e(q)
                })
            })
        })
    } else e(null)
};

function Ai(a, b) {
    if (!b.length) return null;
    var c = a.toLowerCase();
    b = t(b);
    for (var d = b.next(); !d.done; d = b.next())
        if (d = d.value, d.login_hint) {
            if (a === d.obfuscatedGaiaId) return d.login_hint;
            if (d.emails && d.emails.length)
                for (var e = t(d.emails), f = e.next(); !f.done; f = e.next())
                    if (c === f.value.toLowerCase()) return d.login_hint
        }
    return null
}
qi.prototype.kg = function(a) {
    Bi(this, a, !1)
};
qi.prototype.lg = function(a) {
    Bi(this, a, !0)
};
var Bi = function(a, b, c) {
    document.requestStorageAccess && re(document.requestStorageAccess) ? document.hasStorageAccess().then(function(d) {
        if (d) Y(a.h, b.id, {
            hasAccess: !0
        });
        else {
            d = new Gd({
                origin: a.i
            });
            var e = document.getElementById("container");
            (c ? d.Tf : d.Sf).call(d, e, function() {
                Uh(a.h);
                Y(a.h, b.id, {
                    hasAccess: !0
                })
            }, function() {
                Uh(a.h);
                Y(a.h, b.id, {
                    hasAccess: !1
                })
            });
            Th(a.h)
        }
    }, function(d) {
        F("StorageAccess check failed: " + d);
        Y(a.h, b.id, {
            hasAccess: !1
        })
    }) : Y(a.h, b.id, {
        hasAccess: !0
    })
};
qi.prototype.ef = function(a) {
    a = void 0 === a ? {} : a;
    a = void 0 === a.params ? {} : a.params;
    var b = !!a.clientId && !T(a.clientId),
        c = !!a.request,
        d = !!a.sessionSelector;
    return !!a.loginHint && b && c && d
};
qi.prototype.createPolicy = function() {
    var a = {
        F: [],
        Aa: [],
        X: []
    };
    ti(this, a);
    a.F.push({
        method: "gsi:fetchLoginHint",
        m: Z(this, this.df),
        ba: !0,
        B: Z(this, this.ef)
    });
    a.Aa.push({
        Ba: "itpNewGrant",
        m: Z(this, this.kg)
    });
    a.Aa.push({
        Ba: "itpRegrant",
        m: Z(this, this.lg)
    });
    return a
};
S.ad = "/o/oauth2/iframerpc?action=sessionState";
S.Vc = "/o/oauth2/iframerpc?action=checkOrigin";
S.Zc = "/o/oauth2/iframerpc?action=issueToken";
S.Yc = "/o/oauth2/iframerpc?action=issueOnlineCode";
S.Vb = "/o/oauth2/iframerpc?action=listSessions";
var Ci = function() {
        var a = te("origin"),
            b = !!te("supportBlocked3PCookies");
        if (!a) throw Error("Failed to get parent origin from URL hash!");
        var c = te("rpcToken");
        if (!c) throw Error("Failed to get rpcToken from URL hash!");
        var d = !!te("clearCache"),
            e = te("debug");
        pe = "0" != e && !!e;
        (new qi(a, c, d, b)).start()
    },
    Di = ["lso", "startIdpIFrame"],
    Ei = x;
Di[0] in Ei || "undefined" == typeof Ei.execScript || Ei.execScript("var " + Di[0]);
for (var Fi; Di.length && (Fi = Di.shift());) Di.length || void 0 === Ci ? Ei = Ei[Fi] && Ei[Fi] !== Object.prototype[Fi] ? Ei[Fi] : Ei[Fi] = {} : Ei[Fi] = Ci;