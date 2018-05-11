const router = require('express').Router()
const { Project } = require('../db/models')

module.exports = router

router.post('/test', (req, res, next) => {
  res.sendStatus(200)
})
