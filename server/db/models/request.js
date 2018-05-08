const Sequelize = require('sequelize')
const db = require('../db')

const Request = db.define('request', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  deadline: {
    //will change to date later, put it as string for simplicity's sake for now
    type: Sequelize.STRING,
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Request
