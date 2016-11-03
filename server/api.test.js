const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const Artist = require('APP/db/models/artist')
const Genre = require('APP/db/models/genre')
const Venue = require('APP/db/models/venue')
const Review = require('APP/db/models/review')
const Event = require('APP/db/models/event')

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

// two venues
const theSpot = {name: 'The Spot', address: '123 Fake Street', description: 'so great spot'}
const diveSpot = {name: 'Dive Spot', address: '456 Does Not Exist Place', description: 'so much dive'}
const greatPlace = {name: 'The Great Place', address: '789 Best Blvd', description: 'It\'s just the best, bruh'}

// two reviews
const review1 = {title: 'It Da Best', content: '10/10 would go back', rating: 5}
const review2 = {title: 'Yo, it sucked', content: 'Super divey, super bad', rating: 1, venueId: 1, userId: 1}

// two events
const d1 = Date.UTC(2016, 9, 12, 21)
const d2 = Date.UTC(2016, 8, 21, 20)
const event1 = {date: d1, initialTickets: 10, ticketPrice: 1000, venue_id: 1}
const event2 = {date: d2, initialTickets: 20, ticketPrice: 2000, venue_id: 2}

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
      .send({name: 'billy', genreIds: [1]})
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

// Review API Tests ------------------------------------------------------------
describe('/api/reviews', () => {
  before('creates two artists and an admin user', () =>
    db.didSync
      .then(() =>
        Venue.bulkCreate([theSpot, diveSpot])
      )
      .then(() =>
        Review.create(review1)
      )
  )

// tests for guests
  describe('when not logged in', () => {
    it('gets all reviews', () =>
      request(app).get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(1)
        })
    )

    it('gets the one review', () =>
      request(app).get('/api/reviews/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain(review1)
        })
    )

    xit('posts one review', () =>
      request(app).post('/api/reviews')
      .send(review2)
        .expect(401)
    )

    it('is not authorized to delete a review', () =>
      request(app)
        .delete('/api/reviews/1')
        .expect(401)
    )

  })


  // tests for regular users
  describe('when logged in as user', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(steve))

    it('cannot delete a review', () =>
        agent.delete('/api/reviews/1')
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
        agent.delete('/api/reviews/1')
        .expect(200)
        .then(res => expect(res.body).to.eql({}))
    )

  })
})

// Venue API Tests -------------------------------------------------------------
describe('/api/venues', () => {

// tests for guests
  describe('when not logged in', () => {
    it('gets all venues', () =>
      request(app).get('/api/venues')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(2)
        })
    )

    it('gets the one venue', () =>
      request(app).get('/api/venues/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain(theSpot)
        })
    )

    it('is not authorized to post a venue', () =>
      request(app).post('/api/venues')
      .send(greatPlace)
        .expect(401)
    )

    it('is not authorized to delete a venue', () =>
      request(app)
        .delete('/api/venues/3')
        .expect(401)
    )

  })


  // tests for regular users
  describe('when logged in as user', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(steve))

    it('cannot delete a venue', () =>
        agent.delete('/api/venues/3')
        .expect(401)
    )

  })


// tests for admins
  describe('when logged in as admin', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(adminbob))

    it('is able to post a venue', () =>
      agent.post('/api/venues/')
      .send(greatPlace)
      .expect(201)
    )

    it('is able to delete a venue', () =>
        agent.delete('/api/venues/3')
        .expect(200)
        .then(res => expect(res.body).to.eql({}))
    )

  })
})

// GENRE API TESTS ----------

//three genres
const rock = {name: 'Rock'}
const folk = {name: 'Folk'}
const jazz = {name: "Jazz"}


describe('/api/genres', () => {
  before('creates two genres and an admin user', () =>
    db.didSync
      .then(() =>
        Genre.bulkCreate([rock, folk])
      )
  )

//tests for guests
  describe('when not loggined in', () => {
    it('gets all genres', () =>
      request(app).get('/api/genres')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(3)
        })

    )

    it('gets the one genre', () =>
      request(app).get('/api/genres/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain(rock)
        })
    )

    it('it is not authorized to post one genre', () =>
      request(app).post('/api/genres')
      .send({name: 'Acid'})
        .expect(401)
    )

    it('is not authorized to delete an genre', () =>
      request(app)
        .delete('/api/genres/1')
        .expect(401)
    )
  })

  // tests for regular users
  describe('when logged in as user', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(steve))

    it('cannot delete an genres', () =>
        agent.delete('/api/genres/1')
        .expect(401)
    )

  })

  // tests for admins
  describe('when logged in as admin', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(adminbob))

    it('is able to delete an genre', () =>
        agent.delete('/api/genres/1')
        .expect(200)
        .then(res => expect(res.body).to.eql({}))
    )

  })
})


describe('/api/events', () => {
  before('creates two events', () =>
    db.didSync
      .then(() =>
        Event.bulkCreate([event1, event2])
      )
  )
// tests for guests
  describe('when not logged in', () => {
    it('gets all events', () =>
      request(app).get('/api/events')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.length.of(2)
        })
    )

    it('gets the one event', () =>
      request(app).get('/api/events/1')
        .expect(200)
        .then(res => {
          res.body.date = Date.parse(res.body.date)
          expect(res.body).to.contain(event1)
        })
    )

    it('posts one event', () =>
      request(app).post('/api/events')
      .send({date: d1, initialTickets: 10, ticketPrice: 1000, venue_id: 1, artistIds: [2, 3]})
        .expect(200)
    )

    it('is not authorized to delete an event', () =>
      request(app)
        .delete('/api/events/3')
        .expect(401)
    )

  })


  // tests for regular users
  describe('when logged in as user', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(steve))

    it('cannot delete an event', () =>
        agent.delete('/api/events/2')
        .expect(401)
    )

  })


// tests for admins
  describe('when logged in as admin', () => {
    const agent = request.agent(app)

    before('log in', () => agent
      .post('/api/auth/local/login')
      .send(adminbob))

    it('is able to delete an event', () =>
        agent.delete('/api/events/1')
        .expect(200)
        .then(res => expect(res.body).to.eql({}))
    )

  })
})
