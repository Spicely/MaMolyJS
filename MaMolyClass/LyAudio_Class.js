/*---------------------------------------------------------------
                create time 2016-01-09 10:10 PM
 ---------------------------------------------------------------*/
'use strict';
var privateMember = Symbol("privateMember");
class LyAudio {
    constructor(option, AudioUrl) {
        this[privateMember] = {
            "options": {
                "objectId"   : '',
                "autoPlay"   : false,
                "audioLoop"  : false,
                "ObjectView" : null
            },
            "object"         : null,
            "Number"         : 0,
            "AudioUrl"       : AudioUrl,
            "firstMessage"   : function(){alert('已经是最后一首了')},
            "lastMessage"    : function(){alert('已经是第一首了')},
            init: function () {                                                   /* [初始化对象] */
                if (this.options.objectId == '' && this.options.ObjectView == 'audio') {
                    this.object = document.createElement(this.options.ObjectView);
                    document.body.appendChild(this.object);
                }else if(this.options.objectId != ''){
                    this.object = document.getElementById(this.options.objectId);
                }else if(this.options.objectId == '' && this.options.ObjectView == null){
                    this.object =  new Audio();
                }
            }

        }
        for (var e in option) this[privateMember].options[e] = option[e];
        this[privateMember].init();
        this.AudioFileUrl()
        this[privateMember].options.autoPlay && this.play();
    }
    next() {                                                                     /* [下一首歌曲] */
        if (this[privateMember].Number > this[privateMember].AudioUrl.length - 1) {
            this[privateMember].firstMessage();
            this.pause();
        }
        else { this.AudioFileUrl(); this.play() }
    }
    prev() {                                                                     /* [上一首歌曲] */
        this[privateMember].Number -= 2;
        this[privateMember].Number = this[privateMember].Number < 0 ? 0 : this[privateMember].Number;
        if (this[privateMember].Number === 0) {
            this[privateMember].lastMessage()
        }
        else {
            this.AudioFileUrl();
            this.play();
        }
    }
    pause() {                                                                    /*    [暂停]    */
        this[privateMember].object.pause();
    }
    play() {                                                                     /*    [播放]    */
        this[privateMember].object.play();
    }
    AudioFileUrl(url) {                                                          /*   [文件加载]  */
        if (!url) {
            if (this[privateMember].AudioUrl instanceof Array) {
                this[privateMember].object.src = this[privateMember].AudioUrl[this[privateMember].Number++];
            } else {
                this[privateMember].object.src = this[privateMember].AudioUrl;
            }
        } else {
            this[privateMember].AudioUrl = url;
            if (url instanceof Array) {
                this[privateMember].object.src = url[this[privateMember].Number++];
                this[privateMember].Number = this[privateMember].Number++;
            } else {
                this[privateMember].object.src = url;
            }
        }
    }
}