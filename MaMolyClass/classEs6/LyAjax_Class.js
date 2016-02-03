/*---------------------------------------------------------------
                create time 2016-01-14 11:12 PM
 ---------------------------------------------------------------*/
'use strict'

class LyAjax {
    constructor(jsoninit) {
        this.jsonInit = {
            "call": {
                "url"   : null,
                "success":function(){},
                "error" : function () { },
                "asyn"  : true,
                "type"  : "get",
                "timeout": 500,
                "data": null,
                "contentType": "application/x-www-form-urlencoded",
                "sendfn": null //
            },
            "jsonObect" : null,
            init: function () {
                try{
                    this.jsonObect = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    this.jsonObect = new XMLHttpRequest();
                }
            },
            dataValueToHttpRequest: function (data) {
                if (isObj(data)) {
                    var dataString = '';
                    for (var e in data) {
                        if (isArray(data[e])) {
                            for (var i = 0 ; i < data[e].length; i++) {
                                console.log(e, data[e][i]);
                                dataString +=  e + '=' + data[e][i] + '&';
                            }
                        } else {
                             dataString += e + '=' + data[e] + '&';
                        }
                    }
                    return dataString.substring(0,dataString.length-1);
                } else if (isString) {
                    return data;
                }
            },
            header: function (contentType) {
                this.jsonObect.setRequestHeader("Content-type", contentType);
            },
            open: function (method, url, asyn) {
                if (this.call.type == 'get') url += '?' + this.dataValueToHttpRequest(this.call.data);
                this.jsonObect.open(method, url, asyn, null, null);
                if (this.call.type == 'post') this.header(this.call.contentType);
            },
            send: function (callback) {
                if (this.call.type == 'post') this.jsonObect.send(this.dataValueToHttpRequest(this.call.data));
                else this.jsonObect.send(callback);
            }
        }
        var jsonObject = this.jsonInit;
        jsonForValue(jsonObject.call, jsoninit);
        jsonObject.init();
        if (jsonObject.call.url != null) {
            this.LyAjaxRequest(jsonObject.call.success);
            jsonObject.open(jsonObject.call.type, jsonObject.call.url, jsonObject.call.asyn);
            jsonObject.send();
        }
    }
    LyAjaxRequest( callback ) {
        var LyAjaxObject = this.jsonInit;
        LyAjaxObject.jsonObect.onreadystatechange = function () {
            if (LyAjaxObject.jsonObect.readyState == 4) {
                var date = LyAjaxObject.jsonObect.responseText;
                callback(date);
            }
        }
    }
    get(url, data, asyn, callback) {
        url += this.dataValueToHttpRequest(this.call.data);
        this.jsonInit.open("get", url, asyn);
        this.jsonInit.send(callback);
    }
    post(url, data, asyn, contentType) {
        this.jsonInit.open("post", url, asyn);
        !contentType ? this.jsonInit.header(this.jsonInit.call.contentType) : this.jsonInit.header(contentType);
        this.jsonInit.send(this.jsonInit.dataValueToHttpRequest(data));
    }
}
