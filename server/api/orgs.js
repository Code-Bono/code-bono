const router = require('express').Router()
const { Organization, Request, User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Organization.findAll()
    .then(room => res.json(room))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Organization.create(req.body.orgObj)
    .then(org => {
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        user.update({
          RepresentativeId: org.id
        })
      })
      res.json(org)
    })
    .catch(next)
})

router.post('/post-request', (req, res, next) => {
  Request.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})
