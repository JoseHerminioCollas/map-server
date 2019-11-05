const request = require('supertest');
const express = require('express');
const places = require('../places')
const config = require('../config')

const app = express();

function mockgoogleMapsPlaces(query) {
  return new Promise((res) => {
    const results = { json: { results: [{ name: 'Infinite Soups' }] } }
    res(results)
  })
}

app.get('/places', places(mockgoogleMapsPlaces));
app.get('/abc', function (req, res) {
  res.status(200).json({ name: 'john' });
})

describe('GET /places', function () {
  it('places', function (done) {
    request(app)
      .get('/places?q=dog')
      .then(response => {
        expect(/Soup/.test(response.text)).toBe(true)
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
