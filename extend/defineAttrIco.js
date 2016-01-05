/*---------------------------------------------------------- 
        create time 2015-12-25 10:34 PM
 ---------------------------------------------------------*/
"use strict";
var options = {
    "icoTag": ["MaMoly-Ico","MaMoly-icoExt"],
    "icoPath": "./js/extend/ico-content/",
    "icoExt": "jpg",
};                                                   // parameter setting
new MaMoly.ByElement(window).on('PG_LOAD', function () {
    new MaMoly.ByElement("Tag:*").each(function () {
        var obj = new MaMoly.ByElement(this);
        if (obj.attr(options.icoTag[0]) !== null && obj.attr(options.icoTag[0]) != "") {
            var icoExt = obj.attr(options.icoTag[1]) !== null ? obj.attr(options.icoTag[1]) : options.icoExt;
            var url = options.icoPath + obj.attr(options.icoTag[0]) + "." + icoExt;
            obj.Limage(url, function () {
                var MaMolyIcoStyle = new MaMoly.ByElement("Id:MaMolyIcoStyle").obj;
                if (!MaMolyIcoStyle) {
                    obj.CreateElement("style", {
                        attr: {
                            "id": "MaMolyIcoStyle",
                            "innerHTML": "." + obj.attr(options.icoTag[0]) + "{positon:relative}"+
                                         "." + obj.attr(options.icoTag[0])+":before{content:url("+ url +")}"
                        }
                    })
                } else {
                    new MaMoly.ByElement("Id:MaMolyIcoStyle").css({
                        attr: {
                            "innerHTML": "." + obj.attr(options.icoTag[0]) + "{positon:relative}" +
                                       "." + obj.attr(options.icoTag[0]) + ":before{content:url(" + url + ")}"
                        }
                    })
                }
                obj.css({
                    attr: {
                        "class": "MaMolyICO " + obj.attr(options.icoTag[0])
                    }
                })
            })
        }
    })
})  