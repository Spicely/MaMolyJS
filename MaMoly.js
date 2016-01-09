/*----------------------------------------------------------
            create time 2015-12-27 02:59 pm
-----------------------------------------------------------*/
"use strict";
var MaMoly = {
    defimgport: function (fileName) {
        this.obj = document.getElementsByTagName("head")[0];
        if (fileName instanceof Array) {
            this.node = [];
            for (var e = 0 ; e < fileName.length ; e++) {
                this.node[e] = document.createElement("script");
                this.node[e].type = "text/javascript";
                this.node[e].src = fileName[e];
                this.obj.appendChild(this.node[e]);
            }
        } else {
            this.node = document.createElement("script");
            this.node.type = "text/javascript";
            this.node.src = fileName;
            this.obj.appendChild(this.node);
        }
    },
}
MaMoly.defimgport(["MaMolyJS/SandyBridge/controller/controller.js", "MaMolyJS/SandyBridge/view/view.js", "MaMolyJS/SandyBridge/model/model.js", "MaMolyJS/function/function.js", "MaMolyJS/MaMolyClass/animate_Class.js"]);