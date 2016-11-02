'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')


const customVenueRoutes = require('express').Router()

module.exports = customVenueRoutes

// Epilogue will automatically create standard RESTful routes
const venues = epilogue.resource({
  model: db.model('venues'),
  endpoints: ['/venues', '/venues/:id'],
  actions: ['list', 'read', 'delete', 'create'],
})

//Artist API simply instantiates a Router object, and exports it
//but it also imports epilogue, have it create default routes
//destructure filters object back into functions which either CONTINUE or STOP, and in STOP cases respond with 403, etc.
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
//epilogue filters are tests that have to pass (CONTINUE) in order for the api route to succeed

venues.delete.auth(mustBeAdmin)
venues.create.auth(mustBeAdmin)
