const places = (googleMapsPlaces) => {

  return (
    async function placesReturn(req, res) {
      const gmpResults = await googleMapsPlaces('Soup')
      res.status(200).send(gmpResults.json.results[0].name);
    }
  )
}

module.exports = places