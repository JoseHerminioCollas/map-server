const places = (googleMapsPlaces) => {

  return (
    async function placesReturn(req, res) {
      if (!req.query || !req.query.q) {
        res.send('No query needs to be provided')
      }
      else {
        const query = req.query.q
        const gmpResults = await googleMapsPlaces(query)
        res.status(200).send(gmpResults.json.results);
      }
    }
  )
}

module.exports = places