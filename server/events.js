'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Artist = db.model('artists')
const Event = db.model('events')
const Venue = db.model('venues')

const customEventRoutes = require('express').Router()

  /* CUSTOM POST ROUTE THAT ALLOWS EVENTS TO BE ASSOCIATED WITH ARTISTS AND A SINGLE VENUE */

   customEventRoutes.post('/', (req, res, next) => {
     if(!req.body.venue || !req.body.artists || !req.body.date || !req.body.initialTickets || !req.body.ticketPrice) {
       res.sendStatus(400).send("Please complete the entire form")
     }
      if(req.body.eventId > 0) {
        let updateEvent = {
          date: req.body.date,
          initialTickets: req.body.initialTickets,
          ticketPrice: req.body.ticketPrice
        }
        let filter = {
          where: {
            id: parseInt(req.body.eventId)
          },
          include: [
            {model: Artist},
            {model: Venue}
          ]
        };
        console.log("YOYOYO")
        let findingVenue = Venue.findOne({ where: { name: req.body.venue}})
        let findingArtist = Artist.findOne({ where: { name: req.body.artists[0]}})

        Promise.all([findingVenue, findingArtist])
        .then(values => {
          let foundVenue = values[0]
          let foundArtist = values[1]
          Event.findOne(filter)
          .then(event => {
            event.update(updateEvent)
            .then(updatedEvent => {
              updatedEvent.setVenue(foundVenue)
              .then(eventWithVenue => {
                eventWithVenue.setArtists(foundArtist)
                .then(completeEvent => {
                  console.log(completeEvent)
                  res.sendStatus(200)
                })
                .catch(next)
              })
              .catch(next)
            })
            .catch(next)
          })
          .catch(next)
        })
        .catch(next);
      }


      else {
        console.log("YO")
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
      }
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
