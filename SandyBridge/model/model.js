/*----------------------------------------------------------
            create time 2015-12-27 04:34 pm
-----------------------------------------------------------*/
MaMoly.model = {
    "Path"    : "./MaMolyJS/",
    "pointer": null,
    "ExtTag": {                        /* import Ext Tag */
            "js": {
                 "Tag"        : "script",
                 "pathTag"    : "src",
                 "attr"       : {
                     "type"   : "text/javascript",
                     "src"    : "../"
                 }
            },
            "css": {
                "Tag"         : "link",
                "pathTag"     : "href",
                "attr"        : {
                    "rel"     : "stylesheet",
                    "type"    : "text/css",
                    "href"    : "../"
                }
            }
    },
    "extend":{
        "ICO":"extend/",
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