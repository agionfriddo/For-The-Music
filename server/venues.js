'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Venue = db.model('venues')
const Review = db.model('reviews')
const User = db.model('users')


const customVenueRoutes = require('express').Router()

customVenueRoutes.get('/:id', (req, res, next) => {
  const venueID = req.params.id
  console.log(venueID)
  Venue.findOne({where: {id: venueID},
                include: [{model: Review,
                        include: {model: User, attributes: ['name']}}]
                })
    .then(venue => (res.send(venue)))
    .catch(next)
})

module.exports = customVenueRoutes

const venues = epilogue.resource({
  model: db.model('venues'),
  endpoints: ['/venues', '/venues/:id'],
  actions: ['list', 'delete', 'create'],
})

// AUTH
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
venues.delete.auth(mustBeAdmin)
venues.create.auth(mustBeAdmin)
