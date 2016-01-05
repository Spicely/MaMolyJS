/*---------------------------------------------------------------
                create time 2015-12-31 02:08 AM
 ---------------------------------------------------------------*/
    function typeOf(val) {
        var o = Object.prototype.toString.call(val).split(" ")[1],
            m = o.substr(0, o.length - 1);
        if (null === val)  return 'null';
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
    function getExt(filename) {                                /* [获取后缀名称] {    string     } */
        return filename.split(".").pop();
    }
    function bound(obj, attr, val) {                           /* [参数绑定]     { Object , attrAbute , value } */
        var i = 0, length = val.length, result = [];
        if (isEleArr(obj)) {
            if (isArray(val)) {
                for (; i < length;i++) obj[i][attr](val[0], val[1]);
            }else{
                for (; i < length; i++) result[i] = obj[attr](val[0]);
                return result;
            }
        } else {
            if (val.length > 1) {
                obj[attr](val[0], val[1]);
            } else {
                result = obj[attr](val[0]);
                return result;
            }
        }
    }
    function setValGet(obj, value) {
        var result = [], ArrayRes = [];
        if (this.isEle(obj) && !this.isEleArr(obj)) {          // 单个绑定
            for (var e in value) {
                switch (e) {
                    case "css":
                        if (isArray(value[e]) || typeOf(value[e]) == "string") {
                            if (isArray(value[e]) && typeOf(value[e][0]) == "string") {
                                for (var v = 0 ; v < value[e].length; v++) {
                                    result[v] = obj.style[value[e][v]];
                                }
                                return result;
                            } else {
                                result = obj[L].style[value[e]];
                                return result;
                            }
                        } else {
                            for (var i in value[e]) obj.style[i] = value[e][i];
                        }; break;
                    case "attr":
                        if (isArray(value[e]) || typeOf(value[e]) == "string") {
                            if (isArray(value[e]) && typeOf(value[e][0]) == "string") {
                                for (var v = 0 ; v < value[e].length; v++) {
                                    result[v] = obj[value[e][v]];
                                }
                                return result;
                            } else {
                                result = obj[value[e]];
                                return result;
                            }
                        } else {
                            for (var i in value[e]) bound(obj, 'setAttribute', [i, value[e][i]]);
                        }; break;
                }
            }
        } else if (this.isEle(obj) && this.isEleArr(obj)) {   // 多个绑定        
            for (var e in value) {
                switch (e) {
                    case "css":
                        if (isArray(value[e]) || typeOf(value[e]) == "string") {
                            if (isArray(value[e]) && typeOf(value[e][0]) == "string") {
                                for (var L = 0 ; L < obj.length; L++) {
                                    for (var v = 0 ; v < value[e].length; v++) {
                                        result[v] = obj[L].style[value[e][v]];
                                    }
                                    ArrayRes[L] = result;
                                }
                                return ArrayRes;
                            } else if (isArray(value[e]) && isObj(value[e][0])) {
                                for (var L = 0 ; L < value[e].length; L++) {
                                    for (var i in value[e][L]) obj[L].style[i] = value[e][L][i];
                                }
                            } else {
                                for (var L = 0 ; L < obj.length ; L++) {
                                    result[L] = obj[L].style[value[e]];
                                }
                                return result;
                            }
                        } else {
                            for (var L = 0 ; L < obj.length ; L++) {
                                for (var i in value[e]) obj[L].style[[i]] = value[e][i];
                            }
                        }; break;
                    case "attr":
                        if (isArray(value[e]) || typeOf(value[e]) == "string") {
                            if (isArray(value[e]) && typeOf(value[e][0]) == "string") {
                                for (var L = 0 ; L < obj.length; L++) {
                                    for (var v = 0 ; v < value[e].length; v++) {
                                        result[v] = obj[L][value[e][v]];
                                    }
                                    ArrayRes[L] = result;
                                }
                                return ArrayRes;
                            } else if (isArray(value[e]) && isObj(value[e][0])) {
                                for (var L = 0 ; L < value[e].length; L++) {
                                    for (var i in value[e][L]) obj[L][i] = value[e][L][i];
                                }
                            } else {
                                for (var L = 0 ; L < obj.length ; L++) {
                                    result[L] = obj[L][value[e]];
                                }
                                return result;
                            }
                        } else {
                            var length = obj.length;
                            for (var L = 0 ; L < length ; L++) {
                                for (var i in value[e]) {
                                    if (i == 'className') {
                                        bound(obj[0], 'setAttribute', ['class', value[e][i]])
                                    } else {
                                        bound(obj[0], 'setAttribute', [i, value[e][i]]);
                                    }
                                }
                            }
                        }; break;
                }
            }
        }
    }