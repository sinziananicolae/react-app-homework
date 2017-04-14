import PropTypes from 'prop-types';

export const CarModel = {
    Name: {
        propType: PropTypes.string.isRequired,
        label: "Name",
        objProp: "name",
        inputType: "text"
    },
    Acceleration: {
        propType: PropTypes.number.isRequired,
        label: "Acceleration",
        objProp: "acceleration",
        inputType: "number"
    },
    Cylinders: {
        propType: PropTypes.number.isRequired,
        label: "Cylinders",
        objProp: "cylinders",
        inputType: "number"
    },
    Displacement: {
        propType: PropTypes.number.isRequired,
        label: "Displacement",
        objProp: "displacement",
        inputType: "number"
    },
    Horsepower: {
        propType: PropTypes.number.isRequired,
        label: "Horsepower",
        objProp: "horsepower",
        inputType: "number"
    },
    Mpg: {
        propType: PropTypes.number.isRequired,
        label: "Mpg",
        objProp: "mpg",
        inputType: "number"
    },
    Weight: {
        propType: PropTypes.number.isRequired,
        label: "Weight",
        objProp: "weight",
        inputType: "number"
    },
    Year: {
        propType: PropTypes.number.isRequired,
        label: "Year",
        objProp: "year",
        inputType: "number"
    }
}