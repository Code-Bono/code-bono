const router = require('express').Router()
const { Project } = require('../db/models')

module.exports = router

router.post('/test', (req, res, next) => {
  console.log(req.body.sender)
  res.sendStatus(200)
})
