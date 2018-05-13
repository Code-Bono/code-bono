const router = require('express').Router()
const { Repo, Event } = require('../db/models')
module.exports = router

router.post('/pull_request', (req, res, next) => {
  // 'action' can be of several types. Most common are opened, closed, assigned, review_requested
  // if the action is 'closed', the merged field indicates whether the changes pulled in to the relevant branch
  // 'description' will be the comment submitted with the request
  let event = {
    type: 'pull request',
    action: req.body.action,
    title: req.body.pull_request.title,
    description: req.body.pull_request.body,
    url: req.body.pull_request.html_url,
    githubUser: req.body.pull_request.user.login,
    merged: req.body.pull_request.merged,
    repoId: req.body.repository.id
  }
  Event.create(event).then(event => res.sendStatus(200))
})

router.post('/pull_request_review', (req, res, next) => {
  // 'action' will be submitted, edited or dismissed
  // 'title' will indicate whether the changes were accepted
  let event = {
    type: 'pull request review',
    action: req.body.action,
    title: req.body.review.state,
    description: req.body.review.body,
    url: req.body.review.html_url,
    githubUser: req.body.review.user.login,
    repoId: req.body.repository.id
  }
  Event.create(event).then(event => res.sendStatus(200))
})

router.post('/push', (req, res, next) => {
  // size is the number of commits merged by the push event
  let size = req.body.commits.length
  let pathLength = req.body.ref.split('/').length
  let branch = req.body.ref.split('/')[pathLength - 1]
  let description = `pushed to branch ${branch}`
  let event = {
    type: 'push',
    description,
    url: req.body.compare,
    githubUser: req.body.pusher.name,
    size,
    repoId: req.body.repository.id
  }
  Event.create(event).then(event => res.sendStatus(200))
})

router.post('/member', (req, res, next) => {
  // 'action' will be added, deleted or edited
  // 'url' will link to the added or removed member's page
  let event = {
    type: 'member',
    action: req.body.action,
    url: req.body.member.html_url,
    githubUser: req.body.member.login,
    repoId: req.body.repository.id
  }
  Event.create(event).then(event => res.sendStatus(200))
})
