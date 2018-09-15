import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MenuItem extends Component {

    render() {

        return (
            <div className='Category'>
                <li>
                    <Link to={this.props.url}>{this.props.name}</Link>
                </li>
            </div>
        );
    }
}

export default MenuItem;