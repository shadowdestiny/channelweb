import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Select from "react-select";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap-modal";
import DetailsPolicyAdjunter from "../partial/DetailsPolicyAdjunter";
//--
import "react-select/dist/react-select.css";
//---
import connect from "react-redux/es/connect/connect";
import * as actions from "../../../action/index";
import axios from "axios";
import AxiosPlus from "../../../functions/AxiosPlus";
import API from "../../../config/API";
import ip from "ip";
import moment from "moment";

import DATETIME from "../../../functions/datetime";
import DATETIME2 from "../../../functions/datetime2";

import Cookies from "universal-cookie";
import sessionState from "../../../functions/sessionState";
const cookies = new Cookies();

class BuscarSiniestro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buscar: false,
      open: false,
      open2: false,
      selectProduct: "",
      siniestros: [],
      poliza: "",
      asegurado: "",
      nrosiniestro: "",
      fechadesde: "",
      fechahasta: "",
      SelectStatus: "",
      fecharegdesde: "",
      fechareghasta: "",
      nrosiniestrocorredor: "",
      selected_motivo: "",
      comentarios: "",
      visible: false,
      fecha: "2017-10-01",
      detalleproducto: "",
      productodetalle: "",
      sinesterSelected: [],
      listaProductos: [],
      detallesiniestro: [],
      EsiniestrosData: [],
      today: '',
    };
  }

  componentWillMount() {
    sessionState.redirectLogin(this.props);
    // consultando el local store
    if (localStorage.getItem("component_findsinester") !== null) {
      let state = JSON.parse(localStorage.getItem("component_findsinester"))
        .state;
      this.setState(state);
    }

    this.getDataProductos();
    this.getDataEstados();
    this.today();

  }
  addData() {
    const state = this.state;
    localStorage.setItem("component_findsinester", JSON.stringify({ state }));
  }

  getDataSinester() {
    let siniestros = [];
    AxiosPlus.ajax(
      "API.services.buscarSiniestroDatapower",
      {
        codprod: this.state.selectProduct,
        numpol: this.state.poliza,
        numidaseg: this.state.asegurado,
        numsinbpm: this.state.nrosiniestro,
        fecocurrini: this.state.fechadesde,
        fecocurrfin: this.state.fechahasta,
        stssin: this.state.SelectStatus,
        feccreaini: this.state.fecharegdesde,
        feccreafin: this.state.fechareghasta,
        refexternasin: this.state.nrosiniestrocorredor,
        direccion: "",
        nomembarcacion: "",
        tipocanal: "CNL",
        idusuario: "canaweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("Y/MM/DD"),
          horaTrans: moment().format("H:mm:ss")
        }
      },
      response => {
        console.log(response.data);

        if (response.data.code === undefined) {
          // se inicializa dentro de la promeza
          siniestros = [];
          for (let i in response.data) {
            siniestros.push({
              id: response.data[i].idesinbpm,
              Siniestro: response.data[i].numsinbpm,
              producto: response.data[i].dscprod,
              poliza: response.data[i].numpol,
              nombrec: response.data[i].nomaseg,
              focurrencia: DATETIME2.format_to_date(response.data[i].fecocurr),
              fregistro: DATETIME2.format_to_date(response.data[i].feccrea),
              estado: response.data[i].dscstssin,
              codsiniestro: response.data[i].codsiniestro,
            });
          }
          this.setState({
            siniestros
          });
        } else {
          alert(response.data.code + " " + response.data.message);
        }
      }
    );
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
        //console.log(response.data)
        this.setState({
          listaProductos: response.data
        });
      }
    );
  }

    today(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var mm = today.getMinutes();
        var ss = today.getSeconds();
         if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
        today = yyyy+'-'+mm+'-'+dd+'_'+hh+':'+mm+':'+ss;
        console.log(today)

            this.setState({
                today: today,
            })
    }

  handleClick(event) {
    this.setState({
      visible: true // siempre se da true cuando se presiona el boton de buscar
    });
    this.getDataSinester();
    event.preventDefault();
    this.props.detailsPolicy(this.state);
  }

  saveProduct(data) {
    this.setState({
      selectProduct: data
    });
  }

  saveStatus(data) {
    this.setState({
      SelectStatus: data
    });
  }

  handleClickSolicitud(event) {
    this.setState({
      open: true
    });
    event.preventDefault();
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    //alert(this.state.fechadesde);
  };

  handleClickSinester(data) {
    this.setState(
      {
        sinesterSelected: data
      },
      this.ObtenerDetalle
    );
  }

  getDataEstados() {
    AxiosPlus.ajax(
      "API.services.APISinObtenerItemsTSTDatapower",
      {
              codentidad:"CLM_RRGG_ESTADO_SINIESTRO",
              tipocanal:"CNL",
              idusuario:"canalweb",
        auditoria: {
          ip: ip.address(),
          usuario: "canalweb",
          fechaTrans: moment().format("D/MM/Y"),
          horaTrans: moment().format("H:mm:ss")
        }
      },
      response => {
        console.log(response.data)
                  this.setState({
                    EsiniestrosData: response.data
                    });
      }
    );
  }

  ObtenerDetalle() {
    AxiosPlus.ajax(
      "API.services.detalleSiniestro",
      {
        idesinbpm: this.state.sinesterSelected.id,
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
        console.log(response.data);
        this.setState({
          detallesiniestro: response.data
        });
      }
    );
  }

  render() {
    this.addData();

    var pro = this.state.listaProductos;
    var est = this.state.EsiniestrosData;
    var today = this.state.today;
    var products2 = [];
    var EsiniestrosData = [];
    var filename = 'BúsquedaSiniestros_'+today+'.csv';

    for (var key in pro) {
      products2.push({
        value: pro[key].codProd,
        label: pro[key].codProd + "-" + pro[key].dscProd
      });
    }



    for (var key in est) {
            EsiniestrosData.push({
                value: est[key].coditem ,
                label: est[key].dscitem
            });
        }

    const selectRowProp = {
      mode: "radio",
      onSelect: this.handleClickSinester.bind(this),
      selected: [this.state.sinesterSelected.id]
    };

    let closeModal = () => this.setState({ open: false });
    let closeModal2 = () => this.setState({ open2: false });
    let closeModal3 = () => this.setState({ open2: true });

    const products = [];

    const options = {
      exportCSVText: "Exportar",
      noDataText: "No se ha encontrado ningun Siniestro para el filtro aplicado"
    };

    // MODIFICAr
    addProducts(5);

    //--- ACA SE CARGA LA DATA PROVENIENTE DEL SERVICIO
    function addProducts(quantity) {
      const startId = products.length;
      for (let i = 0; i < quantity; i++) {
        const id = startId + i;
        products.push({
          Siniestro: "0000" + i * 10 + 1,
          producto: "3001 - Transporte Flotante " + i,
          poliza: 50588 + i,
          estado: "ACT",
          nombrec: "Empresa " + i,
          fregistro: "01/01/2017",
          focurrencia: "31/12/2017"
        });
      }
    }

    function ProductoFormatter(cell, row) {
      return <a onClick={closeModal3}> {cell} </a>;
    }

console.log(this.state.SelectStatus)

    return (
      <div className="col-sm-12">
        <div className="text-center" style={{ color: "red" }}>
          <h2>Buscar Siniestro</h2>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading text-left" style={{ color: "red" }}>
            Consultar Estado de los Siniestros Registrados
          </div>
          <br />

          <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
            <div className="col-sm-8 text-left">
              <label htmlFor="productos">Producto</label>
              <Select
                id="productos"
                autoFocus
                simpleValue
                name="selected-product"
                ref="SelectProduct"
                options={products2}
                value={this.state.selectProduct}
                onChange={this.saveProduct.bind(this)}
              />
            </div>

            <div className="col-sm-4 text-left">
              <label htmlFor="poliza" className="control-label">
                Poliza
              </label>
              <input
                className="form-control"
                type="number"
                id="poliza"
                name="poliza"
                onChange={this.onChange}
                defaultValue={this.state.poliza}
              />
            </div>
          </div>
          <br />

          <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
            <div className="col-sm-8 text-left">
              <label htmlFor="asegurado" className="control-label">
                Asegurado:
              </label>
              <input
                className="form-control"
                type="text"
                id="asegurado"
                name="asegurado"
                onChange={this.onChange}
                defaultValue={this.state.asegurado}
              />
            </div>

            <div className="col-sm-4 text-left">
              <label htmlFor="nrosiniestro" className="control-label">
                Nro. Siniestro
              </label>
              <input
                className="form-control"
                type="number"
                id="nrosiniestro"
                name="nrosiniestro"
                onChange={this.onChange}
                defaultValue={this.state.nrosiniestro}
              />
            </div>
          </div>
          <br />

          <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
            <div className="col-sm-4 text-left">
              <label htmlFor="fechadesde" className="control-label">
                F.Ocurrencia- Desde:
              </label>
              <input
                type="date"
                className="form-control"
                name="fechadesde"
                onChange={this.onChange}
                defaultValue={this.state.fechadesde}
              />
            </div>

            <div className="col-sm-4 text-left">
              <label htmlFor="fechahasta" className="control-label">
                Hasta:
              </label>
              <input
                type="date"
                className="form-control"
                name="fechahasta"
                onChange={this.onChange}
                defaultValue={this.state.fechahasta}
              />
            </div>

            <div className="col-sm-4 text-left">
              <label htmlFor="productos">Estado</label>
              <Select
                id="estado"
                autoFocus
                simpleValue
                name="selected-status"
                ref="SelectStatus"
                value={this.state.SelectStatus}
                onChange={this.saveStatus.bind(this)}
                options={EsiniestrosData}
              />
            </div>
          </div>
          <br />

          <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
            <div className="col-sm-4 text-left">
              <label htmlFor="fecha2desde" className="control-label">
                Fecha Registro- Desde:
              </label>
              <input
                type="date"
                className="form-control"
                name="fecharegdesde"
                onChange={this.onChange}
                defaultValue={this.state.fecharegdesde}
              />
            </div>

            <div className="col-sm-4 text-left">
              <label htmlFor="fecha2hasta" className="control-label">
                Hasta:
              </label>
              <input
                type="date"
                className="form-control"
                name="fechareghasta"
                onChange={this.onChange}
                defaultValue={this.state.fechareghasta}
              />
            </div>

            <div className="col-sm-4 text-left">
              <label htmlFor="nrosiniestrocorredor" className="control-label">
                Nro. Siniestro Corredor:
              </label>
              <input
                className="form-control"
                type="text"
                id="nrosiniestrocorredor"
                name="nrosiniestrocorredor"
                onChange={this.onChange}
                defaultValue={this.state.nrosiniestrocorredor}
              />
            </div>
          </div>
          <br />

          <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
            <div className="col-md-10 text-left" />
            <div className="col-md-2 text-left">
              <button
                id="buscar"
                onClick={this.handleClick.bind(this)}
                className="form-control fa fa-search"
              >
                Buscar
              </button>
            </div>
          </div>
          <br />

          <div className={this.state.visible ? "visible" : "no-visible"}>
            <div
              className="panel panel-default"
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              <div className="panel-heading text-left" style={{ color: "red" }}>
                Siniestros Encontrados
              </div>
              <br />

              <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
                <br />
                <div className="col-sm-12">
                  <BootstrapTable
                    className="table table-responsive"
                    data={this.state.siniestros}
                    fetchInfo={{ dataTotalSize: 1 }}
                    selectRow={selectRowProp}
                    search
                    exportCSV={true}
                    csvFileName={filename}
                    options={options}
                    pagination
                  >
                    <TableHeaderColumn
                      dataField="id"
                      isKey={true}
                      hidden
                      headerAlign="center"
                      dataAlign="left"
                    >
                      id
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="Siniestro"
                      width="5%"
                      headerAlign="center"
                      dataAlign="left"
                      dataFormat={ProductoFormatter}
                    >
                      Nro. Siniestro
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField="producto"
                      headerAlign="center"
                      width="10%"
                    >
                      Producto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField="poliza"
                      headerAlign="center"
                      dataAlign="center"
                      width="10%"
                    >
                      Póliza
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField="nombrec"
                      headerAlign="center"
                      dataAlign="left"
                      width="30%"
                    >
                      Nombre Completo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField="focurrencia"
                      headerAlign="center"
                      dataAlign="right"
                    >
                      Fecha Ocurrencia
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField="fregistro"
                      headerAlign="center"
                      dataAlign="right"
                    >
                      Fecha Registro
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataSort={true}
                      dataField="estado"
                      headerAlign="center"
                      dataAlign="right"
                    >
                      Estado
                    </TableHeaderColumn>
                    {/* <TableHeaderColumn
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
                  dataField="certificado"
                  headerAlign="center"
                  dataAlign="left"
                  width="14.28%"
                  hidden={this.state.isproductaux}
                >
                  Certificado
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
                </TableHeaderColumn>*/}
                    <TableHeaderColumn
                      dataSort={true}
                      dataField="codsiniestro"
                      headerAlign="center"
                      dataAlign="right"
                      hidden
                    >
                      Estado
                    </TableHeaderColumn>
                  </BootstrapTable>
                  {this.state.siniestros.length} registros
                </div>
              </div>
            </div>
          </div>
          <br />

          <Modal
            show={this.state.open}
            onHide={closeModal}
            aria-labelledby="ModalHeader"
            className="show"
          >
            <Modal.Header closeButton>
              <Modal.Title id="ModalHeader">
                Solicitud de Anulación del Siniesto{" "}
                {this.state.sinesterSelected.Siniestro}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/*<p>Some Content here</p>*/}
              <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
                <div className="col-sm-12 text-left">
                  <label htmlFor="motivo">
                    Ingrese Motivo de Anulación del Siniestro
                  </label>
                  <Select
                    id="motivo"
                    autoFocus
                    simpleValue
                    name="selected_motivo"
                    ref="SelectMotivo"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
                <div className="col-sm-12 text-left">
                  <label htmlFor="contenido" className="control-label">
                    Comentarios:
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    cols="100"
                    id="comentarios"
                    name="comentarios"
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/*// If you don't have anything fancy to do you can use
                                    // the convenient `Dismiss` component, it will
                                    // trigger `onHide` when clicked*/}
              <Modal.Dismiss className="btn btn-default">Cancel</Modal.Dismiss>

              {/* // Or you can create your own dismiss buttons*/}
              <button className="btn btn-primary">Enviar Solicitud</button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.open2}
            onHide={closeModal2}
            aria-labelledby="ModalHeader"
            className="show"
          >
            <Modal.Header closeButton>
              <Modal.Title id="ModalHeader">
                Detalle del Siniesto {this.state.sinesterSelected.Siniestro}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/*<p>Some Content here</p>*/}
              <div className="row" style={{ marginLeft: 10, marginRight: 10 }}>
                <div className="col-sm-4 text-left">
                  <label htmlFor="productodetalle" className="control-label">
                    Producto:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="productodetalle"
                    name="productodetalle"
                    onChange={this.onChange}
                    defaultValue={this.state.sinesterSelected.producto}
                    value={this.state.sinesterSelected.producto}
                  />
                </div>
              </div>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <div>
                <DetailsPolicyAdjunter />
              </div>
              {/*<div className='row' style={{marginLeft: 10, marginRight: 10}}>
                        <div className='col-sm-4 text-left'>
                            <label htmlFor='detalleproducto' className='control-label'>Detalle:</label>
                            <input className='form-control' type='text' id='detalleproducto'                                 
                                name="detalleproducto"
                                onChange={this.onChange}
                                defaultValue={this.state.detalleproducto}
                                value="XXXXX"/>
                        </div>
                                </div>*/}
            </Modal.Body>
            <Modal.Footer>
              {/*// If you don't have anything fancy to do you can use
                                    // the convenient `Dismiss` component, it will
                                    // trigger `onHide` when clicked*/}
              <Modal.Dismiss className="btn btn-default">Cancel</Modal.Dismiss>

              {/* // Or you can create your own dismiss buttons*/}
            </Modal.Footer>
          </Modal>

          <div className="row">
            <br />
            <div className="col-sm-4 text-right">
              <Link to="/">
                <button id="cancel" className="form-control fa fa-ban">
                  {" "}
                  Cerrar
                </button>
              </Link>
            </div>

            <div className="col-sm-4 text-right">
              <Link to={API.basename+"/AdjunterLivelihood"}>
                <button
                  disabled={
                    this.state.sinesterSelected.codsiniestro !=
                    "03"
                  }
                  id="adjunt"
                  className="form-control"
                >
                  {" "}
                  Adjuntar Sustento
                </button>
              </Link>
            </div>

            <div className="col-sm-4 text-right">
              <button
                disabled={
                  this.state.sinesterSelected.codsiniestro != "01" &&
                  this.state.sinesterSelected.codsiniestro !=
                    "02" &&
                  this.state.sinesterSelected.codsiniestro !=
                    "03" &&
                  this.state.sinesterSelected.codsiniestro !=
                    "04"
                }
                id="solicitud"
                className="form-control"
                onClick={this.handleClickSolicitud.bind(this)}
              >
                {" "}
                Solicitar Anulación
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(BuscarSiniestro);
