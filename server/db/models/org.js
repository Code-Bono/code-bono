const Sequelize = require('sequelize')
const db = require('../db')

const Org = db.define('org', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  },
  contactInfo: {
    type: Sequelize.STRING
  }
})

module.exports = Org
