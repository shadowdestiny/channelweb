import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {Link} from 'react-router-dom';
import Steps from "../partial/Steps";
import DetailsPolicy from "../partial/DetailsPolicy";
import NumberFormat from 'react-number-format';
import API from '../../../config/API';
import ip from "ip";
import moment from "moment";
import axios from 'axios';

import connect from "react-redux/es/connect/connect";
import * as actions from '../../../action/index';


//--
import validateProduct from '../../../functions/ValidateProduct'

import Cookies from 'universal-cookie';
import Modal from 'react-bootstrap-modal';
import AxiosPlus from "../../../functions/AxiosPlus";
import APIs from 'fetch-api';
import $ from 'jquery';
import sessionState from "../../../functions/sessionState";
const cookies = new Cookies();

let findPolicyCertificate = {};
let ramos = [];
let ramosLabel = [];
let localfindPolicyCertificate;
class Coverage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonto:{},
            open:false,
            fireRedirect: false,
            visible: false,
            ramoSelected : '',
            coberturaSelected:'',
            coberturaSelectedItems:{},
            causaSelected:'',
            consecuenciaSelected:'',
            montoAproximado: '',
            montoAproximadoFormated:'',
            datos: [],
            listaCobertura:[],
            listaCausas: [],
            listaConsecuencias: [],
            tokens: [],
            monedaSelected:'USD',
            moneda: '',
            IsVisibleInspection: '0',
        }
    }
    componentWillMount() {
        this.getDataCausas();
        this.getDataConsecuencias();
        sessionState.redirectLogin(this.props);

        if (localStorage.getItem("component_coverage") !== null){
            this.setState(JSON.parse(localStorage.getItem('component_coverage')).state);
        }

        // consultando el local store
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            findPolicyCertificate = localfindPolicyCertificate = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
        }

        if (findPolicyCertificate.PolizasSelected.id == 3001 ||
          findPolicyCertificate.PolizasSelected.id == 3002) {
            //if (localdetailspolicy.prueba == 3001) {
            //console.log('Entre')
            this.setState({IsVisibleInspection: '0'});
        }else{
            this.setState({IsVisibleInspection: '1'});
        }

        this.getData()
        this.getDataPolizaDetalle();//Se hace la llamada para buscar la moneda

    }

    getDataPolizaDetalle() {
    let listaPolizasDetalle = [];
    AxiosPlus.ajax(
      "API.services.buscarpolizaDetalleDatapower",
      {  
      idepol:localfindPolicyCertificate.PolizasSelected.idepol,//"144000",
      numcert:localfindPolicyCertificate.CertificadosSelected.certificado,//"1",
      tipocanal:"CNL",
      idusuario:"canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("Y/MM/DD"),
          horaTrans: moment().format("H:mi:ss")
        } 
    },
      response => {
        listaPolizasDetalle = [];
        if(response.data.code!="10100" && response.data.code!="10004"){
        for (let i in response.data) {
          listaPolizasDetalle.push({
            codmon: response.data[i].codmon,
          });
        }
        this.setState({
          moneda: listaPolizasDetalle[0].codmon
        });
      }else{
        this.setState({
          moneda: ''
        });
      }
    }
    );
  }

    getData(){

        AxiosPlus.ajax('API.services.listarRamosCoberturasDatapower',{
            idepol:localfindPolicyCertificate.PolizasSelected.idepol, //"123681",
            numcert:localfindPolicyCertificate.CertificadosSelected.certificado, //"1" /*"41"*/, //Este campo no es obligatorio
            tipocanal:"CNL",
            idusuario:"canalweb",
            auditoria:
                {
                    ip:ip.address(),
                    usuario:"canalweb",
                    fechaTrans:moment().format('Y/MM/DD'),
                    horaTrans:moment().format('H:mi:ss')
                }
        },(response)=>{
            //console.log(response.data);
            if(response.data.code!="10100" && response.data.code!="10004"){
            for (let i in response.data){

                ramos.push(response.data[i]);

                // buscando si existen ramos repetidos en el arreglo de etiquetas
                let isExiste = false;

                for (let y = 0; y < ramosLabel.length; y++ ){
                    if (ramosLabel[y].label === response.data[i].codramo){
                        isExiste = true;
                        break;
                    }
                }
                if (isExiste === false)
                    if (ramosLabel.length === 1)
                        ramosLabel.push({
                            label: response.data[i].codramo,
                            value: response.data[i].codramo,
                            className: 'custom-class'
                        });
                    else
                        ramosLabel.push({
                            label: response.data[i].codramo,
                            value: response.data[i].codramo
                        });
            }
        }
        });
    }

    getDataCausas(){
        AxiosPlus.ajax('API.services.consultarCausaDatapower',{
            codramo:this.state.ramoSelected.label,//'EQEL',
            tipocanal:"CNL",
            idusuario:"canalweb",
            auditoria:
                {
                    ip:ip.address(),
                    usuario:"canalweb",
                    fechaTrans:moment().format('Y-MM-DD'),
                    horaTrans:moment().format('H:mm:ss')
                }
        },(response)=>{
            //console.log(response.data)
            this.setState({
                listaCausas: response.data.consultarCausaResponse
            });
        });
    }

       getDataConsecuencias(){
        AxiosPlus.ajax('API.services.consultarConsecuenciaDatapower',{
            codramo:this.state.ramoSelected.label,//'EQEL',
            tipocanal:"CNL",
            idusuario:"canalweb",
            auditoria:
                {
                    ip:ip.address(),
                    usuario:"canalweb",
                    fechaTrans:moment().format('Y-MM-DD'),
                    horaTrans:moment().format('H:mm:ss')
                }
        },(response)=>{
            //console.log(response.data)
            this.setState({
                listaConsecuencias: response.data.consultarConsecuenciaResponse
            });
        });
    }

    handleClick(event) {
        this.adddatos();
    }

    changeMoneda(data) {
        this.setState({
            monedaSelected: data
        });
    }
    saveRamo(data) {

        this.setState({
            listaCobertura : []
        });
        let listaCobertura = [];
        // buscando ramos coberturas de ramos
        for (let i in ramos){
            if (ramos[i].codramo === data.label){
                for (let y = 0; y < ramos[i].coberturas.length; y++){
                    listaCobertura.push({
                        label:ramos[i].coberturas[y].dsccobert,
                        value:{
                            valor:ramos[i].coberturas[y].dsccobert,
                            items:ramos[i].coberturas[y]
                        },
                    })
                }
            }
        }

        this.setState({
            listaCobertura : listaCobertura,
            coberturaSelected: [],
            ramoSelected: data
        })
        //Se efectua la llamada a los tokens y a los servicios que lo usaran
        this.getDataCausas();
        this.getDataConsecuencias();
    }

    saveCobertura(data) {
        this.setState({
            coberturaSelected: data,
            coberturaSelectedItems: data.value.items,
        })
    }

    saveCausa(data) {
        this.setState({
            causaSelected: data
        })
    }

    saveConsecuencia(data) {
        this.setState({
            consecuenciaSelected: data
        })
    }
    // cuando termina de cargar el componente se muestra la ventana
    componentDidUpdate(prevProps, prevState) {

    }

    saveAndClose = () => {
        this.setState({
            open: false,
        });
    }

    adddatos() {

        let datosaux = this.state.datos;
        let info = {
            Ramo:this.state.ramoSelected.value,
            Cobertura : this.state.coberturaSelected.value.items.dsccobert,
            Causa : this.state.causaSelected.label,
            Consecuencia:this.state.consecuenciaSelected.label,
            Monto:this.state.montoAproximadoFormated,
            coberturaItems : this.state.coberturaSelected.value.items,
        };

        // buscando datos repetidos
        let isRegister = true;
        for (let i in datosaux){
            if (datosaux[i].Cobertura === this.state.coberturaSelected.value){
                isRegister = false;
                break;
            }
        }

        if (isRegister){
            datosaux.push(info);
            this.setState({
                datos: datosaux,
            });
        } else {
            this.setState({
                open: true,
            });
        }
    }

    addData(){
    const state = this.state;
    localStorage.setItem(
      "component_coverage",
      JSON.stringify({ state })
    );
    }

    doSomething(e){
        this.props.history.push(API.basename+'/AdditionalData');
    }

    handlAamount(event) {
        console.log(event.target.value);
        this.setState({montoAproximado: event.target.value});
    }

    handleClickMountAprox(data){
        this.setState({
            selectedMonto:data
        })
    }

    options5 = {
        insertText: 'Agregar',
        deleteText: 'Eliminar',
        noDataText: 'No se ha registrado ningun valor...',
        handleConfirmDeleteRow: (next, dropRowKeys) => {
            const dropRowKeysStr = dropRowKeys.join(',');
            let datos = this.state.datos;
            let new_datos=[];

            // se elimina la lista seleccionada
            for (let i in datos){
                for (let y = 0; y < dropRowKeys.length; y ++){
                    if (dropRowKeys[y] === datos[i].Ramo){
                        break;
                    } else if(y + 1 === dropRowKeys.length){
                        new_datos.push(datos[i])
                    }
                }
            }
            this.setState({datos:new_datos});
            next();
        },

    }

    customDelete = (next, dropRowKeys) => {

    }

    render() {

        this.addData();
        let state = this.state;

        let moneda = [
            {
                label : "USD",
                value: "USD",
                className: 'custom-class'
            },
            {
                label : "Soles",
                value: "SOLES",
                className: 'custom-class'
            }
        ];

        function deleteElement(){
            return state;
        }
        function onDeleteRow(rows){
            //console.log(deleteElement());
            /*this.setState({
             datos: this.state.datos.remove(rows)
             });*/
        }

// --- SE DEBE MEJORAR, ESTA ASI SOLO PARA EFECTO DE PRUEBA Y DEMOSTRACION
        const selectRowProp = {
            mode: 'radio',
            //onSelect: handleDeleteButtonClick,
            //hideSelectColumn: true,
            //bgColor: 'rgb(238, 193, 213)',
            //hideSelectColumn: true,
        };

    function onAfterDeleteRow(rowKeys) {
      alert('El ramo eliminado es: ' + rowKeys);
    }

    function buttonFormatter(cell, row){
      return '<button type="button" className="btn btn-default btn-sm"><span className="glyphicon glyphicon-remove" style="color:red"></span></button>';
      //return '<input type=radio onClick={this.onAfterDeleteRow.bind(this)}>';
      //return '<Button onClick={() => onAfterDeleteRow(row)}>Eliminar</Button>';
    }

    const selectRowPropC = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: this.handleClickMountAprox.bind(this),
        selected: [this.state.selectedMonto.Ramo],
    };

    /*const options1 = [
    {label: "Robo", value: "Robo", className: 'custom-class'}
    ];
    const options2 = [
    {label: "Dinero en Boveda", value: "Dinero en Boveda", className: 'custom-class'}
    ];*/
    const options3 = []; /*[
    {label: "Robo por Asalto", value: "Robo por Asalto", className: 'custom-class'}
    ];*/

    var cau = this.state.listaCausas;


        for (var key in cau) {
            options3.push({
                value: cau[key].codcausa ,
                label: cau[key].desccausa 
            });
        }


    const options4 = []; /*[
    {label: "Perdida Parcial", value: "Perdida Parcial", className: 'custom-class'}
    ];*/

        var con = this.state.listaConsecuencias;


        for (var key in con) {
            options4.push({
                value: con[key].codconsec,
                label: con[key].dscconsec 
            });
        }


        const mostrarDetalle = validateProduct.isVisibleDetailsPolicy();

        let closeModal = () => this.setState({ open: false });

        return (

            <div className='col-sm-12'>

                <Modal
                    show={this.state.open}
                    onHide={closeModal}
                    aria-labelledby="ModalHeader"
                    className="show">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Mensaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<p>Some Content here</p>*/}
                        <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-12 text-left'>
                                No se pueden agregar Coberturas Repetidas. 
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
                        {/*<button className='btn btn-primary' onClick={this.saveAndClose}>
                            Aceptar
                        </button>*/}
                    </Modal.Footer>
                </Modal>

                <div className='text-center' style={{color: 'red'}}>
                    <h2>Registrar Siniestro</h2>
                </div>

                <Steps title="Seleccionar Cobertura" stepNumber="4" IsVisible={this.state.IsVisibleInspection}/>

                {/* si la poliza no esta selccionada "Atender sin poliza", entonces no se muestra esta seccion*/}
                { mostrarDetalle ? <DetailsPolicy/> : ''}

                 <div className='panel panel-default'>
                    <div className='panel-heading text-left' style={{color: 'red'}}>Seleccionar Cobertura</div>
                    <br/>

                    <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                        <div className='col-sm-6 text-left'>
                            <label htmlFor='ramo'>Ramo:</label>
                        <Select
                            options={ramosLabel}
                            ref='ramoSelected'
                            name='ramoSelected'
                            value={this.state.ramoSelected}
                            onChange={this.saveRamo.bind(this)}
                        />
                        </div>
                        </div>
                    <br/>
                     {true ? <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                             <div className='col-sm-6 text-left'>
                                 <label htmlFor='cobertura'>Cobertura:</label>
                                 <Select options={this.state.listaCobertura}
                                         ref='coberturaSelected'
                                         name='coberturaSelected'
                                         value={this.state.coberturaSelected}
                                         onChange={this.saveCobertura.bind(this)}
                                 />
                             </div>
                         </div> : ''
                     }
                    <br />
                     {true ? <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                         <div className='col-sm-6 text-left'>
                             <label htmlFor='causa'>Causa:</label>
                             <Select options={options3}
                                     ref='causaSelected'
                                     name='causaSelected'
                                     value={this.state.causaSelected}
                                     onChange={this.saveCausa.bind(this)}
                             />
                         </div>
                     </div> : ''}

                    <br/>

                    {true ? <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                         <div className='col-sm-6 text-left'>
                             <label htmlFor='Consecuencia'>Consecuencia:</label>
                             <Select options={options4}
                                     ref='consecuenciaSelected'
                                     name='consecuenciaSelected'
                                     value={this.state.consecuenciaSelected}
                                     onChange={this.saveConsecuencia.bind(this)}
                             />
                         </div>
                     </div> : ''}

                     {true ? <div>
                         <br/>

                         <label htmlFor='simbolo' className='control-label'>Monto Aproximado Reclamado: </label>

                         <div className='row' style={{marginLeft: 10, marginRight: 10}}>

                             <div className='col-sm-2 text-left'>
                                    <input
                                        name="moneda"
                                        value={this.state.moneda}
                                        className='form-control' type='text' id='moneda' disabled/>
                             </div>

                             <div className='col-sm-4 text-left'>
                                 <div className='row'>
                                     <div className='col-sm-10'>
                                         {/*<input onChange={this.handlAamount.bind(this)} defaultValue={this.state.montoAproximado} className='form-control' type='number' id='monto'/>*/}

                                         <NumberFormat value={this.state.montoAproximado} className='form-control' thousandSeparator={true} prefix={'$'} onValueChange={(values)=>{
                                             const {formattedValue, value} = values;
                                             //console.log(formattedValue);
                                             this.setState({
                                                 montoAproximado: value,
                                                 montoAproximadoFormated: formattedValue
                                             })
                                         }}
                                           format={(val)=>{
                                               let s_length = val.length;
                                               let result = val;
                                               switch(s_length) {
                                                   case 1:
                                                       // 1
                                                       result = val.substring(0, 1);
                                                       break;
                                                   case 2:
                                                       // 1.0
                                                       result = val.substring(0, 1)+'.'+val.substring(1, 2);
                                                       break;
                                                   case 3:
                                                       // 1.00
                                                       result = val.substring(0, 1)+'.'+val.substring(1, 3);
                                                       break;
                                                   case 4:
                                                       // 10
                                                       result = val.substring(0, 2)+'.'+val.substring(2, 4);
                                                       break;
                                                   case 5:
                                                        // 100.00
                                                        result = val.substring(0, 3)+'.'+val.substring(3, 5);
                                                        break;
                                                   case 6:
                                                       //1'000,00
                                                        result = val.substring(0, 1)+'\''+val.substring(1, 4)+','+val.substring(4, 6);
                                                        break;
                                                   case 7:
                                                       //10'000.00
                                                       result = val.substring(0, 2)+'\''+val.substring(2, 5)+','+val.substring(5, 7);
                                                       break;
                                                   case 8:
                                                       //100'000.00
                                                       result = val.substring(0, 3)+'\''+val.substring(3, 6)+','+val.substring(6, 9);
                                                       break;
                                                   case 9:
                                                       //1'000'000.00
                                                       result = val.substring(0, 1)+'\''+val.substring(1, 4)+','+val.substring(4, 7)+'.'+val.substring(7, 9);
                                                       break;
                                                   case 10:
                                                       //10'000'000.00
                                                       result = val.substring(0, 2)+'\''+val.substring(2, 5)+','+val.substring(5, 8)+'.'+val.substring(8, 10);
                                                       break;
                                                   case 11:
                                                       //100'000'000.00
                                                       result = val.substring(0, 3)+'\''+val.substring(3, 6)+','+val.substring(6, 9)+'.'+val.substring(9, 11);
                                                       break;
                                                   default:
                                                       //1'000'000'000.00
                                                       result = val.substring(0, 1)+'\''+val.substring(1, 4)+','+val.substring(4, 7)+','+val.substring(7, 10)+'.'+val.substring(10, 12);
                                                       break;
                                               }

                                               return result;
                                           }}
                                         />
                                     </div>
                                     <div className='col-sm-2'>
                                         <span class="glyphicon glyphicon-question-sign" title="Es el monto aproximado que desea recibir por los daños causados producto del siniestro. Debe ingresar el monto sin IGV.”."></span>
                                     </div>
                                 </div>
                             </div>

                             <div className='col-sm-4 text-right'>

                                 <button id='add' className='form-control' onClick={this.handleClick.bind(this)}> Agregar</button>

                             </div>

                         </div>
                         <br/>

                             <div className='panel panel-default' style={{marginLeft: 10, marginRight: 10}}>

                                 <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                     <br/>
                                     <div className='col-sm-12'>
                                         <BootstrapTable className='table table-responsive' data={this.state.datos}
                                                         search deleteRow={ true } options={ this.options5 } selectRow={ selectRowPropC } >

                                             <TableHeaderColumn dataSort={ true } dataField='Ramo' isKey={true} width='5%'
                                                                headerAlign='center'
                                                                dataAlign='left'>Ramo</TableHeaderColumn>
                                             <TableHeaderColumn dataSort={ true } dataField='Cobertura' headerAlign='center'
                                                                width='15%'>Cobertura</TableHeaderColumn>
                                             <TableHeaderColumn dataSort={ true } dataField='Causa' headerAlign='center' dataAlign='center'
                                                                width='20%'>Causa</TableHeaderColumn>
                                             <TableHeaderColumn dataSort={ true } dataField='Consecuencia' headerAlign='center' dataAlign='left'
                                                                width='30%'>Consecuencia</TableHeaderColumn>
                                             <TableHeaderColumn dataSort={ true } dataField='Monto' headerAlign='center'
                                                                dataAlign='right'>Monto Reclamado</TableHeaderColumn>
                                             <TableHeaderColumn  dataField='coberturaItems' hidden>Monto Reclamado</TableHeaderColumn>
                                         </BootstrapTable>
                                     </div>
                                 </div>
                             </div>
                         
                     </div> : ''}
                     <br/>

                </div>

                <br/>
                <div className='row'>
                    <br/>
                    <div className='col-sm-6 text-right'>
                        <Link to={API.basename+"/Sinester"}>
                        <button id='back' className='form-control fa fa-backward'> Datos del Siniestro</button>
                        </Link>
                    </div>
                    <div className='col-sm-6 text-left'>

                            <button onClick={this.doSomething.bind(this)} id='next' className='form-control'>Datos Adicionales <i className='fa fa-forward'></i>
                            </button>

                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state =>{
    return {
        stateComponentReducer : state.stateComponentReducer
    }
}

export default connect(mapStateToProps,actions)(Coverage);

