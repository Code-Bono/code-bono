const router = require('express').Router()
const { Repo, Event } = require('../db/models')
module.exports = router

router.post('/pull_request', (req, res, next) => {
  let event = {
    type: 'pull request',
    action: req.body.action,
    title: req.body.pull_request.title,
    description: req.body.pull_request.body,
    url: req.body.pull_request.url,
    githubUser: req.body.pull_request.user.login,
    merged: req.body.pull_request.merged,
    repoId: req.body.repository.id
  }
  Event.create(event).then(event => res.sendStatus(200))
})
router.post('/pull_request_review', (req, res, next) => {
  console.log(req.body.sender)
  res.sendStatus(200)
})
router.post('/push', (req, res, next) => {
  console.log(req.body.sender)
  res.sendStatus(200)
})
router.post('/member', (req, res, next) => {
  console.log(req.body.sender)
  res.sendStatus(200)
})
