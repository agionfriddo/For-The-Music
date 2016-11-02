'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Artist = db.model('artists')
const Genre = db.model('genres')

const customEventRoutes = require('express').Router()

// Custom routes go here.

   customArtistRoutes.post('/', (req,res,next)=>{
      console.log('you hit the custom route!!!! ------- YAY')
      let createThisArtist = req.body
      let listOfGenres = createThisArtist.genreIds
      delete createThisArtist.genreIds

      Artist.create(createThisArtist)
        .then(artistInstance => {
          //array of promises returned by findById
          console.log('artist created')
          let findEachGenre = listOfGenres.map(genreId => {
            return Genre.findById(genreId);
          })
          Promise.all(findEachGenre)
          .then(arrOfGenres => {
            console.log('genre arr created')
            let setGenreAssocations = arrOfGenres.map(genreInstance => {
              artistInstance.addGenre(genreInstance)
            })
            return Promise.all(setGenreAssocations)
          })
          .then(()=>{
            res.status(200).send();
          })

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
    model: db.model('genres')
  },
  {

  }]
})

//Artist API simply instantiates a Router object, and exports it
//but it also imports epilogue, have it create default routes
//destructure filters object back into functions which either CONTINUE or STOP, and in STOP cases respond with 403, etc.
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
//epilogue filters are tests that have to pass (CONTINUE) in order for the api route to succeed
artists.delete.auth(mustBeAdmin)
