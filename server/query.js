'use strict'

const Promise = require('bluebird')
const db = require('APP/db')
const Event = db.model('events')
const Artist = db.model('artists')
const Venue = db.model('venues')

const queryRouter = require('express').Router();

queryRouter.get('/', (req, res, next) => {
  console.log(req.query.name)
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

    console.log("FOUNDARTIST", foundArtist)

    let findingEventsByVenue = Event.findAll({
      where: {
        venue_id: foundVenue ?  foundVenue.id : null
      }
    })

    let findingEventsByArtists = foundArtist && foundArtist.getEvents();

    Promise.all([findingEventsByVenue, findingEventsByArtists])
    .spread((foundEventsByVenue, foundEventsbyArtists) => {
      let foundEvents = foundEventsByVenue.concat(foundEventsbyArtists)
      res.json(foundEvents)

    })
  })
})


module.exports = queryRouter;
