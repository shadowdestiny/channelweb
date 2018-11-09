import React, {Component} from 'react';
import PropTypes from 'prop-types';

// ---
import Content from './global/Content';

// ---
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {


    static propTypes = {
        children: PropTypes.object.isRequired
    };


    render() {
        const {children} = this.props;
        return (
            <div className='row'>
                <div className='col-lg-12'>
                    <Content body={children}/>
                </div>
            </div>
        );
    }
}

export default App;