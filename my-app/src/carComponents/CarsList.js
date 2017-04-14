import React, { Component } from 'react';
import Pagination from '../commonComponents/Pagination.js'
import CarForm from './CarForm.js'
import carPic from '../content/img/car.png';
import { CarService } from '../services/services.js'
import { CarModel } from './CarModel.js'
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

    /**
     * Retrieves the list of <limit> cars from position <offset> and updates the state
     * 
     * @param limit: number of elements per page
     * @param offset: startIndex for the list of <limit> elements
     */
    getCars(limit, offset) {
        var self = this;
        CarService.GetCars(limit, offset).then(function (response) {
            self.setState({
                carsList: response.data.objects,
                meta: response.data.meta
            });
        });
    }

    componentWillMount() {
        this.getCars();
    }

    /**
     * Callback function (sent in Pagination component) which refreshes the list of items
     * depending on the <limit> and <offset> params
     * 
     */
    onPaginationChange(limit, offset) {
        this.getCars(limit, offset);
    }

    /**
     * Opens / Closes the edit Form when the user click on the icon.
     * If the <isEditOpen> param is set to false, the Form component is removed from the DOM
     * @param car: car to be edited
     * @param i: key of the car
     */
    setEditOpen(car, i) {
        var stateCopy = Object.assign([], this.state.carsList);
        stateCopy[i].isEditOpen = !stateCopy[i].isEditOpen;
        this.setState({
            carsList: stateCopy
        });

        setTimeout(function () {
            var $collapsible = $('#collapseOne' + i);
            $collapsible.collapse({
                toggle: true
            });
        }, 100);

    }

    /**
     * Callback function (sent in Form component) which refreshes the edited car
     * with the new value received from the server after Save
     * @param car: the new car element
     */
    handleCarUpdate(car) {
        var stateCopy = Object.assign([], this.state.carsList);
        var i = _.findIndex(this.state.carsList, function (stateCar) { return stateCar.id === car.id; });

        stateCopy[i] = car;
        this.setState({
            carsList: stateCopy
        });
    }

    render() {
        var carModel =  _.values(CarModel);

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
                                            <h4><b>{car.name}</b> <a role="button" onClick={() => this.setEditOpen(car, index)} data-toggle="collapse" data-parent="#accordion"
                                                href={"#collapseOne" + index} aria-expanded="true" aria-controls={"collapseOne" + index}>
                                                
                                                { car.isEditOpen ? <span className="glyphicon glyphicon-floppy-remove" title="Close Edit"></span> : <span className="glyphicon glyphicon-pencil" title="Edit Car"></span>}
                                                </a>
                                            </h4>
                                            <img src={carPic} className="" alt="car" />
                                        </div>
                                    </div>
                                    <div className="col-xs-6 m-t-15">
                                        {
                                            carModel.map((property, i) => (
                                                 property.label !== "Name" ? <div key={i}><b>{ property.label }: </b> {car[property.objProp]} </div> : null
                                            ))
                                        }
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