'use strict'

const Promise = require('bluebird')
const db = require('APP/db')
const Event = db.model('events')
const Artist = db.model('artists')
const Venue = db.model('venues')

const queryRouter = require('express').Router();

queryRouter.get('/', (req, res, next) => {
  console.log("IN ROUTE")
  let findingVenue = Venue.findOne({
    where: {
      name: { $like: `%${req.query.name}%` }

    }
  })

  let findingArtist = Artist.findOne({
    where: {
      name: {
        $like: `%${req.query.name}%`
      }
    }
  })
  Promise.all([findingVenue, findingArtist])
  .spread((foundVenue, foundArtist) => {
    console.log("FOUND ARTISTS FOUND EVENTS")

    let findingEventsByVenue = Event.findAll({
      include: [Venue, Artist],
      where: {
        venue_id: foundVenue ?  foundVenue.id : null
      }
    })

    let findingEventsByArtists = foundArtist && foundArtist.getEvents()
    .then(arrayOfEvents => {
      console.log('ARR OF EVENTS', arrayOfEvents)
      console.log('ARTIST OBJECT ON EVENT', arrayOfEvents[0].EventArtist.artist_id)
      console.log('EVENT ID', arrayOfEvents[0].id)
      const arrayEventPromise = arrayOfEvents.map(event => {
        console.log('EVENT OBJ', event)
        return Event.findAll({
          //include: [Venue],
          //where: { id : event.id }
        })
      })
      Promise.all(arrayEventPromise)
        .then(sendArrayOfEvents => (sendArrayOfEvents))
    });



    Promise.all([findingEventsByVenue, findingEventsByArtists])
    .spread((foundEventsByVenue, foundEventsbyArtists) => {
      console.log("PROMISE", foundEventsbyArtists)
      let foundEvents = foundEventsbyArtists ? foundEventsByVenue.concat(foundEventsbyArtists) : foundEventsByVenue
      console.log(foundEvents)
      res.json(foundEvents)

    })
  })
})


module.exports = queryRouter;
