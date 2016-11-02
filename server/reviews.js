'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Review = db.model('reviews')
const Genre = db.model('genres')

const customReviewRoutes = require('express').Router()

module.exports = customReviewRoutes

// Epilogue will automatically create standard RESTful routes
const reviews = epilogue.resource({
  model: db.model('reviews'),
  endpoints: ['/reviews', '/reviews/:id'],
  actions: ['list', 'read', 'delete'],
  assocations: true,
  include: [{
    model: db.model('users')
  },
  {
    model: db.model('venues')
  }]
})

//Artist API simply instantiates a Router object, and exports it
//but it also imports epilogue, have it create default routes
//destructure filters object back into functions which either CONTINUE or STOP, and in STOP cases respond with 403, etc.
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
//epilogue filters are tests that have to pass (CONTINUE) in order for the api route to succeed
