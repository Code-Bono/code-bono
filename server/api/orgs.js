const router = require('express').Router()
const { Organization, Proposal } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Organization.findAll()
    .then(room => res.json(room))
    .catch(next)
})

// router.post('/proposal', (req, res, next) => {
//   Proposal.create(req.body)
//     .then(data => res.json(data))
//     .catch(next)
// })
