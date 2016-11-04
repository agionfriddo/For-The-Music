'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Artist = db.model('artists')
const Genre = db.model('genres')

module.exports = require('express').Router()

const genres = epilogue.resource({
  model: db.model('genres'),
  endpoints: ['/genres', '/genres/:id'],
  assocations: true,
  include: [{
    model: db.model('artists')
  }]
})

// AUTH DISABLED
// const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
// genres.delete.auth(mustBeAdmin);
// genres.create.auth(mustBeAdmin);
