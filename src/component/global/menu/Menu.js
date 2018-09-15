import React, {Component} from 'react';
//---
import './Menu.css';
import Category from './Category.js';
import API from '../../../config/API';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            expanded:''
        }

        if (window.innerWidth > 767) {
            visible: false
        } else {
            visible: false
        }

        this.handleExpanded = this.handleExpanded.bind(this);
    }


    handleClick(event) {
        event.preventDefault();
        this.setState({
            visible: !this.state.visible
        })
    }

    handleExpanded(pExpanded) {
        this.setState({
            expanded: pExpanded
        })

    }

    render() {
        return (

            <div className='Menu'>
                <div className='navbar-header'>
                    <button type='button' onClick={this.handleClick.bind(this)} className='navbar-toggle'
                            data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                </div>
                <ul className={this.state.visible ? 'visible' : 'no-visible'}>
                   {/* <Category name='Polizas' item={[{title: 'Buscar', url: '/buscarSiniestro'},
                        {title: 'Generar', url: '/generarPoliza'}]}
                        visible={this.state.expanded} handleExpanded={this.handleExpanded}
                    />*/}
                    <Category name='Siniestros' item={[{title: 'Registrar', url: API.basename + '/registrarSiniestro'},
                        {title: 'Buscar', url: API.basename +'/FindSinester'}]}
                        visible={this.state.expanded} handleExpanded={this.handleExpanded}
                    />
                   {/*} <Category name='Otros' item={[{title: 'otro1', url: '/otro1'},
                        {title: 'otro2', url: '/otro2'}]}
                         visible={this.state.expanded} handleExpanded={this.handleExpanded}
                />*/}
                </ul>
            </div>


        );
    }
}

export default Menu;
