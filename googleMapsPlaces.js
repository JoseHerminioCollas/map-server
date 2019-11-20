const config = require('./config')
// places request to Google Maps Service
const googleMapsClient = require('@google/maps').createClient({
  key: config.gmkey,
  Promise: Promise,
})

function googleMapsPlaces(userQuery = {}) {
  if (!userQuery.query) throw 'query must be provided'
  return googleMapsClient.places(userQuery)
    .asPromise()
}

module.exports = googleMapsPlaces
