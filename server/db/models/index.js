const User = require('./user')
const Message = require('./message')
const Chatroom = require('./chatroom')
const Project = require('./project')
const Cause = require('./cause')
const Organization = require('./organization')
const Request = require('./request')

// Associations go here:
User.belongsToMany(Project, { through: 'collaboration' })
Project.belongsToMany(User, { through: 'collaboration' })
User.belongsToMany(Cause, { through: 'interests' })
Cause.belongsToMany(User, { through: 'interests' })
User.hasMany(Message)
Message.belongsTo(Chatroom)
Message.belongsTo(User)
Request.belongsTo(Organization)
/*
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Chatroom,
  Project,
  Cause,
  Message,
  Organization,
  Request
}
