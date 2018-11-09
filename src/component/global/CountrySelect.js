import React, {Component} from 'react';
import Select from "react-select";
import "react-select/dist/react-select.css";
import axios from 'axios';

class CountrySelect extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            countries       : [],
            country_selected : 'Seleccione'
        };
    }

    componentWillMount() {
        // validando si el usuario se encuentra logueado

        this.setState({
            countries : [{
                value : 1,
                label : "uno",
            }]
        });

        axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
            console.log(response.data);

            let countries = [];

            response.data.forEach(function(element) {
                countries.push({
                    label:element.name,
                    value:element.numericCode
                });
            });

            this.setState({
                countries
            });
        });
    }

    saveCountry(data) {
        this.setState({
            country_selected: data
        });
    }

    render() {
        return (
            <div>
                <label htmlFor="countrySelect">Paises</label>
                <Select
                    id="countrySelect"
                    autoFocus
                    simpleValue
                    name="countrySelect"
                    options={this.state.countries}
                    value={this.state.country_selected}
                    placeholder="Seleccione un pais"
                    onChange={this.saveCountry.bind(this)}
                />
            </div>
        );
    }
}

export default CountrySelect;
