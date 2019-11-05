// places request to Google Maps Service
function googleMapsPlaces(query, language = 'en') {
  return googleMapsClient.places({
    query,
    language,
  })
    .asPromise()
}

module.exports = googleMapsPlaces
