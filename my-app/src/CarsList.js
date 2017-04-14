import React, { Component } from 'react';
var axios = require('axios');

class CarsList extends Component {
    constructor() {
        super()
        
        this.showCarName = this.showCarName.bind(this);
    }

    
    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts/1').then(function(response) {
            console.log(response);
        });
        
        this.state = {
            cars: [
                { name: "John", id: 120, age: 22, gender: "male" },
                { name: "Beth", id: 443, age: 24, gender: "female" },
                { name: "Jane", id: 510, age: 19, gender: "female" }
            ]
        };
    }


    showCarName(car) {
        console.log(car);
    }

    render() {
        return (
            <ul>
                {this.state.cars.map(function (car, index) {
                    return <li key={index} onClick={ this.showCarName.bind(this, car) }>{car.name}</li>
                }, this)}
            </ul>
        );
    }
}

export default CarsList;