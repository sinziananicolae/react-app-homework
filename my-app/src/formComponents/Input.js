import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => (
    <div className="form-group col-sm-6">
        <label className="control-label col-sm-4" >{props.label}:</label>
        <div className="col-sm-6">
            <input type={props.type} className="form-control" defaultValue={props.value} onChange={(event) => props.handleChange(event, props.type)} data-label={props.label}/>
        </div>
    </div>
);

Input.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default Input;