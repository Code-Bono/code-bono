const Sequelize = require('sequelize')
const db = require('../db')

const Chatroom = db.define('chatroom', {
  name: Sequelize.STRING
})

module.exports = Chatroom
