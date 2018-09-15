import React from 'react';
import {Route, Switch, Router} from 'react-router-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom'
/*import { syncHistoryWithStore } from 'react-router-redux';*/

// ---
import App from './component/App';
import Home from './component/global/Home';
import FindPolicyCertificate from './component/rimac/policy/FindPolicyCertificate';
import Inspection from './component/rimac/inspection/Inspection';
import Sinester from './component/rimac/sinester/Sinester';
import AdditionalData from './component/rimac/AdditionalData/AdditionalData';
import Coverage from './component/rimac/Coverage/Coverage';
import Page404 from './component/global/error/Page404';
import RegisterSinester from "./component/rimac/AdditionalData/RegisterSinester";
import AdjunterLivelihood from "./component/rimac/FindSinester/AdjunterLivelihood";
import FindSinester from "./component/rimac/FindSinester/FindSinester";
import Redirects from "./component/global/Redirects";
import API from './config/API';

import {Provider} from 'react-redux';
import store from './store/store';
import { CookiesProvider } from 'react-cookie';
import Login from "./component/global/Login";
const baseurl = API.basename;
const AppRoutes = () =>

    <Provider store={store} >
        <CookiesProvider>
            <App>
                <Switch>
                    <Route exact path={`/`} component={Redirects}/>
                    <Route exact path={`${baseurl}/Login`} component={Login}/>
                    <Route exact path={`${baseurl}/`} component={Home}/>
                    <Route exact path={`${baseurl}/Rimac`} component={Home}/>
                    <Route exact path={`${baseurl}/registrarSiniestro`} component={FindPolicyCertificate}/>
                    <Route exact path={`${baseurl}/Inspection`} component={Inspection}/>
                    <Route exact path={`${baseurl}/Sinester`} component={Sinester}/>
                    <Route exact path={`${baseurl}/AdditionalData`} component={AdditionalData}/>
                    <Route exact path={`${baseurl}/RegisterSinester`} component={RegisterSinester}/>
                    <Route exact path={`${baseurl}/AdjunterLivelihood`} component={AdjunterLivelihood}/>
                    <Route exact path={`${baseurl}/Coverage`} component={Coverage}/>
                    <Route exact path={`${baseurl}/FindSinester`} component={FindSinester}/>
                    <Route component={Page404}/>
                </Switch>
            </App>
        </CookiesProvider>
    </Provider>;

export default AppRoutes;