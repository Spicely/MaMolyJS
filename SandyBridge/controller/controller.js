/*----------------------------------------------------------
            create time 2015-12-27 04:34 pm
-----------------------------------------------------------*/
"use strict";
var MaMoly = {
    HandViewBox: function ( jsonStyle ) {
       var jsonInit = {
            "ContClass" : null,
            "ViewClass" : null,
            "Event"     : "DE_CLICK",
            "CallBack"  : null,
            "ViewAnimation":null,
        }
       jsonForValue(jsonInit, jsonStyle);
       var animation = jsonInit.ViewAnimation === null ? 'css("display", "inline-block")' : jsonInit.ViewAnimation;
       var viewText = 'LybyElement("Class:" + jsonInit.ViewClass)';
       eval(viewText + '.css("display", "none").eq(0).' + animation);
        LybyElement("Class:" + jsonInit.ContClass).on(jsonInit.Event, function () {
            var ViewNum = LybyElement(this).index();
            eval(viewText + '.css("display", "none").eq(' + ViewNum + ').' + animation);
        })
    }
}
