
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for Express config
const pubDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(pubDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Sean Kurnas'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Sean Kurnas'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Sean Kurnas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error){
            return res.send({ error })
        }
        forecast(lat, long, (error, {summary, temp, pProb}) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                location,
                summary: summary,
                temperature: temp,
                chanceOfPrecip: pProb,
                address: req.query.address
            })
        })
    })



})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sean Kurnas',
        errorMessage: 'help page not found'
    });
})

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sean Kurnas',
        errorMessage: 'page not found'
    })
})


app.listen(3000, () =>{
    console.log('server is up on port 3000')
})