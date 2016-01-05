/*----------------------------------------------------------
            create time 2015-12-27 04:34 pm
-----------------------------------------------------------*/
MaMoly.view = {
     "ObjectRes" : function( value ){
         return value;
     },
     Incident: function (obj, Event, callBack) {                   /* [事件绑定]     { Object , Event , callBack } */
         if (isEleArr(obj)) {
             for (var e = 0 ; e < obj.length;) {
                 obj[e++][MaMoly.model.Event[Event]] = callBack;
             }
         } else obj[MaMoly.model.Event[Event]] = callBack;
     },
     addChild: function (object, node) {
         object.appendChild(node);
     }
}