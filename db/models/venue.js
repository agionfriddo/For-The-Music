'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Venue = db.define('venues', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  description: Sequelize.TEXT,
  imageurl: Sequelize.STRING
})

module.exports = Venue;
