/*----------------------------------------------------------
            create time 2015-12-27 04:34 pm
-----------------------------------------------------------*/
MaMoly = {
    import: function (filename) {
        var model, path, obj = new this.ByElement('Tag:head'), ext, save;
        if (!isArray(filename)) {
            model = filename.split(":"), ext = MaMoly.model.ExtTag[getExt(filename)];
            path = model.length < 2 ? filename : MaMoly.model.Path + MaMoly.model.extend[model[0]] + model[1];
            save = ext.attr;
            save[ext.pathTag] = path;
            obj.CreateElement(ext.Tag, { attr: save });
        } else {
            for (var e = 0; e < filename.length; e++) {
                model = filename[e].split(":"), ext = MaMoly.model.ExtTag[getExt(filename[e])];
                path = model.length < 2 ? filename[e] : MaMoly.model.Path + MaMoly.model.extend[model[0]] + model[1];
                save = ext.attr;
                save[ext.pathTag] = path;
                obj.CreateElement(ext.Tag, { attr: save});
            }
        }
    },
    typeOf: function (value) {
        var o = Object.prototype.toString.call(value).split(" ")[1],
            m = o.substr(0, o.length - 1);
        if (m.substr(0, 4) == 'HTML') {
            return MaMoly.model.objectStyle["Object"][2];
        }else if (MaMoly.model.setObjectStyle(m) == MaMoly.model.objectStyle["Object"]) {
            if (undefined !== value.nodeType) {
                if (3 == val.nodeType) {
                    return (/\S/).test(value.nodeValue) ? MaMoly.model.objectStyle["Object"][0] : MaMoly.model.objectStyle["Object"][1];
                } else {
                    return MaMoly.model.objectStyle["Object"][2];
                }
            } else {
                return MaMoly.model.objectStyle["Object"][3];
            }
        } else {
            return MaMoly.model.setObjectStyle(m);
        }
    },
    ByElement : function (obj) {
        this.obj = isString(obj) ? this.init(obj) : obj;
    }
}
MaMoly.ByElement.prototype = {
    init: function (obj) {
        var a = obj.split(":");
        this.obj = document[MaMoly.model.M[a[0]]](a[1]);
        return this.obj;
    },
    on: function (value,callBack) {
        MaMoly.view.Incident(this.obj, value, callBack);
    },
    css:function(){
        setValGet(this.obj, css);
    },
    CreateElement: function (ele, css) {
        this.Node = document.createElement(ele);
        setValGet(this.Node, css);
        MaMoly.view.addChild(this.obj[0], this.Node);
    },
}