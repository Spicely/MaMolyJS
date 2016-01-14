/*---------------------------------------------------------------
                create time 2016-01-09 10:10 PM
 ---------------------------------------------------------------*/
'use strict';
var privateMember = Symbol("privateMember");
class LyAudio {
    constructor(option) {
        var Lythis = this , jsonObject;
        this[privateMember] = {
            "options": {
                "autoPlay"   : false,
                "audioLoop"  : false,
                "ObjectView": null,
                "control": {
                    "objectId"      : null,
                    "playId"        : null,
                    "pauseId"       : null,
                    "nextId"        : null,
                    "prevId"        : null,
                    "playTimeId"    : null,
                    "playDurtionId" : null,
                    "playProgressId": null,
                    "fileInfo"      : [],
                },
            },
            "object"         : null,
            "playBuffObject" : null,
            "playTimeObject" : null,
            "Number"         : 0,
            "AudioDurtion"   : 0,
            "AudioPlayTime"  : 0,
            "ViewValue"      : 0,
            "ProgressWidth"  : 0,
            "firstMessage"   : function(){alert('已经是最后一首了')},
            "lastMessage"    : function(){alert('已经是第一首了')},
            "errorMessage"   : "没有加载文件",
            jsonForValue: function (json , option) {
                for (var e in option) {
                    if (option[e] !== null && typeof option[e] == "object" && !option[e] instanceof Array) {
                        this.jsonForValue(json[e], option[e]);
                    } else if (option[e] !== null && option[e] instanceof Array) {
                        for (var i = 0 ; i < option[e].length; e++) {
                            if (typeof option[e][i] == "object" && !option[e][i] instanceof Array) json[e][i] == option[e][i];
                            else this.jsonForValue(json[e][i], option[e][i]);
                        }
                    }
                    else json[e] = option[e];
                }
            },
            init: function () {                                                   /* [初始化对象] */
                jsonObject = jsonObject.control;
                if (jsonObject.objectId == null && this.options.ObjectView == 'audio') {
                    this.object = document.createElement(this.options.ObjectView);
                    document.body.appendChild(this.object);
                }else if(this.options.objectId != null ){
                    this.object = document.getElementById(jsonObject.objectId);
                } else if (jsonObject.objectId == null && this.options.ObjectView == null) {
                    this.object = new Audio();
                }
                this.commitEvent();
            },
            commitEvent: function () {                                            /* [事件委托] */
                var EventObject = this.options.control;
                if (EventObject.playId !== null) document.getElementById(EventObject.playId).onclick = function () { Lythis.play() };
                if (EventObject.nextId !== null) document.getElementById(EventObject.nextId).onclick = function () { Lythis.next() };
                if (EventObject.prevId !== null) document.getElementById(EventObject.prevId).onclick = function () { Lythis.prev() };
                if (EventObject.pauseId !== null) document.getElementById(EventObject.pauseId).onclick = function () { Lythis.pause() };
                if (EventObject.playProgressId !== null) {
                    var playPro = document.getElementById(EventObject.playProgressId);
                    playPro.style.position = 'relative';
                    playPro.style.cursor = 'pointer';
                    this.ProgressWidth = playPro.offsetWidth;
                    var playProHeight = window.getComputedStyle(playPro).height;
                    this.playBuffObject = document.createElement('div');   // [创建缓存Progress]
                    this.playBuffObject.style.backgroundColor = 'rgba(41,36,36,0.5)';
                    this.playBuffObject.style.position = 'absolute';
                    this.playBuffObject.style.height = playProHeight;
                    playPro.appendChild(this.playBuffObject);
                    this.playTimeObject = document.createElement('div');   // [创建播放进度Progress]
                    this.playTimeObject.style.backgroundColor = '#bf0b0b';
                    this.playTimeObject.style.position = 'absolute';
                    this.playTimeObject.style.height = playProHeight;
                    playPro.appendChild(this.playTimeObject);
                }
            },
            AudioDuration: function () {                                          /* [进度条显示] ｛只能进行委托 故私有方法｝ */
                var jsonThis = this;
                var object = document.getElementById(jsonObject.playDurtionId);
                this.object.oncanplay = function () {
                    var Total = jsonThis.object.duration.toFixed(0), Minute = Math.floor(Total / 60), Sec = Math.floor(Total % 60);
                    Sec = Sec.toString().length < 2 ? '0' + Sec : Sec;
                    jsonThis.AudioDurtion = Minute + ":" + Sec;
                    if (jsonObject.playDurtionId !== null) {
                        object.innerHTML = Lythis[privateMember].AudioDurtion;
                    }
                    jsonThis.TimeUpdate();
                }
            },
            TimeUpdate: function () {                                             /* [数据更新显示] */
                var jsonThis = this;
                var PlayTime = document.getElementById(jsonObject.playTimeId);
                this.object.ontimeupdate = function () {
                    var time = jsonThis.object.currentTime.toFixed(0),
                        playTime = time == 0 ? jsonThis.AudioPlayTime == 0 ? time : jsonThis.object.currentTime = jsonThis.AudioPlayTime : time,
                        Minute = Math.floor(playTime / 60), Sec = Math.floor(playTime % 60);
                    jsonThis.AudioPlayTime = playTime;
                    Sec = Sec.toString().length < 2 ? '0' + Sec : Sec;
                    if (jsonThis.options.playTimeId !== null) {
                        PlayTime.innerHTML = Minute + ":" + Sec;
                        jsonThis.playTimeObject.style.width = playTime / jsonThis.object.duration.toFixed(0) * 100 + '%';
                    }
                    jsonThis.object.ended && Lythis.next();
                   jsonThis.Progress();
                }
            },
            Progress: function () {
                var TimePro = this.object.buffered, TimeProPlan = TimePro.end(TimePro.length - 1).toFixed(0), TimeProView = TimeProPlan / this.object.duration;
                this.ViewValue >= TimeProPlan ? this.ViewValue = TimeProPlan : this.ViewValue += TimeProView;
                this.playBuffObject.style.width = this.ViewValue / TimeProPlan * 100 + '%';
            }
        }
        jsonObject = this[privateMember].options;
        this[privateMember].jsonForValue(jsonObject, option);
        this[privateMember].init();
        this[privateMember].options.autoPlay && this.play();
    }
    next() {                                                                     /* [下一首歌曲] */
        this[privateMember].ViewValue = 0;
        this[privateMember].AudioPlayTime = 0;
        this[privateMember].Number += 1;
        if (this[privateMember].Number > this[privateMember].options.control.fileInfo.length - 1) {
            this[privateMember].firstMessage();
            this.pause();
            this[privateMember].Number -= 1;
        }
        else this.play() 
    }
    prev() {                                                                     /* [上一首歌曲] */
        this[privateMember].ViewValue = 0;
        this[privateMember].AudioPlayTime = 0;
        this[privateMember].Number -= 1;
        if (this[privateMember].Number + 1 === 0) {
            this[privateMember].lastMessage();
            this[privateMember].Number = 0;
            this.pause();
        }
        else this.play();
    }
    pause() {                                                                    /*    [暂停]    */
        this[privateMember].object.pause();
    }
    play() {                                                                     /*    [播放]    */
        this.AudioFileUrl();
        this[privateMember].object.play();
        this[privateMember].AudioDuration();
    }
    AudioFileUrl() {                                                            /*   [文件加载]  */
        var Url = this[privateMember].options.control.fileInfo;
        if (Url instanceof Array) {
            this[privateMember].object.src = Url[this[privateMember].Number].audioUrl;
            } else {
            this[privateMember].object.src = Url.audioUrl;
            }
    }
    AudioViewAll(viewString) {
        var viewN = 0, viewObject, privteJson = this[privateMember].options.control.fileInfo, repArray, viewStr, classObject, viewObj , Lythis = this;
        var jsonOption = {
            "viewTable": null,
            "viewNumber": "all",
            "viewParentId":document.getElementsByTagName("body")[0],
        }
        this[privateMember].jsonForValue(jsonOption, viewString);
        viewN = jsonOption.viewNumber == "all" ? privteJson.length : jsonOption.viewNumber;
        repArray = jsonOption.viewTable.match(/{([\s\S]*?)}/g);
        classObject = jsonOption.viewTable.match(/<[\s\S]*? +class="([\s\S]*?)">/)[1];
        viewObject = typeof jsonOption.viewParentId == "object" ? jsonOption.viewParentId : document.getElementById(jsonOption.viewParentId);
        for (var e = 0 ; e < viewN; e++) {
            viewStr = jsonOption.viewTable;
            for (var i = 0 ; i < repArray.length; i++) {
                viewStr = viewStr.replace(repArray[i], privteJson[e][repArray[i].substr(1, repArray[0].length - 2)]);
            }
            viewObject.innerHTML += viewStr;
        }
        viewObj = document.getElementsByClassName(classObject);             // [因单线程 故重新绑定事件]
        for (var e = 0; e < viewN; e++) {
            viewObj[e].index = e;
            viewObj[e].ondblclick = function () {
                Lythis.pause();
                Lythis[privateMember].ViewValue = 0;
                Lythis[privateMember].AudioPlayTime = 0;
                Lythis[privateMember].Number = this.index;
                Lythis.play();
            }
        }
    }
}