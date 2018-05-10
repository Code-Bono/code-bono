const router = require('express').Router()
const createToken = require('./utils')
const octokit = require('@octokit/rest')()
const { Project } = require('../db/models')
module.exports = router

let headers
createToken
  .then(installationToken => {
    headers = {
      authorization: `token ${installationToken.data.token}`,
      accept: 'application/vnd.github.inertia-preview+json'
    }
  })

router.post('/:name', (req, res, next) => {
  // need proposalId, name of project, description can come from proposal
  // /api/projects/:name
  const name = req.params.name
  const repoName = name.toLowerCase().split(' ').join('-')

  Project.create({
    name,
    repoName
  })
  .then(() => {
    return octokit.repos.createForOrg({
    headers,
    org: 'Code-Bono-Projects',
    name: repoName,
    description: 'this is a test repo creation!'
    })
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch(next)
})

router.post('/project-board-cards/add', (req, res, next) => {
  //for now this is the 'To Do' column id for code-bono-test-2
  const columnId = 2666662
  const note = req.body.note

  octokit.projects.createProjectCard({
    headers,
    column_id: columnId,
    note
  })
  .then(result => {
    res.sendStatus(201)
  })
  .catch(next)

})
