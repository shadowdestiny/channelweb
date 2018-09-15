import React, {Component} from 'react';
// ---
import logo from '../../../image/rimac-logo.png';
// ---
import './Header.css';
// ---
import 'font-awesome/css/font-awesome.css';
import sessionState from "../../../functions/sessionState";


class Header extends Component {
    constructor(props) {
        super(props);
    }
    onClickLogout(){
        sessionState.logout(this.props);
    }
    render() {
        return (
            <div id='wrapper'>
                <nav className='navbar navbar-default navbar-static-top' role='navigation' style={{marginBottom: 0}}>
                    <div className='navbar-header'>
                        <div className='Logo'>
                            <a href='Rimac'> <img src={logo} alt='logo'/> </a>
                        </div>
                    </div>
                    {sessionState.isLogin() ? 
                    <div className='nav navbar-top-links navbar-right'>
                        {sessionState.getTypeSessionContact().label}
                        <a href='javascript:void(0)' onClick={this.onClickLogout.bind(this)}><i className='fa fa-sign-out fa-fw'></i> Logout </a>
                    </div> : ''}

                </nav>
            </div>
        );
    }
}

export default Header;
