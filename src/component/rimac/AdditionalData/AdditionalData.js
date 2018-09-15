import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Modal from 'react-bootstrap-modal';
import {Link} from 'react-router-dom';
import  { Redirect } from 'react-router-dom';
import {browserHistory} from 'react-router';
//--
import Steps from "../partial/Steps";
import DetailsPolicy from "../partial/DetailsPolicy";
import API from '../../../config/API';
import AxiosPlus from '../../../functions/AxiosPlus';
import connect from "react-redux/es/connect/connect";
import * as actions from '../../../action/index';
import ip from "ip";
import moment from "moment";
import store from '../../../store/store';
import Cookies from 'universal-cookie';
import validateProduct from "../../../functions/ValidateProduct";
import sessionState from "../../../functions/sessionState";
import Policy from "../../../functions/Policy";
import Utils from "../../../functions/Utils";
const cookies = new Cookies();
let findPolicyCertificate = {};
let coverage= {};
let adjunterAll = [];
let adjunterTree = [];
let component_inspection = {};
let component_sinester = {};
class AdditionalData extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            numsim : '',
            openMessage:false,
            viewMore:false,
            modalMessage:'',
            noteViewMore:'ver más ( + )',
            contactSelected:'',
            addjusterSelected:'',
            fireRedirect:false,
            open:false,
            contacts: [],
            contactsSelected:0,
            adjusters: [],
            IsVisibleInspection: '0',
            viewNotificationContact:[],
            details:{
              insured:{
                  id:100,
                  type:'0',
                  name: 'MIDA FISH SRF',
                  email: 'lrm.programador1@gmail.com',
                  phone: '0412-3114140'
              },
              runner:{
                  id:200,
                  type:'1',
                  name: ''+sessionState.getTypeSessionContact().label,
                  email: 'gustavo.zuniga.rsr@viaexperis.pe',
                  phone: '0414-1111111'
              }
            },
            modal:{
                id:'',
                type:'',
                name:'',
                email:'',
                phone:''
            },
            register:[],

        }

        ;
        this.inputNameContact;
        this.inputEmailContact;
        this.inputPhoneContact;

        /*store.subscribe(()=>{
            console.log(store.getState().register);
        });*/
        store.subscribe(()=>{
            console.log(store.getState().value);
        });
        /*this.props.inputTexts([{a:"a"}]);*/
    }

    componentWillMount() {
        sessionState.redirectLogin(this.props);
        this.onRefresh();
        /*store.dispatch({
            type:"ADD",
            register:[
                "1",
                "2"
            ]
        });*/

        if (cookies.get('component_aditionals_details') !== undefined)
            this.setState(cookies.get('component_aditionals_details').state);
        // consultando el local store
        if (localStorage.getItem("component_findPolicyCertificate") !== null){
            findPolicyCertificate = JSON.parse(localStorage.getItem('component_findPolicyCertificate')).state;
        }

        if (localStorage.getItem("component_coverage") !== null){
            coverage = JSON.parse(localStorage.getItem('component_coverage')).state;
        }

        //if (cookies.get('component_inspection') !== undefined)
          //  component_inspection = (cookies.get('component_inspection').state);

        if (localStorage.getItem('component_sinester_storage') !== null) {
            component_sinester = JSON.parse(localStorage.getItem('component_sinester_storage')).state;
        }

        if (localStorage.getItem('component_inspection') !== null) {
            component_inspection = JSON.parse(localStorage.getItem('component_inspection')).state;
        }
            //component_sinester = (cookies.get('component_sinester').state);


        if (findPolicyCertificate.PolizasSelected.id == 3001 ||
          findPolicyCertificate.PolizasSelected.id == 3002) {
            //if (localdetailspolicy.prueba == 3001) {
            //console.log('Entre')
            this.setState({IsVisibleInspection: '0'});
        }else{
            this.setState({IsVisibleInspection: '1'});
        }

        this.addContacts();
        this.addAdjusters();
    }

    addData(){
        cookies.set('component_aditionals_details', {state:this.state});
    }

    addContactNotificacion(data){
        //let contact = [];
        let contact = this.viewNotificationContact;
        contact.concat([data]);
    }

    onRefresh() {

        //this.addAdjusters();
    }

    selectContactProp = {
        /*mode: 'radio',*/
    }

    handleClickAjuster(data){
        this.setState({
            addjusterSelected:data
        })
    }

    handleClick(event) {

       /* store.dispatch({
            type:"ADD",
            register: [{
                hola:"mundo"
            }]
        });*/

        this.setState({
            open: true
        });
        this.state.contactsSelected = event.type;
        if (event.type === 0){
            this.state.modal.name = this.state.details.insured.name;
            this.state.modal.email = this.state.details.insured.email;
            this.state.modal.phone = this.state.details.insured.phone;
        } else {
            this.state.modal.name = this.state.details.runner.name;
            this.state.modal.email = this.state.details.runner.email;
            this.state.modal.phone = this.state.details.runner.phone;
        }

        this.setState({
            contactSelected:event
        });
    }


    addContacts() {
    AxiosPlus.ajax(
      "API.services.APISinObtenerItemsTSTDatapower",
      {
              codentidad:"CLM_RRGG_TIPO_CONTACTO",
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
            let contacts = [];
            for (let i in response.data){
                contacts.push({
                    type:response.data[i].coditem,
                    contact:response.data[i].dscitem
                });
                break;
            }

            contacts.push({
                type:sessionState.getTypeSessionContact().label,
                contact:sessionState.getTypeSessionContact().label
            });

            this.setState({
                contacts
            });
      }
    );
  }

    addAdjusters(){
        let  adjusters = [];
        AxiosPlus.ajax('API.services.consultarAjustadoresDatapower',{
            codramo:coverage.ramoSelected.label,//'EQEL',
            tipocanal:"CNL",
            idusuario:"canalweb",
            auditoria:
                {
                    ip:ip.address(),
                    usuario:"canalweb",
                    fechaTrans:moment().format('Y-MM-DD'),
                    horaTrans:moment().format('HH:mm:ss')
                }
        },(response)=>{
            //console.log(response.data)
                adjusters = [];
                for(let i in response.data.ObtenerAjustadoresResponse){
                    adjusters.push({
                        id:response.data.ObtenerAjustadoresResponse[i].num_idajustador,
                        adjuster:response.data.ObtenerAjustadoresResponse[i].nombre_ajustador
                    });
                    if (i <= 2){
                        adjunterTree.push({
                            id:response.data.ObtenerAjustadoresResponse[i].num_idajustador,
                            adjuster:response.data.ObtenerAjustadoresResponse[i].nombre_ajustador
                        });
                    }
                }
                adjunterAll = adjusters;
                this.setState({
                    adjusters: adjunterTree
                });
            });
        }
    doSomething(e){
        if (this.state.addjusterSelected === ''){
            this.setState({
                openMessage:true,
                modalMessage:'Debe seleccionar un ajustador'
            });
        } else if (this.state.contactSelected === ''){
            this.setState({
                openMessage:true,
                modalMessage:'Debe seleccionar un contacto'
            });
        } else if (this.state.viewNotificationContact.length < 1){
            this.setState({
                openMessage:true,
                modalMessage:'Debe seleccionar un contacto, '+ 'el Asegurado y el '+sessionState.getTypeSessionContact().label+' deben estar en la grilla de contactos'
            });
        } else {

            let Contacto = {
                tipocto : '',// "A",
                nombrecto : '',//"ARIASOL - ARIASOL C. A",
                emailcto : '',//"gustavo.zuniga.rsr@viaexperis.pe",
                telefonocto : '',//"1231231",
                extensioncto : '',//"000" //NA
            };

            console.log("hola mundoo");
            //console.log(this.state.viewNotificationContact);


            Contacto = Utils.arrayToMultiObject("Contacto",this.state.viewNotificationContact, function(data){
                let contact = {};
                if (data.type !== 'A'){
                    // preventor o broker
                    contact = {
                        tipocto : sessionState.getTypeSessionContact().alias,
                        nombrecto : data.contact,
                        emailcto : data.email,
                        telefonocto : data.phone,
                        extensioncto : '000' // NA
                    };
                } else {
                    //asegurado
                    contact = {
                        tipocto : data.type,
                        nombrecto : data.contact,
                        emailcto : data.email,
                        telefonocto : data.phone,
                        extensioncto : '000' // NA
                    };
                }
                return contact;
            });

            /*for (let i in this.state.viewNotificationContact){
                if (this.state.viewNotificationContact[i].type !== 'A'){
                    Contacto.tipocto = sessionState.getTypeSessionContact().alias;
                    Contacto.nombrecto = this.state.viewNotificationContact[i].contact;
                    Contacto.emailcto = this.state.viewNotificationContact[i].email;
                    Contacto.telefonocto = this.state.viewNotificationContact[i].phone;
                    Contacto.extensioncto = '000'; // NA
                    break;
                }
            }*/

            let Ramo={ // la lista de ramos tiene que ser un arreglo para los montos aproximados, ya que esto viene en una matriz
                /*codramo:'',//"TRAN",
                bienafect:'',//"",
                listCobertura:{
                    Cobertura:{
                        idecobert:'',//"1765425",
                        tipocobert:'',//"C",
                        codcausa:'',//"005",
                        codconsec:'',//"001",
                        mtoreclamo:'',//"500.5",
                        codmoneda:'',//"USD"
                    }
                }*/
            };

            Ramo = Utils.arrayToRecursive("Ramo",coverage.datos, function(data){
                return {
                    codramo:data.Ramo,
                    bienafect:"",
                    listCobertura:{
                        Cobertura:{
                            idecobert:data.coberturaItems.idecobert,
                            tipocobert:data.coberturaItems.tipores,
                            codcausa:"005", //FALTA
                            codconsec:"001",//FALTA
                            mtoreclamo:data.Monto.replace(/\'/g,'').replace(/\,/,'.'), //"500.5", //str.replace(/blue/g, "red")
                            codmoneda:data.coberturaItems.codmoncob
                        }
                    }
                }
            });

            AxiosPlus.ajax('API.services.registrarOrquestadorDatapower',{
                numcert:/*findPolicyCertificate.CertificadosSelected.certificado*/"1",
                tipocanal:"CNL",
                idusuario:"canalweb",
                auditoria:{
                    ip:ip.address(),
                    usuario:"canalweb",
                    fechaTrans:moment().format('Y-MM-DD'),
                    horaTrans:moment().format('HH:mm:ss')
                },
                idepol:findPolicyCertificate.PolizasSelected.idepol,//"146106",
                tiposiniestro: component_sinester.TypeSinester === "Preventivo" ? "P": "N",//"N",
                refexternasin: component_sinester.r_preventor != '' ? component_sinester.r_preventor: "",
                feccrea:moment().format("Y-MM-DD\THH:mm:ss"),
                fecocurr:component_sinester.incidenceDate,
                horocurr:"00:00:00", // falta // falta en la busqueda de la poliza
                fecnoti:component_sinester.noticeDate,
                hornoti:"00:00:00", // falta // falta en la busqueda de la poliza
                idedec:findPolicyCertificate.CertificadosSelected.idedec !== undefined ?
                    findPolicyCertificate.CertificadosSelected.idedec : '',
                numidajus:/*String(this.state.addjusterSelected),*/"462", // verificar este parametro, ya que esta haciendo que de error al servicio al pasarle el id del adjuntador (validar que identificador se deberia de enviar puesto que generar error)
                dscocurrencia:component_inspection.descSinester !== undefined ? (component_sinester.descSinester) : ' ',//"asdasdasd",
                empresatransp: (component_inspection.nombreEmpresa !== undefined ? component_inspection.nombreEmpresa : ''), // "",
                nomconductor: (component_inspection.nombreChofer !== undefined ? component_inspection.nombreChofer : ''), // "",,
                placa:(component_inspection.placa !== undefined ? component_inspection.placa : ''), // "",
                indterafectado:component_sinester.third === "si" ? "S" : "N",//"S",
                indempinvol:"", //NA
                inddemanda:"", //NA
                inddanosbien:"", //NA
                tipoperdida:"", //NA
                indfueradomi:"", //NA
                listBien:{ //NA
                    Bien:{
                        marca:"0",//NA
                        modelo:"0",//NA
                        serie:"0",//NA
                        dscadibienafect:"0"//NA
                    }
                },
                inddanosequipo:"", //NA
                indroboequipo:"", //NA
                tipoevento:"", //NA
                ubicacion:{
                    codconti:"0",  // NA
                    codpais:"428", // NA por ahora, todavia no manejamos paises
                    codest:component_sinester.direccionesDeclaradasSelected.codestado !== undefined ?
                        (component_sinester.direccionesDeclaradasSelected.codestado.length === 0
                        ? '000' : component_sinester.direccionesDeclaradasSelected.codestado) : '000',//"015",
                    codciu:component_sinester.direccionesDeclaradasSelected.codciudad !== undefined ?
                        (component_sinester.direccionesDeclaradasSelected.codciudad.length === 0 ?
                            ('001'):component_sinester.direccionesDeclaradasSelected.codciudad): '001',//,"001",
                    codmuni:component_sinester.codmunicipio !== undefined ?
                        (component_sinester.codmunicipio.length === 0 ?
                            ('001'):component_sinester.codmunicipio) : '001',//"001",
                    direccion:component_sinester.Direccion !== undefined ?
                        (component_sinester.Direccion.length === 0 ? "N/A":component_sinester.Direccion) : 'N/A', //"asdasdasd",
                    idedirec:component_sinester.idedirec !== undefined ?
                        (component_sinester.idedirec.length === 0 ? "0":component_sinester.idedirec) : '0' ,//"0"
                },
                listRamo:{// la lista de ramos tiene que ser un arreglo para los montos aproximados, ya que esto viene en una matriz
                    Ramo
                },
                inspeccion: {
                    tipotransporte: "1",
                    fecinspeccion: "2016-12-12",
                    fecllegada: "2016-12-12",
                    fecembarque: "2016-12-12",
                    lugarorig: "once",
                    lugardest: "capital",
                    naveorig: "XMD",
                    indtransbordo: "S",
                    listNaveFinal: {
                        NaveFinal: {
                            dscnavefinal: "Barco",
                            lugartransbordo: "Puerto"
                        }
                    },
                    listIncoterm: {
                        Incoterm: {
                            codincoterm: "MD",
                            mtoincoterm: "1000"
                        }
                    },
                    tipoembarque: "Fac",
                    contenido: "Ropa",
                    tipomercaderia: "1",
                    codvalfact: "1",
                    matricaeronave: "zccsd",
                    nomembar: "9",
                    sumaasegembar: "100",
                    ifv: "10",
                    pi: "1",
                    imo: "45",
                    numrefpreven: "10",
                    nomaerolinea: "10",
                    idevuelo: "2655896"
                },
                listContacto:{ // esto es un arreglo de 2 contactos, ya que el canal puede teenr un asegurado o preventor
                    Contacto
                },
                rolusuario:sessionState.getTypeSessionContact().label//"EJECUTIVO"
            },(response)=>{
                // response: { "crearSiniestroOrquestadorResponse":{ "numsinbpm":"432", "msgrpta":"OK", "idesinbpm":"193" } }
               try{
                   if (response.data.crearSiniestroOrquestadorResponse.msgrpta === "OK"){
                       this.setState({
                           numsim:response.data.crearSiniestroOrquestadorResponse.numsinbpm
                       });
                       this.addData();
                       this.props.history.push(API.basename+'/RegisterSinester');
                   }
               }catch (e){
                  alert("error")
               }
            });
        }
    }


    saveAndClose = () => {

        let listContact = this.state.viewNotificationContact;
        if (this.state.contactsSelected === "A"){
            this.state.modal.name = this.state.details.insured.name = this.inputNameContact.value;
            this.state.modal.email = this.state.details.insured.email = this.inputEmailContact.value;
            this.state.modal.phone = this.state.details.insured.phone = this.inputPhoneContact.value;
            this.state.modal.id = this.state.details.insured.id;
        } else {
            this.state.modal.name = this.state.details.runner.name = this.inputNameContact.value;
            this.state.modal.email = this.state.details.runner.email = this.inputEmailContact.value;
            this.state.modal.phone = this.state.details.runner.phone = this.inputPhoneContact.value;
            this.state.modal.id = this.state.details.runner.id;
        }
        let list = {
            id:this.state.modal.id,
            contact : this.state.modal.name,
            type: this.state.contactsSelected,
            type_string : ((this.state.contactsSelected === "A") ? 'Asegurado' : 'Corredor'),
            email:this.state.modal.email,
            phone:this.state.modal.phone,
        };

        // algoritmo para evitar que se repitan los datos insertados
        let isExist = false;
        let index = 0;
        for (let i in listContact){
            if (listContact[i].type === this.state.contactsSelected){
                isExist = true;
                index = i;
                break;
            }
        }

        if (isExist){
            listContact[index] = list;
        } else {
            listContact.push(list)
        }

        this.setState({
            open: false,
            viewNotificationContact : listContact,
        });
    }

    viewMore = (e) =>{
        this.setState({viewMore:!this.state.viewMore});
        let adjuster = [];
        let note = '';
        if (this.state.viewMore) {
            note = 'ver más ( + )';
            adjuster = adjunterTree;
        } else {
            note = 'ver menos ( - )';
            adjuster = adjunterAll
        }
        this.setState({
            adjusters:adjuster,
            noteViewMore:note,
        })
    };

    option_contacts = {
        deleteText: 'Eliminar',
        noDataText: 'No se ha registrado ningun valor...',
        handleConfirmDeleteRow: (next, dropRowKeys) => {
            const dropRowKeysStr = dropRowKeys.join(',');
            let datos = this.state.viewNotificationContact;
            let new_datos=[];

            // se elimina la lista seleccionada
            for (let i in datos){
                for (let y = 0; y < dropRowKeys.length; y ++){
                    if (dropRowKeys[y] === datos[i].id){
                        break;
                    } else if(y + 1 === dropRowKeys.length){
                        new_datos.push(datos[i])
                    }
                }
            }
            this.setState({viewNotificationContact:new_datos});
            next();
        },

    }

    render() {
        this.addData();
        const {atenderSinPoliza} = findPolicyCertificate;

        const mostrarDetalle = validateProduct.isVisibleDetailsPolicy();

        const {contacts, adjusters, viewNotificationContact} = this.state;

        console.log(viewNotificationContact);

        console.log(adjusters);


        const selectRowProp = {
            mode: 'radio',
            onSelect: this.handleClick.bind(this),
            selected: [this.state.contactSelected.type]
        };

        const selectRowAdjuster = {
            mode: 'radio',
            onSelect: this.handleClickAjuster.bind(this),
            selected: [this.state.addjusterSelected.id]
        };

        const notificationsContact = {
            mode: 'checkbox',
            clickToSelect: true
        };

        let closeModal = () => this.setState({ open: false });
        let closeModalMessage = () => this.setState({ openMessage: false });

        function doSomething(e){
           e.preventDefault();
           //window.location.href = "../Sinester";
        }

        return (
            <div className='col-sm-12'>
                <Modal
                    show={this.state.openMessage}
                    onHide={closeModalMessage}
                    aria-labelledby="ModalHeader"
                    className="show">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Mensaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<p>Some Content here</p>*/}
                        <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                            <div className='col-sm-12 text-left'>
                                {this.state.modalMessage}
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
                    <h2>Registrar siniestro</h2>
                </div>

                <Steps stepNumber="5" IsVisible={this.state.IsVisibleInspection}/>

                {/* si la poliza no esta selccionada "Atender sin poliza", entonces no se muestra esta seccion*/}
                { mostrarDetalle ? <DetailsPolicy/> : '' }

                <div className='panel panel-default'>
                    <div className='panel-heading text-left' style={{color: 'red'}}>Datos Adicionales</div>
                    <br/>

                    <form name="myform" onSubmit={doSomething}>
                    <div className='row'>
                        <div className='col-sm-3 text-left' >
                            <div className='row' style={{marginLeft: 10, marginRight: 10}}>

                                    <div className='panel panel-default'>
                                        <div className='panel-heading text-left' style={{color: 'red'}}>Datos de contacto para notificaciones</div>
                                        <BootstrapTable className='table table-responsive' data={contacts}
                                                        selectRow={selectRowProp} required
                                        >
                                            <TableHeaderColumn dataField='type' isKey={true} hidden
                                                               headerAlign='center'
                                                               dataAlign='left'>Contacto</TableHeaderColumn>
                                            <TableHeaderColumn dataField='contact'  width='90%'
                                                               headerAlign='center'
                                                               dataAlign='left'>Contacto</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>

                            </div>

                            <div className='row margin'>
                                    <div className='panel panel-default'>
                                        <div className='panel-heading text-left' style={{color: 'red'}}>Seleccionar ajustador</div>
                                        <BootstrapTable className='table table-responsive' data={adjusters}
                                                        selectRow={selectRowAdjuster} required>
                                            <TableHeaderColumn dataField='id' isKey={true} hidden
                                                               headerAlign='center'
                                                               dataAlign='left'>Ajustador</TableHeaderColumn>
                                            <TableHeaderColumn dataField='adjuster'  width='90%'
                                                               headerAlign='center'
                                                               dataAlign='left'>Ajustador</TableHeaderColumn>
                                        </BootstrapTable>
                                        <div className="text-center">
                                            <a href="javascript:void(0)" onClick={this.viewMore}>{this.state.noteViewMore}</a>
                                        </div>
                                    </div>
                            </div>

                        </div>
                        <div className='col-sm-9 text-left'>
                            <BootstrapTable className='table table-responsive' data={viewNotificationContact}
                                            selectRow={notificationsContact}
                                            required
                                            search
                                            options={this.option_contacts}
                                            deleteRow
                            >
                                <TableHeaderColumn dataField='id' isKey={true}
                                                   headerAlign='center'
                                                   dataAlign='left' hidden></TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='contact'  width='33.33%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Contacto</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='email'  width='33.33%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Email</TableHeaderColumn>
                                <TableHeaderColumn dataSort={ true } dataField='phone'  width='33.33%'
                                                   headerAlign='center'
                                                   dataAlign='left'>Telefono</TableHeaderColumn>
                                <TableHeaderColumn dataField='type' hidden></TableHeaderColumn>
                            </BootstrapTable>
                            {/*<button type='button'>Launch modal</button>*/}
                            <Modal
                                show={this.state.open}
                                onHide={closeModal}
                                aria-labelledby="ModalHeader"
                                className="show"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id='ModalHeader'>Contacto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/*<p>Some Content here</p>*/}
                                    <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                        <div className='col-sm-12 text-left'>
                                            <label htmlFor='nameContact'>Nombre Completo:</label>
                                            <input className='form-control' type='text' id='nameContact' defaultValue={this.state.modal.name} onChange={this.onChangeModalName} ref={(input)=>{this.inputNameContact = input}}/>
                                        </div>
                                    </div>
                                    <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                        <div className='col-sm-10 text-left'>
                                            <label htmlFor='email'>E-mail:</label>
                                            <input className='form-control' type='text' id='email' defaultValue={this.state.modal.email} onChange={this.onChangeModalEmail} ref={(input)=>{this.inputEmailContact = input}}/>
                                        </div>
                                    </div>
                                    <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                                        <div className='col-sm-10 text-left'>
                                            <label htmlFor='phone'>Teléfono:</label>
                                            <input className='form-control' type='text' id='phone' defaultValue={this.state.modal.phone} onChange={this.onChangeModalPhone} ref={(input)=>{this.inputPhoneContact = input}}/>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    {/*// If you don't have anything fancy to do you can use
                                    // the convenient `Dismiss` component, it will
                                    // trigger `onHide` when clicked*/}
                                    <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

                                   {/* // Or you can create your own dismiss buttons*/}
                                    <button className='btn btn-primary' onClick={this.saveAndClose}>
                                        Guardar
                                    </button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                    <div className="row">
                        <div className='row' style={{marginLeft: 10, marginRight: 10}}>
                            <br/>
                            <div className='col-sm-6 text-right'>
                                <Link to={API.basename+(Policy.isAtenderSinPoliza() ? "/Sinester" : "/Coverage")}>
                                    <button id='back' className='form-control fa fa-backward'>{Policy.isAtenderSinPoliza() ? "Datos del siniestor" : "Seleccionar cobertura"}</button>
                                </Link>
                            </div>
                            <div className='col-sm-6 text-left'>

                                    <button onClick={this.doSomething.bind(this)} id='next' className='form-control'>Registrar Siniestro <i className='fa fa-forward'></i>
                                    </button>

                            </div>
                            {this.state.fireRedirect ? (
                                <Redirect to={API.basename+'/RegisterSinester'}/>
                            ) : ''}

                        </div>
                    </div>
                    <br/>
                    </form>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        detailsPolicyReducer: state.detailsPolicyReducer
    }
}
export default connect(mapStateToProps,actions)(AdditionalData);