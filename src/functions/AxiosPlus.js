import axios from 'axios';
import APIs from "../config/API";
import ip from "ip";
import moment from "moment";
const AxiosPlus = {
    ajax : function(){
        console.log(arguments);
        let url = arguments[0];
        let params = {};
        let adittionalParams = {};
        let callback = (response)=>{};

        if (arguments.length === 4 ){
            params = arguments[1];
            adittionalParams = arguments[2];
            callback = arguments[3];
        } else if (arguments.length === 3) {
            params = arguments[1];
            callback = arguments[2];
        } else if (arguments.length === 2) {
            params = arguments[1];
        }

        /*if (params.tipocanal === undefined){
            params.tipocanal = "CNL"
        }

        if (params.idusuario === undefined){
            params.idusuario = "canalweb"
        }

        if (params.auditoria === undefined){
            params.auditoria = {
                ip:ip.address(),
                usuario:"canalweb",
                fechaTrans:moment().format('Y/MM/DD'),
                horaTrans:moment().format('HH:mm:ss')
            }
        }*/

        let API = APIs;
        switch (API.test){
            case "Test":
                axios.get(eval(url+"Test")).then((response) => {
                    callback(response);
                });
                break;
            case "Local":
                axios.post(eval(url+"Local"),params,adittionalParams).then((response) => {
                    callback(response);
                });
                break;
            case "Prod":
                let options = {};
                if (url.search('Datapower') > 0) {

                    options = {
                        url: APIs.security.url + (eval(url)),
                        method: 'post',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Authorization': APIs.security.authBasicToken,
                            'Accept': '*/*',
                            'Referer': false
                        }
                    }
                    axios.request(options).then((rs) => {
                        if (adittionalParams.headers !== undefined)
                            Object.assign(adittionalParams.headers, {
                                'Access-Control-Allow-Origin': '*',
                                'Authorization': 'Bearer ' + rs.data.access_token,
                                'content-type': 'application/json'
                            });
                        else
                            adittionalParams.headers = {
                                'Access-Control-Allow-Origin': '*',
                                'Authorization': 'Bearer ' + rs.data.access_token,
                                'content-type': 'application/json'
                            };
                        axios.post(APIs.security.resource + eval(url), params, {headers:adittionalParams.headers}).then((response) => {
                            callback(response);
                        });
                    }).catch(function (error) {
                        if (error.response) {
                            console.log(error.response.headers);
                        }
                        else if (error.request) {
                            console.log(error.request);
                        }
                        else {
                            console.log(error.message);
                        }
                        console.log(error.config);
                    });
                } else
                    axios.post(eval(url),params,adittionalParams).then((response) => {
                        callback(response);
                    });
                break;
        }
    }
};
export default AxiosPlus;
