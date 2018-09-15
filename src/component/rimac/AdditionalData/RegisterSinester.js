import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {Link} from 'react-router-dom';
//--
import DetailsInspection from "../partial/DetailsInspection";
import icon_success from '../../../image/success.png'
import DetailsSinester from "../partial/DetailsSinester";
import Cookies from 'universal-cookie';
import sessionState from "../../../functions/sessionState";
const cookies = new Cookies();
class AdditionalData extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            detailsB:[
                {
                    id:0,
                    contact: 'Asegurado',
                    fullName: 'José Rodriguez Soto',
                    email:'jrodriguez@mail.com',
                    phone:'998672365'
                },
                {
                    id:1,
                    contact: 'Preventor',
                    fullName: 'Maria Peña Rojas',
                    email:'mpenar@mail.com',
                    phone:'94841230'
                },
            ],
        };
    }

    componentWillMount() {
        sessionState.redirectLogin(this.props);
        this.onRefresh();
    }

    onRefresh() {
    }

    selectRowProp = {
        /*mode: 'radio',
        onSelect: this.handleClick.bind(this)*/
    };

    render() {
        let detailsB = [];

        let detailsPolicy;
        let component_findPolicy;
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
                component_findPolicy = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
            }
        if (cookies.get('component_findPolicyCertificate') !== undefined) {
            detailsPolicy = cookies.get('component_findPolicyCertificate').state;
        }
        let sinester;

        if (localStorage.getItem('component_sinester_storage') !== null) {
            sinester = JSON.parse(localStorage.getItem('component_sinester_storage')).state;
        }

        let aditionalData;
        if (cookies.get('component_aditionals_details') !== undefined) {
            aditionalData = cookies.get('component_aditionals_details').state;
        }
        let coverage;
        if (localStorage.getItem('component_coverage') !== null) {
            coverage = JSON.parse(localStorage.getItem('component_coverage')).state;
        }

        // agregando listas del asegurado seleccionado con anterioridad
        if (aditionalData.viewNotificationContact !== undefined){
            console.log(aditionalData.viewNotificationContact.length);
            for(let i = 0 ; i<= aditionalData.viewNotificationContact.length; i++){
                let aditional = aditionalData.viewNotificationContact[i];
                if (aditional !== undefined)
                    if (aditional.type_string === 'Asegurado'){
                        let detail = {
                            id:aditional.id,
                            contact: aditional.type_string,
                            fullName: aditional.contact,
                            email:aditional.email,
                            phone:aditional.phone
                        }

                        detailsB.push(detail);
                    }
            }
        }

        return (
            <div className='col-sm-12'>
                <div className='text-center' style={{color: 'red'}}>
                    <h2>Registrar siniestro</h2>
                </div>

                <div className="row">
                    <div className="" >
                        <div className="col-sm-12 ">
                            <div className="bg-success rimac">
                            <table className="table-success">
                                <tbody>
                                    <tr>
                                        <td className="size">
                                            <div className="">
                                                <img className="success_icon" src={icon_success} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="">
                                                Usted ha registrado exitosamente un nuevo siniestro para la póliza {component_findPolicy !== null ? component_findPolicy.PolizasSelected.numpol + ' (' + component_findPolicy.PolizasSelected.producto + ').' : '--'}
                                                 Número de siniestro: { aditionalData !== null ? aditionalData.numsim : '--' }
                                                <br/>
                                                En breves momentos recibirá un correo con el número del siniestro y los siguienets pasos para su atención.
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>

                <DetailsSinester/>

                <div className={sinester.businessTransport == '' && sinester.nombreChofer == '' ? "no-visible" : "visible"}>
                <div className="row">
                    <div className="col-sm-6">Empresa de transporte: {sinester.businessTransport == '' ? '--' : sinester.businessTransport}</div>
                    <div className="col-sm-6">Nombre del chofer: {sinester.nombreChofer == '' ? '--' : sinester.nombreChofer}</div>
                </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className='panel panel-default'>
                            <div className='panel-heading text-left' style={{color: 'red'}}>Datos de contacto para notificaciones</div>
                            <BootstrapTable className='table table-responsive' data={coverage.datos}
                                            selectRow={this.selectRowProp} >
                                <TableHeaderColumn dataField='Ramo' isKey={true} width='20%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Ramo</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='Cobertura'  width='20%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Cobertura</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='Causa'  width='20%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Causa</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='Consecuencia' width='20%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Consecuencia</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='Monto' width='20%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Monto Aproximado</TableHeaderColumn>
                            </BootstrapTable>

                            <BootstrapTable className='table table-responsive' data={detailsB}
                                            selectRow={this.selectRowProp}  >
                                <TableHeaderColumn dataField='contact' isKey={true} width='25%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Contacto</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='fullName'  width='25%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Nombre Completo</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='email'  width='25%'
                                                   headerAlign='center'
                                                   dataAlign='left'>E-mail</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='phone' width='25%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Teléfono</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>

                {component_findPolicy.PolizasSelected.id == 3001 || component_findPolicy.PolizasSelected.id == 3002 ? <DetailsInspection/> : null}


                <div className="row">
                    <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                        <br/>
                        <div className='col-sm-4 text-right' style={{"text-align":"center"}}>
                        </div>
                        <div className='col-sm-4 text-right' style={{"text-align":"center"}}>
                            <Link to="/">
                                <button id='back' className='col-sm-3 form-control btn btn-danger'>Cerrar</button>
                            </Link>
                        </div>
                        <div className='col-sm-4 text-right' style={{"text-align":"center"}}>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
export default AdditionalData;