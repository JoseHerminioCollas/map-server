const config = require('./config')
// places request to Google Maps Service
const googleMapsClient = require('@google/maps').createClient({
  key: config.gmkey,
  Promise: Promise,
})

function googleMapsPlaces(query, language = 'en') {
  return googleMapsClient.places({
    query,
    language,
  })
    .asPromise()
}

module.exports = googleMapsPlaces
