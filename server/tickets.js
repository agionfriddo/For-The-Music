'use strict'

const Promise = require('bluebird')
const epilogue = require('./epilogue')
const db = require('APP/db')
const Event = db.model('events')
const Order = db.model('orders')
const Ticket = db.model('tickets')

const customTicketRoutes = require('express').Router()

module.exports = customTicketRoutes

  /* CUSTOM POST ROUTE THAT ALLOWS USERS TO REMOVE TICKETS FROM CART */

  customTicketRoutes.put('/', (req, res, next) => {
      let { ticketID } = req.body;

      if (ticketID) {
        let findingTicket = Ticket.findOne({where: {id: ticketID}})

        findingTicket
          .then(ticket => {
            // if ticket exists, set user to null
            if (ticket) {
              // console.log('ticket id to disassociate: ', ticket.id)
              ticket.update({order_id: null})
                .then(() => res.send({id: ticketID}))
            }
            else {
              // send that we didnt find the ticket
              res.sendStatus(204)
            }
          })
          .catch(next)
      }
      else {
        res.sendStatus(204)
      }
  })


// SEND LOTS OF INFORMATION  WITH THE TICKETS
const tickets = epilogue.resource({
  model: db.model('tickets'),
  endpoints: ['/tickets', '/tickets/:id'],
  actions: ['list', 'read'],
  include: [{
    model: db.model('events'),
    include: [{model: db.model('artists')}, {model: db.model('venues')}]},
              {model: db.model('orders'), include: [{model: db.model('users')}]
            }]
})

// AUTH
// const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters


