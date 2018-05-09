const router = require('express').Router()
const { Proposal } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Proposal.findAll()
    .then(proposal => res.json(proposal))
    .catch(next)
})

router.post('/:proposalId', (req, res, next) => {
  Proposal.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})
