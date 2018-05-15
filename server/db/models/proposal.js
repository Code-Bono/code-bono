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
      'http://themetapicture.com/media/funny-Panda-laying-down-watching-clouds.jpg'
  },
  isActive: {
    type: Sequelize.BOOLEAN
  },
  snippet: {
    type: Sequelize.VIRTUAL,
    get() {
      let sentences = this.getDataValue('description').split('.')
      let firstSentence = sentences[0] + '.'
      return firstSentence
    }
  }
})

module.exports = Proposal
