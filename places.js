const places = (googleMapsPlaces) => {

  return (
    async function placesReturn(req, res) {
      if (!req.query || !req.query.q) {
        res.send('A query needs to be provided')
      }
      else {
        const query = req.query.q
        const gmpResults = await googleMapsPlaces(query)
        res.status(200).json(gmpResults.json.results);
      }
    }
  )
}

module.exports = places