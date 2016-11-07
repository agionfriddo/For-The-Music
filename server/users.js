'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Order = db.model('orders')


const customUserRoutes = require('express').Router()

// Custom routes go here.

customUserRoutes.get('/:id/orders', (req, res, next) => {
  Order.findAll({where: {user_id: req.params.id}})
  .then(orderArr => res.send(orderArr))
  .catch(next)
})

module.exports = customUserRoutes

// Epilogue will automatically create standard RESTful routes
const users = epilogue.resource({
  model: db.model('users'),
  endpoints: ['/users', '/users/:id']
})

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
users.delete.auth(mustBeLoggedIn)
users.delete.auth(selfOnly('delete'))
users.list.auth(forbidden('cannot list users'))
users.read.auth(mustBeLoggedIn)
