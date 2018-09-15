const Product = {

    /*valida si un producto es 3001 o 3002*/
    getValueFromLabel : function(_string_label){
        let value = "";
        if (_string_label !== "" && _string_label !== null) {
            value = _string_label.split[0];
        }
        return value
    },
    isValid : function(_string_producto){
        return _string_producto === "3001" || _string_producto === "3002";
    },
    isValidProductTCA : function(){
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            const findPolicyCertificate = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
            return this.isValid(findPolicyCertificate.PolizasSelected.id);
        }
    },

    isVisibleDetailsPolicy : function(){
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            const findPolicyCertificate = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
            return !findPolicyCertificate.atenderSinPoliza;
        } else {
            return false;
        }

    }

}
export default Product;
