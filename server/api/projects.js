const router = require('express').Router()
const createToken = require('./utils')
const octokit = require('@octokit/rest')()
const { Project, Collaboration } = require('../db/models')
module.exports = router

let headers
createToken
  .then(installationToken => {
    headers = {
      authorization: `token ${installationToken.data.token}`,
      accept: 'application/vnd.github.inertia-preview+json'
    }
  })

router.get('/:projectId', (req, res, next) => {
  const projectId = req.params.projectId

  Project.findById(projectId)
  .then(project => {
    res.send(project)
  })
  .catch(next)
})

router.post('/', (req, res, next) => {
  const userId = req.body.userId
  const proposalId = req.body.proposalId
  const name = req.body.proposalName
  const description = req.body.proposalDescription
  const repoName = name.split(' ').join('-')

  Project.findOrCreate({
    where: {
      name,
      repoName,
      description,
      proposalId
    }
  })
  .spread((project, created) => {
    if(created) {
      octokit.repos.createForOrg({
        headers,
        org: 'Code-Bono-Projects',
        name,
        description
      })
    }
    project.addUsers(userId)
  })
  .then(projectAndUser => {
    res.status(201).json(projectAndUser)
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
