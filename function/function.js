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
    function Incident(obj, Event, callBack) {                  /* [事件绑定]     { Object , Event , callBack } */
        if (this.isEleArr(obj)) {
            for (var e = 0 ; e < obj.length;) {
                obj[e++][Event] = callBack;
            }
        } else obj[Event] = callBack;
    }
    function foreach(obj, callback, args) {                    /* [遍历对象]     { Object , function , value } */
        var e, i = 0, length = obj.length, isEleAr = isEleArr(obj);
        try{
            if (args) {
                if (isEleAr) {
                    for (; i < length;i++) {
                        e = callback.apply(obj[i], args);
                        if (e === false) break;
                    }
                } else {
                    for (i in obj) {
                        e = callback.apply(obj[i], args);
                        if (e === false) break;
                    }
                }
            } else {
                if (isEleAr) {
                    for (; i < length;i++) {
                        e = callback.call(obj[i], i, obj[i]);
                        if (e === false) break;
                    }
                } else {
                    for (i in obj) {
                        e = callback.call(obj[i], i, obj[i]);
                        if (e === false) break;
                    }
                }
            }
        }catch(e){
            throw new Error('this function foreach(); Object || function || value error');
        }
        return obj;
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