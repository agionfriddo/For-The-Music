'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Artist = db.model('artists')
const Genre = db.model('genres')

module.exports = require('express').Router()

// Epilogue will automatically create standard RESTful routes
const genres = epilogue.resource({
  model: db.model('genres'),
  endpoints: ['/genres', '/genres/:id'],
  assocations: true,
  include: [{
    model: db.model('artists')
  }]
})

//Artist API simply instantiates a Router object, and exports it
//but it also imports epilogue, have it create default routes
//destructure filters object back into functions which either CONTINUE or STOP, and in STOP cases respond with 403, etc.
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
//epilogue filters are tests that have to pass (CONTINUE) in order for the api route to succeed
genres.delete.auth(mustBeAdmin);
genres.create.auth(mustBeAdmin);
