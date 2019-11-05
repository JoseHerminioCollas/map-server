const request = require('supertest');
const express = require('express');
const config = require('../config.js')

const googleMapsClient = require('@google/maps').createClient({
  key: config.gmkey,
  Promise: Promise,
})
const app = express();

// places request to Google Maps Service
function getGMPromise() {
  return googleMapsClient.places({
    query: 'wood store',
    language: 'en',
  })
    .asPromise()
}
function places(req, res) {
  getGMPromise()
    .then(results => {
      res.status(200).send(results.json.results[0].name);
    })
}
app.get('/places', places);
app.get('/abc', function (req, res) {
  res.status(200).json({ name: 'john' });
})

describe('GET /places', function () {
  it('places', function (done) {
    request(app)
      .get('/places')
      .expect(res => {
        console.log('res', res.text)
      })
      .expect(200, done)
  })
  it('abc', function (done) {
    request(app)
      .get('/abc')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
