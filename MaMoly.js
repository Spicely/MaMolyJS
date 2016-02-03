/*----------------------------------------------------------
            create time 2015-12-27 02:59 PM
-----------------------------------------------------------*/

    var jsonType = {
        "TagType": {
            "js": {
                "Tag"  : "script",
                "PathTag": "src",
                "TypeValue": {
                    "type" : "text/javascript"
                }
            },
            "css": {
                "Tag" : "link",
                "PathTag": "href",
                "TypeValue": {
                    "rel" : "stylesheet",
                    "type": "text/css"
                }
            }
        }
    }
    function typeOf(val) {
        var o = Object.prototype.toString.call(val).split(" ")[1],
            m = o.substr(0, o.length - 1);
        if (null === val) return 'null';
        var type = typeof val;
        if ('undefined' === type || 'string' === type) return type;
        if (m.substr(0, 4) == 'HTML') return 'element';
        switch (m) {
            case 'Array':
                return 'array';
            case 'Date':
                return 'date';
            case 'Boolean':
                return 'boolean';
            case 'Number':
                return 'number';
            case 'Function':
                return 'function';
            case 'RegExp':
                return 'regexp';
            case 'Object':
                if (undefined !== val.nodeType) {
                    if (3 == val.nodeType) {
                        return (/\S/).test(val.nodeValue) ? 'textnode' : 'whitespace';
                    } else {
                        return 'element';
                    }
                } else {
                    return 'object';
                }
            default:
                return 'unknow';
        }
    }
    /*---------------------------------- type boolean ------------------------------*/
    function isArray(val) {                                     /* [定义数组检测] { true || false } */
        return typeOf(val) == 'array' ? true : false;
    }
    function isObj(val) {                                       /* [定义对象检测] { true || false } */
        return typeOf(val) == 'object' ? true : false;
    }
    function isObjArr(val) {                                    /* [对象数组检测] { true || false } */
        return isObj(val) ? val.length ? true : false : false;
    }
    function isEle(val) {                                      /* [节点对象检测] { true || false } */
        return typeOf(val) == 'element' ? true : false;
    }
    function isEleArr(val) {                                   /* [节点数组检测] { true || false } */
        return isEle(val) ? val.length ? true : false : false;
    }
    function isFunction(val) {                                 /* [函数检测]     { true || false } */
        return typeOf(val) == 'function' ? true : false;
    }
    function isString(val) {                                   /* [字符串检测]   { true || false } */
        return typeOf(val) == "string" ? true : false;
    }
    function isNull(val) {
        return typeOf(val) == "null" ? true : false;
    }
    /*---------------------------------- end ----------------------------------*/
    function getExt(filename) {                                /* [获取后缀名称] {    string     } */
        return filename.split(".").pop();
    }
    function require(HttpUrl, callback, asyn , tagView ) {
        asyn = !asyn ? false : asyn;
        tagView = !tagView ? false : tagView;
        var head = document.getElementsByTagName("head").item(0) || document.documentElement,
        Lythis = this, node = [];
        HttpUrl = (isArray(HttpUrl) && HttpUrl) || [HttpUrl];
        this.COUNT = HttpUrl.length;
        this.LOADNUM = 0;
        var seriesLoad = function (i) {
            var jsonView = jsonType.TagType[getExt(HttpUrl[i])];
            node[i] = document.createElement(jsonView.Tag);
            node[i].onload = node[i].onreadystatechange = function () {
                if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                    this.onload = this.onreadystatechange = null; tagView && this.parentNode.removeChild(this);
                    if (i < Lythis.COUNT) {
                        Lythis.LOADNUM += 1;
                        isFunction(callback) && callback();
                        Lythis.LOADNUM < Lythis.COUNT && seriesLoad(Lythis.LOADNUM);
                    }
                }
            }
            for (var e in jsonView.TypeValue) node[i].setAttribute(e, jsonView.TypeValue[e]);
            node[i].setAttribute(jsonView.PathTag, HttpUrl[i]);
            head.appendChild(node[i]);
        }
        var parallelLoad = function () {
            var jsonView;
            for (var i = 0 ; i < Lythis.COUNT; i++) {
                jsonView = jsonType.TagType[getExt(HttpUrl[i])];
                node[i] = document.createElement(jsonView.Tag);
                node[i].onload = node[i].onreadystatechange = function () {
                    if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                        Lythis.LOADNUM++;
                        this.onload = this.onreadystatechange = null; tagView && this.parentNode.removeChild(this);
                        if (Lythis.LOADNUM == Lythis.COUNT && isFunction(callback)) callback();
                    }
                }
                for (var e in jsonView.TypeValue) node[i].setAttribute(e, jsonView.TypeValue[e]);
                node[i].setAttribute(jsonView.PathTag, HttpUrl[i]);
                head.appendChild(node[i]);
            }
        }
        asyn ? parallelLoad() : seriesLoad(this.LOADNUM);
    }
   /*------------------------------------     文件载入 开始应用 -----------------------------*/
    require(["MaMolyJS/function/function.js", "css/AdminIndex.css"], function () {
        console.log(this.LOADNUM)
    }, false)