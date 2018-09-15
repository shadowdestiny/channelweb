import React, {Component} from 'react';
import Select from 'react-select';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-select/dist/react-select.css';
import {Link} from 'react-router-dom';
import Steps from "../partial/Steps";
import DetailsPolicy from "../partial/DetailsPolicy";
import  { Redirect } from 'react-router-dom';
import axios from 'axios';
import AxiosPlus from "../../../functions/AxiosPlus";
import API from '../../../config/API';
import connect from "react-redux/es/connect/connect";
import ip from "ip";
import moment from "moment";
import validateProduct from "../../../functions/ValidateProduct";

import Cookies from 'universal-cookie';
import sessionState from "../../../functions/sessionState";
const cookies = new Cookies();
let component_findPolicy;
class Inspection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puertos: [
                {
                    label:"puerto 1 ",
                    value:"puerto 1"
                }
            ],
            fireRedirect: false,
            selectValue: '',
            CoberturaSelect: '',
            naturalezaSelect: '',
            VFacturaDataSelect: '',
            visible: false,
            visible2: false,
            nombreTranspTransb: '',
            lugarTransbordo: '',
            nembarcacion:'',
            sembarcacion:'',
            ifv:'',
            pi:'',
            m_aeronave:'',
            placa:'',
            isTransbordo:false,
            fechaLlegada : '',
            fechaEmbarque : '',
            lugarEmbarque:'',
            lugarDescarga:'',
            naveOriginal:'',
            valorFOB:'',
            flete:'',
            CF:'',
            naturaleza:'',
            contenido:'',
            tipoMercancia:'',
            nombreEmpresa:'',
            nombreChofer:'',
            fechaInspeccion:'',
            naturalezaDanio:'',
            causa:'',
            navefinal: [],
            puertotrasbordo: [],
            nombrenavefinal: '',
            puertot: '',
            VFacturaData: [],
            //naturalezaData: [],
            medios: [],
            Icoterms: '',
            IcotermsValue: '',
            IcotermsData: [],
            IcotermsTable: [],
            polizadetalle: [],
            imo: '',
            n_vuelo: '',
            n_aerolinea: '',
        }
    }

        componentWillMount() {
            sessionState.redirectLogin(this.props);
            this.getDataMoneda();
            this.getDataNaturaleza();
            this.getDataMedios();
            this.getDataIcoterms();
            //this.getDataPolizaDetalle();

            if (cookies.get('component_inspection') !== undefined)
                this.setState(cookies.get('component_inspection').state);
            if (localStorage.getItem("component_findPolicyCertificate") !== null){
                component_findPolicy = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
            }
        }


        addData(){
        cookies.set('component_inspection', {state:this.state});
        const state = this.state;
        localStorage.setItem(
            "component_inspection",
        JSON.stringify({ state })
        );
        }

    getDataMoneda() {
    AxiosPlus.ajax(
      "API.services.APISinObtenerItemsTSTDatapower",
      {
              codentidad:"CLM_RRGG_VALOR_FACTURA",
              tipocanal:"CNL",
              idusuario:"canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("D/MM/Y"),
          horaTrans: moment().format("H:mi:ss")
        }
      },
      response => {
        //console.log(response.data)
                  this.setState({
                    VFacturaData: response.data
                    });
      }
    );
  }

    getDataIcoterms() {
    AxiosPlus.ajax(
      "API.services.APISinObtenerItemsTSTDatapower",
      {
              codentidad:"CLM_RRGG_INCOTERM",
              tipocanal:"CNL",
              idusuario:"canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("D/MM/Y"),
          horaTrans: moment().format("H:mi:ss")
        }
      },
      response => {
        //console.log(response.data)
                  this.setState({
                    IcotermsData: response.data
                    });
      }
    );
  }

   getDataNaturaleza() {
    AxiosPlus.ajax(
      "API.services.APISinObtenerItemsTSTDatapower",
      {
              codentidad:"CLM_RRGG_NATURALEZA_EMBARQUE",
              tipocanal:"CNL",
              idusuario:"canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("D/MM/Y"),
          horaTrans: moment().format("H:mi:ss")
        }
      },
      response => {
        //console.log(response.data)
                  this.setState({
                    naturalezaData: response.data
                    });
      }
    );
  }

     getDataMedios() {
    AxiosPlus.ajax(
      "API.services.APISinObtenerItemsTSTDatapower",
      {
              codentidad:"CLM_RRGG_TIPO_TRANSPORTE",
              tipocanal:"CNL",
              idusuario:"canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("D/MM/Y"),
          horaTrans: moment().format("H:mi:ss")
        }
      },
      response => {
        //console.log(response.data)
                  this.setState({
                    medios: response.data
                    });
      }
    );
  }

        handleClickAgregar(event) {
        this.AddNave(event);
        }

        handleClickAgregar2(event) {
        this.AddPuerto(event);
        }

        handleClickAgregar3(event) {
        this.AddIncotermsTable(event);
        }

        AddNave(e) {
        e.preventDefault();
        let datosaux = this.state.navefinal;
        let info = {
            navef: this.state.nombrenavefinal,
        };
            datosaux.push(info);
            this.setState({
                navefinal: datosaux,
            });
        
        }

        AddPuerto(e) {
        e.preventDefault();
        let datosaux = this.state.puertotrasbordo;
        let info = {
            puertot: this.state.nombreTranspTransb,
            lugart:  this.state.lugarTransbordo,
        };
            datosaux.push(info);
            this.setState({
                puertotrasbordo: datosaux,
            });
        
        }

        AddIncotermsTable(e) {
        e.preventDefault();
        let datosaux = this.state.IcotermsTable;
        let info = {
            incoterms: this.state.Icoterms,
            valor:  this.state.IcotermsValue,
        };
            datosaux.push(info);
            this.setState({
                IcotermsTable: datosaux,
            });
        
        }

         saveChanges(data) {
            this.setState({
            selectValue: data
             })
         }

         saveChangesIcoterms(data) {
            this.setState({
            Icoterms: data
             })
         }

         
            changePuerto(data) {
                this.setState({
                    puertot: data
                })
            }

            handleChangeisTransbordo(event) {
            this.setState({isTransbordo: !this.state.isTransbordo});
            }

        saveChangesCoberturaSelect(data) {
            this.setState({
            CoberturaSelect: data
             })
         }

        saveChangesnaturalezaSelect(data) {
            this.setState({
            naturalezaSelect: data
             })
         }


        saveChangesVFacturaDataSelect(data) {
            this.setState({
            VFacturaDataSelect: data
             })
         }

        doSomething(e){
        e.preventDefault();
        if(this.state.isTransbordo==true && this.state.puertotrasbordo.length==0){
            alert("Debe ingresar los valores para Puertos de Transbordo");
        }else{
            if((this.state.naturalezaSelect=='Importación' || this.state.naturalezaSelect=='Exportación') && this.state.IcotermsTable.length==0){
            alert("Debe ingresar los valores para Incoterms");
            }else{
        this.props.history.push(API.basename+'/Sinester');
    }
    }
        //this.setState({ fireRedirect: true })
    }

        doSomething2(e){
        e.preventDefault();
        if(this.state.isTransbordo==true){
            if((this.state.navefinal.length ==0 ) || (this.state.puertotrasbordo.length == 0)){
            alert("Debe ingresar el valor de la Nave Final y Puerto de Transbordo");
        }else{
        this.props.history.push(API.basename+'/Sinester');
        }
        }else{
        this.props.history.push(API.basename+'/Sinester');
    }
    }

    onChange = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        //alert(this.state.fechadesde);
    }

    render() {
        console.log(this.state.puertotrasbordo);
        this.addData();

        //let findpolizaselected;

        //if (cookies.get('findpolizas_selected') !== undefined)
        //findpolizaselected = (cookies.get('findpolizas_selected'));

        //const product = findpolizaselected.id;
        //const showInspection = product === "3001" || product === "3002";

//--- ACA SE CARGA LA DATA PROVENIENTE DEL SERVICIO

        const VFacturaData = [];
        const naturalezaData = [];
        const medios = [];
        const IcotermsData = [];

//Ojo se coloca por los momentos de esta forma sin embargo esta data es retornada del servicio
       /* function addMedios() {
            medios.push({
                label: 'Aéreo',
                value: 'Aéreo'
            });
            medios.push({
                label: 'Marítimo',
                value: 'Marítimo'
            });
            medios.push({
                label: 'Terrestre',
                value: 'Terrestre'
            });

        }

        addMedios();*/

        var mon = this.state.VFacturaData;
        var nat = this.state.naturalezaData;
        var med = this.state.medios;
        var ico = this.state.IcotermsData;
        //var poldet = this.state.polizadetalle.listRamos.listCoberturas;

        for (var key in mon) {
            VFacturaData.push({
                value: mon[key].coditem ,
                label: mon[key].dscitem
            });
        }

        for (var key in nat) {
            naturalezaData.push({
                value: nat[key].dscitem ,
                label: nat[key].dscitem
            });
        }

        for (var key in med) {
            medios.push({
                value: med[key].dscitem ,
                label: med[key].dscitem
            });
        }

        for (var key in ico) {
            IcotermsData.push({
                value: ico[key].coditem ,
                label: ico[key].coditem
            });
        }

        function customDelete(next, dropRowKeys) {
        const dropRowKeysStr = dropRowKeys.join(',');
        next();
        }

        const { fireRedirect } = this.state

        let detailspolicy;
        let localdetailspolicy;

        if (cookies.get('component_findPolicyCertificate') !== undefined) {
            detailspolicy = cookies.get('component_findPolicyCertificate').state;
        }

        // consultando el local store
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            localdetailspolicy = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
        }

        const selectRowPropC = {
            mode: 'checkbox'
        };

       /* const options = [
            {label: "Aéreo", value: "Aéreo", className: 'custom-class'},
            {label: "Marítimo", value: "Marítimo", className: 'custom-class'},
            {label: "Terrestre", value: "Terrestre", className: 'custom-class'}
        ];*/

        /*const naturalezaData = [
            {label: "Importación", value: "Importación", className: 'custom-class'},
            {label: "Exportación", value: "Exportación", className: 'custom-class'}
        ];*/

        /*const VFacturaData = [
            {label: "Soles", value: 1, className: 'custom-class'},
            {label: "Dólares", value: 2, className: 'custom-class'}
        ];*/

        const CoberturaData = [
            {label: "Casco", value: 1, className: 'custom-class'},
            {label: "Casco Guerra", value: 2, className: 'custom-class'},
            {label: "Responsabilidades", value: 3, className: 'custom-class'},
            {label: "Accidentes Personales", value: 4, className: 'custom-class'},
            {label: "Deducible", value: 5, className: 'custom-class'}
        ];

        const CoberturaData2=[];

       /* for (var key in poldet) {
            CoberturaData2.push({
                value: poldet[key].dsccobert ,
                label: poldet[key].dsccobert
            });
        }*/


        const options2 = {
        insertText: 'Agregar',
        deleteText: 'Eliminar',
        noDataText: 'No se ha registrado ningun valor...',
        handleConfirmDeleteRow: (next, dropRowKeys) => {
            const dropRowKeysStr = dropRowKeys.join(',');
            let datos = this.state.IcotermsTable;
            let new_datos=[];

            // se elimina la lista seleccionada
            for (let i in datos){
                for (let y = 0; y < dropRowKeys.length; y ++){
                    if (dropRowKeys[y] === datos[i].incoterms){
                        break;
                    } else if(y + 1 === dropRowKeys.length){
                        new_datos.push(datos[i])
                    }
                }
            }
            this.setState({IcotermsTable:new_datos});
            next();
        },

    }

        const options3 = {
        insertText: 'Agregar',
        deleteText: 'Eliminar',
        noDataText: 'No se ha registrado ningun valor...',
        handleConfirmDeleteRow: (next, dropRowKeys) => {
            const dropRowKeysStr = dropRowKeys.join(',');
            let datos = this.state.puertotrasbordo;
            let new_datos=[];

            // se elimina la lista seleccionada
            for (let i in datos){
                for (let y = 0; y < dropRowKeys.length; y ++){
                    if (dropRowKeys[y] === datos[i].puertot){
                        break;
                    } else if(y + 1 === dropRowKeys.length){
                        new_datos.push(datos[i])
                    }
                }
            }
            this.setState({puertotrasbordo:new_datos});
            next();
        },

    }

        const required = true;

        console.log(this.state.puertotrasbordo.length);

        return (

            <div className='col-sm-12'>

                <div className='text-center' style={{color: 'red'}}>
                    <h2>Registrar Siniestro</h2>
                </div>

                <Steps stepNumber="2" />


                {validateProduct.isVisibleDetailsPolicy() ?  <DetailsPolicy/> : ""}

                 <div className='panel panel-default'>
                    <div className='panel-heading text-left' style={{color: 'red'}}>Datos de la Inspección</div>
                    <br/>

                    <form name="myform" onSubmit={this.doSomething.bind(this)}>

                     <div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='medio_transporte'>Medio de Transporte:</label>
                                    <Select name="MedioTransporte"
                                            ref='MTransporteSelect'
                                            autoFocus
                                            simpleValue
                                            options={medios}
                                            value={this.state.selectValue}
                                            onChange={this.saveChanges.bind(this)}
                                            required = {required}
                                            placeholder='Seleccione un Medio de Transporte'/>
                                </div>
                            </div>
                            <br/>
                        </div> 

                        {/*<div className={(this.state.selectValue=="") ? 'visible' : 'no-visible'}>
                            <div className='row'>
                                <br/>
                                <div className='col-sm-6 text-right'>
                                    <Link to="/registrarSiniestro">
                                        <button id='back' className='form-control fa fa-backward'> Seleccionar Póliza</button>
                                    </Link>
                                </div>
                                <div className='col-sm-6 text-right'>
                                    <button type="submit" id='next' className='form-control'>Datos del Siniestro <i className='fa fa-forward'></i>
                                    </button>
                                </div>
                            </div>
                        </div>*/}
                        <br/>
                    </form>




                {/*Medio de transporte diferentes - Datos genéricos*/}
                    <div className={(this.state.selectValue!="Cascos Marítimos" && this.state.selectValue!="Terrestre" && this.state.selectValue!="Aviación") ? 'visible' : 'no-visible'}>

                        <form name="myform5" onSubmit={this.doSomething.bind(this)}>

                        <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-4 text-left'>
                                   <label htmlFor='fecha_llegada' className='control-label'>Fecha Inspección:</label>
                                    <input
                                        name="fechaInspeccion"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaInspeccion}
                                        type="date" className="form-control" required = {required && sessionState.isPeventor()}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='fecha_llegada' className='control-label'>Fecha Llegada:</label>
                                    <input
                                        name="fechaLlegada"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaLlegada}
                                        type="date" className="form-control" required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='fecha_embarque' className='control-label'>Fecha Embarque:</label>
                                    <input
                                        name="fechaEmbarque"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaEmbarque}
                                        type="date" className="form-control" required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_embarque' className='control-label'>Lugar de Embarque</label>
                                    <input
                                        name="lugarEmbarque"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarEmbarque}
                                        className='form-control' type='text' id='lugar_embarque' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_descarga' className='control-label'>Lugar de Descarga</label>
                                    <input
                                        name="lugarDescarga"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarDescarga}
                                        className='form-control' type='text' id='lugar_descarga' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Transporte Original:</label>
                                    <input
                                        name="naveOriginal"
                                        onChange={this.onChange}
                                        defaultValue={this.state.naveOriginal}
                                        className='form-control' type='text' id='naveo' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-3 text-left'>
                                    <input type='checkbox' name="isTransbordo"
                                           defaultChecked={this.state.isTransbordo}
                                           onChange={this.handleChangeisTransbordo.bind(this)}
                                    /> ¿Hubo Transbordo?
                                </div>
                            </div>

                            <br/>

                            <div className={(this.state.isTransbordo==true) ? 'visible' : 'no-visible'}>
                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nombreTranspTransb' className='control-label'>Nombre del Transporte de Transbordo</label>
                                    <input
                                        name="nombreTranspTransb"
                                        onChange={this.onChange}
                                        defaultValue={this.state.nombreTranspTransb}
                                        className='form-control' type='text' id='nombreTranspTransb' />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugarTransbordo' className='control-label'>Lugar de Transbordo</label>
                                    <input
                                        name="lugarTransbordo"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarTransbordo}
                                        className='form-control' type='text' id='lugarTransbordo' />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-6 text-left'>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar2.bind(this)}> Agregar</button>
                            </div>
                            </div>



                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options3 } striped={true} data={this.state.puertotrasbordo}>
                                        <TableHeaderColumn dataField='puertot' isKey={true} width='50%' headerAlign='center' dataAlign='left'>Transporte de Transbordo</TableHeaderColumn>
                                        <TableHeaderColumn dataField='lugart' width='50%' headerAlign='center' dataAlign='left'>Lugar de Transbordo</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div>

                            </div>


                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='naturalezaE'>Naturaleza del Embarque:</label>
                                    <Select options={naturalezaData}
                                            name="naturalezaSelect"
                                            ref='naturalezaSelect'
                                            autoFocus
                                            simpleValue
                                            value={this.state.naturalezaSelect}
                                            onChange={this.saveChangesnaturalezaSelect.bind(this)}
                                            placeholder='Seleccione Naturaleza del Embarque'
                                            required = {sessionState.isPeventor()}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className={(this.state.naturalezaSelect=='Importación' || this.state.naturalezaSelect=='Exportación') ? 'visible' : 'no-visible'}>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='medio_transporte'>Incoterms:</label>
                                    <Select name="Icoterms"
                                            ref='Icoterms'
                                            autoFocus
                                            simpleValue
                                            options={IcotermsData}
                                            value={this.state.Icoterms}
                                            onChange={this.saveChangesIcoterms.bind(this)}
                                            placeholder='Seleccione Icoterms'
                                            />
                                </div>            

                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='IcotermsValue' className='control-label'>Valor:</label>
                                    <input
                                        name="IcotermsValue"
                                        onChange={this.onChange}
                                        defaultValue={this.state.IcotermsValue}
                                        className='form-control' type='number' id='IcotermsValue'/>
                                </div>
                            </div> 

                            <br/>
                            

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-6 text-left'>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar3.bind(this)}> Agregar</button>
                            </div>
                            </div>



                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options2 } striped={true} data={this.state.IcotermsTable}>
                                    <TableHeaderColumn isKey={true} dataSort={ true } dataField='incoterms' headerAlign='center' dataAlign='center'>Incoterms</TableHeaderColumn>
                                    <TableHeaderColumn dataSort={ true } dataField='valor' headerAlign='center' dataAlign='center'>Incoterms Valor</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div> 

                            <br/>

                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='contenido' className='control-label'>Contenido:</label>
                                    <textarea
                                        name="contenido"
                                        onChange={this.onChange}
                                        defaultValue={this.state.contenido}
                                        className='form-control' rows="3" cols="100" id='contenido' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Tipo de Mercancia:</label>
                                    <input
                                        name="tipoMercancia"
                                        onChange={this.onChange}
                                        defaultValue={this.state.tipoMercancia}
                                        className='form-control' type='text' id='tmercaderia'/>
                                </div>
                            </div>
                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='valorF'>Valor Factura:</label>
                                    <Select options={VFacturaData}
                                            name="VFacturaDataSelect"
                                            ref='VFacturaDataSelect'
                                            autoFocus
                                            simpleValue
                                            value={this.state.VFacturaDataSelect}
                                            onChange={this.saveChangesVFacturaDataSelect.bind(this)}
                                            placeholder='Seleccione el Valor Factura'
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Naturaleza de Daños y/o Pérdidas:</label>
                                    <input
                                        name="naturalezaDanio"
                                        onChange={this.onChange}
                                        defaultValue={this.state.naturalezaDanio}
                                        className='form-control' type='text' id='NaturalezaDP' required={sessionState.isPeventor()}/>
                                </div>
                            </div>
                            <br/>
                            
                            <div className='row'>
                                <br/>
                                <div className='col-sm-6 text-right'>
                                    <Link to="/registrarSiniestro">
                                        <button id='back' className='form-control fa fa-backward'> Seleccionar Póliza</button>
                                    </Link>
                                </div>
                                <div className='col-sm-6 text-right'>
                                    <button type="submit" id='next' className='form-control'>Datos del Siniestro <i className='fa fa-forward'></i>
                                    </button>
                                </div>
                            </div>
                            <br/>

                        </form>
                        {fireRedirect && (
                            <Redirect to={API.basename+'/Sinester'}/>
                        )}

                    </div>
                {/*///////////////////////////////////////////////////7*/}









                    <div className={(this.state.selectValue=="Terrestre") ? 'visible' : 'no-visible'}>

                        <form name="myform2" onSubmit={this.doSomething.bind(this)}>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-4 text-left'>
                                   <label htmlFor='fecha_llegada' className='control-label'>Fecha Inspección:</label>
                                    <input
                                        name="fechaInspeccion"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaInspeccion}
                                        type="date" className="form-control" required = {required && sessionState.isPeventor()}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='fecha_llegada' className='control-label'>Fecha Llegada:</label>
                                    <input
                                        name="fechaLlegada"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaLlegada}
                                        type="date" className="form-control" required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='fecha_embarque' className='control-label'>Fecha Embarque:</label>
                                    <input
                                        name="fechaEmbarque"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaEmbarque}
                                        type="date" className="form-control" required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_embarque' className='control-label'>Lugar de Embarque</label>
                                    <input
                                        name="lugarEmbarque"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarEmbarque}
                                        className='form-control' type='text' id='lugar_embarque' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_descarga' className='control-label'>Lugar de Descarga</label>
                                    <input
                                        name="lugarDescarga"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarDescarga}
                                        className='form-control' type='text' id='lugar_descarga' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Transporte Original:</label>
                                    <input
                                        name="naveOriginal"
                                        onChange={this.onChange}
                                        defaultValue={this.state.naveOriginal}
                                        className='form-control' type='text' id='naveo' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-3 text-left'>
                                    <input type='checkbox' name="isTransbordo"
                                           defaultChecked={this.state.isTransbordo}
                                           onChange={this.handleChangeisTransbordo.bind(this)}
                                    /> ¿Hubo Transbordo?
                                </div>
                            </div>

                            <br/>

                            <div className={(this.state.isTransbordo==true) ? 'visible' : 'no-visible'}>
                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nombreTranspTransb' className='control-label'>Nombre del Transporte de Transbordo</label>
                                    <input
                                        name="nombreTranspTransb"
                                        onChange={this.onChange}
                                        defaultValue={this.state.nombreTranspTransb}
                                        className='form-control' type='text' id='nombreTranspTransb' />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugarTransbordo' className='control-label'>Lugar de Transbordo</label>
                                    <input
                                        name="lugarTransbordo"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarTransbordo}
                                        className='form-control' type='text' id='lugarTransbordo' />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-6 text-left'>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar2.bind(this)}> Agregar</button>
                            </div>
                            </div>



                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options3 } striped={true} data={this.state.puertotrasbordo}>
                                        <TableHeaderColumn dataField='puertot' isKey={true} width='50%' headerAlign='center' dataAlign='left'>Transporte de Transbordo</TableHeaderColumn>
                                        <TableHeaderColumn dataField='lugart' width='50%' headerAlign='center' dataAlign='left'>Lugar de Transbordo</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div>

                            </div>


                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='naturalezaE'>Naturaleza del Embarque:</label>
                                    <Select options={naturalezaData}
                                            name="naturalezaSelect"
                                            ref='naturalezaSelect'
                                            autoFocus
                                            simpleValue
                                            value={this.state.naturalezaSelect}
                                            onChange={this.saveChangesnaturalezaSelect.bind(this)}
                                            placeholder='Seleccione Naturaleza del Embarque'
                                            required = {sessionState.isPeventor()}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className={(this.state.naturalezaSelect=='Importación' || this.state.naturalezaSelect=='Exportación') ? 'visible' : 'no-visible'}>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='medio_transporte'>Incoterms:</label>
                                    <Select name="Icoterms"
                                            ref='Icoterms'
                                            autoFocus
                                            simpleValue
                                            options={IcotermsData}
                                            value={this.state.Icoterms}
                                            onChange={this.saveChangesIcoterms.bind(this)}
                                            placeholder='Seleccione Icoterms'
                                            />
                                </div>            

                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='IcotermsValue' className='control-label'>Valor:</label>
                                    <input
                                        name="IcotermsValue"
                                        onChange={this.onChange}
                                        defaultValue={this.state.IcotermsValue}
                                        className='form-control' type='number' id='IcotermsValue' />
                                </div>
                            </div> 

                            <br/>
                            

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-6 text-left'>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar3.bind(this)}> Agregar</button>
                            </div>
                            </div>



                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options2 } striped={true} data={this.state.IcotermsTable}>
                                    <TableHeaderColumn isKey={true} dataSort={ true } dataField='incoterms' headerAlign='center' dataAlign='center'>Incoterms</TableHeaderColumn>
                                    <TableHeaderColumn dataSort={ true } dataField='valor' headerAlign='center' dataAlign='center'>Incoterms Valor</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div> 

                            <br/>

                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='contenido' className='control-label'>Contenido:</label>
                                    <textarea
                                        name="contenido"
                                        onChange={this.onChange}
                                        defaultValue={this.state.contenido}
                                        className='form-control' rows="3" cols="100" id='contenido' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Tipo de Mercancia:</label>
                                    <input
                                        name="tipoMercancia"
                                        onChange={this.onChange}
                                        defaultValue={this.state.tipoMercancia}
                                        className='form-control' type='text' id='tmercaderia'/>
                                </div>
                            </div>
                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='valorF'>Valor Factura:</label>
                                    <Select options={VFacturaData}
                                            name="VFacturaDataSelect"
                                            ref='VFacturaDataSelect'
                                            autoFocus
                                            simpleValue
                                            value={this.state.VFacturaDataSelect}
                                            onChange={this.saveChangesVFacturaDataSelect.bind(this)}
                                            placeholder='Seleccione el Valor Factura'
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Nombre de la Empresa de Transporte Terrestre:</label>
                                    <input
                                        name="nombreEmpresa"
                                        onChange={this.onChange}
                                        defaultValue={this.state.nombreEmpresa}
                                        className='form-control' type='text' id='Nempresa'/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Nombre del Chofer:</label>
                                    <input
                                        name="nombreChofer"
                                        onChange={this.onChange}
                                        defaultValue={this.state.nombreChofer}
                                        className='form-control' type='text' id='Nchofer'/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Placa:</label>
                                    <input className='form-control' type='text' id='placa' name="placa"
                                           defaultValue={this.state.placa}
                                           onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Naturaleza de Daños y/o Pérdidas:</label>
                                    <input
                                        name="naturalezaDanio"
                                        onChange={this.onChange}
                                        defaultValue={this.state.naturalezaDanio}
                                        className='form-control' type='text' id='NaturalezaDP' required={sessionState.isPeventor()}/>
                                </div>
                            </div>
                            <br/>

                            {/*<div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_descarga' className='control-label'>Nombre de la Nave Final:</label>
                                    <input
                                        name="nombrenavefinal"
                                        onChange={this.onChange}
                                        defaultValue={this.state.nombrenavefinal}
                                        className='form-control' type='text' id='nombrenavefinal'/>
                                    <br/>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar.bind(this)}> Agregar</button>
                                </div>
                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' }  deleteRow={ true } selectRow={ selectRowPropC } options={ options2 } striped={true} data={this.state.navefinal}>
                                        <TableHeaderColumn dataField='navef' isKey={true} width='70%' headerAlign='center' dataAlign='left'></TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div>

                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='puertot' className='control-label'>Puerto de Transbordo (Lugar/Aeropuerto):</label>
                                    <Select options={this.state.puertos}
                                            name="puertot"
                                            ref='naturalezaSelect'
                                            simpleValue
                                            value={this.state.puertot}
                                            onChange={this.changePuerto.bind(this)}
                                    />
                                    <input
                                        name="puertot"
                                        onChange={this.onChange}
                                        defaultValue={this.state.puertot}
                                        className='form-control' type='text' id='puertot'/>
                                    <br/>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar2.bind(this)}> Agregar</button>
                                </div>
                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options3 } striped={true} data={this.state.puertotrasbordo}>
                                        <TableHeaderColumn dataField='puertot' isKey={true} width='70%' headerAlign='center' dataAlign='left'></TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div>

                            <br/>*/}


                            {/*<div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Causa:</label>
                                    <input
                                        name="causa"
                                        onChange={this.onChange}
                                        defaultValue={this.state.causa}
                                        className='form-control' type='text' id='causa'/>
                                </div>
                            </div>
                            <br/>*/}

                            <div className='row'>
                                <br/>
                                <div className='col-sm-6 text-right'>
                                    <Link to="/registrarSiniestro">
                                        <button id='back' className='form-control fa fa-backward'> Seleccionar Póliza</button>
                                    </Link>
                                </div>
                                <div className='col-sm-6 text-right'>
                                    <button type="submit" id='next' className='form-control'>Datos del Siniestro <i className='fa fa-forward'></i>
                                    </button>
                                </div>
                            </div>
                            <br/>

                        </form>
                        {fireRedirect && (
                            <Redirect to={API.basename+'/Sinester'}/>
                        )}
                    </div>

                    <div className={(this.state.selectValue=="Cascos Marítimos") ? 'visible' : 'no-visible'}>

                        <form name="myform3" onSubmit={this.doSomething.bind(this)}>

                        <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-4 text-left'>
                                   <label htmlFor='fecha_llegada' className='control-label'>Fecha Inspección:</label>
                                    <input
                                        name="fechaInspeccion"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaInspeccion}
                                        type="date" className="form-control" required = {required && sessionState.isPeventor()}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='fecha_llegada' className='control-label'>Fecha Llegada:</label>
                                    <input
                                        name="fechaLlegada"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaLlegada}
                                        type="date" className="form-control" required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='fecha_embarque' className='control-label'>Fecha Embarque:</label>
                                    <input
                                        name="fechaEmbarque"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaEmbarque}
                                        type="date" className="form-control" required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_embarque' className='control-label'>Lugar de Embarque</label>
                                    <input
                                        name="lugarEmbarque"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarEmbarque}
                                        className='form-control' type='text' id='lugar_embarque' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_descarga' className='control-label'>Lugar de Descarga</label>
                                    <input
                                        name="lugarDescarga"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarDescarga}
                                        className='form-control' type='text' id='lugar_descarga' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Transporte Original:</label>
                                    <input
                                        name="naveOriginal"
                                        onChange={this.onChange}
                                        defaultValue={this.state.naveOriginal}
                                        className='form-control' type='text' id='naveo' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-3 text-left'>
                                    <input type='checkbox' name="isTransbordo"
                                           defaultChecked={this.state.isTransbordo}
                                           onChange={this.handleChangeisTransbordo.bind(this)}
                                    /> ¿Hubo Transbordo?
                                </div>
                            </div>

                            <br/>

                            <div className={(this.state.isTransbordo==true) ? 'visible' : 'no-visible'}>
                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nombreTranspTransb' className='control-label'>Nombre del Transporte de Transbordo</label>
                                    <input
                                        name="nombreTranspTransb"
                                        onChange={this.onChange}
                                        defaultValue={this.state.nombreTranspTransb}
                                        className='form-control' type='text' id='nombreTranspTransb' />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugarTransbordo' className='control-label'>Lugar de Transbordo</label>
                                    <input
                                        name="lugarTransbordo"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarTransbordo}
                                        className='form-control' type='text' id='lugarTransbordo' />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-6 text-left'>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar2.bind(this)}> Agregar</button>
                            </div>
                            </div>



                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options3 } striped={true} data={this.state.puertotrasbordo}>
                                        <TableHeaderColumn dataField='puertot' isKey={true} width='50%' headerAlign='center' dataAlign='left'>Transporte de Transbordo</TableHeaderColumn>
                                        <TableHeaderColumn dataField='lugart' width='50%' headerAlign='center' dataAlign='left'>Lugar de Transbordo</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div>

                            </div>


                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='naturalezaE'>Naturaleza del Embarque:</label>
                                    <Select options={naturalezaData}
                                            name="naturalezaSelect"
                                            ref='naturalezaSelect'
                                            autoFocus
                                            simpleValue
                                            value={this.state.naturalezaSelect}
                                            onChange={this.saveChangesnaturalezaSelect.bind(this)}
                                            placeholder='Seleccione Naturaleza del Embarque'
                                            required = {sessionState.isPeventor()}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className={(this.state.naturalezaSelect=='Importación' || this.state.naturalezaSelect=='Exportación') ? 'visible' : 'no-visible'}>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='medio_transporte'>Incoterms:</label>
                                    <Select name="Icoterms"
                                            ref='Icoterms'
                                            autoFocus
                                            simpleValue
                                            options={IcotermsData}
                                            value={this.state.Icoterms}
                                            onChange={this.saveChangesIcoterms.bind(this)}
                                            placeholder='Seleccione Icoterms'
                                            />
                                </div>            

                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='IcotermsValue' className='control-label'>Valor:</label>
                                    <input
                                        name="IcotermsValue"
                                        onChange={this.onChange}
                                        defaultValue={this.state.IcotermsValue}
                                        className='form-control' type='number' id='IcotermsValue' />
                                </div>
                            </div> 

                            <br/>
                            

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-6 text-left'>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar3.bind(this)}> Agregar</button>
                            </div>
                            </div>



                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options2 } striped={true} data={this.state.IcotermsTable}>
                                    <TableHeaderColumn isKey={true} dataSort={ true } dataField='incoterms' headerAlign='center' dataAlign='center'>Incoterms</TableHeaderColumn>
                                    <TableHeaderColumn dataSort={ true } dataField='valor' headerAlign='center' dataAlign='center'>Incoterms Valor</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div> 

                            <br/>

                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='contenido' className='control-label'>Contenido:</label>
                                    <textarea
                                        name="contenido"
                                        onChange={this.onChange}
                                        defaultValue={this.state.contenido}
                                        className='form-control' rows="3" cols="100" id='contenido' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Tipo de Mercancia:</label>
                                    <input
                                        name="tipoMercancia"
                                        onChange={this.onChange}
                                        defaultValue={this.state.tipoMercancia}
                                        className='form-control' type='text' id='tmercaderia'/>
                                </div>
                            </div>
                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='valorF'>Valor Factura:</label>
                                    <Select options={VFacturaData}
                                            name="VFacturaDataSelect"
                                            ref='VFacturaDataSelect'
                                            autoFocus
                                            simpleValue
                                            value={this.state.VFacturaDataSelect}
                                            onChange={this.saveChangesVFacturaDataSelect.bind(this)}
                                            placeholder='Seleccione el Valor Factura'
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Naturaleza de Daños y/o Pérdidas:</label>
                                    <input
                                        name="naturalezaDanio"
                                        onChange={this.onChange}
                                        defaultValue={this.state.naturalezaDanio}
                                        className='form-control' type='text' id='NaturalezaDP' required={sessionState.isPeventor()}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Nombre Embarcación:</label>
                                    <input onChange={this.onChange} className='form-control' type='text' id='Nembarcacion' name="nembarcacion"
                                           defaultValue={this.state.nembarcacion}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Suma Asegurada de la Embarcación:</label>
                                    <input onChange={this.onChange} className='form-control' type='text' id='SAembarcacion' name="sembarcacion"
                                           defaultValue={this.state.sembarcacion}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>IFV:</label>
                                    <input onChange={this.onChange} className='form-control' type='text' id='ifv' name="ifv"
                                           defaultValue={this.state.ifv}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>P&I:</label>
                                    <input onChange={this.onChange} className='form-control' type='text' id='p&i' name="pi"
                                           defaultValue={this.state.pi}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>IMO:</label>
                                    <input onChange={this.onChange} className='form-control' type='text' id='imo' name="imo"
                                           defaultValue={this.state.imo}
                                    />
                                </div>
                            </div>
                            <br/>

                            
                            <div className='row'>
                                <br/>
                                <div className='col-sm-6 text-right'>
                                    <Link to="/registrarSiniestro">
                                        <button id='back' className='form-control fa fa-backward'> Seleccionar Póliza</button>
                                    </Link>
                                </div>
                                <div className='col-sm-6 text-right'>
                                    <button type="submit" id='next' className='form-control'>Datos del Siniestro <i className='fa fa-forward'></i>
                                    </button>
                                </div>
                            </div>
                            <br/>

                        </form>
                        {fireRedirect && (
                            <Redirect to={API.basename+'/Sinester'}/>
                        )}

                    </div>

                    <div className={(this.state.selectValue=="Aviación") ? 'visible' : 'no-visible'}>


                        <form name="myform4" onSubmit={this.doSomething.bind(this)}>


                        <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-4 text-left'>
                                   <label htmlFor='fecha_llegada' className='control-label'>Fecha Inspección:</label>
                                    <input
                                        name="fechaInspeccion"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaInspeccion}
                                        type="date" className="form-control" required = {required && sessionState.isPeventor()}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='fecha_llegada' className='control-label'>Fecha Llegada:</label>
                                    <input
                                        name="fechaLlegada"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaLlegada}
                                        type="date" className="form-control" required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='fecha_embarque' className='control-label'>Fecha Embarque:</label>
                                    <input
                                        name="fechaEmbarque"
                                        onChange={this.onChange}
                                        defaultValue={this.state.fechaEmbarque}
                                        type="date" className="form-control" required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_embarque' className='control-label'>Lugar de Embarque</label>
                                    <input
                                        name="lugarEmbarque"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarEmbarque}
                                        className='form-control' type='text' id='lugar_embarque' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugar_descarga' className='control-label'>Lugar de Descarga</label>
                                    <input
                                        name="lugarDescarga"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarDescarga}
                                        className='form-control' type='text' id='lugar_descarga' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Transporte Original:</label>
                                    <input
                                        name="naveOriginal"
                                        onChange={this.onChange}
                                        defaultValue={this.state.naveOriginal}
                                        className='form-control' type='text' id='naveo' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-3 text-left'>
                                    <input type='checkbox' name="isTransbordo"
                                           defaultChecked={this.state.isTransbordo}
                                           onChange={this.handleChangeisTransbordo.bind(this)}
                                    /> ¿Hubo Transbordo?
                                </div>
                            </div>

                            <br/>

                            <div className={(this.state.isTransbordo==true) ? 'visible' : 'no-visible'}>
                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nombreTranspTransb' className='control-label'>Nombre del Transporte de Transbordo</label>
                                    <input
                                        name="nombreTranspTransb"
                                        onChange={this.onChange}
                                        defaultValue={this.state.nombreTranspTransb}
                                        className='form-control' type='text' id='nombreTranspTransb' />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='lugarTransbordo' className='control-label'>Lugar de Transbordo</label>
                                    <input
                                        name="lugarTransbordo"
                                        onChange={this.onChange}
                                        defaultValue={this.state.lugarTransbordo}
                                        className='form-control' type='text' id='lugarTransbordo' />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-6 text-left'>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar2.bind(this)}> Agregar</button>
                            </div>
                            </div>



                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options3 } striped={true} data={this.state.puertotrasbordo}>
                                        <TableHeaderColumn dataField='puertot' isKey={true} width='50%' headerAlign='center' dataAlign='left'>Transporte de Transbordo</TableHeaderColumn>
                                        <TableHeaderColumn dataField='lugart' width='50%' headerAlign='center' dataAlign='left'>Lugar de Transbordo</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div>

                            </div>


                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='naturalezaE'>Naturaleza del Embarque:</label>
                                    <Select options={naturalezaData}
                                            name="naturalezaSelect"
                                            ref='naturalezaSelect'
                                            autoFocus
                                            simpleValue
                                            value={this.state.naturalezaSelect}
                                            onChange={this.saveChangesnaturalezaSelect.bind(this)}
                                            placeholder='Seleccione Naturaleza del Embarque'
                                            required = {sessionState.isPeventor()}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className={(this.state.naturalezaSelect=='Importación' || this.state.naturalezaSelect=='Exportación') ? 'visible' : 'no-visible'}>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='medio_transporte'>Incoterms:</label>
                                    <Select name="Icoterms"
                                            ref='Icoterms'
                                            autoFocus
                                            simpleValue
                                            options={IcotermsData}
                                            value={this.state.Icoterms}
                                            onChange={this.saveChangesIcoterms.bind(this)}
                                            placeholder='Seleccione Icoterms'
                                            />
                                </div>            

                                <div className='col-sm-4 text-left'>
                                    <label htmlFor='IcotermsValue' className='control-label'>Valor:</label>
                                    <input
                                        name="IcotermsValue"
                                        onChange={this.onChange}
                                        defaultValue={this.state.IcotermsValue}
                                        className='form-control' type='number' id='IcotermsValue' />
                                </div>
                            </div> 

                            <br/>
                            

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-6 text-left'>
                                    <button id='add' className='form-control' onClick={this.handleClickAgregar3.bind(this)}> Agregar</button>
                            </div>
                            </div>



                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-8'>
                                    <BootstrapTable className='table table-responsive' scrollTop={ 'Bottom' } deleteRow={ true } selectRow={ selectRowPropC } options={ options2 } striped={true} data={this.state.IcotermsTable}>
                                    <TableHeaderColumn isKey={true} dataSort={ true } dataField='incoterms' headerAlign='center' dataAlign='center'>Incoterms</TableHeaderColumn>
                                    <TableHeaderColumn dataSort={ true } dataField='valor' headerAlign='center' dataAlign='center'>Incoterms Valor</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div> 

                            <br/>

                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='contenido' className='control-label'>Contenido:</label>
                                    <textarea
                                        name="contenido"
                                        onChange={this.onChange}
                                        defaultValue={this.state.contenido}
                                        className='form-control' rows="3" cols="100" id='contenido' required = {required}/>
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Tipo de Mercancia:</label>
                                    <input
                                        name="tipoMercancia"
                                        onChange={this.onChange}
                                        defaultValue={this.state.tipoMercancia}
                                        className='form-control' type='text' id='tmercaderia'/>
                                </div>
                            </div>
                            <br/>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='valorF'>Valor Factura:</label>
                                    <Select options={VFacturaData}
                                            name="VFacturaDataSelect"
                                            ref='VFacturaDataSelect'
                                            autoFocus
                                            simpleValue
                                            value={this.state.VFacturaDataSelect}
                                            onChange={this.saveChangesVFacturaDataSelect.bind(this)}
                                            placeholder='Seleccione el Valor Factura'
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Naturaleza de Daños y/o Pérdidas:</label>
                                    <input
                                        name="naturalezaDanio"
                                        onChange={this.onChange}
                                        defaultValue={this.state.naturalezaDanio}
                                        className='form-control' type='text' id='NaturalezaDP' required={sessionState.isPeventor()}/>
                                </div>
                            </div>
                            <br/>

                        <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Nombre de Aerolínea:</label>
                                    <input onChange={this.onChange} className='form-control' type='text' id='n_aerolinea'
                                           name="n_aerolinea"
                                           defaultValue={this.state.n_aerolinea}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Matricula de Aeronave:</label>
                                    <input onChange={this.onChange} className='form-control' type='text' id='Maeronave'
                                           name="m_aeronave"
                                           defaultValue={this.state.m_aeronave}
                                    />
                                </div>
                            </div>
                            <br/>

                            <div className="row" style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='nave' className='control-label'>Número de Vuelo:</label>
                                    <input onChange={this.onChange} className='form-control' type='text' id='n_vuelo'
                                           name="n_vuelo"
                                           defaultValue={this.state.n_vuelo}
                                    />
                                </div>
                            </div>
                            <br/>


                            <div className='row'>
                                <br/>
                                <div className='col-sm-6 text-right'>
                                    <Link to={API.basename+'/registrarSiniestro'}>
                                        <button id='back' className='form-control fa fa-backward'> Seleccionar Póliza</button>
                                    </Link>
                                </div>
                                <div className='col-sm-6 text-right'>
                                    <button type="submit" id='next' className='form-control'>Datos del Siniestro <i className='fa fa-forward'></i>
                                    </button>
                                </div>
                            </div>
                            <br/>

                        </form>
                        {fireRedirect && (
                            <Redirect to={API.basename+'/Sinester'}/>
                        )}

                    </div>
                </div>
            </div>

        );
    }
}

export default Inspection;

