const router = require('express').Router()
const { Organization, Request } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Organization.findAll()
    .then(room => res.json(room))
    .catch(next)
})

router.post('/post-request', (req, res, next) => {
  Request.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})
