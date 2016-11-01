'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM('in-cart', 'processing', 'purchased', 'cancelled')
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Order;
