const Policy = {
    isAtenderSinPoliza : function(){
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            const findPolicyCertificate = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
            return findPolicyCertificate.atenderSinPoliza === true
        }
        return true;
    },
}
export default Policy;
