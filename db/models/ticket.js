'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Ticket = db.define('tickets', {
  isValid: Sequelize.BOOLEAN
})

module.exports = Ticket;
