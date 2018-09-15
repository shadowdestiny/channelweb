import React, {Component} from 'react';
import './Home.css'
import logo from '../../image/rimac-img-ppal.jpg';

import Cookies from 'universal-cookie';
import sessionState from "../../functions/sessionState";
const cookies = new Cookies();
class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.removeCookies();
    }
    removeCookies(){
        cookies.remove('component_findPolicyCertificate');
        cookies.remove('component_coverage');
        cookies.remove('component_inspection');
        cookies.remove('component_sinester');
        cookies.remove('component_aditionals_details');
        cookies.remove('component_findsinester');
        cookies.remove('_findsinester_selected');
        cookies.remove('_findsinester_results');
        cookies.remove('component_adjunterlivelihood');

        localStorage.removeItem("component_findsinester");
        localStorage.removeItem("component_findPolicyCertificate");
        localStorage.removeItem("component_adjunterlivelihood");
        localStorage.removeItem("component_sinester_storage");
        localStorage.removeItem("component_inspection");

    }
    componentWillMount() {
        // validando si el usuario se encuentra logueado
        sessionState.redirectLogin(this.props);
    }
    render() {
        return (
            <div className='Home col-md-6 col-md-offset-3'>
                <img className='img-responsive' src={logo}/>
            </div>
        );
    }
}

export default Home;
