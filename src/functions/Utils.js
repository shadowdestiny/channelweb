/**
 * Created by lmarin on 31/05/2018.
 */
const Utils = {
    /***
    * @author: lmarin
    * @description: permite convertir un arreglo en un objeto recursivo
    * @date_ 01062018
    * */
    arrayToRecursive : function(name_parent_object,object_array, recursive){
        let _structure = {};
        for (let i in object_array){
            if (i == 0) {
                //_structure = recursive(object_array[i]);
                eval('_structure.'+name_parent_object+'='+(JSON.stringify(recursive(object_array[i]))));
            } else {

                let childrens_objects_string = '';
                for (let y = 0; y < parseInt(i) + 1; y++){ // children.children en la (primera iteracion)
                    childrens_objects_string += '.'+name_parent_object;
                }
                console.log('_structure'+childrens_objects_string+'='+(JSON.stringify(recursive(object_array[i]))));
                eval('_structure'+childrens_objects_string+'='+(JSON.stringify(recursive(object_array[i]))) )
            }
        }
        return eval('_structure.'+name_parent_object);
    },

    arrayToMultiObject : function(name_parent_object,object_array, recursive){
        let json = "";
        for (let i in object_array){
            //_structure = recursive(object_array[i]);
            if (i == 0){
                json = "\""+name_parent_object+"\":"+JSON.stringify(recursive(object_array[i]));
            } else {
                json += "," + "\""+name_parent_object+"\":"+JSON.stringify(recursive(object_array[i]));
            }
        }
        console.log("{"+json+"}");
        return JSON.parse("{"+json+"}");
    },

    reverseObject : function (object){
        var newObject = {};
        var keys = [];
        for (var key in object) {
            keys.push(key);
        }
        for (var i = keys.length - 1; i >= 0; i--) {

            var value = object[keys[i]];
            newObject[keys[i]]= value;
        }

        return newObject;
    }

}
export default Utils;
