const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/github', require('./github'))
router.use('/chatroom', require('./chatroom'))
router.use('/webhook', require('./webhook'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
