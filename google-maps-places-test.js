const googleMapsPlaces = require('./googleMapsPlaces')

const sydney = '-33.8,151.1'
const seattle = '43,-122'

const getG = async () => {
  const userQuery = {
    query: 'dogs',
    language: 'en',
    location: sydney,
    radius: 50000
  }
  const response = await googleMapsPlaces(userQuery)
  return response
}
getG().then()
  .then(function (response) {
    console.log(response.query)
    console.log(response.json.results[0])
  })
/*
query 	Object
Properties
Name 	Type 	Attributes 	Description
query 	string
language 	string 	<optional>
location 	LatLng 	<optional>
radius 	number 	<optional>
minprice 	number 	<optional>
maxprice 	number 	<optional>
opennow 	boolean 	<optional>
type 	string 	<optional>
pagetoken 	string 	<optional>
region 	string 	<optional>
*/
