const Cause = require('./cause')
const Chatroom = require('./chatroom')
const Event = require('./event')
const Message = require('./message')
const Organization = require('./organization')
const Project = require('./project')
const Proposal = require('./proposal')
const Repo = require('./repo')
const User = require('./user')

// Associations go here:
User.belongsToMany(Project, { through: 'collaboration' })
Project.belongsToMany(User, { through: 'collaboration' })

User.belongsToMany(Cause, { through: 'interests' })
Cause.belongsToMany(User, { through: 'interests' })

Proposal.belongsToMany(Cause, { through: 'proposalCause' })
Cause.belongsToMany(Proposal, { through: 'proposalCause' })

Organization.belongsToMany(Cause, { through: 'orgCause' })
Cause.belongsToMany(Organization, { through: 'orgCause' })

Organization.hasMany(Proposal)
Proposal.belongsTo(Organization)

Proposal.hasMany(Project)
Project.belongsTo(Proposal)

User.hasMany(Message)
Message.belongsTo(Chatroom)
Message.belongsTo(User)

Chatroom.belongsTo(Project)
Project.hasOne(Chatroom)

User.belongsTo(Organization, { as: 'org' })

Project.hasOne(Repo)
Repo.belongsTo(Project)

Project.hasMany(Event)
Event.belongsTo(Project)

Repo.hasMany(Event)
Event.belongsTo(Repo)

module.exports = {
  Cause,
  Chatroom,
  Event,
  Message,
  Organization,
  Project,
  Proposal,
  Repo,
  User
}
