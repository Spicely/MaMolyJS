/*---------------------------------------------------------------
                create time 2016-01-07 00:08 AM
 ---------------------------------------------------------------*/
'use strict';
(function (window, undefined) {
    var LybyElement = (function () {
        var LybyElement = function (selector, content) {

            return new LybyElement.fn.init(selector, content);
        }
        return LybyElement;
    })();
    LybyElement.fn = LybyElement.prototype = {
        init: function (selector, content) {
            if (!selector) return this;
            if (typeof selector == "object") {
                MaMoly.model.pointer = selector;
                return LybyElement.view;
            }
            else if (isString(selector)) {
                var TagObject = selector.split(":");
                MaMoly.model.pointer = document[MaMoly.model.element_json[TagObject[0]]](TagObject[1]);
                return LybyElement.view;
            }
        }
    }
    LybyElement.view = LybyElement.prototype = {
        on: function ( event , callback) {
            Incident(MaMoly.model.pointer, MaMoly.model.event_json[event], callback);
            return this;
        },
        object: function () { return MaMoly.model.pointer },
        css: function () {
            if (arguments.length == 2) boundStyle(MaMoly.model.pointer, arguments[0], arguments[1], false);
            else {
                if (isObj(arguments[0])) boundStyle(MaMoly.model.pointer, arguments[0], false, false);
                else return boundStyle(MaMoly.model.pointer, arguments[0], false, false);
            }
            return this;
        },
        attr: function () {
            if (arguments.length == 2) boundStyle(MaMoly.model.pointer, arguments[0], arguments[1], true);
            else {
                if (isObj(arguments[0])) boundStyle(MaMoly.model.pointer, arguments[0], false, true);
                else return boundStyle(MaMoly.model.pointer, arguments[0], false, true);
            }
        },
        text: function (str) {
            Incident(MaMoly.model.pointer, "innerHTML", str);
        },
        index: function () {
            return MaMoly.model.pointer.index;
        },
        eq: function (num) {
            MaMoly.model.pointer = fairly(MaMoly.model.pointer, "eq", num); return this;
        }
    }
    window.LybyElement = window.M = LybyElement;
})(window);