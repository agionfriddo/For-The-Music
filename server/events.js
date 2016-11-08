'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Artist = db.model('artists')
const Event = db.model('events')
const Venue = db.model('venues')

const customEventRoutes = require('express').Router()

  /* CUSTOM POST ROUTE THAT ALLOWS EVENTS TO BE ASSOCIATED WITH ARTISTS AND A SINGLE VENUE */

   customEventRoutes.post('/', (req, res, next) => {
     console.log(req.body)
      let createThisEvent = req.body;
      let listOfArtists = createThisEvent.artists
      let venueName = createThisEvent.venue
      delete createThisEvent.artists
      delete createThisEvent.venue

      Venue.findOne({ where: { name: venueName}})
      .then(venue => {
        createThisEvent.venue_id = venue.id;

        Event.create(createThisEvent)
        .then(eventInstance => {
          let findVenue = Venue.findOne({ where: {name: venueName}})
          let findEachArtist = listOfArtists.map(artistName => {
            return Artist.findOne({where: {name: artistName}});
          })

          Promise.all(findEachArtist)
          .then(artists => {

            let setArtistsAssocations = artists.map(artistInstance => {
              return artistInstance.addEvent(eventInstance)
            })
            Promise.all(setArtistsAssocations)
            .then(artists => {
            })

          })
          .then(() => {res.sendStatus(200)})
      })


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
