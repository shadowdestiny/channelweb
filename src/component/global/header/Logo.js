import React, { Component } from 'react';
//---
import logo from '../../image/rimac-logo.png';
//---
import '../../css/global/Logo.css';
import {Link} from 'react-router-dom';


class Logo extends Component {
  render() {
    return (
<div id='wrapper'>
        <nav className='navbar navbar-default navbar-static-top' role='navigation' style={{marginBottom: 0}}>
            <div className='navbar-header'>
                <div className='Logo'>
                     <a href='Home.js'> <img src={logo} alt='logo'/> </a>
               </div>
            </div>
        </nav>
    </div>
    );
  }
}

export default Logo;
