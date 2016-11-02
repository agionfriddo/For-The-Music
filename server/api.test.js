const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const Artist = require('APP/db/models/artist')
const Genre = require('APP/db/models/genre')

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

// three artists
const jackson = {name: 'dj jackson', bio: 'im cool'}
const hannah = {name: 'dj hannah', bio: 'im chill'}
const andrew = {name: 'dj andrew', bio: 'im here to drop fire beats'}

// an admin user and a regular users
const adminbob = { username: 'bob@secrets.org', password: '12345'}
const steve = { username: 'steve@secrets.org', password: '12345'}

describe('/api/artists', () => {
  before('creates two artists and an admin user', () =>
    db.didSync
      .then(() =>
        Artist.bulkCreate([jackson, hannah])
      )
      .then(() =>
        User.create(
          {email: adminbob.username,
          password: adminbob.password,
          isAdmin: true
        })
      )
      .then(() =>
        User.create(
          {email: steve.username,
          password: steve.password
        })
      )
      .then(() =>
        Genre.create({name: 'Rap'})
      )
  )

// tests for guests
  describe('when not logged in', () => {
    it('gets all artists', () =>
      request(app).get('/api/artists')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(2)
        })
    )

    it('gets the one artist', () =>
      request(app).get('/api/artists/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain(jackson)
        })
    )

    it('posts one artist', () =>
      request(app).post('/api/artists')
      .send({name: 'billy', genreId: [1]})
        .expect(200)
    )

    it('is not authorized to delete an artist', () =>
      request(app)
        .delete('/api/artists/1')
        .expect(401)
    )

  })


  // tests for regular users
  describe('when logged in as user', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(steve))

    it('cannot delete an artist', () =>
        agent.delete('/api/artists/1')
        .expect(401)
    )

  })


// tests for admins
  describe('when logged in as admin', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(adminbob))

    it('is able to delete an artist', () =>
        agent.delete('/api/artists/1')
        .expect(200)
        .then(res => expect(res.body).to.eql({}))
    )

  })
})


// API TESTS ----------
