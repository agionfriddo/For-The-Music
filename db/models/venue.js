'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Venue = db.define('venues', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageurl: {
    type: Sequelize.STRING,
    defaultValue: 'http://morrisonstreet.com/wp-content/uploads/crowd-at-concert-2.jpg'
  }
})

module.exports = Venue;
