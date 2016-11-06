'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Ticket = require('APP/db/models/ticket')

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM('in-cart', 'processing', 'purchased', 'cancelled')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Order;
