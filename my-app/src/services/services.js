var $ = require('jquery')

const baseUrl = 'http://23.20.81.107/api/v1';

export const CarService = {
    GetCars: function(limit = 20, offset = 0) {
		return $.get( baseUrl + '/car/?offset=' + offset + '&limit=' + limit + '&format=json');
    },

    UpdateCar: function(carId, car) {
        return $.ajax({
            url: baseUrl + '/car/' + carId + '/?format=json',
            type: 'PUT',
            dataType:"json",
            data: car
        });
    }
}