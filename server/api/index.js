const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/chatroom', require('./chatroom'))
router.use('/projects', require('./projects'))
router.use('/orgs', require('./orgs'))
router.use('/proposals', require('./proposals'))
router.use('/causes', require('./causes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
