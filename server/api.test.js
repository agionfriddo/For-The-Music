const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const Artist = require('APP/db/models/artist')
const app = require('./start')


// AN AUTHORIZED USER FROM AUTH TESTS

const alice = {
  username: 'alice@secrets.org',
  password: '12345'
}

// USER API TESTS ----------------------------------------------

describe('/api/users', () => {
  describe('when not logged in', () => {
    it('GET /:id fails 401 (Unauthorized)', () =>
      request(app)
        .get(`/api/users/1`)
        .expect(401)
    )

    it('POST creates a user', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(201)
    )

    it('POST redirects to the user it just made', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          email: 'eve@interloper.com'
        }))
    )
  })
})

// ARTIST API TESTS ----------------------------------------------
const jackson = {name: 'dj jackson', bio: 'im cool'}
const hannah = {name: 'dj hannah', bio: 'im chill'}
const andrew = {name: 'dj andrew', bio: 'im here to drop fire beats'}

describe('/api/artists', () => {
  before('creates two artists', () =>
    db.didSync
      .then(() =>
        Artist.bulkCreate([jackson, hannah])
      )
  )

// tests for guests
  describe('when not logged in', () => {
    describe('gets all artists', () => {
      it('is proper length', () =>
        request(app).get('/api/artists')
          .expect(200)
          .then(res => {
            expect(res.body).to.have.length.of(2)
          })
      )
    })

    describe('sends one artist', () => {
      it('gets the correct artist', () =>
        request(app).get('/api/artists/1')
          .expect(200)
          .then(res => {
            expect(res.body).to.contain(jackson)
          })
      )
    })

    describe('fails to delete an artist', () => {
      it('responds with not authorized', () =>
        request(app)
          .delete('/api/artists/1')
          .expect(401)
      )
    })

  })

// tests for admins
  describe('when logged in as admin', () => {
    // describe('delete one artist', () => {
    //   it('is proper length', () =>
    //     request(app)
    //       .delete('/api/artists/3')
    //       .expect(204)
    //   )
    // })
  })
})


// API TESTS ----------
