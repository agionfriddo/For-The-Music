'use strict'

const Promise = require('bluebird')
const epilogue = require('./epilogue')
const db = require('APP/db')
const Event = db.model('events')
const Order = db.model('orders')
const Ticket = db.model('tickets')

const customTicketRoutes = require('express').Router()

module.exports = customTicketRoutes


  customTicketRoutes.put('/', (req,res,next)=>{
      let { ticketID } = req.body;
      console.log('body', req.body)

      if (ticketID) {
        console.log('we have a ticket ID', ticketID)
        let findingTicket = Ticket.findOne({where: {id: ticketID}})
        findingTicket
          .then(ticket => {
            if(ticket) {
              console.log('ticket id to disassociate: ', ticket.id)
              ticket.update({order_id: null})
                .then(() => res.send({id: ticketID}))
            }
            else {
              res.sendStatus(404)
            }
          })
      } else {
        res.sendStatus(404)
      }
  })



// Epilogue will automatically create standard RESTful routes
const tickets = epilogue.resource({
  model: db.model('tickets'),
  endpoints: ['/tickets', '/tickets/:id'],
  actions: ['list', 'read'],
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

const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters


