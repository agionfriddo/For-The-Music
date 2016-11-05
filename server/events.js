'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Artist = db.model('artists')
const Event = db.model('events')

const customEventRoutes = require('express').Router()

  /* CUSTOM POST ROUTE THAT ALLOWS EVENTS TO BE ASSOCIATED WITH ARTISTS AND A SINGLE VENUE */

   customEventRoutes.post('/', (req, res, next) => {
      let createThisEvent = req.body;
      let listOfArtists = createThisEvent.artistIds

      delete createThisEvent.artistIds

      Event.create(createThisEvent)
        .then(eventInstance => {
          let findEachArtist = listOfArtists.map(artistId => {
            return Artist.findById(artistId);
          })

          Promise.all(findEachArtist)
            .then(arrOfArtists => {
              let setArtistsAssocations = arrOfArtists.map(artistInstance => {
                return artistInstance.addEvent(eventInstance)
              })

              return Promise.all(setArtistsAssocations)
            })
            .then(() => {res.sendStatus(200)})
        })
        .catch(err => console.error(err))
   })

module.exports = customEventRoutes

const events = epilogue.resource({
  model: db.model('events'),
  endpoints: ['/events', '/events/:id'],
  actions: ['list', 'read', 'delete'],
  assocations: true,
  include: [{model: db.model('venues')},
            {model: db.model('artists')}]
})

// AUTH
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
events.delete.auth(mustBeAdmin)
