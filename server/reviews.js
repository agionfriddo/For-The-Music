'use strict'

const Promise = require('bluebird')
const epilogue = require('./epilogue')
const db = require('APP/db')
const Review = db.model('reviews')
const User = db.model('users')
const Venue = db.model('venues')

const customReviewRoutes = require('express').Router()

customReviewRoutes.post('/', (req,res,next)=>{
   console.log('you hit the custom route!!!! ------- YAY')
   let createThisReview = req.body
   let userId = createThisReview.userId
   let venueId = createThisReview.venueId
   delete createThisReview.userId
   delete createThisReview.venueId

   Review.create(createThisReview)
     .then(reviewInstance => {
       //array of promises returned by findById
       console.log('review created')
       const findingUser = User.findById(userId)
       const findingVenues = Venue.findById(venueId)
       Promise.all([findingUser, findingVenues])
       .spread((foundUser, foundVenue) => {
         console.log('genre arr created')
         const associatingUser = reviewInstance.setUser(foundUser)
         const associatingVenue = reviewInstance.setVenue(foundVenue)
         return Promise.all([associatingUser, associatingVenue])
       })
       .then(()=>{
         res.status(200).send();
       })

     })
     //when Promise.all resolves, the then will be handed off an array of genre instances

})


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

reviews.delete.auth(mustBeAdmin)
