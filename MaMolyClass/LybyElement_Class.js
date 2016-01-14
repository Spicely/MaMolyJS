/*---------------------------------------------------------------
                create time 2016-01-07 00:08 AM
 ---------------------------------------------------------------*/
'use strict';
    var model_element_json = Symbol('model_element_json'),
        model_event_json   = Symbol('model_event_json');
class byElement {
    constructor(object, boolen) {
        this.obj = object;
        this[model_element_json] = {             /* [object element json] { json } */
            "Id": "getElementById",
            "Class": "getElementsByClassName",
            "Tag": "getElementsByTagName",
            "Name": "getElementsByName"
        };
        this[model_event_json] = {              /* [事件json] { json } */
            "DE_CLICK": "onclick",
            "DE_DB_CLICK": "ondbclick",
            "DE_MS_DOWN": "onmousedown",
            "DE_MS_UP": "onmouseup",
            "DE_MS_OVER": "onmouseover",
            "DE_MS_OUT": "onmouseout",
            "DE_MS_MOVE": "onmousemove",
            "DE_KEY_PRESS": "onkeypress",
            "DE_KEY_DOWN": "onkeydown",
            "DE_KEY_UP": "onkeyup",
            // [define favorite event]
            "PG_ABORT": "onabort",
            "PG_BE_UNLOAD": "onbeforeunload",
            "PG_ERROR": "onerror",
            "PG_LOAD": "onload",
            "PG_MOVE": "onmove",
            "PG_RE_SIZE": "onresize",
            "PG_SCROLL": "onscroll",
            "PG_STOP": "onstop",
            // [page load event]
            "TAB_BLUR": "onblur",
            "TAB_CHANGE": "onchange",
            "TAB_FOCUS": "onfocus",
            "TAB_RE_SET": "onreset",
            "TAB_SUBMIT": "onsubmit",
            // [table control event]
            "TXT_BE_COPY": "onbeforecopy",
            "TXT_BE_CUT": "onbeforecut",
            "TXT_BE_EDIT": "onbeforeeditfocus",
            "TXT_BE_PASTE": "onbeforepaste",
            "TXT_BE_UPDATE": "onbeforeupdate",
            "TXT_MENU": "oncontextmenu",
            "TXT_COPY": "oncopy",
            "TXT_CUT": "oncut",
            "TXT_DRAG": "ondrag",
            "TXT_DR_DROP": "ondragdrop",
            "TXT_DR_END": "ondragend",
            "TXT_DR_ENTER": "ondragenter",
            "TXT_DR_LEAVE": "ondrageleave",
            "TXT_DR_OVER": "ondragover",
            "TXT_DR_STRAT": "ondragstart"
        }
        this.obj = isString(object) ? this.init() : this.object;
    }
    init() {
        var a = this.obj.split(":");
        this.obj = document[this[model_element_json][a[0]]](a[1]);
        return this.obj;
    }
    TEXT(value) {
        this.obj.innerHTML = value;
    }
    on(event, callback) {
        Incident(this.obj, this[model_event_json][event], callback);
    }
}
