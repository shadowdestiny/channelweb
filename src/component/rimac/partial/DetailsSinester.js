import React, {Component} from 'react';
import validateProduct from "../../../functions/ValidateProduct";
import connect from "react-redux/es/connect/connect";
//--

import Cookies from 'universal-cookie';
const cookies = new Cookies();
class DetailsSinester extends Component {

    render() {
        const {detailsSinester} = this.props;

        const _default = '--';
        let fecha1 = _default;
        let fecha2 = _default;
        let fecha4 = _default;
        let fecha5 = _default;
        let fechaaux1 = _default;
        let fechaaux2 = _default;
        let fechaaux4 = _default;
        let fechaaux5 = _default;
        let detailsPolicy;
        let localdetailsPolicy;
        let sinester;
        if (cookies.get('component_findPolicyCertificate') !== undefined) {
            detailsPolicy = cookies.get('component_findPolicyCertificate').state;

            //const formated = detailsPolicy.fecha.split('-');
            //fecha = formated[2]+"/"+formated[1]+"/"+formated[0];
        }
        if (localStorage.getItem('component_sinester_storage') !== null) {
            sinester = JSON.parse(localStorage.getItem('component_sinester_storage')).state;
            fecha4 = sinester.incidenceDate;
            fechaaux4= fecha4.substring(8, 10)+"/"+fecha4.substring(5, 7)+"/"+fecha4.substring(0, 4);
            fecha5 = sinester.noticeDate;
            fechaaux5= fecha5.substring(8, 10)+"/"+fecha5.substring(5, 7)+"/"+fecha5.substring(0, 4);
        }
        // consultando el local store
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            localdetailsPolicy = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
            fecha1 = localdetailsPolicy.PolizasSelected.inivigencia;
            fechaaux1 = fecha1.substring(0, 10);
            fecha2 = localdetailsPolicy.PolizasSelected.finvigencia;
            fechaaux2 = fecha2.substring(0, 10);
        }

        return (
            <div className='panel panel-default'>
                <div className='panel-heading text-left' style={{color: 'red'}}>Datos del Siniestro</div>
                <br/>
                <div className='row'>
                    <div>
                        <div className="col-sm-6">
                            <table className="data-info">
                                <tbody>
                                <tr>
                                    <td>
                                        Producto:
                                    </td>
                                    <td>
                                        {/*{detailsSinester.product}*/}
                                        { localdetailsPolicy.PolizasSelected.producto }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Certificado:
                                    </td>
                                    <td>
                                        {localdetailsPolicy.CertificadosSelected.descripcion}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Inicio de Vigencia:
                                    </td>
                                    <td>
                                        {/*{detailsSinester.beginningOfValidity}*/}
                                        { fechaaux1 }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Asegurado:
                                    </td>
                                    <td>
                                    { localdetailsPolicy.PolizasSelected.nomaseg }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fecha de ocurrencia:
                                    </td>
                                    <td>
                                        {sinester.incidenceDate == '' ? '--': fechaaux4}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Descripción
                                    </td>
                                    <td>
                                        {sinester.descSinester === undefined ? '--' : sinester.descSinester}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-6">
                            <table className="data-info">
                                <tbody>
                                <tr>
                                    <td>
                                        Póliza:
                                    </td>
                                    <td>
                                        { localdetailsPolicy.PolizasSelected.numpol }
                                    </td>
                                </tr>
                                {validateProduct.isValidProductTCA() ? <tr>
                                    <td>
                                        Aplicación
                                    </td>
                                    <td>
                                        {localdetailsPolicy.CertificadosSelected.aplicacion}
                                        {/*detailsSinester.application*/}
                                    </td>
                                </tr> : ""}
                                <tr>
                                    <td>
                                        Fin vigencia:
                                    </td>
                                    <td>
                                        {fechaaux2}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Corredor:
                                    </td>
                                    <td>
                                        { localdetailsPolicy.PolizasSelected.nomcorr }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fecha de aviso:
                                    </td>
                                    <td>
                                        {sinester.noticeDate == '' ? '--': fechaaux5}
                                    </td>
                                </tr>
                                { true  ? <tr>
                                    <td>
                                        Ubicación:
                                    </td>
                                    <td>
                                        {sinester.DirRiesgo == '' ? sinester.direccionesDeclaradasSelected.departament+', ' +sinester.direccionesDeclaradasSelected.province+', '  +sinester.direccionesDeclaradasSelected.district+', '  +sinester.direccionesDeclaradasSelected.address : sinester.DirRiesgo}
                                    </td>
                                </tr> : ''  }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        detailsSinester: state.detailsSinester,
        detailsPolicyReducer: state.detailsPolicyReducer
    }
}
export default connect(mapStateToProps)(DetailsSinester);