const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  sender: {
    type: Sequelize.STRING
  }
})

module.exports = Event
