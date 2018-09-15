import React, { Component } from 'react';
import API from '../../config/API';
import sessionState from "../../functions/sessionState";

class Redirects extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        sessionState.redirectLogin(this.props);
        this.props.history.push(API.basename+"/Rimac");
    }

    render(){
        return (
            <div></div>
        )
    }
}

export default Redirects;