/*---------------------------------------------------------------
                create time 2016-01-14 11:12 PM
 ---------------------------------------------------------------*/
'use strict'

class LyAjax {
    constructor(jsoninit) {
        this.jsonInit = {
            "call": {
                "url"   : null,
                "success":function(){},
                "error" : function () { },
                "asyn"  : false,
                "type"  : "get",
                "sendfn": function(){}
            },
            "jsonObect" : null,
            init: function () {
                try{
                    this.jsonObect = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    this.jsonObect = new XMLHttpRequest();
                }
            },
            jsonForValue: function (json, option) {                              //完成后删除 于function.js  jsonForValue
                for (var e in option) {
                    if (option[e] !== null && typeof option[e] == "object" && !option[e] instanceof Array) {
                        this.jsonForValue(json[e], option[e]);
                    } else if (option[e] !== null && option[e] instanceof Array) {
                        for (var i = 0 ; i < option[e].length; e++) {
                            if (typeof option[e][i] == "object" && !option[e][i] instanceof Array) json[e][i] == option[e][i];
                            else this.jsonForValue(json[e][i], option[e][i]);
                        }
                    }
                    else json[e] = option[e];
                }
            },
            open: function (style, url, asyn) {
                this.jsonObect.open(style, url, asyn);
            },
            send: function( callback) {
                this.jsonObect.send(callback);
            }
        }
        var jsonObject = this.jsonInit;
        jsonObject.jsonForValue(jsonObject.call, jsoninit);
        //jsonForValue(jsonObject.call, jsoninit);
        jsonObject.init();
        if (jsonObject.call.url != null) {
            this.LyAjaxRequest(jsonObject.call.success);
            jsonObject.open(jsonObject.call.type, jsonObject.call.url, jsonObject.call.asyn);
            jsonObject.send(jsonObject.call.request);
        }
    }
    LyAjaxRequest( callback ) {
        var LyAjaxObject = this.jsonInit;
        LyAjaxObject.jsonObect.onreadystatechange = function () {
            if (LyAjaxObject.jsonObect.readyState == 4) {
                var date = LyAjaxObject.jsonObect.responseText;
                callback(date);
            }
        }
    }
    get( url , asyn , callback) {
        this.jsonInit.open("get", url, asyn);
        this.jsonInit.send(callback);
    }
    post( url , asyn , callback ) {
        this.jsonInit.open("post", url, asyn);
        this.jsonInit.send(callback);
    }
}
