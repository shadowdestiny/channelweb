import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Modal from "react-bootstrap-modal";
import { Link } from "react-router-dom";
import Select from "react-select";
//--
import connect from "react-redux/es/connect/connect";
import API from "../../../config/API";
import * as actions from "../../../action/index";
import store from "../../../store/store";
import DetailsPolicyAdjunter from "../partial/DetailsPolicyAdjunter";
import ip from "ip";
import moment from "moment";
import axios, { post } from "axios";
import NumberFormat from "react-number-format";

import Cookies from "universal-cookie";
import AxiosPlus from "../../../functions/AxiosPlus";
import sessionState from "../../../functions/sessionState";
const cookies = new Cookies();
let _findsinester;
let _coverage;
class AdjunterLivelihood extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      file: null,
      entities: [],
      open: false,
      cuenta: "",
      monto: "",
      abn: "Abono",
      contacts: [],
      ramos: [],
      contactsSelected: 0,
      adjusters: [],
      viewNotificationContact: [],
      details: {
        insured: {
          id: 100,
          type: "1",
          name: "MIDA FISH SRF",
          email: "lrm.programador1@gmail.com",
          phone: "0412-3114140"
        },
        runner: {
          id: 200,
          type: "2",
          name: "CORREDOR 123",
          email: "lrm.programador2@gmail.com",
          phone: "0414-1111111"
        }
      },
      modal: {
        id: "",
        type: "",
        name: "",
        email: "",
        phone: ""
      },
      register: [],
      bouquets: [
        {
          id: 1,
          bouquet: "ramo",
          coverage: "Materiales",
          cause: "Robo por asalto",
          approximateAmount: "850"
        }
      ],
      listFiles: [],
      typeFileselected: "",
      fileSelected: "",
      SelectEntity: "",
      filesconverted: [], //Arreglo de bytes que contiene todos los documentos adjuntos codificados en bytes.
      docadj: [],
      checklist: [],
      montoFormated: ""
    };
    this.inputNameContact;
    this.inputEmailContact;
    this.inputPhoneContact;

    store.subscribe(() => {
      //console.log(store.getState().register);
    });
    this.props.inputTexts([{ a: "a" }]);

    ////////////////////////////////////////////////////
    //this.onFormSubmit = this.onFormSubmit.bind(this)
    //this.onChange2 = this.onChange2.bind(this)
    this.fileUpload = this.fileUpload.bind(this);
  }

  componentWillMount() {
    sessionState.redirectLogin(this.props);
    if (cookies.get("component_adjunterlivelihood") !== undefined)
      this.setState(cookies.get("component_adjunterlivelihood").state);
    if (localStorage.getItem("component_findsinester") !== null)
      _findsinester = JSON.parse(localStorage.getItem("component_findsinester"))
        .state;
    if (localStorage.getItem("component_coverage") !== null)
      _coverage = JSON.parse(localStorage.getItem("component_coverage"))
        .state;

    if (localStorage.getItem("component_adjunterlivelihood") !== null) {
      let state = JSON.parse(
        localStorage.getItem("component_adjunterlivelihood")
      ).state;
      this.setState(state);
    }
    //this.addContacts();
    //this.addAdjusters();
    //this.addRamos();
    this.getEntity();
    this.getCheckList();
  }

  //Aca se realiza el envio del documento al servidor

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    //Definiendo campos obligatorios para el envio d datos
    if (
      this.state.abn == "Abono" &&
      (this.state.SelectEntity == "" ||
        this.state.SelectEntity == undefined ||
        this.state.cuenta == "" ||
        this.state.cuenta == undefined)
    ) {
      alert(
        "Debe seleccionar la Entidad Financiera e Indicar Número de Cuenta"
      );
    } else {
      this.fileUpload();
      //this.props.history.push(API.basename+"/Rimac");
    }
  }

  /*onChange2(e) {
    this.setState({file:e.target.files[0]})
  }*/

  fileUpload() {
    let datosdocumentos = this.state.docadj;
    //let file=this.state.file;
    const url = API.services.crearArchivo;
    const config = {
      headers: {
        "Content-Encoding": "multipart/form-data",
        "Cache-Control": "no-cache",
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    };
    let formData = new FormData();
    const json = {
      /*num_siniestro:_findsinester.detallesiniestro.numsinbpm,
                num_certificado:_findsinester.detallesiniestro.numcert,
                num_poliza:_findsinester.detallesiniestro.numpol,
                nombre_rubro:"TGA",
                cod_cobertura:"989831",*/
      num_siniestro: "88823",
      num_certificado: "48514232",
      num_poliza: "4822",
      nombre_rubro: "TGA",
      cod_cobertura: "989831",
      clasificacion: "documento",
      tipo_documento: "documento",
      nombre_archivo: "sustento",
      usuario: "canalweb",
      fecha_carga: moment().format("Y/MM/DD"),
      auditoria: {
        ip: ip.address(),
        usuario: "canalweb",
        fechaTrans: moment().format("DD/MM/Y"),
        horaTrans: moment().format("H:mm:ss")
      }
    };

    for (let i in datosdocumentos) {
      formData = new FormData();
      let file = datosdocumentos[i].doc;
      console.log(file);
      console.log(json);
      formData.append("json", JSON.stringify(json));
      formData.append("archivo", file);
      axios.post(url, formData, config).then(response => {
        if (response.data.codigo == "1034") {
          alert(response.data.mensaje + " Nro. " + i);
        } else {
          alert(response.data.mensaje);
        }
      });
    }
  }

  ////////////////////////////////////////////////////////////

  getEntity() {
    AxiosPlus.ajax(
      "API.services.endidadesFinancierasDatapower",
      {
        indlista: "N",
        tipocanal: "CNL",
        idusuario: "canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("Y/MM/DD"),
          horaTrans: moment().format("H:mm:ss")
        }
      },
      response => {
        //console.log(response.data)
        let entities = [];
        for (let i in response.data) {
          entities.push({
            label: response.data[i].descentfinan,
            value: response.data[i].codentfinan,
            className: "custom-class"
          });
        }
        this.setState({
          entities
        });
      }
    );
  }

  getCheckList() {
    AxiosPlus.ajax(
      "API.services.consultarCheckList",
      {
        /*idsiniestrobpm:_findsinester.detallesiniestro.numsinbpm,
                idcobertura:"3",*/
        idsiniestrobpm: "107",
        idcobertura: "3",
        tipocanal: "CNL",
        usuario: "canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("Y/MM/DD"),
          horaTrans: moment().format("H:mm:ss")
        }
      },
      response => {
        console.log(response.data);
        let checklist = [];
        for (let i in response.data) {
          checklist.push({
            id: response.data[i].nombreDocumento,
            nombreDocumento: response.data[i].nombreDocumento,
            className: "custom-class"
          });
        }
        this.setState({
          checklist
        });
      }
    );
  }

  addData() {
    cookies.set("component_adjunterlivelihood", { state: this.state });
    const state = this.state;
    localStorage.setItem(
      "component_adjunterlivelihood",
      JSON.stringify({ state })
    );
  }

  addContactNotificacion(data) {
    //let contact = [];
    let contact = this.viewNotificationContact;
    contact.concat([data]);
  }

  onRefresh() {}

  selectContactProp = {
    /*mode: 'radio',*/
  };

  selectRowProp = {
    /*mode: 'radio',
        onSelect: this.handleClick.bind(this)*/
  };

  handleClickChecklist(data) {
    this.setState({
      open: true,
      typeFileselected: data
    });
  }

  handleClick(event) {
    /*store.dispatch({
            type:"ADD",
            register: [{
                hola:"mundo"
            }]
        });*/

    this.setState({
      open: true
    });

    this.state.contactsSelected = event.type;
    if (event.type === 1) {
      this.state.modal.name = this.state.details.insured.name;
      this.state.modal.email = this.state.details.insured.email;
      this.state.modal.phone = this.state.details.insured.phone;
    } else {
      this.state.modal.name = this.state.details.runner.name;
      this.state.modal.email = this.state.details.runner.email;
      this.state.modal.phone = this.state.details.runner.phone;
    }
  }

  selectRowAdjuster = {
    mode: "radio"
  };

  addContacts() {
    this.setState({
      contacts: [
        {
          type: 1,
          contact: "Asegurado",
          largeName: _findsinester.sinesterSelected.nomaseg,
          email: "jrodriguez@gmail.com",
          phone: 123456789
        },
        {
          type: 2,
          contact: "Corredor",
          largeName: "Maria Peña Rojas",
          email: "mpenar@mail.com",
          phone: 654321
        }
      ]
    });
  }
  addRamos() {
    this.setState({
      ramos: [
        {
          id: 1,
          ramo: "Robo",
          cobertura: "Asegurado",
          causa: "Jose Rodriguez Soto",
          consecuencia: "jrodriguez@gmail.com",
          monto: 123
        }
      ]
    });
  }
  addAdjusters() {
    this.state.adjusters = [
      {
        id: 1,
        adjuster: "Asegurador 1"
      },
      {
        id: 2,
        adjuster: "Asegurador 2"
      },
      {
        id: 3,
        adjuster: "Asegurador 3"
      }
    ];
  }

  saveEntity(data) {
    this.setState({
      SelectEntity: data
    });
  }

  saveAndClose = () => {
    var doc = this.state.listFiles[0];
    var aux = this.state.docadj;
    aux.push(doc);
    this.setState({
      open: false,
      docadj: aux
    });
  };

  changeFileType(data) {
    this.setState({
      open: true,
      typeFileselected: data
    });
  }

  changeFile = e => {
    let id = this.state.listFiles.length;
    id = id + 1;
    //this.ConvertFile(e);

    this.setState({
      //open:false,
      listFiles: [
        {
          id: e.target.files[0].name,
          name: e.target.files[0].name,
          doc: e.target.files[0]
        }
      ]
    });
  };

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  option_files = {
    deleteText: "Eliminar",
    noDataText: "No se ha registrado ningun valor...",
    handleConfirmDeleteRow: (next, dropRowKeys) => {
      const dropRowKeysStr = dropRowKeys.join(",");
      let datos = this.state.docadj;
      let new_datos = [];

      // se elimina la lista seleccionada
      for (let i in datos) {
        for (let y = 0; y < dropRowKeys.length; y++) {
          if (dropRowKeys[y] === datos[i].id) {
            break;
          } else if (y + 1 === dropRowKeys.length) {
            new_datos.push(datos[i]);
          }
        }
      }
      this.setState({ docadj: new_datos });
      next();
    }
  };

  handleClickAdjunter(data) {
    this.setState({
      fileSelected: data
    });
  }

  ConvertFile(e) {
    //Funcion que convierte un unico archivo en bytes[], debe ser llamado desde el imput file del Modal por los momentos.

    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    var fileByteArray = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      reader.readAsArrayBuffer(file);
      //reader.readAsBinaryString(file);

      // on reader load somthing...
      reader.onload = e => {
        if (e.target.readyState == FileReader.DONE) {
          var arrayBuffer = e.target.result;
          var array2 = new Uint8Array(arrayBuffer);
          for (var i = 0; i < array2.length; i++) {
            fileByteArray.push(array2[i]);
          }
        }

        var aux = this.state.filesconverted;
        aux.push(fileByteArray);
        this.setState({
          filesconverted: aux
        });
        //console.log(fileByteArray);
        //console.log(this.state.filesconverted);
      }; // reader.onload
    } // for
  }

  render() {
    this.addData();

    const { contacts, ramos } = this.state;
    const checklist = [
      { nombreDocumento: "Fotograf&iacute;a", id: "Fotograf&iacute;a" },
      {
        nombreDocumento:
          "Documentos de preexistencia(Opcional si es persona Natural)",
        id: "Documentos de preexistencia(Opcional si es persona Natural)"
      },
      {
        nombreDocumento:
          "Documentos de preexistencia(Obligatorio si es persona Jur&iacute;dico) ",
        id:
          "Documentos de preexistencia(Obligatorio si es persona Jur&iacute;dico) "
      }
    ];
    const options = this.state.entities;
    const filesAdjunter = [
      {
        label: "Factura / Proforma",
        value: 1
      },
      {
        label: "Denuncia Policial",
        value: 2
      }
    ];

    let closeModal = () => this.setState({ open: false });

    const fileRows = {
      mode: "radio",
      clickToSelect: true,
      onSelect: this.handleClickAdjunter.bind(this),
      selected: [this.state.fileSelected.id]
    };

    const selectRowChecklist = {
      mode: "radio",
      onSelect: this.handleClickChecklist.bind(this)
      //selected: [this.state.addjusterSelected.id]
    };

    function doSomething(e) {
      e.preventDefault();
      //window.location.href = "../Sinester";
    }

    function buttonFormatter(cell, row) {
      return '<div><span className="glyphicon glyphicon-fil" style="color:red"></span></div>';
    }

    console.log(this.state.docadj);

    return (
      <div className="col-sm-12">
        <div className="text-center" style={{ color: "red" }}>
          <h2>Detalles del siniestro</h2>
        </div>

        <DetailsPolicyAdjunter />

        {/*
          <div className="panel panel-default">
            <div className="panel-heading text-left" style={{ color: "red" }} />

            <div className="row">
              <div className="col-sm-12 text-left">
                <BootstrapTable
                  className="table table-responsive"
                  data={ramos}
                  selectRow={this.selectRowProp}
                  search
                >
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="id"
                    isKey={true}
                    headerAlign="center"
                    hidden={true}
                    dataAlign="left"
                  >
                    Ramo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="ramo"
                    width="10%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    Cobertura
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="cobertura"
                    width="20%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    Causa
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="causa"
                    width="20%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    Concecuencia
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="consecuencia"
                    width="20%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    Telefono
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="monto"
                    width="20%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    Monto
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 text-left">
                <BootstrapTable
                  className="table table-responsive"
                  data={contacts}
                  selectRow={this.selectRowProp}
                  search
                >
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="contact"
                    isKey={true}
                    width="5%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    Contacto
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="largeName"
                    width="20%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    Nompre completo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="email"
                    width="45%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    E-mail
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="phone"
                    width="20%"
                    headerAlign="center"
                    dataAlign="left"
                  >
                    Telefono
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        */}

        <div className="panel panel-default">
          <div className="panel-heading text-left" style={{ color: "red" }}>
            Completar registros
          </div>
          <br />

          <form name="myform" onSubmit={this.onFormSubmit.bind(this)}>
            <div className="row">
              <div className="col-sm-5 text-left">
                <div
                  className="row"
                  style={{ marginLeft: 10, marginRight: 10 }}
                >
                  <div className="panel panel-default">
                    <div
                      className="row"
                      style={{ marginLeft: 10, marginRight: 10 }}
                    >
                      <div
                        className="panel-heading text-left"
                        style={{ color: "red" }}
                      >
                        Adjuntar documentos de sustento
                      </div>

                      <div className="row margin">
                        <BootstrapTable
                          className="table table-responsive"
                          data={this.state.checklist}
                          selectRow={selectRowChecklist}
                          pagination
                          required
                        >
                          <TableHeaderColumn
                            dataField="id"
                            isKey={true}
                            hidden
                            headerAlign="center"
                            dataAlign="left"
                          >
                            Documento
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="nombreDocumento"
                            width="90%"
                            headerAlign="center"
                            dataAlign="left"
                          >
                            Documento
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>

                      {/*<Select
                                                autoFocus
                                                simpleValue
                                                options = { filesAdjunter }
                                                name='selected-product'
                                                ref='SelectProduct'
                                                value={this.state.typeFileselected}
                                                onChange={this.changeFileType.bind(this)}
                                                required
                                            />*/}
                    </div>
                    <br />
                    <div
                      className="row"
                      style={{ marginLeft: 10, marginRight: 10 }}
                    >
                      <label htmlFor="Mreclamado">
                        Confirmar monto Aprox. Reclamado
                      </label>
                      <div
                        className="col-sm-4"
                        style={{ "text-align": "left" }}
                      >
                        <input
                          className="form-control"
                          type="text"
                          value={_coverage.moneda}
                          disabled={true}
                        />
                      </div>
                      <div className="col-sm-6">
                        {/*<input onChange={this.handlAamount.bind(this)} defaultValue={this.state.montoAproximado} className='form-control' type='number' id='monto'/>*/}

                        <NumberFormat
                          value={this.state.monto}
                          className="form-control"
                          thousandSeparator={true}
                          prefix={"$"}
                          onValueChange={values => {
                            const { formattedValue, value } = values;
                            //console.log(formattedValue);
                            this.setState({
                              monto: value,
                              montoFormated: formattedValue
                            });
                          }}
                          format={val => {
                            let s_length = val.length;
                            let result = val;
                            switch (s_length) {
                              case 1:
                                // 1
                                result = val.substring(0, 1);
                                break;
                              case 2:
                                // 1.0
                                result =
                                  val.substring(0, 1) +
                                  "." +
                                  val.substring(1, 2);
                                break;
                              case 3:
                                // 1.00
                                result =
                                  val.substring(0, 1) +
                                  "." +
                                  val.substring(1, 3);
                                break;
                              case 4:
                                // 10
                                result =
                                  val.substring(0, 2) +
                                  "." +
                                  val.substring(2, 4);
                                break;
                              case 5:
                                // 100.00
                                result =
                                  val.substring(0, 3) +
                                  "." +
                                  val.substring(3, 5);
                                break;
                              case 6:
                                //1'000,00
                                result =
                                  val.substring(0, 1) +
                                  "'" +
                                  val.substring(1, 4) +
                                  "," +
                                  val.substring(4, 6);
                                break;
                              case 7:
                                //10'000.00
                                result =
                                  val.substring(0, 2) +
                                  "'" +
                                  val.substring(2, 5) +
                                  "," +
                                  val.substring(5, 7);
                                break;
                              case 8:
                                //100'000.00
                                result =
                                  val.substring(0, 3) +
                                  "'" +
                                  val.substring(3, 6) +
                                  "," +
                                  val.substring(6, 9);
                                break;
                              case 9:
                                //1'000'000.00
                                result =
                                  val.substring(0, 1) +
                                  "'" +
                                  val.substring(1, 4) +
                                  "," +
                                  val.substring(4, 7) +
                                  "." +
                                  val.substring(7, 9);
                                break;
                              case 10:
                                //10'000'000.00
                                result =
                                  val.substring(0, 2) +
                                  "'" +
                                  val.substring(2, 5) +
                                  "," +
                                  val.substring(5, 8) +
                                  "." +
                                  val.substring(8, 10);
                                break;
                              case 11:
                                //100'000'000.00
                                result =
                                  val.substring(0, 3) +
                                  "'" +
                                  val.substring(3, 6) +
                                  "," +
                                  val.substring(6, 9) +
                                  "." +
                                  val.substring(9, 11);
                                break;
                              default:
                                //1'000'000'000.00
                                result =
                                  val.substring(0, 1) +
                                  "'" +
                                  val.substring(1, 4) +
                                  "," +
                                  val.substring(4, 7) +
                                  "," +
                                  val.substring(7, 10) +
                                  "." +
                                  val.substring(10, 12);
                                break;
                            }

                            return result;
                          }}
                        />
                      </div>
                      <div className="col-sm-2">
                        <span
                          class="glyphicon glyphicon-question-sign"
                          title="Es la confirmación, según el sustento cargado, del monto que se está reclamando por los daños ocurridos en el siniestro."
                        />
                      </div>

                      {/*<div className='col-sm-7' style={{"text-align":"left"}}>
                                                <input className='form-control' type="text"
                                                    name="monto"
                                                    onChange={this.onChange}
                                                    defaultValue={this.state.monto} />
                                            </div>*/}
                    </div>
                    <br />
                  </div>
                  <div className="panel panel-default">
                    <div
                      className="row"
                      style={{ marginLeft: 10, marginRight: 10 }}
                    >
                      <div
                        className="panel-heading text-left"
                        style={{ color: "red" }}
                      >
                        Seleccionar forma de pago de la indermizacion
                      </div>
                      <div
                        className="row"
                        style={{ marginLeft: 10, marginRight: 10 }}
                      >
                        <div className="col-sm-6">
                          <label htmlFor="abono">Abono en cuenta</label>
                          <input
                            id="abono"
                            className="form-control"
                            type="radio"
                            name="abn"
                            onChange={this.onChange}
                            value={"Abono"}
                            checked={this.state.abn === "Abono"}
                          />
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="abono">Cheque</label>
                          <input
                            id="abono"
                            className="form-control"
                            type="radio"
                            name="abn"
                            onChange={this.onChange}
                            value={"Cheque"}
                            checked={this.state.abn === "Cheque"}
                          />
                        </div>
                      </div>

                      <div
                        className={
                          this.state.abn == "Abono" ? "visible" : "no-visible"
                        }
                      >
                        <div
                          className="row"
                          style={{ marginLeft: 10, marginRight: 10 }}
                        >
                          <label htmlFor="selections">Entidad financiera</label>
                          <Select
                            id="selections"
                            autoFocus
                            simpleValue
                            options={options}
                            name="selected-entity"
                            ref="selection"
                            value={this.state.SelectEntity}
                            onChange={this.saveEntity.bind(this)}
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div
                      className="row"
                      style={{ marginLeft: 10, marginRight: 10 }}
                    >
                      <div
                        className={
                          this.state.abn == "Abono" ? "visible" : "no-visible"
                        }
                      >
                        <div className="col-sm-12">
                          <label htmlor="cuenta">Numero de cuenta</label>
                          <table Style="width:100%">
                            <tbody>
                              <tr>
                                <td Style="width:95%">
                                  <input
                                    className="form-control"
                                    id="cuenta"
                                    type="text"
                                    name="cuenta"
                                    onChange={this.onChange}
                                    defaultValue={this.state.cuenta}
                                  />
                                </td>
                                <td>&nbsp;</td>
                                <td>
                                  <span
                                    class="glyphicon glyphicon-question-sign"
                                    title="Es el número de cuenta bancaria del asegurado donde desea que se le deposite el monto de indemnización por los daños ocurridos en el siniestro."
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
              </div>
              <div className="col-sm-7 text-left">
                <Modal
                  show={this.state.open}
                  onHide={closeModal}
                  aria-labelledby="ModalHeader"
                  className="show"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="ModalHeader">Documentos</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/*<p>Some Content here</p>*/}
                    <div
                      className="row"
                      style={{ marginLeft: 10, marginRight: 10 }}
                    >
                      <div className="col-sm-12 text-left">
                        <label htmlFor="denuncia">
                          Carga {this.state.typeFileselected.nombreDocumento}:
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="denuncia"
                          defaultValue={this.state.modal.name}
                          onChange={this.changeFile}
                          ref={ref => (this.fileUpload = ref)}
                        />
                      </div>
                    </div>

                    <br />
                    <div
                      className="row"
                      style={{ marginLeft: 10, marginRight: 10 }}
                    >
                      <BootstrapTable
                        className="table table-responsive"
                        data={this.state.docadj}
                        pagination
                        selectRow={fileRows}
                        options={this.option_files}
                        deleteRow
                      >
                        <TableHeaderColumn
                          dataField="id"
                          dataField="id"
                          isKey={true}
                          headerAlign="center"
                          dataAlign="left"
                          hidden
                        />
                        <TableHeaderColumn
                          dataField="name"
                          width="90%"
                          headerAlign="center"
                          dataAlign="left"
                        >
                          Documentos Cargados
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    {/*// If you don't have anything fancy to do you can use
                                    // the convenient `Dismiss` component, it will
                                    // trigger `onHide` when clicked*/}
                    <Modal.Dismiss className="btn btn-default">
                      Cancel
                    </Modal.Dismiss>

                    {/* // Or you can create your own dismiss buttons*/}
                    <button
                      className="btn btn-primary"
                      onClick={this.saveAndClose}
                    >
                      Guardar
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>

            <div className="row">
              <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
                <br />
                <div className="col-sm-6 text-right">
                  <Link to="/">
                    <button id="back" className="form-control fa fa-backward">
                      Guardar y Cerrar
                    </button>
                  </Link>
                </div>
                <div className="col-sm-6 text-left">
                  {/*<Link to="/">
                                    <button id='next' className='form-control'>Enviar Información <i className='fa fa-forward'></i>
                                    </button>
                                </Link>*/}
                  <button id="next" className="form-control" type="submit">
                    Enviar Información
                  </button>
                </div>
              </div>
            </div>
            <br />
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    detailsEvent: state.detailsEvent
  };
};
export default connect(mapStateToProps, actions)(AdjunterLivelihood);
