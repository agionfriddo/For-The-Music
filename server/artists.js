'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customArtistRoutes = require('express').Router()

// Custom routes go here.

module.exports = customArtistRoutes

// Epilogue will automatically create standard RESTful routes
const artists = epilogue.resource({
  model: db.model('artists'),
  endpoints: ['/artists', '/artists/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
artists.delete.auth(mustBeAdmin)
