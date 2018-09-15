import React, {Component} from 'react';
import MenuItem from './MenuItem.js';
// ---
import './Category.css';

class Category extends Component {

    constructor(props) {
        super(props);
      this.handleClick= this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.handleExpanded(event.target.id)
    }

    render() {
        return (
            <div className='Category'>
                <li>
                    <h3 onClick={this.handleClick.bind(this)} id={this.props.name} >{this.props.name}</h3>
                    <ul className={this.props.name === this.props.visible ? 'visible' : 'no-visible'}>
                        {this.props.item.map((item) => {
                            return <MenuItem name={item.title} key={item.title} url={item.url}/>
                        })}
                    </ul>
                </li>
            </div>

        );
    }
}

export default Category;