import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Select from 'react-select';
import {Link} from 'react-router-dom';
import axios from 'axios';
import API from '../../../config/API';
import ip from "ip";
import moment from "moment";
import Steps from "../partial/Steps";
import DetailsPolicy from "../partial/DetailsPolicy";
import validateProduct from "../../../functions/ValidateProduct";

import Cookies from 'universal-cookie';
import AxiosPlus from "../../../functions/AxiosPlus";
import sessionState from "../../../functions/sessionState";
import Policy from "../../../functions/Policy";
const cookies = new Cookies();
let detailspolicy;
let localdetailspolicy;
class Sinester extends Component {
    constructor(props, context) {
        super(props, context);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            fireRedirect: false,
            addressData: [],
            TypeSinester: 'Normal',
            TypesSinester: [],
            Direccion: '',
            OtraDireccionItems:{},
            direccion:[],
            DirRiesgo: '',
            sinesterSelected : '',
            nReferencePreventor :'',
            r_preventor:'',
            incidenceDate:'',
            noticeDate:'',
            descSinester:'',
            businessTransport:'',
            nombreChofer:'',
            placa: '',
            third:'no',
            direccionesDeclaradasSelected:'',
            isproduct: false,
            IsVisibleInspection: '0',

        };
    }

    componentWillMount() {
        sessionState.redirectLogin(this.props);
        this.onRefresh();
        /*if (cookies.get('component_sinester') !== undefined)
            this.setState(cookies.get('component_sinester').state);*/

        if (localStorage.getItem("component_sinester_storage") !== null){
            this.setState(JSON.parse(localStorage.getItem('component_sinester_storage')).state);
            console.log("asasdfasdfasdfsadfsdfasdfsa");
            console.log(this.state)
        }


        if (cookies.get('component_findPolicyCertificate') !== undefined) {
            detailspolicy = cookies.get('component_findPolicyCertificate').state;
        }

        // consultando el local store
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            localdetailspolicy = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;

        }
        //Si la poliza selecciona es diferente del producto 3001 o 3002 no se muestra en el indicador de avance
        if (localdetailspolicy.PolizasSelected.id == 3001 ||
          localdetailspolicy.PolizasSelected.id == 3002) {
            //if (localdetailspolicy.prueba == 3001) {
            //console.log('Entre')
            this.setState({IsVisibleInspection: '0'});
        }else{
            this.setState({IsVisibleInspection: '1'});
        }



        if (localdetailspolicy.PolizasSelected.id==3003) {
            this.setState({isproduct: true});
        }else{
            this.setState({isproduct: false});
        }

        this.getTypePolicy();

        this.getData();

        this.addtoday();

    }

    getTypePolicy() {
    AxiosPlus.ajax(
      "API.services.APISinObtenerItemsTSTDatapower",
      {
              codentidad:"CLM_RRGG_REG_TIPO_SINIESTRO",
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
            let TypesSinester = [];

            for (let i in response.data){
                TypesSinester.push({
                    label:response.data[i].dscitem,
                    value:response.data[i].dscitem
                })
            }

            this.setState({
                TypesSinester
            });
      }
    );
  }

    getData(){

        // consultando direccion
        AxiosPlus.ajax('API.services.obtenerDireccionRiesgoDatapower',{
        codprod:"",
        idepol:localdetailspolicy.PolizasSelected.idepol,//"123681",
        numpol:"",
        numcert:"",
        tipocanal:"CNL",
        idusuario:"canalweb",
        auditoria: {
            ip:ip.address(),
            usuario:"canalweb",
            fechaTrans:moment().format('Y/MM/DD'),
            horaTrans:moment().format('H:mm:ss')
            }
        },(response) => {
            //console.log(response.data);
            let addressData = [];
            if (response.data.code === undefined ){
                for (let i in response.data){
                    addressData.push({
                         id: i,
                         departament:response.data[i].descestado ,
                         province: response.data[i].descciudad,
                         district: response.data[i].descmunicipio,
                         address: response.data[i].direc,
                         coddistrito: response.data[i].descestado,
                         codprovincia: response.data[i].direc,
                         codestado: response.data[i].codestado,
                         codciudad: response.data[i].codciudad,
                         codmunicipio: response.data[i].codmunicipio,
                         idedirec: response.data[i].idedirec,
                    });
                }
            }

            this.setState({
                addressData : addressData
            });
        });

        //axios.defaults.headers.post['Content-Type']='application/json';
        AxiosPlus.ajax('API.services.busquedaUbicacionDatapower',{
            codpais:"428",
            texto:" ",
            tipocanal:"CNL",
            idusuario:"canalweb",
            auditoria:
                {
                    ip:ip.address(),
                    usuario:"canalweb",
                    fechaTrans:moment().format('Y/MM/DD'),
                    horaTrans:moment().format('H:mi:ss')
                }
        },(response) => {
            //console.log(response.data);
            let direccion = [];
            // limpiando elementos
            //this.setState({direccion:[]})
            let busquedaUbicacion = response.data;
            for (let i in busquedaUbicacion) {

                direccion.push({
                    label : busquedaUbicacion[i].dscprovincia,
                    value : {valor: "Departamento: " +busquedaUbicacion[i].dscdepar
                                    +", Distrito: "+busquedaUbicacion[i].dscdistrito
                                    +", Provincia: "+busquedaUbicacion[i].dscprovincia,
                        items : {
                            dscprovincia : busquedaUbicacion[i].dscprovincia,
                            dscdepar : busquedaUbicacion[i].dscdepar,
                            dscdistrito : busquedaUbicacion[i].dscdistrito,
                        }
                    },
                    className: 'custom-class'
                })
            }
            this.setState({direccion})
        });
    }

    addData(){
        //cookies.set('component_sinester', {state:this.state});
        localStorage.setItem(
            "component_sinester_storage",
            JSON.stringify( {state : this.state} )
        );
    }

    addFechas(today){
            this.setState({
                incidenceDate: today,
                noticeDate: today,
            })
    }

    addtoday(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
         if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
        today = yyyy+'-'+mm+'-'+dd;

            this.setState({
                incidenceDate: today,
                noticeDate: today,
            })
    }

    onRefresh() {
        //this.addAddressData();
    }

    saveChangesTypeSinester(data) {
        console.log(data);
        this.setState({
            TypeSinester: data
            })
        }

    saveChangesDireccion(data) {
        this.setState({
                Direccion: data.value,
                direccionesDeclaradasSelected: '',
            })
        }

    saveChangesDirRiesgo(data) {
        this.setState({
                Direccion: data.valor,
                DirRiesgo: data.valor,
                direccionesDeclaradasSelected: '',
                OtraDireccionItems:data.items
        });
    }

    handleClick(data) {
        this.setState({
            direccionesDeclaradasSelected : data,
            DirRiesgo: '',
            Direccion: '',
        })
    }

    onChange = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    addAddressData(){
        this.setState({
            ...this.state,
            addressData: [
                {
                    id:1,
                    departament:'LIMA',
                    province:'LIMA',
                    district:'SANTIAGO DE SURCO',
                    address: 'JR MANUEL RUIZ 917'
                },
                {
                    id:2,
                    departament:'LIMA',
                    province:'LIMA',
                    district:'LINCE',
                    address: 'AV AREQUIPA 1301'
                }
            ]
        });

    }

    doSomething(e){
        e.preventDefault();
        //Verifico si el producto es el 3003
        if(this.state.isproduct){
            //Verifico si los campos estan completos
       if((this.state.businessTransport=='') || (this.state.nombreChofer='')){
            alert("Debe indicar la Empresa de Trasporte y Nombre de Chofer.");
        }else{
            //Si no se selecciono direcciones declaradas se deber ingresar distrito
            if(this.state.direccionesDeclaradasSelected==''){
                //Si no se infico Direccion de Riesgo
                if(this.state.DirRiesgo==''){
            alert("Debe indicar algun valor para la dirección del Siniestro.");
                }else{
                    if(this.state.Direccion==''){
            alert("Debe rellenar el campo Dirección.");
                    } else {
                        if (Policy.isAtenderSinPoliza()){
                            this.props.history.push(API.basename+'/AdditionalData');
                        } else {
                            this.props.history.push(API.basename+'/Coverage');
                        }
                    }
                }
            }else{
                if (Policy.isAtenderSinPoliza()){
                    this.props.history.push(API.basename+'/AdditionalData');
                } else {
                    this.props.history.push(API.basename+'/Coverage');
                }
            }
           if (Policy.isAtenderSinPoliza()){
               this.props.history.push(API.basename+'/AdditionalData');
           } else {
               this.props.history.push(API.basename+'/Coverage');
           }
        }
        }else{
            if(this.state.direccionesDeclaradasSelected==''){
                //Si no se infico Direccion de Riesgo
                if(this.state.DirRiesgo==''){
            alert("Debe indicar algun valor para la dirección del Siniestro.");
                } else {
                    if(this.state.Direccion==''){
            alert("Debe rellenar el campo Dirección.");
                    }else{
                        if (Policy.isAtenderSinPoliza()){
                            this.props.history.push(API.basename+'/AdditionalData');
                        } else {
                            this.props.history.push(API.basename+'/Coverage');
                        }
                    }
                }
            } else {
                if (Policy.isAtenderSinPoliza()){
                    this.props.history.push(API.basename+'/AdditionalData');
                } else {
                    this.props.history.push(API.basename+'/Coverage');
                }
            }
        }
    }

    render() {

        const today= setMaxDate();
        this.addData();
        this.addFechas.bind(today);
        const { fireRedirect } = this.state

        let codprodaux=false;
        let detailspolicy;
        let localdetailspolicy;

        if (cookies.get('component_findPolicyCertificate') !== undefined) {
            detailspolicy = cookies.get('component_findPolicyCertificate').state;
        }

        // consultando el local store
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            localdetailspolicy = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
        }

        if(localdetailspolicy.PolizasSelected.codprod=="3001" || localdetailspolicy.PolizasSelected.codprod=="3002" ){
            codprodaux=true;
        }


    function setMaxDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
         if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
        today = yyyy+'-'+mm+'-'+dd;
        return today;
    }

        const selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.handleClick.bind(this),
            selected:[this.state.direccionesDeclaradasSelected.id]
        }
        ;

        const DirRiesgo = [
            {label: "Lima", value: "Lima", className: 'custom-class', id:"9546"},
            /*{label: "Direccion b", value: "Direccion b", className: 'custom-class'}*/
        ];

        const TypeSinesteraux = [
            {label: "Normal", value: "Normal", className: 'custom-class'}
        ];

        const {addressData} = this.state;

        console.log(addressData);
        console.log(this.state.incidenceDate);
        console.log(this.state.IsVisibleInspection)



        return (
            <div className='col-sm-12'>
                <div className='text-center' style={{color: 'red'}}>
                    <h2>Registrar siniestro</h2>
                </div>

                <Steps stepNumber="3" IsVisible={this.state.IsVisibleInspection}/>

                {validateProduct.isVisibleDetailsPolicy() ?  <DetailsPolicy/> : ""}

                <div className='panel panel-default'>
                    <div className='panel-heading text-left' style={{color: 'red'}}>Datos del Siniestro</div>
                    <br/>
                    <form name="myform" onSubmit={this.doSomething.bind(this)}>
                    <div className='row'>
                        <div>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='type-sinester'>Tipo de siniestro:</label>
                                    <Select
                                        id='TypeSinester'
                                        name='TypeSinester'
                                        required
                                        ref='TypeSinester'
                                        autoFocus
                                        simpleValue
                                        options={this.state.TypesSinester}
                                        value={this.state.TypeSinester}
                                        onChange={this.saveChangesTypeSinester.bind(this)}
                                        placeholder='Seleccione tipo de Siniestro'
                                    />
                                </div>
                                {sessionState.isBroker() ? <div className='col-sm-6 text-left'>
                                    <label htmlFor='numSinester' className='control-label'>Nro. Referencia Preventor</label>
                                    <input
                                        className='form-control' type='number' id='numSinester'
                                        name="r_preventor"
                                        onChange={this.onChange}
                                        defaultValue={this.state.r_preventor}
                                    />
                                </div> : "" }
                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='incidenceDate' className='control-label'>Fecha de Ocurrencia</label>
                                    <input
                                        name="incidenceDate"
                                        onChange={this.onChange}
                                        value={this.state.incidenceDate}
                                        type="date" className="form-control" id="incidenceDate" defaultValue={today}  required/>
                                </div>
                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='noticeDate' className='control-label'>Fecha de Aviso</label>
                                    <input
                                        name="noticeDate"
                                        onChange={this.onChange}
                                        value={this.state.noticeDate}
                                        type="date" className="form-control" id="noticeDate" defaultValue={today} required/>
                                </div>
                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-12 text-left'>
                                    <label htmlFor='descSinester' className='control-label'>Descripción del siniestro / bienes afectados:</label>
                                    <textarea
                                        name="descSinester"
                                        onChange={this.onChange}
                                        defaultValue={this.state.descSinester}
                                        className="form-control" id="descSinester" required></textarea>
                                </div>
                            </div>

                            <div className={this.state.isproduct ? 'visible' : 'no-visible'}>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>

                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='businessTransport' className='control-label'>Empresa de Trasporte:</label>
                                    <input
                                        name="businessTransport"
                                        onChange={this.onChange}
                                        defaultValue={this.state.businessTransport}
                                        className='form-control' type='text' id='businessTransport'/>
                                </div>

                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='driver' className='control-label'>Nombre del Conductor:</label>
                                    <input
                                        className='form-control' type='text' id='businessTransport'
                                        name="nombreChofer"
                                        onChange={this.onChange}
                                        defaultValue={this.state.nombreChofer}
                                    />
                                </div>

                                <div className='col-sm-6 text-left'>
                                    <label htmlFor='driver' className='control-label'>Placa:</label>
                                    <input
                                        className='form-control' type='text' id='placa'
                                        name="placa"
                                        onChange={this.onChange}
                                        defaultValue={this.state.placa}
                                    />
                                </div>
                                </div>
                            </div>

                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <label className='control-label'>Terceros afectados:&nbsp;</label>
                                    <input
                                        onChange={this.onChange}
                                        type="radio" name="third" value={'si'} checked={this.state.third === 'si'} id="third"/>&nbsp;Si&nbsp;
                                    <input
                                        onChange={this.onChange}
                                        value={'no'}
                                        type="radio" name="third" checked={this.state.third === 'no'} />&nbsp;No&nbsp;
                                </div>
                            </div>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-12'>
                                    <label className='control-label'>Ubicación del siniestro: </label>
                                    <br />
                                    <div className={addressData.length>0 ? 'visible' : 'no-visible'}>
                                    <div className='panel panel-default'>
                                        <div className='panel-heading text-left' style={{color: 'red'}}>Direcciones declaradas</div>
                                        <BootstrapTable className='table table-responsive' data={addressData}
                                                        selectRow={selectRowProp} search pagination
                                                        options={{
                                                            noDataText : "No se encontró ninguna direccion declarada en la póliza."
                                                        }}
                                        >
                                            <TableHeaderColumn hidden  dataField='id' isKey={true}
                                                               headerAlign='center'
                                                               dataAlign='left'>id</TableHeaderColumn>
                                            <TableHeaderColumn dataSort={ true } dataField='departament' width='20%'
                                                               headerAlign='center'
                                                               dataAlign='left'>Departamento</TableHeaderColumn>
                                            <TableHeaderColumn dataSort={ true } dataField='province' headerAlign='center'
                                                               width='20%'>Provincia</TableHeaderColumn>
                                            <TableHeaderColumn dataSort={ true } dataField='district' headerAlign='center' dataAlign='center'
                                                               width='40%'>Distrito</TableHeaderColumn>
                                            <TableHeaderColumn dataSort={ true } dataField='address' headerAlign='center' dataAlign='left'
                                                               width='20%'>Dirección</TableHeaderColumn>
                                            <TableHeaderColumn hidden dataField='codestado'></TableHeaderColumn>
                                            <TableHeaderColumn hidden dataField='codciudad'></TableHeaderColumn>
                                            <TableHeaderColumn hidden dataField='codmunicipio'></TableHeaderColumn>
                                            <TableHeaderColumn hidden dataField='idedirec'></TableHeaderColumn>
                                        </BootstrapTable>
                                        {addressData.length} registros
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-6 text-left'>
                                    <div className={addressData.length>0 ? 'visible' : 'no-visible'}>
                                    <label htmlFor='DirRiesgo'>Otra Ubicación:</label>
                                    </div>
                                    <div className={addressData.length==0 ? 'visible' : 'no-visible'}>
                                    <label htmlFor='DirRiesgo'>Ubicación:</label>
                                    </div>
                                    <Select
                                        id='from'
                                        simpleValue
                                        name="DirRiesgo" 
                                        ref='DirRiesgo'
                                        autoFocus
                                        options={this.state.direccion}
                                        value={this.state.DirRiesgo}
                                        onChange={this.saveChangesDirRiesgo.bind(this)}
                                        placeholder='Seleccione otra Ubicación'
                                    />
                                </div>
                            </div>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <div className='col-sm-12 text-left'>
                                    <label htmlFor='address'>Dirección:</label>
                                    <input className='form-control' type='text' id='address' value={this.state.Direccion}
                                        onChange={this.saveChangesDireccion.bind(this)} />
                                </div>
                            </div>
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                <br/>
                                <div className='col-sm-6 text-right'>
                                    <div className={codprodaux ?  'visible' : 'no-visible'}>
                                    <Link to={API.basename+"/Inspection"}>
                                        <button id='back' className='form-control fa fa-backward'> Anterior</button>
                                    </Link>
                                    </div>
                                    <div className={codprodaux==false ?  'visible' : 'no-visible'}>
                                    <Link to={API.basename+"/registrarSiniestro"}>
                                        <button id='back' className='form-control fa fa-backward'> Anterior</button>
                                    </Link>
                                    </div>
                                    
                                </div>
                                <div className='col-sm-6 text-left'>
                                        <button id='next' type="submit" className='form-control'>{Policy.isAtenderSinPoliza() ? "Datos adicionales" : "Seleccionar Cobertura"}  <i className='fa fa-forward'></i>
                                        </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    </form>
                            {/*{fireRedirect && (
                            <Redirect to={'/Coverage'}/>
                            )}*/}
                    <br/>
                </div>
            </div>
        );
    }
}
export default Sinester;