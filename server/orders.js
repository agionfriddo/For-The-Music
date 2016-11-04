'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Promise = require('bluebird')
const Order = db.model('orders')
const Ticket = db.model('tickets')


const customOrderRoutes = require('express').Router()

module.exports = customOrderRoutes

   customOrderRoutes.post('/', (req,res,next)=>{
      let { userID, eventID } = req.body;
      let bodyOrderID = req.body.orderID
      let sessionOrderID = req.session.orderID

      let orderID = bodyOrderID || sessionOrderID

      console.log('orderID: ', orderID)
      console.log('userID: ', userID)
      console.log('eventID: ', eventID)

      if (orderID) {
        console.log('we have an order ID')
        let findingOrder = Order.findById(orderID)
        let findingTicket = Ticket.findOne({where: {order_id: null, event_id: eventID}})

        Promise.all([findingOrder, findingTicket])
          .spread((order, ticket) => {
            console.log('ticket id: ', ticket.id)
            order.addTicket(ticket)
              .then(order => res.send(order))
          })
      }
      else {
        if (userID) {
          console.log('we have a userID')

          let findingOrder = Order.findOrCreate({where: {user_id: userID, status: 'in-cart'}})
          let findingTicket = Ticket.findOne({where: {order_id: null, event_id: eventID}})


          Promise.all([findingOrder, findingTicket])
            .spread((order, ticket) => {
              console.log('ticket id: ', ticket.id, "is now associated with:")
              console.log('order id: ', order[0].id)
              console.log('orderCreated?', order[1])
              order[0].addTicket(ticket)
                .then(order => res.send(order))
            })

        } else {
          console.log('we have no userID and no orderID')

          let creatingOrder = Order.create({status: 'in-cart'})
          let findingTicket = Ticket.findOne({where: {order_id: null, event_id: eventID}})

          Promise.all([creatingOrder, findingTicket])
            .spread((order, ticket) => {
              console.log('ticket id: ', ticket.id, "is now associated with:")
              console.log('order id: ', order.id)
              order.addTicket(ticket)
                .then(order => res.send(order))
            })
            .catch(error => console.error(error))
        }
      }





   })

// Epilogue will automatically create standard RESTful routes
const orders = epilogue.resource({
  model: db.model('orders'),
  endpoints: ['/orders', '/orders/:id'],
  actions: ['list', 'read', 'delete'],
  assocations: true
})






const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters



  // include: [{
  //   model: db.model('genres')
  // }]
