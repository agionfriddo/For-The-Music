'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customArtistRoutes = require('express').Router()

// Custom routes go here.

   customArtistRoutes.post('/', (req,res,next)=>{
      console.log('you hit the custom route!!!! ------- YAY')
      let createThisArtist = req.body
      let listOfGenres = createThisArtist.genreIds
      delete createThisArtist.genreIds
      db.model.Artist.create(createThisArtist)
        .then(artistInstance => {
          //array of promises returned by findById
          let findEachGenre = listOfGenres.map(genreId => {
            return db.model.Genre.findById(genreId);
          })
          Promise.all(findEachGenre)
          .then(arrOfGenres => {
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

module.exports = customArtistRoutes

/* a description of a CREATE ARTIST post
   test isAdmin
   req body will contain{name,bio,imageUrl,youtube,genreId}
   we'll destructure genreId and then delete it from the creatioObj
   Artist.create(creationObj) returns the instance
   We have to associate it with a genre instance
   let thisOne = Genre.findById(genreId)
   Artist.setGenre(thisOne)

   */




// Epilogue will automatically create standard RESTful routes
const artists = epilogue.resource({
  model: db.model('artists'),
  endpoints: ['/artists', '/artists/:id']
})

//Artist API simply instantiates a Router object, and exports it
//but it also imports epilogue, have it create default routes
//destructure filters object back into functions which either CONTINUE or STOP, and in STOP cases respond with 403, etc.
const {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin} = epilogue.filters
//epilogue filters are tests that have to pass (CONTINUE) in order for the api route to succeed
artists.delete.auth(mustBeAdmin)

