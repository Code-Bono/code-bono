const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  repoName: {
    type: Sequelize.STRING,
    unique: true
  },
  repoURL: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        `https://github.com/Code-Bono-Projects/${this.getDataValue('repoName')}`
      );
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  isWinner: {
    type: Sequelize.BOOLEAN,
    defautlValue: false
  }
})

module.exports = Project
