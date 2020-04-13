const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
//setup to para sa hbs
app.set('view engine', 'hbs');
//para mabago yung view na folder na ngayon ay template
app.set('views', viewsPath);
//para mag ka roon ng partials  
hbs.registerPartials(partialsPath);

//setup directory to serve
app.use(express.static(publicDirPath));

app.get('',(req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Bryan Bang'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title:'Help Page',
        name: 'Bryan Bang'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bryan Bang'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location: placeName,
                address: req.query.address,
            });
        });
    });

});

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Bryan bang'
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Bryan bang'
    });
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});