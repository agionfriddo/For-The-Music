'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
  status: Sequelize.STRING,
  date: Sequelize.DATE
})

module.exports = Order;
