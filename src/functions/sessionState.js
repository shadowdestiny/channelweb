/**
 * Created by lmarin on 04/05/2018.
 */
import API from '../config/API';
import AxiosPlus from "./AxiosPlus";

import ip from "ip";
import moment from "moment";

const sessionState = {
  /**
  * @author: lmarin
  * @date 04/05/2018
  * validando si existe la session una session activa
  * */
  isLogin: function(){
    if (this.getSessionState() !== undefined){
        return this.getSessionState().isLogin;
    } else {
        return false;
    }
  },
  /**
  * @author: lmarin
  * @date 04/05/2018
  * borra la session del usuario
  * */
  logout: function(props){
      localStorage.removeItem('session_state');
      this.redirectLogin(props)
  },
  /**
  * @author: lmarin
  * @date 04/05/2018
  * redirecciona a login si NO se encuentra una sesion abierta
  * */
  redirectLogin: function(props){
      if(this.isLogin() !== true){
          try{
              props.history.push(API.basename+"/Login");
          } catch (e){
              // si el push props no se encuentra se forza a redireccionar
              window.location.href = API.basename+"/";
          }

      }
  },
  /**
  * @author: lmarin
  * @date 04/05/2018
  * redirecciona al home si se encuentra una sesion abierta, de no ser asi redirecciona al login
  * */
  redirectHome: function(props){
      if(this.isLogin() === true){
            props.history.push(API.basename+"/Rimac");
      }
  },
  // preventor = corredor
  isBroker: function(){
      return this.getSessionState().result_data.tipo === API.type_rol.broker.code;
  },
  isPeventor: function(){
      return this.getSessionState().result_data.tipo === API.type_rol.preventor.code;
  },
  // si es central telefoninca o central de emergencia
  isCT: function(){
      return this.getSessionState().result_data.tipo === API.type_rol.CT.code;
  },
  isEjecutivo: function(){
      return this.getSessionState().result_data.tipo === API.type_rol.ejecutivo.code;
  },
  getTypeSessionContact : function(){
      switch (this.getSessionState().result_data.tipo){
          case API.type_rol.preventor.code:
              return API.type_rol.preventor;
          case API.type_rol.broker.code:
              return API.type_rol.broker;
          case API.type_rol.ejecutivo.code:
              return API.type_rol.ejecutivo;
          case API.type_rol.CT.code:
              return API.type_rol.CT;
          default: return {};
      }
  },
  /**
  * @author: lmarin
  * @date 04/05/2018
  * valida el usuario por medio de una un numero de cuenta o contraseña
  * */
  validateUser: function(email,password,props,callback){
          AxiosPlus.ajax('API.services.validarUsuarioDatapower',{
                  usuario:email,
                  clave:password,
                  origen:"CLRG",
                  auditoria: {
                      ip: ip.address(),
                      usuario: "canalweb",
                      fechaTrans: moment().format("Y/MM/DD"),
                      horaTrans: moment().format("H:mm:ss")
                  }
              },
          (response)=>{
            console.log(response.data)
              let data = response.data[0];
              // esta condicion solo aplica para el mock
              let result = {
                  message : "",
              };
              if (API.test === 'Test'){
                  if (data.correo === email && data.password === password){
                      this.setSessionState('N/A','N/A',{
                          tipo:data.roles[0].codrol,
                          description:data.roles[0].descripcion,
                      });
                      props.history.push(API.basename+"/Rimac");
                  } else {
                      result.message = "El usuario no existe en nuestra base de datos";
                      callback(result);
                  }
              } else {
                // logica de produccion
                  if (response.data.code === undefined){
                      this.setSessionState('N/A','N/A',{
                          tipo:data.roles[0].codrol,
                          description:data.roles[0].descripcion,
                      });
                      props.history.push(API.basename+"/Rimac");
                  } else {
                      result.message = response.data.message;
                      callback(result);
                  }
              }
          });

  },
  /**
  * @author: lmarin
  * @date 04/05/2018
  * borra la session del usuario
  * */
  getSessionState: function(){
      // verificando si se ha creado un store de sesion
      if (localStorage.getItem('session_state') !== null){
          return JSON.parse(localStorage.getItem('session_state')).state;
      } else {
          return {};
      }
  },
  /**
  * @author: lmarin
  * @date 04/05/2018
  * borra la session del usuario
  **/
  setSessionState: function(email,name,result_data){
      localStorage.setItem(
          'session_state',
          JSON.stringify({
              state: {
                  email,
                  name,
                  result_data,
                  isLogin : true
              }
          })
      );
  }
};

export default sessionState;