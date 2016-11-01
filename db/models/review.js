'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('reviews', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
  rating: Sequelize.INTEGER
})

module.exports = Review;
