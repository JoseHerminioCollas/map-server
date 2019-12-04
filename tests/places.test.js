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
    const urlRequest = '?query=dog&location=47.700,-100.100&radius=50000'
    request(app)
      .get('/places' + urlRequest)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body[0].hasOwnProperty('name')).toBe(true)
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
