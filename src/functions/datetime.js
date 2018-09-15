const DATETIME = {

    /* DD/MM/YYYY */
    format_to_date : function(_string /*20000901 12:00:00*/){
        try {
            const anio = _string.substring(0, 4);
            const mes = _string.substring(4, 6);
            const dia = _string.substring(6, 8);
            return dia+"/"+mes+"/"+anio;
        } catch(e) {
            return "--";
        }
    }

}
export default DATETIME;
