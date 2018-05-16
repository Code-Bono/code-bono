const Sequelize = require('sequelize')
const db = require('../db')

const Organization = db.define('organization', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'http://dlmedia.com/wp-content/uploads/2016/07/canstockphoto35453249-862x646.jpg'
  }
})

module.exports = Organization
