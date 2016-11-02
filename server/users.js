'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customUserRoutes = require('express').Router()

// Custom routes go here.

module.exports = customUserRoutes

// Epilogue will automatically create standard RESTful routes
const users = epilogue.resource({
  model: db.model('users'),
  endpoints: ['/users', '/users/:id'],
  associations: true
})
const orders = epilogue.resource({
  model: db.model('orders'),
  include:[{model: db.model('users'),
            include: [{model: db.model('tickets')}]
          }],
  associations: true
})

const tickets = epilogue.resource({
  model: db.model('tickets')
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
users.delete.auth(mustBeLoggedIn)
users.delete.auth(selfOnly)
users.list.auth(forbidden)
users.read.auth(mustBeLoggedIn)
