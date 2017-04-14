var axios = require('axios');

axios.defaults.baseURL = 'http://23.20.81.107/api/v1';

export function GetCars(limit = 20, offset = 0) {
    return axios.get('/car?offset=' + offset + '&limit=' + limit + '&format=json');
}

export function UpdateCar(carId) {
    return axios.get('/car/' + carId + '/?format=json');
}