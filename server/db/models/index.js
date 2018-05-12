const Cause = require('./cause')
const Chatroom = require('./chatroom')
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

User.belongsTo(Organization, { as: 'org' })

Project.hasOne(Repo)
Repo.belongsTo(Project)

module.exports = {
  Cause,
  Chatroom,
  Message,
  Organization,
  Project,
  Proposal,
  Repo,
  User
}
