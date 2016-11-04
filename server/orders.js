'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Promise = require('bluebird')
const Order = db.model('orders')
const Ticket = db.model('tickets')
const Event = db.model('events')
const Artist = db.model('artists')
const Venue = db.model('venues')
const User = db.model('users')


const customOrderRoutes = require('express').Router()

module.exports = customOrderRoutes
  customOrderRoutes.get('/:id/tickets', (req,res,next)=>{
    let orderId = req.params.id
    console.log(orderId)

    Ticket.findAll({
      where:{order_id: orderId},
      include:[{model: Event,
                include: [{model: Artist}, {model: Venue}]
      }]
    })
      .then(ticketArr => res.send(ticketArr))

  })

  customOrderRoutes.get('/0/ordercheck/:id', (req,res,next)=>{
    let sessionOrderID = req.session.orderID
    let userID = Number(req.params.id)

    console.log(sessionOrderID)

    if (sessionOrderID) {
      Order.findById(sessionOrderID)
        .then(order => res.send(order))
    }
    else {
      if(userID) {
        Order.findOne({where: {user_id: userID}})
          .then(order =>{
            if(order) {
              res.send(order)
            }
            else {
              res.sendStatus(404)
            }
          })
      } else {
        res.sendStatus(404)
      }
    }
  })


   customOrderRoutes.post('/', (req,res,next)=>{
      let bodyUserID = req.body.userID
      let bodyOrderID = req.body.orderID
      let eventID = req.body.eventID

      let sessionOrderID = req.session.orderID
      let userID = bodyUserID.id

      let orderID = bodyOrderID || sessionOrderID

      console.log('orderID: ', orderID)
      console.log('userID: ', userID)
      console.log('eventID: ', eventID)

      if (orderID) {
        console.log('we have an order ID')
        let findingOrder = Order.findById(orderID)
        let findingTicket = Ticket.findOne({where: {order_id: null, event_id: eventID}})

        if(userID) {
          console.log('horrible error')
          let findingUser = User.findOne({where:{id:userID}})
          console.log('we have and order ID and a user ID')

          Promise.all([findingOrder, findingTicket, findingUser])
            .spread((order, ticket, user) => {
              console.log('order inside .spread', order, typeof order)
              console.log('ticket id: ', ticket.id)


              order.update({user_id: userID})
                .then(order =>{
                  return order.addTicket(ticket)
                })
                .then(order => res.send(order))
            })
        } else {
          console.log('we have an order ID but no user ID')
          Promise.all([findingOrder, findingTicket])
            .spread((order, ticket) => {
              console.log('order inside .spread', order, typeof order)
              console.log('ticket id: ', ticket.id)
              order.addTicket(ticket)
                .then(order => res.send(order))
            })
        }
      }
      else {
        if (userID) {
          console.log('we have a userID, but no orderID')

          let findingOrder = Order.findOrCreate({where: {user_id: userID, status: 'in-cart'}})
          let findingTicket = Ticket.findOne({where: {order_id: null, event_id: eventID}})


          Promise.all([findingOrder, findingTicket])
            .spread((order, ticket) => {
              console.log('ticket id: ', ticket.id, "is now associated with:")
              console.log('order id: ', order[0].id)
              console.log('orderCreated?', order[1])
							req.session.orderID = order.id
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
							req.session.orderID = order.id
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
