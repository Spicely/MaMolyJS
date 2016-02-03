/*---------------------------------------------------------------
                create time 2015-12-31 02:08 AM
 ---------------------------------------------------------------*/
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
    function jsonForValue(jsoninit, json) {                    /* [值修改｜创建]     { json , json } */
        for (var e in json) {
            if (isNull(json[e]) && isObj(json[e]) && !isArray(json[e])) {
                this.jsonForValue(jsoninit[e], json[e]);
            } else if (isNull(json[e]) && isArray(json[e])) {
                for (var i = 0 ; i < json[e].length; e++) {
                    if (isObj(json[e][i]) && !isArray(ojson[e][i])) jsoninit[e][i] == json[e][i];
                    else jsonForValue(jsoninit[e][i], json[e][i]);
                }
            }
            else jsoninit[e] = json[e];
        }
    }
   