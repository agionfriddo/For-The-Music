'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Event = db.define('events', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  initialTickets: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 55000,
      min: 1
    }
  },
  ticketPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 1000000,
      min: 100
    }
  }
})

module.exports = Event;
