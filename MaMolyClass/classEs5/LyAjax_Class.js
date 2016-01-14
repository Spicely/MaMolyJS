/*---------------------------------------------------------------
                create time 2016-01-14 11:12 PM
 ---------------------------------------------------------------*/
'use strict'

function LyAjax(jsoninit) {
    this.jsonInit = {
        "call": {
            "url": null,
            "send": null,
            "error": function () { },
        },
        "jsonObect": null,
        init: function () {
            try {
                this.jsonObect = new ActiveXObject("Msxml2.XMLHTTP");        //IE高版本创建XMLHTTP  
            }
            catch (e) {
                try {
                    this.jsonObect = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP
                }
                catch (e) {
                    this.jsonObect = new XMLHttpRequest();                   //非IE浏览器，直接创建XMLHTTP对象 
                }
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
    }
    var jsonObject = this.jsonInit;
    jsonObject.jsonForValue(jsonObject.call, jsoninit);
    //jsonForValue(jsonObject.call, jsoninit);
    jsonObject.init();
    console.log(jsonObject.call);
}
LyAjax.prototype = {

}