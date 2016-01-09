/*----------------------------------------------------------
            create time 2015-12-27 04:34 pm
-----------------------------------------------------------*/
var MaMoly = {
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
    M: function (obj) {
        return new byElement(obj);
    }
}