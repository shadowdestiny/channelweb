import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './Routes';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

render(
    <Router>
        <AppRoutes/>
    </Router>,
    document.getElementById('root')
)
