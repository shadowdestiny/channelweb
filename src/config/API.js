const API = {
    services : {
        listarProducto:"http://172.25.33.235:9082/APISinProductoTST/rest/listarProducto",
        obtenerDireccionRiesgo:"http://172.25.33.235:9082/APISinDireccionRiesgoTST/rest/obtenerDireccionRiesgo",
        busquedaUbicacion:"http://172.25.33.235:9082/APISinBusquedaUbicacionTST/rest/busquedaUbicacion",
        busquedaTerceros:"http://172.25.33.235:9082/APISinTercerosTST/rest/busquedaTerceros",
        APISinObtenerItemsTST:"http://172.25.33.235:9082/APISinObtenerItemsTST/rest/obtenerItems",
        buscarPoliza:"http://172.25.33.235:9082/APISinPolizaTST/rest/buscarPoliza",
        buscarPolizaDetalle: "http://172.25.33.235:9082/APISinPolizaTST/rest/buscarPolizaDetalle",
        listarRamosCoberturas:"http://172.25.33.235:9082/APISinRamosCoberturasTST/rest/listarRamosCoberturas",
        consultarCertificados: "http://172.25.33.235:9082/APISinCertificadoTST/rest/consultarCertificados",
        buscarSiniestro:"http://172.25.33.235:9082/APISinBusquedaSiniestroBPMTST/rest/busquedaSiniestroBPM",
        detalleSiniestro:"http://172.25.33.235:9082/APISinDetalleSiniestroBPMTST/rest/detalleSiniestro",
        endidadesFinancieras:"http://172.25.33.235:9082/APISinListarEntidadFinancieraTST/rest/listarEntidadFinanciera",

        /* Servicios de datapower */
        registrarOrquestadorDatapower:"/crearSiniestroOrquestador",
        consultarAjustadoresDatapower:"/consultarAjustadores",
        APISinObtenerItemsTSTDatapower:"/APISinObtenerItemsTST/rest/obtenerItems",
        busquedaUbicacionDatapower:"/APISinBusquedaUbicacionTST/rest/busquedaUbicacion",
        listarProductoDatapower:"/APISinProductoTST/rest/listarProducto",
        consultarCausaDatapower:"/consultarCausa",
        consultarConsecuenciaDatapower:"/consultarConsecuencia",
        endidadesFinancierasDatapower:"/APISinListarEntidadFinancieraTST/rest/listarEntidadFinanciera",
        buscarpolizaDatapower:"/APISinPolizaTST/rest/buscarPoliza",
        consultarCertificadosDatapower: "/APISinCertificadoTST/rest/consultarCertificados",
        buscarSiniestroDatapower:"/APISinBusquedaSiniestroBPMTST/rest/busquedaSiniestroBPM",
        listarRamosCoberturasDatapower:"/APISinRamosCoberturasTST/rest/listarRamosCoberturas",
        obtenerDireccionRiesgoDatapower:"/APISinDireccionRiesgoTST/rest/obtenerDireccionRiesgo",
        buscarpolizaDetalleDatapower:"/APISinPolizaTST/rest/buscarPolizaDetalle",//Se debe usar para obtener el valor de moneda
        listarArchivosDatapower:"/SinFilenetTST/rest/filenet/obtenerListaArchivos",
        descargarArchivosDatapower:"/SinFilenetTST/rest/filenet/descargarArchivo",
        crearArchivoDatapower:"/SinFilenetTST/rest/filenet/crearArchivo",
        validarUsuarioDatapower:"/APISinLoginTST/rest/obtenerRoles",


        /* Fin servicios de datapower */

        crearArchivo:"http://172.25.33.245:9081/SinFilenetTST/rest/filenet/crearArchivo",
        validarUsuario:"http://172.25.33.235:9082/APISinLoginTST/rest/obtenerRoles",
        consultarCheckList:"http://172.25.33.235:9082/APISinObtenerCheckList/rest/obtenerChecklist",


        // TESTING LOCAL
        // se debe colocar la palabra "Local" al final de cada atributo
        listarProductoLocal:"http://localhost:8080/APISinProductoTST/rest/listarProducto",
        obtenerDireccionRiesgoLocal:"http://localhost:8080/APISinDireccionRiesgoTST/obtenerDireccionRiesgo",
        busquedaUbicacionLocal:"http://localhost:8080/APISinBusquedaUbicacionTST/rest/busquedaUbicacion",
        busquedaTercerosLocal:"http://localhost:8080/APISinTercerosTST/rest/busquedaTerceros",
        APISinObtenerItemsTSTLocal:"http://localhost:8080/APISinObtenerItemsTST/rest/obtenerItems",
        buscarPolizaLocal:"http://localhost:8080/APISinPolizaTST/rest/buscarPoliza",
        buscarPolizaDetalleLocal: "http://192.168.5.44:9080/APISinPolizaTST/buscarPolizaDetalle",
        listarRamosCoberturasLocal:"http://localhost:8080/APISinRamosCoberturasTST/rest/listarRamosCoberturas",
        consultarCertificadosLocal: "http://localhost:8080/APISinCertificadoTST/rest/consultarCertificados",
        buscarSiniestroLocal:"http://localhost:8080/APISinSiniestroTST/buscarSiniestroAx",
        endidadesFinancierasLocal:"http://localhost:8080/APISinListarEndidadFinancieraTST/rest/listarEntidadFinanciera",
        consultarAjustadoresDatapowerLocal:"",
        // TESTING - (se debe cambiar el metodo post por get para que funcionen las pruebas y comentar sus parametros)
        // se debe colocar la palabra Test al final de cada atributo mock

        /*datapower Test*/
        consultarAjustadoresDatapowerTest:"/data/consultarAjustadores.json",
        listarProductoDatapowerTest:"/data/findProduct.json",
        buscarSiniestroDatapowerTest:"/data/findSinester.json",
        listarRamosCoberturasDatapowerTest:"/data/listarRamosCoverturas.json",
        buscarpolizaDatapowerTest:"/data/findPolicy.json",
        consultarCertificadosDatapowerTest : "/data/findCertificate.json",
        obtenerDireccionRiesgoDatapowerTest:"/data/getDirection.json",
        busquedaUbicacionDatapowerTest:"/data/getSearchLocation.json",
        obtenerEntidadesFinancierasDatapowerTest:"/data/getEntityFinancial.json",
        endidadesFinancierasDatapowerTest:"/data/getEntityFinancial.json",
        consultarCausaDatapowerTest:"/data/consultarCausa.json",
        consultarConsecuenciaDatapowerTest:"/data/consultarConsecuencia.json",
        consultarCheckListDatapowerTest:"/data/consultarchecklist.json",
        /*fin datapower Test*/

        buscarSiniestroTest:"/data/findSinester.json",
        listarRamosCoberturasTest:"/data/listarRamosCoverturas.json",
        buscarPolizaTest:"/data/findPolicy.json",
        listarProductoTest:"/data/findProduct.json",
        consultarCertificadosTest : "/data/findCertificate.json",
        obtenerDireccionRiesgoTest:"/data/getDirection.json",
        busquedaUbicacionTest:"/data/getSearchLocation.json",
        obtenerEntidadesFinancierasTest:"/data/getEntityFinancial.json",
        endidadesFinancierasTest:"/data/getEntityFinancial.json",
        consultarCausaTest:"/data/consultarCausa.json",
        consultarConsecuenciaTest:"/data/consultarConsecuencia.json",
        consultarCheckListTest:"/data/consultarchecklist.json",


    },
    test : 'Prod',
    basename : '/canalweb',
    type_rol : {
        broker:{
            name : "broker",
            label : "Broker",
            code : "01660",
            description : "ROL_BROKER_CLRG",
            alias : "B"
        },
        preventor:{
            name : "preventor",
            label : "Preventor",
            code : "01662",
            description : "ROL_PREVENTOR_CLRG",
            alias : "P"
        },
        CT:{
            name : "CT",
            label : "",
            code : "",
            description : "",
            alias : "C"
        },
        ejecutivo:{
            name : "ejecutivo",
            label : "Ejecutivo",
            code : "",
            description : "",
            alias : "E"
        }
    },
    security : {
        url :"https://api-desa.rimac.com.pe:5070/token?grant_type=client_credentials&scope=",
        authBasicToken:"Basic QVBJQ2xhaW1zX09BdXRoQ2xpZW50OkFwMWNsYTFtcw==",
        resource : "https://api-desa.rimac.com.pe:5071"
    }
}
export default API;
