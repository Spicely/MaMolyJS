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
            if (arguments.length == 2) boundStyle(MaMoly.model.pointer, arguments[0], arguments[1], "style");
            else {
                if (isObj(arguments[0])) boundStyle(MaMoly.model.pointer, arguments[0], false, "style");
                else return boundStyle(MaMoly.model.pointer, arguments[0], false, "style");
            }
            return this;
        },
        attr: function () {
            if (arguments.length == 2) boundStyle(MaMoly.model.pointer, arguments[0], arguments[1], "getAttribute");
              else {
                if (isObj(arguments[0])) boundStyle(MaMoly.model.pointer, arguments[0], false, "getAttribute");
                else return boundStyle(MaMoly.model.pointer, arguments[0], false, "getAttribute");
            }
            return this;
        },
        text: function (str) {
            if(!str) return this.attr("innerHTML");
            else Incident(MaMoly.model.pointer, "innerHTML", str);
            return this;
        },
        val: function(str){
            if(!str) return boundStyle(MaMoly.model.pointer, "value", false, true);
            else this.attr("value",str);
            return this;
        },
        index: function () {
            return MaMoly.model.pointer.index;
        },
        eq: function (num) {
            MaMoly.model.pointer = fairly(MaMoly.model.pointer, "eq", num); return this;
        },
        each: function(callback){
            foreach(MaMoly.model.pointer,callback);return this;
        },
        length: function(){
            return MaMoly.model.pointer.length === undefined ? 1 : MaMoly.model.pointer.length;
        },
        child: function(){
            var obj = boundStyle(MaMoly.model.pointer, "childNodes", false, true);
            var object  = MaMoly.model.pointer.length === undefined ? [MaMoly.model.pointer] : MaMoly.model.pointer;
            for(var e = 0 ; e < obj.length ; e++){
                if(obj[e].nodeName  == "#text" && !/\s/.test(obj.nodeValue)) 
                for(var i = 0; i < object.length ; i++) MaMoly.model.pointer[i].removeChild(obj[e]);
            }
           MaMoly.model.pointer = boundStyle(MaMoly.model.pointer, "childNodes", false, true); return this;
        },
        parent: function(){
            MaMoly.model.pointer = boundStyle(MaMoly.model.pointer, "parentNode", false, true); return this;
        },
        next: function(){
            MaMoly.model.pointer = boundStyle(MaMoly.model.pointer, "nextSbiling", false, true); return this;
        }
    }
    window.LybyElement = window.MaMo = window.M = LybyElement;
})(window);