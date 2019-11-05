const request = require('supertest');
const express = require('express');
// const config = require('../config.js')
let googleMapsPlaces = require('../googleMapsPlaces')

const app = express();

function mockgetGMPromise(query) {
  return new Promise((res) => {
    const results = { json: { results: [{ name: 'Infinite Soups' }] } }
    res(results)
  })
}
// mock
googleMapsPlaces = mockgetGMPromise;

async function places(req, res) {
  const gmpResults = await googleMapsPlaces('Soup')
  res.status(200).send(gmpResults.json.results[0].name);
}
app.get('/places', places);
app.get('/abc', function (req, res) {
  res.status(200).json({ name: 'john' });
})

describe('GET /places', function () {
  it('places', function (done) {
    request(app)
      .get('/places')
      .then(response => {
        expect(response.text).toBe('Infinite Soups')
        done()
      })
  })
  it('abc', function (done) {
    request(app)
      .get('/abc')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
