const { Event, Repo } = require('../db/models')
const router = require('express').Router()

router.post('/push', (req, res, next) => {
  // size is the number of commits merged by the push event
  let size = req.body.commits.length
  let pathLength = req.body.ref.split('/').length
  let branch = req.body.ref.split('/')[pathLength - 1]
  let description = `pushed ${size} commit${
    size !== 1 ? 's' : ''
  } to the ${branch} branch`
  let newEvent = {
    type: 'push',
    description,
    url: req.body.compare,
    githubUser: req.body.pusher.name,
    size,
    repoId: req.body.repository.id
  }
  Event.create(newEvent)
    .then(event => {
      Repo.findById(event.repoId)
        .then(repo => event.update({ projectId: repo.projectId }))
        .then(updatedEvent => req.io.emit('githubEvent', updatedEvent))
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.post('/pull_request', (req, res, next) => {
  // 'action' can be of several types. Most common are opened, closed, assigned, review_requested
  // if the action is 'closed', the merged field indicates whether the changes pulled in to the relevant branch
  // 'description' will be the comment submitted with the request
  let newEvent = {
    type: 'pull request',
    action: req.body.action,
    title: req.body.pull_request.title,
    description: req.body.pull_request.body,
    url: req.body.pull_request.html_url,
    githubUser: req.body.pull_request.user.login,
    merged: req.body.pull_request.merged,
    repoId: req.body.repository.id
  }
  Event.create(newEvent)
    .then(event => {
      Repo.findById(event.repoId)
        .then(repo => event.update({ projectId: repo.projectId }))
        .then(updatedEvent => req.io.emit('githubEvent', updatedEvent))
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.post('/pull_request_review', (req, res, next) => {
  // 'action' will be submitted, edited or dismissed
  // 'title' will indicate whether the changes were accepted
  let newEvent = {
    type: 'pull request review',
    action: req.body.action,
    title: req.body.review.state,
    description: req.body.review.body,
    url: req.body.review.html_url,
    githubUser: req.body.review.user.login,
    repoId: req.body.repository.id
  }
  Event.create(newEvent)
    .then(event => {
      Repo.findById(event.repoId)
        .then(repo => event.update({ projectId: repo.projectId }))
        .then(updatedEvent => req.io.emit('githubEvent', updatedEvent))
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.post('/member', (req, res, next) => {
  // 'action' will be added, deleted or edited
  // 'url' will link to the added or removed member's page
  let newEvent = {
    type: 'member',
    action: req.body.action,
    url: req.body.member.html_url,
    githubUser: req.body.member.login,
    repoId: req.body.repository.id
  }
  Event.create(newEvent)
    .then(event => {
      Repo.findById(event.repoId)
        .then(repo => event.update({ projectId: repo.projectId }))
        .then(updatedEvent => req.io.emit('githubEvent', updatedEvent))
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.post('/projectBoard', (req, res, next) => {
  let repoId = req.body.repository.id
  console.log(repoId)
  let projectId
  Repo.findById(repoId)
    .then(repo => {
      projectId = repo.projectId
      let projectBoardEvent = {
        type: req.body.action,
        projectId
      }
      return projectBoardEvent
    })
    .then(event => req.io.emit('projectBoardEvent', event))
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
