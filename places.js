const places = (googleMapsPlaces) => {
  const errorMessage = 'A user query needs a query, lat : long, and radius to be provided'
  return (
    async function placesReturn(req, res, next) {
      const googlePlacesQuery = {}
      const requiredProps = [
        'query',
        'location',
        'radius',
      ]
      const validProps = [
        'query',
        'language',
        'location',
        'radius',
        'minprice',
        'maxprice',
        'opennow',
        'type',
        'pagetoken',
        'region',
      ]
      const userQuery = req.query
      if (!requiredProps.every(e => userQuery.hasOwnProperty(e))) {
        res.send(errorMessage)
        return next()
      }
      // add valid request query values to places query
      validProps.forEach(vp => {
        if (userQuery.hasOwnProperty(vp)) {
          googlePlacesQuery[vp] = userQuery[vp]
        }
      })
      // convert values
      Object.assign(
        googlePlacesQuery,
        { radius: Number(googlePlacesQuery.radius) }
      )
      console.log(googlePlacesQuery)
      const gmpResults = await googleMapsPlaces(googlePlacesQuery)
      res.status(200).json(gmpResults.json.results[0]);
    }
  )
}

module.exports = places
