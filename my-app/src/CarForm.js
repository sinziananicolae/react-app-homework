import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input.js'
// var axios = require('axios');
var _ = require('lodash');
var $ = require ('jquery')

class CarForm extends Component {
    constructor(props) {
        super()
        this.state = {
            car: props.editCar
        };
        this.saveCar = this.saveCar.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    saveCar(car) {
        var self = this;
        $.ajax({
            url: 'http://23.20.81.107/api/v1/car/1/?format=json',
            type: 'PUT',
            dataType:"json",
            data: car,
            success: function(data) {
                self.props.handleUpdate(data);
            }});
    }

    handleChangeText(event) {
        var elementLabel = event.target.getAttribute("data-label").toLowerCase();
        const copyCar = this.state.car;
        copyCar[elementLabel] = event.target.value;

        this.setState({
            car: copyCar
        });
    }

    handleChangeNumber(event) {
        var elementLabel = event.target.getAttribute("data-label").toLowerCase();
        const copyCar = this.state.car;
        copyCar[elementLabel] = parseFloat(event.target.value);

        this.setState({
            car: copyCar
        });
    }

    isFormValid() {
        var isValid = true;
        _.find(this.state.car, function(value) {
            if (value === "") {
                isValid = false;
                return;
            }
        });
        return isValid;
    }

    render() {
        var car = this.state.car;
        return (
            <div className="panel-body row form-horizontal">
                <div className="col-xs-6">
                    <Input value={car.name} label='Name' type='text' handleChange={this.handleChangeText}/>
                    <Input value={car.acceleration} label='Acceleration' type='number' handleChange={this.handleChangeNumber}/>
                    <Input value={car.cylinders} label='Cylinders' type='number' handleChange={this.handleChangeNumber}/>
                    <Input value={car.displacement} label='Displacement' type='number' handleChange={this.handleChangeNumber}/>
                </div>
                <div className="col-xs-6">
                    <Input value={car.horsepower} label='Horsepower' type='number' handleChange={this.handleChangeNumber}/>
                    <Input value={car.mpg} label='Mpg' type='number' handleChange={this.handleChangeNumber}/>
                    <Input value={car.weight} label='Weight' type='number' handleChange={this.handleChangeNumber}/>
                    <Input value={car.year} label='Year' type='number' handleChange={this.handleChangeNumber}/>
                </div>
                <div className="col-xs-12">
                    <button type="button" className="btn btn-success" onClick={() => this.saveCar(car)} disabled={!this.isFormValid()}>Save</button>
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
    }),
    handleUpdate: PropTypes.func.isRequired
}

export default CarForm;