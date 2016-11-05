'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')
const Artist = db.model('artists')
const Genre = db.model('genres')

const customArtistRoutes = require('express').Router()

  /* CUSTOM POST ROUTE THAT ALLOWS ARTISTS TO BE ASSOCIATED WITH GENRE */

   customArtistRoutes.post('/', (req, res, next) => {
      let createThisArtist = req.body
      let listOfGenres = createThisArtist.genreIds

      // delete genre id so an artist can be created
      delete createThisArtist.genreIds

      Artist.create(createThisArtist)
        .then(artistInstance => {
          // generate an array of genre promises
          let GenresToFind = listOfGenres.map(genreId => {
            return Genre.findById(genreId);
          })

          Promise.all(GenresToFind)
            .then(arrOfGenres => {
              let setGenreAssocations = arrOfGenres.map(genreInstance => {
                artistInstance.addGenre(genreInstance)
              })
              return Promise.all(setGenreAssocations)
            })
            .then(() => {
              res.sendStatus(200);
            })
        })
        .catch(next)
   })

module.exports = customArtistRoutes

// Epilogue will automatically create standard RESTful routes
const artists = epilogue.resource({
  model: db.model('artists'),
  endpoints: ['/artists', '/artists/:id'],
  actions: ['list', 'read', 'delete'],
  assocations: true,
  include: [{
    model: db.model('genres')
  }]
})

// AUTH
const { mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
artists.delete.auth(mustBeAdmin)


//Artist API simply instantiates a Router object, and exports it
//but it also imports epilogue, have it create default routes
//destructure filters object back into functions which either CONTINUE or STOP, and in STOP cases respond with 403, etc.


//epilogue filters are tests that have to pass (CONTINUE) in order for the api route to succeed

/* a description of a CREATE ARTIST post
   test isAdmin
   req body will contain{name,bio,imageUrl,youtube,genreId}
   we'll destructure genreId and then delete it from the creatioObj
   Artist.create(creationObj) returns the instance
   We have to associate it with a genre instance
   let thisOne = Genre.findById(genreId)
   Artist.setGenre(thisOne)

   */

