const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon=' + long + '&appid=40f04c495e45492e4ef5af1662951bd3'

    request ({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if (body.message && response.body.cod == 400){
            callback('Unable to find location. Try another longitude and latitude', undefined);
        }else{
            callback(undefined, 'today is a ' + body.daily[0].weather[0].description + '. And  it is currently ' + body.current.temp + ' degrees out there',
            );
        }
    }); 


}

module.exports = forecast;