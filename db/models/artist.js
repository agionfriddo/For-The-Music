'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Artist = db.define('artists', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio: {
    type: Sequelize.TEXT
  },
  imageurl: {
    type: Sequelize.STRING,
    defaultValue: 'https://savoirs.rfi.fr/sites/all/themes/rfi/images/public/default-profile.png'
  },
  youtube: {
    type: Sequelize.STRING
  }
})

module.exports = Artist
