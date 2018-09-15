import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
//--
import * as actions from '../../../action/index';
import store from '../../../store/store';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
class DetailsPolicy extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            register:[]
        }
        store.subscribe(()=>{
            console.log(this.state.register);
        });
    }

    render() {



        const {detailsInspection} = this.props;

        let detailsinspection;
        let auxpuerto='';
        let auxlugar='';
        let auxincoterm='';
        let auxincotemvalue='';

        if (cookies.get('component_inspection') !== undefined) {
            detailsinspection = cookies.get('component_inspection').state;

            if(detailsinspection.puertotrasbordo.length > 0){
                for (var i =0 ; i <= detailsinspection.puertotrasbordo.length; i++) {
                    if(i<detailsinspection.puertotrasbordo.length-1){
                     auxpuerto=auxpuerto+detailsinspection.puertotrasbordo[i].puertot+', ';
                     auxlugar=auxlugar+detailsinspection.puertotrasbordo[i].lugart+', ';
                 }
                    if(i==detailsinspection.puertotrasbordo.length-1){
                     auxpuerto=auxpuerto+detailsinspection.puertotrasbordo[i].puertot+ '.';
                     auxlugar=auxlugar+detailsinspection.puertotrasbordo[i].lugart+'.';
                 }
                };

            }

            if(detailsinspection.IcotermsTable.length > 0){
                for (var i =0 ; i <= detailsinspection.IcotermsTable.length; i++) {
                    if(i<detailsinspection.IcotermsTable.length-1){
                     auxincoterm=auxincoterm+detailsinspection.IcotermsTable[i].incoterms+', ';
                     auxincotemvalue=auxincotemvalue+detailsinspection.IcotermsTable[i].valor+', ';
                 }
                    if(i==detailsinspection.puertotrasbordo.length-1){
                     auxincoterm=auxincoterm+detailsinspection.IcotermsTable[i].incoterms+ '.';
                     auxincotemvalue=auxincotemvalue+detailsinspection.IcotermsTable[i].valor+'.';
                 }
                };

            }
        }

        return (
            <div className='panel panel-default'>

                <div className='panel-heading text-left' style={{color: 'red'}}>Datos de la inspección</div>

                        <div className='row'>

                            <div className="col-sm-6">
                            <table className="data-info">
                                <tbody>
                                <tr>
                                    <td>
                                        Medio de transporte:
                                    </td>
                                    <td>
                                        {detailsinspection.selectValue == '' ? '--' : detailsinspection.selectValue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fecha de inspección:
                                    </td>
                                    <td>
                                        {detailsinspection.fechaInspeccion == '' ? '--' : detailsinspection.fechaInspeccion}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fecha Llegada:
                                    </td>
                                    <td>
                                        {detailsinspection.fechaLlegada == '' ? '--' : detailsinspection.fechaLlegada}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fecha Embarque:
                                    </td>
                                    <td>
                                        {detailsinspection.fechaEmbarque == '' ? '--' : detailsinspection.fechaEmbarque}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Lugar de Embarque:
                                    </td>
                                    <td>
                                        {detailsinspection.lugarEmbarque == '' ? '--' : detailsinspection.lugarEmbarque}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Lugar Descarga:
                                    </td>
                                    <td>
                                        {detailsinspection.lugarDescarga == '' ? '--' : detailsinspection.lugarDescarga}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Transporte Original:
                                    </td>
                                    <td>
                                        {detailsinspection.naveOriginal == '' ? '--' : detailsinspection.naveOriginal}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ¿Hubo Transbordo?:
                                    </td>
                                    <td>
                                        {detailsinspection.isTransbordo === false ? 'No' : 'Si'}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Transporte de Transbordo:
                                    </td>
                                    <td>
                                        {detailsinspection.puertotrasbordo.length == 0 ? '--' : auxpuerto}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Lugar de Transbordo:
                                    </td>
                                    <td>
                                        {detailsinspection.puertotrasbordo.length == 0 ? '--' : auxlugar}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Naturaleza Embarque:
                                    </td>
                                    <td>
                                        {detailsinspection.naturalezaSelect == '' ? '--' : detailsinspection.naturalezaSelect}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Incoterms:
                                    </td>
                                    <td>
                                        {detailsinspection.IcotermsTable.length == 0 ? '--' : auxincoterm}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Incoterms Valor:
                                    </td>
                                    <td>
                                        {detailsinspection.IcotermsTable.length == 0 ? '--' : auxincotemvalue}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Contenido:
                                    </td>
                                    <td>
                                        {detailsinspection.contenido == '' ? '--' : detailsinspection.contenido}
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
                                        Tipo Mercaderia:
                                    </td>
                                    <td>
                                        {detailsinspection.tipoMercancia == '' ? '--' : detailsinspection.tipoMercancia}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Valor Factura:
                                    </td>
                                    <td>
                                        {detailsinspection.VFacturaDataSelect == '' ? '--' : detailsinspection.VFacturaDataSelect}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Naturaleza Daños:
                                    </td>
                                    <td>
                                        {detailsinspection.naturalezaDanio == '' ? '--' :detailsinspection.naturalezaDanio}
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        <div className={detailsinspection.selectValue=="Marítimo" ? 'visible' : 'no-visible'}>
                            <table className="data-info">
                                <tbody>  
                                <tr>
                                    <td>
                                        Nombre de Embarcación:
                                    </td>
                                    <td>
                                        {detailsinspection.nembarcacion == '' ? '--' : detailsinspection.nembarcacion}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Suma Asegurada Embarcación:
                                    </td>
                                    <td>
                                        {detailsinspection.sembarcacion == '' ? '--' : detailsinspection.sembarcacion}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        IFV:
                                    </td>
                                    <td>
                                        {detailsinspection.ifv == '' ? '--' : detailsinspection.ifv}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        P&I:
                                    </td>
                                    <td>
                                        {detailsinspection.pi == '' ? '--' : detailsinspection.pi}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        IMO::
                                    </td>
                                    <td>
                                        {detailsinspection.imo == '' ? '--' : detailsinspection.imo}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>

                            <div className={detailsinspection.selectValue=="Aéreo" ? 'visible' : 'no-visible'}>
                            <table className="data-info">
                                <tbody>
                                <tr>
                                    <td>
                                        Nombre de Aerolínea:
                                    </td>
                                    <td>
                                        {detailsinspection.n_aerolinea == '' ? '--' : detailsinspection.n_aerolinea}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Matrícula Aeronave:
                                    </td>
                                    <td>
                                        {detailsinspection.m_aeronave == '' ? '--' : detailsinspection.m_aeronave}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Número de Vuelo:
                                    </td>
                                    <td>
                                        {detailsinspection.n_vuelo == '' ? '--' : detailsinspection.n_vuelo}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                            <div className={detailsinspection.selectValue=="Terrestre" ? 'visible' : 'no-visible'}>
                            <table className="data-info">
                                <tbody>
                                <tr>
                                    <td>
                                       Nombre Empresa de transporte:
                                    </td>
                                    <td>
                                        {detailsinspection.nombreEmpresa == '' ? '--' : detailsinspection.nombreEmpresa}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Nombre Chofer:
                                    </td>
                                    <td>
                                        {detailsinspection.nombreChofer == '' ? '--' : detailsinspection.nombreChofer}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Placa:
                                    </td>
                                    <td>
                                        {detailsinspection.placa == '' ? '--' : detailsinspection.placa}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>

                            </div>
                        </div>
            </div>

        );
    }
}
const mapStateToProps = state =>{
    return {
        detailsInspection: state.detailsInspection,
        detailsEvent: state.detailsEvent
    }
}
export default connect(mapStateToProps,actions)(DetailsPolicy);