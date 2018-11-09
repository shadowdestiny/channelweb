import React, {Component} from 'react';
// ---
import './Header.css';
// ---
import 'font-awesome/css/font-awesome.css';


class Header extends Component {
    constructor(props) {
        super(props);
    }
    onClickLogout(){

    }
    render() {
        return (
            <div id='wrapper'>
                <nav className='navbar navbar-default navbar-static-top' role='navigation' style={{marginBottom: 0}}>


                </nav>
            </div>
        );
    }
}

export default Header;
