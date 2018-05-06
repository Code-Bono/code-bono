const Sequelize = require('sequelize')
const db = require('../db')

const Cause = db.define('cause', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Cause
