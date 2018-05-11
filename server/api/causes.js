const router = require('express').Router()
const { Cause } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Cause.findAll()
    .then(causes => res.json(causes))
    .catch(next)
})
