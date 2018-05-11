const Sequelize = require('sequelize')
const db = require('../db')

const Repo = db.define('repo', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  URL: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        `https://github.com/Code-Bono-Projects/${this.getDataValue('name')}`
      );
    }
  },
  toDoColumnId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inProgressColumnId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  doneColumnId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Repo
