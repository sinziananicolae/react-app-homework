import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event)
    }

    render() {
        var car = this.state.car;
        return (
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">Name:</label>
                <div className="col-sm-10">
                    <input type="input" className="form-control" value={car.name} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

Input.propTypes = {

}

export default Input;