const router = require('express').Router()
const { Proposal, Organization, Cause, Project, User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Proposal.findAll({
    include: [Organization, Cause, { model: Project, include: [User] }]
  })
    .then(proposal => res.json(proposal))
    .catch(next)
})

router.get('/:proposalId', (req, res, next) => {
  const proposalId = +req.params.proposalId

  Proposal.findById(proposalId, {
    include: [Organization, Cause, { model: Project, include: [User] }]
  })
    .then(proposal => res.json(proposal))
    .catch(next)
})

router.put('/:proposalId', (req, res, next) => {
  const proposalId = +req.params.proposalId
  Proposal.update(req.body, { where: { id: proposalId } })
    .then(() => {
      return Proposal.findById(proposalId)
    })
    .then(proposal => {
      //updates causes with new causes sent in
      proposal.setCauses(req.body.causes)
    })
    .then(data => res.json(data))
    .catch(next)
})

router.post('/:proposalId', (req, res, next) => {
  Proposal.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})
