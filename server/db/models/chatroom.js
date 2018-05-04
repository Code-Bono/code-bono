const Sequelize = require('sequelize')
const db = require('../db')

const Chatroom = db.define('chatroom', {
  messages: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Chatroom
