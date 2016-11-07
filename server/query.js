'use strict'

const Promise = require('bluebird')
const db = require('APP/db')
const Event = db.model('events')
const Artist = db.model('artists')
const Venue = db.model('venues')

const queryRouter = require('express').Router();

queryRouter.get('/', (req, res, next) => {
  let findingVenue = Venue.findOne({
    where: {
      name: { $iLike: `%${req.query.name}%` }
    }
  })

  let findingArtist = Artist.findOne({
    where: {
      name: { $iLike: `%${req.query.name}%` }
    }
  })

  Promise.all([findingVenue, findingArtist])
  .spread((foundVenue, foundArtist) => {

    let findingEventsByVenue = Event.findAll({
      where: {
        venue_id: foundVenue ?  foundVenue.id : null
      }
    })

    if (foundArtist) {
      foundArtist.getEvents()
      .then(arrayOfEvents => {
        Promise.all([...arrayOfEvents, findingEventsByVenue])
        .then(events => {
          let returnedEvents = [];
          events.forEach(event => event ?
            returnedEvents = returnedEvents.concat(event) :
            null)
          res.send(returnedEvents)
        });
      });
    } else {
      findingEventsByVenue
      .then(foundEvents => {
        res.send(foundEvents)
      })
    }
  })
})


module.exports = queryRouter;
