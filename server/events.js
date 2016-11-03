'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Artist = db.model('artists')
const Event = db.model('events')

const customEventRoutes = require('express').Router()

// Custom routes go here.

   customEventRoutes.post('/', (req,res,next)=>{
      console.log('you hit the custom route!!!! ------- YAY')
      let createThisEvent = req.body;
      let listOfArtists = createThisEvent.artistIds
      delete createThisEvent.artistIds
      Event.create(createThisEvent)
        .then(eventInstance => {
          //array of promises returned by findById
          console.log('event created')
          let findEachArtist = listOfArtists.map(artistId => {
            return Artist.findById(artistId);
          })
          Promise.all(findEachArtist)
          .then(arrOfArtists => {
            console.log('artist arr created')
            let setArtistsAssocations = arrOfArtists.map(artistInstance => {
              return artistInstance.addEvent(eventInstance)
            })
            return Promise.all(setArtistsAssocations)
          })
          .then(()=>{
            res.status(200).send();
          })
          .catch(err => console.error(err))

        })
        //when Promise.all resolves, the then will be handed off an array of genre instances

   })

module.exports = customEventRoutes


// Epilogue will automatically create standard RESTful routes
const events = epilogue.resource({
  model: db.model('events'),
  endpoints: ['/events', '/events/:id'],
  actions: ['list', 'read', 'delete'],
  assocations: true,
  include: [{
    model: db.model('venues')
  },
  {
    model: db.model('artists')
  }]
})

//Artist API simply instantiates a Router object, and exports it
//but it also imports epilogue, have it create default routes
//destructure filters object back into functions which either CONTINUE or STOP, and in STOP cases respond with 403, etc.
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
//epilogue filters are tests that have to pass (CONTINUE) in order for the api route to succeed
events.delete.auth(mustBeAdmin)
