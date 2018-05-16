const router = require('express').Router()
const { Organization, Proposal, User, Cause, Project } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Organization.findAll()
    .then(room => res.json(room))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  //finds user by id provided and returns the organization they represent
  User.findById(req.params.id)
    .then(user => {
      return Organization.findById(user.orgId)
    })
    .then(room => res.json(room))
    .catch(next)
})

router.get('/:id/proposals', (req, res, next) => {
  Proposal.findAll({
    where: {
      organizationId: req.params.id
    },
    include: [
      {model: Project}
    ]
  })
    .then(proposals => {
      res.json(proposals)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  //finds user by id provided and returns the organization they represent
  Organization.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(org => res.json(org))
    .catch(next)
})

router.post('/', (req, res, next) => {
  // creates a organization then uses the email provided in the req.body to find a user and assign him to the created org
  Organization.create(req.body.orgObj)
    .then(org => {
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        user.update({ orgId: org.id })
      })
      res.json(org)
    })
    .catch(next)
})

router.post('/proposal', (req, res, next) => {
  Proposal.create(req.body)
    .then(proposal => {
      //sets causes sent from the request to the proposal that was just created
      proposal.addCauses(req.body.causes)
    })
    .then(data => res.json(data))
    .catch(next)
})
