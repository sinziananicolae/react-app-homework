import React, { Component } from 'react';
import Pagination from '../commonComponents/Pagination.js'
import CarForm from './CarForm.js'
import carPic from '../content/img/car.png';
import { GetCars } from '../services/services.js'
var _ = require('lodash');
var $ = require('jquery');

class CarsList extends Component {
    constructor() {
        super()

        this.state = {
            carsList: [],
            meta: {}
        };

        this.getCars = this.getCars.bind(this);
        this.setEditOpen = this.setEditOpen.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.handleCarUpdate = this.handleCarUpdate.bind(this);

    }

    getCars(limit, offset) {
        var self = this;
        GetCars(limit, offset).then(function (response) {
            self.setState({
                carsList: response.data.objects,
                meta: response.data.meta
            });
        });
    }

    componentWillMount() {
        this.getCars();
    }

    onPaginationChange(limit, offset) {
        this.getCars(limit, offset);
    }

    setEditOpen(car, i) {
        var stateCopy = Object.assign([], this.state.carsList);
        stateCopy[i].isEditOpen = !stateCopy[i].isEditOpen;
        this.setState({
            carsList: stateCopy
        });

        setTimeout(function () {
            var $collapsible = $('#collapseOne' + i); // Let's be thorough
            $collapsible.collapse({
                toggle: true
            });
        }, 100);

    }

    handleCarUpdate(car) {
        var stateCopy = Object.assign([], this.state.carsList);
        var i = _.findIndex(this.state.carsList, function (stateCar) { return stateCar.id === car.id; });

        stateCopy[i] = car;
        this.setState({
            carsList: stateCopy
        });
    }

    render() {
        return (
            <div className="list-body">

                <Pagination limit={this.state.meta.limit} total={this.state.meta.total_count} offset={this.state.meta.offset} maxSize={5} onPaginationChange={this.onPaginationChange} />

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
                                {car.isEditOpen ? <div id={"collapseOne" + index} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"headingOne" + index}>
                                    <CarForm editCar={car} handleUpdate={this.handleCarUpdate} />
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