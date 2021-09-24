'use strict';
// Create a basuc Express server. Verify it runs without errors
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
// Use a require statement to read the weather data from the weather.json file
// const weatherData = require('./data/weather.json');
const cors = require('cors');
const WEATHER_APIKEY = process.env.WEATHER_APIKEY;
const axios = require('axios')

app.use(cors());

// Create a class for Forecast, that has properties of date and description
class Forecast {
  constructor(date, description) {
    this.date = date,
    this.description = description
  }
}

app.get('/', (request, response)=> {
  response.status(200).send('Test')
});

// Create an API endpoitn of /weather that processes a GET request that contains lat, lon and searchQuery information.
app.get('/weatherData', async (request, response) => {
  // response.send('Hello from server')
  const q = request.query
  const lat = q.lat;
  const lon = q.lon;
  const dayData = [];

  let weatherApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_APIKEY}&lat=${lat}&lon=${lon}&units=I&days=5`;

  const liveWeatherData = await axios.get(weatherApiUrl);

  let current = liveWeatherData.data
    // console.log(current)
  if(current){
    for(let day of current.data){
      dayData.push(new Forecast(day.datetime, day.weather.description));
    }
    console.log(dayData)
    response.send(dayData)
  }else{
    response.send(`No weather data available from ${searchQuery}`)
  }
});

app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`))