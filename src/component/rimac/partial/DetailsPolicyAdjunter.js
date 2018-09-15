import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
//--
import * as actions from "../../../action";

import Cookies from "universal-cookie";
const cookies = new Cookies();

class DetailsPolicy extends Component {
  //Los datos reflejados en la Tabla deben ser consultados desde un servicio acorde al siniestro a buscar
  render() {
    const { detailsPolicyReducer } = this.props;

    const _default = "--";
    let fecha = _default;
    let _findsinesterSelected;

    if (localStorage.getItem("component_findsinester") !== null)
      _findsinesterSelected = JSON.parse(
        localStorage.getItem("component_findsinester")
      ).state;

    // 2003-11-14
    let fecha_ini_vigencia = _findsinesterSelected.detallesiniestro.fecha;

    // 2003-11-14
    let fecha_aviso = _findsinesterSelected.detallesiniestro.fecnotif;

    // fecha de aviso
    return (
      <div className="panel panel-default">
        <div className="panel-heading text-left" style={{ color: "red" }}>
          Datos de la poliza
        </div>
        <br />
        <div className="row">
          <div>
            <div className="col-sm-6">
              <table className="data-info">
                <tbody>
                  <tr>
                    <td>Tipo de Siniestro:</td>
                    <td>
                      {" "}
                      {_findsinesterSelected.detallesiniestro.tiposiniestro}
                    </td>
                  </tr>
                  <tr>
                    <td>Nro. de Siniestro:</td>
                    <td>{_findsinesterSelected.detallesiniestro.numsinbpm}</td>
                  </tr>
                  <tr>
                    <td>Póliza:</td>
                    <td>{_findsinesterSelected.detallesiniestro.numpol}</td>
                  </tr>
                  <tr>
                    <td>Inicio de Vigencia:</td>
                    <td>{_findsinesterSelected.detallesiniestro.feccrea}</td>
                  </tr>
                  <tr>
                    <td>Asegurado:</td>
                    <td>{_findsinesterSelected.detallesiniestro.nomaseg}</td>
                  </tr>
                  <tr>
                    <td>Fecha de Ocurrencia:</td>
                    <td>{_findsinesterSelected.detallesiniestro.fecocurr}</td>
                  </tr>
                  <tr>
                    <td>Descripción:</td>
                    <td>{_findsinesterSelected.detallesiniestro.dscstssin}</td>
                  </tr>
                  <tr>
                    <td>Empresa de transporte:</td>
                    <td>
                      {_findsinesterSelected.detallesiniestro.empresatransp}
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Ramo:</td>
                    <td>
                      {
                          _findsinesterSelected.detallesiniestro
                              .listaCoberturas !== undefined  ?  _findsinesterSelected.detallesiniestro
                          .listaCoberturas[0].dscramo : ""
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Cobertura:</td>
                    <td>
                      {
                        _findsinesterSelected.detallesiniestro.listaCoberturas !== undefined ?
                            _findsinesterSelected.detallesiniestro.listaCoberturas[0].dsccobert : ""
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Monto aprox. reclamado:</td>
                    <td>
                      {" "}
                      {
                          _findsinesterSelected.detallesiniestro.listaCoberturas !== undefined ?
                        _findsinesterSelected.detallesiniestro
                          .listaCoberturas[0].mtoreclamo : ""
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Contacto:</td>
                    <td>
                      {" "}
                      {
                          _findsinesterSelected.detallesiniestro.listaContactos !== undefined ?
                        _findsinesterSelected.detallesiniestro.listaContactos[0]
                          .tipocto : ""
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      {
                          _findsinesterSelected.detallesiniestro.listaContactos !== undefined ?
                        _findsinesterSelected.detallesiniestro.listaContactos[0]
                          .emailcto : ""
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-sm-6">
              <table className="data-info">
                <tbody>
                  <tr>
                    <td>Estado:</td>
                    <td>{_findsinesterSelected.detallesiniestro.dscstssin}</td>
                  </tr>
                  <tr>
                    <td>Producto:</td>
                    <td>
                      {_findsinesterSelected.detallesiniestro.codprod} -{" "}
                      {_findsinesterSelected.detallesiniestro.dscprod}
                    </td>
                  </tr>
                  <tr>
                    <td>Certificado:</td>
                    <td>{_findsinesterSelected.detallesiniestro.numcert}</td>
                  </tr>
                  <tr>
                    <td>Fin vigencia:</td>
                    <td>{/*detalle.findevigencia*/}</td>
                  </tr>
                  <tr>
                    <td>Corredor:</td>
                    <td>{_findsinesterSelected.detallesiniestro.nomcorr}</td>
                  </tr>
                  <tr>
                    <td>Fecha aviso:</td>
                    <td>{_findsinesterSelected.detallesiniestro.fecnoti}</td>
                  </tr>
                  <tr>
                    <td>Ubicación:</td>
                    <td>{_findsinesterSelected.detallesiniestro.direccion}</td>
                  </tr>
                  <tr>
                    <td>Nombre del chofer:</td>
                    <td>
                      {_findsinesterSelected.detallesiniestro.nomconductor}
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Causa:</td>
                    <td>
                      {
                          _findsinesterSelected.detallesiniestro.listaCoberturas !== undefined ?
                        _findsinesterSelected.detallesiniestro
                          .listaCoberturas[0].dsccausa : ""
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Consecuencia:</td>
                    <td>
                      {
                          _findsinesterSelected.detallesiniestro.listaCoberturas !== undefined ?
                        _findsinesterSelected.detallesiniestro
                          .listaCoberturas[0].dscconsec : ""
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Nombre Completo:</td>
                    <td>
                      {
                          _findsinesterSelected.detallesiniestro.listaContactos !== undefined ?
                        _findsinesterSelected.detallesiniestro.listaContactos[0]
                          .nombrecto : ""
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Telefono:</td>
                    <td>
                      {
                          _findsinesterSelected.detallesiniestro.listaContactos !== undefined ?
                        _findsinesterSelected.detallesiniestro.listaContactos[0]
                          .telefonocto :  ""
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    detailsPolicyReducer: state.detailsPolicyReducer
  };
};

export default connect(mapStateToProps, actions)(DetailsPolicy);
