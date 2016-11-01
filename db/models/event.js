'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Event = db.define('events', {
  date: Sequelize.DATE,
  initialTickets: Sequelize.INTEGER,
  ticketPrice: Sequelize.INTEGER
})

module.exports = Event;
