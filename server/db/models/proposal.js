const Sequelize = require('sequelize')
const db = require('../db')

const Proposal = db.define('proposal', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  timeframe: {
    type: Sequelize.ENUM('hours', 'days', 'weeks', 'months')
  },
  deadline: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://organicthemes.com/demo/nonprofit/wp-content/themes/organic-nonprofit/images/logo.png'
  },
  isActive: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Proposal
