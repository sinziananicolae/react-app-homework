import React, { Component } from 'react';
var axios = require('axios');
import Pagination from './Pagination.js'
import CarForm from './CarForm.js'
import carPic from './car.png';
var _ = require('lodash');

class CarsList extends Component {
    constructor() {
        super()
        this.state = {
            carsList: [],
            meta: {}
        };
        this.onPageChange = this.onPageChange.bind(this);
        this.setEditOpen = this.setEditOpen.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentWillMount() {
        var self = this;
        axios.get('http://23.20.81.107/api/v1/car/?format=json').then(function (response) {
            self.setState({
                carsList: response.data.objects,
                meta: response.data.meta
            });
        });
    }


    onPageChange(page) {
        var self = this;
        var offset = (page - 1) * this.state.meta.limit;
        axios.get('http://23.20.81.107/api/v1/car/?offset=' + offset + '&limit=' + this.state.meta.limit + '&format=json').then(function (response) {
            self.setState({
                carsList: response.data.objects,
                meta: response.data.meta
            });
        });
    }

    setEditOpen(car, i) {
        var stateCopy = Object.assign([], this.state.carsList);
        stateCopy[i].isEditOpen = !stateCopy[i].isEditOpen;
        this.setState({
            carsList: stateCopy
        });
    }

    handleUpdate(car) {
        var stateCopy = Object.assign([], this.state.carsList);
        var i = _.findIndex(this.state.carsList, function(stateCar) { return stateCar.id === car.id; });

        stateCopy[i] = car;
        this.setState({
            carsList: stateCopy
        });
    }

    render() {
        return (
            <div className="list-body">
                <Pagination limit={this.state.meta.limit} total={this.state.meta.total_count} offset={this.state.meta.offset} onPageChange={this.onPageChange} />
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    {this.state.carsList.map((car, index) => (
                        <div key={index}>
                            <div className="panel panel-default">
                                <div className="panel-heading row m-0" role="tab" id={"headingOne" + index}>
                                    <div className="col-xs-6">
                                        <div>
                                            <h4><b>{car.name}</b> <a role="button" onClick={() => this.setEditOpen(car, index)} data-toggle="collapse" data-parent="#accordion" href={"#collapseOne" + index} aria-expanded="true" aria-controls={"collapseOne" + index}>
                                                <span className="glyphicon glyphicon-pencil"></span>
                                            </a></h4>
                                            <img src={carPic} className="" alt="car" />
                                        </div>
                                    </div>
                                    <div className="col-xs-6 m-t-15">
                                        <div><b>Acceleration: </b> {car.acceleration}</div>
                                        <div><b>Cylinders: </b> {car.cylinders}</div>
                                        <div><b>Displacement: </b> {car.displacement}</div>
                                        <div><b>Horsepower: </b> {car.horsepower}</div>
                                        <div><b>Mpg: </b> {car.mpg}</div>
                                        <div><b>Weight: </b> {car.weight}</div>
                                        <div><b>Year: </b> {car.year}</div>
                                    </div>
                                </div>
                                {car.isEditOpen ? <div id={"collapseOne" + index} className="panel-collapse collapse in" role="tabpanel" aria-labelledby={"headingOne" + index}>
                                    <CarForm editCar={car} handleUpdate={this.handleUpdate} />
                                </div> : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default CarsList;