import React, {Component} from 'react';
/*import './Home.css'*/
import CountrySelect from "../component/global/CountrySelect";

class Home extends Component {

    render() {
        return (
            <div className='Home col-md-6 col-md-offset-3'>
                <CountrySelect/>
            </div>
        );
    }
}

export default Home;
