'use strict'
const Promise = require('bluebird')
const epilogue = require('./epilogue')

const db = require('APP/db')
const Order = db.model('orders')
const Ticket = db.model('tickets')
const Event = db.model('events')
const Artist = db.model('artists')
const Venue = db.model('venues')
const User = db.model('users')


const customOrderRoutes = require('express').Router()
module.exports = customOrderRoutes

  /* CUSTOM GET ROUTE THAT FINDS TICKETS WITH BY ORDER ID */

  customOrderRoutes.get('/:id/tickets', (req, res, next) => {
    let orderId = req.params.id

    let findingTickets = Ticket.findAll({
      where: {order_id: orderId},
      include: [{model: Event, include: [{model: Artist}, {model: Venue}] }]
      })

    findingTickets
      .then(ticketArr => res.send(ticketArr))
      .catch(next)

  })

  /* CUSTOM GET ROUTE THAT CHECKS FOR AN ORDER */

  customOrderRoutes.get('/0/ordercheck/:id', (req, res, next) => {
    let sessionOrderID = req.session.orderID
    let userID = Number(req.params.id)

    let emptyOrder = {
              id: null,
              date: '',
              ticketPrice: '',
              artists:[{name: ''}],
              venue: {name: ''}
            }

    // session ID exists on the request, send order associated with session ID
    if (sessionOrderID) {
      Order.findById(sessionOrderID)
        .then(order => res.send(order))
    }
    else {
      // if session ID does not exist on request, but the user ID does
      // find one order associated with the user and send it back
      if (userID) {
        Order.findOne({where: {user_id: userID, status: 'in-cart'}})
          .then(order => {
            if (order) {
              res.send(order)
            }
            else {
              // if user has no associated order, send 404
              res.send(emptyOrder)
            }
          })
      } else {
        // if both user and request have no associated order, send 404
        res.send(emptyOrder)
      }
    }
  })

  /* CUSTOM PUT ROUTE UPDATES AN ORDER FROM IN-CART TO COMPLETED */

  customOrderRoutes.put('/:id/complete', (req, res, next) => {
    let orderID = req.params.id;
    let userID = req.body.userID

    Order.findOne({where:{id: orderID}})
      .then(order => {
        return order.update({status: 'purchased', user_id: userID})
      })
      .then(updatedOrder => {
        // clear order from cart by reassigning cookie
        req.session.orderID = null
        res.send(updatedOrder)
      })
      .catch(next)

  })

  /* CUSTOM POST ROUTE THAT POSTS AN ORDER WITH NEW TICKETS OR UPDATES A PRIOR ORDER */

   customOrderRoutes.post('/', (req, res, next) => {
      let bodyUserID = req.body.userID
      let bodyOrderID = req.body.orderID
      let eventID = req.body.eventID

      let sessionOrderID = req.session.orderID
      let userID = bodyUserID.id

      // if no orderID included on body, use session orderID (prioritize bodyOrderID)
      let orderID = bodyOrderID || sessionOrderID

      // TEST CONSOLE LOGS
      // console.log('orderID: ', orderID)
      // console.log('userID: ',  userID)
      // console.log('eventID: ', eventID)

      // if any orderID exists, find that order
      if (orderID) {
        let findingOrder = Order.findById(orderID)
        let findingTicket = Ticket.findOne({where: {order_id: null, event_id: eventID}})

        // if orderID exists and user is logged in, associate user with order and order with ticket
        if (userID) {
          let findingUser = User.findOne({where:{id: userID}})

          Promise.all([findingOrder, findingTicket, findingUser])
            .spread((order, ticket, user) => {
              order.update({user_id: user.id})
                .then(orderWithUser => {
                  return orderWithUser.addTicket(ticket)
                })
                .then(orderWithTicket => res.send(orderWithTicket))
                .catch(next)
            })
        }
        else {
          // if orderID exists, but user is NOT logged in
          Promise.all([findingOrder, findingTicket])
            .spread((order, ticket) => {
              order.addTicket(ticket)
                .then(orderWithTicketButNoUser => res.send(orderWithTicketButNoUser))
                .catch(next)
            })
        }
      }
      else if (userID) {
          // if there is no associated orderID, but a user is logged in, find an old order for
          // the user and associate the ticket with it
          // OR
          // if an old order does not exist create a new order for the user and associate the ticket
          // and user with the new order THEN send the order back to the user (whether it is created or returned)
          let findingOrder = Order.findOrCreate({where: {user_id: userID, status: 'in-cart'}})
          let findingTicket = Ticket.findOne({where: {order_id: null, event_id: eventID}})

          Promise.all([findingOrder, findingTicket])
            .spread((order, ticket) => {
              // update session with user's old order or newlycreated order
							req.session.orderID = order.id

              order[0].addTicket(ticket)
                .then(orderWithTicket => res.send(orderWithTicket))
            })
        }
        else {
          // if we have no order info, and a user is not logged in, assoicate the order with a cookie
          let creatingOrder = Order.create({status: 'in-cart'})
          let findingTicket = Ticket.findOne({where: {order_id: null, event_id: eventID}})

          Promise.all([creatingOrder, findingTicket])
            .spread((order, ticket) => {
              // associated created order with the session
							req.session.orderID = order.id

              // add ticket to the order
              order.addTicket(ticket)
                .then(sessionOrder => res.send(sessionOrder))
            })
            .catch(error => console.error(error))
        }
   })

   // EDGE CASE: User has order already in DB, then creates an order on another session as a guest, then logs in
   // the user will have two IN-CART orders in the db, and will only show one

   // EDGE CASE: If no tickets left, the order does not get associated with
   // any tickets, but the user is not notified

const orders = epilogue.resource({
  model: db.model('orders'),
  endpoints: ['/orders', '/orders/:id'],
  actions: ['list', 'read', 'delete'],
  assocations: true
})

// AUTH
// const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
