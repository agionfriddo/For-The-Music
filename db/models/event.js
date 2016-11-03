'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Ticket = require('APP/db/models/ticket')


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
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      max: 9999999999.99,
      min: 1
    }
  }
},{
  hooks: {
    afterCreate: function(event, options) {

      const makeArrOfTickets = (event) => {
        const numberOfTickets = event.dataValues.initialTickets;
        const arrOfTickets = [];
        for (let i = 0; i <= numberOfTickets; i++) {
          arrOfTickets.push({ event_id: event.dataValues.id });
        }
        return arrOfTickets
      }
      Ticket.bulkCreate(makeArrOfTickets(event))
        .then(function(){console.log('Tickets created.')
      })
    }
  }
})

module.exports = Event;
