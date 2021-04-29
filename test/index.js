/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect
chai.use(chaiHttp)
const server = require('../app')

describe('User', () => {
  let token = ''
  describe('/POST user', () => {
    it('it should create new user', (done) => {
      chai.request(server)
        .post('/users/register')
        .set('content-type', 'application/json')
        .send({
          first_name: 'rahul',
          last_name: 'kodoth',
          email: 'rahulkkodoth1@gmail.com',
          password: 'admin123'
        })
        .end((_err, res) => {
          (res.body).should.be.a('object')
          expect(res.body.email).to.equal('rahulkkodoth1@gmail.com')
          expect(res.body.firstName).to.equal('rahul')
          done()
        })
    })

    it('it should throws email/passsword required error', (done) => {
      chai.request(server)
        .post('/users/register')
        .set('content-type', 'application/json')
        .send({
          first_name: 'rahul',
          last_name: 'kodoth',
          email: 'rahulkkodoth1@gmail.com'
        })
        .end((_err, res) => {
          (res.body).should.be.a('string')
          expect(res.body).to.equal('Email & Password required')
          done()
        })
    })

    it('it should login user successfully', (done) => {
      chai.request(server)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({
          email: 'rahulkkodoth1@gmail.com',
          password: 'admin123'
        })
        .end((_err, res) => {
          (res.body).should.be.a('object')
          token = res.body.token
          expect(res.body.token).to.not.equal(null)
          done()
        })
    })

    it('it should throws email/passsword required error', (done) => {
      chai.request(server)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({
          email: 'rahulkkodoth1@gmail.com',
          password: ''
        })
        .end((_err, res) => {
          (res.body).should.be.a('string')
          expect(res.body).to.equal('Email & Password required')
          done()
        })
    })

    it('it should throws invalid login', (done) => {
      chai.request(server)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({
          email: 'rahulkkodoth1@gmail.com',
          password: 'asaa'
        })
        .end((_err, res) => {
          (res.body).should.be.a('string')
          expect(res.body).to.equal('Invalid Login')
          done()
        })
    })

    it('it should throws Authorization header missing', (done) => {
      chai.request(server)
        .post('/users/logout')
        .set('content-type', 'application/json')
        .set('Authorization', '')
        .end((_err, res) => {
          (res.body).should.be.a('string')
          expect(res.body).to.equal('You must send an Authorization header')
          done()
        })
    })

    it('it should throws bearer token missing', (done) => {
      chai.request(server)
        .post('/users/logout')
        .set('content-type', 'application/json')
        .set('Authorization', token)
        .end((_err, res) => {
          (res.body).should.be.a('string')
          expect(res.body).to.equal('Expected a Bearer token')
          done()
        })
    })

    it('it should throws user loged out', (done) => {
      chai.request(server)
        .post('/users/logout')
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((_err, res) => {
          (res.body).should.be.a('string')
          expect(res.body).to.equal('User loged out')
          done()
        })
    })

    it('it should throws user already logged out', (done) => {
      chai.request(server)
        .post('/users/logout')
        .set('content-type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((_err, res) => {
          (res.body).should.be.a('string')
          expect(res.body).to.equal('User already logged out')
          done()
        })
    })
  })
})
