const googleMapsPlaces = require('./googleMapsPlaces')

async function places(req, res) {
  const gmpResults = await googleMapsPlaces('Soup')
  res.status(200).send(gmpResults.json.results[0].name);
}

module.exports = places