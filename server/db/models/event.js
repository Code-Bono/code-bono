const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  action: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  githubUser: {
    type: Sequelize.STRING,
    allowNull: false
  },
  merged: {
    type: Sequelize.BOOLEAN
  },
  size: {
    type: Sequelize.INTEGER
  },
  repoId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Event
