!function(n) {
    function t(c) {
        if (e[c])
            return e[c].exports;
        var i = e[c] = {
            i: c,
            l: !1,
            exports: {}
        };
        return n[c].call(i.exports, i, i.exports, t),
        i.l = !0,
        i.exports
    }
    var e = {};
    t.m = n,
    t.c = e,
    t.d = function(n, e, c) {
        t.o(n, e) || Object.defineProperty(n, e, {
            configurable: !1,
            enumerable: !0,
            get: c
        })
    }
    ,
    t.n = function(n) {
        var e = n && n.__esModule ? function() {
            return n.default
        }
        : function() {
            return n
        }
        ;
        return t.d(e, "a", e),
        e
    }
    ,
    t.o = function(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }
    ,
    t.p = "./",
    t(t.s = 188)
}([function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.fnGetBasicProfile = void 0;
    var c = e(6)
      , i = e(5)
      , o = e(7)
      , s = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(o)
      , r = location.protocol + "//api.zhenai.com"
      , l = ["/statusInfo/getFootTabStatusInfo", "/login/loginByTempToken.do", "/login/applyTempToken.do", "/profile/getBasicProfile.do", "/payment/productList.do", "/payment/courierList.do"]
      , d = function(n) {
        return !(-1 === n.indexOf("/banner/getBanners") || !/\/mobileVerify\.html$/.test(window.location.pathname))
    }
      , h = function(n) {
        if (d(n))
            return !0;
        for (var t = 0; t < l.length; t++) {
            var e = l[t];
            if (-1 !== n.indexOf(e))
                return !0
        }
        return !1
    }
      , u = {
        get: function(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
              , e = "";
            return e = !1 === t ? "" + r + n : n,
            new Promise(function(t, c) {
                Z.ajax({
                    url: e,
                    type: "GET",
                    dataType: "json",
                    xhrFields: {
                        withCrendentials: "true"
                    },
                    success: function(e) {
                        !0 === e.isError ? (!1 !== h(n) || "-00003" !== e.errorCode && "-00004" !== e.errorCode && "-00015" !== e.errorCode || Z.user.login(location.href),
                        t(e)) : t(e)
                    },
                    error: function(n) {
                        c(n)
                    }
                })
            }
            )
        },
        post: function(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
              , c = "";
            return c = !1 === e ? "" + r + n : n,
            new Promise(function(e, i) {
                Z.ajax({
                    url: c,
                    data: t,
                    type: "post",
                    xhrFields: {
                        withCrendentials: "true"
                    },
                    success: function(t) {
                        !0 === t.isError ? (!1 !== h(n) || "-00003" !== t.errorCode && "-00004" !== t.errorCode && "-00015" !== t.errorCode || Z.user.login(location.href),
                        e(t)) : e(t)
                    },
                    error: function(n) {
                        i(n)
                    }
                })
            }
            )
        },
        storage: {
            setItem: function(n, t) {
                try {
                    return localStorage.setItem(n, JSON.stringify(t))
                } catch (n) {
                    return !1
                }
            },
            getItem: function(n) {
                try {
                    var t = localStorage.getItem(n) || "";
                    return t.length > 0 ? JSON.parse(t) : null
                } catch (n) {
                    return null
                }
            },
            removeItem: function(n) {
                try {
                    return localStorage.removeItem(n)
                } catch (n) {
                    return !1
                }
            }
        },
        sessionStorage: {
            setItem: function(n, t) {
                try {
                    sessionStorage.setItem(n, JSON.stringify(t))
                } catch (n) {
                    return !1
                }
            },
            getItem: function(n) {
                try {
                    var t = sessionStorage.getItem(n) || "";
                    return t.length > 0 ? JSON.parse(t) : null
                } catch (n) {
                    return null
                }
            },
            removeItem: function(n) {
                try {
                    sessionStorage.removeItem(n)
                } catch (n) {
                    return !1
                }
            }
        },
        downloadNativeApp: function(n) {
            /(iphone|ipod|ipad)/gi.test(navigator.userAgent) ? window.location.href = "itms-apps://itunes.apple.com/cn/app/zhen-ai-wang/id575846819?mt=1" : /micromessenger/gi.test(navigator.userAgent) ? window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zhenai.android" : (window.location.href = "zhenaiapp://platformapi/startApp?appId=20000001&fromPage=0&memberId=105388926",
            setTimeout(function() {
                window.location.href = "http://images.zastatic.com/apk/zhenai/zhenai_" + n + ".apk?1=1"
            }, 1e3))
        },
        events: c.EVENTS,
        TAP: !0 === /(MacIntel|Win32)/.test(navigator.platform) ? "click" : /(android|iphone|ipad)/gi.test(navigator.userAgent) ? "tap" : "click",
        TouchMove: "touchmove",
        preventDefault: function(n) {
            n.preventDefault(),
            n.stopPropagation(),
            n.returnValue = !1
        },
        px2rem: function(n) {
            var t = parseFloat(n) / window.lib.flexible.rem;
            return "string" == typeof n && a.match(/px$/) && (t += "rem"),
            t
        },
        getUserGUID: function() {
            var n = u.storage.getItem("V-GUID") || "";
            if (0 === n.length) {
                var t = (0,
                s.default)(Date.now() + navigator.userAgent + Math.floor(1e3 * Math.random()));
                return u.storage.setItem("V-GUID", t),
                t
            }
            return n
        },
        growingIO: function(n) {
            var t = t || [];
            t.push(["setAccountId", "ad9ebca2e114729a"]),
            t.push(["setCS1", "memberId", n.memberId || ""]),
            t.push(["setCS2", "sex", n.sex || ""]),
            t.push(["setCS3", "age", n.age || ""]),
            t.push(["setCS4", "workcity", n.workCity || ""]),
            t.push(["setCS5", "salary", n.salary || ""]),
            t.push(["setCS6", "registerTimeSection", n.registerTimeSection || ""]),
            t.push(["setCS7", "isZhenxinVip", n.isZhenxinVip || ""]),
            window._vds = t;
            var e = document.createElement("script")
              , c = document.querySelector("head");
            e.type = "text/javascript",
            e.async = !0,
            e.src = ("https:" == document.location.protocol ? "https://" : "http://") + "dn-growing.qbox.me/vds.js",
            c.appendChild(e)
        }
    };
    !function() {
        var n = u.storage.getItem("user-mobile-verify");
        1 == n && (u.storage.setItem("user-mobile-verify", !1),
        !0 !== /login\.html/gi.test(location.href) && Z.user.login(location.href)),
        (4 == n || 6 == n || !1) && !0 !== /mobileVerify\.html/gi.test(location.href) && !0 !== /login\.html/gi.test(location.href) && location.replace("./mobileVerify.html?type=" + n)
    }();
    var p = null
      , f = null
      , m = t.fnGetBasicProfile = function() {
        return p ? new Promise(function(n, t) {
            n(p)
        }
        ) : f = f || new Promise(function(n, t) {
            u.post("/profile/getBasicProfile.do").then(function(t) {
                !1 === t.isError && (p = t,
                f = null,
                n(p))
            })
        }
        ).catch(function() {
            reject(),
            f = null
        })
    }
    ;
    !function() {
        !0 === Z.user.isLogin() && m().then(function(n) {
            !1 === n.isError && u.growingIO({
                memberId: n.data.memberID,
                sex: n.data.gender,
                age: n.data.age,
                workCity: n.data.workCityString,
                salary: n.data.salaryString,
                registerTimeSection: "",
                isZhenxinVip: n.data.isZhenaiMail
            })
        })
    }(),
    !0 !== window.__manualReportPV__ && (0,
    i.reportPV)(),
    t.default = u
}
, function(n, t, e) {
    "use strict";
    n.exports = e(10)
}
, function(n, t) {
    var e = {
        utf8: {
            stringToBytes: function(n) {
                return e.bin.stringToBytes(unescape(encodeURIComponent(n)))
            },
            bytesToString: function(n) {
                return decodeURIComponent(escape(e.bin.bytesToString(n)))
            }
        },
        bin: {
            stringToBytes: function(n) {
                for (var t = [], e = 0; e < n.length; e++)
                    t.push(255 & n.charCodeAt(e));
                return t
            },
            bytesToString: function(n) {
                for (var t = [], e = 0; e < n.length; e++)
                    t.push(String.fromCharCode(n[e]));
                return t.join("")
            }
        }
    };
    n.exports = e
}
, function(n, t) {
    var e;
    e = function() {
        return this
    }();
    try {
        e = e || Function("return this")() || (0,
        eval)("this")
    } catch (n) {
        "object" == typeof window && (e = window)
    }
    n.exports = e
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getCaptcha = t.sendActivatePhoneMessageCode = t.loginByTempToken = t.getTempLoginToken = t.getBasicProfile = t.logout = t.appConfig = t.activatePhone = t.verifyMessageCodeChangePhone = t.sendMessageCode = t.resetPwd = t.dynamicLogin = t.sendDynamicMessageCode = t.login = void 0;
    var c = e(0)
      , i = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(c);
    location.protocol,
    t.login = function(n) {
        return i.default.post("/login/userLogin.do", n)
    }
    ,
    t.sendDynamicMessageCode = function(n, t) {
        return i.default.post("/login/sendDynamicMessageCode.do", {
            phone: n,
            imageCode: t
        })
    }
    ,
    t.dynamicLogin = function(n, t) {
        return i.default.post("/login/dynamicLogin.do", {
            phone: n,
            messageCode: t
        })
    }
    ,
    t.resetPwd = function(n) {
        return i.default.post("/login/dynamicLoginResetPwd.do", {
            password: n
        })
    }
    ,
    t.sendMessageCode = function(n, t) {
        return i.default.post("/myconfig/sendMessageCode.do", {
            newPhone: n,
            type: t
        })
    }
    ,
    t.verifyMessageCodeChangePhone = function(n, t, e) {
        return i.default.post("/myconfig/verifyMessageCodeChangePhone.do", {
            messageCode: n,
            newPhone: t,
            type: e
        })
    }
    ,
    t.activatePhone = function(n, t) {
        return i.default.get("/login/activatePhone.do?phone=" + n + "&messageCode=" + t)
    }
    ,
    t.appConfig = function() {
        return i.default.post("/system/appConfig.do")
    }
    ,
    t.logout = function() {
        return i.default.get("/login/userLogout.do")
    }
    ,
    t.getBasicProfile = c.fnGetBasicProfile,
    t.getTempLoginToken = function() {
        return i.default.get("/login/applyTempToken.do")
    }
    ,
    t.loginByTempToken = function(n) {
        return i.default.post("/login/loginByTempToken.do", {
            tempToken: n
        })
    }
    ,
    t.sendActivatePhoneMessageCode = function(n) {
        return i.default.get("/login/sendActivatePhoneMessageCode.do?phone=" + n)
    }
    ,
    t.getCaptcha = function() {
        return i.default.post("/login/getGeetestCaptcha.do")
    }
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.kibana = t.reportSayHiClick = t.reportSayHi = t.reportPV = void 0;
    var c = e(0);
    (function(n) {
        n && n.__esModule
    }
    )(c),
    t.reportPV = function() {
        try {
            Z.tj.reportWap({
                logInterface: "t_fw_00080",
                data: [{
                    data_type: 1001,
                    channel_id: Z.getParam("channelId") || Z.getChannelId().channelId || 902759,
                    subid: Z.getParam("subChannelId") || Z.getChannelId().subChannelId || 0,
                    data1: location.href,
                    data2: document.referrer
                }]
            })
        } catch (n) {}
    }
    ,
    t.reportSayHi = function(n) {
        return Z.tj.reportWap({
            logInterface: "t_fw_00040",
            data: n
        })
    }
    ,
    t.reportSayHiClick = function(n) {
        return Z.tj.reportWap({
            logInterface: "t_fw_00030",
            data: n
        })
    }
    ,
    t.kibana = function(n) {
        return Z.tj.kibana(n)
    }
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.EVENTS = {
        MENU_UNREADMESSAGE: "MENU_UNREADMESSAGE",
        MENU_UNREADMESSAGE_REQUIRE_UPDATE: "MENU_UNREADMESSAGE_REQUIRE_UPDATE",
        PHONE_VERI_SET: "PHONE_VERI_SET"
    }
}
, function(n, t, e) {
    !function() {
        var t = e(8)
          , c = e(2).utf8
          , i = e(9)
          , o = e(2).bin
          , s = function(n, e) {
            n.constructor == String ? n = e && "binary" === e.encoding ? o.stringToBytes(n) : c.stringToBytes(n) : i(n) ? n = Array.prototype.slice.call(n, 0) : Array.isArray(n) || (n = n.toString());
            for (var a = t.bytesToWords(n), r = 8 * n.length, l = 1732584193, d = -271733879, h = -1732584194, u = 271733878, p = 0; p < a.length; p++)
                a[p] = 16711935 & (a[p] << 8 | a[p] >>> 24) | 4278255360 & (a[p] << 24 | a[p] >>> 8);
            a[r >>> 5] |= 128 << r % 32,
            a[14 + (r + 64 >>> 9 << 4)] = r;
            for (var f = s._ff, m = s._gg, v = s._hh, g = s._ii, p = 0; p < a.length; p += 16) {
                var y = l
                  , w = d
                  , b = h
                  , _ = u;
                l = f(l, d, h, u, a[p + 0], 7, -680876936),
                u = f(u, l, d, h, a[p + 1], 12, -389564586),
                h = f(h, u, l, d, a[p + 2], 17, 606105819),
                d = f(d, h, u, l, a[p + 3], 22, -1044525330),
                l = f(l, d, h, u, a[p + 4], 7, -176418897),
                u = f(u, l, d, h, a[p + 5], 12, 1200080426),
                h = f(h, u, l, d, a[p + 6], 17, -1473231341),
                d = f(d, h, u, l, a[p + 7], 22, -45705983),
                l = f(l, d, h, u, a[p + 8], 7, 1770035416),
                u = f(u, l, d, h, a[p + 9], 12, -1958414417),
                h = f(h, u, l, d, a[p + 10], 17, -42063),
                d = f(d, h, u, l, a[p + 11], 22, -1990404162),
                l = f(l, d, h, u, a[p + 12], 7, 1804603682),
                u = f(u, l, d, h, a[p + 13], 12, -40341101),
                h = f(h, u, l, d, a[p + 14], 17, -1502002290),
                d = f(d, h, u, l, a[p + 15], 22, 1236535329),
                l = m(l, d, h, u, a[p + 1], 5, -165796510),
                u = m(u, l, d, h, a[p + 6], 9, -1069501632),
                h = m(h, u, l, d, a[p + 11], 14, 643717713),
                d = m(d, h, u, l, a[p + 0], 20, -373897302),
                l = m(l, d, h, u, a[p + 5], 5, -701558691),
                u = m(u, l, d, h, a[p + 10], 9, 38016083),
                h = m(h, u, l, d, a[p + 15], 14, -660478335),
                d = m(d, h, u, l, a[p + 4], 20, -405537848),
                l = m(l, d, h, u, a[p + 9], 5, 568446438),
                u = m(u, l, d, h, a[p + 14], 9, -1019803690),
                h = m(h, u, l, d, a[p + 3], 14, -187363961),
                d = m(d, h, u, l, a[p + 8], 20, 1163531501),
                l = m(l, d, h, u, a[p + 13], 5, -1444681467),
                u = m(u, l, d, h, a[p + 2], 9, -51403784),
                h = m(h, u, l, d, a[p + 7], 14, 1735328473),
                d = m(d, h, u, l, a[p + 12], 20, -1926607734),
                l = v(l, d, h, u, a[p + 5], 4, -378558),
                u = v(u, l, d, h, a[p + 8], 11, -2022574463),
                h = v(h, u, l, d, a[p + 11], 16, 1839030562),
                d = v(d, h, u, l, a[p + 14], 23, -35309556),
                l = v(l, d, h, u, a[p + 1], 4, -1530992060),
                u = v(u, l, d, h, a[p + 4], 11, 1272893353),
                h = v(h, u, l, d, a[p + 7], 16, -155497632),
                d = v(d, h, u, l, a[p + 10], 23, -1094730640),
                l = v(l, d, h, u, a[p + 13], 4, 681279174),
                u = v(u, l, d, h, a[p + 0], 11, -358537222),
                h = v(h, u, l, d, a[p + 3], 16, -722521979),
                d = v(d, h, u, l, a[p + 6], 23, 76029189),
                l = v(l, d, h, u, a[p + 9], 4, -640364487),
                u = v(u, l, d, h, a[p + 12], 11, -421815835),
                h = v(h, u, l, d, a[p + 15], 16, 530742520),
                d = v(d, h, u, l, a[p + 2], 23, -995338651),
                l = g(l, d, h, u, a[p + 0], 6, -198630844),
                u = g(u, l, d, h, a[p + 7], 10, 1126891415),
                h = g(h, u, l, d, a[p + 14], 15, -1416354905),
                d = g(d, h, u, l, a[p + 5], 21, -57434055),
                l = g(l, d, h, u, a[p + 12], 6, 1700485571),
                u = g(u, l, d, h, a[p + 3], 10, -1894986606),
                h = g(h, u, l, d, a[p + 10], 15, -1051523),
                d = g(d, h, u, l, a[p + 1], 21, -2054922799),
                l = g(l, d, h, u, a[p + 8], 6, 1873313359),
                u = g(u, l, d, h, a[p + 15], 10, -30611744),
                h = g(h, u, l, d, a[p + 6], 15, -1560198380),
                d = g(d, h, u, l, a[p + 13], 21, 1309151649),
                l = g(l, d, h, u, a[p + 4], 6, -145523070),
                u = g(u, l, d, h, a[p + 11], 10, -1120210379),
                h = g(h, u, l, d, a[p + 2], 15, 718787259),
                d = g(d, h, u, l, a[p + 9], 21, -343485551),
                l = l + y >>> 0,
                d = d + w >>> 0,
                h = h + b >>> 0,
                u = u + _ >>> 0
            }
            return t.endian([l, d, h, u])
        };
        s._ff = function(n, t, e, c, i, o, s) {
            var a = n + (t & e | ~t & c) + (i >>> 0) + s;
            return (a << o | a >>> 32 - o) + t
        }
        ,
        s._gg = function(n, t, e, c, i, o, s) {
            var a = n + (t & c | e & ~c) + (i >>> 0) + s;
            return (a << o | a >>> 32 - o) + t
        }
        ,
        s._hh = function(n, t, e, c, i, o, s) {
            var a = n + (t ^ e ^ c) + (i >>> 0) + s;
            return (a << o | a >>> 32 - o) + t
        }
        ,
        s._ii = function(n, t, e, c, i, o, s) {
            var a = n + (e ^ (t | ~c)) + (i >>> 0) + s;
            return (a << o | a >>> 32 - o) + t
        }
        ,
        s._blocksize = 16,
        s._digestsize = 16,
        n.exports = function(n, e) {
            if (void 0 === n || null === n)
                throw new Error("Illegal argument " + n);
            var c = t.wordsToBytes(s(n, e));
            return e && e.asBytes ? c : e && e.asString ? o.bytesToString(c) : t.bytesToHex(c)
        }
    }()
}
, function(n, t) {
    !function() {
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , e = {
            rotl: function(n, t) {
                return n << t | n >>> 32 - t
            },
            rotr: function(n, t) {
                return n << 32 - t | n >>> t
            },
            endian: function(n) {
                if (n.constructor == Number)
                    return 16711935 & e.rotl(n, 8) | 4278255360 & e.rotl(n, 24);
                for (var t = 0; t < n.length; t++)
                    n[t] = e.endian(n[t]);
                return n
            },
            randomBytes: function(n) {
                for (var t = []; n > 0; n--)
                    t.push(Math.floor(256 * Math.random()));
                return t
            },
            bytesToWords: function(n) {
                for (var t = [], e = 0, c = 0; e < n.length; e++,
                c += 8)
                    t[c >>> 5] |= n[e] << 24 - c % 32;
                return t
            },
            wordsToBytes: function(n) {
                for (var t = [], e = 0; e < 32 * n.length; e += 8)
                    t.push(n[e >>> 5] >>> 24 - e % 32 & 255);
                return t
            },
            bytesToHex: function(n) {
                for (var t = [], e = 0; e < n.length; e++)
                    t.push((n[e] >>> 4).toString(16)),
                    t.push((15 & n[e]).toString(16));
                return t.join("")
            },
            hexToBytes: function(n) {
                for (var t = [], e = 0; e < n.length; e += 2)
                    t.push(parseInt(n.substr(e, 2), 16));
                return t
            },
            bytesToBase64: function(n) {
                for (var e = [], c = 0; c < n.length; c += 3)
                    for (var i = n[c] << 16 | n[c + 1] << 8 | n[c + 2], o = 0; o < 4; o++)
                        8 * c + 6 * o <= 8 * n.length ? e.push(t.charAt(i >>> 6 * (3 - o) & 63)) : e.push("=");
                return e.join("")
            },
            base64ToBytes: function(n) {
                n = n.replace(/[^A-Z0-9+\/]/gi, "");
                for (var e = [], c = 0, i = 0; c < n.length; i = ++c % 4)
                    0 != i && e.push((t.indexOf(n.charAt(c - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | t.indexOf(n.charAt(c)) >>> 6 - 2 * i);
                return e
            }
        };
        n.exports = e
    }()
}
, function(n, t) {
    function e(n) {
        return !!n.constructor && "function" == typeof n.constructor.isBuffer && n.constructor.isBuffer(n)
    }
    function c(n) {
        return "function" == typeof n.readFloatLE && "function" == typeof n.slice && e(n.slice(0, 0))
    }
    n.exports = function(n) {
        return null != n && (e(n) || c(n) || !!n._isBuffer)
    }
}
, function(n, t, e) {
    "use strict";
    (function(t) {
        function c(n) {
            return "string" != typeof n && (n = void 0 === n || null === n ? "" : "function" == typeof n ? c(n.call(n)) : JSON.stringify(n)),
            n
        }
        function i(n) {
            var t = "" + n
              , e = a.exec(t);
            if (!e)
                return n;
            var c = ""
              , i = void 0
              , o = void 0
              , s = void 0;
            for (i = e.index,
            o = 0; i < t.length; i++) {
                switch (t.charCodeAt(i)) {
                case 34:
                    s = "&#34;";
                    break;
                case 38:
                    s = "&#38;";
                    break;
                case 39:
                    s = "&#39;";
                    break;
                case 60:
                    s = "&#60;";
                    break;
                case 62:
                    s = "&#62;";
                    break;
                default:
                    continue
                }
                o !== i && (c += t.substring(o, i)),
                o = i + 1,
                c += s
            }
            return o !== i ? c + t.substring(o, i) : c
        }
        var o = e(11)
          , s = Object.create(o ? t : window)
          , a = /["&'<>]/;
        s.$escape = function(n) {
            return i(c(n))
        }
        ,
        s.$each = function(n, t) {
            if (Array.isArray(n))
                for (var e = 0, c = n.length; e < c; e++)
                    t(n[e], e);
            else
                for (var i in n)
                    t(n[i], i)
        }
        ,
        n.exports = s
    }
    ).call(t, e(3))
}
, function(n, t, e) {
    (function(t) {
        n.exports = !1;
        try {
            n.exports = "[object process]" === Object.prototype.toString.call(t.process)
        } catch (n) {}
    }
    ).call(t, e(3))
}
, function(n, t) {}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getSwitches = t.getBanners = t.getValidateCode = t.getMsgCount = void 0;
    var c = e(0)
      , i = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(c);
    t.getMsgCount = function(n) {
        return i.default.get("/statusInfo/getFootTabStatusInfo")
    }
    ,
    t.getValidateCode = function(n) {
        return i.default.post("/register/sendMessageCode.do", {
            phone: n
        })
    }
    ,
    t.getBanners = function(n) {
        return i.default.get("/banner/getBanners?code=" + n)
    }
    ,
    t.getSwitches = function() {
        return i.default.post("/system/getSwitches.do")
    }
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = e(28)
      , i = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(c);
    t.default = function(n, t, e) {
        $(document.body).append((0,
        i.default)({
            text: n
        })),
        setTimeout(function() {
            $(".toast").remove(),
            e && e()
        }, t || 3e3)
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(16)
      , o = c(i)
      , s = e(13)
      , a = e(17);
    c(a);
    t.default = function(n, t) {
        var e = "https://i.zhenai.com/m/portal/payment.html?type=1"
          , c = "http://images.zastatic.com/imwap/wap2015/images/banner/banner2_22e13aa.png";
        $(n).append((0,
        o.default)()),
        (0,
        s.getBanners)(1).then(function(n) {
            n.isError || ($("#head_banner")[0].src = n.data.banners[0].imageURL || c,
            $("#banner_url")[0].href = n.data.banners[0].link || e)
        }).catch(function(n) {
            $("#head_banner")[0].src = c,
            $("#banner_url")[0].href = e
        }),
        t && !0 === t.disableClick && $(n).find("a").attr("href", "")
    }
}
, function(n, t, e) {
    e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = "";
        return t += '<div class="head_banner">\n    <div class="swiper-container">\n        <ul class="swiper-wrapper">\n            <li class="swiper-slide">\n                <a href="" id="banner_url" rel="nofollow">\n\t\t\t  \t    <img id="head_banner" alt="">\n                </a>\n            </li>\n        </ul>\n    </div>\n</div>'
    }
}
, function(n, t, e) {
    n.exports = e.p + "static/images/banner.b8035bd.jpg"
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = e(29)
      , i = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(c)
      , o = function(n, t, e) {
        this.opts = n,
        this.confirmTemplate = '<div class="popup-content">{content}</div><div id="popup_btn_container"><a class="cancel" data-icon="close">{cancel}</a><a data-icon="checkmark">{ok}</a></div>',
        this.imageConfirm = '<div class="popup-title">已选取图片</div><div class="popup-content"><img src="{src}" alt=""/></div><div id="popup_btn_container"><a class="cancel" data-icon="close">{cancel}</a><a data-icon="checkmark">{ok}</a></div>',
        this.alertTemplate = '<div class="popup-title">{title}</div><div class="popup-content">{content}</div><div id="popup_btn_container"><a data-target="closePopup" data-icon="checkmark">{ok}</a></div>',
        this.svg = '<svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="circle" class="g-circles g-circles--v1"><circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10"></circle><circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10"></circle><circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10"></circle><circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10"></circle><circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10"></circle><circle id="7" cx="60" cy="110" r="10"></circle><circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10"></circle><circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10"></circle><circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10"></circle><circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10"></circle><circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10"></circle><circle id="1" cx="60" cy="10" r="10"></circle></g><use xlink:href="#circle" class="use"></use></svg>',
        this.id = 0,
        this.dom = t,
        this.ev = e,
        this.move = !0,
        this.scale = !1,
        this.init()
    };
    o.prototype = {
        init: function() {
            var n = this
              , t = this.opts.type
              , e = document.createElement("div");
            e.className = "over_load",
            e.style.height = document.body.scrollHeight + "px";
            var c = document.createElement("div");
            switch (n.overload = e,
            n.popup = c,
            n.addEvent(n.overload, "touchmove", n.preventDefault),
            n.addEvent(n.popup, "touchmove", n.preventDefault),
            t) {
            case "confirm":
                c.className = "center popup_in",
                n.confirm(),
                document.body.appendChild(e);
                break;
            case "alert":
                c.className = "center popup_in",
                n.alert(),
                document.body.appendChild(e);
                break;
            case "top":
                c.className = "popup_top popup_in",
                n.top(),
                document.body.appendChild(e);
                break;
            case "bottom":
                c.className = "popup_bottom popup_in",
                n.bottom(),
                document.body.appendChild(e);
                break;
            case "loading":
                if (window.loading)
                    return;
                window.loading = n.popup,
                window.loading.className = "popup_load",
                n.createLoad();
                break;
            case "image":
                n.createImage();
                break;
            case "toast":
                n.createToast();
                break;
            case "image_preview":
                c.className = "center popup_in",
                n.createImagePreview(),
                document.body.appendChild(e)
            }
        },
        confirm: function() {
            var n = this
              , t = (n.opts.title,
            n.opts.content || "")
              , e = n.opts.ok || ""
              , c = n.opts.cancel || ""
              , i = n.confirmTemplate.replace("{content}", t).replace("{cancel}", c).replace("{ok}", e);
            n.opts.icon && (i = '<span class="warning-icon"></span>' + i),
            n.popup.innerHTML = i,
            document.body.appendChild(n.popup);
            var o = document.getElementById("popup_btn_container");
            setTimeout(function() {
                n.addEvent(o, "click", n.close, "center popup_out")
            }, 200)
        },
        alert: function() {
            var n = this
              , t = n.opts.title
              , e = n.opts.content
              , c = n.opts.ok
              , i = n.alertTemplate.replace("{title}", t).replace("{content}", e).replace("{ok}", c);
            n.popup.innerHTML = i,
            document.body.appendChild(n.popup);
            var o = document.getElementById("popup_btn_container");
            n.addEvent(o, "click", n.close, "center popup_out")
        },
        top: function() {
            var n = this
              , t = n.opts.content;
            n.popup.innerText = t,
            document.body.appendChild(n.popup),
            n.addEvent(n.overload, "click", n.close, "popup_top popup_out")
        },
        bottom: function() {
            var n = this
              , t = n.opts.content;
            n.popup.innerHTML = t,
            document.body.appendChild(n.popup),
            n.addEvent(n.overload, "click", n.close, "popup_bottom popup_out")
        },
        createLoad: function() {
            var n = this;
            new Date;
            n.loadSVG(),
            document.body.appendChild(window.loading)
        },
        loadSVG: function() {
            var n = this;
            !document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect ? loading.className = "popup_load2" : loading.innerHTML = n.svg
        },
        createImagePreview: function() {
            var n = this
              , t = (n.opts.title,
            n.opts.content,
            n.opts.ok || "")
              , e = n.opts.cancel || ""
              , c = n.opts.imgUrl || ""
              , i = n.imageConfirm.replace("{src}", c).replace("{cancel}", e).replace("{ok}", t);
            n.popup.innerHTML = i,
            document.body.appendChild(n.popup);
            var o = document.getElementById("popup_btn_container");
            n.addEvent(o, "click", n.close, "center popup_out")
        },
        createImage: function() {
            var n = this
              , t = n.opts.list
              , e = $("." + t)
              , c = e.length
              , s = ""
              , a = n.opts.index || 0;
            n.img_slider = document.createElement("div"),
            n.img_slider.className = "image_slider",
            document.body.appendChild(n.img_slider);
            var r = document.createElement("div");
            r.className = "slider_content",
            n.doc = document.createElement("div"),
            n.doc.className = "dot",
            n.doc.id = "dot";
            for (var l = 0; l < c; l++)
                n.dom[0] == e[l] && (a = l),
                s = s + '<div class="item" id="item_' + l + '" style="width:' + n.img_slider.offsetWidth + 'px"><img src="' + e[l].getAttribute("data_src") + '" alt="' + e[l].getAttribute("alt") + '"/></div>';
            var d = document.createElement("a");
            d.innerText = "完成",
            n.doc.appendChild(d);
            var h = document.createElement("span");
            if (h.className = "dot_count",
            h.innerText = a + 1 + "/" + c,
            n.doc.appendChild(h),
            n.opts.canDelete) {
                var u = document.createElement("span");
                u.className = "deleteSpan",
                n.doc.appendChild(u),
                $(u).on("click", function() {
                    m()
                })
            }
            n.addEvent(d, "click", n.closeImage);
            var p = 0 - n.img_slider.offsetWidth * a;
            r.innerHTML = s,
            document.body.appendChild(n.doc),
            r.style.width = c * n.img_slider.offsetWidth + "px",
            r.style.webkitTransform = "translate3d(" + p + "px,0,0)",
            n.img_slider.appendChild(r),
            n.addEvent(n.img_slider, "touchmove", n.preventDefault);
            var f = function(n) {
                n <= 0 ? a < c - 1 ? (a++,
                h.innerText = a + 1 + "/" + c) : a = c - 1 : a > 0 ? (a--,
                h.innerText = a + 1 + "/" + c) : a = 0
            }
              , m = function() {
                new o({
                    type: "confirm",
                    title: "",
                    content: "<p style='font-size:1.1em'></p><p style='font-size:1.5em'>您确定删除这张照片吗？</p>",
                    ok: "确定",
                    cancel: "取消",
                    icon: !1,
                    closeCallBack: function(n) {},
                    okCallBack: function() {
                        v()
                    }
                })
            }
              , v = function() {
                var t = n.opts.delCallBack
                  , c = e.eq(a).attr("photo_id");
                t && t(g, c)
            }
              , g = function() {
                if (e.eq(a).remove(),
                0 == a)
                    n.closeImage();
                else {
                    n.img_slider.remove(),
                    n.doc.remove();
                    new o({
                        type: "image",
                        canDelete: !0,
                        delCallBack: n.opts.delCallBack,
                        list: "img_item"
                    },$(this))
                }
            };
            new i.default(r,p,a,f)
        },
        closeImage: function() {
            var n = this;
            document.body.removeChild(n.img_slider),
            document.body.removeChild(n.doc),
            document.body.style.height = "auto",
            document.body.style.overflowY = "auto"
        },
        scaleImage: function(n) {
            var t = this
              , e = n[0]
              , c = e.target;
            "img" == c.tagName.toLowerCase() && (t.scale ? (c.style.webkitTransform = "scale(1) translate3d(-50%,-50%,0)",
            t.scale = !1) : (c.style.webkitTransform = "scale(3)",
            t.scale = !0))
        },
        close: function(n) {
            var t = this
              , e = n[0].target.getAttribute("data-icon");
            if (t.popup.className = n[1],
            "close" == e)
                t.callBack(t.opts.closeCallBack);
            else {
                var c = $(".popup-content").find("input");
                if ("confirm" == t.opts.type && c && c.length > 0) {
                    var c = $(".popup-content").find("input");
                    c && c.length > 0 ? t.callBack(t.opts.okCallBack, c.val()) : t.callBack(t.opts.okCallBack)
                } else
                    t.callBack(t.opts.okCallBack)
            }
        },
        closeLoad: function() {
            window.loading && (document.body.removeChild(window.loading),
            window.loading = null)
        },
        callBack: function(n, t) {
            var e = this;
            setTimeout(function() {
                document.body.removeChild(e.popup),
                document.body.removeChild(e.overload),
                n && n(t)
            }, 300)
        },
        addEvent: function(n, t, e, c) {
            var i = this;
            n.addEventListener(t, function(n) {
                var t = [];
                t.push(n),
                t.push(c),
                e.call(i, t)
            }, !1)
        },
        preventDefault: function(n) {
            document.body.style.height = "100%",
            document.body.style.overflowY = "hidden",
            n[0].preventDefault()
        },
        createToast: function() {
            var n = this;
            if (!window.toa) {
                var t = void 0;
                t = document.createElement("span");
                n.opts.status;
                t.className = "toast",
                t.innerText = n.opts.content,
                document.body.appendChild(t),
                setTimeout(function() {
                    document.body.removeChild(t),
                    window.toa = null
                }, 2e3),
                window.toa = t
            }
        }
    },
    t.default = o
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(4)
      , a = e(20)
      , r = c(a);
    t.default = function(n, t) {
        t = t || !1,
        $(n).html((0,
        r.default)({
            logoutVisible: t
        })),
        $("#footer-app").on(o.default.TAP, function() {
            o.default.downloadNativeApp("902803_26")
        }),
        $("#footer-logout").on(o.default.TAP, function() {
            (0,
            s.logout)().then(function(n) {
                location.href = "./welcome.html"
            })
        })
    }
}
, function(n, t, e) {
    e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = n.logoutVisible;
        return t += '<div class="footer">\n    <div class="foot_bottom">\n        <a href="./bridge.html" rel="nofollow">红娘</a>\n        <a id="footer-app" rel="nofollow">客户端</a>\n        <a href="./feedback.html" rel="nofollow">意见反馈</a>\n        ',
        e && (t += '\n        <a id="footer-logout">退出</a>\n        '),
        t += '\n    </div>\n    <div class="foot_deal">\n        <a href="./register/prDeal.html">珍爱网服务协议</a>\n        <a href="./register/serverDeal.html">个人隐私保护政策</a>\n    </div>\n    <div class="service_tel">\n        <span>客服电话：4001-520-520</span>\n    </div>\n    <div class="add_zp">\n    </div>\n    <div class="copy_right">Copyright © 2005-2018 珍爱网</div>\n</div>'
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = (e(4),
    e(22))
      , a = c(s);
    t.default = function() {
        $(document.body).append((0,
        a.default)());
        var n = $("#appAd_2")
          , t = ($("#appAd_open_2"),
        $("#appAd_close_btn_2"))
          , e = (/Android/gi.test(navigator.userAgent) || /adr/gi.test(navigator.userAgent),
        navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        /MicroMessenger/gi.test(navigator.userAgent),
        function(t) {
            o.default.preventDefault(t),
            n.remove()
        }
        );
        t.on(o.default.TAP, e),
        n.on(o.default.TAP, function() {
            o.default.downloadNativeApp("902803_27")
        }),
        n.css("display", "")
    }
}
, function(n, t, e) {
    e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = "";
        return t += '<div class="ggyBox" id="appAd_1" style="display: none;">\n    <div class="bottomBox">\n        <div class="tmBox"></div>\n        <a rel="nofollow" href="http://m.zhenai.com/v2/client/wakeupapp.do?uid=null&amp;v=1&amp;channelId=902759&amp;subChannelId=2&amp;signId=-1&amp;logmid=70499174&amp;l=10107&amp;source=9"></a>\n        <div class="too_L">\n            <a rel="nofollow" class="close_X" id="appAd_close_btn_1">\n                <img alt="top" ',
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/icon/close_gb_ee33104_c84d0e0.png"',
        t += ' class="mian_img">\n            </a>\n            <img alt="top" ',
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/icon/bottom_android_za_df98321_bed9a0a.png"',
        t += ' class="mian_img">\n            <span class="mian_img_03">\n                与TA沟通更及时\n                <br>\n                <a class="hhhj">马上打开,幸福握在手!</a>\n            </span>\n        </div>\n        <div class="too_R">\n            <a rel="nofollow" class="blue_btn" id="appAd_open_1">\n                <img alt="top" ',
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/icon/blue_btn_712a2ea_3032b0a.png"',
        t += ' class="mian_img_02">\n            </a>\n        </div>\n    </div>\n</div>\n<div class="bottom_ggyBox" id="appAd_2" style="display: none; z-index:9;">\n    <div class="box_left">\n        <div class="bottom_close_btn" id="appAd_close_btn_2"></div>\n    </div>\n    <div class="box_right" id="box_right">\n        <div class="logo_bg"></div>\n        <div class="bottom_text">\n            <p class="first_text">沟通更便捷，匹配更精准</p>\n            <p class="second_text">使用珍爱APP，提升64%的脱单率</p>\n        </div>\n        <div class="bottom_btn" id="appAd_open_2"></div>\n    </div>\n</div>'
    }
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.Page = {
        welcome: "./welcome.html",
        home: "./home.html",
        login: "./login.html",
        myService: "./im.html#service",
        myProfile: "./im.html#profile",
        avatar: "./avatar.html"
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(25)
      , a = c(s);
    t.default = function(n, t, e) {
        return $(n).html((0,
        a.default)({
            title: t || ""
        })),
        $(".back_out").on("mousedown", function() {
            /input/gi.test(document.activeElement.tagName) && setTimeout(function() {
                document.activeElement.blur()
            }, 10)
        }),
        $(".back_out").on(o.default.TAP, function() {
            e && e.length > 0 ? location.href = e : history.back()
        }),
        {
            setTitle: function(t) {
                $(n).find(".search_result_bar span").html(t)
            }
        }
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.title;
        return t += '<div class="tool_bar search_result_bar">\n    <a class="back_out">返回</a>\n    <span>',
        t += e(i),
        t += "</span>\n</div>"
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.storeImage = t.uploadImg = t.getObjectProfile = t.updateIntroduceContent = t.delMemberPhoto = t.getUploadLimitation = t.getMemberPhoto = t.updateProfile = t.getMemberProfile = t.getServiceList = void 0;
    var i = e(0)
      , o = c(i)
      , s = e(18)
      , a = c(s)
      , r = e(37)
      , l = e(38);
    window.location.protocol,
    t.getServiceList = function() {
        return o.default.get("/personal/getAccountInfo.do")
    }
    ,
    t.getMemberProfile = function() {
        return o.default.get("/profile/getProfile.do")
    }
    ,
    t.updateProfile = function(n) {
        return o.default.post("/profile/updateProfile.do", n)
    }
    ,
    t.getMemberPhoto = function(n, t) {
        return o.default.get("/photo/getPhotoList.do?page=" + n + "&pageSize=" + t)
    }
    ,
    t.getUploadLimitation = function() {
        return o.default.get("/photo/getUploadLimitation.do")
    }
    ,
    t.delMemberPhoto = function(n) {
        return o.default.post("/photo/delete.do", {
            photoType: 1,
            photoID: n
        })
    }
    ,
    t.updateIntroduceContent = function(n) {
        return o.default.post("/profile/updateIntroduceContent.do", n)
    }
    ,
    t.getObjectProfile = function(n) {
        return o.default.get("/profile/getObjectProfile.do?objectID=" + n)
    }
    ,
    t.uploadImg = function(n, t) {
        return new Promise(function(e, c) {
            var i = new r.QCloud(t)
              , o = new a.default({
                type: "loading"
            });
            (0,
            l.reduceFileSize)(n, 2097152, 1e3, 1 / 0, .9, function(n) {
                (0,
                l.blobToDataURL)(n, function(t) {
                    new a.default({
                        type: "image_preview",
                        ok: "确认上传",
                        cancel: "返回重选",
                        imgUrl: t,
                        okCallBack: function() {
                            i.uploadFile(n, ".jpg").then(function(n) {
                                if (result.isError)
                                    return void e(result);
                                o.closeLoad(),
                                e(!0)
                            }).catch(function(n) {
                                o.closeLoad(),
                                c(n)
                            })
                        },
                        closeCallBack: function() {
                            o.closeLoad(),
                            e({
                                isError: !1,
                                message: "返回重选"
                            })
                        }
                    })
                })
            })
        }
        )
    }
    ,
    t.storeImage = function(n) {
        return new Promise(function(t, e) {
            var c = new a.default({
                type: "loading"
            });
            if ("undefined" != typeof FileReader) {
                if (n.size >= 10485760) {
                    var i = "上传图片不能超过10M";
                    Z.tips(i),
                    c.closeLoad(),
                    e({
                        isError: !0,
                        errorMessage: i
                    })
                }
            }
            (0,
            l.reduceFileSize)(n, 2097152, 1e3, 1 / 0, .9, function(n) {
                (0,
                l.blobToDataURL)(n, function(n) {
                    sessionStorage.setItem("uploadAvatar", n),
                    c.closeLoad(),
                    t(!0)
                })
            })
        }
        )
    }
}
, function(n, t) {
    n.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFSElEQVR4nO1ay3KcRhQ9/aBBA8glTSn22Mv8/x9lkdWUXlg2iAGmX1mobockdmJQM4wrOlXaqKTm3tP3fZs9PDz8BuAX/D9RSQC/ri3Fiig5gGZtKVZEw9eWYG28EbC2AGvjjYC1BVgb8tQf5JyDcw7G2F9+772Hcw7OuZPKczICpHz5lNYaXdfBGBOUZYxBSgmlFJRSAABjzGnkWvJw7z2klOCco+s61HWNYRhgjIH3Ht778LeccwghkKYpLi8vsdls4JyDtXZJEZclIEkSWGtRVRWapoG1FlJKCCG++ffOOTw/P6NtW5RliaurKyRJAq31YjIuQoD3HkmS4Hg84vb2FsMwQCn1XcUJFB+89/jy5QsOhwPev3+Pi4uLxUiIngXGyu/3e2itkabpP4Lev4ExhizLYIzBfr9H3/dIkuQvLhML0QkQQsB7j/v7exhjQlCbCu89lFLw3uPu7g7W2v+0oDlYhIDPnz+j67qgwFyMramqKnAev2yJeqIQIkT7JEminZskCZqmweFwCOk0FqISwDlH27bRzZUxBucc2radFEt+BNEIYIzBGINhGEIkjwkhBIZhgNY6KgnRCOCcQ2sNrfUyvso5jDHRz49qAVTLxzZTOt97D2PMeVoAgEXy9N/Pj/2Nn64dPtsg6L2HEGIR/6fzGWPRi6Fo0jrnkCQJpJSL9PTUWVKDFQtRLYB6+iVaWGstlFLRe4LoQTDP8+h1AAW/PM/PNwYAL1OczWaDoiiiFSyMMWitURQF8jyPPilapB2+vr4Og4zXkEDVpRAC19fXoRaIiegEGGOQJAlubm7gvZ9NAilvrcXNzQ3SNF1kThidADLZPM+x2+3AGMMwDJPPOR6PcM7hw4cPKMtysYnQYjNBIuHTp0+oqgpt24bB5/cswnsPay2cc9hsNthut8iy7OebCRK01lBKYbfboa5rNE0Tbhb4s6ojv+acI01TFEWBy8vL0GAtiUUJoAZJCIHtdourqysMw4BhGGCtDfUC5zzUEGmaQkoZ/J9zvuiyZBECyNSdc9Bao+/7YNq0FRqXtVQ3dF2Htm0BvPT/UspQ/THGwhkxEZUAIUQYXNR1HTZAY8F/JI2RaxCRSilcXFwgz/NQCscigj08PNQAytceRHn/69evaNs2pL/xjU8FVYDkKkopFEWBd+/eQQgRIz40r7YA2us1TYOqqqC1DmYb42wiEXipMSijbLdbbDabsGabi1fVAeTHVVXh9vYWzjkopRZrickdhmHAfr9HXdevnhK/SlIpJZ6enlBVFZIkWWRx8S0QyXd3d2ia5lXWNosAWliQ2VOUPhWo9RZC4P7+Hn3fQ0o5yxVmEUABiLY1p7r5MYgE7z0eHx9Dip2K2QTUdR0C3tLD0O+BLPFwOMyOB5MJoDzfNE30NdVcCCHw/Pw8a2Q+mQBafy21AJkDKSWGYZi1O5ysgbUWfd+fjfJj9H0/+X8maUHB75xun8A5x/F4nOwGk7SgYQd1aeeEubvDyQSMn7edE6j1XtQCAJyl8gR6bDkFkwiY84FTY+p2erILzPnIqTDnciYR4JxDURQh754LvPfhLWKe55NWc5OqBmstsizDbrfD4+NjIGE89FjaMmhIMv7hnKMoCmy328kLmcm1rDEGWZbh48ePOBwO6LoupMbx297Y/QEpRAMSmhkqpZBlGbIsA4DJi5hZxTylmrIsUZZlmPsRCUu85BhPh4gAeo9AYzN6QzAFs7sZWnuRcOPp7ZIYkzserc9FlHZuiRs/Fc6rnl0BbwSsLcDaeCMAEbZCPzFKCeB3ANuVBVkLT38AR5UyYoZ8s6EAAAAASUVORK5CYII="
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.text;
        return t += '<span class="toast" style="max-width:180px">',
        t += e(i),
        t += "</span>"
    }
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = function(n, t, e, c, i) {
        return this.banner = n,
        this.startX = 0,
        this.endX = 0,
        this.sliderIndex = e,
        this.children = this.banner.childNodes,
        this.maxIndex = 0,
        this.offsetDist = t,
        this.interval = null,
        this.distX = 0,
        this.dm = 0,
        this.w = this.banner.offsetWidth,
        this.index = 0,
        this.callBack = c,
        this.canAuto = i,
        self.move = !0,
        this.init(),
        this
    };
    c.prototype = {
        init: function() {
            for (var n = this, t = n.children.length, e = [], c = 0; c < t; c++)
                n.children[c].tagName && (n.maxIndex++,
                e.push(n.children[c]));
            n.children = e,
            n.swipe(),
            n.canAuto && n.autoPlay()
        },
        swipe: function() {
            var n = this
              , t = !!("ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch)
              , e = t ? "touchstart" : "mousedown"
              , c = t ? "touchmove" : "mousemove"
              , i = t ? "touchend" : "mouseup"
              , o = function(e) {
                n.startX = t ? e.targetTouches[0].pageX : e.pageX,
                n.startY = t ? e.targetTouches[0].pageY : e.pageY,
                clearInterval(n.interval)
            }
              , s = function(e) {
                e.preventDefault();
                var c = t ? e.targetTouches[0].pageX : e.pageX
                  , i = (t ? e.targetTouches[0].pageY : e.pageY,
                c - n.startX);
                i = n.offsetDist + i,
                n.moveScroll(i, !1)
            }
              , a = function(e) {
                n.endX = t ? e.changedTouches[0].pageX : e.pageX;
                var c = (t ? e.changedTouches[0].pageY : e.pageY,
                n.endX - n.startX);
                e.target.style.webkitTransform;
                n.slider(c)
            };
            n.banner.addEventListener(e, o, !1),
            n.banner.addEventListener(c, s, !1),
            n.banner.addEventListener(i, a, !1)
        },
        moveScroll: function(n, t, e) {
            var c = this;
            c.banner.style.webkitTransition = "all ease-out 0s 0s",
            c.banner.style.transform = "translate3D(" + n + "px,0,0)",
            c.banner.style.webkitTransform = "translate3D(" + n + "px,0,0)",
            c.banner.style.mozTransform = "translate3D(" + n + "px,0,0)",
            c.banner.style.msTransform = "translate3D(" + n + "px,0,0)",
            t && c.callBack && c.callBack(e, c.sliderIndex)
        },
        scroll: function(n, t, e) {
            var c = this;
            c.banner.style.webkitTransition = "all ease-out .3s 0s",
            c.banner.style.transform = "translate3D(" + n + "px,0,0)",
            c.banner.style.webkitTransform = "translate3D(" + n + "px,0,0)",
            c.banner.style.mozTransform = "translate3D(" + n + "px,0,0)",
            c.banner.style.msTransform = "translate3D(" + n + "px,0,0)",
            t && c.callBack && c.callBack(e, c.sliderIndex)
        },
        scaleScroll: function(n, t) {
            n.style.webkitTransform = n.style.webkitTransform + " translateX(" + t.x + ") translateY(" + t.y + ")"
        },
        slider: function(n) {
            var t = n;
            if (0 != n) {
                var n = n
                  , e = this;
                n < 0 ? (e.sliderIndex += 1,
                e.sliderIndex >= e.maxIndex ? (n = e.offsetDist,
                e.sliderIndex = e.maxIndex - 1) : n = e.offsetDist - e.children[0].offsetWidth) : (e.sliderIndex -= 1,
                e.sliderIndex <= 0 ? (e.sliderIndex = 0,
                n = 0) : n = e.offsetDist + e.children[0].offsetWidth),
                e.scroll(n, !0, t),
                e.offsetDist = n,
                e.canAuto && e.autoPlay()
            }
        },
        autoPlay: function() {
            var n = this;
            n.interval = setInterval(function() {
                ++n.sliderIndex >= n.maxIndex && (n.sliderIndex = 0,
                n.offsetDist = 0);
                var t = 0 - n.sliderIndex * n.children[0].offsetWidth;
                n.offsetDist = t,
                n.scroll(t, !0, t)
            }, 3e3)
        }
    },
    t.default = c
}
, , , function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(33)
      , a = c(s);
    t.default = function() {
        $(document.body).append((0,
        a.default)()),
        $("#scroll_top").on(o.default.TAP, function() {
            window.scrollTo(0, 0)
        })
    }
}
, function(n, t, e) {
    e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = "";
        return t += '<div class="scroll_top" id="scroll_top" style="display: block; z-index:999;"></div>'
    }
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getBlindDateMatchList = t.sayHi = t.sendMailBatch = t.getBatchMailMembers = t.getRecommandUserInfos = void 0;
    var c = e(0)
      , i = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(c);
    t.getRecommandUserInfos = function(n) {
        return i.default.post("/recommend/getRecommendList.do", {
            page: n,
            pageSize: 5
        })
    }
    ,
    t.getBatchMailMembers = function() {
        return i.default.get("/loginWindow/getWindowData/3")
    }
    ,
    t.sendMailBatch = function(n) {
        return i.default.post("/mail/loginBatchSendMail.do", {
            objectIDArray: n,
            isHidePopup: !1
        })
    }
    ,
    t.sayHi = function(n) {
        return i.default.get("/mail/greet.do?objectID=" + n)
    }
    ,
    t.getBlindDateMatchList = function() {
        return i.default.post("/wechatBlindDate/getBlindDateMatchList.do", {
            page: 1,
            pageSize: 10
        })
    }
}
, function(n, t, e) {
    "use strict";
    var c, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
        return typeof n
    }
    : function(n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    }
    ;
    !function(o, s, a) {
        function r(n, t) {
            this.wrapper = "string" == typeof n ? s.querySelector(n) : n,
            this.scroller = this.wrapper.children[0],
            this.scrollerStyle = this.scroller.style,
            this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                disablePointer: !u.hasPointer,
                disableTouch: u.hasPointer || !u.hasTouch,
                disableMouse: u.hasPointer || u.hasTouch,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0,
                bindToWrapper: void 0 === o.onmousedown
            };
            for (var e in t)
                this.options[e] = t[e];
            this.translateZ = this.options.HWCompositing && u.hasPerspective ? " translateZ(0)" : "",
            this.options.useTransition = u.hasTransition && this.options.useTransition,
            this.options.useTransform = u.hasTransform && this.options.useTransform,
            this.options.eventPassthrough = !0 === this.options.eventPassthrough ? "vertical" : this.options.eventPassthrough,
            this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
            this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY,
            this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX,
            this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
            this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
            this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? u.ease[this.options.bounceEasing] || u.ease.circular : this.options.bounceEasing,
            this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
            !0 === this.options.tap && (this.options.tap = "tap"),
            this.options.useTransition || this.options.useTransform || /relative|absolute/i.test(this.scrollerStyle.position) || (this.scrollerStyle.position = "relative"),
            "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1),
            this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1,
            3 == this.options.probeType && (this.options.useTransition = !1),
            this.x = 0,
            this.y = 0,
            this.directionX = 0,
            this.directionY = 0,
            this._events = {},
            this._init(),
            this.refresh(),
            this.scrollTo(this.options.startX, this.options.startY),
            this.enable()
        }
        function l(n, t, e) {
            var c = s.createElement("div")
              , i = s.createElement("div");
            return !0 === e && (c.style.cssText = "position:absolute;z-index:9999",
            i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"),
            i.className = "iScrollIndicator",
            "h" == n ? (!0 === e && (c.style.cssText += ";height:7px;left:2px;right:2px;bottom:0",
            i.style.height = "100%"),
            c.className = "iScrollHorizontalScrollbar") : (!0 === e && (c.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px",
            i.style.width = "100%"),
            c.className = "iScrollVerticalScrollbar"),
            c.style.cssText += ";overflow:hidden",
            t || (c.style.pointerEvents = "none"),
            c.appendChild(i),
            c
        }
        function d(n, t) {
            this.wrapper = "string" == typeof t.el ? s.querySelector(t.el) : t.el,
            this.wrapperStyle = this.wrapper.style,
            this.indicator = this.wrapper.children[0],
            this.indicatorStyle = this.indicator.style,
            this.scroller = n,
            this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            };
            for (var e in t)
                this.options[e] = t[e];
            if (this.sizeRatioX = 1,
            this.sizeRatioY = 1,
            this.maxPosX = 0,
            this.maxPosY = 0,
            this.options.interactive && (this.options.disableTouch || (u.addEvent(this.indicator, "touchstart", this),
            u.addEvent(o, "touchend", this)),
            this.options.disablePointer || (u.addEvent(this.indicator, u.prefixPointerEvent("pointerdown"), this),
            u.addEvent(o, u.prefixPointerEvent("pointerup"), this)),
            this.options.disableMouse || (u.addEvent(this.indicator, "mousedown", this),
            u.addEvent(o, "mouseup", this))),
            this.options.fade) {
                this.wrapperStyle[u.style.transform] = this.scroller.translateZ;
                var c = u.style.transitionDuration;
                if (!c)
                    return;
                this.wrapperStyle[c] = u.isBadAndroid ? "0.0001ms" : "0ms";
                var i = this;
                u.isBadAndroid && h(function() {
                    "0.0001ms" === i.wrapperStyle[c] && (i.wrapperStyle[c] = "0s")
                }),
                this.wrapperStyle.opacity = "0"
            }
        }
        var h = o.requestAnimationFrame || o.webkitRequestAnimationFrame || o.mozRequestAnimationFrame || o.oRequestAnimationFrame || o.msRequestAnimationFrame || function(n) {
            o.setTimeout(n, 1e3 / 60)
        }
          , u = function() {
            function n(n) {
                return !1 !== c && ("" === c ? n : c + n.charAt(0).toUpperCase() + n.substr(1))
            }
            var t = {}
              , e = s.createElement("div").style
              , c = function() {
                for (var n = ["t", "webkitT", "MozT", "msT", "OT"], t = 0, c = n.length; t < c; t++)
                    if (n[t] + "ransform"in e)
                        return n[t].substr(0, n[t].length - 1);
                return !1
            }();
            t.getTime = Date.now || function() {
                return (new Date).getTime()
            }
            ,
            t.extend = function(n, t) {
                for (var e in t)
                    n[e] = t[e]
            }
            ,
            t.addEvent = function(n, t, e, c) {
                n.addEventListener(t, e, !!c)
            }
            ,
            t.removeEvent = function(n, t, e, c) {
                n.removeEventListener(t, e, !!c)
            }
            ,
            t.prefixPointerEvent = function(n) {
                return o.MSPointerEvent ? "MSPointer" + n.charAt(7).toUpperCase() + n.substr(8) : n
            }
            ,
            t.momentum = function(n, t, e, c, i, o) {
                var s, r, l = n - t, d = a.abs(l) / e;
                return o = void 0 === o ? 6e-4 : o,
                s = n + d * d / (2 * o) * (l < 0 ? -1 : 1),
                r = d / o,
                s < c ? (s = i ? c - i / 2.5 * (d / 8) : c,
                l = a.abs(s - n),
                r = l / d) : s > 0 && (s = i ? i / 2.5 * (d / 8) : 0,
                l = a.abs(n) + s,
                r = l / d),
                {
                    destination: a.round(s),
                    duration: r
                }
            }
            ;
            var r = n("transform");
            return t.extend(t, {
                hasTransform: !1 !== r,
                hasPerspective: n("perspective")in e,
                hasTouch: "ontouchstart"in o,
                hasPointer: !(!o.PointerEvent && !o.MSPointerEvent),
                hasTransition: n("transition")in e
            }),
            t.isBadAndroid = function() {
                var n = o.navigator.appVersion;
                if (/Android/.test(n) && !/Chrome\/\d/.test(n)) {
                    var t = n.match(/Safari\/(\d+.\d)/);
                    return !(t && "object" === (void 0 === t ? "undefined" : i(t)) && t.length >= 2) || parseFloat(t[1]) < 535.19
                }
                return !1
            }(),
            t.extend(t.style = {}, {
                transform: r,
                transitionTimingFunction: n("transitionTimingFunction"),
                transitionDuration: n("transitionDuration"),
                transitionDelay: n("transitionDelay"),
                transformOrigin: n("transformOrigin"),
                touchAction: n("touchAction")
            }),
            t.hasClass = function(n, t) {
                return new RegExp("(^|\\s)" + t + "(\\s|$)").test(n.className)
            }
            ,
            t.addClass = function(n, e) {
                if (!t.hasClass(n, e)) {
                    var c = n.className.split(" ");
                    c.push(e),
                    n.className = c.join(" ")
                }
            }
            ,
            t.removeClass = function(n, e) {
                if (t.hasClass(n, e)) {
                    var c = new RegExp("(^|\\s)" + e + "(\\s|$)","g");
                    n.className = n.className.replace(c, " ")
                }
            }
            ,
            t.offset = function(n) {
                for (var t = -n.offsetLeft, e = -n.offsetTop; n = n.offsetParent; )
                    t -= n.offsetLeft,
                    e -= n.offsetTop;
                return {
                    left: t,
                    top: e
                }
            }
            ,
            t.preventDefaultException = function(n, t) {
                for (var e in t)
                    if (t[e].test(n[e]))
                        return !0;
                return !1
            }
            ,
            t.extend(t.eventType = {}, {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,
                mousedown: 2,
                mousemove: 2,
                mouseup: 2,
                pointerdown: 3,
                pointermove: 3,
                pointerup: 3,
                MSPointerDown: 3,
                MSPointerMove: 3,
                MSPointerUp: 3
            }),
            t.extend(t.ease = {}, {
                quadratic: {
                    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    fn: function(n) {
                        return n * (2 - n)
                    }
                },
                circular: {
                    style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                    fn: function(n) {
                        return a.sqrt(1 - --n * n)
                    }
                },
                back: {
                    style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    fn: function(n) {
                        return (n -= 1) * n * (5 * n + 4) + 1
                    }
                },
                bounce: {
                    style: "",
                    fn: function(n) {
                        return (n /= 1) < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
                    }
                },
                elastic: {
                    style: "",
                    fn: function(n) {
                        return 0 === n ? 0 : 1 == n ? 1 : .4 * a.pow(2, -10 * n) * a.sin((n - .055) * (2 * a.PI) / .22) + 1
                    }
                }
            }),
            t.tap = function(n, t) {
                var e = s.createEvent("Event");
                e.initEvent(t, !0, !0),
                e.pageX = n.pageX,
                e.pageY = n.pageY,
                n.target.dispatchEvent(e)
            }
            ,
            t.click = function(n) {
                var t, e = n.target;
                /(SELECT|INPUT|TEXTAREA)/i.test(e.tagName) || (t = s.createEvent(o.MouseEvent ? "MouseEvents" : "Event"),
                t.initEvent("click", !0, !0),
                t.view = n.view || o,
                t.detail = 1,
                t.screenX = e.screenX || 0,
                t.screenY = e.screenY || 0,
                t.clientX = e.clientX || 0,
                t.clientY = e.clientY || 0,
                t.ctrlKey = !!n.ctrlKey,
                t.altKey = !!n.altKey,
                t.shiftKey = !!n.shiftKey,
                t.metaKey = !!n.metaKey,
                t.button = 0,
                t.relatedTarget = null,
                t._constructed = !0,
                e.dispatchEvent(t))
            }
            ,
            t.getTouchAction = function(n, t) {
                var e = "none";
                return "vertical" === n ? e = "pan-y" : "horizontal" === n && (e = "pan-x"),
                t && "none" != e && (e += " pinch-zoom"),
                e
            }
            ,
            t.getRect = function(n) {
                if (n instanceof SVGElement) {
                    var t = n.getBoundingClientRect();
                    return {
                        top: t.top,
                        left: t.left,
                        width: t.width,
                        height: t.height
                    }
                }
                return {
                    top: n.offsetTop,
                    left: n.offsetLeft,
                    width: n.offsetWidth,
                    height: n.offsetHeight
                }
            }
            ,
            t
        }();
        r.prototype = {
            version: "5.2.0-snapshot",
            _init: function() {
                this._initEvents(),
                (this.options.scrollbars || this.options.indicators) && this._initIndicators(),
                this.options.mouseWheel && this._initWheel(),
                this.options.snap && this._initSnap(),
                this.options.keyBindings && this._initKeys()
            },
            destroy: function() {
                this._initEvents(!0),
                clearTimeout(this.resizeTimeout),
                this.resizeTimeout = null,
                this._execEvent("destroy")
            },
            _transitionEnd: function(n) {
                n.target == this.scroller && this.isInTransition && (this._transitionTime(),
                this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1,
                this._execEvent("scrollEnd")))
            },
            _start: function(n) {
                if (1 != u.eventType[n.type]) {
                    if (0 !== (n.which ? n.button : n.button < 2 ? 0 : 4 == n.button ? 1 : 2))
                        return
                }
                if (this.enabled && (!this.initiated || u.eventType[n.type] === this.initiated)) {
                    !this.options.preventDefault || u.isBadAndroid || u.preventDefaultException(n.target, this.options.preventDefaultException) || n.preventDefault();
                    var t, e = n.touches ? n.touches[0] : n;
                    this.initiated = u.eventType[n.type],
                    this.moved = !1,
                    this.distX = 0,
                    this.distY = 0,
                    this.directionX = 0,
                    this.directionY = 0,
                    this.directionLocked = 0,
                    this.startTime = u.getTime(),
                    this.options.useTransition && this.isInTransition ? (this._transitionTime(),
                    this.isInTransition = !1,
                    t = this.getComputedPosition(),
                    this._translate(a.round(t.x), a.round(t.y)),
                    this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1,
                    this._execEvent("scrollEnd")),
                    this.startX = this.x,
                    this.startY = this.y,
                    this.absStartX = this.x,
                    this.absStartY = this.y,
                    this.pointX = e.pageX,
                    this.pointY = e.pageY,
                    this._execEvent("beforeScrollStart")
                }
            },
            _move: function(n) {
                if (this.enabled && u.eventType[n.type] === this.initiated) {
                    this.options.preventDefault && n.preventDefault();
                    var t, e, c, i, o = n.touches ? n.touches[0] : n, s = o.pageX - this.pointX, r = o.pageY - this.pointY, l = u.getTime();
                    if (this.pointX = o.pageX,
                    this.pointY = o.pageY,
                    this.distX += s,
                    this.distY += r,
                    c = a.abs(this.distX),
                    i = a.abs(this.distY),
                    !(l - this.endTime > 300 && c < 10 && i < 10)) {
                        if (this.directionLocked || this.options.freeScroll || (c > i + this.options.directionLockThreshold ? this.directionLocked = "h" : i >= c + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"),
                        "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough)
                                n.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough)
                                return void (this.initiated = !1);
                            r = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough)
                                n.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough)
                                return void (this.initiated = !1);
                            s = 0
                        }
                        s = this.hasHorizontalScroll ? s : 0,
                        r = this.hasVerticalScroll ? r : 0,
                        t = this.x + s,
                        e = this.y + r,
                        (t > 0 || t < this.maxScrollX) && (t = this.options.bounce ? this.x + s / 3 : t > 0 ? 0 : this.maxScrollX),
                        (e > 0 || e < this.maxScrollY) && (e = this.options.bounce ? this.y + r / 3 : e > 0 ? 0 : this.maxScrollY),
                        this.directionX = s > 0 ? -1 : s < 0 ? 1 : 0,
                        this.directionY = r > 0 ? -1 : r < 0 ? 1 : 0,
                        this.moved || this._execEvent("scrollStart"),
                        this.moved = !0,
                        this._translate(t, e),
                        l - this.startTime > 300 && (this.startTime = l,
                        this.startX = this.x,
                        this.startY = this.y,
                        1 == this.options.probeType && this._execEvent("scroll")),
                        this.options.probeType > 1 && this._execEvent("scroll")
                    }
                }
            },
            _end: function(n) {
                if (this.enabled && u.eventType[n.type] === this.initiated) {
                    this.options.preventDefault && !u.preventDefaultException(n.target, this.options.preventDefaultException) && n.preventDefault();
                    var t, e, c = (n.changedTouches && n.changedTouches[0],
                    u.getTime() - this.startTime), i = a.round(this.x), o = a.round(this.y), s = a.abs(i - this.startX), r = a.abs(o - this.startY), l = 0, d = "";
                    if (this.isInTransition = 0,
                    this.initiated = 0,
                    this.endTime = u.getTime(),
                    !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(i, o),
                        !this.moved)
                            return this.options.tap && u.tap(n, this.options.tap),
                            this.options.click && u.click(n),
                            void this._execEvent("scrollCancel");
                        if (this._events.flick && c < 200 && s < 100 && r < 100)
                            return void this._execEvent("flick");
                        if (this.options.momentum && c < 300 && (t = this.hasHorizontalScroll ? u.momentum(this.x, this.startX, c, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                            destination: i,
                            duration: 0
                        },
                        e = this.hasVerticalScroll ? u.momentum(this.y, this.startY, c, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                            destination: o,
                            duration: 0
                        },
                        i = t.destination,
                        o = e.destination,
                        l = a.max(t.duration, e.duration),
                        this.isInTransition = 1),
                        this.options.snap) {
                            var h = this._nearestSnap(i, o);
                            this.currentPage = h,
                            l = this.options.snapSpeed || a.max(a.max(a.min(a.abs(i - h.x), 1e3), a.min(a.abs(o - h.y), 1e3)), 300),
                            i = h.x,
                            o = h.y,
                            this.directionX = 0,
                            this.directionY = 0,
                            d = this.options.bounceEasing
                        }
                        if (i != this.x || o != this.y)
                            return (i > 0 || i < this.maxScrollX || o > 0 || o < this.maxScrollY) && (d = u.ease.quadratic),
                            void this.scrollTo(i, o, l, d);
                        this._execEvent("scrollEnd")
                    }
                }
            },
            _resize: function() {
                var n = this;
                clearTimeout(this.resizeTimeout),
                this.resizeTimeout = setTimeout(function() {
                    n.refresh()
                }, this.options.resizePolling)
            },
            resetPosition: function(n) {
                var t = this.x
                  , e = this.y;
                return n = n || 0,
                !this.hasHorizontalScroll || this.x > 0 ? t = 0 : this.x < this.maxScrollX && (t = this.maxScrollX),
                !this.hasVerticalScroll || this.y > 0 ? e = 0 : this.y < this.maxScrollY && (e = this.maxScrollY),
                (t != this.x || e != this.y) && (this.scrollTo(t, e, n, this.options.bounceEasing),
                !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                u.getRect(this.wrapper),
                this.wrapperWidth = this.wrapper.clientWidth,
                this.wrapperHeight = this.wrapper.clientHeight;
                var n = u.getRect(this.scroller);
                this.scrollerWidth = n.width,
                this.scrollerHeight = n.height,
                this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
                this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
                this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
                this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
                this.hasHorizontalScroll || (this.maxScrollX = 0,
                this.scrollerWidth = this.wrapperWidth),
                this.hasVerticalScroll || (this.maxScrollY = 0,
                this.scrollerHeight = this.wrapperHeight),
                this.endTime = 0,
                this.directionX = 0,
                this.directionY = 0,
                u.hasPointer && !this.options.disablePointer && (this.wrapper.style[u.style.touchAction] = u.getTouchAction(this.options.eventPassthrough, !0),
                this.wrapper.style[u.style.touchAction] || (this.wrapper.style[u.style.touchAction] = u.getTouchAction(this.options.eventPassthrough, !1))),
                this.wrapperOffset = u.offset(this.wrapper),
                this._execEvent("refresh"),
                this.resetPosition()
            },
            on: function(n, t) {
                this._events[n] || (this._events[n] = []),
                this._events[n].push(t)
            },
            off: function(n, t) {
                if (this._events[n]) {
                    var e = this._events[n].indexOf(t);
                    e > -1 && this._events[n].splice(e, 1)
                }
            },
            _execEvent: function(n) {
                if (this._events[n]) {
                    var t = 0
                      , e = this._events[n].length;
                    if (e)
                        for (; t < e; t++)
                            this._events[n][t].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(n, t, e, c) {
                n = this.x + n,
                t = this.y + t,
                e = e || 0,
                this.scrollTo(n, t, e, c)
            },
            scrollTo: function(n, t, e, c) {
                c = c || u.ease.circular,
                this.isInTransition = this.options.useTransition && e > 0;
                var i = this.options.useTransition && c.style;
                !e || i ? (i && (this._transitionTimingFunction(c.style),
                this._transitionTime(e)),
                this._translate(n, t)) : this._animate(n, t, e, c.fn)
            },
            scrollToElement: function(n, t, e, c, i) {
                if (n = n.nodeType ? n : this.scroller.querySelector(n)) {
                    var o = u.offset(n);
                    o.left -= this.wrapperOffset.left,
                    o.top -= this.wrapperOffset.top;
                    var s = u.getRect(n)
                      , r = u.getRect(this.wrapper);
                    !0 === e && (e = a.round(s.width / 2 - r.width / 2)),
                    !0 === c && (c = a.round(s.height / 2 - r.height / 2)),
                    o.left -= e || 0,
                    o.top -= c || 0,
                    o.left = o.left > 0 ? 0 : o.left < this.maxScrollX ? this.maxScrollX : o.left,
                    o.top = o.top > 0 ? 0 : o.top < this.maxScrollY ? this.maxScrollY : o.top,
                    t = void 0 === t || null === t || "auto" === t ? a.max(a.abs(this.x - o.left), a.abs(this.y - o.top)) : t,
                    this.scrollTo(o.left, o.top, t, i)
                }
            },
            _transitionTime: function(n) {
                if (this.options.useTransition) {
                    n = n || 0;
                    var t = u.style.transitionDuration;
                    if (t) {
                        if (this.scrollerStyle[t] = n + "ms",
                        !n && u.isBadAndroid) {
                            this.scrollerStyle[t] = "0.0001ms";
                            var e = this;
                            h(function() {
                                "0.0001ms" === e.scrollerStyle[t] && (e.scrollerStyle[t] = "0s")
                            })
                        }
                        if (this.indicators)
                            for (var c = this.indicators.length; c--; )
                                this.indicators[c].transitionTime(n)
                    }
                }
            },
            _transitionTimingFunction: function(n) {
                if (this.scrollerStyle[u.style.transitionTimingFunction] = n,
                this.indicators)
                    for (var t = this.indicators.length; t--; )
                        this.indicators[t].transitionTimingFunction(n)
            },
            _translate: function(n, t) {
                if (this.options.useTransform ? this.scrollerStyle[u.style.transform] = "translate(" + n + "px," + t + "px)" + this.translateZ : (n = a.round(n),
                t = a.round(t),
                this.scrollerStyle.left = n + "px",
                this.scrollerStyle.top = t + "px"),
                this.x = n,
                this.y = t,
                this.indicators)
                    for (var e = this.indicators.length; e--; )
                        this.indicators[e].updatePosition()
            },
            _initEvents: function(n) {
                var t = n ? u.removeEvent : u.addEvent
                  , e = this.options.bindToWrapper ? this.wrapper : o;
                t(o, "orientationchange", this),
                t(o, "resize", this),
                this.options.click && t(this.wrapper, "click", this, !0),
                this.options.disableMouse || (t(this.wrapper, "mousedown", this),
                t(e, "mousemove", this),
                t(e, "mousecancel", this),
                t(e, "mouseup", this)),
                u.hasPointer && !this.options.disablePointer && (t(this.wrapper, u.prefixPointerEvent("pointerdown"), this),
                t(e, u.prefixPointerEvent("pointermove"), this),
                t(e, u.prefixPointerEvent("pointercancel"), this),
                t(e, u.prefixPointerEvent("pointerup"), this)),
                u.hasTouch && !this.options.disableTouch && (t(this.wrapper, "touchstart", this),
                t(e, "touchmove", this),
                t(e, "touchcancel", this),
                t(e, "touchend", this)),
                t(this.scroller, "transitionend", this),
                t(this.scroller, "webkitTransitionEnd", this),
                t(this.scroller, "oTransitionEnd", this),
                t(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var n, t, e = o.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (e = e[u.style.transform].split(")")[0].split(", "),
                n = +(e[12] || e[4]),
                t = +(e[13] || e[5])) : (n = +e.left.replace(/[^-\d.]/g, ""),
                t = +e.top.replace(/[^-\d.]/g, "")),
                {
                    x: n,
                    y: t
                }
            },
            _initIndicators: function() {
                function n(n) {
                    if (o.indicators)
                        for (var t = o.indicators.length; t--; )
                            n.call(o.indicators[t])
                }
                var t, e = this.options.interactiveScrollbars, c = "string" != typeof this.options.scrollbars, i = [], o = this;
                this.indicators = [],
                this.options.scrollbars && (this.options.scrollY && (t = {
                    el: l("v", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: c,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                },
                this.wrapper.appendChild(t.el),
                i.push(t)),
                this.options.scrollX && (t = {
                    el: l("h", e, this.options.scrollbars),
                    interactive: e,
                    defaultScrollbars: !0,
                    customStyle: c,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                },
                this.wrapper.appendChild(t.el),
                i.push(t))),
                this.options.indicators && (i = i.concat(this.options.indicators));
                for (var s = i.length; s--; )
                    this.indicators.push(new d(this,i[s]));
                this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                    n(function() {
                        this.fade()
                    })
                }),
                this.on("scrollCancel", function() {
                    n(function() {
                        this.fade()
                    })
                }),
                this.on("scrollStart", function() {
                    n(function() {
                        this.fade(1)
                    })
                }),
                this.on("beforeScrollStart", function() {
                    n(function() {
                        this.fade(1, !0)
                    })
                })),
                this.on("refresh", function() {
                    n(function() {
                        this.refresh()
                    })
                }),
                this.on("destroy", function() {
                    n(function() {
                        this.destroy()
                    }),
                    delete this.indicators
                })
            },
            _initWheel: function() {
                u.addEvent(this.wrapper, "wheel", this),
                u.addEvent(this.wrapper, "mousewheel", this),
                u.addEvent(this.wrapper, "DOMMouseScroll", this),
                this.on("destroy", function() {
                    clearTimeout(this.wheelTimeout),
                    this.wheelTimeout = null,
                    u.removeEvent(this.wrapper, "wheel", this),
                    u.removeEvent(this.wrapper, "mousewheel", this),
                    u.removeEvent(this.wrapper, "DOMMouseScroll", this)
                })
            },
            _wheel: function(n) {
                if (this.enabled) {
                    n.preventDefault();
                    var t, e, c, i, o = this;
                    if (void 0 === this.wheelTimeout && o._execEvent("scrollStart"),
                    clearTimeout(this.wheelTimeout),
                    this.wheelTimeout = setTimeout(function() {
                        o.options.snap || o._execEvent("scrollEnd"),
                        o.wheelTimeout = void 0
                    }, 400),
                    "deltaX"in n)
                        1 === n.deltaMode ? (t = -n.deltaX * this.options.mouseWheelSpeed,
                        e = -n.deltaY * this.options.mouseWheelSpeed) : (t = -n.deltaX,
                        e = -n.deltaY);
                    else if ("wheelDeltaX"in n)
                        t = n.wheelDeltaX / 120 * this.options.mouseWheelSpeed,
                        e = n.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                    else if ("wheelDelta"in n)
                        t = e = n.wheelDelta / 120 * this.options.mouseWheelSpeed;
                    else {
                        if (!("detail"in n))
                            return;
                        t = e = -n.detail / 3 * this.options.mouseWheelSpeed
                    }
                    if (t *= this.options.invertWheelDirection,
                    e *= this.options.invertWheelDirection,
                    this.hasVerticalScroll || (t = e,
                    e = 0),
                    this.options.snap)
                        return c = this.currentPage.pageX,
                        i = this.currentPage.pageY,
                        t > 0 ? c-- : t < 0 && c++,
                        e > 0 ? i-- : e < 0 && i++,
                        void this.goToPage(c, i);
                    c = this.x + a.round(this.hasHorizontalScroll ? t : 0),
                    i = this.y + a.round(this.hasVerticalScroll ? e : 0),
                    this.directionX = t > 0 ? -1 : t < 0 ? 1 : 0,
                    this.directionY = e > 0 ? -1 : e < 0 ? 1 : 0,
                    c > 0 ? c = 0 : c < this.maxScrollX && (c = this.maxScrollX),
                    i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY),
                    this.scrollTo(c, i, 0),
                    this.options.probeType > 1 && this._execEvent("scroll")
                }
            },
            _initSnap: function() {
                this.currentPage = {},
                "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)),
                this.on("refresh", function() {
                    var n, t, e, c, i, o, s, r = 0, l = 0, d = 0, h = this.options.snapStepX || this.wrapperWidth, p = this.options.snapStepY || this.wrapperHeight;
                    if (this.pages = [],
                    this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                        if (!0 === this.options.snap)
                            for (e = a.round(h / 2),
                            c = a.round(p / 2); d > -this.scrollerWidth; ) {
                                for (this.pages[r] = [],
                                n = 0,
                                i = 0; i > -this.scrollerHeight; )
                                    this.pages[r][n] = {
                                        x: a.max(d, this.maxScrollX),
                                        y: a.max(i, this.maxScrollY),
                                        width: h,
                                        height: p,
                                        cx: d - e,
                                        cy: i - c
                                    },
                                    i -= p,
                                    n++;
                                d -= h,
                                r++
                            }
                        else
                            for (o = this.options.snap,
                            n = o.length,
                            t = -1; r < n; r++)
                                s = u.getRect(o[r]),
                                (0 === r || s.left <= u.getRect(o[r - 1]).left) && (l = 0,
                                t++),
                                this.pages[l] || (this.pages[l] = []),
                                d = a.max(-s.left, this.maxScrollX),
                                i = a.max(-s.top, this.maxScrollY),
                                e = d - a.round(s.width / 2),
                                c = i - a.round(s.height / 2),
                                this.pages[l][t] = {
                                    x: d,
                                    y: i,
                                    width: s.width,
                                    height: s.height,
                                    cx: e,
                                    cy: c
                                },
                                d > this.maxScrollX && l++;
                        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0),
                        this.options.snapThreshold % 1 == 0 ? (this.snapThresholdX = this.options.snapThreshold,
                        this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = a.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold),
                        this.snapThresholdY = a.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                    }
                }),
                this.on("flick", function() {
                    var n = this.options.snapSpeed || a.max(a.max(a.min(a.abs(this.x - this.startX), 1e3), a.min(a.abs(this.y - this.startY), 1e3)), 300);
                    this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, n)
                })
            },
            _nearestSnap: function(n, t) {
                if (!this.pages.length)
                    return {
                        x: 0,
                        y: 0,
                        pageX: 0,
                        pageY: 0
                    };
                var e = 0
                  , c = this.pages.length
                  , i = 0;
                if (a.abs(n - this.absStartX) < this.snapThresholdX && a.abs(t - this.absStartY) < this.snapThresholdY)
                    return this.currentPage;
                for (n > 0 ? n = 0 : n < this.maxScrollX && (n = this.maxScrollX),
                t > 0 ? t = 0 : t < this.maxScrollY && (t = this.maxScrollY); e < c; e++)
                    if (n >= this.pages[e][0].cx) {
                        n = this.pages[e][0].x;
                        break
                    }
                for (c = this.pages[e].length; i < c; i++)
                    if (t >= this.pages[0][i].cy) {
                        t = this.pages[0][i].y;
                        break
                    }
                return e == this.currentPage.pageX && (e += this.directionX,
                e < 0 ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1),
                n = this.pages[e][0].x),
                i == this.currentPage.pageY && (i += this.directionY,
                i < 0 ? i = 0 : i >= this.pages[0].length && (i = this.pages[0].length - 1),
                t = this.pages[0][i].y),
                {
                    x: n,
                    y: t,
                    pageX: e,
                    pageY: i
                }
            },
            goToPage: function(n, t, e, c) {
                c = c || this.options.bounceEasing,
                n >= this.pages.length ? n = this.pages.length - 1 : n < 0 && (n = 0),
                t >= this.pages[n].length ? t = this.pages[n].length - 1 : t < 0 && (t = 0);
                var i = this.pages[n][t].x
                  , o = this.pages[n][t].y;
                e = void 0 === e ? this.options.snapSpeed || a.max(a.max(a.min(a.abs(i - this.x), 1e3), a.min(a.abs(o - this.y), 1e3)), 300) : e,
                this.currentPage = {
                    x: i,
                    y: o,
                    pageX: n,
                    pageY: t
                },
                this.scrollTo(i, o, e, c)
            },
            next: function(n, t) {
                var e = this.currentPage.pageX
                  , c = this.currentPage.pageY;
                e++,
                e >= this.pages.length && this.hasVerticalScroll && (e = 0,
                c++),
                this.goToPage(e, c, n, t)
            },
            prev: function(n, t) {
                var e = this.currentPage.pageX
                  , c = this.currentPage.pageY;
                e--,
                e < 0 && this.hasVerticalScroll && (e = 0,
                c--),
                this.goToPage(e, c, n, t)
            },
            _initKeys: function(n) {
                var t, e = {
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36,
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };
                if ("object" == i(this.options.keyBindings))
                    for (t in this.options.keyBindings)
                        "string" == typeof this.options.keyBindings[t] && (this.options.keyBindings[t] = this.options.keyBindings[t].toUpperCase().charCodeAt(0));
                else
                    this.options.keyBindings = {};
                for (t in e)
                    this.options.keyBindings[t] = this.options.keyBindings[t] || e[t];
                u.addEvent(o, "keydown", this),
                this.on("destroy", function() {
                    u.removeEvent(o, "keydown", this)
                })
            },
            _key: function(n) {
                if (this.enabled) {
                    var t, e = this.options.snap, c = e ? this.currentPage.pageX : this.x, i = e ? this.currentPage.pageY : this.y, o = u.getTime(), s = this.keyTime || 0;
                    switch (this.options.useTransition && this.isInTransition && (t = this.getComputedPosition(),
                    this._translate(a.round(t.x), a.round(t.y)),
                    this.isInTransition = !1),
                    this.keyAcceleration = o - s < 200 ? a.min(this.keyAcceleration + .25, 50) : 0,
                    n.keyCode) {
                    case this.options.keyBindings.pageUp:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? c += e ? 1 : this.wrapperWidth : i += e ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.pageDown:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? c -= e ? 1 : this.wrapperWidth : i -= e ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.end:
                        c = e ? this.pages.length - 1 : this.maxScrollX,
                        i = e ? this.pages[0].length - 1 : this.maxScrollY;
                        break;
                    case this.options.keyBindings.home:
                        c = 0,
                        i = 0;
                        break;
                    case this.options.keyBindings.left:
                        c += e ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.up:
                        i += e ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.right:
                        c -= e ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.down:
                        i -= e ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    default:
                        return
                    }
                    if (e)
                        return void this.goToPage(c, i);
                    c > 0 ? (c = 0,
                    this.keyAcceleration = 0) : c < this.maxScrollX && (c = this.maxScrollX,
                    this.keyAcceleration = 0),
                    i > 0 ? (i = 0,
                    this.keyAcceleration = 0) : i < this.maxScrollY && (i = this.maxScrollY,
                    this.keyAcceleration = 0),
                    this.scrollTo(c, i, 0),
                    this.keyTime = o
                }
            },
            _animate: function(n, t, e, c) {
                function i() {
                    var d, p, f, m = u.getTime();
                    if (m >= l)
                        return o.isAnimating = !1,
                        o._translate(n, t),
                        void (o.resetPosition(o.options.bounceTime) || o._execEvent("scrollEnd"));
                    m = (m - r) / e,
                    f = c(m),
                    d = (n - s) * f + s,
                    p = (t - a) * f + a,
                    o._translate(d, p),
                    o.isAnimating && h(i),
                    3 == o.options.probeType && o._execEvent("scroll")
                }
                var o = this
                  , s = this.x
                  , a = this.y
                  , r = u.getTime()
                  , l = r + e;
                this.isAnimating = !0,
                i()
            },
            handleEvent: function(n) {
                switch (n.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(n);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(n);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(n);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                    this._transitionEnd(n);
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    this._wheel(n);
                    break;
                case "keydown":
                    this._key(n);
                    break;
                case "click":
                    this.enabled && !n._constructed && (n.preventDefault(),
                    n.stopPropagation())
                }
            }
        },
        d.prototype = {
            handleEvent: function(n) {
                switch (n.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(n);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(n);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(n)
                }
            },
            destroy: function() {
                this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout),
                this.fadeTimeout = null),
                this.options.interactive && (u.removeEvent(this.indicator, "touchstart", this),
                u.removeEvent(this.indicator, u.prefixPointerEvent("pointerdown"), this),
                u.removeEvent(this.indicator, "mousedown", this),
                u.removeEvent(o, "touchmove", this),
                u.removeEvent(o, u.prefixPointerEvent("pointermove"), this),
                u.removeEvent(o, "mousemove", this),
                u.removeEvent(o, "touchend", this),
                u.removeEvent(o, u.prefixPointerEvent("pointerup"), this),
                u.removeEvent(o, "mouseup", this)),
                this.options.defaultScrollbars && this.wrapper.parentNode && this.wrapper.parentNode.removeChild(this.wrapper)
            },
            _start: function(n) {
                var t = n.touches ? n.touches[0] : n;
                n.preventDefault(),
                n.stopPropagation(),
                this.transitionTime(),
                this.initiated = !0,
                this.moved = !1,
                this.lastPointX = t.pageX,
                this.lastPointY = t.pageY,
                this.startTime = u.getTime(),
                this.options.disableTouch || u.addEvent(o, "touchmove", this),
                this.options.disablePointer || u.addEvent(o, u.prefixPointerEvent("pointermove"), this),
                this.options.disableMouse || u.addEvent(o, "mousemove", this),
                this.scroller._execEvent("beforeScrollStart")
            },
            _move: function(n) {
                var t, e, c, i, o = n.touches ? n.touches[0] : n, s = u.getTime();
                this.moved || this.scroller._execEvent("scrollStart"),
                this.moved = !0,
                t = o.pageX - this.lastPointX,
                this.lastPointX = o.pageX,
                e = o.pageY - this.lastPointY,
                this.lastPointY = o.pageY,
                c = this.x + t,
                i = this.y + e,
                this._pos(c, i),
                1 == this.scroller.options.probeType && s - this.startTime > 300 ? (this.startTime = s,
                this.scroller._execEvent("scroll")) : this.scroller.options.probeType > 1 && this.scroller._execEvent("scroll"),
                n.preventDefault(),
                n.stopPropagation()
            },
            _end: function(n) {
                if (this.initiated) {
                    if (this.initiated = !1,
                    n.preventDefault(),
                    n.stopPropagation(),
                    u.removeEvent(o, "touchmove", this),
                    u.removeEvent(o, u.prefixPointerEvent("pointermove"), this),
                    u.removeEvent(o, "mousemove", this),
                    this.scroller.options.snap) {
                        var t = this.scroller._nearestSnap(this.scroller.x, this.scroller.y)
                          , e = this.options.snapSpeed || a.max(a.max(a.min(a.abs(this.scroller.x - t.x), 1e3), a.min(a.abs(this.scroller.y - t.y), 1e3)), 300);
                        this.scroller.x == t.x && this.scroller.y == t.y || (this.scroller.directionX = 0,
                        this.scroller.directionY = 0,
                        this.scroller.currentPage = t,
                        this.scroller.scrollTo(t.x, t.y, e, this.scroller.options.bounceEasing))
                    }
                    this.moved && this.scroller._execEvent("scrollEnd")
                }
            },
            transitionTime: function(n) {
                n = n || 0;
                var t = u.style.transitionDuration;
                if (t && (this.indicatorStyle[t] = n + "ms",
                !n && u.isBadAndroid)) {
                    this.indicatorStyle[t] = "0.0001ms";
                    var e = this;
                    h(function() {
                        "0.0001ms" === e.indicatorStyle[t] && (e.indicatorStyle[t] = "0s")
                    })
                }
            },
            transitionTimingFunction: function(n) {
                this.indicatorStyle[u.style.transitionTimingFunction] = n
            },
            refresh: function() {
                this.transitionTime(),
                this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none",
                this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (u.addClass(this.wrapper, "iScrollBothScrollbars"),
                u.removeClass(this.wrapper, "iScrollLoneScrollbar"),
                this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (u.removeClass(this.wrapper, "iScrollBothScrollbars"),
                u.addClass(this.wrapper, "iScrollLoneScrollbar"),
                this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")),
                u.getRect(this.wrapper),
                this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth,
                this.options.resize ? (this.indicatorWidth = a.max(a.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8),
                this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth,
                this.maxPosX = this.wrapperWidth - this.indicatorWidth,
                "clip" == this.options.shrink ? (this.minBoundaryX = 8 - this.indicatorWidth,
                this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0,
                this.maxBoundaryX = this.maxPosX),
                this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX),
                this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight,
                this.options.resize ? (this.indicatorHeight = a.max(a.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8),
                this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight,
                this.maxPosY = this.wrapperHeight - this.indicatorHeight,
                "clip" == this.options.shrink ? (this.minBoundaryY = 8 - this.indicatorHeight,
                this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0,
                this.maxBoundaryY = this.maxPosY),
                this.maxPosY = this.wrapperHeight - this.indicatorHeight,
                this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY),
                this.updatePosition()
            },
            updatePosition: function() {
                var n = this.options.listenX && a.round(this.sizeRatioX * this.scroller.x) || 0
                  , t = this.options.listenY && a.round(this.sizeRatioY * this.scroller.y) || 0;
                this.options.ignoreBoundaries || (n < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = a.max(this.indicatorWidth + n, 8),
                this.indicatorStyle.width = this.width + "px"),
                n = this.minBoundaryX) : n > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = a.max(this.indicatorWidth - (n - this.maxPosX), 8),
                this.indicatorStyle.width = this.width + "px",
                n = this.maxPosX + this.indicatorWidth - this.width) : n = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth,
                this.indicatorStyle.width = this.width + "px"),
                t < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = a.max(this.indicatorHeight + 3 * t, 8),
                this.indicatorStyle.height = this.height + "px"),
                t = this.minBoundaryY) : t > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = a.max(this.indicatorHeight - 3 * (t - this.maxPosY), 8),
                this.indicatorStyle.height = this.height + "px",
                t = this.maxPosY + this.indicatorHeight - this.height) : t = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight,
                this.indicatorStyle.height = this.height + "px")),
                this.x = n,
                this.y = t,
                this.scroller.options.useTransform ? this.indicatorStyle[u.style.transform] = "translate(" + n + "px," + t + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = n + "px",
                this.indicatorStyle.top = t + "px")
            },
            _pos: function(n, t) {
                n < 0 ? n = 0 : n > this.maxPosX && (n = this.maxPosX),
                t < 0 ? t = 0 : t > this.maxPosY && (t = this.maxPosY),
                n = this.options.listenX ? a.round(n / this.sizeRatioX) : this.scroller.x,
                t = this.options.listenY ? a.round(t / this.sizeRatioY) : this.scroller.y,
                this.scroller.scrollTo(n, t)
            },
            fade: function(n, t) {
                if (!t || this.visible) {
                    clearTimeout(this.fadeTimeout),
                    this.fadeTimeout = null;
                    var e = n ? 250 : 500
                      , c = n ? 0 : 300;
                    n = n ? "1" : "0",
                    this.wrapperStyle[u.style.transitionDuration] = e + "ms",
                    this.fadeTimeout = setTimeout(function(n) {
                        this.wrapperStyle.opacity = n,
                        this.visible = +n
                    }
                    .bind(this, n), c)
                }
            }
        },
        r.utils = u,
        void 0 !== n && n.exports ? n.exports = r : void 0 !== (c = function() {
            return r
        }
        .call(t, e, t, n)) && (n.exports = c)
    }(window, document, Math)
}
, , function(n, t, e) {
    "use strict";
    function c(n, t) {
        if (!(n instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.QCloud = t.getCosSign = void 0;
    var i = function() {
        function n(n, t) {
            for (var e = 0; e < t.length; e++) {
                var c = t[e];
                c.enumerable = c.enumerable || !1,
                c.configurable = !0,
                "value"in c && (c.writable = !0),
                Object.defineProperty(n, c.key, c)
            }
        }
        return function(t, e, c) {
            return e && n(t.prototype, e),
            c && n(t, c),
            t
        }
    }()
      , o = e(0)
      , s = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(o)
      , a = t.getCosSign = function(n, t) {
        return s.default.post("/cos/getCosSign.do", {
            type: n,
            suffixs: t
        })
    }
    ;
    t.QCloud = function() {
        function n(t) {
            c(this, n),
            this.signConfig = {},
            this.cos = {},
            this.isAvatar = t
        }
        return i(n, [{
            key: "savePhotos",
            value: function(n, t) {
                return s.default.post("/photo/saveMultiPhoto.do", {
                    isAvatar: n,
                    fileNames: t
                })
            }
        }, {
            key: "getQCloudConfig",
            value: function(n) {
                var t = this
                  , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return new Promise(function(c, i) {
                    a(e, n).then(function(n) {
                        var e = n.isError
                          , o = n.data
                          , s = n.errorMessage;
                        try {
                            if (e)
                                Z.tips(s),
                                c(!1);
                            else {
                                var a = o.appID
                                  , r = o.bucket
                                  , l = (o.directory,
                                o.nameList,
                                o.region)
                                  , d = o.sign
                                  , h = o.singleSign;
                                t.signConfig = o,
                                t.cos = new CosCloud({
                                    appid: a,
                                    bucket: r,
                                    region: l,
                                    getAppSign: function(n) {
                                        n(d)
                                    },
                                    getAppSignOnce: function(n) {
                                        n(h)
                                    }
                                }),
                                c(n)
                            }
                        } catch (n) {
                            i(n)
                        }
                    })
                }
                )
            }
        }, {
            key: "uploadFile",
            value: function(n, t) {
                var e = this
                  , c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                return new Promise(function(i, o) {
                    var s = function(n) {}
                      , a = function(n) {
                        var t = n.data.url;
                        if (t.trim()) {
                            var c = t.split("/").slice(-1)
                              , o = e.signConfig
                              , s = (o.bucket,
                            o.directory)
                              , a = o.nameList;
                            e.savePhotos(e.isAvatar, c).then(function(n) {
                                if (n.isError)
                                    return void i(n);
                                i({
                                    isError: !1,
                                    data: {
                                        directory: s,
                                        nameList: a
                                    }
                                })
                            })
                        }
                    }
                      , r = function(n) {
                        i({
                            isError: !0,
                            errorMessage: n
                        })
                    };
                    try {
                        e.getQCloudConfig(t, c).then(function(t) {
                            var c = e.signConfig
                              , i = c.bucket
                              , l = c.directory
                              , d = c.nameList;
                            d && d.length > 0 ? d.forEach(function(t) {
                                var c = l + t;
                                e.cos.uploadFile(a, r, s, i, c, n, 0)
                            }) : o({
                                isError: !0,
                                errorMessage: "上传文件列表为空"
                            })
                        })
                    } catch (n) {
                        i({
                            isError: !0,
                            errorMessage: n
                        })
                    }
                }
                )
            }
        }]),
        n
    }()
}
, function(n, t, e) {
    "use strict";
    function c(n, t) {
        n.slice ? n = n.slice(0, 131072) : n.webkitSlice && (n = n.webkitSlice(0, 131072));
        var e = new FileReader;
        e.onload = function(n) {
            var e = new DataView(n.target.result);
            if (65496 != e.getUint16(0, !1))
                return void t(-2);
            for (var c = e.byteLength, i = 2; i < c; ) {
                var o = e.getUint16(i, !1);
                if (i += 2,
                65505 == o) {
                    if (1165519206 != e.getUint32(i += 2, !1))
                        return void t(-1);
                    var s = 18761 == e.getUint16(i += 6, !1);
                    i += e.getUint32(i + 4, s);
                    var a = e.getUint16(i, s);
                    i += 2;
                    for (var r = 0; r < a; r++)
                        if (274 == e.getUint16(i + 12 * r, s))
                            return void t(e.getUint16(i + 12 * r + 8, s))
                } else {
                    if (65280 != (65280 & o))
                        break;
                    i += e.getUint16(i, !1)
                }
            }
            t(-1)
        }
        ,
        e.readAsArrayBuffer(n)
    }
    function i(n, t, e, c) {
        var i = document.createElement("canvas");
        c > 4 ? (i.width = e,
        i.height = t) : (i.width = t,
        i.height = e);
        var o = i.getContext("2d");
        switch (c) {
        case 2:
            o.transform(-1, 0, 0, 1, t, 0);
            break;
        case 3:
            o.transform(-1, 0, 0, -1, t, e);
            break;
        case 4:
            o.transform(1, 0, 0, -1, 0, e);
            break;
        case 5:
            o.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            o.transform(0, 1, -1, 0, e, 0);
            break;
        case 7:
            o.transform(0, -1, -1, 0, e, t);
            break;
        case 8:
            o.transform(0, -1, 1, 0, 0, t)
        }
        return o.drawImage(n, 0, 0, t, e),
        i
    }
    function o(n, t, e, o, s, a) {
        var r = new Image;
        r.onerror = function() {
            URL.revokeObjectURL(this.src),
            a(n)
        }
        ,
        r.onload = function() {
            URL.revokeObjectURL(this.src),
            c(n, function(n) {
                var t = r.width
                  , c = r.height
                  , l = n > 4 ? Math.min(o / t, e / c, 1) : Math.min(e / t, o / c, 1);
                c = Math.round(c * l),
                t = Math.round(t * l),
                i(r, t, c, n).toBlob(function(n) {
                    a(n)
                }, "image/jpeg", s)
            })
        }
        ,
        r.src = URL.createObjectURL(n)
    }
    function s(n, t) {
        var e = new FileReader;
        e.onload = function(n) {
            t(n.target.result)
        }
        ,
        e.readAsDataURL(n)
    }
    function a(n, t) {
        return n.lastModifiedDate = new Date,
        n.name = t,
        n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.reduceFileSize = o,
    t.blobToDataURL = s,
    t.blobToFile = a,
    t.default = function() {
        HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function(n, t, e) {
                for (var c = atob(this.toDataURL(t, e).split(",")[1]), i = c.length, o = new Uint8Array(i), s = 0; s < i; s++)
                    o[s] = c.charCodeAt(s);
                n(new Blob([o],{
                    type: t || "image/png"
                }))
            }
        }),
        window.URL = window.URL || window.webkitURL
    }()
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = e(40)
      , i = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(c);
    t.default = function() {
        return $(document.body).append((0,
        i.default)()),
        {
            hide: function() {
                $(".popup_load").remove()
            }
        }
    }
}
, function(n, t, e) {
    e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = "";
        return t += '<div class="popup_load">\n    <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n        <g id="circle" class="g-circles g-circles--v1">\n            <circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10"></circle>\n            <circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10"></circle>\n            <circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10"></circle>\n            <circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10"></circle>\n            <circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10"></circle>\n            <circle id="7" cx="60" cy="110" r="10"></circle>\n            <circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10"></circle>\n            <circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10"></circle>\n            <circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10"></circle>\n            <circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10"></circle>\n            <circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10"></circle>\n            <circle id="1" cx="60" cy="10" r="10"></circle>\n        </g>\n        <use xlink:href="#circle" class="use"></use>\n    </svg>\n</div>'
    }
}
, function(n, t) {}
, function(n, t, e) {
    "use strict";
    !function() {
        if (!window.syscode) {
            var n = window.syscode = {};
            n.buxian = "-1,不限",
            n.qingxuanze = "-1,请选择",
            n.qingxuanze2 = "0,请选择",
            n.lv = ["1,LV1", "2,LV2", "3,LV3", "4,LV4", "5,LV5", "6,LV6", "7,LV7"],
            n.expectlovedate = ["1,1个月内", "2,3个月内", "3,半年内", "4,一年及一年以上"],
            n.viewtype = ["3,相册模式", "2,资料模式"],
            n.orderby = ["hpf,原始顺序", "createtime,最新注册", "age,年龄顺序"],
            n.searchheight = ["1,155cm以下", "2,155cm-160cm", "3,160cm-165cm", "4,165cm-170cm", "5,170cm-175cm", "6,175cm-180cm", "20,180cm以上"],
            n.searchweight = ["1,40kg以下", "2,40kg－45kg", "3,45kg－50kg", "4,50kg－55kg", "5,55kg－60kg", "6,60kg－65kg", "7,65kg－70kg", "8,70kg－80kg", "9,80kg以上"],
            n.years = ["1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921"],
            n.years2 = ["1967,1967年", "1966,1966年", "1965,1965年", "1964,1964年", "1963,1963年", "1962,1962年", "1961,1961年", "1960,1960年", "1959,1959年", "1958,1958年", "1957,1957年", "1956,1956年", "1955,1955年", "1954,1954年", "1953,1953年", "1952,1952年", "1951,1951年", "1950,1950年", "1949,1949年", "1948,1948年", "1947,1947年", "1946,1946年", "1945,1945年", "1944,1944年", "1943,1943年", "1942,1942年", "1941,1941年", "1940,1940年", "1939,1939年", "1938,1938年", "1937,1937年", "1936,1936年", "1935,1935年", "1934,1934年", "1933,1933年", "1932,1932年", "1931,1931年", "1930,1930年", "1929,1929年", "1928,1928年", "1927,1927年", "1926,1926年"],
            n.months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            n.days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
            n.warnreason = ["1,虚假照片", "2,虚假信息", "3,发送骚扰邮件", "4,线下言行不检", "99,其它原因"],
            n.marriage = ["1,未婚", "3,离异", "4,丧偶"],
            n.education = ["3,高中及以下", "2,中专", "4,大专", "5,大学本科", "6,硕士", "7,博士"],
            n.membertype = ["1,普通会员", "2,珍爱通会员"],
            n.starage = ["18-24,18-24", "25-29,25-29", "30-34,30-34", "35-39,35-39", "40-44,40-44", "45-49,45-49", "50-54,50-54", "55-59,55-59", "60-64,60-64", "65-69,65-69", "70-74,70-74", "75-79,75-79", "80-84,80-84", "85-89,85-89", "90-94,90-94", "95-99,95-99"],
            n.sex = ["0,男士", "1,女士"],
            n.drinking = ["0,都可以", "1,在意"],
            n.smoking = ["0,都可以", "1,在意"],
            n.isDrinking = ["1,不喝酒", "2,稍微喝一点酒", "4,社交场合会喝酒", "3,酒喝得很多"],
            n.taIsDrinking = ["0,可以喝酒", "1,不要喝酒"],
            n.isSmoking = ["1,不吸烟", "2,稍微抽一点烟", "5,社交场合会抽烟", "3,烟抽得很多"],
            n.taIsSmoking = ["0,可以吸烟", "1,不要吸烟"],
            n.salary = ["3,3000元以下", "4,3001-5000元", "5,5001-8000元", "6,8001-12000元", "7,12001-20000元", "8,20001-50000元", "9,50000元以上"],
            n.salary2 = ["103,3000元", "104,5000元", "105,8000元", "106,12000元", "107,20000元", "108,50000元"],
            n.bloodtype = ["1,A型", "2,B型", "3,AB型", "4,O型", "5,不确定"],
            n.stock = ["1,汉族", "2,藏族", "3,朝鲜族", "4,蒙古族", "5,回族", "6,满族", "7,维吾尔族", "8,壮族", "9,彝族", "10,苗族", "11,侗族", "12,瑶族", "13,白族", "14,布依族", "15,傣族", "16,京族", "17,黎族", "18,羌族", "19,怒族", "20,佤族", "21,水族", "22,畲族", "23,土族", "24,阿昌族", "25,哈尼族", "26,高山族", "27,景颇族", "28,珞巴族", "29,锡伯族", "30,德昂(崩龙)族", "31,保安族", "32,基诺族", "33,门巴族", "34,毛南族", "35,赫哲族", "36,裕固族", "37,撒拉族", "38,独龙族", "39,普米族", "40,仫佬族", "41,仡佬族", "42,东乡族", "43,拉祜族", "44,土家族", "45,纳西族", "46,傈僳族", "47,布朗族", "48,哈萨克族", "49,达斡尔族", "50,鄂伦春族", "51,鄂温克族", "52,俄罗斯族", "53,塔塔尔族", "54,塔吉克族", "55,柯尔克孜族", "56,乌兹别克族"],
            n.belief = ["2,不信教", "5,佛教", "12,道教", "8,伊斯兰教", "11,基督教", "6,天主教", "3,儒家门徒", "1,不可知论者", "13,其他宗教"],
            n.taBelief = ["2,不信教", "5,佛教", "12,道教", "8,伊斯兰教", "11,基督教", "6,天主教", "3,儒家门徒", "1,不可知论者", "13,其他宗教"],
            n.animals = ["0,不限", "1,鼠", "2,牛", "3,虎", "4,兔", "5,龙", "6,蛇", "7,马", "8,羊", "9,猴", "10,鸡", "11,狗", "12,猪"],
            n.constellation = ["1,白羊座(03.21-04.20)", "2,金牛座(04.21-05.20)", "3,双子座(05.21-06.21)", "4,巨蟹座(06.22-07.22)", "5,狮子座(07.23-08.22)", "6,处女座(08.23-09.22)", "7,天秤座(09.23-10.22)", "8,天蝎座(10.23-11.21)", "9,射手座(11.22-12.21)", "10,魔羯座(12.22-01.19)", "11,水瓶座(01.20-02.19)", "12,双鱼座(02.20-03.20)"],
            n.occupation = ["100,销售", "200,客户服务", "300,计算机/互联网", "400,通信/电子", "500,生产/制造", "600,物流/仓储", "700,商贸/采购", "800,人事/行政", "900,高级管理", "1000,广告/市场", "1100,传媒/艺术", "1200,生物/制药", "1300,医疗/护理", "1400,金融/银行/保险", "1500,建筑/房地产", "1600,咨询/顾问", "1700,法律", "1800,财会/审计", "1900,教育/科研", "2000,服务业", "2100,交通运输", "2200,政府机构", "2300,军人/警察", "2400,农林牧渔", "2500,自由职业", "2600,在校学生", "2700,待业", "2800,其他行业"],
            n.occupationbt = ["100,销售", "200,客户服务", "300,计算机", "400,通信/电子", "500,生产/制造", "600,物流/仓储", "700,商贸/采购", "800,人事/行政", "900,高级管理", "1000,广告/市场", "1100,传媒/艺术", "1200,生物/制药", "1300,医疗/护理", "1400,金融/保险", "1500,建筑/地产", "1600,咨询/顾问", "1700,法律", "1800,财会/审计", "1900,教育/科研", "2000,服务业", "2100,交通运输", "2200,政府机构", "2300,军人/警察", "2400,农林牧渔", "2500,自由职业", "2600,在校学生", "2700,待业", "2800,其他行业"],
            n.occupation["100o"] = ["101,销售总监", "102,销售经理", "103,销售主管", "104,销售专员", "105,渠道/分销管理", "106,渠道/分销专员", "107,经销商", "108,客户经理", "109,客户代表", "110,其他"],
            n.occupation["200o"] = ["201,客服经理", "202,客服主管", "203,客服专员", "204,客服协调", "205,客服技术支持", "206,其他"],
            n.occupation["300o"] = ["301,IT技术总监", "302,IT技术经理", "303,IT工程师", "304,系统管理员", "305,测试专员", "306,运营管理", "307,网页设计", "308,网站编辑", "309,网站产品经理", "310,其他"],
            n.occupation["400o"] = ["401,通信技术", "402,电子技术", "403,其他"],
            n.occupation["500o"] = ["501,工厂经理", "502,工程师", "503,项目主管", "504,营运经理", "505,营运主管", "506,车间主任", "507,物料管理", "508,生产领班", "509,操作工人", "510,安全管理", "511,其他"],
            n.occupation["600o"] = ["601,物流经理", "602,物流主管", "603,物流专员", "604,仓库经理", "605,仓库管理员", "606,货运代理", "607,集装箱业务", "608,海关事物管理", "609,报单员", "610,快递员", "611,其他"],
            n.occupation["700o"] = ["701,商务经理", "702,商务专员", "703,采购经理", "704,采购专员", "705,外贸经理", "706,外贸专员", "707,业务跟单", "708,报关员", "709,其他"],
            n.occupation["800o"] = ["801,人事总监", "802,人事经理", "803,人事主管", "804,人事专员", "805,招聘经理", "806,招聘专员", "807,培训经理", "808,培训专员", "809,秘书", "810,文员", "811,后勤", "812,其他"],
            n.occupation["900o"] = ["901,总经理", "902,副总经理", "903,合伙人", "904,总监", "905,经理", "906,总裁助理", "907,其他"],
            n.occupation["1000o"] = ["1001,广告客户经理", "1002,广告客户专员", "1003,广告设计经理", "1004,广告设计专员", "1005,广告策划", "1006,市场营销经理", "1007,市场营销专员", "1008,市场策划", "1009,市场调研与分析", "1010,市场拓展", "1011,公关经理", "1012,公关专员", "1013,媒介经理", "1014,媒介专员", "1015,品牌经理", "1016,品牌专员", "1017,其他"],
            n.occupation["1100o"] = ["1101,主编", "1102,编辑", "1103,作家", "1104,撰稿人", "1105,文案策划", "1106,出版发行", "1107,导演", "1108,记者", "1109,主持人", "1110,演员", "1111,模特", "1112,经纪人", "1113,摄影师", "1114,影视后期制作", "1115,设计师", "1116,画家", "1117,音乐家", "1118,舞蹈", "1119,其他"],
            n.occupation["1200o"] = ["1201,生物工程", "1202,药品生产", "1203,临床研究", "1204,医疗器械", "1205,医药代表", "1206,化工工程师", "1207,其他"],
            n.occupation["1300o"] = ["1301,医疗管理", "1302,医生", "1303,心理医生", "1304,药剂师", "1305,护士", "1306,兽医", "1307,其他"],
            n.occupation["1400o"] = ["1401,投资", "1402,保险", "1403,金融", "1404,银行", "1405,证券", "1406,其他"],
            n.occupation["1500o"] = ["1501,建筑师", "1502,工程师", "1503,规划师", "1504,景观设计", "1505,房地产策划", "1506,房地产交易", "1507,物业管理", "1508,其他"],
            n.occupation["1600o"] = ["1601,专业顾问", "1602,咨询经理", "1603,咨询师", "1604,培训师", "1605,其他"],
            n.occupation["1700o"] = ["1701,律师", "1702,律师助理", "1703,法务经理", "1704,法务专员", "1705,知识产权专员", "1706,其他"],
            n.occupation["1800o"] = ["1801,财务总监", "1802,财务经理", "1803,财务主管", "1804,会计", "1805,注册会计师", "1806,审计师", "1807,税务经理", "1808,税务专员", "1809,成本经理", "1810,其他"],
            n.occupation["1900o"] = ["1901,教授", "1902,讲师/助教", "1903,中学教师", "1904,小学教师", "1905,幼师", "1906,教务管理人员", "1907,职业技术教师", "1908,培训师", "1909,科研管理人员", "1910,科研人员", "1911,其他"],
            n.occupation["2000o"] = ["2001,餐饮管理", "2002,厨师", "2003,餐厅服务员", "2004,酒店管理", "2005,大堂经理", "2006,酒店服务员", "2007,导游", "2008,美容师", "2009,健身教练", "2010,商场经理", "2011,零售店店长", "2012,店员", "2013,保安经理", "2014,保安人员", "2015,家政服务", "2016,其他"],
            n.occupation["2100o"] = ["2101,飞行员", "2102,空乘人员", "2103,地勤人员", "2104,列车司机", "2105,乘务员", "2106,船长", "2107,船员", "2108,司机", "2109,其他"],
            n.occupation["2200o"] = ["2201,公务员", "2202,其他"],
            n.occupation["2300o"] = ["2301,其他"],
            n.occupation["2400o"] = ["2401,其他"],
            n.occupation["2500o"] = ["2501,其他"],
            n.occupation["2600o"] = ["2601,其他"],
            n.occupation["2700o"] = ["2701,其他"],
            n.occupation["2800o"] = ["2801,其他"],
            n.corptype = ["1,政府机关", "2,事业单位", "4,外资企业", "10,合资企业", "6,国营企业", "7,私营企业", "8,自有公司", "9,其他"],
            n.house = ["1,和家人同住", "2,已购房", "3,租房", "4,打算婚后购房", "6,住在单位宿舍"],
            n.taHouse = ["1,和家人同住", "2,已购房", "3,租房", "4,打算婚后购房", "6,单位宿舍"],
            n.houseBuyWay = ["1,全款", "2,贷款"],
            n.buyHouseRepay = ["1,2000以下", "2,2000-4000", "3,4000-6000", "4,6000-8000", "5,8000以上"],
            n.buyCarRepay = ["1,2000以下", "2,2000-4000", "3,4000-6000", "4,6000-8000", "5,8000以上"],
            n.vehicle = ["1,已买车", "2,未买车"],
            n.taVehicle = ["1,已买车", "2,未买车"],
            n.vehicleBuyWay = ["1,全款", "2,贷款"],
            n.children = ["1,没有", "3,有，我们住在一起", "4,有，我们偶尔一起住", "5,有，但不在身边"],
            n.taChildren = ["1,没有", "3,有孩子且住在一起", "4,有孩子且偶尔会一起住", "5,有孩子但不在身边"],
            n.wantChildren = ["2,想要孩子", "3,不想要孩子", "1,视情况而定", "4,以后再告诉你"],
            n.taWantChildren = ["2,希望对方要孩子", "3,希望对方不要孩子", "1,视情况而定", "4,以后再告诉你"],
            n.family = ["1,独生子女", "2,2", "3,3", "4,4", "5,5", "6,6", "7,7", "8,8"],
            n.age = ["18,18", "19,19", "20,20", "21,21", "22,22", "23,23", "24,24", "25,25", "26,26", "27,27", "28,28", "29,29", "30,30", "31,31", "32,32", "33,33", "34,34", "35,35", "36,36", "37,37", "38,38", "39,39", "40,40", "41,41", "42,42", "43,43", "44,44", "45,45", "46,46", "47,47", "48,48", "49,49", "50,50", "51,51", "52,52", "53,53", "54,54", "55,55", "56,56", "57,57", "58,58", "59,59", "60,60", "61,61", "62,62", "63,63", "64,64", "65,65", "66,66", "67,67", "68,68", "69,69", "70,70", "71,71", "72,72", "73,73", "74,74", "75,75", "76,76", "77,77", "78,78", "79,79", "80,80", "81,81", "82,82", "83,83", "84,84", "85,85", "86,86", "87,87", "88,88", "89,89", "90,90", "91,91", "92,92", "93,93", "94,94", "95,95", "96,96", "97,97", "98,98", "99,99"],
            n.height = ["129,129", "130,130", "131,131", "132,132", "133,133", "134,134", "135,135", "136,136", "137,137", "138,138", "139,139", "140,140", "141,141", "142,142", "143,143", "144,144", "145,145", "146,146", "147,147", "148,148", "149,149", "150,150", "151,151", "152,152", "153,153", "154,154", "155,155", "156,156", "157,157", "158,158", "159,159", "160,160", "161,161", "162,162", "163,163", "164,164", "165,165", "166,166", "167,167", "168,168", "169,169", "170,170", "171,171", "172,172", "173,173", "174,174", "175,175", "176,176", "177,177", "178,178", "179,179", "180,180", "181,181", "182,182", "183,183", "184,184", "185,185", "186,186", "187,187", "188,188", "189,189", "190,190", "191,191", "192,192", "193,193", "194,194", "195,195", "196,196", "197,197", "198,198", "199,199", "200,200", "201,201", "202,202", "203,203", "204,204", "205,205", "206,206", "207,207", "208,208", "209,209", "210,210", "211,211"],
            n.weight = ["29,30以下", "30,30", "31,31", "32,32", "33,33", "34,34", "35,35", "36,36", "37,37", "38,38", "39,39", "40,40", "41,41", "42,42", "43,43", "44,44", "45,45", "46,46", "47,47", "48,48", "49,49", "50,50", "51,51", "52,52", "53,53", "54,54", "55,55", "56,56", "57,57", "58,58", "59,59", "60,60", "61,61", "62,62", "63,63", "64,64", "65,65", "66,66", "67,67", "68,68", "69,69", "70,70", "71,71", "72,72", "73,73", "74,74", "75,75", "76,76", "77,77", "78,78", "79,79", "80,80", "81,81", "82,82", "83,83", "84,84", "85,85", "86,86", "87,87", "88,88", "89,89", "90,90", "91,91", "92,92", "93,93", "94,94", "95,95", "96,96", "97,97", "98,98", "99,99", "100,100", "101,101", "102,102", "103,103", "104,104", "105,105", "106,106", "107,107", "108,108", "109,109", "110,110", "111,111", "112,112", "113,113", "114,114", "115,115", "116,116", "117,117", "118,118", "119,119", "120,120", "121,121", "122,122", "123,123", "124,124", "125,125", "126,126", "127,127", "128,128", "129,129", "130,130", "131,130以上"],
            n.body0 = ["1,一般", "2,瘦长", "3,运动员型", "4,比较胖", "5,体格魁梧", "10,壮实", "0,保密"],
            n.taBody0 = ["0,保密", "1,一般", "2,瘦长", "3,运动员型", "4,比较胖", "5,体格魁梧", "10,壮实"],
            n.body1 = ["1,一般", "2,瘦长", "6,苗条", "7,高大美丽", "8,丰满", "9,富线条美", "0,保密"],
            n.taBody1 = ["0,保密", "1,一般", "2,瘦长", "6,苗条", "7,高大美丽", "8,丰满", "9,富线条美"],
            n.fondactions = ["1,电脑/网络", "2,电子游戏", "4,与朋友喝酒", "5,品茗", "6,看电影/电视", "7,听音乐", "8,乐器演奏", "9,烹调", "10,摄影", "11,下棋/打牌", "12,观光旅游", "13,逛街购物", "14,阅读", "15,写作", "16,舞会/卡拉OK", "18,各种收集活动", "19,理财/投资", "22,文艺表演", "23,聊天", "24,家务/手工艺", "25,书法/绘画", "27,其他"],
            n.fondsports = ["1,足球", "2,排球", "3,篮球", "4,骑单车/摩托车", "5,乒乓球", "6,保龄球", "7,健身/跑步", "8,钓鱼", "9,游泳/冲浪/潜水", "10,网球", "11,羽毛球", "12,高尔夫", "13,滑冰/滑雪", "14,其他"],
            n.fondmusics = ["1,中文流行音乐", "2,轻音乐", "3,民族音乐", "4,老歌", "5,舞曲", "6,歌剧", "7,西部乡村", "8,英文流行音乐", "9,交响乐", "10,地方戏曲", "11,摇滚", "12,另类", "13,灵歌", "14,爵士/蓝调", "15,其他"],
            n.fondprograms = ["1,故事片", "2,文艺爱情", "3,科幻", "4,动作武侠", "5,侦探推理", "6,实验电影", "7,老电影", "8,限制级电影", "9,儿童/卡通片", "10,纪录片", "11,西部电影", "12,恐怖", "13,得奖电影", "14,艺术电影", "15,音乐歌舞", "16,肥皂剧", "17,喜剧", "18,其他", "19,什么都看"],
            n.fondfoods = ["1,川菜", "2,江浙菜", "3,湘菜", "4,火锅", "5,烧烤", "6,家常菜", "7,路边摊", "8,健康食品", "9,零食", "10,粤菜", "11,北方菜", "12,面食", "13,素食", "14,甜食", "15,自助餐", "16,减肥餐", "17,能填饱肚子就好", "18,其他"],
            n.fondplaces = ["1,都市", "2,村庄", "3,小镇", "4,山区", "5,办公室/学校", "6,游乐场", "7,购物中心", "8,我家/我的房间", "9,海滨", "10,岛屿", "11,沙漠", "12,雪野", "13,图书馆/书店", "14,展览馆", "15,宗教圣地", "16,古迹", "17,森林", "18,公园", "19,咖啡厅/酒吧", "20,动物园", "21,夜市赶集", "22,各种俱乐部", "23,其他"],
            n.tonguegifts = ["1,汉语普通话", "2,粤语", "3,汉语其他方言", "4,少数民族语言", "5,英语", "6,其他国语言"],
            n.consumption = ["1,美食", "2,服饰", "3,化妆", "4,健身", "5,娱乐", "6,旅行", "7,社交", "8,文化", "9,自我提升", "10,其他"],
            n.deposit = ["1,3万以下", "2,3-10万", "3,10-50万", "4,50万以上", "5,保密"],
            n.cuisine = ["1,色香味俱全", "2,能做几样可口的小菜", "3,有待提高"],
            n.housework = ["1,愿承担大部分家务", "2,希望对方承担大部分家务", "3,看各自忙闲，协商分担家务"],
            n.liveWithParentsInLaw = ["1,愿意", "2,不愿意", "3,视具体情况而定"],
            n.liveWithParents = ["1,与自己父母同住", "2,不与自己父母同住", "3,尊重伴侣意见", "4,视具体情况而定"],
            n.parents = ["1,父母均健在", "2,只有母亲健在", "3,只有父亲健在", "4,父母均已离世"],
            n.parentIncomeState = ["1,已退休，无经济压力", "2,无经济来源需要赡养"],
            n.siblingsCount = ["1,独生子女", "2,2", "3,3", "4,4", "5,5", "6,6", "7,7", "8,8", "9,更多"],
            n.siblingsIncomeState = ["1,需要经济支持", "2,无经济压力"],
            n.fonddate = ["1,餐厅", "2,茶楼", "3,咖啡厅", "4,酒吧", "5,看电影", "6,看演出", "7,看展览", "8,逛街", "9,公园散步", "10,郊游", "11,户外运动", "12,其它"],
            n.marryDate = ["1,认同闪婚", "2,一年内", "3,两年内", "4,三年内", "5,时机成熟就结婚"],
            n.keepPets = ["1,没有，不愿意养", "2,没有，愿意养", "3,有"],
            n.pets = ["1,狗", "2,猫", "3,鱼", "4,兔", "5,鸟", "6,乌龟", "7,蜥蜴", "8,鼠", "9,蛇", "10,另类宠物"],
            n.workBusyLevel = ["1,有双休", "2,工作忙碌", "3,工作清闲", "4,自由工作时间", "5,经常出差"],
            n.marriageHistory = ["1,未谈过恋爱", "2,谈过3次以内恋爱", "3,恋爱次数很多"],
            n.breakUpReason = ["1,性格不合", "2,对方没有上进心", "3,其它"],
            n.longestLoveTime = ["1,1年内", "2,2年", "3,3年", "4,3年以上"],
            n.singleReason = ["1,生活圈子小 周围没找到合适的", "2,上一段感情受伤", "3,其它"],
            n.marriageSeekingReason = ["1,年龄到了，岁月不等人", "2,家人的期望，父母操心", "3,生育的问题要及早考虑", "4,身边的朋友差不多都结婚了", "5,其他"],
            n.isNeedBetrothalGifts = ["1,根据习俗象征性的要点", "2,必须要彩礼", "3,不需要", "4,协商"],
            n.isVirginComplexForMale = ["1,对方必须是处女（处男）", "2,不在意"],
            n.isVirginComplexForMale = ["1,对方必须是处女", "2,不在意"],
            n.isVirginComplexForFemale = ["1,对方必须是处男", "2,不在意"],
            n.isChineseZodiacTaboo = ["1,不想找属xx的", "2,没有"],
            n.loveDetail = ["1,0次", "2,1次", "3,2~3次", "4,3次以上"],
            n.siblingsDetail = ["1,哥哥", "2,姐姐", "3,弟弟", "4,妹妹"],
            n.carPlan = ["1,目前已有购车计划", "2,暂无购车计划"],
            n.havingPhoto = ["1,有"],
            n.addSelectOption = function(t, e, c, i, o) {
                var s = n[t]
                  , a = ""
                  , r = "";
                "weight" == t ? r = "kg" : "height" == t && (r = "cm"),
                "0" == e && c && (c = "qingxuanze2");
                for (var l = 0, d = s.length; l < d; l++) {
                    var h = s[l].split(",");
                    a = e && e == parseInt(h[0]) ? a + "<option value=" + h[0] + " selected='selected'>" + (h[1] + r) + "</option>" : a + "<option value=" + h[0] + ">" + (h[1] + r) + "</option>"
                }
                if (c) {
                    var u = n[c]
                      , p = u.split(",")
                      , f = o ? p[1] + o : p[1];
                    a = "<option value=" + p[0] + ">" + f + "</option>" + a
                }
                document.getElementById(i).innerHTML = a
            }
            ,
            n.addSection = function(t, e, c, i, o, s) {
                var a = n[t]
                  , r = ""
                  , l = n[e]
                  , d = l.split(",");
                a.unshift(l);
                for (var h = [], u = 0, p = a.length; u < p; u++) {
                    var f = a[u].split(",");
                    r += "<li>" + f[1] + (0 != u ? i + ":" : ":") + f[0] + "<ul>",
                    u > 0 && (r += "<li>" + d[1] + ":" + d[0] + "</li>"),
                    o && o == f[0] && h.push(u);
                    for (var m = u; m < p; m++) {
                        var v = a[m].split(",");
                        r += "<li>" + v[1] + (0 != m ? i + ":" : ":") + v[0] + "</li>",
                        o == f[0] && s && s == v[0] && (u > 0 ? h.push(m - u + 1) : h.push(m))
                    }
                    r += "</ul></li>"
                }
                return document.getElementById(c).innerHTML = r,
                h
            }
            ,
            n.addJob = function(t, e, c) {
                var i = document.getElementById(t)
                  , o = ""
                  , s = n.occupation;
                if ("0" != e) {
                    e += "";
                    var a = e ? parseInt(e.substr(0, 1)) : null
                      , r = a ? a * Math.pow(10, e.length - 1) : null
                }
                if (c) {
                    var l = n[c]
                      , d = l.split(",");
                    o = o + "<li>" + d[1] + ":" + d[0] + "<ul><li>" + d[1] + ":" + d[0] + "</li></ul></li>"
                }
                for (var h = [], u = 0, p = s.length; u < p; u++)
                    if (s[u]) {
                        var f = s[u].toString().split(",")
                          , m = f[1];
                        o += "<li>",
                        o += m + ":" + f[0],
                        o += "<ul>";
                        var v = n.occupation[f[0] + "o"];
                        if (r && r == f[0] && (c ? u += 1 : u = u,
                        h.push(u)),
                        v) {
                            c && (o = o + "<li>" + d[1] + ":" + d[0] + "<ul><li>" + d[1] + ":" + d[0] + "</li></ul></li>");
                            for (var g = 0, y = v.length; g < y; g++)
                                if (v[g]) {
                                    var w = v[g].toString().split(",");
                                    o += "<li>" + w[1] + ":" + w[0] + "<ul>",
                                    o += "</ul>",
                                    e && e == w[0] && (c ? g += 1 : g = g,
                                    h.push(g))
                                }
                        }
                        o += "</ul></li>"
                    }
                return i.innerHTML = o,
                "-1" != e && "0" != e || (h = [0, 0]),
                h
            }
            ,
            n.addSalary = function(t, e, c, i, o) {
                var s = document.getElementById(t)
                  , o = document.getElementById(o)
                  , a = ""
                  , r = n.salary2
                  , l = n[e]
                  , d = l.split(",");
                r.unshift(l);
                for (var h = [], u = 0, p = r.length; u < p; u++) {
                    var f = r[u].split(",");
                    a += "<li>" + f[1] + ":" + f[0] + "<ul>",
                    u > 0 && (a += "<li>" + d[1] + ":" + d[0] + "</li>"),
                    c && c == f[0] && h.push(u);
                    for (var m = u + 1; m < p; m++) {
                        var v = r[m].split(",");
                        a += "<li>" + v[1] + ":" + v[0] + "</li>",
                        c == f[0] && i && i == v[0] && h.push(m - u)
                    }
                    a += "</ul></li>"
                }
                if (s.innerHTML = a,
                o) {
                    var g = r[h[0]] && r[h[0]].split(",")[1]
                      , y = r[h[1]] && r[h[1]].split(",")[1];
                    o.innerHTML = c < 0 ? i < 0 ? "不限" : y + "以下" : i < 0 ? g + "以上" : g + "-" + y
                }
                return h
            }
            ,
            n.checkboxHtml = function(n, t, e, c, i) {
                for (var o = "", s = 0; s < c.length; s++) {
                    var a = ""
                      , r = ""
                      , l = c[s].split(",");
                    null != e && "" != e && e.search("(^|,)" + l[0] + "(,|$)") > -1 && (a = 'checked="checked"',
                    r = "on"),
                    o += '<li class="' + r + '"><input type="checkbox" name="' + t + '" value="' + l[0] + '" data-value="' + l[1] + '" ' + a + " />" + l[1] + "<i></i></li>"
                }
                if (i) {
                    var l = i.split(",");
                    o += '<li><input type="checkbox" name="' + t + '" value="' + l[0] + '" data-value="' + l[1] + '" />' + l[1] + "<i></i></li>"
                }
                return o
            }
            ,
            n.checkboxInt = function(n, t, e) {
                var c = "";
                if (null == t || "-1" == t || "" == t)
                    return $(n).html("不限"),
                    !1;
                for (var i = 0; i < e.length; i++) {
                    var o = e[i].split(",");
                    t.search("(^|,)" + o[0] + "(,|$)") > -1 && (c += o[1] + "，")
                }
                c = c.substring(0, c.length - 1),
                $(n).html(c)
            }
        }
    }()
}
, function(n, t, e) {
    "use strict";
    !function() {
        function n(n) {
            if (!n || n.length < 8)
                return "0,0,false";
            var t = n.substring(0, 5) + "000"
              , e = "c" + t
              , c = "c" + n
              , o = "";
            parseInt(t) > parseInt(l) && (t = l,
            e = "c" + t);
            var s, a = i.district[e];
            if (a && (s = a[c]),
            i.district[c])
                return "1," + (o = parseInt(t) < parseInt(l) ? "10100000" : l) + ",false";
            if (s) {
                o = t;
                var r = !1;
                for (var d in s)
                    if ("n" != d && "d" != d) {
                        if (r)
                            break;
                        r = !0
                    }
                return "2," + o + "," + !r
            }
            for (var d in a)
                if ("n" != d && "d" != d)
                    for (var h in a[d])
                        if (h == c)
                            return "3," + (o = d.substring(1, d.length)) + ",true";
            return "0,0,false"
        }
        function t(t) {
            return n(t).split(",")[1]
        }
        if (!window.city) {
            for (var e = [], c = 0; c < 10; c++)
                e.push(c);
            var i = window.city = {};
            i.buxian = "-1,不限",
            i.qingxuanze = "-1,请选择",
            i.qingxuanze2 = "-1,请选择";
            var o = {
                province: {
                    c10102000: {
                        n: "北京",
                        d: 1
                    },
                    c10103000: {
                        n: "上海",
                        d: 1
                    },
                    c10101000: {
                        n: "广东"
                    },
                    c10104000: {
                        n: "天津",
                        d: 1
                    },
                    c10105000: {
                        n: "重庆",
                        d: 1
                    },
                    c10106000: {
                        n: "安徽"
                    },
                    c10107000: {
                        n: "福建"
                    },
                    c10108000: {
                        n: "甘肃"
                    },
                    c10109000: {
                        n: "广西"
                    },
                    c10110000: {
                        n: "贵州"
                    },
                    c10111000: {
                        n: "海南"
                    },
                    c10112000: {
                        n: "河北"
                    },
                    c10113000: {
                        n: "河南"
                    },
                    c10114000: {
                        n: "黑龙江"
                    },
                    c10115000: {
                        n: "湖北"
                    },
                    c10116000: {
                        n: "湖南"
                    },
                    c10117000: {
                        n: "吉林"
                    },
                    c10118000: {
                        n: "江苏"
                    },
                    c10119000: {
                        n: "江西"
                    },
                    c10120000: {
                        n: "辽宁"
                    },
                    c10121000: {
                        n: "内蒙古"
                    },
                    c10122000: {
                        n: "宁夏"
                    },
                    c10123000: {
                        n: "青海"
                    },
                    c10124000: {
                        n: "山东"
                    },
                    c10125000: {
                        n: "山西"
                    },
                    c10126000: {
                        n: "陕西"
                    },
                    c10127000: {
                        n: "四川"
                    },
                    c10128000: {
                        n: "西藏"
                    },
                    c10129000: {
                        n: "新疆"
                    },
                    c10130000: {
                        n: "云南"
                    },
                    c10131000: {
                        n: "浙江"
                    }
                },
                detail: {
                    c10102000: {
                        n: "北京",
                        d: 1,
                        c10102005: {
                            n: "朝阳区"
                        },
                        c10102008: {
                            n: "海淀区"
                        },
                        c10102006: {
                            n: "丰台区"
                        },
                        c10102013: {
                            n: "昌平区"
                        },
                        c10102011: {
                            n: "通州区"
                        },
                        c10102014: {
                            n: "大兴区"
                        },
                        c10102002: {
                            n: "西城区"
                        },
                        c10102010: {
                            n: "房山区"
                        },
                        c10102012: {
                            n: "顺义区"
                        },
                        c10102001: {
                            n: "东城区"
                        },
                        c10102007: {
                            n: "石景山区"
                        },
                        c10102015: {
                            n: "怀柔区"
                        },
                        c10102009: {
                            n: "门头沟区"
                        },
                        c10102017: {
                            n: "密云区"
                        },
                        c10102018: {
                            n: "延庆区"
                        },
                        c10102016: {
                            n: "平谷区"
                        }
                    },
                    c10103000: {
                        n: "上海",
                        d: 1,
                        c10103008: {
                            n: "黄浦区"
                        },
                        c10103002: {
                            n: "徐汇区"
                        },
                        c10103001: {
                            n: "浦东新区"
                        },
                        c10103012: {
                            n: "闵行区"
                        },
                        c10103011: {
                            n: "宝山区"
                        },
                        c10103015: {
                            n: "松江区"
                        },
                        c10103013: {
                            n: "嘉定区"
                        },
                        c10103007: {
                            n: "杨浦区"
                        },
                        c10103004: {
                            n: "普陀区"
                        },
                        c10103016: {
                            n: "青浦区"
                        },
                        c10103018: {
                            n: "奉贤区"
                        },
                        c10103010: {
                            n: "静安区"
                        },
                        c10103006: {
                            n: "虹口区"
                        },
                        c10103014: {
                            n: "金山区"
                        },
                        c10103003: {
                            n: "长宁区"
                        },
                        c10103017: {
                            n: "崇明区"
                        }
                    },
                    c10101000: {
                        n: "广东",
                        c10101002: {
                            n: "广州",
                            c10101208: {
                                n: "荔湾区"
                            },
                            c10101209: {
                                n: "越秀区"
                            },
                            c10101210: {
                                n: "海珠区"
                            },
                            c10101211: {
                                n: "天河区"
                            },
                            c10101212: {
                                n: "白云区"
                            },
                            c10101213: {
                                n: "黄埔区"
                            },
                            c10101214: {
                                n: "南沙区"
                            },
                            c10101021: {
                                n: "番禺区"
                            },
                            c10101084: {
                                n: "花都区"
                            },
                            c10101089: {
                                n: "增城区"
                            },
                            c10101052: {
                                n: "从化区"
                            }
                        },
                        c10101201: {
                            n: "深圳",
                            c10101203: {
                                n: "福田区"
                            },
                            c10101202: {
                                n: "罗湖区"
                            },
                            c10101204: {
                                n: "南山区"
                            },
                            c10101206: {
                                n: "宝安区"
                            },
                            c10101207: {
                                n: "龙岗区"
                            },
                            c10101205: {
                                n: "盐田区"
                            },
                            c10101310: {
                                n: "龙华区"
                            },
                            c10101311: {
                                n: "光明新区"
                            },
                            c10101312: {
                                n: "坪山区"
                            },
                            c10101313: {
                                n: "大鹏新区"
                            }
                        },
                        c10101003: {
                            n: "佛山",
                            c10101275: {
                                n: "禅城区"
                            },
                            c10101273: {
                                n: "南海区"
                            },
                            c10101271: {
                                n: "顺德区"
                            },
                            c10101272: {
                                n: "三水区"
                            },
                            c10101274: {
                                n: "高明区"
                            }
                        },
                        c10101004: {
                            n: "湛江",
                            c10101246: {
                                n: "赤坎区"
                            },
                            c10101243: {
                                n: "霞山区"
                            },
                            c10101244: {
                                n: "坡头区"
                            },
                            c10101245: {
                                n: "麻章区"
                            },
                            c10101070: {
                                n: "雷州市"
                            },
                            c10101029: {
                                n: "廉江市"
                            },
                            c10101065: {
                                n: "吴川市"
                            },
                            c10101060: {
                                n: "遂溪县"
                            },
                            c10101036: {
                                n: "徐闻县"
                            }
                        },
                        c10101005: {
                            n: "珠海",
                            c10101238: {
                                n: "香洲区"
                            },
                            c10101240: {
                                n: "斗门区"
                            },
                            c10101239: {
                                n: "金湾区"
                            }
                        },
                        c10101006: {
                            n: "肇庆",
                            c10101241: {
                                n: "端州区"
                            },
                            c10101079: {
                                n: "高要区"
                            },
                            c10101242: {
                                n: "鼎湖区"
                            },
                            c10101051: {
                                n: "四会市"
                            },
                            c10101086: {
                                n: "怀集县"
                            },
                            c10101056: {
                                n: "广宁县"
                            },
                            c10101054: {
                                n: "封开县"
                            },
                            c10101091: {
                                n: "德庆县"
                            }
                        },
                        c10101007: {
                            n: "东莞",
                            c10101291: {
                                n: "南城区"
                            },
                            c10101303: {
                                n: "东城区"
                            },
                            c10101281: {
                                n: "万江区"
                            },
                            c10101299: {
                                n: "莞城区"
                            },
                            c10101277: {
                                n: "长安镇"
                            },
                            c10101295: {
                                n: "虎门镇"
                            },
                            c10101282: {
                                n: "塘厦镇"
                            },
                            c10101296: {
                                n: "厚街镇"
                            },
                            c10101293: {
                                n: "寮步镇"
                            },
                            c10101307: {
                                n: "常平镇"
                            },
                            c10101288: {
                                n: "清溪镇"
                            },
                            c10101301: {
                                n: "凤岗镇"
                            },
                            c10101306: {
                                n: "大朗镇"
                            },
                            c10101305: {
                                n: "大岭山镇"
                            },
                            c10101286: {
                                n: "石碣镇"
                            },
                            c10101294: {
                                n: "黄江镇"
                            },
                            c10101298: {
                                n: "横沥镇"
                            },
                            c10101300: {
                                n: "高埗镇"
                            },
                            c10101284: {
                                n: "石排镇"
                            },
                            c10101289: {
                                n: "桥头镇"
                            },
                            c10101308: {
                                n: "茶山镇"
                            },
                            c10101285: {
                                n: "石龙镇"
                            },
                            c10101304: {
                                n: "道滘镇"
                            },
                            c10101276: {
                                n: "中堂镇"
                            },
                            c10101278: {
                                n: "樟木头镇"
                            },
                            c10101302: {
                                n: "东坑镇"
                            },
                            c10101287: {
                                n: "沙田镇"
                            },
                            c10101290: {
                                n: "企石镇"
                            },
                            c10101292: {
                                n: "麻涌镇"
                            },
                            c10101279: {
                                n: "谢岗镇"
                            },
                            c10101280: {
                                n: "望牛墩镇"
                            },
                            c10101297: {
                                n: "洪梅镇"
                            },
                            c10101283: {
                                n: "松山湖"
                            }
                        },
                        c10101008: {
                            n: "惠州",
                            c10101269: {
                                n: "惠城区"
                            },
                            c10101268: {
                                n: "惠阳区"
                            },
                            c10101035: {
                                n: "博罗县"
                            },
                            c10101097: {
                                n: "惠东县"
                            },
                            c10101069: {
                                n: "龙门县"
                            }
                        },
                        c10101011: {
                            n: "中山",
                            c10101333: {
                                n: "石岐街道"
                            },
                            c10101334: {
                                n: "东区街道"
                            },
                            c10101335: {
                                n: "西区街道"
                            },
                            c10101336: {
                                n: "南区街道"
                            },
                            c10101337: {
                                n: "五桂山街道"
                            },
                            c10101314: {
                                n: "火炬开发区"
                            },
                            c10101315: {
                                n: "小榄镇"
                            },
                            c10101316: {
                                n: "坦洲镇"
                            },
                            c10101317: {
                                n: "古镇镇"
                            },
                            c10101318: {
                                n: "三乡镇"
                            },
                            c10101319: {
                                n: "黄圃镇"
                            },
                            c10101320: {
                                n: "东升镇"
                            },
                            c10101321: {
                                n: "东凤镇"
                            },
                            c10101322: {
                                n: "沙溪镇"
                            },
                            c10101323: {
                                n: "民众镇"
                            },
                            c10101324: {
                                n: "港口镇"
                            },
                            c10101325: {
                                n: "三角镇"
                            },
                            c10101326: {
                                n: "南头镇"
                            },
                            c10101327: {
                                n: "南朗镇"
                            },
                            c10101328: {
                                n: "横栏镇"
                            },
                            c10101329: {
                                n: "板芙镇"
                            },
                            c10101330: {
                                n: "大涌镇"
                            },
                            c10101331: {
                                n: "阜沙镇"
                            },
                            c10101332: {
                                n: "神湾镇"
                            }
                        },
                        c10101012: {
                            n: "茂名",
                            c10101262: {
                                n: "茂南区"
                            },
                            c10101094: {
                                n: "电白区"
                            },
                            c10101024: {
                                n: "高州市"
                            },
                            c10101027: {
                                n: "化州市"
                            },
                            c10101032: {
                                n: "信宜市"
                            }
                        },
                        c10101013: {
                            n: "汕头",
                            c10101254: {
                                n: "金平区"
                            },
                            c10101256: {
                                n: "澄海区"
                            },
                            c10101253: {
                                n: "龙湖区"
                            },
                            c10101255: {
                                n: "濠江区"
                            },
                            c10101257: {
                                n: "潮阳区"
                            },
                            c10101258: {
                                n: "潮南区"
                            },
                            c10101057: {
                                n: "南澳县"
                            }
                        },
                        c10101014: {
                            n: "梅州",
                            c10101261: {
                                n: "梅江区"
                            },
                            c10101074: {
                                n: "梅县区"
                            },
                            c10101025: {
                                n: "兴宁市"
                            },
                            c10101082: {
                                n: "五华县"
                            },
                            c10101048: {
                                n: "丰顺县"
                            },
                            c10101076: {
                                n: "大埔县"
                            },
                            c10101087: {
                                n: "平远县"
                            },
                            c10101043: {
                                n: "蕉岭县"
                            }
                        },
                        c10101015: {
                            n: "韶关",
                            c10101249: {
                                n: "浈江区"
                            },
                            c10101251: {
                                n: "曲江区"
                            },
                            c10101250: {
                                n: "武江区"
                            },
                            c10101033: {
                                n: "乐昌市"
                            },
                            c10101090: {
                                n: "南雄市"
                            },
                            c10101078: {
                                n: "翁源县"
                            },
                            c10101050: {
                                n: "新丰县"
                            },
                            c10101053: {
                                n: "仁化县"
                            },
                            c10101085: {
                                n: "始兴县"
                            },
                            c10101055: {
                                n: "乳源瑶族自治县"
                            }
                        },
                        c10101016: {
                            n: "江门",
                            c10101266: {
                                n: "蓬江区"
                            },
                            c10101265: {
                                n: "新会区"
                            },
                            c10101267: {
                                n: "江海区"
                            },
                            c10101098: {
                                n: "台山市"
                            },
                            c10101066: {
                                n: "开平市"
                            },
                            c10101040: {
                                n: "鹤山市"
                            },
                            c10101037: {
                                n: "恩平市"
                            }
                        },
                        c10101018: {
                            n: "清远",
                            c10101259: {
                                n: "清城区"
                            },
                            c10101231: {
                                n: "清新区"
                            },
                            c10101019: {
                                n: "英德市"
                            },
                            c10101062: {
                                n: "连州市"
                            },
                            c10101088: {
                                n: "佛冈县"
                            },
                            c10101058: {
                                n: "阳山县"
                            },
                            c10101095: {
                                n: "连南瑶自治县"
                            },
                            c10101260: {
                                n: "连山壮族瑶族自治县"
                            }
                        },
                        c10101020: {
                            n: "潮州",
                            c10101046: {
                                n: "潮安区"
                            },
                            c10101309: {
                                n: "湘桥区"
                            },
                            c10101080: {
                                n: "饶平县"
                            }
                        },
                        c10101022: {
                            n: "阳江",
                            c10101248: {
                                n: "江城区"
                            },
                            c10101039: {
                                n: "阳东区"
                            },
                            c10101030: {
                                n: "阳春市"
                            },
                            c10101073: {
                                n: "阳西县"
                            }
                        },
                        c10101023: {
                            n: "河源",
                            c10101270: {
                                n: "源城区"
                            },
                            c10101049: {
                                n: "龙川县"
                            },
                            c10101228: {
                                n: "东源县"
                            },
                            c10101083: {
                                n: "紫金县"
                            },
                            c10101077: {
                                n: "和平县"
                            },
                            c10101044: {
                                n: "连平县"
                            }
                        },
                        c10101026: {
                            n: "揭阳",
                            c10101264: {
                                n: "榕城区"
                            },
                            c10101075: {
                                n: "揭东区"
                            },
                            c10101034: {
                                n: "普宁市"
                            },
                            c10101047: {
                                n: "惠来县"
                            },
                            c10101081: {
                                n: "揭西县"
                            }
                        },
                        c10101028: {
                            n: "汕尾",
                            c10101252: {
                                n: "城区"
                            },
                            c10101096: {
                                n: "陆丰市"
                            },
                            c10101009: {
                                n: "海丰县"
                            },
                            c10101059: {
                                n: "陆河县"
                            }
                        },
                        c10101068: {
                            n: "云浮",
                            c10101247: {
                                n: "云城区"
                            },
                            c10101237: {
                                n: "云安区"
                            },
                            c10101038: {
                                n: "罗定市"
                            },
                            c10101042: {
                                n: "新兴县"
                            },
                            c10101072: {
                                n: "郁南县"
                            }
                        }
                    },
                    c10104000: {
                        n: "天津",
                        d: 1,
                        c10104008: {
                            n: "和平区"
                        },
                        c10104009: {
                            n: "河东区"
                        },
                        c10104010: {
                            n: "河西区"
                        },
                        c10104011: {
                            n: "南开区"
                        },
                        c10104012: {
                            n: "河北区"
                        },
                        c10104013: {
                            n: "红桥区"
                        },
                        c10104017: {
                            n: "东丽区"
                        },
                        c10104018: {
                            n: "西青区"
                        },
                        c10104014: {
                            n: "滨海新区"
                        },
                        c10104020: {
                            n: "津南区"
                        },
                        c10104002: {
                            n: "武清区"
                        },
                        c10104005: {
                            n: "宝坻区"
                        },
                        c10104006: {
                            n: "静海区"
                        },
                        c10104003: {
                            n: "宁河区"
                        },
                        c10104019: {
                            n: "北辰区"
                        },
                        c10104007: {
                            n: "蓟州区"
                        }
                    },
                    c10105000: {
                        n: "重庆",
                        d: 1,
                        c10105034: {
                            n: "渝中区"
                        },
                        c10105040: {
                            n: "渝北区"
                        },
                        c10105013: {
                            n: "合川区"
                        },
                        c10105037: {
                            n: "九龙坡区"
                        },
                        c10105036: {
                            n: "沙坪坝区"
                        },
                        c10105007: {
                            n: "永川区"
                        },
                        c10105041: {
                            n: "巴南区"
                        },
                        c10105038: {
                            n: "南岸区"
                        },
                        c10105026: {
                            n: "江北区"
                        },
                        c10105024: {
                            n: "北碚区"
                        },
                        c10105025: {
                            n: "璧山区"
                        },
                        c10105035: {
                            n: "大渡口区"
                        },
                        c10105042: {
                            n: "万州区"
                        },
                        c10105006: {
                            n: "开州区"
                        },
                        c10105021: {
                            n: "梁平区"
                        },
                        c10105018: {
                            n: "黔江区"
                        },
                        c10105003: {
                            n: "武隆区"
                        },
                        c10105029: {
                            n: "江津区"
                        },
                        c10105028: {
                            n: "涪陵区"
                        },
                        c10105033: {
                            n: "綦江区"
                        },
                        c10105023: {
                            n: "大足区"
                        },
                        c10105016: {
                            n: "长寿区"
                        },
                        c10105008: {
                            n: "荣昌区"
                        },
                        c10105010: {
                            n: "铜梁区"
                        },
                        c10105027: {
                            n: "潼南区"
                        },
                        c10105015: {
                            n: "南川区"
                        },
                        c10105019: {
                            n: "云阳县"
                        },
                        c10105002: {
                            n: "奉节县"
                        },
                        c10105004: {
                            n: "忠县"
                        },
                        c10105020: {
                            n: "垫江县"
                        },
                        c10105030: {
                            n: "丰都县"
                        },
                        c10105005: {
                            n: "巫山县"
                        },
                        c10105017: {
                            n: "巫溪县"
                        },
                        c10105032: {
                            n: "城口县"
                        },
                        c10105012: {
                            n: "石柱土家族自治县"
                        },
                        c10105044: {
                            n: "酉阳土家族苗族自治县"
                        },
                        c10105045: {
                            n: "彭水苗族土家族自治县"
                        },
                        c10105043: {
                            n: "秀山土家族苗族自治县"
                        }
                    },
                    c10106000: {
                        n: "安徽",
                        c10106001: {
                            n: "合肥",
                            c10106083: {
                                n: "蜀山区"
                            },
                            c10106081: {
                                n: "瑶海区"
                            },
                            c10106084: {
                                n: "包河区"
                            },
                            c10106082: {
                                n: "庐阳区"
                            },
                            c10106007: {
                                n: "巢湖市"
                            },
                            c10106069: {
                                n: "庐江县"
                            },
                            c10106033: {
                                n: "肥西县"
                            },
                            c10106066: {
                                n: "长丰县"
                            },
                            c10106071: {
                                n: "肥东县"
                            }
                        },
                        c10106002: {
                            n: "淮南",
                            c10106087: {
                                n: "市辖区"
                            },
                            c10106043: {
                                n: "凤台"
                            },
                            c10106130: {
                                n: "谢家集区"
                            },
                            c10106131: {
                                n: "田家庵区"
                            },
                            c10106132: {
                                n: "潘集区"
                            },
                            c10106133: {
                                n: "大通区"
                            },
                            c10106134: {
                                n: "八公山区"
                            }
                        },
                        c10106003: {
                            n: "蚌埠",
                            c10106086: {
                                n: "市辖区"
                            },
                            c10106024: {
                                n: "怀远"
                            },
                            c10106056: {
                                n: "固镇"
                            },
                            c10106061: {
                                n: "五河"
                            },
                            c10106145: {
                                n: "禹会区"
                            },
                            c10106146: {
                                n: "龙子湖区"
                            },
                            c10106147: {
                                n: "淮上区"
                            },
                            c10106148: {
                                n: "蚌山区"
                            }
                        },
                        c10106004: {
                            n: "宿州",
                            c10106096: {
                                n: "市辖区"
                            },
                            c10106015: {
                                n: "砀山"
                            },
                            c10106045: {
                                n: "灵璧"
                            },
                            c10106050: {
                                n: "萧县"
                            },
                            c10106077: {
                                n: "泗县"
                            },
                            c10106115: {
                                n: "埇桥区"
                            }
                        },
                        c10106005: {
                            n: "阜阳",
                            c10106095: {
                                n: "市辖区"
                            },
                            c10106023: {
                                n: "临泉"
                            },
                            c10106028: {
                                n: "颍上"
                            },
                            c10106037: {
                                n: "阜南"
                            },
                            c10106060: {
                                n: "太和"
                            },
                            c10106065: {
                                n: "界首"
                            },
                            c10106138: {
                                n: "颍州区"
                            },
                            c10106139: {
                                n: "颍泉区"
                            },
                            c10106140: {
                                n: "颍东区"
                            }
                        },
                        c10106006: {
                            n: "六安",
                            c10106098: {
                                n: "市辖区"
                            },
                            c10106019: {
                                n: "舒城"
                            },
                            c10106040: {
                                n: "金寨"
                            },
                            c10106044: {
                                n: "霍邱"
                            },
                            c10106049: {
                                n: "寿县"
                            },
                            c10106076: {
                                n: "霍山"
                            },
                            c10106125: {
                                n: "裕安区"
                            },
                            c10106126: {
                                n: "金安区"
                            }
                        },
                        c10106008: {
                            n: "滁州",
                            c10106094: {
                                n: "市辖区"
                            },
                            c10106016: {
                                n: "全椒"
                            },
                            c10106038: {
                                n: "明光"
                            },
                            c10106041: {
                                n: "来安"
                            },
                            c10106046: {
                                n: "凤阳"
                            },
                            c10106073: {
                                n: "定远"
                            },
                            c10106078: {
                                n: "天长"
                            },
                            c10106141: {
                                n: "南谯区"
                            },
                            c10106142: {
                                n: "琅琊区"
                            }
                        },
                        c10106009: {
                            n: "芜湖",
                            c10106085: {
                                n: "市辖区"
                            },
                            c10106018: {
                                n: "繁昌"
                            },
                            c10106036: {
                                n: "无为"
                            },
                            c10106048: {
                                n: "南陵"
                            },
                            c10106052: {
                                n: "芜湖县"
                            },
                            c10106116: {
                                n: "弋江区"
                            },
                            c10106117: {
                                n: "三山区"
                            },
                            c10106118: {
                                n: "鸠江区"
                            },
                            c10106119: {
                                n: "镜湖区"
                            }
                        },
                        c10106011: {
                            n: "安庆",
                            c10106092: {
                                n: "市辖区"
                            },
                            c10106021: {
                                n: "怀宁"
                            },
                            c10106026: {
                                n: "潜山"
                            },
                            c10106030: {
                                n: "桐城"
                            },
                            c10106035: {
                                n: "太湖"
                            },
                            c10106053: {
                                n: "岳西"
                            },
                            c10106058: {
                                n: "宿松"
                            },
                            c10106063: {
                                n: "望江"
                            },
                            c10106068: {
                                n: "枞阳"
                            },
                            c10106149: {
                                n: "迎江区"
                            },
                            c10106150: {
                                n: "宜秀区"
                            },
                            c10106151: {
                                n: "大观区"
                            }
                        },
                        c10106012: {
                            n: "黄山",
                            c10106093: {
                                n: "市辖区"
                            },
                            c10106014: {
                                n: "黟县"
                            },
                            c10106017: {
                                n: "祁门"
                            },
                            c10106047: {
                                n: "休宁"
                            },
                            c10106051: {
                                n: "歙县"
                            },
                            c10106127: {
                                n: "屯溪区"
                            },
                            c10106128: {
                                n: "徽州区"
                            },
                            c10106129: {
                                n: "黄山区"
                            }
                        },
                        c10106013: {
                            n: "铜陵",
                            c10106090: {
                                n: "市辖区"
                            },
                            c10106091: {
                                n: "铜陵县"
                            },
                            c10106120: {
                                n: "铜官山区"
                            },
                            c10106121: {
                                n: "狮子山区"
                            },
                            c10106122: {
                                n: "郊区"
                            }
                        },
                        c10106042: {
                            n: "淮北",
                            c10106089: {
                                n: "市辖区"
                            },
                            c10106074: {
                                n: "濉溪"
                            },
                            c10106135: {
                                n: "相山区"
                            },
                            c10106136: {
                                n: "烈山区"
                            },
                            c10106137: {
                                n: "杜集区"
                            }
                        },
                        c10106072: {
                            n: "亳州",
                            c10106099: {
                                n: "市辖区"
                            },
                            c10106032: {
                                n: "涡阳"
                            },
                            c10106055: {
                                n: "利辛"
                            },
                            c10106070: {
                                n: "蒙城"
                            },
                            c10106144: {
                                n: "谯城区"
                            }
                        },
                        c10106075: {
                            n: "马鞍山",
                            c10106088: {
                                n: "市辖区"
                            },
                            c10106031: {
                                n: "和县"
                            },
                            c10106039: {
                                n: "当涂"
                            },
                            c10106064: {
                                n: "含山"
                            },
                            c10106123: {
                                n: "雨山区"
                            },
                            c10106124: {
                                n: "花山区"
                            }
                        },
                        c10106079: {
                            n: "池州",
                            c10106100: {
                                n: "市辖区"
                            },
                            c10106022: {
                                n: "东至"
                            },
                            c10106054: {
                                n: "石台"
                            },
                            c10106059: {
                                n: "青阳"
                            },
                            c10106143: {
                                n: "贵池区"
                            }
                        },
                        c10106080: {
                            n: "宣城",
                            c10106101: {
                                n: "市辖区"
                            },
                            c10106020: {
                                n: "绩溪"
                            },
                            c10106025: {
                                n: "旌德"
                            },
                            c10106029: {
                                n: "郎溪"
                            },
                            c10106057: {
                                n: "广德"
                            },
                            c10106062: {
                                n: "宁国"
                            },
                            c10106067: {
                                n: "泾县"
                            },
                            c10106114: {
                                n: "宣州区"
                            }
                        }
                    },
                    c10107000: {
                        n: "福建",
                        c10107001: {
                            n: "福州",
                            c10107069: {
                                n: "鼓楼区"
                            },
                            c10107070: {
                                n: "台江区"
                            },
                            c10107071: {
                                n: "仓山区"
                            },
                            c10107073: {
                                n: "晋安区"
                            },
                            c10107072: {
                                n: "马尾区"
                            },
                            c10107023: {
                                n: "福清市"
                            },
                            c10107050: {
                                n: "长乐市"
                            },
                            c10107045: {
                                n: "闽候县"
                            },
                            c10107018: {
                                n: "连江县"
                            },
                            c10107054: {
                                n: "平潭县"
                            },
                            c10107030: {
                                n: "罗源县"
                            },
                            c10107027: {
                                n: "永泰县"
                            },
                            c10107057: {
                                n: "闽清县"
                            }
                        },
                        c10107002: {
                            n: "厦门",
                            c10107074: {
                                n: "思明区"
                            },
                            c10107076: {
                                n: "湖里区"
                            },
                            c10107077: {
                                n: "集美区"
                            },
                            c10107075: {
                                n: "海沧区"
                            },
                            c10107033: {
                                n: "同安区"
                            },
                            c10107078: {
                                n: "翔安区"
                            }
                        },
                        c10107003: {
                            n: "泉州",
                            c10107111: {
                                n: "丰泽区"
                            },
                            c10107110: {
                                n: "鲤城区"
                            },
                            c10107108: {
                                n: "泉港区"
                            },
                            c10107109: {
                                n: "洛江区"
                            },
                            c10107011: {
                                n: "晋江市"
                            },
                            c10107059: {
                                n: "南安市"
                            },
                            c10107012: {
                                n: "石狮市"
                            },
                            c10107031: {
                                n: "安溪县"
                            },
                            c10107064: {
                                n: "惠安县"
                            },
                            c10107062: {
                                n: "永春县"
                            },
                            c10107035: {
                                n: "德化县"
                            },
                            c10107082: {
                                n: "金门县"
                            }
                        },
                        c10107004: {
                            n: "南平",
                            c10107084: {
                                n: "市辖区"
                            },
                            c10107005: {
                                n: "邵武"
                            },
                            c10107015: {
                                n: "松溪"
                            },
                            c10107020: {
                                n: "光泽"
                            },
                            c10107036: {
                                n: "建瓯"
                            },
                            c10107038: {
                                n: "建阳"
                            },
                            c10107042: {
                                n: "浦城"
                            },
                            c10107047: {
                                n: "政和"
                            },
                            c10107052: {
                                n: "武夷山"
                            },
                            c10107065: {
                                n: "顺昌"
                            },
                            c10107117: {
                                n: "延平区"
                            }
                        },
                        c10107007: {
                            n: "漳州",
                            c10107083: {
                                n: "市辖区"
                            },
                            c10107014: {
                                n: "华安"
                            },
                            c10107019: {
                                n: "龙海"
                            },
                            c10107024: {
                                n: "云霄"
                            },
                            c10107028: {
                                n: "诏安"
                            },
                            c10107041: {
                                n: "南靖"
                            },
                            c10107046: {
                                n: "长泰"
                            },
                            c10107051: {
                                n: "漳浦"
                            },
                            c10107055: {
                                n: "东山"
                            },
                            c10107058: {
                                n: "平和"
                            },
                            c10107104: {
                                n: "芗城区"
                            },
                            c10107105: {
                                n: "龙文区"
                            }
                        },
                        c10107008: {
                            n: "龙岩",
                            c10107085: {
                                n: "市辖区"
                            },
                            c10107034: {
                                n: "永定"
                            },
                            c10107037: {
                                n: "武平"
                            },
                            c10107040: {
                                n: "连城"
                            },
                            c10107061: {
                                n: "漳平"
                            },
                            c10107063: {
                                n: "上杭"
                            },
                            c10107067: {
                                n: "长汀"
                            },
                            c10107118: {
                                n: "新罗区"
                            }
                        },
                        c10107009: {
                            n: "三明",
                            c10107080: {
                                n: "市辖区"
                            },
                            c10107017: {
                                n: "尤溪"
                            },
                            c10107022: {
                                n: "永安"
                            },
                            c10107026: {
                                n: "宁化"
                            },
                            c10107029: {
                                n: "建宁"
                            },
                            c10107032: {
                                n: "将乐"
                            },
                            c10107044: {
                                n: "沙县"
                            },
                            c10107049: {
                                n: "大田"
                            },
                            c10107053: {
                                n: "清流"
                            },
                            c10107056: {
                                n: "明溪"
                            },
                            c10107060: {
                                n: "泰宁"
                            },
                            c10107106: {
                                n: "三元区"
                            },
                            c10107107: {
                                n: "梅列区"
                            }
                        },
                        c10107010: {
                            n: "莆田",
                            c10107079: {
                                n: "市辖区"
                            },
                            c10107025: {
                                n: "仙游"
                            },
                            c10107112: {
                                n: "秀屿区"
                            },
                            c10107113: {
                                n: "荔城区"
                            },
                            c10107114: {
                                n: "涵江区"
                            },
                            c10107115: {
                                n: "城厢区"
                            }
                        },
                        c10107013: {
                            n: "宁德",
                            c10107086: {
                                n: "市辖区"
                            },
                            c10107006: {
                                n: "福安"
                            },
                            c10107016: {
                                n: "古田"
                            },
                            c10107021: {
                                n: "周宁"
                            },
                            c10107039: {
                                n: "福鼎"
                            },
                            c10107043: {
                                n: "寿宁"
                            },
                            c10107048: {
                                n: "屏南"
                            },
                            c10107066: {
                                n: "柘荣"
                            },
                            c10107068: {
                                n: "霞浦"
                            },
                            c10107116: {
                                n: "蕉城区"
                            }
                        }
                    },
                    c10108000: {
                        n: "甘肃",
                        c10108001: {
                            n: "兰州",
                            c10108028: {
                                n: "红古区"
                            },
                            c10108032: {
                                n: "榆中"
                            },
                            c10108065: {
                                n: "皋兰"
                            },
                            c10108069: {
                                n: "永登"
                            },
                            c10108086: {
                                n: "城关区"
                            },
                            c10108087: {
                                n: "七里河区"
                            },
                            c10108088: {
                                n: "西固区"
                            },
                            c10108089: {
                                n: "安宁区"
                            }
                        },
                        c10108002: {
                            n: "张掖",
                            c10108095: {
                                n: "市辖区"
                            },
                            c10108034: {
                                n: "山丹"
                            },
                            c10108038: {
                                n: "民乐"
                            },
                            c10108072: {
                                n: "高台"
                            },
                            c10108077: {
                                n: "临泽"
                            },
                            c10108096: {
                                n: "肃南"
                            },
                            c10108106: {
                                n: "甘州区"
                            }
                        },
                        c10108003: {
                            n: "武威",
                            c10108094: {
                                n: "市辖区"
                            },
                            c10108020: {
                                n: "民勤"
                            },
                            c10108026: {
                                n: "古浪"
                            },
                            c10108059: {
                                n: "天祝"
                            },
                            c10108107: {
                                n: "天祝藏族自治县"
                            },
                            c10108108: {
                                n: "凉州区"
                            }
                        },
                        c10108004: {
                            n: "酒泉",
                            c10108098: {
                                n: "市辖区"
                            },
                            c10108017: {
                                n: "金塔"
                            },
                            c10108048: {
                                n: "玉门"
                            },
                            c10108052: {
                                n: "敦煌"
                            },
                            c10108056: {
                                n: "阿克塞"
                            },
                            c10108061: {
                                n: "肃北"
                            },
                            c10108099: {
                                n: "瓜州"
                            },
                            c10108114: {
                                n: "肃州区"
                            }
                        },
                        c10108006: {
                            n: "金昌",
                            c10108091: {
                                n: "市辖区"
                            },
                            c10108030: {
                                n: "永昌"
                            },
                            c10108115: {
                                n: "金川区"
                            }
                        },
                        c10108007: {
                            n: "天水",
                            c10108093: {
                                n: "市辖区"
                            },
                            c10108033: {
                                n: "武山"
                            },
                            c10108036: {
                                n: "张家川"
                            },
                            c10108066: {
                                n: "甘谷"
                            },
                            c10108070: {
                                n: "秦安"
                            },
                            c10108075: {
                                n: "清水"
                            },
                            c10108109: {
                                n: "秦州区"
                            },
                            c10108110: {
                                n: "麦积区"
                            }
                        },
                        c10108008: {
                            n: "定西",
                            c10108102: {
                                n: "市辖区"
                            },
                            c10108011: {
                                n: "陇西"
                            },
                            c10108016: {
                                n: "漳县"
                            },
                            c10108021: {
                                n: "岷县"
                            },
                            c10108027: {
                                n: "渭源"
                            },
                            c10108055: {
                                n: "通渭"
                            },
                            c10108060: {
                                n: "临洮"
                            },
                            c10108116: {
                                n: "安定区"
                            }
                        },
                        c10108009: {
                            n: "平凉",
                            c10108097: {
                                n: "市辖区"
                            },
                            c10108041: {
                                n: "泾川"
                            },
                            c10108046: {
                                n: "崇信"
                            },
                            c10108051: {
                                n: "庄浪"
                            },
                            c10108074: {
                                n: "静宁"
                            },
                            c10108080: {
                                n: "灵台"
                            },
                            c10108083: {
                                n: "华亭"
                            },
                            c10108112: {
                                n: "崆峒区"
                            }
                        },
                        c10108012: {
                            n: "甘南",
                            c10108013: {
                                n: "迭部"
                            },
                            c10108037: {
                                n: "临潭"
                            },
                            c10108042: {
                                n: "碌曲"
                            },
                            c10108071: {
                                n: "夏河"
                            },
                            c10108076: {
                                n: "舟曲"
                            },
                            c10108081: {
                                n: "玛曲"
                            },
                            c10108104: {
                                n: "合作"
                            },
                            c10108105: {
                                n: "卓尼"
                            }
                        },
                        c10108023: {
                            n: "嘉峪关",
                            c10108090: {
                                n: "市辖区"
                            }
                        },
                        c10108064: {
                            n: "庆阳",
                            c10108100: {
                                n: "市辖区"
                            },
                            c10108031: {
                                n: "宁县"
                            },
                            c10108035: {
                                n: "环县"
                            },
                            c10108040: {
                                n: "正宁"
                            },
                            c10108068: {
                                n: "镇原"
                            },
                            c10108073: {
                                n: "合水"
                            },
                            c10108079: {
                                n: "华池"
                            },
                            c10108101: {
                                n: "庆城"
                            },
                            c10108111: {
                                n: "西峰区"
                            }
                        },
                        c10108078: {
                            n: "白银",
                            c10108092: {
                                n: "市辖区"
                            },
                            c10108014: {
                                n: "会宁"
                            },
                            c10108044: {
                                n: "靖远"
                            },
                            c10108049: {
                                n: "景泰"
                            },
                            c10108117: {
                                n: "平川区"
                            },
                            c10108118: {
                                n: "白银区"
                            }
                        },
                        c10108084: {
                            n: "陇南",
                            c10108103: {
                                n: "市辖区"
                            },
                            c10108015: {
                                n: "宕昌"
                            },
                            c10108019: {
                                n: "礼县"
                            },
                            c10108025: {
                                n: "两当"
                            },
                            c10108045: {
                                n: "成县"
                            },
                            c10108050: {
                                n: "文县"
                            },
                            c10108054: {
                                n: "西和"
                            },
                            c10108058: {
                                n: "徽县"
                            },
                            c10108082: {
                                n: "康县"
                            },
                            c10108113: {
                                n: "武都区"
                            }
                        },
                        c10108085: {
                            n: "临夏",
                            c10108018: {
                                n: "永靖"
                            },
                            c10108022: {
                                n: "临夏市"
                            },
                            c10108024: {
                                n: "东乡"
                            },
                            c10108029: {
                                n: "广河"
                            },
                            c10108053: {
                                n: "临夏县"
                            },
                            c10108057: {
                                n: "和政"
                            },
                            c10108062: {
                                n: "康乐"
                            },
                            c10108067: {
                                n: "积石山"
                            }
                        }
                    },
                    c10109000: {
                        n: "广西",
                        c10109001: {
                            n: "南宁",
                            c10109090: {
                                n: "兴宁区"
                            },
                            c10109091: {
                                n: "青秀区"
                            },
                            c10109092: {
                                n: "江南区"
                            },
                            c10109093: {
                                n: "西乡塘区"
                            },
                            c10109044: {
                                n: "邕宁区"
                            },
                            c10109094: {
                                n: "良庆区"
                            },
                            c10109011: {
                                n: "武鸣区"
                            },
                            c10109025: {
                                n: "横县"
                            },
                            c10109059: {
                                n: "宾阳县"
                            },
                            c10109054: {
                                n: "马山县"
                            },
                            c10109039: {
                                n: "上林县"
                            },
                            c10109065: {
                                n: "隆安县"
                            }
                        },
                        c10109002: {
                            n: "柳州",
                            c10109095: {
                                n: "市辖区"
                            },
                            c10109036: {
                                n: "柳江"
                            },
                            c10109042: {
                                n: "柳城"
                            },
                            c10109047: {
                                n: "融安"
                            },
                            c10109074: {
                                n: "鹿寨"
                            },
                            c10109080: {
                                n: "三江"
                            },
                            c10109086: {
                                n: "融水"
                            },
                            c10109117: {
                                n: "鱼峰区"
                            },
                            c10109118: {
                                n: "三江侗族自治县"
                            },
                            c10109119: {
                                n: "柳南区"
                            },
                            c10109120: {
                                n: "柳北区"
                            },
                            c10109121: {
                                n: "城中区"
                            }
                        },
                        c10109003: {
                            n: "钦州",
                            c10109102: {
                                n: "市辖区"
                            },
                            c10109017: {
                                n: "浦北"
                            },
                            c10109056: {
                                n: "灵山"
                            },
                            c10109115: {
                                n: "钦南区"
                            },
                            c10109116: {
                                n: "钦北区"
                            }
                        },
                        c10109004: {
                            n: "百色",
                            c10109106: {
                                n: "市辖区"
                            },
                            c10109024: {
                                n: "田林"
                            },
                            c10109029: {
                                n: "西林"
                            },
                            c10109035: {
                                n: "田阳"
                            },
                            c10109041: {
                                n: "田东"
                            },
                            c10109046: {
                                n: "平果"
                            },
                            c10109051: {
                                n: "那坡"
                            },
                            c10109064: {
                                n: "隆林"
                            },
                            c10109069: {
                                n: "凌云"
                            },
                            c10109073: {
                                n: "靖西"
                            },
                            c10109079: {
                                n: "乐业"
                            },
                            c10109085: {
                                n: "德保"
                            },
                            c10109146: {
                                n: "右江区"
                            },
                            c10109147: {
                                n: "隆林各族自治县"
                            }
                        },
                        c10109005: {
                            n: "玉林",
                            c10109104: {
                                n: "市辖区"
                            },
                            c10109048: {
                                n: "北流"
                            },
                            c10109053: {
                                n: "博白"
                            },
                            c10109081: {
                                n: "容县"
                            },
                            c10109087: {
                                n: "陆川"
                            },
                            c10109105: {
                                n: "兴业"
                            },
                            c10109111: {
                                n: "玉州区"
                            }
                        },
                        c10109006: {
                            n: "防城港",
                            c10109100: {
                                n: "市辖区"
                            },
                            c10109033: {
                                n: "上思"
                            },
                            c10109101: {
                                n: "东兴"
                            },
                            c10109140: {
                                n: "港口区"
                            },
                            c10109141: {
                                n: "防城区"
                            }
                        },
                        c10109007: {
                            n: "桂林",
                            c10109096: {
                                n: "市辖区"
                            },
                            c10109012: {
                                n: "龙胜"
                            },
                            c10109016: {
                                n: "资源"
                            },
                            c10109028: {
                                n: "阳朔"
                            },
                            c10109034: {
                                n: "荔浦"
                            },
                            c10109040: {
                                n: "平乐"
                            },
                            c10109045: {
                                n: "灵川"
                            },
                            c10109050: {
                                n: "永福"
                            },
                            c10109055: {
                                n: "恭城"
                            },
                            c10109068: {
                                n: "临桂"
                            },
                            c10109072: {
                                n: "灌阳"
                            },
                            c10109078: {
                                n: "兴安"
                            },
                            c10109084: {
                                n: "全州"
                            },
                            c10109131: {
                                n: "雁山区"
                            },
                            c10109132: {
                                n: "秀峰区"
                            },
                            c10109133: {
                                n: "象山区"
                            },
                            c10109134: {
                                n: "七星区"
                            },
                            c10109135: {
                                n: "龙胜各族自治县"
                            },
                            c10109136: {
                                n: "叠彩区"
                            }
                        },
                        c10109008: {
                            n: "梧州",
                            c10109098: {
                                n: "市辖区"
                            },
                            c10109021: {
                                n: "苍梧"
                            },
                            c10109026: {
                                n: "岑溪"
                            },
                            c10109062: {
                                n: "藤县"
                            },
                            c10109070: {
                                n: "蒙山"
                            },
                            c10109112: {
                                n: "长洲区"
                            },
                            c10109113: {
                                n: "万秀区"
                            },
                            c10109114: {
                                n: "蝶山区"
                            }
                        },
                        c10109009: {
                            n: "河池",
                            c10109108: {
                                n: "市辖区"
                            },
                            c10109022: {
                                n: "宜州"
                            },
                            c10109027: {
                                n: "环江"
                            },
                            c10109032: {
                                n: "凤山"
                            },
                            c10109038: {
                                n: "南丹"
                            },
                            c10109043: {
                                n: "都安"
                            },
                            c10109063: {
                                n: "罗城"
                            },
                            c10109067: {
                                n: "天峨"
                            },
                            c10109071: {
                                n: "东兰"
                            },
                            c10109076: {
                                n: "巴马"
                            },
                            c10109082: {
                                n: "大化"
                            },
                            c10109126: {
                                n: "罗城仫佬族自治县"
                            },
                            c10109127: {
                                n: "金城江区"
                            },
                            c10109128: {
                                n: "环江毛南族自治县"
                            },
                            c10109129: {
                                n: "都安瑶族自治县"
                            },
                            c10109130: {
                                n: "巴马瑶族自治县"
                            }
                        },
                        c10109010: {
                            n: "北海",
                            c10109099: {
                                n: "市辖区"
                            },
                            c10109088: {
                                n: "合浦"
                            },
                            c10109143: {
                                n: "银海区"
                            },
                            c10109144: {
                                n: "铁山港区"
                            },
                            c10109145: {
                                n: "海城区"
                            }
                        },
                        c10109014: {
                            n: "贵港",
                            c10109103: {
                                n: "市辖区"
                            },
                            c10109019: {
                                n: "平南"
                            },
                            c10109058: {
                                n: "桂平"
                            },
                            c10109137: {
                                n: "覃塘区"
                            },
                            c10109138: {
                                n: "港南区"
                            },
                            c10109139: {
                                n: "港北区"
                            }
                        },
                        c10109018: {
                            n: "来宾",
                            c10109109: {
                                n: "市辖区"
                            },
                            c10109013: {
                                n: "合山"
                            },
                            c10109023: {
                                n: "象州"
                            },
                            c10109052: {
                                n: "金秀"
                            },
                            c10109057: {
                                n: "忻城"
                            },
                            c10109060: {
                                n: "武宣"
                            },
                            c10109122: {
                                n: "兴宾区"
                            },
                            c10109123: {
                                n: "金秀瑶族自治县"
                            }
                        },
                        c10109083: {
                            n: "崇左",
                            c10109110: {
                                n: "市辖区"
                            },
                            c10109015: {
                                n: "龙州"
                            },
                            c10109020: {
                                n: "大新"
                            },
                            c10109030: {
                                n: "扶绥"
                            },
                            c10109049: {
                                n: "宁明"
                            },
                            c10109061: {
                                n: "天等"
                            },
                            c10109077: {
                                n: "凭祥"
                            },
                            c10109142: {
                                n: "江州区"
                            }
                        },
                        c10109089: {
                            n: "贺州",
                            c10109107: {
                                n: "市辖区"
                            },
                            c10109037: {
                                n: "钟山"
                            },
                            c10109066: {
                                n: "昭平"
                            },
                            c10109075: {
                                n: "富川"
                            },
                            c10109124: {
                                n: "富川瑶族自治县"
                            },
                            c10109125: {
                                n: "八步区"
                            }
                        }
                    },
                    c10110000: {
                        n: "贵州",
                        c10110001: {
                            n: "贵阳",
                            c10110086: {
                                n: "云岩区"
                            },
                            c10110085: {
                                n: "南明区"
                            },
                            c10110087: {
                                n: "花溪区"
                            },
                            c10110088: {
                                n: "乌当区"
                            },
                            c10110089: {
                                n: "白云区"
                            },
                            c10110105: {
                                n: "观山湖区"
                            },
                            c10110009: {
                                n: "清镇市"
                            },
                            c10110052: {
                                n: "开阳县"
                            },
                            c10110048: {
                                n: "修文县"
                            },
                            c10110015: {
                                n: "息烽县"
                            }
                        },
                        c10110002: {
                            n: "六盘水",
                            c10110034: {
                                n: "六枝"
                            },
                            c10110073: {
                                n: "盘县"
                            },
                            c10110091: {
                                n: "钟山区"
                            },
                            c10110092: {
                                n: "水城"
                            }
                        },
                        c10110006: {
                            n: "安顺",
                            c10110095: {
                                n: "市辖区"
                            },
                            c10110010: {
                                n: "紫云"
                            },
                            c10110016: {
                                n: "镇宁"
                            },
                            c10110044: {
                                n: "平坝"
                            },
                            c10110049: {
                                n: "关岭"
                            },
                            c10110053: {
                                n: "普定"
                            },
                            c10110104: {
                                n: "西秀区"
                            }
                        },
                        c10110007: {
                            n: "遵义",
                            c10110093: {
                                n: "市辖区"
                            },
                            c10110013: {
                                n: "务川"
                            },
                            c10110023: {
                                n: "习水"
                            },
                            c10110032: {
                                n: "绥阳"
                            },
                            c10110036: {
                                n: "道真"
                            },
                            c10110041: {
                                n: "凤冈"
                            },
                            c10110046: {
                                n: "余庆"
                            },
                            c10110057: {
                                n: "赤水"
                            },
                            c10110061: {
                                n: "仁怀"
                            },
                            c10110066: {
                                n: "桐梓"
                            },
                            c10110071: {
                                n: "正安"
                            },
                            c10110076: {
                                n: "湄潭"
                            },
                            c10110094: {
                                n: "遵义县"
                            },
                            c10110098: {
                                n: "汇川区"
                            },
                            c10110099: {
                                n: "红花岗区"
                            }
                        },
                        c10110021: {
                            n: "毕节",
                            c10110096: {
                                n: "市辖区"
                            },
                            c10110017: {
                                n: "威宁"
                            },
                            c10110020: {
                                n: "纳雍"
                            },
                            c10110025: {
                                n: "大方"
                            },
                            c10110029: {
                                n: "织金"
                            },
                            c10110054: {
                                n: "赫章"
                            },
                            c10110059: {
                                n: "黔西"
                            },
                            c10110063: {
                                n: "金沙"
                            },
                            c10110103: {
                                n: "七星关区"
                            }
                        },
                        c10110055: {
                            n: "铜仁",
                            c10110097: {
                                n: "市辖区"
                            },
                            c10110003: {
                                n: "玉屏"
                            },
                            c10110011: {
                                n: "德江"
                            },
                            c10110031: {
                                n: "松桃"
                            },
                            c10110040: {
                                n: "石阡"
                            },
                            c10110045: {
                                n: "印江"
                            },
                            c10110065: {
                                n: "沿河"
                            },
                            c10110075: {
                                n: "江口"
                            },
                            c10110080: {
                                n: "思南"
                            },
                            c10110100: {
                                n: "玉屏侗族自治县"
                            },
                            c10110101: {
                                n: "松桃苗族自治县"
                            },
                            c10110102: {
                                n: "碧江区"
                            }
                        },
                        c10110082: {
                            n: "黔西南布依族苗族自治州",
                            c10110026: {
                                n: "兴义"
                            },
                            c10110030: {
                                n: "望谟"
                            },
                            c10110035: {
                                n: "兴仁"
                            },
                            c10110039: {
                                n: "普安"
                            },
                            c10110064: {
                                n: "册亨"
                            },
                            c10110069: {
                                n: "安龙"
                            },
                            c10110074: {
                                n: "贞丰"
                            },
                            c10110079: {
                                n: "晴隆"
                            }
                        },
                        c10110083: {
                            n: "黔东南苗族侗族自治州",
                            c10110004: {
                                n: "凯里"
                            },
                            c10110008: {
                                n: "台江"
                            },
                            c10110012: {
                                n: "镇远"
                            },
                            c10110014: {
                                n: "黄平"
                            },
                            c10110018: {
                                n: "三穗"
                            },
                            c10110022: {
                                n: "锦屏"
                            },
                            c10110027: {
                                n: "从江"
                            },
                            c10110038: {
                                n: "雷山"
                            },
                            c10110042: {
                                n: "榕江"
                            },
                            c10110043: {
                                n: "麻江"
                            },
                            c10110047: {
                                n: "施秉"
                            },
                            c10110051: {
                                n: "岑巩"
                            },
                            c10110056: {
                                n: "天柱"
                            },
                            c10110060: {
                                n: "黎平"
                            },
                            c10110068: {
                                n: "剑河"
                            },
                            c10110078: {
                                n: "丹寨"
                            }
                        },
                        c10110084: {
                            n: "黔南布依族苗族自治州",
                            c10110005: {
                                n: "都匀"
                            },
                            c10110019: {
                                n: "贵定"
                            },
                            c10110024: {
                                n: "瓮安"
                            },
                            c10110028: {
                                n: "荔波"
                            },
                            c10110033: {
                                n: "平塘"
                            },
                            c10110037: {
                                n: "惠水"
                            },
                            c10110050: {
                                n: "长顺"
                            },
                            c10110058: {
                                n: "福泉"
                            },
                            c10110062: {
                                n: "三都"
                            },
                            c10110067: {
                                n: "独山"
                            },
                            c10110072: {
                                n: "罗甸"
                            },
                            c10110077: {
                                n: "龙里"
                            }
                        }
                    },
                    c10111000: {
                        n: "海南",
                        c10111001: {
                            n: "海口",
                            c10111008: {
                                n: "琼山"
                            },
                            c10111023: {
                                n: "秀英区"
                            },
                            c10111024: {
                                n: "龙华区"
                            },
                            c10111025: {
                                n: "美兰区"
                            }
                        },
                        c10111002: {
                            n: "三亚",
                            c10111026: {
                                n: "市辖区"
                            }
                        },
                        c10111022: {
                            n: "省直辖县级",
                            c10111004: {
                                n: "澄迈"
                            },
                            c10111005: {
                                n: "昌江"
                            },
                            c10111006: {
                                n: "文昌"
                            },
                            c10111007: {
                                n: "琼海"
                            },
                            c10111010: {
                                n: "保亭"
                            },
                            c10111011: {
                                n: "琼中"
                            },
                            c10111012: {
                                n: "白沙"
                            },
                            c10111013: {
                                n: "东方"
                            },
                            c10111014: {
                                n: "定安"
                            },
                            c10111015: {
                                n: "临高"
                            },
                            c10111016: {
                                n: "屯昌"
                            },
                            c10111017: {
                                n: "万宁"
                            },
                            c10111018: {
                                n: "乐东"
                            },
                            c10111019: {
                                n: "陵水"
                            },
                            c10111020: {
                                n: "儋州"
                            },
                            c10111021: {
                                n: "五指山"
                            },
                            c10111027: {
                                n: "西沙群岛"
                            },
                            c10111028: {
                                n: "南沙群岛"
                            },
                            c10111029: {
                                n: "中沙群岛的岛礁及其海域"
                            }
                        }
                    },
                    c10112000: {
                        n: "河北",
                        c10112001: {
                            n: "石家庄",
                            c10112145: {
                                n: "长安区"
                            },
                            c10112147: {
                                n: "桥西区"
                            },
                            c10112148: {
                                n: "新华区"
                            },
                            c10112149: {
                                n: "井陉矿区"
                            },
                            c10112151: {
                                n: "藁城区"
                            },
                            c10112150: {
                                n: "裕华区"
                            },
                            c10112152: {
                                n: "鹿泉区"
                            },
                            c10112110: {
                                n: "栾城区"
                            },
                            c10112136: {
                                n: "辛集市"
                            },
                            c10112075: {
                                n: "晋州市"
                            },
                            c10112059: {
                                n: "新乐市"
                            },
                            c10112012: {
                                n: "赵县"
                            },
                            c10112127: {
                                n: "无极县"
                            },
                            c10112042: {
                                n: "正定县"
                            },
                            c10112089: {
                                n: "平山县"
                            },
                            c10112097: {
                                n: "行唐县"
                            },
                            c10112119: {
                                n: "元氏县"
                            },
                            c10112030: {
                                n: "灵寿县"
                            },
                            c10112050: {
                                n: "井陉县"
                            },
                            c10112067: {
                                n: "深泽县"
                            },
                            c10112083: {
                                n: "赞皇县"
                            },
                            c10112021: {
                                n: "高邑县"
                            }
                        },
                        c10112002: {
                            n: "衡水",
                            c10112167: {
                                n: "市辖区"
                            },
                            c10112015: {
                                n: "安平"
                            },
                            c10112053: {
                                n: "武邑"
                            },
                            c10112062: {
                                n: "景县"
                            },
                            c10112069: {
                                n: "枣强"
                            },
                            c10112077: {
                                n: "深州"
                            },
                            c10112113: {
                                n: "武强"
                            },
                            c10112122: {
                                n: "阜城"
                            },
                            c10112130: {
                                n: "故城"
                            },
                            c10112168: {
                                n: "饶阳"
                            },
                            c10112169: {
                                n: "冀州"
                            },
                            c10112187: {
                                n: "桃城区"
                            }
                        },
                        c10112003: {
                            n: "邢台",
                            c10112158: {
                                n: "市辖区"
                            },
                            c10112020: {
                                n: "沙河"
                            },
                            c10112024: {
                                n: "临西"
                            },
                            c10112033: {
                                n: "临城"
                            },
                            c10112041: {
                                n: "宁晋"
                            },
                            c10112049: {
                                n: "巨鹿"
                            },
                            c10112058: {
                                n: "南宫"
                            },
                            c10112066: {
                                n: "威县"
                            },
                            c10112074: {
                                n: "平乡"
                            },
                            c10112082: {
                                n: "任县"
                            },
                            c10112092: {
                                n: "内丘"
                            },
                            c10112100: {
                                n: "柏乡"
                            },
                            c10112109: {
                                n: "隆尧"
                            },
                            c10112118: {
                                n: "新河"
                            },
                            c10112126: {
                                n: "清河"
                            },
                            c10112135: {
                                n: "广宗"
                            },
                            c10112144: {
                                n: "南和"
                            },
                            c10112170: {
                                n: "邢台县"
                            },
                            c10112174: {
                                n: "桥东区"
                            },
                            c10112173: {
                                n: "桥西区"
                            }
                        },
                        c10112004: {
                            n: "邯郸",
                            c10112155: {
                                n: "市辖区"
                            },
                            c10112016: {
                                n: "肥乡"
                            },
                            c10112029: {
                                n: "武安"
                            },
                            c10112038: {
                                n: "磁县"
                            },
                            c10112046: {
                                n: "成安"
                            },
                            c10112054: {
                                n: "鸡泽"
                            },
                            c10112063: {
                                n: "邱县"
                            },
                            c10112070: {
                                n: "大名"
                            },
                            c10112078: {
                                n: "广平"
                            },
                            c10112096: {
                                n: "临漳"
                            },
                            c10112105: {
                                n: "涉县"
                            },
                            c10112114: {
                                n: "永年"
                            },
                            c10112123: {
                                n: "曲周"
                            },
                            c10112131: {
                                n: "馆陶"
                            },
                            c10112140: {
                                n: "魏县"
                            },
                            c10112156: {
                                n: "邯郸县"
                            },
                            c10112188: {
                                n: "邯山区"
                            },
                            c10112189: {
                                n: "复兴区"
                            },
                            c10112190: {
                                n: "峰峰矿区"
                            },
                            c10112191: {
                                n: "丛台区"
                            }
                        },
                        c10112005: {
                            n: "沧州",
                            c10112164: {
                                n: "市辖区"
                            },
                            c10112019: {
                                n: "泊头"
                            },
                            c10112028: {
                                n: "肃宁"
                            },
                            c10112037: {
                                n: "献县"
                            },
                            c10112057: {
                                n: "海兴"
                            },
                            c10112065: {
                                n: "孟村"
                            },
                            c10112073: {
                                n: "南皮"
                            },
                            c10112081: {
                                n: "吴桥"
                            },
                            c10112088: {
                                n: "河间"
                            },
                            c10112095: {
                                n: "任丘"
                            },
                            c10112117: {
                                n: "黄骅"
                            },
                            c10112125: {
                                n: "盐山"
                            },
                            c10112134: {
                                n: "青县"
                            },
                            c10112143: {
                                n: "东光"
                            },
                            c10112165: {
                                n: "沧县"
                            },
                            c10112196: {
                                n: "运河区"
                            },
                            c10112197: {
                                n: "新华区"
                            }
                        },
                        c10112006: {
                            n: "唐山",
                            c10112153: {
                                n: "市辖区"
                            },
                            c10112036: {
                                n: "玉田"
                            },
                            c10112044: {
                                n: "遵化"
                            },
                            c10112052: {
                                n: "唐海"
                            },
                            c10112061: {
                                n: "乐亭"
                            },
                            c10112068: {
                                n: "迁安"
                            },
                            c10112104: {
                                n: "滦县"
                            },
                            c10112112: {
                                n: "滦南"
                            },
                            c10112138: {
                                n: "迁西"
                            },
                            c10112179: {
                                n: "古冶区"
                            },
                            c10112180: {
                                n: "丰润区"
                            },
                            c10112181: {
                                n: "丰南区"
                            },
                            c10112182: {
                                n: "曹妃甸区"
                            },
                            c10112178: {
                                n: "开平区"
                            },
                            c10112177: {
                                n: "路北区"
                            },
                            c10112176: {
                                n: "路南"
                            },
                            c10112175: {
                                n: "路南区"
                            }
                        },
                        c10112007: {
                            n: "廊坊",
                            c10112166: {
                                n: "市辖区"
                            },
                            c10112014: {
                                n: "霸州"
                            },
                            c10112023: {
                                n: "大城"
                            },
                            c10112032: {
                                n: "固安"
                            },
                            c10112040: {
                                n: "大厂"
                            },
                            c10112085: {
                                n: "永清"
                            },
                            c10112091: {
                                n: "文安"
                            },
                            c10112099: {
                                n: "香河"
                            },
                            c10112108: {
                                n: "三河"
                            },
                            c10112185: {
                                n: "广阳区"
                            },
                            c10112186: {
                                n: "安次区"
                            }
                        },
                        c10112008: {
                            n: "秦皇岛",
                            c10112154: {
                                n: "市辖区"
                            },
                            c10112025: {
                                n: "昌黎"
                            },
                            c10112034: {
                                n: "抚宁"
                            },
                            c10112093: {
                                n: "卢龙"
                            },
                            c10112101: {
                                n: "青龙"
                            },
                            c10112183: {
                                n: "山海关区"
                            },
                            c10112184: {
                                n: "海港区"
                            }
                        },
                        c10112009: {
                            n: "承德",
                            c10112162: {
                                n: "市辖区"
                            },
                            c10112018: {
                                n: "宽城"
                            },
                            c10112027: {
                                n: "滦平"
                            },
                            c10112072: {
                                n: "隆化"
                            },
                            c10112080: {
                                n: "平泉"
                            },
                            c10112087: {
                                n: "丰宁"
                            },
                            c10112133: {
                                n: "兴隆"
                            },
                            c10112142: {
                                n: "围场"
                            },
                            c10112163: {
                                n: "承德县"
                            },
                            c10112192: {
                                n: "鹰手营子矿区"
                            },
                            c10112193: {
                                n: "双桥区"
                            },
                            c10112194: {
                                n: "双滦区"
                            },
                            c10112195: {
                                n: "丰宁满族自治县"
                            }
                        },
                        c10112010: {
                            n: "保定",
                            c10112159: {
                                n: "市辖区"
                            },
                            c10112017: {
                                n: "安国"
                            },
                            c10112026: {
                                n: "曲阳"
                            },
                            c10112035: {
                                n: "高阳"
                            },
                            c10112043: {
                                n: "容城"
                            },
                            c10112047: {
                                n: "清苑"
                            },
                            c10112051: {
                                n: "安新"
                            },
                            c10112055: {
                                n: "易县"
                            },
                            c10112060: {
                                n: "蠡县"
                            },
                            c10112064: {
                                n: "唐县"
                            },
                            c10112071: {
                                n: "涿州"
                            },
                            c10112079: {
                                n: "博野"
                            },
                            c10112086: {
                                n: "定州"
                            },
                            c10112094: {
                                n: "阜平"
                            },
                            c10112103: {
                                n: "徐水"
                            },
                            c10112111: {
                                n: "雄县"
                            },
                            c10112115: {
                                n: "涞水"
                            },
                            c10112120: {
                                n: "望都"
                            },
                            c10112124: {
                                n: "涞源"
                            },
                            c10112128: {
                                n: "顺平"
                            },
                            c10112132: {
                                n: "定兴"
                            },
                            c10112141: {
                                n: "高碑店"
                            },
                            c10112160: {
                                n: "满城"
                            },
                            c10112198: {
                                n: "新市区"
                            },
                            c10112199: {
                                n: "南市区"
                            },
                            c10112200: {
                                n: "北市区"
                            }
                        },
                        c10112011: {
                            n: "张家口",
                            c10112161: {
                                n: "市辖区"
                            },
                            c10112013: {
                                n: "万全"
                            },
                            c10112022: {
                                n: "崇礼"
                            },
                            c10112031: {
                                n: "尚义"
                            },
                            c10112039: {
                                n: "赤城"
                            },
                            c10112048: {
                                n: "涿鹿"
                            },
                            c10112056: {
                                n: "阳原"
                            },
                            c10112076: {
                                n: "怀安"
                            },
                            c10112084: {
                                n: "张北"
                            },
                            c10112090: {
                                n: "沽源"
                            },
                            c10112098: {
                                n: "康保"
                            },
                            c10112107: {
                                n: "怀来"
                            },
                            c10112116: {
                                n: "蔚县"
                            },
                            c10112137: {
                                n: "宣化"
                            },
                            c10112172: {
                                n: "桥东区"
                            },
                            c10112171: {
                                n: "桥西区"
                            }
                        }
                    },
                    c10113000: {
                        n: "河南",
                        c10113001: {
                            n: "郑州",
                            c10113130: {
                                n: "金水区"
                            },
                            c10113127: {
                                n: "中原区"
                            },
                            c10113128: {
                                n: "二七区"
                            },
                            c10113129: {
                                n: "管城区"
                            },
                            c10113131: {
                                n: "惠济区"
                            },
                            c10113073: {
                                n: "上街区"
                            },
                            c10113078: {
                                n: "新郑市"
                            },
                            c10113092: {
                                n: "巩义市"
                            },
                            c10113085: {
                                n: "新密市"
                            },
                            c10113034: {
                                n: "登封市"
                            },
                            c10113022: {
                                n: "荥阳市"
                            },
                            c10113026: {
                                n: "中牟县"
                            }
                        },
                        c10113002: {
                            n: "新乡",
                            c10113138: {
                                n: "市辖区"
                            },
                            c10113018: {
                                n: "原阳"
                            },
                            c10113024: {
                                n: "长垣"
                            },
                            c10113030: {
                                n: "辉县"
                            },
                            c10113069: {
                                n: "延津"
                            },
                            c10113076: {
                                n: "获嘉"
                            },
                            c10113081: {
                                n: "封丘"
                            },
                            c10113119: {
                                n: "卫辉"
                            },
                            c10113139: {
                                n: "新乡县"
                            },
                            c10113164: {
                                n: "凤泉区"
                            },
                            c10113163: {
                                n: "红旗区"
                            },
                            c10113162: {
                                n: "牧野区"
                            },
                            c10113161: {
                                n: "卫滨区"
                            }
                        },
                        c10113003: {
                            n: "安阳",
                            c10113135: {
                                n: "市辖区"
                            },
                            c10113049: {
                                n: "汤阴"
                            },
                            c10113056: {
                                n: "内黄"
                            },
                            c10113104: {
                                n: "林州"
                            },
                            c10113112: {
                                n: "滑县"
                            },
                            c10113136: {
                                n: "安阳县"
                            },
                            c10113191: {
                                n: "北关区"
                            },
                            c10113190: {
                                n: "龙安区"
                            },
                            c10113189: {
                                n: "文峰区"
                            },
                            c10113188: {
                                n: "殷都区"
                            }
                        },
                        c10113004: {
                            n: "许昌",
                            c10113143: {
                                n: "市辖区"
                            },
                            c10113038: {
                                n: "长葛"
                            },
                            c10113045: {
                                n: "禹州"
                            },
                            c10113060: {
                                n: "襄城"
                            },
                            c10113096: {
                                n: "鄢陵"
                            },
                            c10113144: {
                                n: "许昌县"
                            },
                            c10113158: {
                                n: "魏都区"
                            }
                        },
                        c10113005: {
                            n: "驻马店",
                            c10113153: {
                                n: "市辖区"
                            },
                            c10113023: {
                                n: "泌阳"
                            },
                            c10113029: {
                                n: "汝南"
                            },
                            c10113037: {
                                n: "西平"
                            },
                            c10113044: {
                                n: "平舆"
                            },
                            c10113051: {
                                n: "正阳"
                            },
                            c10113080: {
                                n: "遂平"
                            },
                            c10113088: {
                                n: "确山"
                            },
                            c10113095: {
                                n: "上蔡"
                            },
                            c10113100: {
                                n: "新蔡"
                            },
                            c10113156: {
                                n: "驿城区"
                            }
                        },
                        c10113006: {
                            n: "漯河",
                            c10113145: {
                                n: "市辖区"
                            },
                            c10113068: {
                                n: "舞阳"
                            },
                            c10113117: {
                                n: "临颍"
                            },
                            c10113176: {
                                n: "郾城区"
                            },
                            c10113175: {
                                n: "源汇区"
                            },
                            c10113174: {
                                n: "召陵区"
                            }
                        },
                        c10113007: {
                            n: "信阳",
                            c10113151: {
                                n: "市辖区"
                            },
                            c10113021: {
                                n: "息县"
                            },
                            c10113027: {
                                n: "罗山"
                            },
                            c10113059: {
                                n: "光山"
                            },
                            c10113064: {
                                n: "淮滨"
                            },
                            c10113072: {
                                n: "商城"
                            },
                            c10113107: {
                                n: "潢川"
                            },
                            c10113114: {
                                n: "新县"
                            },
                            c10113122: {
                                n: "固始"
                            },
                            c10113160: {
                                n: "平桥区"
                            },
                            c10113159: {
                                n: "浉河区"
                            }
                        },
                        c10113008: {
                            n: "周口",
                            c10113152: {
                                n: "市辖区"
                            },
                            c10113032: {
                                n: "淮阳"
                            },
                            c10113040: {
                                n: "鹿邑"
                            },
                            c10113047: {
                                n: "项城"
                            },
                            c10113054: {
                                n: "太康"
                            },
                            c10113083: {
                                n: "西华"
                            },
                            c10113090: {
                                n: "郸城"
                            },
                            c10113097: {
                                n: "沈丘"
                            },
                            c10113102: {
                                n: "扶沟"
                            },
                            c10113110: {
                                n: "商水"
                            },
                            c10113157: {
                                n: "川汇区"
                            }
                        },
                        c10113009: {
                            n: "洛阳",
                            c10113133: {
                                n: "市辖区"
                            },
                            c10113046: {
                                n: "洛宁"
                            },
                            c10113053: {
                                n: "偃师"
                            },
                            c10113061: {
                                n: "宜阳"
                            },
                            c10113067: {
                                n: "汝阳"
                            },
                            c10113075: {
                                n: "栾川"
                            },
                            c10113101: {
                                n: "孟津"
                            },
                            c10113109: {
                                n: "伊川"
                            },
                            c10113116: {
                                n: "新安"
                            },
                            c10113124: {
                                n: "嵩县"
                            },
                            c10113182: {
                                n: "瀍河回族区"
                            },
                            c10113181: {
                                n: "吉利区"
                            },
                            c10113180: {
                                n: "涧西区"
                            },
                            c10113179: {
                                n: "老城区"
                            },
                            c10113178: {
                                n: "洛龙区"
                            },
                            c10113177: {
                                n: "西工区"
                            }
                        },
                        c10113010: {
                            n: "平顶山",
                            c10113134: {
                                n: "市辖区"
                            },
                            c10113052: {
                                n: "舞钢"
                            },
                            c10113066: {
                                n: "鲁山"
                            },
                            c10113074: {
                                n: "汝州"
                            },
                            c10113108: {
                                n: "郏县"
                            },
                            c10113115: {
                                n: "叶县"
                            },
                            c10113123: {
                                n: "宝丰"
                            },
                            c10113171: {
                                n: "卫东区"
                            },
                            c10113170: {
                                n: "新华区"
                            },
                            c10113169: {
                                n: "湛河区"
                            }
                        },
                        c10113011: {
                            n: "三门峡",
                            c10113147: {
                                n: "市辖区"
                            },
                            c10113025: {
                                n: "卢氏"
                            },
                            c10113033: {
                                n: "义马"
                            },
                            c10113041: {
                                n: "陕县"
                            },
                            c10113084: {
                                n: "渑池"
                            },
                            c10113091: {
                                n: "灵宝"
                            },
                            c10113167: {
                                n: "湖滨区"
                            }
                        },
                        c10113012: {
                            n: "南阳",
                            c10113148: {
                                n: "市辖区"
                            },
                            c10113019: {
                                n: "内乡"
                            },
                            c10113042: {
                                n: "西峡"
                            },
                            c10113050: {
                                n: "方城"
                            },
                            c10113057: {
                                n: "唐河"
                            },
                            c10113063: {
                                n: "镇平"
                            },
                            c10113070: {
                                n: "桐柏"
                            },
                            c10113093: {
                                n: "邓州"
                            },
                            c10113098: {
                                n: "淅川"
                            },
                            c10113105: {
                                n: "社旗"
                            },
                            c10113113: {
                                n: "新野"
                            },
                            c10113120: {
                                n: "南召"
                            },
                            c10113173: {
                                n: "宛城区"
                            },
                            c10113172: {
                                n: "卧龙区"
                            }
                        },
                        c10113013: {
                            n: "开封",
                            c10113132: {
                                n: "市辖区"
                            },
                            c10113031: {
                                n: "杞县"
                            },
                            c10113039: {
                                n: "尉氏"
                            },
                            c10113082: {
                                n: "兰考"
                            },
                            c10113089: {
                                n: "通许"
                            },
                            c10113154: {
                                n: "开封"
                            }
                        },
                        c10113014: {
                            n: "商丘",
                            c10113150: {
                                n: "市辖区"
                            },
                            c10113048: {
                                n: "虞城"
                            },
                            c10113055: {
                                n: "永城"
                            },
                            c10113062: {
                                n: "宁陵"
                            },
                            c10113065: {
                                n: "民权"
                            },
                            c10113103: {
                                n: "夏邑"
                            },
                            c10113111: {
                                n: "柘城"
                            },
                            c10113118: {
                                n: "睢县"
                            },
                            c10113166: {
                                n: "梁园区"
                            },
                            c10113165: {
                                n: "睢阳区"
                            }
                        },
                        c10113015: {
                            n: "鹤壁",
                            c10113137: {
                                n: "市辖区"
                            },
                            c10113058: {
                                n: "淇县"
                            },
                            c10113106: {
                                n: "浚县"
                            },
                            c10113187: {
                                n: "淇滨区"
                            },
                            c10113186: {
                                n: "山城区"
                            }
                        },
                        c10113016: {
                            n: "濮阳",
                            c10113142: {
                                n: "市辖区"
                            },
                            c10113020: {
                                n: "南乐"
                            },
                            c10113071: {
                                n: "范县"
                            },
                            c10113077: {
                                n: "清丰"
                            },
                            c10113121: {
                                n: "台前"
                            },
                            c10113155: {
                                n: "濮阳"
                            },
                            c10113168: {
                                n: "华龙区"
                            }
                        },
                        c10113017: {
                            n: "焦作",
                            c10113140: {
                                n: "市辖区"
                            },
                            c10113028: {
                                n: "武陟"
                            },
                            c10113043: {
                                n: "沁阳"
                            },
                            c10113079: {
                                n: "修武"
                            },
                            c10113087: {
                                n: "温县"
                            },
                            c10113094: {
                                n: "博爱"
                            },
                            c10113141: {
                                n: "孟州"
                            },
                            c10113185: {
                                n: "解放区"
                            },
                            c10113184: {
                                n: "山阳区"
                            },
                            c10113183: {
                                n: "中站区"
                            }
                        },
                        c10113126: {
                            n: "省直辖县级",
                            c10113099: {
                                n: "济源"
                            }
                        }
                    },
                    c10114000: {
                        n: "黑龙江",
                        c10114001: {
                            n: "哈尔滨",
                            c10114012: {
                                n: "五常"
                            },
                            c10114016: {
                                n: "呼兰"
                            },
                            c10114026: {
                                n: "阿城"
                            },
                            c10114031: {
                                n: "方正"
                            },
                            c10114035: {
                                n: "延寿"
                            },
                            c10114036: {
                                n: "依兰"
                            },
                            c10114045: {
                                n: "木兰"
                            },
                            c10114049: {
                                n: "巴彦"
                            },
                            c10114066: {
                                n: "通河"
                            },
                            c10114071: {
                                n: "尚志"
                            },
                            c10114075: {
                                n: "双城"
                            },
                            c10114079: {
                                n: "宾县"
                            },
                            c10114082: {
                                n: "道里区"
                            },
                            c10114083: {
                                n: "南岗区"
                            },
                            c10114084: {
                                n: "道外区"
                            },
                            c10114085: {
                                n: "平房区"
                            },
                            c10114086: {
                                n: "松北区"
                            },
                            c10114087: {
                                n: "香坊区"
                            }
                        },
                        c10114002: {
                            n: "绥化",
                            c10114098: {
                                n: "市辖区"
                            },
                            c10114011: {
                                n: "望奎"
                            },
                            c10114015: {
                                n: "青冈"
                            },
                            c10114021: {
                                n: "安达"
                            },
                            c10114039: {
                                n: "庆安"
                            },
                            c10114040: {
                                n: "肇东"
                            },
                            c10114044: {
                                n: "绥棱"
                            },
                            c10114048: {
                                n: "兰西"
                            },
                            c10114074: {
                                n: "明水"
                            },
                            c10114078: {
                                n: "海伦"
                            },
                            c10114109: {
                                n: "北林区"
                            }
                        },
                        c10114003: {
                            n: "佳木斯",
                            c10114094: {
                                n: "市辖区"
                            },
                            c10114013: {
                                n: "同江"
                            },
                            c10114041: {
                                n: "桦南"
                            },
                            c10114046: {
                                n: "抚远"
                            },
                            c10114050: {
                                n: "桦川"
                            },
                            c10114076: {
                                n: "汤原"
                            },
                            c10114080: {
                                n: "富锦"
                            }
                        },
                        c10114004: {
                            n: "牡丹江",
                            c10114096: {
                                n: "市辖区"
                            },
                            c10114010: {
                                n: "穆棱"
                            },
                            c10114014: {
                                n: "海林"
                            },
                            c10114018: {
                                n: "绥芬河"
                            },
                            c10114043: {
                                n: "林口"
                            },
                            c10114047: {
                                n: "东宁"
                            },
                            c10114052: {
                                n: "宁安"
                            },
                            c10114125: {
                                n: "爱民区"
                            },
                            c10114124: {
                                n: "东安区"
                            },
                            c10114123: {
                                n: "西安区"
                            },
                            c10114122: {
                                n: "阳明区"
                            }
                        },
                        c10114005: {
                            n: "齐齐哈尔",
                            c10114088: {
                                n: "市辖区"
                            },
                            c10114019: {
                                n: "克山"
                            },
                            c10114023: {
                                n: "依安"
                            },
                            c10114029: {
                                n: "讷河"
                            },
                            c10114034: {
                                n: "富裕"
                            },
                            c10114038: {
                                n: "泰来"
                            },
                            c10114058: {
                                n: "拜泉"
                            },
                            c10114063: {
                                n: "龙江"
                            },
                            c10114069: {
                                n: "甘南"
                            },
                            c10114073: {
                                n: "克东"
                            },
                            c10114118: {
                                n: "昂昂溪区"
                            },
                            c10114117: {
                                n: "富拉尔基区"
                            },
                            c10114116: {
                                n: "建华区"
                            },
                            c10114115: {
                                n: "龙沙区"
                            },
                            c10114114: {
                                n: "碾子山区"
                            },
                            c10114113: {
                                n: "铁锋区"
                            }
                        },
                        c10114007: {
                            n: "大庆",
                            c10114092: {
                                n: "市辖区"
                            },
                            c10114025: {
                                n: "杜尔伯特"
                            },
                            c10114055: {
                                n: "林甸"
                            },
                            c10114060: {
                                n: "肇州"
                            },
                            c10114065: {
                                n: "肇源"
                            },
                            c10114140: {
                                n: "大同区"
                            },
                            c10114139: {
                                n: "红岗区"
                            },
                            c10114138: {
                                n: "龙凤区"
                            },
                            c10114137: {
                                n: "让胡路区"
                            },
                            c10114136: {
                                n: "萨尔图区"
                            }
                        },
                        c10114008: {
                            n: "大兴安岭",
                            c10114037: {
                                n: "呼玛"
                            },
                            c10114072: {
                                n: "塔河"
                            },
                            c10114077: {
                                n: "漠河"
                            }
                        },
                        c10114009: {
                            n: "鸡西",
                            c10114089: {
                                n: "市辖区"
                            },
                            c10114027: {
                                n: "密山"
                            },
                            c10114056: {
                                n: "虎林"
                            },
                            c10114061: {
                                n: "鸡东"
                            },
                            c10114129: {
                                n: "城子河区"
                            },
                            c10114128: {
                                n: "恒山区"
                            },
                            c10114127: {
                                n: "鸡冠区"
                            },
                            c10114126: {
                                n: "梨树区"
                            }
                        },
                        c10114020: {
                            n: "鹤岗",
                            c10114090: {
                                n: "市辖区"
                            },
                            c10114054: {
                                n: "萝北"
                            },
                            c10114059: {
                                n: "绥滨"
                            },
                            c10114135: {
                                n: "东山区"
                            },
                            c10114134: {
                                n: "工农区"
                            },
                            c10114133: {
                                n: "南山区"
                            },
                            c10114132: {
                                n: "向阳区"
                            },
                            c10114131: {
                                n: "兴安区"
                            }
                        },
                        c10114024: {
                            n: "双鸭山",
                            c10114091: {
                                n: "市辖区"
                            },
                            c10114017: {
                                n: "饶河"
                            },
                            c10114030: {
                                n: "宝清"
                            },
                            c10114064: {
                                n: "友谊"
                            },
                            c10114070: {
                                n: "集贤"
                            },
                            c10114112: {
                                n: "宝山区"
                            },
                            c10114111: {
                                n: "尖山区"
                            },
                            c10114110: {
                                n: "岭东区"
                            }
                        },
                        c10114042: {
                            n: "伊春",
                            c10114093: {
                                n: "市辖区"
                            },
                            c10114051: {
                                n: "铁力"
                            },
                            c10114081: {
                                n: "嘉荫"
                            },
                            c10114108: {
                                n: "汤旺河区"
                            },
                            c10114107: {
                                n: "乌马河区"
                            },
                            c10114106: {
                                n: "乌伊岭区"
                            },
                            c10114105: {
                                n: "五营区"
                            },
                            c10114104: {
                                n: "西林区"
                            },
                            c10114103: {
                                n: "新青区"
                            },
                            c10114102: {
                                n: "伊春区"
                            },
                            c10114101: {
                                n: "友好区"
                            }
                        },
                        c10114053: {
                            n: "黑河",
                            c10114097: {
                                n: "市辖区"
                            },
                            c10114006: {
                                n: "北安"
                            },
                            c10114022: {
                                n: "逊克"
                            },
                            c10114028: {
                                n: "嫩江"
                            },
                            c10114057: {
                                n: "孙吴"
                            },
                            c10114068: {
                                n: "五大连池"
                            },
                            c10114130: {
                                n: "爱辉区"
                            }
                        },
                        c10114067: {
                            n: "七台河",
                            c10114095: {
                                n: "市辖区"
                            },
                            c10114032: {
                                n: "勃利"
                            },
                            c10114121: {
                                n: "茄子河区"
                            },
                            c10114120: {
                                n: "桃山区"
                            },
                            c10114119: {
                                n: "新兴区"
                            }
                        }
                    },
                    c10115000: {
                        n: "湖北",
                        c10115001: {
                            n: "武汉",
                            c10115087: {
                                n: "江汉区"
                            },
                            c10115091: {
                                n: "洪山区"
                            },
                            c10115072: {
                                n: "武昌区"
                            },
                            c10115086: {
                                n: "江岸区"
                            },
                            c10115043: {
                                n: "黄陂区"
                            },
                            c10115088: {
                                n: "硚口区"
                            },
                            c10115094: {
                                n: "江夏区"
                            },
                            c10115077: {
                                n: "蔡甸区"
                            },
                            c10115089: {
                                n: "汉阳区"
                            },
                            c10115090: {
                                n: "青山区"
                            },
                            c10115092: {
                                n: "东西湖区"
                            },
                            c10115093: {
                                n: "汉南区"
                            },
                            c10115080: {
                                n: "新洲区"
                            }
                        },
                        c10115002: {
                            n: "黄石",
                            c10115095: {
                                n: "市辖区"
                            },
                            c10115039: {
                                n: "阳新"
                            },
                            c10115073: {
                                n: "大冶"
                            },
                            c10115152: {
                                n: "黄石港区"
                            },
                            c10115151: {
                                n: "铁山区"
                            },
                            c10115150: {
                                n: "西塞山区"
                            },
                            c10115149: {
                                n: "下陆区"
                            }
                        },
                        c10115004: {
                            n: "鄂州",
                            c10115100: {
                                n: "市辖区"
                            },
                            c10115156: {
                                n: "鄂城区"
                            },
                            c10115155: {
                                n: "华容区"
                            },
                            c10115154: {
                                n: "梁子湖区"
                            }
                        },
                        c10115006: {
                            n: "咸宁",
                            c10115109: {
                                n: "市辖区"
                            },
                            c10115044: {
                                n: "通山"
                            },
                            c10115048: {
                                n: "通城"
                            },
                            c10115053: {
                                n: "嘉鱼"
                            },
                            c10115081: {
                                n: "崇阳"
                            },
                            c10115110: {
                                n: "赤壁"
                            },
                            c10115141: {
                                n: "咸安区"
                            }
                        },
                        c10115007: {
                            n: "十堰",
                            c10115096: {
                                n: "市辖区"
                            },
                            c10115021: {
                                n: "竹溪"
                            },
                            c10115045: {
                                n: "郧县"
                            },
                            c10115049: {
                                n: "房县"
                            },
                            c10115054: {
                                n: "竹山"
                            },
                            c10115058: {
                                n: "郧西"
                            },
                            c10115082: {
                                n: "丹江口"
                            },
                            c10115144: {
                                n: "茅箭区"
                            },
                            c10115143: {
                                n: "张湾区"
                            }
                        },
                        c10115008: {
                            n: "宜昌",
                            c10115097: {
                                n: "市辖区"
                            },
                            c10115018: {
                                n: "五峰"
                            },
                            c10115023: {
                                n: "兴山"
                            },
                            c10115042: {
                                n: "远安"
                            },
                            c10115047: {
                                n: "枝江"
                            },
                            c10115051: {
                                n: "长阳"
                            },
                            c10115056: {
                                n: "秭归"
                            },
                            c10115079: {
                                n: "当阳"
                            },
                            c10115098: {
                                n: "宜都"
                            },
                            c10115136: {
                                n: "点军区"
                            },
                            c10115135: {
                                n: "伍家岗区"
                            },
                            c10115134: {
                                n: "西陵区"
                            },
                            c10115133: {
                                n: "猇亭区"
                            },
                            c10115132: {
                                n: "夷陵区"
                            }
                        },
                        c10115009: {
                            n: "恩施",
                            c10115028: {
                                n: "建始"
                            },
                            c10115032: {
                                n: "鹤峰"
                            },
                            c10115035: {
                                n: "来凤"
                            },
                            c10115040: {
                                n: "利川"
                            },
                            c10115064: {
                                n: "巴东"
                            },
                            c10115068: {
                                n: "宣恩"
                            },
                            c10115074: {
                                n: "咸丰"
                            },
                            c10115113: {
                                n: "恩施市"
                            }
                        },
                        c10115010: {
                            n: "荆州",
                            c10115105: {
                                n: "市辖区"
                            },
                            c10115025: {
                                n: "监利"
                            },
                            c10115030: {
                                n: "公安"
                            },
                            c10115037: {
                                n: "洪湖"
                            },
                            c10115061: {
                                n: "石首"
                            },
                            c10115065: {
                                n: "松滋"
                            },
                            c10115106: {
                                n: "江陵"
                            },
                            c10115146: {
                                n: "荆州区"
                            },
                            c10115145: {
                                n: "沙市区"
                            }
                        },
                        c10115011: {
                            n: "黄冈",
                            c10115107: {
                                n: "市辖区"
                            },
                            c10115017: {
                                n: "麻城"
                            },
                            c10115022: {
                                n: "浠水"
                            },
                            c10115027: {
                                n: "英山"
                            },
                            c10115031: {
                                n: "黄梅"
                            },
                            c10115055: {
                                n: "红安"
                            },
                            c10115059: {
                                n: "罗田"
                            },
                            c10115063: {
                                n: "蕲春"
                            },
                            c10115067: {
                                n: "武穴"
                            },
                            c10115108: {
                                n: "团风"
                            },
                            c10115153: {
                                n: "黄州区"
                            }
                        },
                        c10115012: {
                            n: "荆门",
                            c10115101: {
                                n: "市辖区"
                            },
                            c10115033: {
                                n: "钟祥"
                            },
                            c10115070: {
                                n: "京山"
                            },
                            c10115102: {
                                n: "沙洋"
                            },
                            c10115148: {
                                n: "东宝区"
                            },
                            c10115147: {
                                n: "掇刀区"
                            }
                        },
                        c10115013: {
                            n: "孝感",
                            c10115103: {
                                n: "市辖区"
                            },
                            c10115036: {
                                n: "汉川"
                            },
                            c10115041: {
                                n: "云梦"
                            },
                            c10115069: {
                                n: "大悟"
                            },
                            c10115075: {
                                n: "应城"
                            },
                            c10115078: {
                                n: "安陆"
                            },
                            c10115104: {
                                n: "孝昌"
                            },
                            c10115137: {
                                n: "孝南区"
                            }
                        },
                        c10115014: {
                            n: "襄阳",
                            c10115099: {
                                n: "市辖区"
                            },
                            c10115019: {
                                n: "南漳"
                            },
                            c10115024: {
                                n: "枣阳"
                            },
                            c10115029: {
                                n: "保康"
                            },
                            c10115052: {
                                n: "宜城"
                            },
                            c10115057: {
                                n: "谷城"
                            },
                            c10115060: {
                                n: "老河口"
                            },
                            c10115140: {
                                n: "樊城区"
                            },
                            c10115139: {
                                n: "襄城区"
                            },
                            c10115138: {
                                n: "襄州区"
                            }
                        },
                        c10115062: {
                            n: "随州",
                            c10115111: {
                                n: "市辖区"
                            },
                            c10115046: {
                                n: "广水"
                            },
                            c10115112: {
                                n: "随县"
                            },
                            c10115142: {
                                n: "曾都区"
                            }
                        },
                        c10115085: {
                            n: "省直辖县级",
                            c10115016: {
                                n: "神农架"
                            },
                            c10115034: {
                                n: "天门"
                            },
                            c10115066: {
                                n: "仙桃"
                            },
                            c10115071: {
                                n: "潜江"
                            }
                        }
                    },
                    c10116000: {
                        n: "湖南",
                        c10116001: {
                            n: "长沙",
                            c10116098: {
                                n: "芙蓉区"
                            },
                            c10116099: {
                                n: "天心区"
                            },
                            c10116100: {
                                n: "岳麓区"
                            },
                            c10116102: {
                                n: "雨花区"
                            },
                            c10116071: {
                                n: "望城区"
                            },
                            c10116101: {
                                n: "开福区"
                            },
                            c10116033: {
                                n: "浏阳市"
                            },
                            c10116103: {
                                n: "长沙县"
                            },
                            c10116028: {
                                n: "宁乡县"
                            }
                        },
                        c10116002: {
                            n: "株洲",
                            c10116104: {
                                n: "市辖区"
                            },
                            c10116015: {
                                n: "醴陵"
                            },
                            c10116054: {
                                n: "茶陵"
                            },
                            c10116060: {
                                n: "炎陵"
                            },
                            c10116090: {
                                n: "攸县"
                            },
                            c10116105: {
                                n: "株洲县"
                            },
                            c10116148: {
                                n: "荷塘区"
                            },
                            c10116147: {
                                n: "芦淞区"
                            },
                            c10116146: {
                                n: "石峰区"
                            },
                            c10116145: {
                                n: "天元区"
                            }
                        },
                        c10116003: {
                            n: "益阳",
                            c10116117: {
                                n: "市辖区"
                            },
                            c10116016: {
                                n: "沅江"
                            },
                            c10116048: {
                                n: "桃江"
                            },
                            c10116055: {
                                n: "南县"
                            },
                            c10116091: {
                                n: "安化"
                            },
                            c10116157: {
                                n: "赫山区"
                            },
                            c10116156: {
                                n: "资阳区"
                            }
                        },
                        c10116004: {
                            n: "岳阳",
                            c10116112: {
                                n: "市辖区"
                            },
                            c10116018: {
                                n: "平江"
                            },
                            c10116050: {
                                n: "湘阴"
                            },
                            c10116057: {
                                n: "临湘"
                            },
                            c10116062: {
                                n: "汨罗"
                            },
                            c10116093: {
                                n: "华容"
                            },
                            c10116113: {
                                n: "岳阳县"
                            },
                            c10116153: {
                                n: "君山区"
                            },
                            c10116152: {
                                n: "岳阳楼区"
                            },
                            c10116151: {
                                n: "云溪区"
                            }
                        },
                        c10116005: {
                            n: "常德",
                            c10116114: {
                                n: "市辖区"
                            },
                            c10116029: {
                                n: "桃源"
                            },
                            c10116034: {
                                n: "石门"
                            },
                            c10116044: {
                                n: "临澧"
                            },
                            c10116072: {
                                n: "汉寿"
                            },
                            c10116076: {
                                n: "澧县"
                            },
                            c10116081: {
                                n: "安乡"
                            },
                            c10116115: {
                                n: "津市"
                            },
                            c10116174: {
                                n: "鼎城区"
                            },
                            c10116173: {
                                n: "武陵区"
                            }
                        },
                        c10116007: {
                            n: "娄底",
                            c10116122: {
                                n: "市辖区"
                            },
                            c10116021: {
                                n: "双峰"
                            },
                            c10116026: {
                                n: "新化"
                            },
                            c10116065: {
                                n: "冷水江"
                            },
                            c10116069: {
                                n: "涟源"
                            },
                            c10116163: {
                                n: "娄星区"
                            }
                        },
                        c10116008: {
                            n: "怀化",
                            c10116120: {
                                n: "市辖区"
                            },
                            c10116017: {
                                n: "通道"
                            },
                            c10116022: {
                                n: "会同"
                            },
                            c10116027: {
                                n: "辰溪"
                            },
                            c10116032: {
                                n: "洪江"
                            },
                            c10116049: {
                                n: "芷江"
                            },
                            c10116056: {
                                n: "溆浦"
                            },
                            c10116061: {
                                n: "靖州"
                            },
                            c10116066: {
                                n: "新晃"
                            },
                            c10116070: {
                                n: "沅陵"
                            },
                            c10116086: {
                                n: "麻阳"
                            },
                            c10116121: {
                                n: "中方"
                            },
                            c10116165: {
                                n: "鹤城区"
                            },
                            c10116164: {
                                n: "麻阳苗族自治县"
                            }
                        },
                        c10116009: {
                            n: "衡阳",
                            c10116108: {
                                n: "市辖区"
                            },
                            c10116025: {
                                n: "耒阳"
                            },
                            c10116031: {
                                n: "衡南"
                            },
                            c10116036: {
                                n: "衡山"
                            },
                            c10116068: {
                                n: "常宁"
                            },
                            c10116074: {
                                n: "衡东"
                            },
                            c10116077: {
                                n: "祁东"
                            },
                            c10116109: {
                                n: "衡阳县"
                            },
                            c10116170: {
                                n: "南岳区"
                            },
                            c10116169: {
                                n: "石鼓区"
                            },
                            c10116168: {
                                n: "雁峰区"
                            },
                            c10116167: {
                                n: "蒸湘区"
                            },
                            c10116166: {
                                n: "珠晖区"
                            }
                        },
                        c10116010: {
                            n: "邵阳",
                            c10116110: {
                                n: "市辖区"
                            },
                            c10116037: {
                                n: "新宁"
                            },
                            c10116041: {
                                n: "新邵"
                            },
                            c10116046: {
                                n: "武冈"
                            },
                            c10116052: {
                                n: "邵东"
                            },
                            c10116078: {
                                n: "城步"
                            },
                            c10116084: {
                                n: "绥宁"
                            },
                            c10116088: {
                                n: "洞口"
                            },
                            c10116095: {
                                n: "隆回"
                            },
                            c10116132: {
                                n: "邵阳县"
                            },
                            c10116162: {
                                n: "北塔区"
                            },
                            c10116161: {
                                n: "大祥区"
                            },
                            c10116160: {
                                n: "双清区"
                            }
                        },
                        c10116011: {
                            n: "郴州",
                            c10116118: {
                                n: "市辖区"
                            },
                            c10116019: {
                                n: "桂阳"
                            },
                            c10116023: {
                                n: "宜章"
                            },
                            c10116045: {
                                n: "桂东"
                            },
                            c10116051: {
                                n: "临武"
                            },
                            c10116058: {
                                n: "安仁"
                            },
                            c10116063: {
                                n: "永兴"
                            },
                            c10116083: {
                                n: "资兴"
                            },
                            c10116087: {
                                n: "汝城"
                            },
                            c10116094: {
                                n: "嘉禾"
                            },
                            c10116172: {
                                n: "北湖区"
                            },
                            c10116171: {
                                n: "苏仙区"
                            }
                        },
                        c10116013: {
                            n: "张家界",
                            c10116116: {
                                n: "市辖区"
                            },
                            c10116040: {
                                n: "桑植"
                            },
                            c10116082: {
                                n: "慈利"
                            },
                            c10116150: {
                                n: "武陵源区"
                            },
                            c10116149: {
                                n: "永定区"
                            }
                        },
                        c10116014: {
                            n: "湘潭",
                            c10116106: {
                                n: "市辖区"
                            },
                            c10116043: {
                                n: "湘乡"
                            },
                            c10116080: {
                                n: "韶山"
                            },
                            c10116107: {
                                n: "湘潭县"
                            },
                            c10116159: {
                                n: "雨湖区"
                            },
                            c10116158: {
                                n: "岳塘区"
                            }
                        },
                        c10116075: {
                            n: "永州",
                            c10116119: {
                                n: "市辖区"
                            },
                            c10116038: {
                                n: "东安"
                            },
                            c10116042: {
                                n: "新田"
                            },
                            c10116047: {
                                n: "蓝山"
                            },
                            c10116053: {
                                n: "江永"
                            },
                            c10116059: {
                                n: "双牌"
                            },
                            c10116079: {
                                n: "祁阳"
                            },
                            c10116085: {
                                n: "宁远"
                            },
                            c10116089: {
                                n: "江华"
                            },
                            c10116096: {
                                n: "道县"
                            },
                            c10116155: {
                                n: "冷水滩区"
                            },
                            c10116154: {
                                n: "零陵区"
                            }
                        },
                        c10116097: {
                            n: "湘西土家族苗族自治州",
                            c10116006: {
                                n: "吉首"
                            },
                            c10116020: {
                                n: "凤凰"
                            },
                            c10116024: {
                                n: "永顺"
                            },
                            c10116030: {
                                n: "花垣"
                            },
                            c10116035: {
                                n: "泸溪"
                            },
                            c10116064: {
                                n: "龙山"
                            },
                            c10116067: {
                                n: "保靖"
                            },
                            c10116073: {
                                n: "古丈"
                            }
                        }
                    },
                    c10117000: {
                        n: "吉林",
                        c10117001: {
                            n: "长春",
                            c10117013: {
                                n: "农安"
                            },
                            c10117014: {
                                n: "德惠"
                            },
                            c10117030: {
                                n: "双阳"
                            },
                            c10117033: {
                                n: "九台"
                            },
                            c10117036: {
                                n: "榆树"
                            },
                            c10117050: {
                                n: "南关区"
                            },
                            c10117051: {
                                n: "宽城区"
                            },
                            c10117052: {
                                n: "朝阳区"
                            },
                            c10117053: {
                                n: "二道区"
                            },
                            c10117054: {
                                n: "绿园区"
                            }
                        },
                        c10117002: {
                            n: "吉林",
                            c10117055: {
                                n: "市辖区"
                            },
                            c10117018: {
                                n: "磐石"
                            },
                            c10117021: {
                                n: "蛟河"
                            },
                            c10117039: {
                                n: "永吉"
                            },
                            c10117041: {
                                n: "桦甸"
                            },
                            c10117043: {
                                n: "舒兰"
                            },
                            c10117104: {
                                n: "昌邑区"
                            },
                            c10117103: {
                                n: "船营区"
                            },
                            c10117102: {
                                n: "丰满区"
                            },
                            c10117101: {
                                n: "龙潭区"
                            }
                        },
                        c10117004: {
                            n: "通化",
                            c10117059: {
                                n: "市辖区"
                            },
                            c10117005: {
                                n: "梅河口"
                            },
                            c10117010: {
                                n: "辉南"
                            },
                            c10117020: {
                                n: "集安"
                            },
                            c10117027: {
                                n: "柳河"
                            },
                            c10117060: {
                                n: "通化县"
                            },
                            c10117089: {
                                n: "东昌区"
                            },
                            c10117088: {
                                n: "二道江区"
                            }
                        },
                        c10117006: {
                            n: "四平",
                            c10117056: {
                                n: "市辖区"
                            },
                            c10117016: {
                                n: "犁树"
                            },
                            c10117035: {
                                n: "双辽"
                            },
                            c10117038: {
                                n: "公主岭"
                            },
                            c10117057: {
                                n: "伊通"
                            },
                            c10117094: {
                                n: "梨树县"
                            },
                            c10117093: {
                                n: "铁东区"
                            },
                            c10117092: {
                                n: "铁西区"
                            }
                        },
                        c10117007: {
                            n: "白城",
                            c10117063: {
                                n: "市辖区"
                            },
                            c10117023: {
                                n: "通榆"
                            },
                            c10117025: {
                                n: "洮南"
                            },
                            c10117045: {
                                n: "大安"
                            },
                            c10117047: {
                                n: "镇赉"
                            },
                            c10117100: {
                                n: "洮北区"
                            }
                        },
                        c10117008: {
                            n: "松原",
                            c10117062: {
                                n: "市辖区"
                            },
                            c10117015: {
                                n: "前郭"
                            },
                            c10117017: {
                                n: "乾安"
                            },
                            c10117034: {
                                n: "扶余"
                            },
                            c10117037: {
                                n: "长岭"
                            },
                            c10117091: {
                                n: "宁江"
                            },
                            c10117090: {
                                n: "宁江区"
                            }
                        },
                        c10117028: {
                            n: "辽源",
                            c10117058: {
                                n: "市辖区"
                            },
                            c10117011: {
                                n: "东辽"
                            },
                            c10117031: {
                                n: "东丰"
                            },
                            c10117096: {
                                n: "龙山区"
                            },
                            c10117095: {
                                n: "西安区"
                            }
                        },
                        c10117048: {
                            n: "白山",
                            c10117061: {
                                n: "市辖区"
                            },
                            c10117019: {
                                n: "靖宇"
                            },
                            c10117022: {
                                n: "抚松"
                            },
                            c10117040: {
                                n: "临江"
                            },
                            c10117042: {
                                n: "长白"
                            },
                            c10117099: {
                                n: "浑江区"
                            },
                            c10117098: {
                                n: "江源区"
                            },
                            c10117097: {
                                n: "长白朝鲜族自治县"
                            }
                        },
                        c10117049: {
                            n: "延边朝鲜族自治州",
                            c10117003: {
                                n: "延吉"
                            },
                            c10117009: {
                                n: "安图"
                            },
                            c10117012: {
                                n: "图们"
                            },
                            c10117024: {
                                n: "珲春"
                            },
                            c10117026: {
                                n: "和龙"
                            },
                            c10117029: {
                                n: "敦化"
                            },
                            c10117032: {
                                n: "龙井"
                            },
                            c10117046: {
                                n: "汪清"
                            }
                        }
                    },
                    c10118000: {
                        n: "江苏",
                        c10118001: {
                            n: "南京",
                            c10118079: {
                                n: "鼓楼区"
                            },
                            c10118075: {
                                n: "玄武区"
                            },
                            c10118077: {
                                n: "秦淮区"
                            },
                            c10118078: {
                                n: "建邺区"
                            },
                            c10118025: {
                                n: "江宁区"
                            },
                            c10118052: {
                                n: "六合区"
                            },
                            c10118081: {
                                n: "浦口区"
                            },
                            c10118082: {
                                n: "栖霞区"
                            },
                            c10118030: {
                                n: "溧水区"
                            },
                            c10118056: {
                                n: "高淳区"
                            },
                            c10118083: {
                                n: "雨花台区"
                            }
                        },
                        c10118002: {
                            n: "苏州",
                            c10118226: {
                                n: "虎丘区"
                            },
                            c10118019: {
                                n: "吴江区"
                            },
                            c10118225: {
                                n: "吴中区"
                            },
                            c10118224: {
                                n: "相城区"
                            },
                            c10118227: {
                                n: "姑苏区"
                            },
                            c10118012: {
                                n: "昆山市"
                            },
                            c10118017: {
                                n: "常熟市"
                            },
                            c10118013: {
                                n: "张家港市"
                            },
                            c10118020: {
                                n: "太仓市"
                            }
                        },
                        c10118003: {
                            n: "无锡",
                            c10118244: {
                                n: "梁溪区"
                            },
                            c10118015: {
                                n: "江阴市"
                            },
                            c10118014: {
                                n: "宜兴市"
                            },
                            c10118218: {
                                n: "惠山区"
                            },
                            c10118216: {
                                n: "锡山区"
                            },
                            c10118220: {
                                n: "滨湖区"
                            },
                            c10118245: {
                                n: "新吴区"
                            }
                        },
                        c10118004: {
                            n: "徐州",
                            c10118085: {
                                n: "市辖区"
                            },
                            c10118039: {
                                n: "丰县"
                            },
                            c10118045: {
                                n: "睢宁"
                            },
                            c10118067: {
                                n: "沛县"
                            },
                            c10118071: {
                                n: "新沂"
                            },
                            c10118086: {
                                n: "邳州"
                            },
                            c10118213: {
                                n: "鼓楼区"
                            },
                            c10118212: {
                                n: "贾汪区"
                            },
                            c10118211: {
                                n: "泉山区"
                            },
                            c10118210: {
                                n: "铜山区"
                            },
                            c10118209: {
                                n: "云龙区"
                            }
                        },
                        c10118005: {
                            n: "常州",
                            c10118087: {
                                n: "市辖区"
                            },
                            c10118043: {
                                n: "金坛"
                            },
                            c10118072: {
                                n: "溧阳"
                            },
                            c10118243: {
                                n: "戚墅堰区"
                            },
                            c10118242: {
                                n: "天宁"
                            },
                            c10118241: {
                                n: "天宁区"
                            },
                            c10118240: {
                                n: "武进区"
                            },
                            c10118239: {
                                n: "新北区"
                            },
                            c10118238: {
                                n: "钟楼区"
                            }
                        },
                        c10118006: {
                            n: "镇江",
                            c10118094: {
                                n: "市辖区"
                            },
                            c10118046: {
                                n: "句容"
                            },
                            c10118070: {
                                n: "丹阳"
                            },
                            c10118074: {
                                n: "扬中"
                            },
                            c10118203: {
                                n: "丹徒区"
                            },
                            c10118202: {
                                n: "京口区"
                            },
                            c10118201: {
                                n: "润州区"
                            }
                        },
                        c10118007: {
                            n: "连云港",
                            c10118090: {
                                n: "市辖区"
                            },
                            c10118032: {
                                n: "东海"
                            },
                            c10118035: {
                                n: "灌云"
                            },
                            c10118061: {
                                n: "赣榆"
                            },
                            c10118065: {
                                n: "灌南"
                            },
                            c10118233: {
                                n: "海州区"
                            },
                            c10118232: {
                                n: "连云区"
                            },
                            c10118231: {
                                n: "新浦区"
                            }
                        },
                        c10118009: {
                            n: "盐城",
                            c10118092: {
                                n: "市辖区"
                            },
                            c10118022: {
                                n: "滨海"
                            },
                            c10118026: {
                                n: "射阳"
                            },
                            c10118031: {
                                n: "大丰"
                            },
                            c10118048: {
                                n: "响水"
                            },
                            c10118053: {
                                n: "阜宁"
                            },
                            c10118057: {
                                n: "建湖"
                            },
                            c10118060: {
                                n: "东台"
                            },
                            c10118208: {
                                n: "亭湖区"
                            },
                            c10118207: {
                                n: "盐都区"
                            }
                        },
                        c10118010: {
                            n: "扬州",
                            c10118093: {
                                n: "市辖区"
                            },
                            c10118044: {
                                n: "仪征"
                            },
                            c10118047: {
                                n: "宝应"
                            },
                            c10118073: {
                                n: "高邮"
                            },
                            c10118206: {
                                n: "广陵区"
                            },
                            c10118205: {
                                n: "邗江区"
                            },
                            c10118204: {
                                n: "江都区"
                            }
                        },
                        c10118011: {
                            n: "南通",
                            c10118089: {
                                n: "市辖区"
                            },
                            c10118028: {
                                n: "如皋"
                            },
                            c10118033: {
                                n: "海门"
                            },
                            c10118036: {
                                n: "海安"
                            },
                            c10118055: {
                                n: "如东"
                            },
                            c10118062: {
                                n: "启东"
                            },
                            c10118230: {
                                n: "崇川区"
                            },
                            c10118229: {
                                n: "港闸区"
                            },
                            c10118228: {
                                n: "通州区"
                            }
                        },
                        c10118016: {
                            n: "淮安",
                            c10118091: {
                                n: "市辖区"
                            },
                            c10118023: {
                                n: "金湖"
                            },
                            c10118027: {
                                n: "盱眙"
                            },
                            c10118049: {
                                n: "洪泽"
                            },
                            c10118054: {
                                n: "涟水"
                            },
                            c10118237: {
                                n: "淮安区"
                            },
                            c10118236: {
                                n: "淮阴区"
                            },
                            c10118235: {
                                n: "清河区"
                            },
                            c10118234: {
                                n: "清浦区"
                            }
                        },
                        c10118051: {
                            n: "泰州",
                            c10118095: {
                                n: "市辖区"
                            },
                            c10118018: {
                                n: "泰兴"
                            },
                            c10118024: {
                                n: "靖江"
                            },
                            c10118029: {
                                n: "姜堰"
                            },
                            c10118059: {
                                n: "兴化"
                            },
                            c10118223: {
                                n: "高港区"
                            },
                            c10118222: {
                                n: "海陵区"
                            }
                        },
                        c10118063: {
                            n: "宿迁",
                            c10118096: {
                                n: "市辖区"
                            },
                            c10118034: {
                                n: "沭阳"
                            },
                            c10118037: {
                                n: "泗阳"
                            },
                            c10118066: {
                                n: "泗洪"
                            },
                            c10118215: {
                                n: "宿城区"
                            },
                            c10118214: {
                                n: "宿豫区"
                            }
                        }
                    },
                    c10119000: {
                        n: "江西",
                        c10119001: {
                            n: "南昌",
                            c10119089: {
                                n: "东湖区"
                            },
                            c10119090: {
                                n: "西湖区"
                            },
                            c10119093: {
                                n: "青山湖区"
                            },
                            c10119091: {
                                n: "青云谱区"
                            },
                            c10119049: {
                                n: "新建区"
                            },
                            c10119092: {
                                n: "湾里区"
                            },
                            c10119094: {
                                n: "南昌县"
                            },
                            c10119012: {
                                n: "进贤县"
                            },
                            c10119054: {
                                n: "安义县"
                            }
                        },
                        c10119002: {
                            n: "九江",
                            c10119099: {
                                n: "市辖区"
                            },
                            c10119028: {
                                n: "湖口"
                            },
                            c10119032: {
                                n: "瑞昌"
                            },
                            c10119037: {
                                n: "彭泽"
                            },
                            c10119043: {
                                n: "永修"
                            },
                            c10119063: {
                                n: "修水"
                            },
                            c10119069: {
                                n: "星子"
                            },
                            c10119074: {
                                n: "德安"
                            },
                            c10119078: {
                                n: "都昌"
                            },
                            c10119084: {
                                n: "武宁"
                            },
                            c10119100: {
                                n: "九江县"
                            },
                            c10119101: {
                                n: "共青城"
                            },
                            c10119120: {
                                n: "庐山区"
                            },
                            c10119119: {
                                n: "浔阳区"
                            }
                        },
                        c10119003: {
                            n: "景德镇",
                            c10119095: {
                                n: "市辖区"
                            },
                            c10119016: {
                                n: "浮梁"
                            },
                            c10119053: {
                                n: "乐平"
                            },
                            c10119122: {
                                n: "昌江区"
                            },
                            c10119121: {
                                n: "珠山区"
                            }
                        },
                        c10119004: {
                            n: "上饶",
                            c10119110: {
                                n: "市辖区"
                            },
                            c10119015: {
                                n: "余干"
                            },
                            c10119025: {
                                n: "万年"
                            },
                            c10119030: {
                                n: "横峰"
                            },
                            c10119035: {
                                n: "德兴"
                            },
                            c10119052: {
                                n: "玉山"
                            },
                            c10119057: {
                                n: "弋阳"
                            },
                            c10119061: {
                                n: "广丰"
                            },
                            c10119066: {
                                n: "铅山"
                            },
                            c10119072: {
                                n: "婺源"
                            },
                            c10119111: {
                                n: "上饶县"
                            },
                            c10119112: {
                                n: "鄱阳"
                            },
                            c10119116: {
                                n: "信州区"
                            }
                        },
                        c10119005: {
                            n: "鹰潭",
                            c10119103: {
                                n: "市辖区"
                            },
                            c10119027: {
                                n: "贵溪"
                            },
                            c10119068: {
                                n: "余江"
                            },
                            c10119113: {
                                n: "月湖区"
                            }
                        },
                        c10119006: {
                            n: "宜春",
                            c10119108: {
                                n: "市辖区"
                            },
                            c10119011: {
                                n: "铜鼓"
                            },
                            c10119033: {
                                n: "上高"
                            },
                            c10119038: {
                                n: "靖安"
                            },
                            c10119044: {
                                n: "丰城"
                            },
                            c10119047: {
                                n: "万载"
                            },
                            c10119070: {
                                n: "宜丰"
                            },
                            c10119075: {
                                n: "奉新"
                            },
                            c10119079: {
                                n: "高安"
                            },
                            c10119085: {
                                n: "樟树"
                            },
                            c10119114: {
                                n: "袁州区"
                            }
                        },
                        c10119007: {
                            n: "萍乡",
                            c10119096: {
                                n: "市辖区"
                            },
                            c10119021: {
                                n: "莲花"
                            },
                            c10119097: {
                                n: "上栗"
                            },
                            c10119098: {
                                n: "芦溪"
                            },
                            c10119118: {
                                n: "安源区"
                            },
                            c10119117: {
                                n: "湘东区"
                            }
                        },
                        c10119008: {
                            n: "赣州",
                            c10119104: {
                                n: "市辖区"
                            },
                            c10119014: {
                                n: "兴国"
                            },
                            c10119018: {
                                n: "石城"
                            },
                            c10119024: {
                                n: "南康"
                            },
                            c10119029: {
                                n: "大余"
                            },
                            c10119034: {
                                n: "崇义"
                            },
                            c10119039: {
                                n: "龙南"
                            },
                            c10119045: {
                                n: "全南"
                            },
                            c10119048: {
                                n: "会昌"
                            },
                            c10119051: {
                                n: "于都"
                            },
                            c10119056: {
                                n: "宁都"
                            },
                            c10119060: {
                                n: "寻乌"
                            },
                            c10119065: {
                                n: "赣县"
                            },
                            c10119071: {
                                n: "上犹"
                            },
                            c10119076: {
                                n: "信丰"
                            },
                            c10119080: {
                                n: "定南"
                            },
                            c10119086: {
                                n: "安远"
                            },
                            c10119088: {
                                n: "瑞金"
                            },
                            c10119125: {
                                n: "章贡区"
                            }
                        },
                        c10119009: {
                            n: "吉安",
                            c10119105: {
                                n: "市辖区"
                            },
                            c10119020: {
                                n: "永丰"
                            },
                            c10119026: {
                                n: "峡江"
                            },
                            c10119031: {
                                n: "万安"
                            },
                            c10119042: {
                                n: "井冈山"
                            },
                            c10119058: {
                                n: "新干"
                            },
                            c10119062: {
                                n: "吉水"
                            },
                            c10119067: {
                                n: "泰和"
                            },
                            c10119073: {
                                n: "遂川"
                            },
                            c10119077: {
                                n: "永新"
                            },
                            c10119083: {
                                n: "安福"
                            },
                            c10119106: {
                                n: "吉安县"
                            },
                            c10119124: {
                                n: "吉州区"
                            },
                            c10119123: {
                                n: "青原区"
                            }
                        },
                        c10119010: {
                            n: "抚州",
                            c10119109: {
                                n: "市辖区"
                            },
                            c10119017: {
                                n: "乐安"
                            },
                            c10119023: {
                                n: "南丰"
                            },
                            c10119041: {
                                n: "资溪"
                            },
                            c10119046: {
                                n: "东乡"
                            },
                            c10119050: {
                                n: "崇仁"
                            },
                            c10119055: {
                                n: "宜黄"
                            },
                            c10119059: {
                                n: "南城"
                            },
                            c10119064: {
                                n: "黎川"
                            },
                            c10119082: {
                                n: "广昌"
                            },
                            c10119087: {
                                n: "金溪"
                            },
                            c10119126: {
                                n: "临川区"
                            }
                        },
                        c10119040: {
                            n: "新余",
                            c10119102: {
                                n: "市辖区"
                            },
                            c10119081: {
                                n: "分宜"
                            },
                            c10119115: {
                                n: "渝水区"
                            }
                        }
                    },
                    c10120000: {
                        n: "辽宁",
                        c10120001: {
                            n: "沈阳",
                            c10120055: {
                                n: "和平区"
                            },
                            c10120056: {
                                n: "沈河区"
                            },
                            c10120057: {
                                n: "大东区"
                            },
                            c10120058: {
                                n: "皇姑区"
                            },
                            c10120059: {
                                n: "铁西区"
                            },
                            c10120063: {
                                n: "于洪区"
                            },
                            c10120026: {
                                n: "辽中区"
                            },
                            c10120061: {
                                n: "浑南区"
                            },
                            c10120060: {
                                n: "苏家屯区"
                            },
                            c10120062: {
                                n: "沈北新区"
                            },
                            c10120045: {
                                n: "新民市"
                            },
                            c10120030: {
                                n: "法库县"
                            },
                            c10120047: {
                                n: "康平县"
                            }
                        },
                        c10120002: {
                            n: "铁岭",
                            c10120084: {
                                n: "市辖区"
                            },
                            c10120016: {
                                n: "西丰"
                            },
                            c10120034: {
                                n: "开原"
                            },
                            c10120038: {
                                n: "调兵山"
                            },
                            c10120053: {
                                n: "昌图"
                            },
                            c10120085: {
                                n: "铁岭县"
                            },
                            c10120153: {
                                n: "清河区"
                            },
                            c10120152: {
                                n: "银州区"
                            }
                        },
                        c10120003: {
                            n: "抚顺",
                            c10120071: {
                                n: "市辖区"
                            },
                            c10120015: {
                                n: "清原"
                            },
                            c10120036: {
                                n: "新宾"
                            },
                            c10120072: {
                                n: "抚顺县"
                            },
                            c10120173: {
                                n: "东洲区"
                            },
                            c10120172: {
                                n: "顺城区"
                            },
                            c10120171: {
                                n: "望花区"
                            },
                            c10120170: {
                                n: "新抚区"
                            }
                        },
                        c10120004: {
                            n: "鞍山",
                            c10120070: {
                                n: "市辖区"
                            },
                            c10120028: {
                                n: "海城"
                            },
                            c10120032: {
                                n: "岫岩"
                            },
                            c10120049: {
                                n: "台安"
                            },
                            c10120186: {
                                n: "立山区"
                            },
                            c10120185: {
                                n: "千山区"
                            },
                            c10120184: {
                                n: "铁东区"
                            },
                            c10120183: {
                                n: "铁西区"
                            }
                        },
                        c10120005: {
                            n: "营口",
                            c10120078: {
                                n: "市辖区"
                            },
                            c10120035: {
                                n: "大石桥"
                            },
                            c10120054: {
                                n: "盖州"
                            },
                            c10120151: {
                                n: "鲅鱼圈区"
                            },
                            c10120150: {
                                n: "老边区"
                            },
                            c10120149: {
                                n: "西市区"
                            },
                            c10120148: {
                                n: "站前区"
                            }
                        },
                        c10120006: {
                            n: "大连",
                            c10120064: {
                                n: "中山区"
                            },
                            c10120065: {
                                n: "西岗区"
                            },
                            c10120067: {
                                n: "甘井子区"
                            },
                            c10120069: {
                                n: "金州区"
                            },
                            c10120066: {
                                n: "沙河口区"
                            },
                            c10120022: {
                                n: "普兰店区"
                            },
                            c10120068: {
                                n: "旅顺口区"
                            },
                            c10120041: {
                                n: "瓦房店市"
                            },
                            c10120040: {
                                n: "庄河市"
                            },
                            c10120020: {
                                n: "长海县"
                            }
                        },
                        c10120007: {
                            n: "本溪",
                            c10120073: {
                                n: "市辖区"
                            },
                            c10120019: {
                                n: "桓仁"
                            },
                            c10120074: {
                                n: "本溪县"
                            },
                            c10120182: {
                                n: "本溪"
                            },
                            c10120181: {
                                n: "明山区"
                            },
                            c10120180: {
                                n: "平山区"
                            },
                            c10120179: {
                                n: "溪湖区"
                            }
                        },
                        c10120008: {
                            n: "丹东",
                            c10120075: {
                                n: "市辖区"
                            },
                            c10120021: {
                                n: "东港"
                            },
                            c10120023: {
                                n: "宽甸"
                            },
                            c10120043: {
                                n: "凤城"
                            },
                            c10120176: {
                                n: "元宝区"
                            },
                            c10120175: {
                                n: "振安区"
                            },
                            c10120174: {
                                n: "振兴区"
                            }
                        },
                        c10120009: {
                            n: "锦州",
                            c10120076: {
                                n: "市辖区"
                            },
                            c10120027: {
                                n: "凌海"
                            },
                            c10120031: {
                                n: "义县"
                            },
                            c10120048: {
                                n: "黑山"
                            },
                            c10120077: {
                                n: "北镇"
                            },
                            c10120163: {
                                n: "古塔区"
                            },
                            c10120162: {
                                n: "凌河区"
                            },
                            c10120161: {
                                n: "太和区"
                            }
                        },
                        c10120010: {
                            n: "朝阳",
                            c10120087: {
                                n: "市辖区"
                            },
                            c10120025: {
                                n: "建平"
                            },
                            c10120029: {
                                n: "凌源"
                            },
                            c10120046: {
                                n: "北票"
                            },
                            c10120050: {
                                n: "喀喇沁左翼"
                            },
                            c10120088: {
                                n: "朝阳县"
                            },
                            c10120178: {
                                n: "龙城区"
                            },
                            c10120177: {
                                n: "双塔区"
                            }
                        },
                        c10120011: {
                            n: "阜新",
                            c10120079: {
                                n: "市辖区"
                            },
                            c10120018: {
                                n: "彰武"
                            },
                            c10120080: {
                                n: "阜新县"
                            },
                            c10120169: {
                                n: "阜新蒙古族自治县"
                            },
                            c10120168: {
                                n: "海州区"
                            },
                            c10120167: {
                                n: "太平区"
                            },
                            c10120166: {
                                n: "细河区"
                            }
                        },
                        c10120012: {
                            n: "盘锦",
                            c10120083: {
                                n: "市辖区"
                            },
                            c10120033: {
                                n: "大洼"
                            },
                            c10120052: {
                                n: "盘山"
                            },
                            c10120155: {
                                n: "双台子区"
                            },
                            c10120154: {
                                n: "兴隆台区"
                            }
                        },
                        c10120013: {
                            n: "辽阳",
                            c10120081: {
                                n: "市辖区"
                            },
                            c10120042: {
                                n: "灯塔"
                            },
                            c10120082: {
                                n: "辽阳县"
                            },
                            c10120160: {
                                n: "白塔区"
                            },
                            c10120159: {
                                n: "弓长岭区"
                            },
                            c10120158: {
                                n: "宏伟区"
                            },
                            c10120157: {
                                n: "太子河区"
                            },
                            c10120156: {
                                n: "文圣区"
                            }
                        },
                        c10120014: {
                            n: "葫芦岛",
                            c10120089: {
                                n: "市辖区"
                            },
                            c10120017: {
                                n: "建昌"
                            },
                            c10120037: {
                                n: "绥中"
                            },
                            c10120039: {
                                n: "兴城"
                            },
                            c10120165: {
                                n: "连山区"
                            },
                            c10120164: {
                                n: "龙港区"
                            }
                        }
                    },
                    c10121000: {
                        n: "内蒙古",
                        c10121001: {
                            n: "呼和浩特",
                            c10121017: {
                                n: "土默特左旗"
                            },
                            c10121022: {
                                n: "武川"
                            },
                            c10121053: {
                                n: "托克托"
                            },
                            c10121058: {
                                n: "和林格尔"
                            },
                            c10121064: {
                                n: "清水河"
                            },
                            c10121096: {
                                n: "新城区"
                            },
                            c10121097: {
                                n: "回民区"
                            },
                            c10121098: {
                                n: "玉泉区"
                            },
                            c10121099: {
                                n: "赛罕区"
                            }
                        },
                        c10121003: {
                            n: "包头",
                            c10121100: {
                                n: "市辖区"
                            },
                            c10121032: {
                                n: "土默特右旗"
                            },
                            c10121038: {
                                n: "达茂旗"
                            },
                            c10121070: {
                                n: "固阳"
                            },
                            c10121134: {
                                n: "白云鄂博矿区"
                            },
                            c10121133: {
                                n: "达尔罕茂明安联合旗"
                            },
                            c10121132: {
                                n: "东河区"
                            },
                            c10121131: {
                                n: "九原区"
                            },
                            c10121130: {
                                n: "昆都仑区"
                            },
                            c10121129: {
                                n: "青山区"
                            }
                        },
                        c10121005: {
                            n: "乌海",
                            c10121102: {
                                n: "市辖区"
                            },
                            c10121117: {
                                n: "海勃湾区"
                            },
                            c10121116: {
                                n: "海南区"
                            },
                            c10121115: {
                                n: "乌达区"
                            }
                        },
                        c10121008: {
                            n: "赤峰",
                            c10121103: {
                                n: "市辖区"
                            },
                            c10121014: {
                                n: "阿鲁科尔沁"
                            },
                            c10121018: {
                                n: "敖汉旗"
                            },
                            c10121023: {
                                n: "巴林左旗"
                            },
                            c10121028: {
                                n: "林西"
                            },
                            c10121033: {
                                n: "喀喇沁旗"
                            },
                            c10121054: {
                                n: "宁城"
                            },
                            c10121059: {
                                n: "翁牛特旗"
                            },
                            c10121065: {
                                n: "巴林右旗"
                            },
                            c10121071: {
                                n: "克什克腾旗"
                            },
                            c10121128: {
                                n: "红山区"
                            },
                            c10121127: {
                                n: "松山区"
                            },
                            c10121126: {
                                n: "元宝山区"
                            }
                        },
                        c10121011: {
                            n: "通辽",
                            c10121104: {
                                n: "市辖区"
                            },
                            c10121036: {
                                n: "库伦旗"
                            },
                            c10121042: {
                                n: "扎鲁特旗"
                            },
                            c10121045: {
                                n: "科尔沁左翼后旗"
                            },
                            c10121074: {
                                n: "开鲁"
                            },
                            c10121078: {
                                n: "奈曼旗"
                            },
                            c10121082: {
                                n: "科尔沁左翼中旗"
                            },
                            c10121087: {
                                n: "霍林郭勒"
                            },
                            c10121118: {
                                n: "科尔沁区"
                            }
                        },
                        c10121089: {
                            n: "锡林郭勒盟",
                            c10121009: {
                                n: "锡林浩特"
                            },
                            c10121010: {
                                n: "太仆寺旗"
                            },
                            c10121015: {
                                n: "西乌珠穆沁旗"
                            },
                            c10121019: {
                                n: "正镶白旗"
                            },
                            c10121037: {
                                n: "二连浩特"
                            },
                            c10121046: {
                                n: "苏尼特右旗"
                            },
                            c10121050: {
                                n: "东乌珠穆沁旗"
                            },
                            c10121060: {
                                n: "正蓝旗"
                            },
                            c10121079: {
                                n: "多伦"
                            },
                            c10121083: {
                                n: "苏尼特左旗"
                            },
                            c10121088: {
                                n: "镶黄旗"
                            },
                            c10121112: {
                                n: "阿巴嘎旗"
                            }
                        },
                        c10121090: {
                            n: "阿拉善盟",
                            c10121034: {
                                n: "阿拉善左旗"
                            },
                            c10121040: {
                                n: "额济纳旗"
                            },
                            c10121076: {
                                n: "阿拉善右旗"
                            }
                        },
                        c10121091: {
                            n: "兴安",
                            c10121024: {
                                n: "乌兰浩特"
                            },
                            c10121029: {
                                n: "突泉"
                            },
                            c10121066: {
                                n: "扎赉特旗"
                            },
                            c10121072: {
                                n: "科右中旗"
                            },
                            c10121109: {
                                n: "阿尔山"
                            },
                            c10121110: {
                                n: "科尔沁右翼前旗"
                            },
                            c10121113: {
                                n: "科尔沁右翼中旗"
                            }
                        },
                        c10121092: {
                            n: "鄂尔多斯",
                            c10121105: {
                                n: "市辖区"
                            },
                            c10121013: {
                                n: "鄂托克旗"
                            },
                            c10121039: {
                                n: "达拉特旗"
                            },
                            c10121043: {
                                n: "准格尔旗"
                            },
                            c10121048: {
                                n: "乌审"
                            },
                            c10121052: {
                                n: "鄂托克前旗"
                            },
                            c10121080: {
                                n: "伊金霍洛旗"
                            },
                            c10121085: {
                                n: "杭锦旗"
                            },
                            c10121125: {
                                n: "东胜区"
                            },
                            c10121124: {
                                n: "杭锦旗"
                            }
                        },
                        c10121093: {
                            n: "呼伦贝尔",
                            c10121106: {
                                n: "市辖区"
                            },
                            c10121025: {
                                n: "阿荣旗"
                            },
                            c10121030: {
                                n: "扎兰屯"
                            },
                            c10121035: {
                                n: "陈巴尔虎旗"
                            },
                            c10121041: {
                                n: "新巴尔虎右旗"
                            },
                            c10121044: {
                                n: "额尔古纳右旗"
                            },
                            c10121049: {
                                n: "满洲里"
                            },
                            c10121061: {
                                n: "鄂温克"
                            },
                            c10121067: {
                                n: "牙克石"
                            },
                            c10121073: {
                                n: "鄂伦春"
                            },
                            c10121077: {
                                n: "新巴尔虎左旗"
                            },
                            c10121081: {
                                n: "根河"
                            },
                            c10121086: {
                                n: "莫力达瓦旗"
                            },
                            c10121123: {
                                n: "额尔古纳市"
                            },
                            c10121122: {
                                n: "鄂伦春自治旗"
                            },
                            c10121121: {
                                n: "鄂温克族自治旗"
                            },
                            c10121120: {
                                n: "海拉尔区"
                            },
                            c10121119: {
                                n: "莫力达瓦达斡尔族自治旗"
                            }
                        },
                        c10121094: {
                            n: "巴彦淖尔",
                            c10121107: {
                                n: "市辖区"
                            },
                            c10121021: {
                                n: "磴口"
                            },
                            c10121027: {
                                n: "乌拉特中旗"
                            },
                            c10121031: {
                                n: "杭锦后旗"
                            },
                            c10121057: {
                                n: "五原"
                            },
                            c10121063: {
                                n: "乌拉特前镇"
                            },
                            c10121069: {
                                n: "乌拉特后镇"
                            },
                            c10121138: {
                                n: "临河区"
                            },
                            c10121137: {
                                n: "乌拉特后旗"
                            },
                            c10121136: {
                                n: "乌拉特前旗"
                            },
                            c10121135: {
                                n: "乌拉特中旗"
                            }
                        },
                        c10121095: {
                            n: "乌兰察布",
                            c10121108: {
                                n: "市辖区"
                            },
                            c10121012: {
                                n: "丰镇"
                            },
                            c10121016: {
                                n: "商都"
                            },
                            c10121020: {
                                n: "凉城"
                            },
                            c10121026: {
                                n: "察哈尔右翼中旗"
                            },
                            c10121047: {
                                n: "化德"
                            },
                            c10121051: {
                                n: "卓资"
                            },
                            c10121056: {
                                n: "兴和"
                            },
                            c10121062: {
                                n: "察哈尔右翼前旗"
                            },
                            c10121068: {
                                n: "察哈尔右翼后旗"
                            },
                            c10121084: {
                                n: "四子王旗"
                            },
                            c10121114: {
                                n: "集宁区"
                            }
                        }
                    },
                    c10122000: {
                        n: "宁夏",
                        c10122001: {
                            n: "银川",
                            c10122009: {
                                n: "贺兰"
                            },
                            c10122012: {
                                n: "灵武"
                            },
                            c10122016: {
                                n: "永宁"
                            },
                            c10122022: {
                                n: "兴庆区"
                            },
                            c10122023: {
                                n: "西夏区"
                            },
                            c10122024: {
                                n: "金凤区"
                            }
                        },
                        c10122002: {
                            n: "石嘴山",
                            c10122025: {
                                n: "市辖区"
                            },
                            c10122004: {
                                n: "平罗"
                            },
                            c10122033: {
                                n: "大武口区"
                            },
                            c10122032: {
                                n: "惠农区"
                            }
                        },
                        c10122003: {
                            n: "固原",
                            c10122027: {
                                n: "市辖区"
                            },
                            c10122008: {
                                n: "西吉"
                            },
                            c10122015: {
                                n: "隆德"
                            },
                            c10122017: {
                                n: "彭阳"
                            },
                            c10122019: {
                                n: "泾源"
                            },
                            c10122034: {
                                n: "原州区"
                            }
                        },
                        c10122010: {
                            n: "吴忠",
                            c10122026: {
                                n: "市辖区"
                            },
                            c10122007: {
                                n: "青铜峡"
                            },
                            c10122013: {
                                n: "盐池"
                            },
                            c10122018: {
                                n: "同心"
                            },
                            c10122031: {
                                n: "红寺堡区"
                            },
                            c10122030: {
                                n: "利通区"
                            }
                        },
                        c10122011: {
                            n: "中卫",
                            c10122028: {
                                n: "市辖区"
                            },
                            c10122006: {
                                n: "中宁"
                            },
                            c10122021: {
                                n: "海原"
                            },
                            c10122029: {
                                n: "沙坡头区"
                            }
                        }
                    },
                    c10123000: {
                        n: "青海",
                        c10123001: {
                            n: "西宁",
                            c10123027: {
                                n: "大通"
                            },
                            c10123030: {
                                n: "湟中"
                            },
                            c10123033: {
                                n: "湟源"
                            },
                            c10123049: {
                                n: "城东区"
                            },
                            c10123050: {
                                n: "城中区"
                            },
                            c10123051: {
                                n: "城西区"
                            },
                            c10123052: {
                                n: "城北区"
                            }
                        },
                        c10123002: {
                            n: "果洛",
                            c10123018: {
                                n: "玛多"
                            },
                            c10123021: {
                                n: "甘德"
                            },
                            c10123034: {
                                n: "达日"
                            },
                            c10123037: {
                                n: "班玛"
                            },
                            c10123041: {
                                n: "玛沁"
                            },
                            c10123054: {
                                n: "久治"
                            }
                        },
                        c10123003: {
                            n: "玉树",
                            c10123019: {
                                n: "称多"
                            },
                            c10123022: {
                                n: "杂多"
                            },
                            c10123035: {
                                n: "治多"
                            },
                            c10123038: {
                                n: "囊谦"
                            },
                            c10123040: {
                                n: "曲麻莱"
                            },
                            c10123055: {
                                n: "玉树县"
                            }
                        },
                        c10123005: {
                            n: "海西",
                            c10123004: {
                                n: "格尔木"
                            },
                            c10123010: {
                                n: "乌兰"
                            },
                            c10123016: {
                                n: "天峻"
                            },
                            c10123032: {
                                n: "都兰"
                            },
                            c10123043: {
                                n: "德令哈"
                            },
                            c10123056: {
                                n: "大柴旦行政委员会"
                            }
                        },
                        c10123045: {
                            n: "海东地区",
                            c10123008: {
                                n: "乐都"
                            },
                            c10123014: {
                                n: "互助"
                            },
                            c10123017: {
                                n: "民和"
                            },
                            c10123020: {
                                n: "化隆"
                            },
                            c10123036: {
                                n: "循化"
                            },
                            c10123053: {
                                n: "平安"
                            }
                        },
                        c10123046: {
                            n: "海北藏族自治州",
                            c10123009: {
                                n: "刚察"
                            },
                            c10123012: {
                                n: "门源"
                            },
                            c10123025: {
                                n: "海晏"
                            },
                            c10123028: {
                                n: "祁连"
                            }
                        },
                        c10123047: {
                            n: "黄南藏族自治州",
                            c10123007: {
                                n: "尖扎"
                            },
                            c10123026: {
                                n: "河南"
                            },
                            c10123029: {
                                n: "泽库"
                            },
                            c10123039: {
                                n: "同仁"
                            }
                        },
                        c10123048: {
                            n: "海南藏族自治州",
                            c10123006: {
                                n: "同德"
                            },
                            c10123013: {
                                n: "兴海"
                            },
                            c10123023: {
                                n: "共和"
                            },
                            c10123024: {
                                n: "贵德"
                            },
                            c10123044: {
                                n: "贵南"
                            }
                        }
                    },
                    c10124000: {
                        n: "山东",
                        c10124001: {
                            n: "青岛",
                            c10124117: {
                                n: "市南区"
                            },
                            c10124118: {
                                n: "市北区"
                            },
                            c10124120: {
                                n: "黄岛区"
                            },
                            c10124123: {
                                n: "城阳区"
                            },
                            c10124122: {
                                n: "李沧区"
                            },
                            c10124121: {
                                n: "崂山区"
                            },
                            c10124062: {
                                n: "即墨区"
                            },
                            c10124055: {
                                n: "平度市"
                            },
                            c10124099: {
                                n: "胶州市"
                            },
                            c10124104: {
                                n: "莱西市"
                            }
                        },
                        c10124002: {
                            n: "威海",
                            c10124131: {
                                n: "市辖区"
                            },
                            c10124042: {
                                n: "荣成"
                            },
                            c10124047: {
                                n: "乳山"
                            },
                            c10124094: {
                                n: "文登"
                            },
                            c10124225: {
                                n: "环翠区"
                            }
                        },
                        c10124003: {
                            n: "济南",
                            c10124112: {
                                n: "历下区"
                            },
                            c10124113: {
                                n: "市中区"
                            },
                            c10124115: {
                                n: "天桥区"
                            },
                            c10124116: {
                                n: "历城区"
                            },
                            c10124114: {
                                n: "槐荫区"
                            },
                            c10124029: {
                                n: "长清区"
                            },
                            c10124082: {
                                n: "章丘市"
                            },
                            c10124088: {
                                n: "济阳县"
                            },
                            c10124036: {
                                n: "商河县"
                            },
                            c10124043: {
                                n: "平阴县"
                            }
                        },
                        c10124004: {
                            n: "淄博",
                            c10124124: {
                                n: "市辖区"
                            },
                            c10124022: {
                                n: "高青"
                            },
                            c10124069: {
                                n: "桓台"
                            },
                            c10124075: {
                                n: "沂源"
                            },
                            c10124211: {
                                n: "博山区"
                            },
                            c10124210: {
                                n: "临淄区"
                            },
                            c10124209: {
                                n: "张店区"
                            },
                            c10124208: {
                                n: "周村区"
                            },
                            c10124207: {
                                n: "淄川区"
                            }
                        },
                        c10124005: {
                            n: "聊城",
                            c10124138: {
                                n: "市辖区"
                            },
                            c10124027: {
                                n: "茌平"
                            },
                            c10124032: {
                                n: "东阿"
                            },
                            c10124039: {
                                n: "莘县"
                            },
                            c10124074: {
                                n: "临清"
                            },
                            c10124079: {
                                n: "高唐"
                            },
                            c10124085: {
                                n: "阳谷"
                            },
                            c10124091: {
                                n: "冠县"
                            },
                            c10124233: {
                                n: "东昌府区"
                            }
                        },
                        c10124006: {
                            n: "德州",
                            c10124136: {
                                n: "市辖区"
                            },
                            c10124040: {
                                n: "平原"
                            },
                            c10124045: {
                                n: "齐河"
                            },
                            c10124052: {
                                n: "武城"
                            },
                            c10124059: {
                                n: "陵县"
                            },
                            c10124080: {
                                n: "庆云"
                            },
                            c10124086: {
                                n: "夏津"
                            },
                            c10124092: {
                                n: "宁津"
                            },
                            c10124097: {
                                n: "乐陵"
                            },
                            c10124103: {
                                n: "禹城"
                            },
                            c10124137: {
                                n: "临邑"
                            },
                            c10124241: {
                                n: "德城区"
                            }
                        },
                        c10124007: {
                            n: "东营",
                            c10124126: {
                                n: "市辖区"
                            },
                            c10124028: {
                                n: "利津"
                            },
                            c10124035: {
                                n: "垦利"
                            },
                            c10124081: {
                                n: "广饶"
                            },
                            c10124240: {
                                n: "东营区"
                            },
                            c10124239: {
                                n: "河口区"
                            }
                        },
                        c10124008: {
                            n: "潍坊",
                            c10124128: {
                                n: "市辖区"
                            },
                            c10124049: {
                                n: "昌邑"
                            },
                            c10124056: {
                                n: "诸城"
                            },
                            c10124063: {
                                n: "临朐"
                            },
                            c10124070: {
                                n: "昌乐"
                            },
                            c10124095: {
                                n: "寿光"
                            },
                            c10124100: {
                                n: "高密"
                            },
                            c10124105: {
                                n: "安丘"
                            },
                            c10124110: {
                                n: "青州"
                            },
                            c10124224: {
                                n: "坊子区"
                            },
                            c10124223: {
                                n: "寒亭区"
                            },
                            c10124222: {
                                n: "奎文区"
                            },
                            c10124221: {
                                n: "潍城区"
                            }
                        },
                        c10124009: {
                            n: "烟台",
                            c10124127: {
                                n: "市辖区"
                            },
                            c10124020: {
                                n: "莱阳"
                            },
                            c10124025: {
                                n: "长岛"
                            },
                            c10124030: {
                                n: "龙口"
                            },
                            c10124037: {
                                n: "栖霞"
                            },
                            c10124066: {
                                n: "招远"
                            },
                            c10124073: {
                                n: "海阳"
                            },
                            c10124077: {
                                n: "莱州"
                            },
                            c10124083: {
                                n: "蓬莱"
                            },
                            c10124220: {
                                n: "福山区"
                            },
                            c10124219: {
                                n: "莱山区"
                            },
                            c10124218: {
                                n: "牟平区"
                            },
                            c10124217: {
                                n: "芝罘区"
                            }
                        },
                        c10124011: {
                            n: "泰安",
                            c10124130: {
                                n: "市辖区"
                            },
                            c10124021: {
                                n: "肥城"
                            },
                            c10124060: {
                                n: "新泰"
                            },
                            c10124067: {
                                n: "东平"
                            },
                            c10124108: {
                                n: "宁阳"
                            },
                            c10124227: {
                                n: "岱岳区"
                            },
                            c10124226: {
                                n: "泰山区"
                            }
                        },
                        c10124012: {
                            n: "菏泽",
                            c10124140: {
                                n: "市辖区"
                            },
                            c10124019: {
                                n: "东明"
                            },
                            c10124024: {
                                n: "郓城"
                            },
                            c10124051: {
                                n: "巨野"
                            },
                            c10124058: {
                                n: "成武"
                            },
                            c10124065: {
                                n: "曹县"
                            },
                            c10124072: {
                                n: "鄄城"
                            },
                            c10124102: {
                                n: "定陶"
                            },
                            c10124107: {
                                n: "单县"
                            },
                            c10124238: {
                                n: "牡丹区"
                            }
                        },
                        c10124013: {
                            n: "临沂",
                            c10124135: {
                                n: "市辖区"
                            },
                            c10124026: {
                                n: "苍山"
                            },
                            c10124031: {
                                n: "蒙阴"
                            },
                            c10124038: {
                                n: "沂南"
                            },
                            c10124044: {
                                n: "临沭"
                            },
                            c10124050: {
                                n: "费县"
                            },
                            c10124078: {
                                n: "平邑"
                            },
                            c10124084: {
                                n: "沂水"
                            },
                            c10124090: {
                                n: "莒南"
                            },
                            c10124096: {
                                n: "郯城"
                            },
                            c10124232: {
                                n: "河东区"
                            },
                            c10124231: {
                                n: "兰山区"
                            },
                            c10124230: {
                                n: "罗庄区"
                            }
                        },
                        c10124014: {
                            n: "枣庄",
                            c10124125: {
                                n: "市辖区"
                            },
                            c10124054: {
                                n: "滕州"
                            },
                            c10124216: {
                                n: "山亭区"
                            },
                            c10124215: {
                                n: "市中区"
                            },
                            c10124214: {
                                n: "台儿庄区"
                            },
                            c10124213: {
                                n: "薛城区"
                            },
                            c10124212: {
                                n: "峄城区"
                            }
                        },
                        c10124015: {
                            n: "济宁",
                            c10124129: {
                                n: "市辖区"
                            },
                            c10124010: {
                                n: "兖州"
                            },
                            c10124017: {
                                n: "曲阜"
                            },
                            c10124034: {
                                n: "邹城"
                            },
                            c10124041: {
                                n: "鱼台"
                            },
                            c10124046: {
                                n: "嘉祥"
                            },
                            c10124053: {
                                n: "汶上"
                            },
                            c10124076: {
                                n: "梁山"
                            },
                            c10124087: {
                                n: "微山"
                            },
                            c10124093: {
                                n: "金乡"
                            },
                            c10124098: {
                                n: "泗水"
                            },
                            c10124237: {
                                n: "任城区"
                            },
                            c10124236: {
                                n: "市中区"
                            }
                        },
                        c10124016: {
                            n: "日照",
                            c10124132: {
                                n: "市辖区"
                            },
                            c10124061: {
                                n: "五莲"
                            },
                            c10124133: {
                                n: "莒县"
                            },
                            c10124229: {
                                n: "东港区"
                            },
                            c10124228: {
                                n: "岚山区"
                            }
                        },
                        c10124018: {
                            n: "滨州",
                            c10124139: {
                                n: "市辖区"
                            },
                            c10124023: {
                                n: "阳信"
                            },
                            c10124057: {
                                n: "博兴"
                            },
                            c10124064: {
                                n: "惠民"
                            },
                            c10124071: {
                                n: "沾化"
                            },
                            c10124106: {
                                n: "邹平"
                            },
                            c10124111: {
                                n: "无棣"
                            },
                            c10124242: {
                                n: "滨城区"
                            }
                        },
                        c10124068: {
                            n: "莱芜",
                            c10124134: {
                                n: "市辖区"
                            },
                            c10124235: {
                                n: "钢城区"
                            },
                            c10124234: {
                                n: "莱城区"
                            }
                        }
                    },
                    c10125000: {
                        n: "山西",
                        c10125001: {
                            n: "太原",
                            c10125110: {
                                n: "迎泽区"
                            },
                            c10125109: {
                                n: "小店区"
                            },
                            c10125113: {
                                n: "万柏林区"
                            },
                            c10125111: {
                                n: "杏花岭区"
                            },
                            c10125112: {
                                n: "尖草坪区"
                            },
                            c10125114: {
                                n: "晋源区"
                            },
                            c10125057: {
                                n: "古交市"
                            },
                            c10125102: {
                                n: "清徐县"
                            },
                            c10125096: {
                                n: "阳曲县"
                            },
                            c10125050: {
                                n: "娄烦县"
                            }
                        },
                        c10125003: {
                            n: "忻州",
                            c10125124: {
                                n: "市辖区"
                            },
                            c10125004: {
                                n: "宁武"
                            },
                            c10125017: {
                                n: "代县"
                            },
                            c10125027: {
                                n: "五寨"
                            },
                            c10125032: {
                                n: "河曲"
                            },
                            c10125037: {
                                n: "偏关"
                            },
                            c10125053: {
                                n: "原平"
                            },
                            c10125061: {
                                n: "五台"
                            },
                            c10125067: {
                                n: "繁峙"
                            },
                            c10125073: {
                                n: "神池"
                            },
                            c10125078: {
                                n: "岢岚"
                            },
                            c10125082: {
                                n: "保德"
                            },
                            c10125089: {
                                n: "静乐"
                            },
                            c10125105: {
                                n: "定襄"
                            },
                            c10125133: {
                                n: "忻府区"
                            }
                        },
                        c10125005: {
                            n: "大同",
                            c10125115: {
                                n: "市辖区"
                            },
                            c10125019: {
                                n: "天镇"
                            },
                            c10125024: {
                                n: "浑源"
                            },
                            c10125030: {
                                n: "灵丘"
                            },
                            c10125064: {
                                n: "大同县"
                            },
                            c10125070: {
                                n: "阳高"
                            },
                            c10125075: {
                                n: "广灵"
                            },
                            c10125080: {
                                n: "左云"
                            },
                            c10125141: {
                                n: "城区"
                            },
                            c10125140: {
                                n: "南郊区"
                            }
                        },
                        c10125006: {
                            n: "临汾",
                            c10125125: {
                                n: "市辖区"
                            },
                            c10125007: {
                                n: "侯马"
                            },
                            c10125015: {
                                n: "隰县"
                            },
                            c10125021: {
                                n: "乡宁"
                            },
                            c10125026: {
                                n: "安泽"
                            },
                            c10125031: {
                                n: "古县"
                            },
                            c10125038: {
                                n: "曲沃"
                            },
                            c10125044: {
                                n: "襄汾"
                            },
                            c10125051: {
                                n: "霍州"
                            },
                            c10125059: {
                                n: "蒲县"
                            },
                            c10125066: {
                                n: "永和"
                            },
                            c10125072: {
                                n: "吉县"
                            },
                            c10125077: {
                                n: "浮山"
                            },
                            c10125083: {
                                n: "大宁"
                            },
                            c10125090: {
                                n: "翼城"
                            },
                            c10125097: {
                                n: "洪洞"
                            },
                            c10125103: {
                                n: "汾西"
                            },
                            c10125137: {
                                n: "尧都区"
                            }
                        },
                        c10125008: {
                            n: "运城",
                            c10125123: {
                                n: "市辖区"
                            },
                            c10125016: {
                                n: "垣曲"
                            },
                            c10125029: {
                                n: "芮城"
                            },
                            c10125033: {
                                n: "临猗"
                            },
                            c10125039: {
                                n: "稷山"
                            },
                            c10125045: {
                                n: "新绛"
                            },
                            c10125052: {
                                n: "夏县"
                            },
                            c10125060: {
                                n: "绛县"
                            },
                            c10125079: {
                                n: "平陆"
                            },
                            c10125084: {
                                n: "万荣"
                            },
                            c10125091: {
                                n: "河津"
                            },
                            c10125098: {
                                n: "闻喜"
                            },
                            c10125104: {
                                n: "永济"
                            },
                            c10125129: {
                                n: "盐湖区"
                            }
                        },
                        c10125009: {
                            n: "阳泉",
                            c10125116: {
                                n: "市辖区"
                            },
                            c10125041: {
                                n: "平定"
                            },
                            c10125086: {
                                n: "盂县"
                            },
                            c10125132: {
                                n: "城区"
                            },
                            c10125131: {
                                n: "郊区"
                            },
                            c10125130: {
                                n: "矿区"
                            }
                        },
                        c10125010: {
                            n: "长治",
                            c10125117: {
                                n: "市辖区"
                            },
                            c10125012: {
                                n: "长子"
                            },
                            c10125035: {
                                n: "平顺"
                            },
                            c10125042: {
                                n: "襄垣"
                            },
                            c10125048: {
                                n: "沁县"
                            },
                            c10125055: {
                                n: "屯留"
                            },
                            c10125062: {
                                n: "潞城"
                            },
                            c10125081: {
                                n: "壶关"
                            },
                            c10125087: {
                                n: "黎城"
                            },
                            c10125094: {
                                n: "武乡"
                            },
                            c10125100: {
                                n: "沁源"
                            },
                            c10125118: {
                                n: "长治县"
                            },
                            c10125128: {
                                n: "城区"
                            },
                            c10125127: {
                                n: "郊区"
                            }
                        },
                        c10125011: {
                            n: "晋城",
                            c10125119: {
                                n: "市辖区"
                            },
                            c10125022: {
                                n: "阳城"
                            },
                            c10125028: {
                                n: "陵川"
                            },
                            c10125068: {
                                n: "高平"
                            },
                            c10125074: {
                                n: "沁水"
                            },
                            c10125120: {
                                n: "泽州"
                            },
                            c10125139: {
                                n: "城区"
                            }
                        },
                        c10125034: {
                            n: "朔州",
                            c10125121: {
                                n: "市辖区"
                            },
                            c10125040: {
                                n: "应县"
                            },
                            c10125046: {
                                n: "山阴"
                            },
                            c10125085: {
                                n: "怀仁"
                            },
                            c10125092: {
                                n: "右玉"
                            },
                            c10125135: {
                                n: "平鲁区"
                            },
                            c10125134: {
                                n: "朔城区"
                            }
                        },
                        c10125107: {
                            n: "晋中",
                            c10125122: {
                                n: "市辖区"
                            },
                            c10125014: {
                                n: "寿阳"
                            },
                            c10125020: {
                                n: "祁县"
                            },
                            c10125025: {
                                n: "介休"
                            },
                            c10125047: {
                                n: "灵石"
                            },
                            c10125054: {
                                n: "和顺"
                            },
                            c10125058: {
                                n: "榆社"
                            },
                            c10125065: {
                                n: "太谷"
                            },
                            c10125071: {
                                n: "平遥"
                            },
                            c10125099: {
                                n: "昔阳"
                            },
                            c10125106: {
                                n: "左权"
                            },
                            c10125138: {
                                n: "榆次区"
                            }
                        },
                        c10125108: {
                            n: "吕梁",
                            c10125126: {
                                n: "市辖区"
                            },
                            c10125013: {
                                n: "交口"
                            },
                            c10125018: {
                                n: "柳林"
                            },
                            c10125023: {
                                n: "岚县"
                            },
                            c10125036: {
                                n: "石楼"
                            },
                            c10125043: {
                                n: "临县"
                            },
                            c10125049: {
                                n: "文水"
                            },
                            c10125056: {
                                n: "孝义"
                            },
                            c10125063: {
                                n: "中阳"
                            },
                            c10125069: {
                                n: "兴县"
                            },
                            c10125088: {
                                n: "方山"
                            },
                            c10125095: {
                                n: "汾阳"
                            },
                            c10125101: {
                                n: "交城"
                            },
                            c10125136: {
                                n: "离石区"
                            }
                        }
                    },
                    c10126000: {
                        n: "陕西",
                        c10126001: {
                            n: "西安",
                            c10126099: {
                                n: "新城区"
                            },
                            c10126100: {
                                n: "碑林区"
                            },
                            c10126101: {
                                n: "莲湖区"
                            },
                            c10126104: {
                                n: "雁塔区"
                            },
                            c10126027: {
                                n: "长安区"
                            },
                            c10126103: {
                                n: "未央区"
                            },
                            c10126072: {
                                n: "临潼区"
                            },
                            c10126102: {
                                n: "灞桥区"
                            },
                            c10126083: {
                                n: "高陵区"
                            },
                            c10126038: {
                                n: "鄠邑区"
                            },
                            c10126105: {
                                n: "阎良区"
                            },
                            c10126078: {
                                n: "周至县"
                            },
                            c10126033: {
                                n: "蓝田县"
                            }
                        },
                        c10126002: {
                            n: "渭南",
                            c10126109: {
                                n: "市辖区"
                            },
                            c10126017: {
                                n: "澄城"
                            },
                            c10126021: {
                                n: "蒲城"
                            },
                            c10126026: {
                                n: "富平"
                            },
                            c10126032: {
                                n: "华阴"
                            },
                            c10126037: {
                                n: "华县"
                            },
                            c10126060: {
                                n: "合阳"
                            },
                            c10126063: {
                                n: "白水"
                            },
                            c10126067: {
                                n: "韩城"
                            },
                            c10126071: {
                                n: "潼关"
                            },
                            c10126077: {
                                n: "大荔"
                            },
                            c10126121: {
                                n: "临渭区"
                            }
                        },
                        c10126003: {
                            n: "延安",
                            c10126110: {
                                n: "市辖区"
                            },
                            c10126012: {
                                n: "洛川"
                            },
                            c10126018: {
                                n: "黄龙"
                            },
                            c10126023: {
                                n: "延长"
                            },
                            c10126029: {
                                n: "延川"
                            },
                            c10126046: {
                                n: "安塞"
                            },
                            c10126051: {
                                n: "志丹"
                            },
                            c10126057: {
                                n: "宜川"
                            },
                            c10126069: {
                                n: "子长"
                            },
                            c10126074: {
                                n: "黄陵"
                            },
                            c10126088: {
                                n: "富县"
                            },
                            c10126093: {
                                n: "甘泉"
                            },
                            c10126111: {
                                n: "吴起"
                            },
                            c10126117: {
                                n: "宝塔区"
                            }
                        },
                        c10126005: {
                            n: "榆林",
                            c10126113: {
                                n: "市辖区"
                            },
                            c10126004: {
                                n: "绥德"
                            },
                            c10126030: {
                                n: "清涧"
                            },
                            c10126035: {
                                n: "靖边"
                            },
                            c10126044: {
                                n: "横山"
                            },
                            c10126049: {
                                n: "佳县"
                            },
                            c10126055: {
                                n: "吴堡"
                            },
                            c10126075: {
                                n: "神木"
                            },
                            c10126081: {
                                n: "定边"
                            },
                            c10126086: {
                                n: "米脂"
                            },
                            c10126092: {
                                n: "府谷"
                            },
                            c10126096: {
                                n: "子洲"
                            },
                            c10126116: {
                                n: "榆阳区"
                            }
                        },
                        c10126006: {
                            n: "宝鸡",
                            c10126107: {
                                n: "市辖区"
                            },
                            c10126028: {
                                n: "太白"
                            },
                            c10126034: {
                                n: "陇县"
                            },
                            c10126039: {
                                n: "眉县"
                            },
                            c10126042: {
                                n: "岐山"
                            },
                            c10126068: {
                                n: "麟游"
                            },
                            c10126073: {
                                n: "千阳"
                            },
                            c10126079: {
                                n: "凤县"
                            },
                            c10126084: {
                                n: "扶风"
                            },
                            c10126090: {
                                n: "凤翔"
                            },
                            c10126129: {
                                n: "陈仓区"
                            },
                            c10126128: {
                                n: "金台区"
                            },
                            c10126127: {
                                n: "渭滨区"
                            }
                        },
                        c10126007: {
                            n: "安康",
                            c10126114: {
                                n: "市辖区"
                            },
                            c10126019: {
                                n: "镇坪"
                            },
                            c10126031: {
                                n: "紫阳"
                            },
                            c10126036: {
                                n: "石泉"
                            },
                            c10126041: {
                                n: "汉阴"
                            },
                            c10126045: {
                                n: "岚皋"
                            },
                            c10126058: {
                                n: "白河"
                            },
                            c10126076: {
                                n: "平利"
                            },
                            c10126082: {
                                n: "旬阳"
                            },
                            c10126087: {
                                n: "宁陕"
                            },
                            c10126130: {
                                n: "汉滨区"
                            }
                        },
                        c10126008: {
                            n: "汉中",
                            c10126112: {
                                n: "市辖区"
                            },
                            c10126013: {
                                n: "留坝"
                            },
                            c10126014: {
                                n: "镇巴"
                            },
                            c10126020: {
                                n: "洋县"
                            },
                            c10126025: {
                                n: "南郑"
                            },
                            c10126047: {
                                n: "略阳"
                            },
                            c10126052: {
                                n: "佛坪"
                            },
                            c10126053: {
                                n: "勉县"
                            },
                            c10126059: {
                                n: "西乡"
                            },
                            c10126066: {
                                n: "城固"
                            },
                            c10126094: {
                                n: "宁强"
                            },
                            c10126126: {
                                n: "汉台区"
                            }
                        },
                        c10126010: {
                            n: "铜川",
                            c10126106: {
                                n: "市辖区"
                            },
                            c10126016: {
                                n: "宜君"
                            },
                            c10126124: {
                                n: "王益区"
                            },
                            c10126123: {
                                n: "耀州区"
                            },
                            c10126122: {
                                n: "印台区"
                            }
                        },
                        c10126011: {
                            n: "咸阳",
                            c10126108: {
                                n: "市辖区"
                            },
                            c10126015: {
                                n: "永寿"
                            },
                            c10126022: {
                                n: "武功"
                            },
                            c10126040: {
                                n: "乾县"
                            },
                            c10126043: {
                                n: "泾阳"
                            },
                            c10126048: {
                                n: "淳化"
                            },
                            c10126054: {
                                n: "兴平"
                            },
                            c10126061: {
                                n: "长武"
                            },
                            c10126080: {
                                n: "彬县"
                            },
                            c10126085: {
                                n: "礼泉"
                            },
                            c10126091: {
                                n: "三原"
                            },
                            c10126095: {
                                n: "旬邑"
                            },
                            c10126120: {
                                n: "秦都区"
                            },
                            c10126119: {
                                n: "渭城区"
                            },
                            c10126118: {
                                n: "杨陵区"
                            }
                        },
                        c10126098: {
                            n: "商洛",
                            c10126115: {
                                n: "市辖区"
                            },
                            c10126024: {
                                n: "镇安"
                            },
                            c10126050: {
                                n: "洛南"
                            },
                            c10126065: {
                                n: "山阳"
                            },
                            c10126070: {
                                n: "柞水"
                            },
                            c10126089: {
                                n: "商南"
                            },
                            c10126097: {
                                n: "丹凤"
                            },
                            c10126125: {
                                n: "商州区"
                            }
                        }
                    },
                    c10127000: {
                        n: "四川",
                        c10127001: {
                            n: "成都",
                            c10127138: {
                                n: "锦江区"
                            },
                            c10127139: {
                                n: "青羊区"
                            },
                            c10127140: {
                                n: "金牛区"
                            },
                            c10127141: {
                                n: "武侯区"
                            },
                            c10127142: {
                                n: "成华区"
                            },
                            c10127143: {
                                n: "龙泉驿区"
                            },
                            c10127116: {
                                n: "新都区"
                            },
                            c10127094: {
                                n: "温江区"
                            },
                            c10127103: {
                                n: "双流区"
                            },
                            c10127054: {
                                n: "郫都区"
                            },
                            c10127144: {
                                n: "青白江区"
                            },
                            c10127034: {
                                n: "简阳市"
                            },
                            c10127061: {
                                n: "彭州市"
                            },
                            c10127069: {
                                n: "崇州市"
                            },
                            c10127019: {
                                n: "都江堰市"
                            },
                            c10127077: {
                                n: "邛崃市"
                            },
                            c10127040: {
                                n: "金堂县"
                            },
                            c10127129: {
                                n: "大邑县"
                            },
                            c10127048: {
                                n: "新津县"
                            },
                            c10127109: {
                                n: "蒲江县"
                            }
                        },
                        c10127002: {
                            n: "乐山",
                            c10127156: {
                                n: "市辖区"
                            },
                            c10127022: {
                                n: "峨眉山"
                            },
                            c10127031: {
                                n: "马边"
                            },
                            c10127038: {
                                n: "夹江"
                            },
                            c10127092: {
                                n: "犍为"
                            },
                            c10127111: {
                                n: "峨边"
                            },
                            c10127124: {
                                n: "井研"
                            },
                            c10127131: {
                                n: "沐川"
                            },
                            c10127222: {
                                n: "沙湾区"
                            },
                            c10127221: {
                                n: "市中区"
                            },
                            c10127220: {
                                n: "五通桥区"
                            }
                        },
                        c10127003: {
                            n: "凉山",
                            c10127032: {
                                n: "甘洛"
                            },
                            c10127046: {
                                n: "西昌"
                            },
                            c10127047: {
                                n: "会理"
                            },
                            c10127050: {
                                n: "宁南"
                            },
                            c10127053: {
                                n: "冕宁"
                            },
                            c10127060: {
                                n: "雷波"
                            },
                            c10127068: {
                                n: "普格"
                            },
                            c10127076: {
                                n: "金阳"
                            },
                            c10127086: {
                                n: "昭觉"
                            },
                            c10127102: {
                                n: "木里"
                            },
                            c10127108: {
                                n: "会东"
                            },
                            c10127112: {
                                n: "盐源"
                            },
                            c10127115: {
                                n: "越西"
                            },
                            c10127122: {
                                n: "喜德"
                            },
                            c10127128: {
                                n: "布拖"
                            },
                            c10127135: {
                                n: "美姑"
                            },
                            c10127191: {
                                n: "德昌"
                            }
                        },
                        c10127005: {
                            n: "绵阳",
                            c10127151: {
                                n: "市辖区"
                            },
                            c10127020: {
                                n: "江油"
                            },
                            c10127044: {
                                n: "安县"
                            },
                            c10127058: {
                                n: "梓潼"
                            },
                            c10127065: {
                                n: "盐亭"
                            },
                            c10127099: {
                                n: "平武"
                            },
                            c10127119: {
                                n: "三台"
                            },
                            c10127152: {
                                n: "北川"
                            },
                            c10127215: {
                                n: "涪城区"
                            },
                            c10127214: {
                                n: "游仙区"
                            }
                        },
                        c10127007: {
                            n: "阿坝",
                            c10127006: {
                                n: "汶川"
                            },
                            c10127025: {
                                n: "理县"
                            },
                            c10127107: {
                                n: "松潘"
                            },
                            c10127114: {
                                n: "马尔康"
                            },
                            c10127168: {
                                n: "茂县"
                            },
                            c10127169: {
                                n: "九寨沟"
                            },
                            c10127170: {
                                n: "金川"
                            },
                            c10127171: {
                                n: "小金"
                            },
                            c10127172: {
                                n: "黑水"
                            },
                            c10127173: {
                                n: "壤塘"
                            },
                            c10127174: {
                                n: "若尔盖"
                            },
                            c10127175: {
                                n: "红原"
                            },
                            c10127194: {
                                n: "阿坝县"
                            }
                        },
                        c10127008: {
                            n: "雅安",
                            c10127164: {
                                n: "市辖区"
                            },
                            c10127029: {
                                n: "荥经"
                            },
                            c10127036: {
                                n: "天全"
                            },
                            c10127039: {
                                n: "石棉"
                            },
                            c10127083: {
                                n: "名山"
                            },
                            c10127089: {
                                n: "汉源"
                            },
                            c10127093: {
                                n: "宝兴"
                            },
                            c10127098: {
                                n: "芦山"
                            },
                            c10127203: {
                                n: "雨城区"
                            }
                        },
                        c10127009: {
                            n: "甘孜",
                            c10127052: {
                                n: "康定"
                            },
                            c10127176: {
                                n: "泸定"
                            },
                            c10127177: {
                                n: "丹巴"
                            },
                            c10127178: {
                                n: "雅江"
                            },
                            c10127179: {
                                n: "道孚"
                            },
                            c10127180: {
                                n: "炉霍"
                            },
                            c10127181: {
                                n: "新龙"
                            },
                            c10127182: {
                                n: "德格"
                            },
                            c10127183: {
                                n: "白玉"
                            },
                            c10127184: {
                                n: "石渠"
                            },
                            c10127185: {
                                n: "色达"
                            },
                            c10127186: {
                                n: "理塘"
                            },
                            c10127187: {
                                n: "巴塘"
                            },
                            c10127188: {
                                n: "乡城"
                            },
                            c10127189: {
                                n: "稻城"
                            },
                            c10127190: {
                                n: "得荣"
                            },
                            c10127193: {
                                n: "甘孜县"
                            },
                            c10127195: {
                                n: "九龙"
                            }
                        },
                        c10127010: {
                            n: "广元",
                            c10127153: {
                                n: "市辖区"
                            },
                            c10127028: {
                                n: "旺苍"
                            },
                            c10127035: {
                                n: "苍溪"
                            },
                            c10127082: {
                                n: "剑阁"
                            },
                            c10127088: {
                                n: "青川"
                            },
                            c10127225: {
                                n: "朝天区"
                            },
                            c10127224: {
                                n: "利州区"
                            },
                            c10127223: {
                                n: "元坝区"
                            }
                        },
                        c10127011: {
                            n: "南充",
                            c10127157: {
                                n: "市辖区"
                            },
                            c10127026: {
                                n: "营山"
                            },
                            c10127033: {
                                n: "仪陇"
                            },
                            c10127073: {
                                n: "西充"
                            },
                            c10127081: {
                                n: "阆中"
                            },
                            c10127087: {
                                n: "蓬安"
                            },
                            c10127133: {
                                n: "南部"
                            },
                            c10127213: {
                                n: "高坪区"
                            },
                            c10127212: {
                                n: "嘉陵区"
                            },
                            c10127211: {
                                n: "顺庆区"
                            }
                        },
                        c10127013: {
                            n: "内江",
                            c10127155: {
                                n: "市辖区"
                            },
                            c10127027: {
                                n: "资中"
                            },
                            c10127042: {
                                n: "隆昌"
                            },
                            c10127096: {
                                n: "威远"
                            },
                            c10127210: {
                                n: "东兴区"
                            },
                            c10127209: {
                                n: "市中区"
                            }
                        },
                        c10127014: {
                            n: "自贡",
                            c10127145: {
                                n: "市辖区"
                            },
                            c10127030: {
                                n: "富顺"
                            },
                            c10127090: {
                                n: "荣县"
                            },
                            c10127199: {
                                n: "大安区"
                            },
                            c10127198: {
                                n: "贡井区"
                            },
                            c10127197: {
                                n: "沿滩区"
                            },
                            c10127196: {
                                n: "自流井区"
                            }
                        },
                        c10127015: {
                            n: "宜宾",
                            c10127160: {
                                n: "市辖区"
                            },
                            c10127059: {
                                n: "兴文"
                            },
                            c10127066: {
                                n: "珙县"
                            },
                            c10127074: {
                                n: "筠连"
                            },
                            c10127113: {
                                n: "屏山"
                            },
                            c10127120: {
                                n: "长宁"
                            },
                            c10127126: {
                                n: "高县"
                            },
                            c10127134: {
                                n: "江安"
                            },
                            c10127161: {
                                n: "宜宾县"
                            },
                            c10127202: {
                                n: "翠屏区"
                            },
                            c10127201: {
                                n: "南溪区"
                            }
                        },
                        c10127016: {
                            n: "泸州",
                            c10127147: {
                                n: "市辖区"
                            },
                            c10127045: {
                                n: "古蔺"
                            },
                            c10127091: {
                                n: "合江"
                            },
                            c10127100: {
                                n: "叙永"
                            },
                            c10127148: {
                                n: "泸县"
                            },
                            c10127219: {
                                n: "江阳区"
                            },
                            c10127218: {
                                n: "龙马潭区"
                            },
                            c10127217: {
                                n: "纳溪区"
                            }
                        },
                        c10127017: {
                            n: "攀枝花",
                            c10127146: {
                                n: "市辖区"
                            },
                            c10127043: {
                                n: "米易"
                            },
                            c10127106: {
                                n: "盐边"
                            },
                            c10127208: {
                                n: "东区"
                            },
                            c10127207: {
                                n: "仁和区"
                            },
                            c10127206: {
                                n: "西区"
                            }
                        },
                        c10127018: {
                            n: "德阳",
                            c10127149: {
                                n: "市辖区"
                            },
                            c10127067: {
                                n: "什邡"
                            },
                            c10127075: {
                                n: "中江"
                            },
                            c10127121: {
                                n: "广汉"
                            },
                            c10127127: {
                                n: "绵竹"
                            },
                            c10127150: {
                                n: "罗江"
                            },
                            c10127227: {
                                n: "旌阳区"
                            }
                        },
                        c10127021: {
                            n: "资阳",
                            c10127166: {
                                n: "市辖区"
                            },
                            c10127105: {
                                n: "乐至"
                            },
                            c10127167: {
                                n: "安岳"
                            },
                            c10127200: {
                                n: "雁江区"
                            }
                        },
                        c10127056: {
                            n: "眉山",
                            c10127158: {
                                n: "市辖区"
                            },
                            c10127024: {
                                n: "青神"
                            },
                            c10127063: {
                                n: "仁寿"
                            },
                            c10127071: {
                                n: "洪雅"
                            },
                            c10127079: {
                                n: "彭山"
                            },
                            c10127085: {
                                n: "丹棱"
                            },
                            c10127216: {
                                n: "东坡区"
                            }
                        },
                        c10127070: {
                            n: "广安",
                            c10127162: {
                                n: "市辖区"
                            },
                            c10127023: {
                                n: "华蓥"
                            },
                            c10127078: {
                                n: "武胜"
                            },
                            c10127084: {
                                n: "邻水"
                            },
                            c10127130: {
                                n: "岳池"
                            },
                            c10127226: {
                                n: "广安区"
                            }
                        },
                        c10127117: {
                            n: "遂宁",
                            c10127154: {
                                n: "市辖区"
                            },
                            c10127062: {
                                n: "蓬溪"
                            },
                            c10127123: {
                                n: "射洪"
                            },
                            c10127192: {
                                n: "大英"
                            },
                            c10127205: {
                                n: "安居区"
                            },
                            c10127204: {
                                n: "船山区"
                            }
                        },
                        c10127125: {
                            n: "巴中",
                            c10127165: {
                                n: "市辖区"
                            },
                            c10127057: {
                                n: "平昌"
                            },
                            c10127064: {
                                n: "南江"
                            },
                            c10127118: {
                                n: "通江"
                            },
                            c10127229: {
                                n: "巴州区"
                            }
                        },
                        c10127137: {
                            n: "达州",
                            c10127163: {
                                n: "市辖区"
                            },
                            c10127012: {
                                n: "达县"
                            },
                            c10127041: {
                                n: "宣汉"
                            },
                            c10127049: {
                                n: "万源"
                            },
                            c10127055: {
                                n: "渠县"
                            },
                            c10127104: {
                                n: "开江"
                            },
                            c10127110: {
                                n: "大竹"
                            },
                            c10127228: {
                                n: "通川区"
                            }
                        }
                    },
                    c10128000: {
                        n: "西藏",
                        c10128001: {
                            n: "拉萨",
                            c10128013: {
                                n: "堆龙德庆"
                            },
                            c10128015: {
                                n: "尼木"
                            },
                            c10128022: {
                                n: "曲水"
                            },
                            c10128025: {
                                n: "城关区"
                            },
                            c10128026: {
                                n: "林周"
                            },
                            c10128027: {
                                n: "当雄"
                            },
                            c10128028: {
                                n: "达孜"
                            },
                            c10128029: {
                                n: "墨竹工卡"
                            }
                        },
                        c10128002: {
                            n: "那曲",
                            c10128011: {
                                n: "巴青"
                            },
                            c10128014: {
                                n: "索县"
                            },
                            c10128020: {
                                n: "比如"
                            },
                            c10128021: {
                                n: "班戈"
                            },
                            c10128023: {
                                n: "尼玛"
                            },
                            c10128063: {
                                n: "那曲县"
                            },
                            c10128064: {
                                n: "嘉黎"
                            },
                            c10128065: {
                                n: "聂荣"
                            },
                            c10128066: {
                                n: "安多"
                            },
                            c10128067: {
                                n: "申扎"
                            }
                        },
                        c10128003: {
                            n: "昌都",
                            c10128009: {
                                n: "芒康"
                            },
                            c10128010: {
                                n: "洛隆"
                            },
                            c10128017: {
                                n: "江达"
                            },
                            c10128018: {
                                n: "八宿"
                            },
                            c10128019: {
                                n: "丁青"
                            },
                            c10128030: {
                                n: "昌都县"
                            },
                            c10128031: {
                                n: "贡觉"
                            },
                            c10128032: {
                                n: "类乌齐"
                            },
                            c10128033: {
                                n: "察雅"
                            },
                            c10128034: {
                                n: "左贡"
                            },
                            c10128035: {
                                n: "边坝"
                            }
                        },
                        c10128004: {
                            n: "山南",
                            c10128008: {
                                n: "贡嘎"
                            },
                            c10128016: {
                                n: "扎囊"
                            },
                            c10128036: {
                                n: "乃东"
                            },
                            c10128037: {
                                n: "桑日"
                            },
                            c10128038: {
                                n: "琼结"
                            },
                            c10128039: {
                                n: "曲松"
                            },
                            c10128040: {
                                n: "措美"
                            },
                            c10128041: {
                                n: "洛扎"
                            },
                            c10128042: {
                                n: "加查"
                            },
                            c10128043: {
                                n: "隆子"
                            },
                            c10128044: {
                                n: "错那"
                            },
                            c10128045: {
                                n: "浪卡子"
                            }
                        },
                        c10128005: {
                            n: "日喀则",
                            c10128024: {
                                n: "仁布"
                            },
                            c10128046: {
                                n: "日喀则市"
                            },
                            c10128047: {
                                n: "南木林"
                            },
                            c10128048: {
                                n: "江孜"
                            },
                            c10128049: {
                                n: "定日"
                            },
                            c10128050: {
                                n: "萨迦"
                            },
                            c10128051: {
                                n: "拉孜"
                            },
                            c10128052: {
                                n: "昂仁"
                            },
                            c10128053: {
                                n: "谢通门"
                            },
                            c10128054: {
                                n: "白朗"
                            },
                            c10128055: {
                                n: "康马"
                            },
                            c10128056: {
                                n: "定结"
                            },
                            c10128057: {
                                n: "仲巴"
                            },
                            c10128058: {
                                n: "亚东"
                            },
                            c10128059: {
                                n: "吉隆"
                            },
                            c10128060: {
                                n: "聂拉木"
                            },
                            c10128061: {
                                n: "萨嘎"
                            },
                            c10128062: {
                                n: "岗巴"
                            }
                        },
                        c10128006: {
                            n: "阿里",
                            c10128012: {
                                n: "措勤"
                            },
                            c10128068: {
                                n: "普兰"
                            },
                            c10128069: {
                                n: "札达"
                            },
                            c10128070: {
                                n: "噶尔"
                            },
                            c10128071: {
                                n: "日土"
                            },
                            c10128072: {
                                n: "革吉"
                            },
                            c10128073: {
                                n: "改则"
                            }
                        },
                        c10128007: {
                            n: "林芝",
                            c10128074: {
                                n: "林芝县"
                            },
                            c10128075: {
                                n: "米林"
                            },
                            c10128076: {
                                n: "墨脱"
                            },
                            c10128077: {
                                n: "波密"
                            },
                            c10128078: {
                                n: "察隅"
                            },
                            c10128079: {
                                n: "朗县"
                            },
                            c10128080: {
                                n: "工布江达"
                            }
                        }
                    },
                    c10129000: {
                        n: "新疆",
                        c10129001: {
                            n: "乌鲁木齐",
                            c10129092: {
                                n: "天山区"
                            },
                            c10129093: {
                                n: "沙依巴克区"
                            },
                            c10129094: {
                                n: "新市区"
                            },
                            c10129095: {
                                n: "水磨沟区"
                            },
                            c10129096: {
                                n: "头屯河区"
                            },
                            c10129097: {
                                n: "达坂城区"
                            },
                            c10129098: {
                                n: "米东区"
                            },
                            c10129099: {
                                n: "乌鲁木齐县"
                            }
                        },
                        c10129004: {
                            n: "克拉玛依",
                            c10129100: {
                                n: "市辖区"
                            },
                            c10129116: {
                                n: "独山子区"
                            },
                            c10129115: {
                                n: "克拉玛依区"
                            }
                        },
                        c10129006: {
                            n: "阿勒泰",
                            c10129013: {
                                n: "哈巴河"
                            },
                            c10129019: {
                                n: "福海"
                            },
                            c10129052: {
                                n: "富蕴"
                            },
                            c10129058: {
                                n: "吉木乃"
                            },
                            c10129083: {
                                n: "青河"
                            },
                            c10129110: {
                                n: "阿勒泰市"
                            },
                            c10129111: {
                                n: "布尔津"
                            }
                        },
                        c10129007: {
                            n: "巴音郭楞",
                            c10129014: {
                                n: "和静"
                            },
                            c10129020: {
                                n: "若羌"
                            },
                            c10129025: {
                                n: "且末"
                            },
                            c10129043: {
                                n: "焉耆"
                            },
                            c10129047: {
                                n: "轮台"
                            },
                            c10129053: {
                                n: "和硕"
                            },
                            c10129059: {
                                n: "尉犁"
                            },
                            c10129080: {
                                n: "库尔勒"
                            },
                            c10129084: {
                                n: "博湖"
                            }
                        },
                        c10129008: {
                            n: "哈密",
                            c10129026: {
                                n: "伊吾"
                            },
                            c10129102: {
                                n: "哈密市"
                            },
                            c10129103: {
                                n: "巴里坤"
                            }
                        },
                        c10129009: {
                            n: "吐鲁番",
                            c10129040: {
                                n: "托克逊"
                            },
                            c10129075: {
                                n: "鄯善"
                            },
                            c10129101: {
                                n: "吐鲁番市"
                            }
                        },
                        c10129010: {
                            n: "阿克苏",
                            c10129030: {
                                n: "库车"
                            },
                            c10129035: {
                                n: "沙雅"
                            },
                            c10129038: {
                                n: "温宿"
                            },
                            c10129045: {
                                n: "柯坪"
                            },
                            c10129068: {
                                n: "新和"
                            },
                            c10129073: {
                                n: "拜城"
                            },
                            c10129078: {
                                n: "乌什"
                            },
                            c10129082: {
                                n: "阿瓦提"
                            },
                            c10129105: {
                                n: "阿克苏市"
                            }
                        },
                        c10129011: {
                            n: "喀什",
                            c10129018: {
                                n: "疏附"
                            },
                            c10129023: {
                                n: "巴楚"
                            },
                            c10129028: {
                                n: "叶城"
                            },
                            c10129033: {
                                n: "莎车"
                            },
                            c10129037: {
                                n: "英吉沙"
                            },
                            c10129041: {
                                n: "疏勒"
                            },
                            c10129057: {
                                n: "伽师"
                            },
                            c10129063: {
                                n: "麦盖提"
                            },
                            c10129066: {
                                n: "泽普"
                            },
                            c10129071: {
                                n: "岳普湖"
                            },
                            c10129076: {
                                n: "塔什库尔干"
                            },
                            c10129106: {
                                n: "喀什市"
                            }
                        },
                        c10129012: {
                            n: "和田",
                            c10129031: {
                                n: "皮山"
                            },
                            c10129036: {
                                n: "洛浦"
                            },
                            c10129039: {
                                n: "于田"
                            },
                            c10129069: {
                                n: "墨玉"
                            },
                            c10129074: {
                                n: "策勒"
                            },
                            c10129079: {
                                n: "民丰"
                            },
                            c10129107: {
                                n: "和田市"
                            },
                            c10129108: {
                                n: "和田县"
                            }
                        },
                        c10129017: {
                            n: "昌吉",
                            c10129027: {
                                n: "玛纳斯"
                            },
                            c10129032: {
                                n: "阜康"
                            },
                            c10129056: {
                                n: "奇台"
                            },
                            c10129062: {
                                n: "呼图壁"
                            },
                            c10129065: {
                                n: "吉木萨尔"
                            },
                            c10129070: {
                                n: "木垒"
                            },
                            c10129104: {
                                n: "昌吉市"
                            }
                        },
                        c10129086: {
                            n: "塔城",
                            c10129003: {
                                n: "乌苏"
                            },
                            c10129016: {
                                n: "裕民"
                            },
                            c10129049: {
                                n: "额敏"
                            },
                            c10129050: {
                                n: "沙湾"
                            },
                            c10129055: {
                                n: "托里"
                            },
                            c10129077: {
                                n: "和布克赛尔"
                            },
                            c10129109: {
                                n: "塔城市"
                            }
                        },
                        c10129088: {
                            n: "克孜勒苏柯尔克孜自治州",
                            c10129024: {
                                n: "阿图什"
                            },
                            c10129029: {
                                n: "阿克陶"
                            },
                            c10129064: {
                                n: "乌恰"
                            },
                            c10129087: {
                                n: "阿合奇"
                            }
                        },
                        c10129089: {
                            n: "博尔塔拉蒙古自治州",
                            c10129034: {
                                n: "精河"
                            },
                            c10129067: {
                                n: "博乐"
                            },
                            c10129072: {
                                n: "温泉"
                            }
                        },
                        c10129090: {
                            n: "伊犁哈萨克自治州",
                            c10129005: {
                                n: "伊宁"
                            },
                            c10129015: {
                                n: "巩留"
                            },
                            c10129021: {
                                n: "特克斯"
                            },
                            c10129044: {
                                n: "察布查尔"
                            },
                            c10129048: {
                                n: "新源"
                            },
                            c10129054: {
                                n: "尼勒克"
                            },
                            c10129060: {
                                n: "昭苏"
                            },
                            c10129081: {
                                n: "奎屯"
                            },
                            c10129085: {
                                n: "霍城"
                            },
                            c10129114: {
                                n: "伊宁县"
                            }
                        },
                        c10129091: {
                            n: "自治区直辖县级",
                            c10129002: {
                                n: "石河子"
                            },
                            c10129042: {
                                n: "阿拉尔"
                            },
                            c10129112: {
                                n: "图木舒克"
                            },
                            c10129113: {
                                n: "五家渠"
                            }
                        }
                    },
                    c10130000: {
                        n: "云南",
                        c10130001: {
                            n: "昆明",
                            c10130131: {
                                n: "五华区"
                            },
                            c10130132: {
                                n: "盘龙区"
                            },
                            c10130133: {
                                n: "官渡区"
                            },
                            c10130134: {
                                n: "西山区"
                            },
                            c10130024: {
                                n: "呈贡区"
                            },
                            c10130026: {
                                n: "东川区"
                            },
                            c10130087: {
                                n: "晋宁区"
                            },
                            c10130031: {
                                n: "安宁市"
                            },
                            c10130079: {
                                n: "宜良县"
                            },
                            c10130072: {
                                n: "富民县"
                            },
                            c10130017: {
                                n: "嵩明县"
                            },
                            c10130080: {
                                n: "寻甸回族彝族自治县"
                            },
                            c10130039: {
                                n: "禄劝彝族苗族自治县"
                            },
                            c10130135: {
                                n: "石林彝族自治县"
                            }
                        },
                        c10130002: {
                            n: "曲靖",
                            c10130136: {
                                n: "市辖区"
                            },
                            c10130025: {
                                n: "马龙"
                            },
                            c10130032: {
                                n: "师宗"
                            },
                            c10130040: {
                                n: "富源"
                            },
                            c10130047: {
                                n: "罗平"
                            },
                            c10130088: {
                                n: "会泽"
                            },
                            c10130095: {
                                n: "陆良"
                            },
                            c10130101: {
                                n: "宣威"
                            },
                            c10130137: {
                                n: "沾益"
                            },
                            c10130157: {
                                n: "麒麟区"
                            }
                        },
                        c10130003: {
                            n: "昭通",
                            c10130140: {
                                n: "市辖区"
                            },
                            c10130034: {
                                n: "永善"
                            },
                            c10130042: {
                                n: "大关"
                            },
                            c10130049: {
                                n: "盐津"
                            },
                            c10130057: {
                                n: "绥江"
                            },
                            c10130065: {
                                n: "水富"
                            },
                            c10130089: {
                                n: "镇雄"
                            },
                            c10130097: {
                                n: "彝良"
                            },
                            c10130103: {
                                n: "威信"
                            },
                            c10130109: {
                                n: "巧家"
                            },
                            c10130117: {
                                n: "鲁甸"
                            },
                            c10130154: {
                                n: "昭阳区"
                            }
                        },
                        c10130005: {
                            n: "文山",
                            c10130015: {
                                n: "砚山"
                            },
                            c10130021: {
                                n: "广南"
                            },
                            c10130028: {
                                n: "富宁"
                            },
                            c10130036: {
                                n: "麻栗坡"
                            },
                            c10130077: {
                                n: "丘北"
                            },
                            c10130084: {
                                n: "马关"
                            },
                            c10130091: {
                                n: "西畴"
                            },
                            c10130147: {
                                n: "文山市"
                            }
                        },
                        c10130007: {
                            n: "大理",
                            c10130014: {
                                n: "洱源"
                            },
                            c10130020: {
                                n: "巍山"
                            },
                            c10130046: {
                                n: "鹤庆"
                            },
                            c10130054: {
                                n: "祥云"
                            },
                            c10130062: {
                                n: "宾川"
                            },
                            c10130070: {
                                n: "弥渡"
                            },
                            c10130076: {
                                n: "永平"
                            },
                            c10130083: {
                                n: "漾濞"
                            },
                            c10130107: {
                                n: "剑川"
                            },
                            c10130114: {
                                n: "南涧"
                            },
                            c10130122: {
                                n: "云龙"
                            },
                            c10130150: {
                                n: "大理市"
                            }
                        },
                        c10130008: {
                            n: "楚雄",
                            c10130018: {
                                n: "禄丰"
                            },
                            c10130022: {
                                n: "大姚"
                            },
                            c10130029: {
                                n: "南华"
                            },
                            c10130037: {
                                n: "元谋"
                            },
                            c10130044: {
                                n: "武定"
                            },
                            c10130081: {
                                n: "牟定"
                            },
                            c10130085: {
                                n: "永仁"
                            },
                            c10130092: {
                                n: "姚安"
                            },
                            c10130099: {
                                n: "双柏"
                            },
                            c10130146: {
                                n: "楚雄市"
                            }
                        },
                        c10130009: {
                            n: "临沧",
                            c10130145: {
                                n: "市辖区"
                            },
                            c10130033: {
                                n: "耿马"
                            },
                            c10130041: {
                                n: "沧源"
                            },
                            c10130048: {
                                n: "凤庆"
                            },
                            c10130056: {
                                n: "双江"
                            },
                            c10130096: {
                                n: "镇康"
                            },
                            c10130102: {
                                n: "永德"
                            },
                            c10130108: {
                                n: "云县"
                            },
                            c10130161: {
                                n: "沧源佤族自治县"
                            },
                            c10130160: {
                                n: "临翔区"
                            }
                        },
                        c10130010: {
                            n: "保山",
                            c10130139: {
                                n: "市辖区"
                            },
                            c10130055: {
                                n: "腾冲"
                            },
                            c10130063: {
                                n: "龙陵"
                            },
                            c10130115: {
                                n: "昌宁"
                            },
                            c10130123: {
                                n: "施甸"
                            },
                            c10130164: {
                                n: "隆阳区"
                            }
                        },
                        c10130011: {
                            n: "玉溪",
                            c10130138: {
                                n: "市辖区"
                            },
                            c10130043: {
                                n: "华宁"
                            },
                            c10130051: {
                                n: "新平"
                            },
                            c10130059: {
                                n: "通海"
                            },
                            c10130067: {
                                n: "澄江"
                            },
                            c10130105: {
                                n: "江川"
                            },
                            c10130111: {
                                n: "元江"
                            },
                            c10130119: {
                                n: "易门"
                            },
                            c10130126: {
                                n: "峨山"
                            },
                            c10130156: {
                                n: "红塔区"
                            },
                            c10130155: {
                                n: "新平彝族傣族自治县"
                            }
                        },
                        c10130030: {
                            n: "丽江",
                            c10130141: {
                                n: "市辖区"
                            },
                            c10130038: {
                                n: "华坪"
                            },
                            c10130093: {
                                n: "宁蒗"
                            },
                            c10130100: {
                                n: "永胜"
                            },
                            c10130142: {
                                n: "玉龙"
                            },
                            c10130162: {
                                n: "古城区"
                            }
                        },
                        c10130052: {
                            n: "普洱",
                            c10130143: {
                                n: "市辖区"
                            },
                            c10130012: {
                                n: "西盟"
                            },
                            c10130019: {
                                n: "镇沅"
                            },
                            c10130060: {
                                n: "景谷"
                            },
                            c10130068: {
                                n: "澜沧"
                            },
                            c10130074: {
                                n: "江城"
                            },
                            c10130082: {
                                n: "孟连"
                            },
                            c10130112: {
                                n: "墨江"
                            },
                            c10130120: {
                                n: "景东"
                            },
                            c10130144: {
                                n: "宁洱"
                            },
                            c10130159: {
                                n: "思茅区"
                            },
                            c10130158: {
                                n: "西盟佤族自治县"
                            }
                        },
                        c10130098: {
                            n: "红河",
                            c10130004: {
                                n: "开远"
                            },
                            c10130027: {
                                n: "个旧"
                            },
                            c10130035: {
                                n: "弥勒"
                            },
                            c10130050: {
                                n: "建水"
                            },
                            c10130058: {
                                n: "泸西"
                            },
                            c10130066: {
                                n: "绿春"
                            },
                            c10130073: {
                                n: "屏边"
                            },
                            c10130090: {
                                n: "石屏"
                            },
                            c10130104: {
                                n: "蒙自"
                            },
                            c10130110: {
                                n: "河口"
                            },
                            c10130118: {
                                n: "金平"
                            },
                            c10130125: {
                                n: "元阳"
                            },
                            c10130153: {
                                n: "红河"
                            },
                            c10130163: {
                                n: "金平苗族瑶族傣族自治县"
                            }
                        },
                        c10130127: {
                            n: "西双版纳傣族自治州",
                            c10130045: {
                                n: "景洪"
                            },
                            c10130148: {
                                n: "勐海"
                            },
                            c10130149: {
                                n: "勐腊"
                            }
                        },
                        c10130128: {
                            n: "德宏傣族景颇族自治州",
                            c10130013: {
                                n: "盈江"
                            },
                            c10130069: {
                                n: "陇川"
                            },
                            c10130075: {
                                n: "梁河"
                            },
                            c10130121: {
                                n: "瑞丽"
                            },
                            c10130151: {
                                n: "芒市"
                            }
                        },
                        c10130129: {
                            n: "怒江傈傈族自治州",
                            c10130016: {
                                n: "兰坪"
                            },
                            c10130064: {
                                n: "泸水"
                            },
                            c10130071: {
                                n: "贡山"
                            },
                            c10130124: {
                                n: "福贡"
                            }
                        },
                        c10130130: {
                            n: "迪庆藏族自治州",
                            c10130023: {
                                n: "维西"
                            },
                            c10130086: {
                                n: "德钦"
                            },
                            c10130152: {
                                n: "香格里拉"
                            }
                        }
                    },
                    c10131000: {
                        n: "浙江",
                        c10131001: {
                            n: "杭州",
                            c10131080: {
                                n: "上城区"
                            },
                            c10131081: {
                                n: "下城区"
                            },
                            c10131084: {
                                n: "西湖区"
                            },
                            c10131082: {
                                n: "江干区"
                            },
                            c10131083: {
                                n: "拱墅区"
                            },
                            c10131085: {
                                n: "滨江区"
                            },
                            c10131077: {
                                n: "萧山区"
                            },
                            c10131067: {
                                n: "余杭区"
                            },
                            c10131020: {
                                n: "富阳区"
                            },
                            c10131044: {
                                n: "临安区"
                            },
                            c10131040: {
                                n: "建德市"
                            },
                            c10131073: {
                                n: "桐庐县"
                            },
                            c10131069: {
                                n: "淳安县"
                            }
                        },
                        c10131002: {
                            n: "温州",
                            c10131106: {
                                n: "鹿城区"
                            },
                            c10131105: {
                                n: "瓯海区"
                            },
                            c10131107: {
                                n: "龙湾区"
                            },
                            c10131030: {
                                n: "洞头区"
                            },
                            c10131019: {
                                n: "瑞安市"
                            },
                            c10131057: {
                                n: "乐清市"
                            },
                            c10131066: {
                                n: "苍南县"
                            },
                            c10131026: {
                                n: "永嘉县"
                            },
                            c10131034: {
                                n: "平阳县"
                            },
                            c10131037: {
                                n: "泰顺县"
                            },
                            c10131068: {
                                n: "文成县"
                            }
                        },
                        c10131003: {
                            n: "宁波",
                            c10131086: {
                                n: "海曙区"
                            },
                            c10131087: {
                                n: "江东区"
                            },
                            c10131088: {
                                n: "江北区"
                            },
                            c10131090: {
                                n: "鄞州区"
                            },
                            c10131089: {
                                n: "北仑区"
                            },
                            c10131039: {
                                n: "镇海区"
                            },
                            c10131047: {
                                n: "奉化区"
                            },
                            c10131042: {
                                n: "慈溪市"
                            },
                            c10131071: {
                                n: "余姚市"
                            },
                            c10131021: {
                                n: "宁海县"
                            },
                            c10131051: {
                                n: "象山县"
                            }
                        },
                        c10131004: {
                            n: "绍兴",
                            c10131094: {
                                n: "市辖区"
                            },
                            c10131028: {
                                n: "上虞"
                            },
                            c10131032: {
                                n: "新昌"
                            },
                            c10131059: {
                                n: "嵊州"
                            },
                            c10131063: {
                                n: "诸暨"
                            },
                            c10131095: {
                                n: "绍兴县"
                            },
                            c10131111: {
                                n: "越城区"
                            }
                        },
                        c10131005: {
                            n: "湖州",
                            c10131093: {
                                n: "市辖区"
                            },
                            c10131023: {
                                n: "德清"
                            },
                            c10131025: {
                                n: "长兴"
                            },
                            c10131053: {
                                n: "安吉"
                            },
                            c10131120: {
                                n: "南浔区"
                            },
                            c10131119: {
                                n: "吴兴区"
                            }
                        },
                        c10131006: {
                            n: "嘉兴",
                            c10131092: {
                                n: "市辖区"
                            },
                            c10131029: {
                                n: "桐乡"
                            },
                            c10131033: {
                                n: "海盐"
                            },
                            c10131036: {
                                n: "海宁"
                            },
                            c10131061: {
                                n: "嘉善"
                            },
                            c10131065: {
                                n: "平湖"
                            },
                            c10131118: {
                                n: "南湖区"
                            },
                            c10131117: {
                                n: "秀洲区"
                            }
                        },
                        c10131009: {
                            n: "金华",
                            c10131115: {
                                n: "婺城区"
                            },
                            c10131116: {
                                n: "金东区"
                            },
                            c10131013: {
                                n: "义乌市"
                            },
                            c10131064: {
                                n: "东阳市"
                            },
                            c10131016: {
                                n: "永康市"
                            },
                            c10131018: {
                                n: "兰溪市"
                            },
                            c10131035: {
                                n: "浦江县"
                            },
                            c10131038: {
                                n: "武义县"
                            },
                            c10131041: {
                                n: "磐安县"
                            }
                        },
                        c10131010: {
                            n: "丽水",
                            c10131101: {
                                n: "市辖区"
                            },
                            c10131022: {
                                n: "龙泉"
                            },
                            c10131024: {
                                n: "松阳"
                            },
                            c10131043: {
                                n: "青田"
                            },
                            c10131048: {
                                n: "庆元"
                            },
                            c10131052: {
                                n: "遂昌"
                            },
                            c10131056: {
                                n: "景宁"
                            },
                            c10131072: {
                                n: "缙云"
                            },
                            c10131076: {
                                n: "云和"
                            },
                            c10131114: {
                                n: "莲都区"
                            }
                        },
                        c10131011: {
                            n: "衢州",
                            c10131098: {
                                n: "市辖区"
                            },
                            c10131027: {
                                n: "常山"
                            },
                            c10131055: {
                                n: "江山"
                            },
                            c10131058: {
                                n: "开化"
                            },
                            c10131062: {
                                n: "龙游"
                            },
                            c10131113: {
                                n: "柯城区"
                            },
                            c10131112: {
                                n: "衢江区"
                            }
                        },
                        c10131012: {
                            n: "台州",
                            c10131100: {
                                n: "市辖区"
                            },
                            c10131007: {
                                n: "临海"
                            },
                            c10131014: {
                                n: "温岭"
                            },
                            c10131045: {
                                n: "仙居"
                            },
                            c10131049: {
                                n: "三门"
                            },
                            c10131074: {
                                n: "玉环"
                            },
                            c10131078: {
                                n: "天台"
                            },
                            c10131110: {
                                n: "黄岩区"
                            },
                            c10131109: {
                                n: "椒江区"
                            },
                            c10131108: {
                                n: "路桥区"
                            }
                        },
                        c10131015: {
                            n: "舟山",
                            c10131099: {
                                n: "市辖区"
                            },
                            c10131046: {
                                n: "岱山"
                            },
                            c10131079: {
                                n: "嵊泗"
                            },
                            c10131104: {
                                n: "定海区"
                            },
                            c10131103: {
                                n: "普陀区"
                            }
                        }
                    }
                }
            };
            i.district = o.province;
            for (var s = Object.getOwnPropertyNames(o.detail), c = 0; c < s.length; c++) {
                var a = s[c]
                  , r = o.detail[a];
                i.district[a] = r
            }
            i.defaultValue = 0;
            var l = "10200000";
            i.addWorkCity = function(n, e, c) {
                var o = document.getElementById(e)
                  , s = t(n)
                  , a = t(s)
                  , r = ""
                  , l = []
                  , d = 0
                  , h = 0
                  , u = 0
                  , p = {}
                  , f = "";
                if (c) {
                    var m = i[c]
                      , v = m.split(",");
                    r = r + "<li>" + v[1] + ":" + v[0] + "<ul><li>" + v[1] + ":" + v[0] + "</li></ul></li>",
                    f = v[1]
                }
                for (var g in i.district) {
                    h = 0;
                    var y = g.substring(1, g.length)
                      , w = i.district[g].n;
                    if (r += "<li>",
                    a != y && s != y || (l.push(d),
                    f = w),
                    w) {
                        r += w + ":" + y,
                        r += "<ul>";
                        for (var b in i.district[g]) {
                            u = 0;
                            var _ = b.substring(1, b.length)
                              , x = i.district[g][b].n;
                            if (_ != s && _ != n || (l.push(h),
                            f = f + " " + x),
                            x) {
                                r += "<li>" + x + ":" + _ + "<ul>";
                                for (var k in i.district[g][b]) {
                                    var T = k.substring(1, k.length)
                                      , S = i.district[g][b][k].n;
                                    T == n && (l.push(u - 1),
                                    f = f + " " + S),
                                    S && (r += "<li>" + S + ":" + T + "</li>"),
                                    u++
                                }
                                r += "</ul>",
                                h++
                            }
                        }
                    }
                    r += "</ul></li>",
                    d++
                }
                return o.innerHTML = r,
                "-1" == n && (l = [0, 0],
                f = "不限"),
                p.codeArr = l,
                p.areaStr = f,
                p
            }
            ,
            i.addWorkCity2 = function(n, e, c, o) {
                var s = document.getElementById(e)
                  , a = t(n)
                  , r = t(a)
                  , l = ""
                  , d = []
                  , h = 0
                  , u = 0
                  , p = 0
                  , f = {}
                  , m = "";
                if (c) {
                    var v = i[c]
                      , g = v.split(",");
                    l = l + "<li>" + g[1] + ":" + g[0] + "<ul><li>" + g[1] + ":" + g[0] + "</li></ul></li>",
                    m = g[1]
                }
                for (var y in i.district)
                    if (!o || "c10132000" != y && "c10133000" != y && "c10134000" != y && "c10200000" != y) {
                        u = 0;
                        var w = y.substring(1, y.length)
                          , b = i.district[y].n;
                        if (l += "<li>",
                        "10100000" == a ? n == w && (d.push(h + 1),
                        d.push(0),
                        d.push(0),
                        m = b) : r != w && a != w || (d.push(h + 1),
                        m = b),
                        b) {
                            l += b + ":" + w,
                            l += "<ul>",
                            l = l + "<li>" + g[1] + ":" + g[0] + "</li>";
                            for (var _ in i.district[y]) {
                                p = 0;
                                var x = _.substring(1, _.length)
                                  , k = i.district[y][_].n;
                                if ("10100000" != a && ("10100000" == r || "0" == r ? n == x && (d.push(u + 1),
                                d.push(0),
                                m = m + " " + k) : r != x && a != x || (d.push(u + 1),
                                m = m + " " + k)),
                                k) {
                                    l += "<li>" + k + ":" + x + "<ul>",
                                    "1" != i.district[y].d && (l = l + "<li>" + g[1] + ":" + g[0] + "</li>"),
                                    p++;
                                    for (var T in i.district[y][_]) {
                                        var S = T.substring(1, T.length)
                                          , C = i.district[y][_][T].n;
                                        "10100000" != r && S == n && (d.push(p),
                                        m = m + " " + C),
                                        C && (l += "<li>" + C + ":" + S + "</li>",
                                        p++)
                                    }
                                    l += "</ul>",
                                    u++
                                }
                            }
                        }
                        l += "</ul></li>",
                        h++
                    }
                return s.innerHTML = l,
                "-1" == n && (d = [0, 0]),
                f.codeArr = d,
                f.areaStr = m,
                f
            }
        }
    }()
}
, function(n, t, e) {
    "use strict";
    var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
        return typeof n
    }
    : function(n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    }
    ;
    if (!window.jQuery) {
        var i = Zepto;
        !function(n) {
            ["width", "height"].forEach(function(t) {
                n.fn[t] = function(e) {
                    var c, i = document.body, o = document.documentElement, s = t.replace(/./, function(n) {
                        return n[0].toUpperCase()
                    });
                    return void 0 === e ? this[0] == window ? o["client" + s] : this[0] == document ? Math.max(i["scroll" + s], i["offset" + s], o["client" + s], o["scroll" + s], o["offset" + s]) : (c = this.offset()) && c[t] : this.each(function(c) {
                        n(this).css(t, e)
                    })
                }
            }),
            ["width", "height"].forEach(function(t) {
                var e = t.replace(/./, function(n) {
                    return n[0].toUpperCase()
                });
                n.fn["outer" + e] = function(n) {
                    var c = this;
                    if (c) {
                        var i = c[0]["offset" + e];
                        return {
                            width: ["left", "right"],
                            height: ["top", "bottom"]
                        }[t].forEach(function(t) {
                            n && (i += parseInt(c.css("margin-" + t), 10))
                        }),
                        i
                    }
                    return null
                }
            }),
            ["width", "height"].forEach(function(t) {
                var e = t.replace(/./, function(n) {
                    return n[0].toUpperCase()
                });
                n.fn["inner" + e] = function() {
                    var n = this;
                    if (n[0]["inner" + e])
                        return n[0]["inner" + e];
                    var c = n[0]["offset" + e];
                    return {
                        width: ["left", "right"],
                        height: ["top", "bottom"]
                    }[t].forEach(function(t) {
                        c -= parseInt(n.css("border-" + t + "-width"), 10)
                    }),
                    c
                }
            }),
            ["Left", "Top"].forEach(function(t, e) {
                function i(n) {
                    return n && "object" == (void 0 === n ? "undefined" : c(n)) && "setInterval"in n
                }
                function o(n) {
                    return i(n) ? n : 9 === n.nodeType && (n.defaultView || n.parentWindow)
                }
                var s = "scroll" + t;
                n.fn[s] = function(t) {
                    var c, i;
                    return void 0 === t ? (c = this[0]) ? (i = o(c),
                    i ? "pageXOffset"in i ? i[e ? "pageYOffset" : "pageXOffset"] : i.document.documentElement[s] || i.document.body[s] : c[s]) : null : void this.each(function() {
                        if (i = o(this)) {
                            var c = e ? n(i).scrollLeft() : t
                              , a = e ? t : n(i).scrollTop();
                            i.scrollTo(c, a)
                        } else
                            this[s] = t
                    })
                }
            }),
            n.fn.prevUntil = function(t) {
                for (var e = this, c = []; e.length && !n(e).filter(t).length; )
                    c.push(e[0]),
                    e = e.prev();
                return n(c)
            }
            ,
            n.fn.nextUntil = function(t) {
                for (var e = this, c = []; e.length && !e.filter(t).length; )
                    c.push(e[0]),
                    e = e.next();
                return n(c)
            }
            ,
            n._extend = n.extend,
            n.extend = function() {
                return arguments[0] = arguments[0] || {},
                n._extend.apply(this, arguments)
            }
        }(i)
    }
    !function(n, t, e, i) {
        function o(n) {
            var t;
            for (t in n)
                if (d[n[t]] !== i)
                    return !0;
            return !1
        }
        function s(t, e, o) {
            var s = t;
            return "object" == (void 0 === e ? "undefined" : c(e)) ? t.each(function() {
                this.id || (this.id = "mobiscroll" + ++a),
                r[this.id] && r[this.id].destroy(),
                new n.mobiscroll.classes[e.component || "Scroller"](this,e)
            }) : ("string" == typeof e && t.each(function() {
                var n, t = r[this.id];
                return t && t[e] && (n = t[e].apply(this, Array.prototype.slice.call(o, 1))) !== i ? (s = n,
                !1) : void 0
            }),
            s)
        }
        var a = +new Date
          , r = {}
          , l = n.extend
          , d = e.createElement("modernizr").style
          , h = o(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"])
          , u = o(["flex", "msFlex", "WebkitBoxDirection"])
          , p = function() {
            var n, t = ["Webkit", "Moz", "O", "ms"];
            for (n in t)
                if (o([t[n] + "Transform"]))
                    return "-" + t[n].toLowerCase() + "-";
            return ""
        }()
          , f = p.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz");
        n.fn.mobiscroll = function(t) {
            return l(this, n.mobiscroll.components),
            s(this, t, arguments)
        }
        ,
        n.mobiscroll = n.mobiscroll || {
            version: "2.14.0",
            util: {
                prefix: p,
                jsPrefix: f,
                has3d: h,
                hasFlex: u,
                testTouch: function(t, e) {
                    if ("touchstart" == t.type)
                        n(e).attr("data-touch", "1");
                    else if (n(e).attr("data-touch"))
                        return n(e).removeAttr("data-touch"),
                        !1;
                    return !0
                },
                objectToArray: function(n) {
                    var t, e = [];
                    for (t in n)
                        e.push(n[t]);
                    return e
                },
                arrayToObject: function(n) {
                    var t, e = {};
                    if (n)
                        for (t = 0; t < n.length; t++)
                            e[n[t]] = n[t];
                    return e
                },
                isNumeric: function(n) {
                    return n - parseFloat(n) >= 0
                },
                isString: function(n) {
                    return "string" == typeof n
                },
                getCoord: function(n, t) {
                    var e = n.originalEvent || n;
                    return e.changedTouches ? e.changedTouches[0]["page" + t] : n["page" + t]
                },
                getPosition: function(e, c) {
                    var o, s, a = t.getComputedStyle ? getComputedStyle(e[0]) : e[0].style;
                    return h ? (n.each(["t", "webkitT", "MozT", "OT", "msT"], function(n, t) {
                        return a[t + "ransform"] !== i ? (o = a[t + "ransform"],
                        !1) : void 0
                    }),
                    o = o.split(")")[0].split(", "),
                    s = c ? o[13] || o[5] : o[12] || o[4]) : s = c ? a.top.replace("px", "") : a.left.replace("px", ""),
                    s
                },
                constrain: function(n, t, e) {
                    return Math.max(t, Math.min(n, e))
                }
            },
            tapped: !1,
            presets: {
                scroller: {},
                numpad: {}
            },
            themes: {
                listview: {},
                menustrip: {}
            },
            i18n: {},
            instances: r,
            classes: {},
            components: {},
            defaults: {
                theme: "mobiscroll",
                context: "body"
            },
            userdef: {},
            setDefaults: function(n) {
                l(this.userdef, n)
            },
            presetShort: function(n, t, e) {
                this.components[n] = function(c) {
                    return s(this, l(c, {
                        component: t,
                        preset: !1 === e ? i : n
                    }), arguments)
                }
            }
        };
        var m, v, l = n.extend, g = n.mobiscroll, r = g.instances, y = g.userdef, w = g.util, f = w.jsPrefix, h = w.has3d, b = w.getCoord, _ = w.constrain, x = w.isString, k = /android [1-3]/i.test(navigator.userAgent), T = "webkitAnimationEnd animationend", S = function() {}, C = function(n) {
            n.preventDefault()
        };
        g.classes.Widget = function(o, s, a) {
            function d(t) {
                Y && Y.removeClass("dwb-a"),
                Y = n(this),
                Y.hasClass("dwb-d") || Y.hasClass("dwb-nhl") || Y.addClass("dwb-a"),
                "mousedown" === t.type && n(e).on("mouseup", u)
            }
            function u(t) {
                Y && (Y.removeClass("dwb-a"),
                Y = null),
                "mouseup" === t.type && n(e).off("mouseup", u)
            }
            function p(n) {
                n || z.focus(),
                cn.ariaMessage(G.ariaMessage)
            }
            function w(t) {
                var e, c, o, s = G.focusOnClose;
                D.remove(),
                m && !t && setTimeout(function() {
                    if (s === i || !0 === s) {
                        v = !0,
                        e = m[0],
                        o = e.type,
                        c = e.value;
                        try {
                            e.type = "button"
                        } catch (n) {}
                        m.focus(),
                        e.type = o,
                        e.value = c
                    } else
                        s && (r[n(s).attr("id")] && (g.tapped = !1),
                        n(s).focus())
                }, 200),
                cn._isVisible = !1,
                A("onHide", [])
            }
            function P(n) {
                clearTimeout(an[n.type]),
                an[n.type] = setTimeout(function() {
                    var t = "scroll" == n.type;
                    t && !Q || cn.position(!t)
                }, 200)
            }
            function E(t) {
                g.tapped || (t && t(),
                n(e.activeElement).is("input,textarea") && n(e.activeElement).blur(),
                m = on,
                cn.show()),
                setTimeout(function() {
                    v = !1
                }, 300)
            }
            function A(t, e) {
                var c;
                return e.push(cn),
                n.each([y, K, F, s], function(n, i) {
                    i && i[t] && (c = i[t].apply(o, e))
                }),
                c
            }
            var M, I, $, D, j, B, z, L, V, O, Y, X, W, R, H, U, N, q, F, Z, G, Q, J, K, nn, tn, en, cn = this, on = n(o), sn = [], an = {};
            cn.position = function(t) {
                var c, o, s, a, r, l, d, h, u, p, f, m, v, g, y, w, b = 0, x = 0, k = {}, T = Math.min(L[0].innerWidth || L.innerWidth(), B.width()), S = L[0].innerHeight || L.innerHeight();
                tn === T && en === S && t || Z || ((cn._isFullScreen || /top|bottom/.test(G.display)) && z.width(T),
                !1 !== A("onPosition", [D, T, S]) && R && (y = L.scrollLeft(),
                w = L.scrollTop(),
                a = G.anchor === i ? on : n(G.anchor),
                cn._isLiquid && "liquid" !== G.layout && (400 > T ? D.addClass("dw-liq") : D.removeClass("dw-liq")),
                !cn._isFullScreen && /modal|bubble/.test(G.display) && (V.width(""),
                n(".mbsc-w-p", D).each(function() {
                    c = n(this).outerWidth(!0),
                    b += c,
                    x = c > x ? c : x
                }),
                c = b > T ? x : b,
                V.width(c).css("white-space", b > T ? "" : "nowrap")),
                U = cn._isFullScreen ? T : z.outerWidth(),
                N = cn._isFullScreen ? S : z.outerHeight(!0),
                Q = S >= N && T >= U,
                cn.scrollLock = Q,
                "modal" == G.display ? (o = Math.max(0, y + (T - U) / 2),
                s = w + (S - N) / 2) : "bubble" == G.display ? (g = !0,
                p = n(".dw-arrw-i", D),
                d = a.offset(),
                h = Math.abs(I.offset().top - d.top),
                u = Math.abs(I.offset().left - d.left),
                r = a.outerWidth(),
                l = a.outerHeight(),
                o = _(u - (z.outerWidth(!0) - r) / 2, y + 3, y + T - U - 3),
                s = h - N,
                w > s || h > w + S ? (z.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),
                s = h + l) : z.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"),
                f = p.outerWidth(),
                m = _(u + r / 2 - (o + (U - f) / 2), 0, f),
                n(".dw-arr", D).css({
                    left: m
                })) : (o = y,
                "top" == G.display ? s = w : "bottom" == G.display && (s = w + S - N)),
                s = 0 > s ? 0 : s,
                k.top = s,
                k.left = o,
                z.css(k),
                B.height(0),
                v = Math.max(s + N, "body" == G.context ? n(e).height() : I[0].scrollHeight),
                B.css({
                    height: v
                }),
                g && (s + N > w + S || h > w + S) && (Z = !0,
                setTimeout(function() {
                    Z = !1
                }, 300),
                L.scrollTop(Math.min(s + N - S, v - S))),
                tn = T,
                en = S))
            }
            ,
            cn.attachShow = function(n, t) {
                sn.push(n),
                "inline" !== G.display && (J && n.on("mousedown.dw", function(n) {
                    n.preventDefault()
                }),
                G.showOnFocus && n.on("focus.dw", function() {
                    v || E(t)
                }),
                G.showOnTap && cn.tap(n, function() {
                    E(t)
                }))
            }
            ,
            cn.select = function() {
                cn._fillValue(),
                cn.settings.callback && "function" == typeof cn.settings.callback && cn.settings.callback(),
                R && !1 === cn.hide(!1, "set") || A("onSelect", [cn._value])
            }
            ,
            cn.cancel = function() {
                cn.settings.offcallback && "function" == typeof cn.settings.offcallback && cn.settings.offcallback(),
                R && !1 === cn.hide(!1, "cancel") || A("onCancel", [cn._value])
            }
            ,
            cn.clear = function() {
                A("onClear", [D]),
                R && !cn.live && cn.hide(!1, "clear"),
                cn.setValue(null, !0)
            }
            ,
            cn.enable = function() {
                G.disabled = !1,
                cn._isInput && on.prop("disabled", !1)
            }
            ,
            cn.disable = function() {
                G.disabled = !0,
                cn._isInput && on.prop("disabled", !0)
            }
            ,
            cn.show = function(e, c) {
                var o;
                G.disabled || cn._isVisible || (!1 !== X && ("top" == G.display && (X = "slidedown"),
                "bottom" == G.display && (X = "slideup")),
                cn._readValue(),
                A("onBeforeShow", []),
                o = '<div lang="' + G.lang + '" class="mbsc-' + G.theme + " dw-" + G.display + " " + (G.cssClass || "") + (cn._isLiquid ? " dw-liq" : "") + (k ? " mbsc-old" : "") + (W ? "" : " dw-nobtn") + '"><div class="dw-persp">' + (R ? '<div class="dwo"></div>' : "") + "<div" + (R ? ' role="dialog" tabindex="-1"' : "") + ' class="dw' + (G.rtl ? " dw-rtl" : " dw-ltr") + '">' + ("bubble" === G.display ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : "") + '<div class="dwwr"><div aria-live="assertive" class="dw-aria dw-hidden"></div>' + (G.headerText ? '<div class="dwv">' + (x(G.headerText) ? G.headerText : "") + "</div>" : "") + '<div class="dwcc">',
                o += cn._generateContent(),
                o += "</div>",
                W && (o += '<div class="dwbc">',
                n.each(O, function(n, t) {
                    t = x(t) ? cn.buttons[t] : t,
                    "set" === t.handler && (t.parentClass = "dwb-s"),
                    "cancel" === t.handler && (t.parentClass = "dwb-c"),
                    t.handler = x(t.handler) ? cn.handlers[t.handler] : t.handler,
                    o += "<div" + (G.btnWidth ? ' style="width:' + 100 / O.length + '%"' : "") + ' class="dwbw ' + (t.parentClass || "") + '"><div tabindex="0" role="button" class="dwb' + n + " dwb-e " + (t.cssClass === i ? G.btnClass : t.cssClass) + (t.icon ? " mbsc-ic mbsc-ic-" + t.icon : "") + '">' + (t.text || "") + "</div></div>"
                }),
                o += "</div>"),
                o += "</div></div></div></div>",
                D = n(o),
                B = n(".dw-persp", D),
                j = n(".dwo", D),
                V = n(".dwwr", D),
                $ = n(".dwv", D),
                z = n(".dw", D),
                M = n(".dw-aria", D),
                cn._markup = D,
                cn._header = $,
                cn._isVisible = !0,
                q = "orientationchange resize",
                cn._markupReady(),
                A("onMarkupReady", [D]),
                R ? (n(t).on("keydown.dw", function(n) {
                    13 == n.keyCode ? cn.select() : 27 == n.keyCode && cn.cancel()
                }),
                G.scrollLock && D.on("touchstart touchmove mousewheel DOMMouseScroll", function(n) {
                    Q && n.preventDefault()
                }),
                "Moz" !== f && n("input,select,button", I).each(function() {
                    this.disabled || n(this).addClass("dwtd").prop("disabled", !0)
                }),
                q += " scroll",
                g.activeInstance = cn,
                D.appendTo(I),
                h && X && !e && D.addClass("dw-in dw-trans").on(T, function() {
                    D.off(T).removeClass("dw-in dw-trans").find(".dw").removeClass("dw-" + X),
                    p(c)
                }).find(".dw").addClass("dw-" + X)) : on.is("div") ? on.html(D) : D.insertAfter(on),
                A("onMarkupInserted", [D]),
                cn.position(),
                L.on(q, P),
                D.on("selectstart mousedown", C).on("click", ".dwb-e", C).on("keydown", ".dwb-e", function(t) {
                    32 == t.keyCode && (t.preventDefault(),
                    t.stopPropagation(),
                    n(this).click())
                }),
                setTimeout(function() {
                    n.each(O, function(t, e) {
                        cn.tap(n(".dwb" + t, D), function(n) {
                            e = x(e) ? cn.buttons[e] : e,
                            e.handler.call(this, n, cn)
                        }, !0)
                    }),
                    G.closeOnOverlay && cn.tap(j, function() {
                        cn.cancel()
                    }),
                    R && !X && p(c),
                    D.on("touchstart mousedown", ".dwb-e", d).on("touchend", ".dwb-e", u),
                    cn._attachEvents(D)
                }, 300),
                A("onShow", [D, cn._tempValue]))
            }
            ,
            cn.hide = function(t, e, c) {
                return !(!cn._isVisible || !c && !cn._isValid && "set" == e || !c && !1 === A("onClose", [cn._tempValue, e])) && (D && ("Moz" !== f && n(".dwtd", I).each(function() {
                    n(this).prop("disabled", !1).removeClass("dwtd")
                }),
                h && R && X && !t && !D.hasClass("dw-trans") ? D.addClass("dw-out dw-trans").find(".dw").addClass("dw-" + X).on(T, function() {
                    w(t)
                }) : w(t),
                L.off(q, P)),
                void delete g.activeInstance)
            }
            ,
            cn.ariaMessage = function(n) {
                M.html(""),
                setTimeout(function() {
                    M.html(n)
                }, 100)
            }
            ,
            cn.isVisible = function() {
                return cn._isVisible
            }
            ,
            cn.setValue = S,
            cn._generateContent = S,
            cn._attachEvents = S,
            cn._readValue = S,
            cn._fillValue = S,
            cn._markupReady = S,
            cn._processSettings = S,
            cn.tap = function(n, t, e) {
                var c, i, o;
                G.tap && n.on("touchstart.dw", function(n) {
                    e && n.preventDefault(),
                    c = b(n, "X"),
                    i = b(n, "Y"),
                    o = !1
                }).on("touchmove.dw", function(n) {
                    (Math.abs(b(n, "X") - c) > 20 || Math.abs(b(n, "Y") - i) > 20) && (o = !0)
                }).on("touchend.dw", function(n) {
                    var e = this;
                    o || (n.preventDefault(),
                    t.call(e, n)),
                    g.tapped = !0,
                    setTimeout(function() {
                        g.tapped = !1
                    }, 500)
                })
            }
            ,
            cn.option = function(n, t) {
                var e = {};
                "object" == (void 0 === n ? "undefined" : c(n)) ? e = n : e[n] = t,
                cn.init(e)
            }
            ,
            cn.destroy = function() {
                cn.hide(!0, !1, !0),
                n.each(sn, function(n, t) {
                    t.off(".dw")
                }),
                cn._isInput && J && (o.readOnly = nn),
                A("onDestroy", []),
                delete r[o.id]
            }
            ,
            cn.getInst = function() {
                return cn
            }
            ,
            cn.trigger = A,
            cn.init = function(e) {
                cn.settings = G = {},
                l(s, e),
                l(G, g.defaults, cn._defaults, y, s),
                K = g.themes[G.theme] || g.themes.mobiscroll,
                H = g.i18n[G.lang],
                A("onThemeLoad", [H, s]),
                l(G, K, H, y, s),
                F = g.presets[cn._class][G.preset],
                G.buttons = G.buttons || ("inline" !== G.display ? ["set", "cancel"] : []),
                G.headerText = G.headerText === i ? "inline" !== G.display && "{value}" : G.headerText,
                F && (F = F.call(o, cn),
                l(G, F, s)),
                g.themes[G.theme] || (G.theme = "mobiscroll"),
                cn._isLiquid = "liquid" === (G.layout || (/top|bottom/.test(G.display) ? "liquid" : "")),
                cn._processSettings(),
                on.off(".dw"),
                X = !k && G.animate,
                O = G.buttons,
                R = "inline" !== G.display,
                J = G.showOnFocus || G.showOnTap,
                L = n("body" == G.context ? t : G.context),
                I = n(G.context),
                cn.context = L,
                cn.live = !0,
                n.each(O, function(n, t) {
                    return "set" === t || "set" === t.handler ? (cn.live = !1,
                    !1) : void 0
                }),
                cn.buttons.set = {
                    text: G.setText,
                    handler: "set"
                },
                cn.buttons.cancel = {
                    text: cn.live ? G.closeText : G.cancelText,
                    handler: "cancel"
                },
                cn.buttons.clear = {
                    text: G.clearText,
                    handler: "clear"
                },
                cn._isInput = on.is("input"),
                W = O.length > 0,
                cn._isVisible && cn.hide(!0, !1, !0),
                R ? (cn._readValue(),
                cn._isInput && J && (nn === i && (nn = o.readOnly),
                o.readOnly = !0),
                cn.attachShow(on)) : cn.show(),
                on.on("change.dw", function() {
                    cn._preventChange || cn.setVal(on.val(), !0, !1),
                    cn._preventChange = !1
                }),
                A("onInit", [])
            }
            ,
            cn.buttons = {},
            cn.handlers = {
                set: cn.select,
                cancel: cn.cancel,
                clear: cn.clear
            },
            cn._value = null,
            cn._isValid = !0,
            a || (r[o.id] = cn,
            cn.init(s))
        }
        ,
        g.classes.Widget.prototype._defaults = {
            lang: "en",
            setText: "Set",
            selectedText: "Selected",
            closeText: "Close",
            cancelText: "Cancel",
            clearText: "Clear",
            disabled: !1,
            closeOnOverlay: !0,
            showOnFocus: !0,
            showOnTap: !0,
            display: "modal",
            scrollLock: !0,
            tap: !0,
            btnClass: "dwb",
            btnWidth: !0,
            focusOnClose: !1
        },
        g.themes.mobiscroll = {
            rows: 5,
            showLabel: !1,
            headerText: !1,
            btnWidth: !1,
            selectedLineHeight: !0,
            selectedLineBorder: 1,
            dateOrder: "MMddyy",
            weekDays: "min",
            checkIcon: "ion-ios7-checkmark-empty",
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
        },
        n(t).on("focus", function() {
            m && (v = !0)
        }),
        n(e).on("mouseover mouseup mousedown click", function(n) {
            return g.tapped ? (n.stopPropagation(),
            n.preventDefault(),
            !1) : void 0
        }),
        n.mobiscroll.themes["android-holo-light"] = {
            dateOrder: "Mddyy",
            rows: 5,
            minWidth: 76,
            height: 36,
            showLabel: !1,
            selectedLineHeight: !0,
            selectedLineBorder: 2,
            useShortLabels: !0,
            icon: {
                filled: "star3",
                empty: "star"
            },
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down6",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up6",
            onMarkupReady: function(n) {
                n.addClass("mbsc-android-holo")
            }
        },
        n.mobiscroll.themes.listview["android-holo-light"] = {
            onInit: function() {
                n(this).closest(".mbsc-lv-cont").addClass("mbsc-lv-android-holo")
            }
        },
        n.mobiscroll.themes.menustrip["android-holo-light"] = {
            onMarkupReady: function(n) {
                n.addClass("mbsc-android-holo")
            }
        },
        n.mobiscroll.i18n.zh = n.extend(n.mobiscroll.i18n.zh, {
            setText: "确定",
            cancelText: "取消",
            clearText: "明确",
            selectedText: "选",
            dateFormat: "yy/mm/dd",
            dateOrder: "yymmdd",
            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            dayText: "日",
            hourText: "时",
            minuteText: "分",
            monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            monthText: "月",
            secText: "秒",
            timeFormat: "HH:ii",
            timeWheels: "HHii",
            yearText: "年",
            nowText: "当前",
            pmText: "下午",
            amText: "上午",
            dateText: "日",
            timeText: "时间",
            calendarText: "日历",
            closeText: "关闭",
            fromText: "开始时间",
            toText: "结束时间",
            wholeText: "合计",
            fractionText: "分数",
            unitText: "单位",
            labels: ["年", "月", "日", "小时", "分钟", "秒", ""],
            labelsShort: ["年", "月", "日", "点", "分", "秒", ""],
            startText: "开始",
            stopText: "停止",
            resetText: "重置",
            lapText: "圈",
            hideText: "隐藏"
        });
        var P, g = n.mobiscroll, E = g.classes, r = g.instances, w = g.util, f = w.jsPrefix, h = w.has3d, u = w.hasFlex, b = w.getCoord, _ = w.constrain, A = w.testTouch;
        E.Scroller = function(t, c, o) {
            function s(t) {
                !A(t, this) || P || H || O || x(this) || (t.preventDefault(),
                t.stopPropagation(),
                P = !0,
                Y = "clickpick" != W.mode,
                J = n(".dw-ul", this),
                T(J),
                U = on[K] !== i,
                Z = U ? C(J) : sn[K],
                N = b(t, "Y"),
                q = new Date,
                F = N,
                I(J, K, Z, .001),
                Y && J.closest(".dwwl").addClass("dwa"),
                "mousedown" === t.type && n(e).on("mousemove", a).on("mouseup", l))
            }
            function a(n) {
                P && Y && (n.preventDefault(),
                n.stopPropagation(),
                F = b(n, "Y"),
                (Math.abs(F - N) > 3 || U) && (I(J, K, _(Z + (N - F) / X, G - 1, Q + 1)),
                U = !0))
            }
            function l(t) {
                if (P) {
                    var c, i, o, s = new Date - q, r = _(Z + (N - F) / X, G - 1, Q + 1), d = J.offset().top;
                    if (t.stopPropagation(),
                    h && 300 > s ? (c = (F - N) / s,
                    i = c * c / W.speedUnit,
                    0 > F - N && (i = -i)) : i = F - N,
                    o = Math.round(Z - i / X),
                    !U) {
                        var u = Math.floor((F - d) / X)
                          , p = n(n(".dw-li", J)[u])
                          , f = p.hasClass("dw-v")
                          , m = Y;
                        !1 !== R("onValueTap", [p]) && f ? o = u : m = !0,
                        m && f && (p.addClass("dw-hl"),
                        setTimeout(function() {
                            p.removeClass("dw-hl")
                        }, 100))
                    }
                    Y && j(J, o, 0, !0, Math.round(r)),
                    "mouseup" === t.type && n(e).off("mousemove", a).off("mouseup", l),
                    P = !1
                }
            }
            function d(t) {
                O = n(this),
                A(t, this) && y(t, O.closest(".dwwl"), O.hasClass("dwwbp") ? B : z),
                "mousedown" === t.type && n(e).on("mouseup", p)
            }
            function p(t) {
                alert(2),
                O = null,
                H && (clearInterval(tn),
                H = !1),
                "mouseup" === t.type && n(e).off("mouseup", p)
            }
            function m(t) {
                38 == t.keyCode ? y(t, n(this), z) : 40 == t.keyCode && y(t, n(this), B)
            }
            function v() {
                H && (clearInterval(tn),
                H = !1)
            }
            function g(t) {
                if (!x(this)) {
                    t.preventDefault(),
                    t = t.originalEvent || t;
                    var e = t.wheelDelta ? t.wheelDelta / 120 : t.detail ? -t.detail / 3 : 0
                      , c = n(".dw-ul", this);
                    T(c),
                    j(c, Math.round(sn[K] - e), 0 > e ? 1 : 2)
                }
            }
            function y(n, t, e) {
                if (n.stopPropagation(),
                n.preventDefault(),
                !H && !x(t) && !t.hasClass("dwa")) {
                    H = !0;
                    var c = t.find(".dw-ul");
                    T(c),
                    clearInterval(tn),
                    tn = setInterval(function() {
                        e(c)
                    }, W.delay),
                    e(c)
                }
            }
            function x(t) {
                if (n.isArray(W.readonly)) {
                    var e = n(".dwwl", V).index(t);
                    return W.readonly[e]
                }
                return W.readonly
            }
            function k(t) {
                var e = '<div class="dw-bf">'
                  , c = rn[t]
                  , i = 1
                  , o = c.labels || []
                  , s = c.values
                  , a = c.keys || s
                  , r = c.datas ? c.datas : ""
                  , l = c.codes ? c.codes : "";
                return n.each(s, function(n, t) {
                    i % 20 == 0 && (e += '</div><div class="dw-bf">'),
                    e += '<div role="option" aria-selected="false" class="dw-li dw-v" data-code="' + ("" == l ? "" : l[n]) + '" data-show="' + ("" == r ? "" : r[n]) + '"data-val="' + a[n] + '"' + (o[n] ? ' aria-label="' + o[n] + '"' : "") + ' style="height:' + X + "px;line-height:" + X + 'px;"><div class="dw-i"' + (nn > 1 ? ' style="line-height:' + Math.round(X / nn) + "px;font-size:" + Math.round(X / nn * .8) + 'px;"' : "") + ">" + t + "</div></div>",
                    i++
                }),
                e += "</div>"
            }
            function T(t) {
                var e = t.closest(".dwwl").hasClass("dwwms");
                G = n(".dw-li", t).index(n(e ? ".dw-li" : ".dw-v", t).eq(0)),
                Q = Math.max(G, n(".dw-li", t).index(n(e ? ".dw-li" : ".dw-v", t).eq(-1)) - (e ? W.rows - 1 : 0)),
                K = n(".dw-ul", V).index(t)
            }
            function S(n) {
                var e = W.headerText;
                return e ? "function" == typeof e ? e.call(t, n) : e.replace(/\{value\}/i, n) : ""
            }
            function C(n) {
                return Math.round(-w.getPosition(n, !0) / X)
            }
            function M(n, t) {
                clearTimeout(on[t]),
                delete on[t],
                n.closest(".dwwl").removeClass("dwa")
            }
            function I(n, t, e, c, i) {
                var o = -e * X
                  , s = n[0].style;
                o == an[t] && on[t] || (an[t] = o,
                h ? (s[f + "Transition"] = w.prefix + "transform " + (c ? c.toFixed(3) : 0) + "s ease-out",
                s[f + "Transform"] = "translate3d(0," + o + "px,0)") : s.top = o + "px",
                on[t] && M(n, t),
                c && i && (n.closest(".dwwl").addClass("dwa"),
                on[t] = setTimeout(function() {
                    M(n, t)
                }, 1e3 * c)),
                sn[t] = e)
            }
            function $(t, e, c, i) {
                var o = n('.dw-li[data-val="' + t + '"]', e)
                  , s = n(".dw-li", e)
                  , a = s.index(o)
                  , r = s.length;
                if (i)
                    T(e);
                else if (!o.hasClass("dw-v")) {
                    for (var l = o, d = o, h = 0, u = 0; a - h >= 0 && !l.hasClass("dw-v"); )
                        h++,
                        l = s.eq(a - h);
                    for (; r > a + u && !d.hasClass("dw-v"); )
                        u++,
                        d = s.eq(a + u);
                    (h > u && u && 2 !== c || !h || 0 > a - h || 1 == c) && d.hasClass("dw-v") ? (o = d,
                    a += u) : (o = l,
                    a -= h)
                }
                return {
                    cell: o,
                    v: i ? _(a, G, Q) : a,
                    val: o.hasClass("dw-v") ? o.attr("data-val") : null
                }
            }
            function D(t, e, c, o, s) {
                !1 !== R("validate", [V, e, t, o]) && (n(".dw-ul", V).each(function(c) {
                    var a = n(this)
                      , r = a.closest(".dwwl").hasClass("dwwms")
                      , l = c == e || e === i
                      , d = $(en._tempWheelArray[c], a, o, r)
                      , h = d.cell;
                    h.hasClass("dw-sel") && !l || (en._tempWheelArray[c] = d.val,
                    r || (n(".dw-sel", a).removeAttr("aria-selected"),
                    h.attr("aria-selected", "true")),
                    n(".dw-sel", a).removeClass("dw-sel"),
                    h.addClass("dw-sel"),
                    I(a, c, d.v, l ? t : .1, !!l && s))
                }),
                en._tempValue = W.formatResult(en._tempWheelArray),
                en.live && (en._hasValue = c || en._hasValue,
                L(c, c, 0, !0)),
                en._header.html(S(en._tempValue)),
                c && R("onChange", [en._tempValue]),
                R("onValidated", []))
            }
            function j(t, e, c, o, s) {
                e = _(e, G, Q);
                var a = n(".dw-li", t).eq(e)
                  , r = s === i ? e : s
                  , l = s !== i
                  , d = K
                  , h = Math.abs(e - r)
                  , u = o ? e == r ? .1 : h * W.timeUnit * Math.max(.5, (100 - h) / 100) : 0;
                en._tempWheelArray[d] = a.attr("data-val"),
                I(t, d, e, u, l),
                setTimeout(function() {
                    D(u, d, !0, c, l)
                }, 10)
            }
            function B(n) {
                var t = sn[K] + 1;
                j(n, t > Q ? G : t, 1, !0)
            }
            function z(n) {
                var t = sn[K] - 1;
                j(n, G > t ? Q : t, 2, !0)
            }
            function L(n, t, e, c, i) {
                if (en._isVisible && !c && D(e),
                en._tempValue = W.formatResult(en._tempWheelArray),
                w.isNumeric(en._tempValue) && (en._tempValue = +en._tempValue),
                i || (en._wheelArray = en._tempWheelArray.slice(0),
                en._value = en._hasValue ? en._tempValue : null),
                n)
                    if (R("onValueFill", [en._hasValue ? en._tempValue : "", t]),
                    en._isInput)
                        cn.val(en._hasValue ? en._tempValue : ""),
                        t && (en._preventChange = !0,
                        cn.change());
                    else {
                        var o = en._hasValue ? en._tempValue + "" : "";
                        o && (o.indexOf("-") > -1 || o.indexOf("/") > -1) && "-1" != o && (cn.html(o),
                        cn.next().val(o)),
                        t && (en._preventChange = !0,
                        cn.change())
                    }
            }
            var V, O, Y, X, W, R, H, U, N, q, F, Z, G, Q, J, K, nn, tn, en = this, cn = n(t), on = {}, sn = {}, an = {}, rn = [];
            E.Widget.call(this, t, c, !0),
            en.setVal = en._setVal = function(e, c, o, s, a) {
                en._hasValue = null !== e && e !== i,
                en._tempWheelArray = n.isArray(e) ? e.slice(0) : W.parseValue.call(t, e, en),
                L(c, o === i ? c : o, a, !1, s)
            }
            ,
            en.getVal = en._getVal = function(n) {
                return en._hasValue ? en[n ? "_tempValue" : "_value"] : null
            }
            ,
            en.setArrayVal = en.setVal,
            en.getArrayVal = function(n) {
                return n ? en._tempWheelArray : en._wheelArray
            }
            ,
            en.setValue = function(n, t, e, c, i) {
                en.setVal(n, t, i, c, e)
            }
            ,
            en.getValue = en.getArrayVal,
            en.changeWheel = function(t, e, c) {
                if (V) {
                    var o = 0
                      , s = t.length;
                    n.each(W.wheels, function(a, r) {
                        return n.each(r, function(a, r) {
                            return n.inArray(o, t) > -1 && (rn[o] = r,
                            n(".dw-ul", V).eq(o).html(k(o)),
                            !--s) ? (en.position(),
                            D(e, i, c),
                            !1) : void o++
                        }),
                        !!s && void 0
                    })
                }
            }
            ,
            en.getValidCell = $,
            en._generateContent = function() {
                var t, e = "", c = 0;
                return n.each(W.wheels, function(o, s) {
                    e += '<div class="mbsc-w-p dwc' + ("scroller" != W.mode ? " dwpm" : " dwsc") + (W.showLabel ? "" : " dwhl") + '"><div class="dwwc"' + (W.maxWidth ? "" : ' style="max-width:600px;"') + ">" + (u ? "" : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>'),
                    n.each(s, function(n, o) {
                        rn[c] = o,
                        t = o.label !== i ? o.label : n,
                        e += "<" + (u ? "div" : "td") + ' class="dwfl" style="' + (W.fixedWidth ? "width:" + (W.fixedWidth[c] || W.fixedWidth) + "px;" : (W.minWidth ? "min-width:" + (W.minWidth[c] || W.minWidth) + "px;" : "min-width:" + W.width + "px;") + (W.maxWidth ? "max-width:" + (W.maxWidth[c] || W.maxWidth) + "px;" : "")) + '"><div class="dwwl dwwl' + c + (o.multiple ? " dwwms" : "") + '">' + ("scroller" != W.mode ? '<div class="dwb-e dwwb dwwbp ' + (W.btnPlusClass || "") + '" style="height:' + X + "px;line-height:" + X + 'px;"><span>+</span></div><div class="dwb-e dwwb dwwbm ' + (W.btnMinusClass || "") + '" style="height:' + X + "px;line-height:" + X + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + t + '</div><div tabindex="0" aria-live="off" aria-label="' + t + '" role="listbox" class="dwww"><div class="dww" style="height:' + W.rows * X + 'px;"><div class="dw-ul" style="margin-top:' + (o.multiple ? 0 : W.rows / 2 * X - X / 2) + 'px;">',
                        e += k(c) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' + (W.selectedLineHeight ? ' style="height:' + X + "px;margin-top:-" + (X / 2 + (W.selectedLineBorder || 0)) + 'px;"' : "") + "></div></div>" + (u ? "</div>" : "</td>"),
                        c++
                    }),
                    e += (u ? "" : "</tr></table>") + "</div></div>"
                }),
                e
            }
            ,
            en._attachEvents = function(n) {
                n.on("DOMMouseScroll mousewheel", ".dwwl", g).on("keydown", ".dwwl", m).on("keyup", ".dwwl", v).on("touchstart mousedown", ".dwwl", s).on("touchmove", ".dwwl", a).on("touchend", ".dwwl", l).on("touchstart mousedown", ".dwwb", d).on("touchend", ".dwwb", p)
            }
            ,
            en._markupReady = function() {
                V = en._markup,
                D()
            }
            ,
            en._fillValue = function() {
                en._hasValue = !0,
                L(!0, !0, 0, !0)
            }
            ,
            en._readValue = function() {
                var n = cn.val() || "";
                en._hasValue = "" !== n,
                en._tempWheelArray = en._wheelArray ? en._wheelArray.slice(0) : W.parseValue(n, en),
                L()
            }
            ,
            en._processSettings = function() {
                W = en.settings,
                R = en.trigger,
                X = W.height,
                nn = W.multiline,
                en._isLiquid = "liquid" === (W.layout || (/top|bottom/.test(W.display) && 1 == W.wheels.length ? "liquid" : "")),
                nn > 1 && (W.cssClass = (W.cssClass || "") + " dw-ml")
            }
            ,
            en._selectedValues = {},
            o || (r[t.id] = en,
            en.init(c))
        }
        ,
        E.Scroller.prototype._class = "scroller",
        E.Scroller.prototype._defaults = n.extend({}, E.Widget.prototype._defaults, {
            minWidth: 80,
            height: 40,
            rows: 3,
            multiline: 1,
            delay: 300,
            readonly: !1,
            showLabel: !0,
            wheels: [],
            mode: "scroller",
            preset: "",
            speedUnit: .0012,
            timeUnit: .08,
            formatResult: function(n) {
                return n.join(" ")
            },
            parseValue: function(t, e) {
                var c, i = t.split(" "), o = [], s = 0;
                return n.each(e.settings.wheels, function(t, e) {
                    n.each(e, function(t, e) {
                        c = e.keys || e.values,
                        -1 !== n.inArray(i[s], c) ? o.push(i[s]) : o.push(c[0]),
                        s++
                    })
                }),
                o
            }
        })
    }(i, window, document)
}
, function(n, t, e) {
    "use strict";
    !function(n, t) {
        var e = n.mobiscroll
          , c = e.presets.scroller;
        c.treelist = c.list,
        e.presetShort("list"),
        e.presetShort("treelist");
        var e = n.mobiscroll
          , i = {
            invalid: [],
            showInput: !0,
            inputClass: ""
        };
        e.presets.scroller.list = function(e) {
            function c(t, e, c, i) {
                for (var s, a = 0; a < e; ) {
                    var r = n(".dwwl" + a, t)
                      , l = o(i, a, c);
                    for (s = 0; s < l.length; s++)
                        n('.dw-li[data-val="' + l[s] + '"]', r).removeClass("dw-v");
                    a++
                }
            }
            function o(n, t, e) {
                for (var c, i = 0, o = e, s = []; i < t; ) {
                    var a = n[i];
                    for (c in o)
                        if (o[c].key == a) {
                            o = o[c].children;
                            break
                        }
                    i++
                }
                for (i = 0; i < o.length; )
                    o[i].invalid && s.push(o[i].key),
                    i++;
                return s
            }
            function s(n, t) {
                for (var e = []; n; )
                    e[--n] = !0;
                return e[t] = !1,
                e
            }
            function a(n, c, i) {
                var o, s, a, d = 0, h = [[]], p = parseInt(k);
                if (2 == p) {
                    var f = e.wa;
                    c = p;
                    var m = n[0]
                      , v = u(b.eq(0).children("li").eq(m).children("ul"));
                    f[m].children = v,
                    n.length = c
                } else if (3 == p) {
                    var f = e.wa;
                    c = p;
                    var g = n[0];
                    if (window.firstIndex && window.firstIndex != g)
                        var w = 0;
                    else {
                        var w = n[1] ? n[1] : 0;
                        n[2] && n[2]
                    }
                    window.firstIndex = g;
                    var v = u(b.eq(0).children("li").eq(g).children("ul"));
                    f[g].children = v;
                    var _ = u(b.eq(0).children("li").eq(g).children("ul").eq(0).children("li").eq(w).children("ul"));
                    f[g].children[w].children = _,
                    n.length = c
                }
                if (c)
                    for (o = 0; o < c; o++)
                        y ? h[0][o] = {} : h[o] = [{}];
                for (; d < n.length; ) {
                    for (y ? h[0][d] = l(f, P[d]) : h[d] = [l(f, P[d])],
                    o = 0,
                    a = t; o < f.length && a === t; )
                        f[o].key == n[d] && (i !== t && d <= i || i === t) && (a = o),
                        o++;
                    if (a !== t && f[a].children)
                        d++,
                        f = f[a].children;
                    else {
                        if (!(s = r(f)) || !s.children)
                            return h;
                        d++,
                        f = s.children
                    }
                }
                return h
            }
            function r(n, t) {
                if (!n)
                    return !1;
                for (var e, c = 0; c < n.length; )
                    if (!(e = n[c++]).invalid)
                        return t ? c - 1 : e;
                return !1
            }
            function l(n, t) {
                for (var e = {
                    keys: [],
                    values: [],
                    label: t,
                    datas: [],
                    codes: []
                }, c = 0; c < n.length; )
                    e.values.push(n[c].value.split(":")[0]),
                    e.keys.push(n[c].key),
                    e.datas.push(n[c].value.split(":")[0]),
                    e.codes.push(n[c].value.split(":")[1]),
                    c++;
                return e
            }
            function d(t, e) {
                n(".dwfl", t).css("display", "").slice(e).hide()
            }
            function h(n, c) {
                var i, o, s, a = [], l = e.wa, d = 0, h = !1;
                if (n[d] !== t && d <= c)
                    for (i = 0,
                    o = n[d],
                    s = t; i < l.length && s === t; )
                        l[i].key != n[d] || l[i].invalid || (s = i),
                        i++;
                else
                    s = r(l, !0),
                    o = l[s].key;
                for (h = s !== t && l[s].children,
                a[d] = o; h; ) {
                    if (l = l[s].children,
                    d++,
                    h = !1,
                    s = t,
                    n[d] !== t && d <= c)
                        for (i = 0,
                        o = n[d],
                        s = t; i < l.length && s === t; )
                            l[i].key != n[d] || l[i].invalid || (s = i),
                            i++;
                    else
                        s = r(l, !0),
                        s = !1 === s ? t : s,
                        o = l[s].key;
                    h = !(s === t || !r(l[s].children)) && l[s].children,
                    a[d] = o
                }
                return {
                    lvl: d + 1,
                    nVector: a
                }
            }
            function u(c) {
                var i = [];
                T = T > S++ ? T : S;
                c.children("li");
                return c.children("li").each(function(c) {
                    var o = n(this)
                      , s = o.clone();
                    s.children("ul,ol").remove();
                    var a = e._processMarkup ? e._processMarkup(s) : s.html().replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                      , r = !!o.attr("data-invalid")
                      , l = {
                        key: o.attr("data-val") === t || null === o.attr("data-val") ? c : o.attr("data-val"),
                        value: a,
                        invalid: r,
                        children: null
                    };
                    i.push(l)
                }),
                S--,
                i
            }
            var p, f, m = n.extend({}, e.settings), v = n.extend(e.settings, i, m), g = v.layout || (/top|bottom/.test(v.display) ? "liquid" : ""), y = "liquid" == g, w = v.readonly, b = n(this), _ = this.id + "_dummy", x = b.attr("text_show"), k = b.attr("cascade-level"), T = 0, S = 0, C = {}, P = function(n) {
                var t, e = [];
                for (t = 0; t < n; t++)
                    e[t] = v.labels && v.labels[t] ? v.labels[t] : t;
                return e
            }(T), E = 1, A = [];
            e.wa = v.wheelArray || u(b);
            var M = function(n) {
                for (var t, e = [], c = n, i = !0, o = 0; i; )
                    t = r(c),
                    e[o] = t.key,
                    i = t.children,
                    i && (c = i),
                    o++;
                return e
            }(e.wa)
              , I = a(M, T);
            if (n("#" + _).remove(),
            v.showInput) {
                p = n("#" + x);
                var $ = n("#" + b.attr("first_name"))
                  , D = n("#" + b.attr("second_name"));
                v.anchor = p,
                e.attachShow(p)
            }
            return v.wheelArray || b.hide().closest(".ui-field-contain").trigger("create"),
            {
                width: 50,
                wheels: I,
                layout: g,
                headerText: !1,
                formatResult: function(n) {
                    return n.slice(0, E).join(" ")
                },
                parseValue: function(n) {
                    var n = n ? (n + "").split(" ") : (v.defaultValue || M).slice(0);
                    return n
                },
                onBeforeShow: function() {
                    var n = e.getArrayVal(!0);
                    A = n.slice(0),
                    v.wheels = a(n, T, T),
                    f = !0
                },
                onValueFill: function(t, c) {
                    if (p) {
                        var i = ""
                          , o = n(".dw-sel")
                          , s = 0
                          , a = 0
                          , r = t.split(" ");
                        if (0 == o.length) {
                            var l = n("#" + this.id).children("li")[r[0]];
                            if (i += l.innerText.split(":")[0],
                            2 == r.length) {
                                var d = n(l).children("ul").children("li")[r[1]];
                                i += d.innerText.split(":")[0],
                                s = d.innerText.split(":")[1]
                            } else {
                                var h = n(l).children("ul").children("li")[r[1]];
                                i += h.innerText.split(":")[0];
                                var d = n(h).children("ul").children("li")[r[1]];
                                i += d.innerText.split(":")[0],
                                s = d.innerText.split(":")[1]
                            }
                        } else if (2 == k) {
                            s = o[0].getAttribute("data-code"),
                            s = parseInt(s),
                            a = o[r.length - 1].getAttribute("data-code"),
                            a = parseInt(a);
                            var u = o.eq(0).children().html()
                              , f = o.eq(1).children().html();
                            i = "-1" == s ? "-1" != a ? o[1].getAttribute("data-show") + "以下" : u : "-1" == a ? "不限" == f ? o[0].getAttribute("data-show") + "以上" : u : u + "-" + f
                        } else
                            for (var m = 0, v = r.length; m < v; m++) {
                                if ("-1" == o[m].getAttribute("data-code")) {
                                    m > 0 ? s = o[m - 1].getAttribute("data-code") : (s = o[m].getAttribute("data-code"),
                                    i += o[m].getAttribute("data-show") + " ");
                                    break
                                }
                                i += o[m].getAttribute("data-show") + " ",
                                s = o[m].getAttribute("data-code")
                            }
                        p.html(i),
                        D && D.length > 0 ? ($.val(s),
                        D.val(a)) : 0 == a || -1 == a ? $.val(s) : $.val(a),
                        $ && $.length > 0 ? $.attr("arrIndex", t) : D && D.length > 0 && D.attr("arrIndex", t)
                    }
                    c && (e._preventChange = !0,
                    b.change())
                },
                onShow: function(t) {
                    n(".dwwl", t).on("mousedown touchstart", function() {
                        clearTimeout(C[n(".dwwl", t).index(this)])
                    })
                },
                onDestroy: function() {
                    b.removeClass("dw-hsel").removeAttr("tabindex")
                },
                validate: function(n, i, o) {
                    var r, l, u = [], p = e.getArrayVal(!0), m = (i || 0) + 1;
                    if (i !== t && A[i] != p[i] || i === t && !f) {
                        for (v.wheels = a(p, null, i),
                        l = h(p, i === t ? p.length : i),
                        E = l.lvl,
                        r = 0; r < p.length; r++)
                            p[r] = l.nVector[r] || 0;
                        for (; m < l.lvl; )
                            u.push(m++);
                        if (u.length)
                            return v.readonly = s(T, i),
                            clearTimeout(C[i]),
                            C[i] = setTimeout(function() {
                                f = !0,
                                d(n, l.lvl),
                                A = p.slice(0),
                                e.changeWheel(u, i === t ? o : 0, i !== t),
                                v.readonly = w
                            }, i === t ? 0 : 1e3 * o),
                            !1
                    } else
                        l = h(p, p.length),
                        E = l.lvl;
                    A = p.slice(0),
                    c(n, l.lvl, e.wa, p),
                    d(n, l.lvl),
                    f = !1
                }
            }
        }
        ;
        var e = n.mobiscroll
          , c = e.presets.scroller;
        c.treelist = c.list,
        e.presetShort("list")
    }($)
}
, function(n, t, e) {
    "use strict";
    !function(n, t) {
        var e = n.mobiscroll
          , c = e.util
          , i = c.isString
          , o = {
            inputClass: "",
            invalid: [],
            rtl: !1,
            showInput: !0,
            group: !1,
            groupLabel: "Groups",
            checkIcon: "checkmark",
            dataText: "text",
            dataValue: "value",
            dataGroup: "group",
            dataDisabled: "disabled"
        };
        e.presetShort("select"),
        e.presets.scroller.select = function(e) {
            function s() {
                var e, c, i, o, s, a = 0, r = {};
                Y ? n.each(O, function(n, l) {
                    o = l[P.dataText],
                    s = l[P.dataValue],
                    c = l[P.dataGroup],
                    i = {
                        value: s,
                        text: o
                    },
                    F[s] = i,
                    X && (r[c] === t ? (e = {
                        label: c,
                        options: []
                    },
                    Z[a] = e,
                    r[c] = a,
                    a++) : e = Z[r[c]],
                    i.group = r[c],
                    e.options.push(i)),
                    l[P.dataDisabled] && N.push(s)
                }) : X ? n("optgroup", M).each(function(t) {
                    Z[t] = {
                        label: this.label,
                        options: []
                    },
                    n("option", this).each(function() {
                        i = {
                            value: this.value,
                            text: this.text,
                            group: t
                        },
                        F[this.value] = i,
                        Z[t].options.push(i),
                        this.disabled && N.push(this.value)
                    })
                }) : (b = [],
                n("option", M).each(function() {
                    i = {
                        value: this.value,
                        text: this.text
                    },
                    F[this.value] = i,
                    b.push(i),
                    this.disabled && N.push(this.value)
                }))
            }
            function a(t, e, c) {
                n.each(t, function(n, t) {
                    c.push(t.text),
                    e.push(t.value)
                })
            }
            function r() {
                var t, e = 0, c = [], i = [], o = [[]];
                return R && (n.each(Z, function(n, t) {
                    c.push(t.label),
                    i.push(n)
                }),
                t = {
                    values: c,
                    keys: i,
                    label: P.groupLabel
                },
                A ? o[0][e] = t : o[e] = [t],
                e++),
                c = [],
                i = [],
                H ? n.each(Z, function(n, t) {
                    c.push(t.label),
                    i.push("__group" + n),
                    N.push("__group" + n),
                    a(t.options, i, c)
                }) : a(R ? Z[f].options : b, i, c),
                t = {
                    multiple: I,
                    values: c,
                    keys: i,
                    label: z
                },
                A ? o[0][e] = t : o[e] = [t],
                o
            }
            function l(n) {
                x = I ? n ? n[0] : W : n === t || null === n || "" === n ? W : P.defaultValue,
                R && (f = F[x].group)
            }
            function d(n, t) {
                var c = n ? e._tempWheelArray : e._hasValue ? e._wheelArray : null;
                return c ? P.group && t ? c : c[_] : null
            }
            function h(t, c) {
                var i, o, s = [], a = 0;
                if (I) {
                    o = [];
                    for (a in q)
                        s.push(F[a].text),
                        o.push(a);
                    i = s.join(", ")
                } else
                    o = t,
                    i = F[t] ? F[t].text : "";
                e._tempValue = o,
                y.html(i),
                M.val(o);
                var r = n(".dw-sel");
                0 == r.length ? w.val(o) : w.val(r.attr("data-val")),
                e.settings.okCallBack && e.settings.okCallBack(),
                c && (e._preventChange = !0,
                M.change())
            }
            function u(n) {
                var t = n.attr("data-val")
                  , e = n.hasClass("dw-msel");
                if (I && n.closest(".dwwl").hasClass("dwwms"))
                    return n.hasClass("dw-v") && (e ? (n.removeClass(L).removeAttr("aria-selected"),
                    delete q[t]) : (n.addClass(L).attr("aria-selected", "true"),
                    q[t] = t)),
                    !1
            }
            var p, f, m, v, g, y, w, b, _, x, k, T, S, C = n.extend({}, e.settings), P = n.extend(e.settings, o, C), E = P.layout || (/top|bottom/.test(P.display) ? "liquid" : ""), A = "liquid" == E, M = n(this), I = P.multiple || M.prop("multiple"), $ = this.id + "_dummy", D = M.attr("text_show"), j = M.attr("hiddenText"), B = n('label[for="' + this.id + '"]').attr("for", $), z = P.label !== t ? P.label : B.length ? B.text() : M.attr("name"), L = "dw-msel mbsc-ic mbsc-ic-" + P.checkIcon, V = P.readonly, O = P.data, Y = !!O, X = Y ? O[0][P.dataGroup] : n("optgroup", M).length, W = Y ? O[0][P.dataValue] : n("option", M).attr("value"), R = X && P.group, H = X && !R, U = M.val() || [], N = [], q = {}, F = {}, Z = {};
            if (P.invalid.length || (P.invalid = N),
            R ? (m = 0,
            _ = 1) : (m = -1,
            _ = 0),
            I)
                for (U && i(U) && (U = U.split(",")),
                g = 0; g < U.length; g++)
                    q[U[g]] = U[g];
            return s(),
            l(M.val()),
            n("#" + $).remove(),
            y = n("#" + D),
            w = n("#" + j),
            e.attachShow(y),
            M.addClass("dw-hsel").attr("tabindex", -1).closest(".ui-field-contain").trigger("create"),
            h(x),
            e.setVal = function(n, t, o, s, a) {
                I && (n && i(n) && (n = n.split(",")),
                q = c.arrayToObject(n),
                n = n ? n[0] : null),
                e._setVal(n, t, o, s, a)
            }
            ,
            e.getVal = function(n, t) {
                return I ? c.objectToArray(q) : d(n, t)
            }
            ,
            e.getValues = e.getVal,
            e.getValue = d,
            {
                width: 50,
                layout: E,
                headerText: !1,
                anchor: y,
                formatResult: function(n) {
                    return n[_]
                },
                parseValue: function(n) {
                    return l(n === t ? M.val() : n),
                    R ? [f, x] : [x]
                },
                onValueTap: u,
                onValueFill: h,
                onBeforeShow: function() {
                    I && P.counter && (P.headerText = function() {
                        var t = 0;
                        return n.each(q, function() {
                            t++
                        }),
                        t + " " + P.selectedText
                    }
                    ),
                    i(P.headerText) && /{value}/.test(P.headerText) && (v = P.headerText,
                    P.headerText = function(n) {
                        return v.replace(/\{value\}/i, F[n].text)
                    }
                    ),
                    l(M.val()),
                    R && (T = f,
                    e._tempWheelArray = [f, x]),
                    s(),
                    P.wheels = r()
                },
                onMarkupReady: function(t) {
                    t.addClass("dw-select"),
                    n(".dwwl" + m, t).on("mousedown touchstart", function() {
                        clearTimeout(S)
                    }),
                    H && (n(".dw", t).addClass("dw-select-gr"),
                    n('.dw-li[data-val^="__group"]', t).addClass("dw-w-gr")),
                    I && (t.addClass("dwms"),
                    n(".dwwl", t).on("keydown", function(t) {
                        32 == t.keyCode && (t.preventDefault(),
                        t.stopPropagation(),
                        u(n(".dw-sel", this)))
                    }).eq(_).addClass("dwwms").attr("aria-multiselectable", "true"),
                    k = n.extend({}, q))
                },
                validate: function(c, i, o) {
                    var s, a, l = e.getArrayVal(!0), d = n(".dw-ul", c).eq(_);
                    if (i === t && I) {
                        a = q,
                        s = 0,
                        n(".dwwl" + _ + " .dw-li", c).removeClass(L).removeAttr("aria-selected");
                        for (s in a)
                            n(".dwwl" + _ + ' .dw-li[data-val="' + a[s] + '"]', c).addClass(L).attr("aria-selected", "true")
                    }
                    if (!R || i !== t && i !== m)
                        x = l[_];
                    else if ((f = +l[m]) !== T) {
                        if (x = Z[f].options[0].value,
                        P.wheels = r(),
                        !p)
                            return e._tempWheelArray = [f, x],
                            P.readonly = [!1, !0],
                            clearTimeout(S),
                            S = setTimeout(function() {
                                p = !0,
                                T = f,
                                e.changeWheel([_], t, !0),
                                P.readonly = V
                            }, 1e3 * o),
                            !1
                    } else
                        P.readonly = V;
                    n.each(P.invalid, function(t, e) {
                        n('.dw-li[data-val="' + e + '"]', d).removeClass("dw-v")
                    }),
                    p = !1
                },
                onClear: function(t) {
                    q = {},
                    y.val(""),
                    n(".dwwl" + _ + " .dw-li", t).removeClass(L).removeAttr("aria-selected")
                },
                onCancel: function() {
                    !e.live && I && (q = n.extend({}, k))
                },
                onDestroy: function() {
                    M.removeClass("dw-hsel").removeAttr("tabindex")
                }
            }
        }
    }($)
}
, function(n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getBasicProfile = t.getMightLike = t.getProfile = void 0;
    var c = e(0)
      , i = function(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }(c);
    t.getProfile = function(n) {
        return i.default.get("/profile/getObjectProfile.do?objectID=" + n)
    }
    ,
    t.getMightLike = function(n) {
        return i.default.post("/profile/getMightLike.do", {
            objectID: n
        })
    }
    ,
    t.getBasicProfile = function() {
        return i.default.get("/profile/getBasicProfile.do")
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(34)
      , a = e(4)
      , r = e(14)
      , l = c(r)
      , d = e(39)
      , h = c(d)
      , u = e(49)
      , p = c(u);
    t.default = function(n) {
        var t = "她"
          , e = (0,
        h.default)();
        return new Promise(function(c, i) {
            (0,
            a.getBasicProfile)().then(function(e) {
                return !1 === e.isError && (t = 0 === e.data.gender ? "她" : "他"),
                (0,
                s.sayHi)(n)
            }).then(function() {
                e.hide(),
                $(document.body).append((0,
                p.default)({
                    gender: t
                }));
                var n = $("#say_hi");
                $("#say_hi_btn_download").on("click", function() {
                    $("#say_hi").off(o.default.TouchMove, o.default.preventDefault),
                    o.default.downloadNativeApp("903965_8")
                }),
                $("#say_hi_btn_close").on("click", function() {
                    $("#say_hi").off(o.default.TouchMove, o.default.preventDefault),
                    n.remove()
                }),
                n.on(o.default.TouchMove, o.default.preventDefault),
                c()
            }).catch(function() {
                (0,
                l.default)("网络异常，请检查您的网络"),
                e.hide(),
                i()
            })
        }
        )
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.gender;
        return t += '<div class="dlmask diy" id="say_hi">\n    <div class="center popup_in">\n        <div class="popup-content">\n            <div class="new_alt"><img ',
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/newToast/bg.png"',
        t += ' class="header">\n                <p>你没有下载APP</p>\n                <h2 id="wapImportContent">无法及时收到',
        t += e(i),
        t += "的回信</h2>\n                <img ",
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/newToast/btn_bg2.png"',
        t += ' id="say_hi_btn_download" class="btn_bg">\n                <img ',
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/newToast/close.png"',
        t += ' class="btn_close"></div>\n        </div>\n        <div id="popup_btn_container">\n            <a id="say_hi_btn_close" class="cancel" data-icon="close" style="position: absolute; top: -340%; right: -5%; border: none;"></a>\n            <a data-icon="checkmark"></a>\n        </div>\n    </div>\n</div>'
    }
}
, , , function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(53)
      , a = c(s)
      , r = e(41)
      , l = (c(r),
    e(42))
      , d = (c(l),
    e(35))
      , h = (c(d),
    e(43))
      , u = (c(h),
    e(44))
      , p = (c(u),
    e(45))
      , f = (c(p),
    e(46))
      , m = (c(f),
    e(14))
      , v = c(m)
      , g = e(18)
      , y = (c(g),
    e(26));
    t.default = function(n, t) {
        var e = $(n);
        if (t.appAdGender = 0 === t.gender ? "他" : "她",
        e.append((0,
        a.default)(t)),
        t.readOnly)
            return void $("#personal-app-ad").on(o.default.TAP, function() {
                o.default.downloadNativeApp("903965_8")
            });
        var c = $("#psn_data_compile")
          , i = $("#compile_info")
          , s = $("#compile_info_btn")
          , r = $("#info_content1")
          , l = $(".info_expand_tool");
        syscode.addSelectOption("salary", 3, "qingxuanze", "salary"),
        syscode.addSelectOption("taChildren", 0, "qingxuanze", "mychildren"),
        syscode.addSelectOption("wantChildren", 0, "qingxuanze", "wantChildren");
        var d = syscode.addJob("my_occup_list", 0, "qingxuanze");
        syscode.addSelectOption("house", 0, "qingxuanze", "myHouse"),
        syscode.addSelectOption("vehicle", -1, "qingxuanze", "myVehicle"),
        syscode.addSelectOption("stock", -1, "qingxuanze", "myStock"),
        syscode.addSelectOption("weight", 0, "qingxuanze", "myWeight"),
        0 === t.gender ? syscode.addSelectOption("body0", -1, "qingxuanze", "myBody") : syscode.addSelectOption("body1", -1, "qingxuanze", "myBody"),
        t.updateRestriction && !t.updateRestriction.heightRestricted && syscode.addSelectOption("height", 0, "qingxuanze", "height");
        var h = city.addWorkCity2((t.workCity || "").toString(), "my_citylist", "qingxuanze")
          , u = city.addWorkCity2($("#my_native_place").val(), "native_place_list", "qingxuanze", !0)
          , p = function(n, t) {
            $("#" + n).mobiscroll().select({
                theme: "android-holo-light",
                display: "bottom",
                mode: "scroller",
                lang: "zh",
                animate: "fade",
                defaultValue: t
            })
        }
          , f = function() {
            p("salary", $("#my_salary").val()),
            p("mychildren", $("#children").val()),
            p("wantChildren", $("#want_children").val()),
            p("myHouse", $("#house").val()),
            p("myVehicle", $("#vehicle").val());
            var n = 57 == $("#stock").val() || 0 == $("#stock").val() ? -1 : $("#stock").val();
            p("myStock", n),
            p("myWeight", $("#weight").val()),
            p("myBody", $("#body").val()),
            $("#city_show").on(o.default.TAP, function() {
                if (t.updateRestriction.workCityRestricted)
                    return void (0,
                    v.default)(t.updateRestriction.workCityTip);
                $("#my_citylist").mobiscroll().treelist({
                    theme: "android-holo-light",
                    mode: "scroller",
                    display: "bottom",
                    lang: "zh",
                    labels: ["provicne", "city", "county"],
                    defaultValue: 0 == h.codeArr.length ? [4, 0] : h.codeArr
                }),
                $("#my_citylist").mobiscroll("show")
            }),
            $("#my_occup_list").mobiscroll().treelist({
                theme: "android-holo-light",
                mode: "scroller",
                display: "bottom",
                lang: "zh",
                labels: ["", ""],
                defaultValue: d
            }),
            $("#native_place").on(o.default.TAP, function() {
                $("#native_place_list").mobiscroll().treelist({
                    theme: "android-holo-light",
                    mode: "scroller",
                    display: "bottom",
                    lang: "zh",
                    labels: ["provicne", "city", "county"],
                    defaultValue: u.codeArr
                }),
                $("#native_place_list").mobiscroll("show")
            }),
            p("height", $("#my_height").val())
        }
          , m = function(n, t, e, c) {
            n.children("span").eq(1).text(t),
            n.children("span").eq(0).css({
                "-webkit-transform": "rotate(" + e + "deg)",
                "vertical-align": "" + c
            })
        };
        !0 === t.readOnly && c.hide();
        var g = function(n) {
            for (var t = 0, e = 0; e < n.length; e++) {
                var c = n.charCodeAt(e);
                t += c >= 0 && c <= 128 ? 1 : 2
            }
            return t
        }
          , w = function() {
            var n = new RegExp("[^a-zA-Z0-9_一-龥]","i")
              , t = $(".input_nickname");
            if (t.val().match(n))
                return (0,
                v.default)("昵称不能包含非法字符"),
                !1;
            if (g(t.val()) < 4 || g(t.val()) > 16)
                return (0,
                v.default)("昵称应为4-16个字符"),
                !1;
            var e = {
                nickname: $(".input_nickname").val(),
                salary: $("#my_salary").val(),
                workCity: $("#areaCode").val(),
                children: $("#children").val(),
                wantChildren: $("#want_children").val(),
                occupation: $("#my_occup").val(),
                house: $("#house").val(),
                vehicle: $("#vehicle").val(),
                hometown: $("#my_native_place").val(),
                stock: $("#stock").val(),
                weight: $("#weight").val(),
                body: $("#body").val(),
                height: $("#my_height").val()
            };
            (0,
            y.updateProfile)(e).then(function(n) {
                n.isError ? (0,
                v.default)(n.errorMessage) : (r.removeClass("on").children("div").removeClass("compile_item").last().removeClass("last_compile_item"),
                i.children("div").removeClass("compile_item"),
                i.parent("div").css({
                    height: "8.75rem",
                    overflow: "hidden"
                }),
                l.eq(0).show(),
                m(l.eq(0), "展开", -135, "top"),
                s.hide(),
                c.show(),
                r.find(".arrow_down").addClass("no_show"),
                b(),
                (0,
                v.default)(n.data.msg))
            }).catch(function() {
                (0,
                v.default)("服务器或网络异常")
            })
        }
          , b = function() {
            $("#salary").mobiscroll("destroy"),
            $("#my_citylist").mobiscroll("destroy"),
            $("#mychildren").mobiscroll("destroy"),
            $("#wantChildren").mobiscroll("destroy"),
            $("#myHouse").mobiscroll("destroy"),
            $("#myVehicle").mobiscroll("destroy"),
            $("#my_occup_list").mobiscroll("destroy"),
            $("#native_place_list").mobiscroll("destroy"),
            $("#height").mobiscroll("destroy"),
            $("#city_show").off("tap"),
            $("#native_place").off("tap"),
            $("#age_list").mobiscroll("destroy"),
            $("#age_show").off("tap"),
            $("#height_list").mobiscroll("destroy"),
            $("#height_show").off("tap"),
            $("#ta_salary_list").mobiscroll("destroy"),
            $("#ta_salary_show").off("tap"),
            $("#ta_area_treelist").mobiscroll("destroy"),
            $("#ta_area_show").off("tap"),
            $("#education").mobiscroll("destroy"),
            $("#marriage").mobiscroll("destroy"),
            $("#tachildren").mobiscroll("destroy"),
            $("#ta_wantChildren").mobiscroll("destroy"),
            $("#taSmoking").mobiscroll("destroy"),
            $("#taDrinking").mobiscroll("destroy"),
            $("#taPhoto").mobiscroll("destroy"),
            $("#myStock").mobiscroll("destroy"),
            $("#myWeight").mobiscroll("destroy"),
            $("#myBody").mobiscroll("destroy"),
            $("#taBody").mobiscroll("destroy")
        };
        !function() {
            c.on(o.default.TAP, function() {
                if ($("#info_zeou").hasClass("on"))
                    return (0,
                    v.default)("先保存择偶条件吧"),
                    !1;
                r.addClass("on").children("div").addClass("compile_item").last().addClass("last_compile_item"),
                i.children("div").addClass("compile_item"),
                i.removeClass("compile_item"),
                i.children("div").first().find("input").removeAttr("readonly"),
                r.find(".arrow_down").removeClass("no_show"),
                i.parent("div").css("height", "auto"),
                l.eq(0).css("display", "none"),
                s.show(),
                c.hide(),
                $("#cancel_compile").on(o.default.TAP, function() {
                    location.reload()
                }),
                f()
            }),
            l.on(o.default.TAP, function() {
                var n = $(this);
                "展开" == n.children("span").eq(1).text().trim() ? (n.prev().css({
                    height: "auto",
                    "overflow-y": "auto"
                }),
                m(n, "收起", 45, "bottom")) : (n.prev().css({
                    height: "8.75rem",
                    "overflow-y": "hidden"
                }),
                m(n, "展开", -135, "top"))
            }),
            $("#compile_info_btn .save_compile").on(o.default.TAP, w)
        }()
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = n.readOnly
          , i = c.$escape
          , o = n.nickname
          , s = n.salaryString
          , a = n.salary
          , r = n.workCityString
          , l = n.workCity
          , d = n.age
          , h = n.heightString
          , u = n.updateRestriction
          , p = n.height
          , f = n.childrenString
          , m = n.children
          , v = n.wantChildrenString
          , g = n.wantChildren
          , y = n.occupationString
          , w = n.occupation
          , b = n.houseString
          , _ = n.house
          , x = n.vehicleString
          , k = n.vehicle
          , T = n.hometownString
          , S = n.hometown
          , C = n.stockString
          , P = n.stock
          , E = n.weightString
          , A = n.weight
          , M = n.bodyString
          , I = n.body
          , $ = n.genderString
          , D = n.birthday
          , j = n.educationString
          , B = n.marriageString
          , z = n.matchPercent
          , L = n.appAdGender;
        return t += '<div class="personal_info_container info_box" id="info_box1">\r\n    <p class="heart_word_title">\r\n        个人资料\r\n        ',
        !0 !== e && (t += '\r\n        <span class="compile_btn no_show compile_btn_list" id="compile_info_btn">\r\n            <a href="javaScript:;" class="cancel_compile" id="cancel_compile">取消</a>\r\n            <a href="javaScript:;" class="save_compile" type="1">保存</a>\r\n        </span>\r\n        <a href="javaScript:;" class="compile" id="psn_data_compile"></a>\r\n        '),
        t += '\r\n    </p>\r\n    <div class="info_content" id=\'info_content1\'>\r\n        <div id="compile_info">\r\n            <div class="info_item">\r\n                <span class="nick_name">昵称</span>\r\n                <input type="text" value="',
        t += i(o),
        t += '" name="nickName" class="input_nickname" readonly/>\r\n            </div>\r\n            ',
        !0 !== e && (t += '\r\n            <div class="info_item">\r\n                <span class="nick_name">月收入</span>\r\n                <span id="salary_show">',
        t += i(s),
        t += '</span>\r\n                <input type="hidden" id="my_salary" name="salary" value="',
        t += i(a),
        t += '" />\r\n                <select class="newselect salary no_show" id="salary" select_name="salary" text_show="salary_show" hiddenText="my_salary"></select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            '),
        t += '\r\n            <div class="info_item">\r\n                <span class="nick_name">工作地</span>\r\n                <span id="city_show">',
        t += i(r),
        t += '</span>\r\n                <input type="hidden" name="workCity" id="areaCode" value="',
        t += i(l),
        t += '" />\r\n                <ul id="my_citylist" class="no_show" select_name="city" first_name="areaCode" text_show="city_show" cascade-level="3">\r\n                </ul>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            ',
        e && (t += '\r\n            <div class="info_item">\r\n                <span class="nick_name">年龄</span>\r\n                <span id="salary_show">',
        t += i(d),
        t += '岁</span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">身高</span>\r\n                <span id="salary_show">',
        t += i(h),
        t += '</span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">月收入</span>\r\n                <span id="salary_show">',
        t += i(s),
        t += "</span>\r\n            </div>\r\n            "),
        t += "\r\n            ",
        u && 1 != u.heightRestricted && (t += '\r\n            <div class="info_item">\r\n                <span class="nick_name">身高</span>\r\n                <span id="height_show">',
        t += i(p),
        t += '</span>\r\n                <input type="hidden" name="height" id="my_height" value="',
        t += i(p),
        t += '">\r\n                <select id="height" class="newselect salary no_show" select_name="height" text_show="height_show" hiddentext="my_height">\r\n                </select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            '),
        t += '\r\n            <div class="info_item">\r\n                <span class="nick_name">有没有小孩</span>\r\n                <span id="child_show">',
        t += i(f),
        t += '</span>\r\n                <input type="hidden" name="children" id="children" value="',
        t += i(m),
        t += '" />\r\n                <select class="newselect no_show" id="mychildren" select_name="children" text_show="child_show" hiddenText="children"></select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">是否想要小孩</span>\r\n                <span id="want_child_show">',
        t += i(v),
        t += '</span>\r\n                <input type="hidden" name="wantchildren" id="want_children" value="',
        t += i(g),
        t += '" />\r\n                <select class="newselect no_show" id="wantChildren" select_name="wantchildren" text_show="want_child_show" hiddenText="want_children"></select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">职业</span>\r\n                <span id="occup_show">',
        t += i(y),
        t += '</span>\r\n                <input type="hidden" name="occupation" id="my_occup" value="',
        t += i(w),
        t += '" />\r\n                <ul id="my_occup_list" class="no_show" select_name="params.occup" first_name="my_occup" text_show="occup_show" cascade-level="2"\r\n                    hiddenText="my_occup"></ul>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">买房情况</span>\r\n                <span id="my_house_show">',
        t += i(b),
        t += '</span>\r\n                <input type="hidden" name="house" id="house" value="',
        t += i(_),
        t += '" />\r\n                <select class="newselect no_show" id="myHouse" select_name="house" text_show="my_house_show" hiddenText="house"></select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">买车情况</span>\r\n                <span id="my_vehicle">',
        t += i(x),
        t += '</span>\r\n                <input type="hidden" name="vehicle" id="vehicle" value="',
        t += i(k),
        t += '" />\r\n                <select class="newselect no_show" id="myVehicle" select_name="vehicle" text_show="my_vehicle" hiddenText="vehicle"></select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">籍贯</span>\r\n                <span id="native_place">',
        t += i(T),
        t += '</span>\r\n                <input type="hidden" name="hometownCity" id="my_native_place" value="',
        t += i(S),
        t += '" />\r\n                <ul id="native_place_list" class="no_show" select_name="place" first_name="my_native_place" text_show="native_place" cascade-level="3"\r\n                    hiddenText="my_native_place"></ul>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">民族</span>\r\n                <span id="my_stock">',
        t += i(C),
        t += '</span>\r\n                <input type="hidden" name="stock" id="stock" value="',
        t += i(P),
        t += '" />\r\n                <select class="newselect no_show" id="myStock" select_name="stock" text_show="my_stock" hiddenText="stock"></select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">体重</span>\r\n                <span id="my_weight">',
        t += i(E),
        t += '</span>\r\n                <input type="hidden" name="weight" id="weight" value="',
        t += i(A),
        t += '" />\r\n                <select class="newselect no_show" id="myWeight" select_name="weight" text_show="my_weight" hiddenText="weight"></select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n            <div class="info_item">\r\n                <span class="nick_name">体型</span>\r\n                <span id="my_body">',
        t += i(M),
        t += '</span>\r\n                <input type="hidden" name="body" id="body" value="',
        t += i(I),
        t += '" />\r\n                <select class="newselect no_show" id="myBody" select_name="body" text_show="my_body" hiddenText="body"></select>\r\n                <span class="arrow_down no_show"></span>\r\n            </div>\r\n        </div>\r\n        <div class="info_item">\r\n            <span class="nick_name">性别</span>\r\n            <span>',
        t += i($),
        t += '</span>\r\n        </div>\r\n        <div class="info_item">\r\n            <span class="nick_name">生日</span>\r\n            <span>',
        t += i(D),
        t += "</span>\r\n        </div>\r\n        ",
        u && 1 != u.heightRestricted || (t += '\r\n        <div class="info_item">\r\n            <span class="nick_name">身高</span>\r\n            <span>',
        t += i(p),
        t += "</span>\r\n        </div>\r\n        "),
        t += '\r\n        <div class="info_item">\r\n            <span class="nick_name">学历</span>\r\n            <span>',
        t += i(j),
        t += '</span>\r\n        </div>\r\n        <div class="info_item">\r\n            <span class="nick_name">婚姻状况</span>\r\n            <span>',
        t += i(B),
        t += '</span>\r\n        </div>\r\n    </div>\r\n    <div class="expand_tool info_expand_tool">\r\n        <span></span>\r\n        <span>展开</span>\r\n    </div>\r\n    ',
        e && (t += '\r\n    <div class="loading_box" style="z-index:9;" id="personal-app-ad">\r\n        <div class="first">\r\n            <img ',
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/newToast/icon_home_lock.png"',
        t += ' id="lock">\r\n            <p class="fit">你们的资料匹配度为',
        t += i(z),
        t += '</p>\r\n        </div>\r\n        <div class="second">\r\n            <p class="downApp">下载APP解锁',
        t += i(L),
        t += "的资料</p>\r\n            <img ",
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/newToast/success.png"',
        t += ' id="success">\r\n        </div>\r\n    </div>\r\n    '),
        t += "\r\n</div>"
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = (c(i),
    e(55))
      , s = c(o)
      , a = e(18)
      , r = (c(a),
    e(23))
      , l = e(26)
      , d = e(27)
      , h = c(d);
    t.default = function(n, t) {
        var e = $(n);
        1 == t.validateIDCard ? t.validateClass = "contact_on" : t.validateClass = "contact",
        t.avatarURL = t.avatarURL ? t.avatarURL + "?scrop=1&crop=1&w=150&h=150&cpos=north" : h.default,
        e.append((0,
        s.default)({
            memberInfo: t
        })),
        $("#upload-avatar").on("change", function() {
            var n = this
              , t = n.files[0];
            (0,
            l.storeImage)(t).then(function(n) {
                var t = n.isError
                  , e = n.errorMessage;
                t ? Z.tips(e) : location.href = r.Page.avatar
            })
        });
        var c = function(n) {
            $(".upload_image_span").hide();
            var t = "background:url(" + n + ") no-repeat 50% 50%;background-size:cover;";
            $(".user_img").attr("style", t)
        };
        $(window).on("updateAvatar", function(n, t) {
            c(t)
        })
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.memberInfo;
        return t += '<div class="user_img" style="background:url(',
        t += e(i.avatarURL),
        t += ') no-repeat 50% 50%;background-size:cover;">\r\n    ',
        i.updateRestriction && 0 == i.updateRestriction.avatarRestricted && (t += '\r\n    <input type="file" name="fileData" id="upload-avatar"> '),
        t += " ",
        1 == i.avatarStatus && i.updateRestriction && 0 == i.updateRestriction.avatarRestricted && (t += '\r\n    <span class="upload_image_span"><span>点击</span><span>上传头像</span></span>\r\n    '),
        t += "\r\n    ",
        i.isZhenaiMail && (t += "\r\n    <img ",
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/icon/vip2_c6fbd1c.png"',
        t += ">\r\n    "),
        t += "\r\n    ",
        2 == i.avatarStatus && (t += '\r\n    <span class="user_head_state">审核中</span>\r\n    '),
        t += '\r\n</div>\r\n<div class="name_box">\r\n    <p class="user_name">',
        t += e(i.nickname),
        t += '</p>\r\n    <p class="user_id">ID:',
        t += e(i.memberID),
        t += '</p>\r\n    <p class="user_author">\r\n        <span class="',
        t += e(i.validateClass),
        t += '">\r\n            <img ',
        t += 'src="http://images.zastatic.com/imwap/wap2015/images/icon/author_con_fb3f1c3.png"',
        t += ">\r\n        </span>\r\n    </p>\r\n</div>"
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    function i(n, t) {
        if (!(n instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
        function n(n, t) {
            for (var e = 0; e < t.length; e++) {
                var c = t[e];
                c.enumerable = c.enumerable || !1,
                c.configurable = !0,
                "value"in c && (c.writable = !0),
                Object.defineProperty(n, c.key, c)
            }
        }
        return function(t, e, c) {
            return e && n(t.prototype, e),
            c && n(t, c),
            t
        }
    }()
      , s = e(0)
      , a = c(s)
      , r = e(57)
      , l = c(r)
      , d = e(58)
      , h = c(d)
      , u = e(14)
      , p = c(u)
      , f = e(18)
      , m = c(f)
      , v = e(23)
      , g = e(26)
      , y = e(47)
      , w = function() {
        function n(t, e) {
            i(this, n),
            this.data(t, e),
            this.getPhotoList(),
            Z.loadUrl("./static/js/cos-js-sdk-v4.js", function() {})
        }
        return o(n, [{
            key: "data",
            value: function(n, t) {
                var e = this;
                this.parentDom = $(n),
                this.memberInfoData = t,
                this.avatarStatus = t.avatarStatus,
                this.albumCount = 0,
                (0,
                y.getBasicProfile)().then(function(n) {
                    e.basicData = n
                })
            }
        }, {
            key: "contactImg",
            value: function(n) {
                var t = n.split(".")
                  , e = t.pop();
                return t.join(".") + "." + e
            }
        }, {
            key: "delImage",
            value: function(n, t) {
                var e = this
                  , c = new m.default({
                    type: "loading"
                });
                (0,
                g.delMemberPhoto)(t).then(function(t) {
                    c.closeLoad(),
                    0 == t.isError ? (Z.tips(t.data.msg),
                    n(),
                    e.albumCount--,
                    $("#albumCount").html("相册(" + e.albumCount + ")张")) : Z.tips(t.errorMessage)
                }).then(function(n) {
                    c.closeLoad()
                })
            }
        }, {
            key: "imgScroller",
            value: function(n) {
                var t = this
                  , e = $("#img_box_scroller")
                  , c = e.children("ul").children("li")
                  , i = c.length;
                if (i >= 1) {
                    var o = Math.ceil($(c[0]).css("margin-left").replace("px", "")) + 1;
                    e.css("width", i * c[0].offsetWidth + i * o),
                    1 == n && e.on(a.default.TAP, "li[class='img_item']", function(n) {
                        if (t.basicData && !t.basicData.isError) {
                            if (1 == t.basicData.data.avatarStatus)
                                return t.showPopUpload(),
                                !1
                        } else
                            (0,
                            p.default)(t.basicData.errorMessage);
                        new m.default({
                            type: "image",
                            canDelete: !t.memberInfoData.readOnly,
                            delCallBack: t.delImage.bind(t),
                            list: "img_item"
                        },$(n.currentTarget),n)
                    })
                }
            }
        }, {
            key: "showPopUpload",
            value: function() {
                $("body").append((0,
                h.default)()),
                $("#popup_btn_close").on(a.default.TAP, function() {
                    $(this).parents(".popup-mask").remove()
                }),
                $("#popup_btn_ok").on(a.default.TAP, function() {
                    window.location.href = "./im.html"
                })
            }
        }, {
            key: "updatePhoto",
            value: function(n) {
                this.getPhotoList()
            }
        }, {
            key: "getPhotoList",
            value: function() {
                var n = this;
                if (!0 === this.memberInfoData.readOnly) {
                    if (0 === this.memberInfoData.photos.length)
                        return;
                    this.memberInfoData.photos.forEach(function(n) {
                        n.dataUrl = n.photoURL + "?scrop=1&crop=1&w=100&h=100&cpos=north"
                    }),
                    this.parentDom.html((0,
                    l.default)({
                        readOnly: this.memberInfoData.readOnly,
                        album: {
                            list: this.memberInfoData.photos,
                            count: this.memberInfoData.photoCount
                        }
                    })),
                    this.imgScroller(!0),
                    setTimeout(function() {
                        n.initEvents()
                    }, 20)
                } else {
                    (0,
                    g.getMemberPhoto)(1, 15).then(function(t) {
                        if (0 == t.isError) {
                            var e = t.data;
                            n.albumCount = e.count,
                            e.list.forEach(function(t) {
                                t.dataUrl = n.contactImg(t.photoURL + "?scrop=1&crop=1&w=100&h=100&cpos=north")
                            }),
                            n.parentDom.html((0,
                            l.default)({
                                readOnly: n.memberInfoData.readOnly,
                                album: e
                            })),
                            n.imgScroller(!0),
                            setTimeout(function() {
                                n.initEvents()
                            }, 20)
                        } else
                            Z.tips(t.errorMessage)
                    })
                }
            }
        }, {
            key: "initEvents",
            value: function() {
                var n = this;
                $("#upload-photo").on("change", function(t) {
                    var e = t.target.files[0];
                    if (t.target.files.length <= 0)
                        return (0,
                        p.default)("请选择一张照片");
                    if (t.target.files.length > 1)
                        return (0,
                        p.default)("请至多选择一张照片");
                    if (0 == n.albumCount) {
                        var c = new m.default({
                            type: "loading"
                        });
                        return (0,
                        g.storeImage)(e).then(function(n) {
                            var t = n.isError
                              , e = n.errorMessage;
                            t ? Z.tips(e) : location.href = v.Page.avatar,
                            c.closeLoad()
                        }).catch(function() {
                            c.closeLoad()
                        }),
                        !1
                    }
                    (0,
                    g.getUploadLimitation)().then(function(t) {
                        var c = (t.isError,
                        t.errorMessage);
                        if (1 == t.isError)
                            Z.tips(c);
                        else {
                            var i = t.data;
                            i.photoCount == i.maxPhotoCount ? Z.tips(i.promptDocument) : (0,
                            g.uploadImg)(e, !1).then(function(t) {
                                t.message,
                                n.getPhotoList()
                            }).catch(function(n) {})
                        }
                    })
                }),
                $(window).on("updateAlbum", function(t, e) {
                    n.updatePhoto(e)
                }),
                $("#app-download").on(a.default.TAP, function() {
                    a.default.downloadNativeApp("902803_23")
                })
            }
        }]),
        n
    }();
    t.default = w
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.album
          , o = n.readOnly
          , s = c.$each;
        n.$value,
        n.$index;
        return t += '<div class="img_box">\r\n    <div class="img_box_title">\r\n        <div id="albumCount">相册(',
        t += e(i.count),
        t += '张)</div>\r\n        <div><a id="app-download">下载客户端,便捷沟通</a></div>\r\n    </div>\r\n    <div class="img_box_container">\r\n        <div class="img_box_wrapper" id="img_box_wrapper">\r\n            <div id="img_box_scroller" class="img_box_scroller" >\r\n                <ul>\r\n                    ',
        !0 !== o && (t += '\r\n                    <li class="file_li" id="upload-button">\r\n                        <input type="file" class="upload_file" id="upload-photo">\r\n                    </li>\r\n                    '),
        t += "\r\n                    ",
        s(i.list, function(n, c) {
            t += '\r\n                    <li class="img_item" data_src="',
            t += e(n.photoURL),
            t += '?ss=0&w=800&h=800" photo_id="',
            t += e(n.photoID),
            t += '" style="background:url(',
            t += e(n.dataUrl),
            t += ');background-size:cover"></li>\r\n                    '
        }),
        t += "\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"
    }
}
, function(n, t, e) {
    e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = "";
        return t += '<div class="popup-mask">\r\n    <div class="center popup_in">\r\n        <div class="popup-content">\r\n            <p>上传一张真实头像才能查看哦</p>\r\n        </div>\r\n        <div id="popup_btn_container">\r\n            <a class="cancel" data-icon="close" id="popup_btn_close">取消</a>\r\n            <a data-icon="checkmark" id="popup_btn_ok">确定</a>\r\n        </div>\r\n    </div>\r\n    <div class="over_load" style="height: 1662px;"></div>\r\n</div>\r\n'
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(60)
      , a = c(s)
      , r = e(14)
      , l = c(r)
      , d = e(18)
      , h = (c(d),
    e(26));
    t.default = function(n, t) {
        var e = $(n)
          , c = "";
        2 == t.introduceContentStatus && (c = "（审核中）"),
        e.append((0,
        a.default)({
            content: Z.decodeHTML(t.introduceContent),
            status: c
        }));
        var i = !0
          , s = $("#compile-word")
          , r = $("#compile-textarea")
          , d = $("#compile-btn")
          , u = $("#heartword-content")
          , p = $("#heart-content")
          , f = $("#expand-tool");
        s.on(o.default.TAP, function() {
            m(!0)
        }),
        d.on(o.default.TAP, "a", function(n) {
            var e = $(n.srcElement);
            if (r[0].blur(),
            !0 === e.hasClass("save_compile")) {
                var c = r.val();
                c.length < 20 ? (0,
                l.default)("你输入的内容太少啦，请至少输入20字") : c.length > 1500 ? (0,
                l.default)("你输入的内容太多啦，请输入1500字符以内") : t.introduceContent == c ? m(!1) : (0,
                h.updateIntroduceContent)({
                    introduceContent: c
                }).then(function(n) {
                    n.isError ? (0,
                    l.default)(n.errorMessage) : ((0,
                    l.default)(n.data.msg),
                    u.html(c),
                    p.html("内心独白（审核中）"),
                    m(!1))
                }).catch(function() {
                    (0,
                    l.default)("服务器或网络异常")
                })
            } else
                m(!1)
        }),
        f.on(o.default.TAP, function() {
            i ? (u.removeClass("heart_word_spread"),
            v(f, "收起", 45, "bottom")) : (u.addClass("heart_word_spread"),
            v(f, "展开", -135, "top")),
            i = !i
        });
        var m = function(n) {
            !0 === t.readOnly ? s.hide() : !0 === n ? (s.hide(),
            u.hide(),
            r.show(),
            d.show()) : (s.show(),
            u.show(),
            r.hide(),
            d.hide());
            var e = 0 == u.height() ? r.height() : u.height()
              , c = u.css("line-height");
            Math.ceil(e / parseInt(c)) < 5 || 1 == n ? (f.hide(),
            u.removeClass("heart_word_spread"),
            v(f, "收起", 45, "bottom")) : (f.show(),
            u.addClass("heart_word_spread"),
            v(f, "展开", -135, "top"))
        }
          , v = function(n, t, e, c) {
            n.children("span").eq(1).text(t),
            n.children("span").eq(0).css({
                "-webkit-transform": "rotate(" + e + "deg)",
                "vertical-align": "" + c
            })
        };
        m()
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.status
          , o = n.content;
        return t += '<p class="heart_word_title">\r\n    <span id="heart-content">内心独白',
        t += e(i),
        t += '\r\n \t</span>\r\n    <span class="compile_btn no_show" id="compile-btn">\r\n        <a>取消</a>\r\n        <a class="save_compile">保存</a>\r\n    </span>\r\n    <a href="javaScript:;" class="compile" id="compile-word"></a>\r\n</p>\r\n<p class="heart_word_content" id="heartword-content">',
        t += e(o),
        t += '</p>\r\n<textarea class="heart_word_content compile_word" id="compile-textarea" maxlength="1500">',
        t += e(o),
        t += '</textarea>\r\n<div class="expand_tool" id="expand-tool">\r\n    <span></span>\r\n    <span>展开</span>\r\n</div>'
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(62)
      , a = c(s)
      , r = e(41)
      , l = (c(r),
    e(42))
      , d = (c(l),
    e(35))
      , h = (c(d),
    e(43))
      , u = (c(h),
    e(44))
      , p = (c(u),
    e(45))
      , f = (c(p),
    e(46))
      , m = (c(f),
    e(14))
      , v = c(m)
      , g = e(18)
      , y = (c(g),
    e(26));
    t.default = function(n, t) {
        Object.getOwnPropertyNames(t).forEach(function(n) {
            !0 === /^object.+String$/i.test(n) && (t[n] = "未填写" === t[n] ? "不限" : t[n])
        });
        !function() {
            $(n).html((0,
            a.default)(t));
            var e = $("#info_zeou")
              , c = $("#zeou-expend")
              , i = $("#zeou-expend-title")
              , s = $("#zeou-expend-icon")
              , r = $("#zeou_edit_trigger")
              , l = $("#zeou_edit_action")
              , d = ($("#zeou_edit_action cancel_compile"),
            !1)
              , h = !1;
            if (!1 === t.readOnly) {
                var u = syscode.addSection("age", "buxian", "age_list", "岁", t.objectAge1, t.objectAge2)
                  , p = syscode.addSection("height", "buxian", "height_list", "cm", t.objectHeight1, t.objectHeight2)
                  , f = syscode.addSalary("ta_salary_list", "buxian", t.objectSalary1, t.objectSalary2);
                syscode.addSelectOption("education", -1, "buxian", "education"),
                syscode.addSelectOption("marriage", -1, "buxian", "marriage"),
                syscode.addSelectOption("taChildren", -1, "buxian", "tachildren"),
                syscode.addSelectOption("wantChildren", -1, "buxian", "ta_wantChildren"),
                0 === t.gender ? syscode.addSelectOption("taBody1", -1, "buxian", "taBody") : syscode.addSelectOption("taBody0", -1, "buxian", "taBody"),
                syscode.addSelectOption("taIsSmoking", -1, "buxian", "taSmoking"),
                syscode.addSelectOption("taIsDrinking", -1, "buxian", "taDrinking"),
                syscode.addSelectOption("havingPhoto", -1, "buxian", "taPhoto");
                var m = city.addWorkCity2(t.objectWorkCity.toString(), "ta_area_treelist", "qingxuanze")
            }
            var g = function(n, t) {
                $("#" + n).mobiscroll().select({
                    theme: "android-holo-light",
                    display: "bottom",
                    mode: "scroller",
                    lang: "zh",
                    animate: "fade",
                    defaultValue: t
                })
            }
              , w = function() {
                !0 === t.readOnly ? r.css("display", "none") : h ? (e.find(".info_item").addClass("compile_item"),
                e.find(".arrow_down").removeClass("no_show"),
                e.addClass("on"),
                c.css("display", "none"),
                r.css("display", "none"),
                l.css("display", "block")) : (e.find(".info_item").removeClass("compile_item"),
                e.find(".arrow_down").addClass("no_show"),
                e.removeClass("on"),
                c.css("display", "block"),
                r.css("display", "block"),
                l.css("display", "none"))
            }
              , b = function() {
                d ? (e.css("height", "auto"),
                i.html("收起"),
                s.css("transform", "rotate(45deg)")) : (e.css("height", "8.75rem"),
                i.html("展开"),
                s.css("transform", "rotate(-135deg)"))
            }
              , _ = function() {
                $("#age_show").on(o.default.TAP, function() {
                    var n = $("#age_list")
                      , t = $("#agebegin").attr("arrIndex");
                    n.mobiscroll().treelist({
                        theme: "android-holo-light",
                        mode: "scroller",
                        display: "bottom",
                        lang: "zh",
                        labels: ["minage", "maxage"],
                        wa: "age",
                        defaultValue: t ? t.split(" ") : u
                    }),
                    n.mobiscroll("show")
                }),
                $("#height_show").on(o.default.TAP, function() {
                    var n = $("#h1").attr("arrIndex")
                      , t = $("#height_list");
                    t.mobiscroll().treelist({
                        theme: "android-holo-light",
                        mode: "scroller",
                        display: "bottom",
                        lang: "zh",
                        labels: ["minage", "maxage"],
                        defaultValue: n ? n.split(" ") : p
                    }),
                    t.mobiscroll("show")
                }),
                $("#ta_salary_show").on(o.default.TAP, function() {
                    var n = $("#salarybegin").attr("arrIndex")
                      , t = $("#ta_salary_list");
                    t.mobiscroll().treelist({
                        theme: "android-holo-light",
                        mode: "scroller",
                        display: "bottom",
                        lang: "zh",
                        labels: ["minage", "maxage"],
                        defaultValue: n ? n.split(" ") : f
                    }),
                    t.mobiscroll("show")
                }),
                g("education", $("#obj_education").val()),
                g("marriage", $("#obj_marriage").val()),
                $("#ta_area_show").on(o.default.TAP, function() {
                    $("#ta_area_treelist").mobiscroll().treelist({
                        theme: "android-holo-light",
                        mode: "scroller",
                        display: "bottom",
                        lang: "zh",
                        labels: ["provicne", "city", "county"],
                        defaultValue: 0 == m.codeArr.length ? [1, 0] : m.codeArr
                    }),
                    $("#ta_area_treelist").mobiscroll("show")
                }),
                g("tachildren", $("#obj_children").val()),
                g("ta_wantChildren", $("#obj_wantchildren").val()),
                g("taSmoking", $("#obj_isSmoking").val()),
                g("taDrinking", $("#obj_isDrinking").val()),
                g("taPhoto", $("#obj_taPhoto").val()),
                g("taBody", $("#obj_body").val())
            }
              , x = function() {
                var n = {
                    objectAge1: $("#agebegin").val(),
                    objectAge2: $("#ageend").val(),
                    objectHeight1: $("#h1").val(),
                    objectHeight2: $("#h2").val(),
                    objectSalary1: $("#salarybegin").val(),
                    objectSalary2: $("#salaryend").val(),
                    objectEducation: $("#obj_education").val(),
                    objectMarriage: $("#obj_marriage").val(),
                    objectWorkCity: $("#obj_workCity").val(),
                    objectChildren: $("#obj_children").val(),
                    objectWantChildren: $("#obj_wantchildren").val(),
                    objectBody: $("#obj_body").val(),
                    objectIsSmoking: $("#obj_isSmoking").val(),
                    objectIsDrinking: $("#obj_isDrinking").val(),
                    objectHasPhoto: $("#obj_taPhoto").val()
                };
                (0,
                y.updateProfile)(n).then(function(n) {
                    n.isError ? (0,
                    v.default)(n.errorMessage) : (h = !1,
                    d = !1,
                    b(),
                    w(),
                    k(),
                    (0,
                    v.default)(n.data.msg))
                })
            }
              , k = function() {
                $("#salary").mobiscroll("destroy"),
                $("#my_citylist").mobiscroll("destroy"),
                $("#mychildren").mobiscroll("destroy"),
                $("#wantChildren").mobiscroll("destroy"),
                $("#myHouse").mobiscroll("destroy"),
                $("#myVehicle").mobiscroll("destroy"),
                $("#my_occup_list").mobiscroll("destroy"),
                $("#native_place_list").mobiscroll("destroy"),
                $("#city_show").off("tap"),
                $("#native_place").off("tap"),
                $("#age_list").mobiscroll("destroy"),
                $("#age_show").off("tap"),
                $("#height_list").mobiscroll("destroy"),
                $("#height_show").off("tap"),
                $("#ta_salary_list").mobiscroll("destroy"),
                $("#ta_salary_show").off("tap"),
                $("#ta_area_treelist").mobiscroll("destroy"),
                $("#ta_area_show").off("tap"),
                $("#education").mobiscroll("destroy"),
                $("#marriage").mobiscroll("destroy"),
                $("#tachildren").mobiscroll("destroy"),
                $("#ta_wantChildren").mobiscroll("destroy"),
                $("#taSmoking").mobiscroll("destroy"),
                $("#taDrinking").mobiscroll("destroy"),
                $("#taPhoto").mobiscroll("destroy"),
                $("#myStock").mobiscroll("destroy"),
                $("#myWeight").mobiscroll("destroy"),
                $("#myBody").mobiscroll("destroy"),
                $("#taBody").mobiscroll("destroy")
            };
            !function() {
                c.on(o.default.TAP, function() {
                    d = !d,
                    b()
                }),
                r.on(o.default.TAP, function() {
                    if ($("#info_content1").hasClass("on"))
                        return (0,
                        v.default)("先保存个人资料吧"),
                        !1;
                    h = !0,
                    d = !0,
                    w(),
                    b(),
                    _()
                }),
                l.find(".cancel_compile").on(o.default.TAP, function() {
                    location.reload()
                }),
                l.find(".save_compile").on(o.default.TAP, x)
            }(),
            w()
        }()
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.objectAgeString
          , o = n.objectAge1
          , s = n.objectAge2
          , a = n.readOnly
          , r = n.objectHeightString
          , l = n.objectHeight1
          , d = n.objectHeight2
          , h = n.objectSalaryString
          , u = n.objectSalary1
          , p = n.objectSalary2
          , f = n.objectEducationString
          , m = n.objectEducation
          , v = n.objectMarriageString
          , g = n.objectMarriage
          , y = n.objectWorkCityString
          , w = n.objectWorkCity
          , b = n.objectChildrenString
          , _ = n.objectChildren
          , x = n.objectWantChildrenString
          , k = n.objectWantChildren
          , T = n.objectBodyString
          , S = n.objectBody
          , C = n.objectIsSmokingString
          , P = n.objectIsSmoking
          , E = n.objectIsDrinkingString
          , A = n.objectIsDrinking
          , M = n.objectHasPhotoString
          , I = n.objectHasPhoto;
        return t += '<div class="info_box" id="zeou-info">\n    <p class="heart_word_title">\n        择偶标准\n        <a class="compile" id="zeou_edit_trigger"></a>\n        <span class="compile_btn no_show compile_btn_list" id="zeou_edit_action">\n            <a class="cancel_compile">取消</a>\n            <a class="save_compile">保存</a>\n        </span>\n    </p>\n    <div class="info_content" id="info_zeou">\n        <div id="compile_info">\n            <div class="info_item">\n                <span class="nick_name">年龄</span>\n                <span id="age_show">',
        t += e(i),
        t += '</span>\n                <input type="hidden" name="age1" id="agebegin" value="',
        t += e(o),
        t += '"/>\n                <input type="hidden" name="age2" id="ageend" value="',
        t += e(s),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <ul id="age_list" class="no_show" select_name="age" text_show="age_show" first_name="agebegin" second_name="ageend" cascade-level="2">\n                </ul>\n                <span class="arrow_down no_show"></span>\n                '),
        t += '\n            </div>\n            <div class="info_item">\n                <span class="nick_name">身高</span>\n                <span id="height_show">',
        t += e(r),
        t += '</span>\n                <input type="hidden" name="height1" id="h1" value="',
        t += e(l),
        t += '">\n                <input type="hidden" name="height2" id="h2" value="',
        t += e(d),
        t += '">\n                ',
        !1 === a && (t += '\n                <ul id="height_list" class="no_show" select_name="height" text_show="height_show" first_name="h1" second_name="h2" cascade-level="2">\n                </ul>\n                <span class="arrow_down no_show"></span>\n                '),
        t += '\n            </div>\n            <div class="info_item">\n                <span class="nick_name">月收入</span>\n                <span id="ta_salary_show">',
        t += e(h),
        t += '</span>\n                <input type="hidden" name="salary1" id="salarybegin" value="',
        t += e(u),
        t += '"/>\n                <input type="hidden" name="salary2" id="salaryend" value="',
        t += e(p),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <ul id="ta_salary_list" class="no_show" select_name="ta_salary" text_show="ta_salary_show" first_name="salarybegin" second_name="salaryend"\n                    cascade-level="2">\n                </ul>\n                <span class="arrow_down no_show"></span>\n                '),
        t += '\n            </div>\n            <div class="info_item">\n                <span class="nick_name">学历</span>\n                <span id="education_show">',
        t += e(f),
        t += '</span>\n                <input type="hidden" name="education" id="obj_education" value="',
        t += e(m),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <select class="newselect education dw-hsel" id="education" select_name="education" text_show="education_show" hiddentext="obj_education"\n                    tabindex="-1"></select>\n                <span class="arrow_down no_show"></span>\n                '),
        t += '\n            </div>\n            <div class="info_item">\n                <span class="nick_name">婚姻状况</span>\n                <span id="marriage_show">',
        t += e(v),
        t += '</span>\n                <input type="hidden" name="marriage" id="obj_marriage" value="',
        t += e(g),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <select class="newselect marriage dw-hsel" id="marriage" select_name="marriage" text_show="marriage_show" hiddentext="obj_marriage"\n                    tabindex="-1"></select>\n                <span class="arrow_down no_show"></span>\n                '),
        t += '\n            </div>\n            <div class="info_item">\n                <span class="nick_name">工作地区</span>\n                <span id="ta_area_show">',
        t += e(y),
        t += '</span>\n                <input type="hidden" name="workCity" id="obj_workCity" value="',
        t += e(w),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <ul id="ta_area_treelist" class="no_show" select_name="workCity" first_name="obj_workCity" text_show="ta_area_show" cascade-level="3">\n                </ul>\n                <span class="arrow_down no_show"></span>\n                '),
        t += '\n            </div>\n            <div class="info_item">\n                <span class="nick_name">有没有小孩</span>\n                <span id="ta_child_show">',
        t += e(b),
        t += '</span>\n                <input type="hidden" name="children" id="obj_children" value="',
        t += e(_),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <select class="newselect no_show dw-hsel" id="tachildren" select_name="children" text_show="ta_child_show" hiddentext="obj_children"\n                    tabindex="-1"></select>\n                <span class="arrow_down no_show"></span>\n                '),
        t += '\n            </div>\n            <div class="info_item">\n                <span class="nick_name">是否想要小孩</span>\n                <span id="ta_want_child_show">',
        t += e(x),
        t += '</span>\n                <input type="hidden" name="wantchildren" id="obj_wantchildren" value="',
        t += e(k),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <select class="newselect no_show dw-hsel" id="ta_wantChildren" select_name="wantchildren" text_show="ta_want_child_show"\n                    hiddentext="obj_wantchildren" tabindex="-1"></select>\n                <span class="arrow_down no_show"></span>\n                '),
        t += '\n            </div>\n            <div class="info_item">\n                <span class="nick_name">体型</span>\n                <span id="ta_body_show">',
        t += e(T),
        t += '</span>\n                <input type="hidden" name="body" id="obj_body" value="',
        t += e(S),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <select class="newselect no_show dw-hsel" id="taBody" select_name="body" text_show="ta_body_show" hiddentext="obj_body" tabindex="-1"></select>\n                <span class="arrow_down no_show"></span>\n                '),
        t += "\n            </div>\n            ",
        C && (t += '\n            <div class="info_item">\n                <span class="nick_name">是否抽烟</span>\n                <span id="ta_smoking_show">',
        t += e(C),
        t += '</span>\n                <input type="hidden" name="issmoking" id="obj_isSmoking" value="',
        t += e(P),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <select class="newselect no_show dw-hsel" id="taSmoking" select_name="issmoking" text_show="ta_smoking_show" hiddentext="obj_isSmoking"\n                    tabindex="-1"></select>\n                <span class="arrow_down no_show"></span>\n                '),
        t += "\n            </div>\n            "),
        t += "\n            ",
        E && (t += '\n            <div class="info_item">\n                <span class="nick_name">是否喝酒</span>\n                <span id="taDrinking_show">',
        t += e(E),
        t += '</span>\n                <input type="hidden" name="isdrinking" id="obj_isDrinking" value="',
        t += e(A),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <select class="newselect no_show dw-hsel" id="taDrinking" select_name="isdrinking" text_show="taDrinking_show" hiddentext="obj_isDrinking"\n                    tabindex="-1"></select>\n                <span class="arrow_down no_show"></span>\n                '),
        t += "\n            </div>\n            "),
        t += "\n            ",
        M && (t += '\n            <div class="info_item last_compile_item">\n                <span class="nick_name">有无照片</span>\n                <span id="taPhoto_show">',
        t += e(M),
        t += '</span>\n                <input type="hidden" name="hasphoto" id="obj_taPhoto" value="',
        t += e(I),
        t += '"/>\n                ',
        !1 === a && (t += '\n                <select class="newselect no_show dw-hsel" id="taPhoto" select_name="hasphoto" text_show="taPhoto_show" hiddentext="obj_taPhoto"\n                    tabindex="-1"></select>\n                <span class="arrow_down no_show"></span>\n                '),
        t += "\n            </div>\n            "),
        t += '\n        </div>\n    </div>\n    <div id="zeou-expend" class="expand_tool info_expand_tool">\n        <span id="zeou-expend-icon" style="transform: rotate(-135deg); vertical-align: top;"></span>\n        <span id="zeou-expend-title">展开</span>\n    </div>\n</div>'
    }
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(15)
      , a = c(s)
      , r = e(24)
      , l = c(r)
      , d = e(19)
      , h = c(d)
      , u = e(32)
      , p = c(u)
      , f = e(21)
      , m = c(f)
      , v = e(14)
      , g = c(v)
      , y = e(54)
      , w = c(y)
      , b = e(56)
      , _ = c(b)
      , x = e(59)
      , k = c(x)
      , T = e(52)
      , S = c(T)
      , C = e(189)
      , P = c(C)
      , E = e(61)
      , A = c(E)
      , M = e(191)
      , I = c(M)
      , D = e(193)
      , j = c(D)
      , B = e(47)
      , z = e(195)
      , L = c(z);
    e(12),
    e(196),
    t.default = function(n) {
        if (!1 === Z.user.isLogin())
            return Z.user.login(location.href);
        var t = (0,
        l.default)("#titleBar", "会员详情");
        (0,
        a.default)("#head"),
        (0,
        h.default)("#foot"),
        (0,
        p.default)(),
        (0,
        m.default)(),
        $("#content").html((0,
        L.default)());
        var e = Z.getParam("id");
        e && e.length > 0 && (0,
        B.getProfile)(e).then(function(n) {
            if (!1 === n.isError) {
                var e = n.data
                  , c = o.default.storage.getItem("match-percent") || {};
                c[e.memberID] = c[e.memberID] || Math.round(50 + 50 * Math.random()) + "%",
                o.default.storage.setItem("match-percent", c),
                e.readOnly = !0,
                e.matchPercent = c[e.memberID],
                t.setTitle(e.nickname),
                (0,
                w.default)("#member-info", e),
                new _.default("#member-album",e),
                (0,
                P.default)("#member-action", e),
                (0,
                k.default)("#member-heartword", e),
                (0,
                S.default)("#member-personaldata", e),
                (0,
                A.default)("#member-zeou", e),
                (0,
                I.default)("#member-alarm", e),
                (0,
                j.default)("#member-recommend", e)
            } else
                (0,
                g.default)(n.errorMessage)
        })
    }()
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(4)
      , a = e(48)
      , r = c(a)
      , l = e(14)
      , d = c(l)
      , h = e(190)
      , u = c(h);
    t.default = function(n, t) {
        $(n).html((0,
        u.default)(t)),
        $("#member_say_hello").on(o.default.TAP, function(n) {
            (0,
            r.default)(t.memberID)
        }),
        $("#member_send_mail").on(o.default.TAP, function(n) {
            (0,
            s.getBasicProfile)().then(function(n) {
                !0 === n.data.isZhenaiMail ? location.href = "./read.html?id=" + t.memberID : (0,
                d.default)("升级珍心会员，沟通无障碍", 3e3, function() {
                    location.href = "./payment.html?type=1"
                })
            })
        }),
        $("#member_send_gift").on(o.default.TAP, function(n) {
            location.href = "./giftList.html?nickname=" + encodeURIComponent(t.nickname) + "&userid=" + t.memberID + "&backurl=" + encodeURIComponent(location.href)
        })
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.objectID;
        return t += '<div class="action_box">\n    <span class="action_box1">\n        <a id="member_say_hello" objectId="',
        t += e(i),
        t += '">\n            <i class="say_hello"></i>打招呼\n        </a>\n    </span>\n    <span class="action_box2">\n        <a id="member_send_mail" objectId="',
        t += e(i),
        t += '">\n            <i class="say_email"></i>发邮件\n        </a>\n    </span>\n    <span>\n        <a id="member_send_gift" objectId="',
        t += e(i),
        t += '">\n            <i class="say_gift"></i>送礼物\n        </a>\n    </span>\n</div>'
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(192)
      , a = c(s);
    t.default = function(n, t) {
        $(n).html((0,
        a.default)(t)),
        $("#alarm-online").on(o.default.TAP, function() {
            $("#online-box").css("display", "block")
        }),
        $("#alarm-contact").on(o.default.TAP, function() {
            o.default.downloadNativeApp("902803_28")
        }),
        $(".box-buttons").on(o.default.TAP, "a", function(n) {
            o.default.preventDefault(n),
            !1 === $(n.currentTarget).hasClass("cancel") && o.default.downloadNativeApp("902803_28"),
            $("#online-box").css("display", "none")
        })
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.objectID;
        return t += '<div class="bottom_box">\n    <span id="alarm-online" class="action_box1" objectId="',
        t += e(i),
        t += '">\n        <i class="warning"></i>上线提醒\n    </span>\n    <span id="alarm-contact" objectId="',
        t += e(i),
        t += '">\n        <i class="contact"></i>\n        <label>联系TA</label>\n    </span>\n</div>\n<div id="online-box" style="display:none;">\n    <div class="center popup_in">\n        <div class="popup-content">\n            <p style="font-size:1.1em">立即下载App免费体验上线提醒</p>\n            <p style="font-size:1.1em">随时随地掌握心上人动向!</p>\n        </div>\n        <div id="popup_btn_container" class="box-buttons">\n            <a class="cancel" data-icon="close" >&nbsp;&nbsp;取消&nbsp;&nbsp;</a>\n            <a data-icon="checkmark">确定</a></div>\n    </div>\n    <div class="over_load"></div>\n</div>'
    }
}
, function(n, t, e) {
    "use strict";
    function c(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0)
      , o = c(i)
      , s = e(47)
      , a = e(35)
      , r = c(a)
      , l = e(194)
      , d = c(l);
    t.default = function(n, t) {
        var e = function() {
            new r.default("#recommend_box",{
                scrollbars: !0,
                scrollX: !0,
                scrollY: !1,
                tap: !0
            })
        };
        (0,
        s.getMightLike)(t.memberID).then(function(t) {
            !1 === t.isError && (t.data.list.forEach(function(n) {
                n.flagList.forEach(function(t) {
                    2 === t.type && 2 === t.status && (n.isVip = !0)
                })
            }),
            $(n).html((0,
            d.default)(t.data)),
            $(n).find("a").on(o.default.TAP, function(n) {
                var t = $(n.currentTarget)
                  , e = t.attr("data-href");
                location.href = e
            }),
            e())
        })
    }
}
, function(n, t, e) {
    var c = e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = ""
          , e = c.$escape
          , i = n.list
          , o = c.$each;
        n.$value,
        n.$index;
        return t += '<div class="bona_recommend">\n    <p>你可能喜欢的人</p>\n    <div class="recommend_box clearfix" id="recommend_box">\n        <div class="recommend_container" style="width:',
        t += e(4 * i.length),
        t += 'rem;">\n            <ul class="clearfix">\n                ',
        o(i, function(n, c) {
            t += '\n                <li style="background-image:url(',
            t += e(n.avatarURL),
            t += '?scrop=1&crop=1&w=100&h=100&cpos=north);background-size:cover;">\n                    <a data-href="./member.html?id=',
            t += e(n.objectID),
            t += '">\n                        ',
            !0 === n.isVip && (t += "\n                        <img ",
            t += 'src="http://images.zastatic.com/imwap/wap2015/images/icon/vip2_c6fbd1c.png?rsdv=1"',
            t += "> "),
            t += "\n                    </a>\n                </li>\n                "
        }),
        t += "\n\n            </ul>\n        </div>\n    </div>\n</div>"
    }
}
, function(n, t, e) {
    e(1);
    n.exports = function(n) {
        "use strict";
        n = n || {};
        var t = "";
        return t += '<div id="member-info" class="vip_info clearfix"></div>\n<div id="member-album"></div>\n<div id="member-action"></div>\n<div id="member-heartword"></div>\n<div id="member-personaldata"></div>\n<div id="member-zeou"></div>\n<div id="member-alarm"></div>\n<div id="member-recommend"></div>'
    }
}
, function(n, t) {}
]);
