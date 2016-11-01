'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1
    }
  }
})

module.exports = Review;
