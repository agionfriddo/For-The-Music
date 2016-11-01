'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const Artist = require('./artist')
const Event = require('./event')
const Genre = require('./genre')
const Order = require('./order')
const Review = require('./review')
const Ticket = require('./ticket')
const User = require('./user')
const Venue = require('./venue')

Artist.belongsToMany(Genre, {through: 'ArtistGenre'})
Artist.belongsToMany(Event, {through: 'EventArtist'})

Event.belongsToMany(Artist, {through: 'EventArtist'})
Event.hasMany(Ticket)
Event.belongsTo(Venue)

Ticket.belongsTo(Event)
Ticket.belongsTo(Order)

Venue.hasMany(Event)
Venue.hasMany(Review)

Review.belongsTo(Venue)
Review.belongsTo(User)

Order.hasMany(Ticket)
Order.belongsTo(User)

User.hasMany(Order)
User.hasMany(Review)

Genre.belongsToMany(Artist, {through: 'ArtistGenre'})

module.exports = {Artist, Event, Genre, Order, Review, Ticket, User, Venue}
