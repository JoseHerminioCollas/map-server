const express = require('express')
const places = require('./places')
const config = require('./config')

const googleMapsClient = require('@google/maps').createClient({
  key: config.gmkey,
  Promise: Promise,
})

const app = express()
app.get('/places', places)

app.get('/place', (req, res) => {
  googleMapsClient.findPlace({
    input: 'soup',
    inputtype: 'textquery',
    language: 'en',
    fields: [
      'name', 'formatted_address', 'geometry', 'geometry/location', 'geometry/location/lat',
      'geometry/location/lng', 'geometry/viewport', 'geometry/viewport/northeast',
      'geometry/viewport/northeast/lat', 'geometry/viewport/northeast/lng',
      'geometry/viewport/southwest', 'geometry/viewport/southwest/lat',
      'geometry/viewport/southwest/lng', 'icon',
      'permanently_closed', 'photos', 'place_id', 'types',
      'opening_hours', 'price_level', 'rating', 'plus_code'
    ]
  })
    .asPromise()
    .then(function (response) {
      res
      .status(200)
      .send(response.json.candidates)
      .end()
    })
    .then(() => 1, () => 2);
  })

app.get('/', (req, res) => {
  googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function (err, response) {
    if (!err) {
      googleMapsClient.geocode({
        address: '1600 Amphitheatre Parkway, Mountain View, CA'
      }, function (err, response) {
        if (!err) {
          const str = JSON.stringify(response.json.results)
          res
            .status(200)
            .send(str)
            .end()
        }
      })
    }
  })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
