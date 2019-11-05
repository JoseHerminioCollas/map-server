const mapPlaces = (googleMapsClient) => {
  return (req, res) => {
    googleMapsClient.places({
      query: 'wood store',
      language: 'en',
    })
      .asPromise()
      .then(function (response) {
        res
          .status(200)
          .send(response.json.results)
          .end()
      })
      .then(() => console.log('err'), () => console.log('finally'));
  }
}

module.exports = mapPlaces
