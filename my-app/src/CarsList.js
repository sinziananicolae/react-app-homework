import React, { Component } from 'react';
var axios = require('axios');
import Pagination from './Pagination.js' 

class CarsList extends Component {
    constructor() {
        super()
        this.state = {
            carsList : [],
            meta: {}
        };
        this.onPageChange = this.onPageChange.bind(this);
    }
    
    componentWillMount() {
        var self = this;
        axios.get('http://23.20.81.107/api/v1/car/?format=json').then(function(response) {
            self.setState({
                carsList : response.data.objects,
                meta: response.data.meta});
        });
    }


    onPageChange(page) {
        var self = this;
        var offset = (page - 1) * this.state.meta.limit;
        axios.get('http://23.20.81.107/api/v1/car/?offset=' + offset + '&limit=' + this.state.meta.limit + '&format=json').then(function(response) {
            self.setState({
                carsList : response.data.objects,
                meta: response.data.meta});
        });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.carsList.map(function (car, index) {
                        return <li key={index}>{car.name}</li>
                    })}
                </ul>
                <Pagination limit={this.state.meta.limit} total={this.state.meta.total_count} offset={this.state.meta.offset} onPageChange={this.onPageChange} />
            </div>
        );
    }
}

export default CarsList;