import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import API from "../../../config/API";
import connect from "react-redux/es/connect/connect";
import ip from "ip";
import moment from "moment";

import * as actions from "../../../action/index";
import DATETIME from "../../../functions/datetime";
//--
import "react-select/dist/react-select.css";
//---
import Steps from "../partial/Steps";
import Cookies from "universal-cookie";
import AxiosPlus from "../../../functions/AxiosPlus";
import sessionState from "../../../functions/sessionState";
const cookies = new Cookies();

class Siniestro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false,
      selectProduct: "",
      listaProductos: [],
      poliza: "",
      listaPolizas: [],
      listaCertificados: [],
      fecha: "",
      atenderSinPoliza: false,
      PolizasSelected: [],
      CertificadosSelected: [],
      gridselectedpoliza: "",
      gridselectedcertificado: "",
      visible: false,
      visible2: false,
      visible3: true,
      visible4: false,
      isproductaux: true,
      fechamapeada: "",
      planilla: "",
      aplicacion: "",
      //prueba: 3001,
    };
  }

  //Antes de montar el componente en el DOM
  componentWillMount() {
      sessionState.redirectLogin(this.props);
    //if (cookies.get('component_findPolicyCertificate') !== undefined)
    //  this.setState(cookies.get('component_findPolicyCertificate').state);
    // consultando el local store
    if (localStorage.getItem("component_findPolicyCertificate") !== null) {
      let state = JSON.parse(
        localStorage.getItem("component_findPolicyCertificate")
      ).state;
      this.setState(state);
    }
    this.getDataProductos();
  }

  getDataProductos() {
    AxiosPlus.ajax(
      "API.services.listarProductoDatapower",
      {
        numIdAseg: "",
        tipoCanal: "CNL",
        idUsuario: "canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("Y/MM/DD"),
          horaTrans: moment().format("H:mm:ss")
        }
      },
      response => {
        //console.log(response)
        this.setState({
          listaProductos: response.data
        });
      }
    );
  }

  getDataCertificados() {
    let listaCertificados = [];
    let planilla= "--";
    let aplicacion= "--";
    AxiosPlus.ajax(
      "API.services.consultarCertificadosDatapower",
      {
        codprod: this.state.PolizasSelected.id,
        idepol: this.state.PolizasSelected.idepol,
        numpol: this.state.PolizasSelected.numpol,
        numcert: "",
        idedec: "",
        planilla: this.state.planilla,
        aplicacion: this.state.aplicacion,
        nomaseg: "",
        apepataseg: "",
        apemataseg: "",
        fecocurr: "",
        tipocanal: "CNL",
        idusuario: "canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format('Y/MM/D'),
          horaTrans: moment().format("H:mi:ss")
        }
      },
      response => {
        console.log("certificados");
        console.log(response.data);
        listaCertificados = [];
        if(response.data.code!="10100" && response.data.code!="10004"){
        for (let i in response.data) {
          if(response.data[i].planilla!=""){
            planilla=response.data[i].planilla;
          }
          if(response.data[i].aplicacion!=""){
            aplicacion=response.data[i].aplicacion;
          }
          listaCertificados.push({
            certificado: response.data[i].numcert,
            descripcion: response.data[i].dsccert,
            moneda: response.data[i].codmonsumaseg,
            sumaasegurada: response.data[i].sumaaseg,
            estado: response.data[i].stscert,
            aplicacion: aplicacion,
            idedec:response.data[i].idedec,
            //planilla: response.data[i].planilla,
            planilla: planilla,
            fechainicio: DATETIME.format_to_date(response.data[i].fecing),
            fechafin: DATETIME.format_to_date(response.data[i].fecfin)
          });
          planilla= "--";
          aplicacion= "--";
        }
        this.setState({
          listaCertificados
        });
      }else{
        this.setState({
          listaCertificados
        });
      }
      }
    );
  }

  getDataPoliza() {
    let listaPolizas = [];
    AxiosPlus.ajax(
      "API.services.buscarpolizaDatapower",
      {
        codprod: this.state.selectProduct,
        numpol: this.state.poliza,
        numcert: "",
        stspol: "",
        fecinivig: this.state.fecha,
        fecfinvig: "",
        numidaseg: "",
        tiprel: "",
        idepol:"",
        tipocanal: "CNL",
        idusuario: "canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("Y/MM/DD"),
          horaTrans: moment().format("H:mi:ss")
        }
      },
      response => {
        console.log("servicio dataPOwer");
        console.log(response.data);
        listaPolizas = [];
        if(response.data.code!="10100" && response.data.code!="10004"){
        for (let i in response.data) {
          listaPolizas.push({
            id: response.data[i].codprod,
            idepol: response.data[i].idepol,
            numpol: response.data[i].numpol,
            numcert: response.data[i].numcert,
            producto: response.data[i].dscprod,
            poliza: response.data[i].numpol,
            dsccert: response.data[i].dsccert,
            estado: response.data[i].stspol,
            //Verificar este campo nombre
            nombre: response.data[i].idedirec,
            nomaseg: response.data[i].nomaseg,
            //nomaseg: response.data[i].asegurado.nomaseg,
            nomcorr: response.data[i].nomcorr,
            inivigencia: DATETIME.format_to_date(response.data[i].fecinivig),
            finvigencia: DATETIME.format_to_date(response.data[i].fecfinvig)
          });
        }
        this.setState({
          listaPolizas
        });
      }else{
        this.setState({
          listaPolizas
        });
      }
    }
    );
  }

  addData() {
    // aqui se cargara
    cookies.set("component_findPolicyCertificate", { state: this.state });
    const state = this.state;
    localStorage.setItem(
      "component_findPolicyCertificate",
      JSON.stringify({ state })
    );
  }

  handleClick(event) {
    //Validamos si los campos seleccionados son de la manera correcta para mostrar la grilla
    if(this.state.poliza=="" || this.state.selectProduct=="" || this.state.selectProduct==null){
    alert("Debe ingresar el Producto y la Póliza");
    event.preventDefault();
    }else{
    this.setState({
      visible: true,
      visible2: false,
      visible3: false,
      visible4: false,
      isproductaux: true,
    });
    this.getDataPoliza();
    event.preventDefault();
    };
  }

  handleClick6(event) {
    if(this.state.planilla == '' && this.state.aplicacion == '' ){
      alert('Debe ingresar Planilla o Aplicación');
    }else{
    this.setState({
      visible4: true
    });
    this.getDataCertificados();
    event.preventDefault();
  }
  }

  isproduct(){
    if(this.state.PolizasSelected.id== 3001 || this.state.PolizasSelected.id== 3002){
      this.setState({
      visible2: true,
      isproductaux: false,
    });
    }else{
      this.getDataCertificados();
      this.setState({
      visible4: true
    });
    }


  }

  handleClick2(data) {
    this.setState({
      PolizasSelected: data,
    },
    this.isproduct);
    
    cookies.set("findpolizas_selected", data);
  }

  handleClick5(data) {
    this.setState({
      CertificadosSelected: data
    });
  }

  saveProduct(data) {
    this.setState({
      selectProduct: data
    });
  }

  saveFecha(data) {
    this.setState({
      fechamapeada: data
    });
  }

  handleChangePoliza(event) {
    this.setState({ poliza: event.target.value });
  }

  handleChangePlanilla(event) {
    this.setState({ planilla: event.target.value });
  }

  handleChangeAplicacion(event) {
    this.setState({ aplicacion: event.target.value });
  }

  handleChangeFecha(event) {
    this.setState({ fecha: event.target.value });
    const formated = this.state.fecha.split("-");
    let fecha = formated[0] + formated[1] + formated[2] + " 12:00:00";
    this.setState({
      fechamapeada: fecha
    });
  }

  handleChangeatenderSinPoliza(event) {
    this.setState({ atenderSinPoliza: !this.state.atenderSinPoliza });
  }

  doSomething(e) {
    e.preventDefault();
    this.addData();
    if (this.state.atenderSinPoliza == false) {
      if (
        this.state.PolizasSelected.length == 0 ||
        this.state.CertificadosSelected.length == 0
      ) {
        alert("Debe seleccionar la Póliza y el Certificado");
      } else {
        if (
          this.state.PolizasSelected.id == 3001 ||
          this.state.PolizasSelected.id == 3002
        ) {
          this.props.history.push(API.basename+"/Inspection");
        } else {
          this.props.history.push(API.basename+"/Sinester");
        }
      }
    } else {
      this.props.history.push(API.basename+"/Inspection");
    }
  }

  render() {
    this.addData();

    const products = [];
    const products2 = [];
    const certificados = [];

    var pro = this.state.listaProductos;

    for (var key in pro) {
      products2.push({
        value: pro[key].codProd,
        label: pro[key].codProd + " - " + pro[key].dscProd
      });
    }

    const { fireRedirect } = this.state;

    const today = setMaxDate();

    function setMaxDate() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = yyyy + "-" + mm + "-" + dd;
      return today;
    }

    // --- SE DEBE MEJORAR, ESTA ASI SOLO PARA EFECTO DE PRUEBA Y DEMOSTRACION
    const selectRowProp = {
      mode: "radio",
      clickToSelect: true,
      selected: [this.state.PolizasSelected.idepol],
      onSelect: this.handleClick2.bind(this)
    };

    const selectRowPropC = {
      mode: "radio",
      clickToSelect: true,
      selected: [this.state.CertificadosSelected.certificado],
      onSelect: this.handleClick5.bind(this)
    };

    const fetchInfo = {
      dataTotalSize: 100
    };

    const options2 = {
      noDataText: "No se encontró ninguna póliza para los criterios ingresados."
      //onRowClick: this.handleClick3.bind(this)
    };

    const options3 = {
      noDataText:
        "No se encontró ningún certificado para la póliza seleccionada."
      //onRowClick: this.handleClick4.bind(this)
    };


    return (
      <div className="col-sm-12">
        <div className="text-center" style={{ color: "red" }}>
          <h2>Registrar Siniestro</h2>
        </div>

        <Steps title="Registrar Siniestro" stepNumber="1" />

        <div className="panel panel-default">
          <form name="myform1" onSubmit={this.doSomething.bind(this)}>
            <div className="panel-heading text-left" style={{ color: "red" }}>
              Buscar Polizas
            </div>
            <br />

            <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
                {!sessionState.isCT() ? <div className="col-sm-6 text-left">
                <label htmlFor="productos">Producto</label>
                <Select
                  id="productos"
                  autoFocus
                  simpleValue
                  options={products2}
                  name="selected-product"
                  ref="SelectProduct"
                  value={this.state.selectProduct}
                  onChange={this.saveProduct.bind(this)}
                  placeholder="Seleccione un Producto"
                  required
                />
              </div> : "" }

              <div className="col-sm-4 text-left">
                <label htmlFor="poliza" className="control-label">
                  Poliza
                </label>
                <input
                  className="form-control"
                  type="number"
                  id="poliza"
                  value={this.state.poliza}
                  onChange={this.handleChangePoliza.bind(this)}
                  required
                />
              </div>
            </div>

            <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
              { !sessionState.isCT() ?
              <div className="col-sm-4 text-left">
                <label htmlFor="poliza" className="control-label">
                  Fecha de Inicio de Vigencia
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fechao"
                  max={today}
                  value={this.state.fecha}
                  onChange={this.handleChangeFecha.bind(this)}
                />
              </div> : ""}
              <br />
              <div className="col-sm-2 text-left">
                <button
                  id="buscar"
                  onClick={this.handleClick.bind(this)}
                  className="form-control fa fa-search"
                  Style="background: red; color:white"
                >
                  {" "}
                  Buscar
                </button>
              </div>
            </div>
            <br />
            <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
              <div className="col-sm-3 text-left">
                <input
                  type="checkbox"
                  defaultChecked={this.state.atenderSinPoliza}
                  onChange={this.handleChangeatenderSinPoliza.bind(this)}
                />{" "}
                Atender Sin Poliza &nbsp;
                <span
                  class="glyphicon glyphicon-question-sign"
                  title="Si no ha podido encontrar la póliza y el certificado del asegurado, puede continuar con el registro del siniestro marcando este check. Quedará a evaluación del ejecutivo.”."
                />
              </div>
            </div>

            <br />

            <div className={this.state.visible3 ? "visible" : "no-visible"}>
              <div className="row">
                <br />
                <div className="col-sm-6 text-right">
                  <Link to="/">
                    <button id="cancel" className="form-control fa fa-ban">
                      {" "}
                      Cancelar
                    </button>
                  </Link>
                </div>
                <div className="col-sm-6 text-left">
                  <button id="next" type="submit" className="form-control">
                    Siguiente <i className="fa fa-forward" />
                  </button>
                </div>
              </div>
            </div>
            <br />
          </form>
          {fireRedirect && <Redirect to={API.basename+"/Inspection"} />}
        </div>

        <div className={this.state.visible ? "visible" : "no-visible"}>
          <div
            className="panel panel-default"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <div className="panel-heading text-left" style={{ color: "red" }}>
              Polizas Encontradas
            </div>
            <br />

            <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
              <br />
              <div className="col-sm-12">
                <BootstrapTable
                  fetchInfo={fetchInfo}
                  className="table table-responsive"
                  data={this.state.listaPolizas}
                  selectRow={selectRowProp}
                  search
                  searchPlaceholder={"Buscar Póliza"}
                  options={options2}
                  pagination
                >
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="id"
                    headerAlign="center"
                    dataAlign="center"
                    hidden
                  >
                    Id Producto
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    isKey={true}
                    dataField="idepol"
                    headerAlign="center"
                    dataAlign="center"
                    hidden
                  >
                    Id Poliza
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="numpol"
                    headerAlign="center"
                    dataAlign="center"
                    hidden
                  >
                    Nro Poliza
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="numcert"
                    headerAlign="center"
                    dataAlign="center"
                    hidden
                  >
                    Nro Certificado
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="dsccert"
                    headerAlign="center"
                    dataAlign="center"
                    hidden
                  >
                    Certificado
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="nomaseg"
                    headerAlign="center"
                    dataAlign="center"
                    hidden
                  >
                    Asegurado
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="nomcorr"
                    headerAlign="center"
                    dataAlign="center"
                    hidden
                  >
                    Corredor
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="producto"
                    width="16.666%"
                    dataSort={true}
                    headerAlign="center"
                    dataAlign="left" /*filter={ { type: 'TextFilter', delay: 1000 } }*/
                  >
                    Producto
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="poliza"
                    headerAlign="center"
                    width="16.666%" /*filter={ {type: 'NumberFilter', delay: 1000,numberComparators: [ '=', '>', '<=' ] } }*/
                  >
                    Poliza
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="estado"
                    headerAlign="center"
                    dataAlign="center"
                    width="16.666%" /*filter={ { type: 'TextFilter', delay: 1000 } }*/
                  >
                    Estado
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="nomaseg"
                    headerAlign="center"
                    dataAlign="left"
                    width="16.666%" /*filter={ { type: 'TextFilter', delay: 1000 } }*/
                  >
                    Nombre Completo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="inivigencia"
                    headerAlign="center"
                    width="16.666%"
                    dataAlign="right" /*filter={ { type: 'TextFilter', delay: 1000 } }*/
                  >
                    Inicio Vigencia
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataSort={true}
                    dataField="finvigencia"
                    headerAlign="center"
                    width="16.666%"
                    dataAlign="right" /*filter={ { type: 'TextFilter', delay: 1000 } }*/
                  >
                    Fin Vigencia
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>

        <div className={this.state.visible2 ? "visible" : "no-visible"}>
          <div
            className="panel panel-default"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <tr>
              <td>
                <div
                  className="panel-heading text-left"
                  style={{ color: "red" }}
                >
                  Certificados Encontrados
                </div>
              </td>
              <td>
                <div className="panel-heading text-right">
                  <td>
                    <label htmlFor="planilla" className="control-label">
                      Planilla:
                    </label>
                  </td>
                  <td>
                    {" "}
                    <input
                      className="form-control"
                      type="number"
                      id="planilla"
                      value={this.state.planilla}
                      onChange={this.handleChangePlanilla.bind(this)}
                    />
                  </td>
                </div>
              </td>
              <td>
                <div className="panel-heading text-right">
                  <td>
                    <label htmlFor="aplicacion" className="control-label">
                      Aplicacion:
                    </label>
                  </td>
                  <td>
                    {" "}
                    <input
                      className="form-control"
                      type="number"
                      id="aplicacion"
                      value={this.state.aplicacion}
                      onChange={this.handleChangeAplicacion.bind(this)}
                    />
                  </td>
                </div>
              </td>
              <td>
                <div className="panel-heading text-right">
                  <button
                    id="buscar"
                    onClick={this.handleClick6.bind(this)}
                    className="form-control fa fa-search"
                    Style="background: red; color:white"
                  >
                    {" "}
                    Buscar
                  </button>
                </div>
              </td>
            </tr>
          </div>
        </div>
        <div className={this.state.visible4 ? "visible" : "no-visible"}>
          <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
            <br />

            <div className="col-sm-12">
              <BootstrapTable
                className="table table-responsive"
                data={this.state.listaCertificados}
                selectRow={selectRowPropC}
                search
                searchPlaceholder={"Buscar Certificado"}
                options={options3}
                pagination
              >
                <TableHeaderColumn
                  dataField="certificado"
                  isKey={true}
                  headerAlign="center"
                  dataAlign="left"
                >
                  Certificado
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataSort={true}
                    dataField="descripcion"
                    headerAlign="center"
                    width="14.28%"
                >
                  Descripción
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataSort={true}
                    dataField="moneda"
                    headerAlign="center"
                    dataAlign="left"
                    width="14.28%"
                >
                  Moneda
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataSort={true}
                    dataField="sumaasegurada"
                    headerAlign="center"
                    width="14.28%"
                    dataAlign="right"
                >
                  Suma Asegurada
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataSort={true}
                  dataField="sumaasegurada"
                  headerAlign="center"
                  dataAlign="left"
                  width="14.28%"
                  hidden={this.state.isproductaux}
                >
                  Prima
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="planilla"
                  headerAlign="center"
                  dataAlign="left"
                  width="14.28%"
                  hidden={this.state.isproductaux}
                >
                  Planilla
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="aplicacion"
                  headerAlign="center"
                  dataAlign="left"
                  width="14.28%"
                  hidden={this.state.isproductaux}
                >
                  Aplicación
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="estado"
                  headerAlign="center"
                  width="14.28%"
                  dataAlign="left"
                >
                  Estado
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="fechainicio"
                  headerAlign="center"
                  width="14.28%"
                  dataAlign="right"
                >
                  Inicio Vigencia
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataSort={true}
                  dataField="fechafin"
                  headerAlign="center"
                  width="14.28%"
                  dataAlign="right"
                >
                  Fin Vigencia
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataSort={true}
                  dataField="idedec"
                  headerAlign="center"
                  width="10%"
                  dataAlign="right"
                  hidden
                >
                  idedec
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
        <br />

        <div className={!this.state.visible3 ? "visible" : "no-visible"}>
          <div className="row">
            <br />
            <div className="col-sm-6 text-right">
              <Link to={API.basename}>
                <button id="cancel" className="form-control fa fa-ban">
                  {" "}
                  Cancelar
                </button>
              </Link>
            </div>

            <div className="col-sm-6 text-left">
              <button
                id="next"
                className="form-control"
                onClick={this.doSomething.bind(this)}
              >
                Siguiente <i className="fa fa-forward" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Siniestro);
