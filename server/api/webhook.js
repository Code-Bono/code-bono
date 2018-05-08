const router = require('express').Router()
const { Project } = require('../db/models')
module.exports = router

router.post('/test', (req, res, next) => {
  console.log('*From GitHub*', req.body)
  res.sendStatus(200)
})
