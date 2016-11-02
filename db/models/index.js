'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const Artist = require('APP/db/models/artist')
const Event = require('APP/db/models/event')
const Genre = require('APP/db/models/genre')
const Order = require('APP/db/models/order')
const Review = require('APP/db/models/review')
const Ticket = require('APP/db/models/ticket')
const User = require('APP/db/models/user')
const Venue = require('APP/db/models/venue')

Artist.belongsToMany(Genre, {through: 'ArtistGenre'})
Artist.belongsToMany(Event, {through: 'EventArtist'})

Event.belongsToMany(Artist, {through: 'EventArtist'})
Event.hasMany(Ticket)
Event.belongsTo(Venue)

Ticket.belongsTo(Event)
Ticket.belongsTo(Order)
Ticket.belongsTo(User)

Venue.hasMany(Event)
Venue.hasMany(Review)

Review.belongsTo(Venue)
Review.belongsTo(User)

Order.hasMany(Ticket)
Order.belongsTo(User)

User.hasMany(Order)
User.hasMany(Review)
User.hasMany(Ticket)

Genre.belongsToMany(Artist, {through: 'ArtistGenre'})

module.exports = {Artist, Event, Genre, Order, Review, Ticket, User, Venue}
