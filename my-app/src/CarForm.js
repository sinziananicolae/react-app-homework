import React, { Component } from 'react';
import PropTypes from 'prop-types';
var axios = require('axios');

class CarForm extends Component {
    constructor() {
        super()
        this.state = {
            car: {}
        };
        this.saveCar = this.saveCar.bind(this);
    }

    componentWillMount() {
        this.setState({ car: this.props.editCar });
    }

    saveCar(car) {
    }

    handleChange(event) {
        this.setState({ car: { name: event.target.value } });
    }

    render() {
        var car = this.state.car;
        return (
            <div className="panel-body row form-horizontal">
                <div className="col-xs-6">
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="name">Name:</label>
                        <div className="col-sm-10">
                            <input type="input" className="form-control" value={car.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="acceleration">Acceleration: </label> <input type="input" className="form-control" value={car.acceleration} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cylinders">Cylinders: </label> <input type="input" className="form-control" value={car.cylinders} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="displacement">Displacement: </label> <input type="input" className="form-control" value={car.displacement} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="col-xs-6">
                    <div><b>Horsepower: </b> {car.horsepower}</div>
                    <div><b>Mpg: </b> {car.mpg}</div>
                    <div><b>Weight: </b> {car.weight}</div>
                    <div><b>Year: </b> {car.year}</div>
                </div>
                <div className="col-xs-12">
                    <button type="button" className="btn btn-success">Save</button>
                </div>
            </div>
        );
    }
}

CarForm.propTypes = {
    editCar: PropTypes.shape({
        name: PropTypes.string.isRequired,
        acceleration: PropTypes.number.isRequired,
        cylinders: PropTypes.number.isRequired,
        displacement: PropTypes.number.isRequired,
        horsepower: PropTypes.number.isRequired,
        mpg: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
    })
}

export default CarForm;