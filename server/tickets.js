'use strict'

const Promise = require('bluebird')
const epilogue = require('./epilogue')
const db = require('APP/db')
const Event = db.model('events')
const Order = db.model('orders')

const customTicketRoutes = require('express').Router()

module.exports = customTicketRoutes

// Epilogue will automatically create standard RESTful routes
const tickets = epilogue.resource({
  model: db.model('tickets'),
  endpoints: ['/tickets', '/tickets/:id'],
  actions: ['list', 'read', 'delete'],
  include: [{
    model: db.model('events'),
    include: [{
      model: db.model('artists')
    },
    {
      model: db.model('venues')
    }]
  },
  {
    model: db.model('orders'),
    include: [{
      model: db.model('users')
    }]
  }]
})

//Artist API simply instantiates a Router object, and exports it
//but it also imports epilogue, have it create default routes
//destructure filters object back into functions which either CONTINUE or STOP, and in STOP cases respond with 403, etc.
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
//epilogue filters are tests that have to pass (CONTINUE) in order for the api route to succeed

tickets.delete.auth(mustBeAdmin)
