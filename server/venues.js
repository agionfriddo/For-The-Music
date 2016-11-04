'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')


const customVenueRoutes = require('express').Router()

module.exports = customVenueRoutes

const venues = epilogue.resource({
  model: db.model('venues'),
  endpoints: ['/venues', '/venues/:id'],
  actions: ['list', 'read', 'delete', 'create'],
})

// AUTH
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
venues.delete.auth(mustBeAdmin)
venues.create.auth(mustBeAdmin)
