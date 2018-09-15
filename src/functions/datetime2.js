const DATETIME2 = {

    /* DD/MM/YYYY */
    format_to_date : function(_string /*20000901 12:00:00*/){
        try {
            const anio = _string.substring(0, 4);
            const mes = _string.substring(5, 7);
            const dia = _string.substring(8, 10);
            return dia+"/"+mes+"/"+anio;
        } catch(e) {
            return "--";
        }
    }

}
export default DATETIME2;
