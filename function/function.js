﻿/*---------------------------------------------------------------
                create time 2015-12-31 02:08 AM
 ---------------------------------------------------------------*/
    function Incident(object, Event, callback) {                  /* [事件绑定]     { Object , Event , callBack } */
        object = (object.length !== undefined && object) || [object];
        for (var e = 0 ; e < object.length ; e++) {
            object[e].index = e;
            if(!Event) object[e][Event]();
            else object[e][Event] = callback;
        }
    }
    function foreach(obj, callback, args) {                       /* [遍历对象]     { Object , function , value } */
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
    function boundStyle(object, sty, val , attr) {                   /* [参数绑定]     { Object , attrAbute , value } */
        var Gathet = '';
        object = (object.length !== undefined && object) || [object];
        for (var e = 0; e < object.length; e++) {
            if(!val){
                if(!val) Gathet = object[e][sty];
                else object[e][sty] = val;
            }else{
                if(isObj(sty)) for (var i in sty) object[e][attr][i] = sty[i];
                else if(!val) {
                    if(object[e][attr][sty] == '' || object[e][attr][sty] == 'undefined')Gathet[e] = window.getComputedStyle(object[e])[sty];
                    else Gathet = object[e][attr][sty];
                }
                else object[e][attr][sty] = val;
            }
       }
       return Gathet;
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
    function fairly(object, fair, value) {                   /* [判断对象]  ｛ object Array ｝*/
        object = (object.length !== undefined && object) || [object];
        var menu = []
        switch(fair){
            case "eq": for (var e = 0; e < object.length; e++) if (e == value) return object[e];
            case "lt" : for (var e = 0; e < object.length; e++) if (e < value) menu.push(object[e]); return menu;
            case "gt" : for (var e = 0; e < object.length; e++) if (e > value) menu.push(object[e]); return menu;
        }
    }
   