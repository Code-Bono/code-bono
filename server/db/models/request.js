const Sequelize = require('sequelize')
const db = require('../db')

const Request = db.define('request', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  },
  timeframe: {
    type: Sequelize.ENUM('hours', 'days', 'weeks', 'months')
  },
  deadline: {
    type: Sequelize.DATE
  },
  isActive: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Request
