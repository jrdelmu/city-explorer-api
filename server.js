'use strict';
// Create a basuc Exoress server. Verify it runs without errors
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// Use a require statement to read the weather data from the weather.json file
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT || 3000;
app.use(cors());


app.get('/', (request, response)=> {
  response.status(200).send('Test')
});

// Create an API endpoitn of /weather that processes a GET request that contains lat, lon and searchQuery information.
app.get('/weatherData', (request, response) => {
    try{let city = request.query.searchquery;
    const lat = request.query.lat;
    const lon = request.query.lon;

    if(city){
      city=city.toLowerCase();
    };

    const weatherQuery = weatherData.find(searchedCity => searchedCity.city_name.toLowerCase() === city && searchedCity.lat === lat && searchedCity.lon === lon);}
});

app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`))


// '/weatherData', (request, response) => {
//   try{
//     let city = request.query.searchquery;
//     const lat = request.query.lat;
//     const lon = request.query.lon;

//     if(city){
//       city=city.toLowerCase();
//     };

    
//   }
// }