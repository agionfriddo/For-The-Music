'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Artist = db.define('artists', {
  name: Sequelize.STRING,
  bio: Sequelize.TEXT,
  imageurl: Sequelize.STRING,
  youtube: Sequelize.STRING
})

module.exports = Artist
