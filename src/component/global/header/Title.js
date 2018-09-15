import React, {Component} from 'react';
//---
import logo from '../../image/rimac-logo.png';
//---
import '../../css/global/Header.css';


class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="Header-logo">
                    <img src={logo} alt="logo"/>
                    <h2> Canal Web </h2>
                </div>
            </div>
        );
    }
}

export default Header;
