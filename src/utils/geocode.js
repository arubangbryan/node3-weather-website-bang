const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVkZWVubW9rbyIsImEiOiJjazhzcTBtdnYwc2JwM21wbW9qNHJnN29iIn0.43GZBe13qYUbzRzTAtiSEQ&limit=1';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if (body.features.length === 0){
            callback('Unable to find location. Try another search', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            });
        }
    });
};


module.exports = geoCode;