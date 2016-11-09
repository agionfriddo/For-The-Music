'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Venue = db.model('venues')
const Review = db.model('reviews')
const User = db.model('users')
const Event = db.model('events')

const customVenueRoutes = require('express').Router()

customVenueRoutes.get('/:id', (req, res, next) => {
  const venueID = req.params.id
  console.log(venueID)
  Venue.findOne({where: {id: venueID},
                include: [{model: Review,
                        include: {model: User, attributes: ['name']}},
                        {model: Event}]
                })
    .then(venue => (res.send(venue)))
    .catch(next)
})

customVenueRoutes.get('/:venueId/events', (req, res, next) => {
  Venue.findById(req.params.venueId)
  .then(venue => {
    venue.getEvents()
    .then(events => {
      res.json(events)
    })
  })
})

customVenueRoutes.post('/', (req, res, next) => {
  const dataToPost = {}
  console.log('posted!')

  for (let prop in req.body) {
    if (req.body[prop]) {
      dataToPost[prop] = req.body[prop]
    }
  }

  if (Number(req.body.id)) {

    Venue.findOne({where: {id: req.body.id}})
      .then(venue => {
        delete dataToPost.id
        return venue.update(dataToPost)
      })
      .then(updatedVenue => {
        console.log(dataToPost)
        res.send(updatedVenue)
      })
      .catch(next)
  } else {
    delete dataToPost.id

    Venue.create(dataToPost)
      .then(createdVenue => {
        res.send(createdVenue)
      })
      .catch(next)
  }

})

module.exports = customVenueRoutes

const venues = epilogue.resource({
  model: db.model('venues'),
  endpoints: ['/venues', '/venues/:id'],
  actions: ['list', 'delete'],
})

// AUTH
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
