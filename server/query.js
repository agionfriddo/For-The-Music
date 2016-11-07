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
      name: { $iLike: `%${req.query.name}%` }
    }
  })

  let findingArtist = Artist.findOne({
    where: {
      name: {
        $iLike: `%${req.query.name}%`
      }
    }
  })

  Promise.all([findingVenue, findingArtist])
  .spread((foundVenue, foundArtist) => {
    console.log("FOUND ARTISTS FOUND EVENTS")
    console.log("FOUNDVENUE", foundVenue)
    console.log("FOUND ARTISTS", foundArtist)

    let findingEventsByVenue = Event.findAll({
      include: [Venue, Artist],
      where: {
        venue_id: foundVenue ?  foundVenue.id : null
      }
    })
    if(foundArtist) {
      let findingEventsByArtists = foundArtist.getEvents()
      .then(arrayOfEvents => {
        const arrayEventPromise = arrayOfEvents.map(event => {
          return Event.findOne({
            include: [Venue, Artist],
            where: { id : event.id }
          })
        })
        Promise.all([...arrayEventPromise, findingEventsByVenue])
        .then(events => {
          console.log(events)
          let returnedEvents = [];
          events.forEach(event => event ? returnedEvents = returnedEvents.concat(event) : null)
          res.send(returnedEvents)
        });
      });
    }
    else {
      Promise.all([findingEventsByVenue])
      .spread(foundEvents => {res.send(foundEvents)})
    }
  })
})


module.exports = queryRouter;
