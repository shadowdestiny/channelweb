import React, {Component} from 'react';
import PropTypes from 'prop-types';

// ---
import Header from './global/header/Header';
import Menu from './global/menu/Menu';
import Content from './global/Content';
import Footer from './global/Footer';
// ---
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import sessionState from "../functions/sessionState";

class App extends Component {


    static propTypes = {
        children: PropTypes.object.isRequired
    };


    render() {
        const {children} = this.props;
        return (

                <div id='wrapper'>
                    <nav className='navbar-static-top' role='navigation'>
                        <Header/>
                    </nav>
                    {sessionState.isLogin() ? <div className='navbar-default sidebar' role='navigation'>
                        <div className='sidebar-nav navbar-collapse'>
                            <Menu/>
                        </div>
                    </div> : ''}
                    <div id='page-wrapper' className={!sessionState.isLogin() ? 'no-login':''}>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <Content body={children}/>
                            </div>
                        </div>
                    </div>
                    <div className='panel-footer'>
                        <Footer/>
                    </div>
                </div>

        );
    }
}

export default App;