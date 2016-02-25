/*----------------------------------------------------------
            create time 2015-12-27 04:34 pm
-----------------------------------------------------------*/
MaMoly.model = {
    "Path"    : "./MaMolyJS/",
    "pointer": null,
    "extend":{
        "ICO":"extend/",
    },
    "element_json" : {         /* [object element json] { json } */
                "Id"    : "getElementById",
                "Class" : "getElementsByClassName",
                "Tag"   : "getElementsByTagName",
                "Name"  : "getElementsByName"
    },
    "event_json":{            /* [事件json] { json } */
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
    },
    "objectStyle": {
        "Array"           : "array",
        "Date"            : "date",
        "Boolean"         : "boolean",
        "Number"          : "number",
        "Function"        : "function",
        "RegExp"          : "regexp",
        "Object"          : ["textnode","whitespace","element","object"],
        "define"          : "unknow",
        "null"            : "null",
        "undefined"       : "undefined",
        "String"          : "string"
    },
    "setObjectStyle": function (name) {
        this.pointer = !name ? null : this.objectStyle[name] ? this.objectStyle[name] : this.objectStyle["define"];
        return MaMoly.view.ObjectRes(this.pointer);
    }
}