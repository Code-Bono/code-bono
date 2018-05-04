const router = require('express').Router()
const { Chatroom } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //placeholder to get the only chatroom currently in db
  Chatroom.findById(1)
    .then(room => res.json(room))
    .catch(next)
})

router.put('/', (req, res, next) => {
  console.log('received message', req.body)
  const message = req.body.message
  //update later for dynamic id
  Chatroom.findById(1)
    .then(room => {
      let messages = [...room.messages, message]
      return room.update({ messages }, { where: { id: 1 } })
    })
    .then(data => res.json(data))
    .catch(next)
})
