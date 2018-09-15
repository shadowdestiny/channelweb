
import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
//--
import * as actions from '../../../action'
import Cookies from 'universal-cookie';
import validateProduct from "../../../functions/ValidateProduct";
const cookies = new Cookies();

class DetailsPolicy extends Component {

    render() {
        const _default = '--';
        let fecha1 = _default;
        let fecha2 = _default;
        let fechaaux1 = _default;
        let fechaaux2 = _default;
        let detailsPolicy;
        let findpolizaselected;
        let findpolizaselectedStore;
        let localPolicy;


        findpolizaselectedStore = JSON.parse(
            localStorage.getItem("component_findPolicyCertificate")
        ).state;

        if (cookies.get('findpolizas_selected') !== undefined)
            findpolizaselected = (cookies.get('findpolizas_selected'));

        fecha1 = findpolizaselected.inivigencia;
        fechaaux1 = fecha1.substring(0, 10);
        //fechaaux1 = DATETIME.format_to_date(fecha1);
        fecha2 = findpolizaselected.finvigencia;
        //fechaaux2 = DATETIME.format_to_date(fecha2);
        fechaaux2 = fecha2.substring(0, 10);

        console.log(findpolizaselected.CertificadosSelected);

        return (
            <div className='panel panel-default'>
                <div className='panel-heading text-left' style={{color: 'red'}}>Datos de la poliza</div>
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
                                    {findpolizaselected !== null ? findpolizaselected.id +"-"+ findpolizaselected.producto : '--'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Certificado:
                                    </td>
                                    <td>
                                        {findpolizaselected !== null ? findpolizaselected.dsccert : '--'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Inicio de Vigencia:
                                    </td>
                                    <td>
                                        {fechaaux1}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Asegurado:
                                    </td>
                                    <td>
                                        {findpolizaselected !== null ? findpolizaselected.nomaseg : '--'}
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
                                        {findpolizaselected !== null ? findpolizaselected.numpol : '--'}
                                    </td>
                                </tr>
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
                                        {findpolizaselected !== null ? findpolizaselected.nomcorr : '--'}
                                    </td>
                                </tr>
                                {validateProduct.isValidProductTCA() ?  <tr>
                                    <td>
                                        Aplicación:
                                    </td>
                                    <td>
                                        {findpolizaselectedStore !== null ? findpolizaselectedStore.CertificadosSelected.aplicacion : '---'}
                                    </td>
                                </tr> : ""}

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
        detailsPolicyReducer: state.detailsPolicyReducer
    }
}

export default connect(mapStateToProps, actions)(DetailsPolicy);