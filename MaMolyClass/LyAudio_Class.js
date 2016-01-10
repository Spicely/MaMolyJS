/*---------------------------------------------------------------
                create time 2016-01-09 10:10 PM
 ---------------------------------------------------------------*/
'use strict';
var privateMember = Symbol("privateMember");
class LyAudio {
    constructor(option) {
        var Lythis = this;
        this[privateMember] = {
            "options": {
                "objectId"   : '',
                "autoPlay"   : false,
                "audioLoop"  : false,
                "ObjectView" : null,
                "playId"     : null,
                "nextId"     : null,
                "prevId"     : null,
                "playTime"   : null,
                "playDurtion": null,
                "playProgress":null,
            },
            "object"         : null,
            "AudioUrl"       : null,
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
            init: function () {                                                   /* [初始化对象] */
                if (this.options.objectId == '' && this.options.ObjectView == 'audio') {
                    this.object = document.createElement(this.options.ObjectView);
                    document.body.appendChild(this.object);
                }else if(this.options.objectId != ''){
                    this.object = document.getElementById(this.options.objectId);
                }else if(this.options.objectId == '' && this.options.ObjectView == null){
                    this.object =  new Audio();
                }
                this.commitEvent();
            },
            commitEvent: function () {                                            /* [事件委托] */
                if (this.options.playId !== null) document.getElementById(this.options.playId).onclick = function () { Lythis.play() };
                if (this.options.nextId !== null) document.getElementById(this.options.nextId).onclick = function () { Lythis.next() };
                if (this.options.prevId !== null) document.getElementById(this.options.prevId).onclick = function () { Lythis.prev() };
                if (this.options.playProgress !== null) {
                    var playPro = document.getElementById(this.options.playProgress);
                    playPro.style.position = 'relative';
                    playPro.style.cursor = 'pointer';
                    this.ProgressWidth = playPro.offsetWidth;
                    var playProHeight = playPro.offsetHeight;
                    this.playBuffObject = document.createElement('div');   // [创建缓存Progress]
                    this.playBuffObject.style.backgroundColor = 'rgba(41,36,36,0.5)';
                    this.playBuffObject.style.position = 'absolute';
                    this.playBuffObject.style.height = playProHeight + 'px';
                    playPro.appendChild(this.playBuffObject);
                    this.playTimeObject = document.createElement('div');   // [创建播放进度Progress]
                    this.playTimeObject.style.backgroundColor = '#bf0b0b';
                    this.playTimeObject.style.position = 'absolute';
                    this.playTimeObject.style.height = playProHeight + 'px';
                    playPro.appendChild(this.playTimeObject);
                }
            },
            AudioDuration: function () {                                          /* [进度条显示] ｛只能进行委托 故私有方法｝ */
                var jsonThis = this;
                this.object.oncanplay = function () {
                    var Total = jsonThis.object.duration.toFixed(0), Minute = Math.floor(Total / 60), Sec = Math.floor(Total % 60);
                    Sec = Sec.toString().length < 2 ? '0' + Sec : Sec;
                    Lythis[privateMember].AudioDurtion = Minute + ":" + Sec;
                    if (Lythis[privateMember].options.playDurtion !== null) {
                        document.getElementById(Lythis[privateMember].options.playDurtion).innerHTML = Lythis[privateMember].AudioDurtion;
                    }
                    jsonThis.TimeUpdate();
                }
            },
            TimeUpdate: function () {                                             /* [数据更新显示] */
                var jsonThis = this;
                var viewV = 0 , PlayTime = document.getElementById(jsonThis.options.playTime);
                this.object.ontimeupdate = function () {
                    var time = jsonThis.object.currentTime.toFixed(0), Minute = Math.floor(time / 60), Sec = Math.floor(time % 60);
                    Sec = Sec.toString().length < 2 ? '0' + Sec : Sec;
                    if (Lythis[privateMember].options.playTime !== null) {
                        PlayTime.innerHTML = Minute + ":" + Sec;
                        viewV += jsonThis.ProgressWidth / jsonThis.object.duration.toFixed(0);
                        jsonThis.playTimeObject.style.width = viewV + 'px';
                    }
                    jsonThis.object.ended && Lythis.next();
                    jsonThis.Progress();
                }
            },
            Progress: function () {
                var TimePro = this.object.buffered, TimeProPlan = TimePro.end(TimePro.length - 1), TimeProView = TimeProPlan / this.object.duration;
                this.ViewValue += TimeProView;
                this.playBuffObject.style.width = this.ViewValue + 'px';
            }
        }
        for (var e in option) this[privateMember].options[e] = option[e];
        this[privateMember].init();
        this.play();
    }
    next() {                                                                     /* [下一首歌曲] */
        this[privateMember].ViewValue = 0;
        this[privateMember].Number += 1;
        if (this[privateMember].Number > this[privateMember].AudioUrl.length - 1) {
            this[privateMember].firstMessage();
            this.pause();
            this[privateMember].Number -= 1;
        }
        else this.play() 
    }
    prev() {                                                                     /* [上一首歌曲] */
        this[privateMember].ViewValue = 0;
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
        this.AudioFileUrl(this[privateMember].AudioUrl);
        this[privateMember].object.play();
        this[privateMember].AudioDuration();
    }
    AudioFileUrl(url) {                                                          /*   [文件加载]  */
        if (!url) {
            new Error(this[privateMember].errorMessage);
        } else {
            this[privateMember].AudioUrl = url;
            if (url instanceof Array) {
                this[privateMember].object.src = url[this[privateMember].Number];
            } else {
                this[privateMember].object.src = url;
            }
        }
        this[privateMember].options.autoPlay && this[privateMember].object.play();
    }
}