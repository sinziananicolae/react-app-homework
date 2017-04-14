import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../formComponents/Input.js'
import { CarService } from '../services/services.js'
import { CarModel } from './CarModel.js'

var _ = require('lodash')
var $ = require('jquery')

class CarForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            car: props.editCar,
            loading: false
        };

        this.saveCar = this.saveCar.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    /**
     * Saves the edited car element and sends the parent the new object in order to update the carList
     * 
     * @param car: the form car object
     */
    saveCar(car) {
        var self = this;
        // CarService.UpdateCar(car.id).then(function(response) {
        //     self.props.handleUpdate(response);
        // });
        self.setState({ loading: true });

        $.ajax({
            url: 'http://23.20.81.107/api/v1/car/' + car.id + '/?format=json',
            type: 'PUT',
            dataType:"json",
            data: car,
            success: function(data) {
                self.props.handleUpdate(data);
                self.setState({ loading: false });
            }});
    }

    /**
     * Generic onChange input event handler for text and number inputs. The key of the element is
     * insterted in the <input> tag with the attr data-label (sent within props from the form)
     * @param event: the onChange event within the input element
     * @param type: input type (text / number)
     */
    handleChangeInput(event, type) {
        var elementLabel = event.target.getAttribute("data-label").toLowerCase();
        const copyCar = this.state.car;

        if (type === "number") {
            copyCar[elementLabel] = parseFloat(event.target.value);
        } else if (type === "text") {
            copyCar[elementLabel] = event.target.value;
        }

        this.setState({
            car: copyCar
        });
    }

    /**
     * Checks if all fields of the car object are filled in
     */
    isFormValid() {
        var isValid = true;
        _.find(this.state.car, (value) => {
            if (value === "") {
                isValid = false;
                return;
            }
        });
        return isValid;
    }

    render() {
        var car = this.state.car;
        var carModel = _.values(CarModel);
        return (
            <div className="panel-body row form-horizontal">
                {
                    carModel.map((property, i) => (
                        <Input key={i} value={ car[property.objProp] } label={ property.label } 
                            type={ property.inputType } handleChange={ this.handleChangeInput } />
                    ))
                }
                <div className="col-xs-12">
                    <button type="button" className="btn btn-success" onClick={() => this.saveCar(car)} disabled={!this.isFormValid()}>
                        Save { this.state.loading ? <i className="glyphicon glyphicon-refresh loading"></i> : null }
                    </button>
                </div>
            </div>
        );
    }
}

/**
 * Creates the editCar propTypes object based on the CarModel provided
 */
const carPropTypes = function() {
    var editCarProps = {};
    _.forEach(CarModel, (property) => {
        editCarProps[property.objProp] = property.propType;
    });
    return editCarProps;
}()

CarForm.propTypes = {
    editCar: PropTypes.shape(carPropTypes).isRequired,
    handleUpdate: PropTypes.func.isRequired
}

export default CarForm;