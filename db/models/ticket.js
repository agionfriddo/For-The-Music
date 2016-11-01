'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Ticket = db.define('tickets', {
  isValid: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Ticket;
