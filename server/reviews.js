'use strict'

const Promise = require('bluebird')
const epilogue = require('./epilogue')
const db = require('APP/db')
const Review = db.model('reviews')
const User = db.model('users')
const Venue = db.model('venues')

const customReviewRoutes = require('express').Router()

/* CUSTOM POST ROUTE THAT ALLOWS USERS TO POST REVIEWS FOR VENUES */

customReviewRoutes.post('/', (req,res,next)=>{
   let createThisReview = req.body
   let userId = createThisReview.userId
   let venueId = createThisReview.venueId

   delete createThisReview.userId
   delete createThisReview.venueId

   Review.create(createThisReview)
     .then(reviewInstance => {
       const findingUser = User.findById(userId)
       const findingVenues = Venue.findById(venueId)

       Promise.all([findingUser, findingVenues])
         .spread((foundUser, foundVenue) => {
             const associatingUser = reviewInstance.setUser(foundUser)
             const associatingVenue = reviewInstance.setVenue(foundVenue)

             return Promise.all([associatingUser, associatingVenue])
         })
         .then(() => { res.sendStatus(200) })
     })
     .catch(next)
})

module.exports = customReviewRoutes

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

// AUTH DISABLED
// const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
// reviews.delete.auth(mustBeAdmin)
