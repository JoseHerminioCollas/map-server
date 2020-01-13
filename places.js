const places = (googleMapsPlaces) => {

  return (
    async function placesReturn(req, res) {
      // query latLng radiuss
      const query = req.query.query
      const location = req.query.location
      const radius = req.query.radius
      if (!req.query |
        !req.query.query ||
        !req.query.location ||
        !req.query.radius) {
        res.send('A user query needs a query, lat : long, and radius to be provided')
      }
      else {
        const userQuery = {
          query,
          location,
          radius: Number(radius)
        }
        const gmpResults = await googleMapsPlaces(userQuery)
        res.status(200).json(gmpResults.json.results);
      }
    }
  )
}

module.exports = places
// req.query.radiusreq.query.radius