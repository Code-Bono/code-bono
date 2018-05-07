const router = require('express').Router()
const { Chatroom, Message } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Chatroom.findAll()
    .then(room => res.json(room))
    .catch(next)
})

router.get('/:id/messages', (req, res, next) => {
  Message.findAll({
    where: {
      chatroomId: req.params.id
    }
  })
    .then(messages => res.json(messages))
    .catch(next)
})

router.post('/:id/messages', (req, res, next) => {
  Message.create(req.body)
    .then(message => {
      return Message.findById(message.id)
    })
    .then(message => res.json(message))
    .catch(next)
})
