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

router.post('/', (req, res, next) => {
  // need proposalId, name of project, description can come from proposal
  // /api/projects/:name
  console.log('REQ!!!!!', req.body)
  const proposalId = req.body.proposalId
  const name = req.body.proposalName
  const description = req.body.proposalDescription
  const repoName = name.toLowerCase().split(' ').join('-')

  octokit.repos.createForOrg({
    headers,
    org: 'Code-Bono-Projects',
    name,
    description
  })
  .then(() => {
    Project.create({
      name,
      repoName,
      description,
      proposalId
    })
  })
  .then(project => {
    res.status(201).json(project)
  })
  .catch(next)

  // Project.create({
  //   name,
  //   repoName,
  //   description
  // })
  // .then(() => {
  //   return octokit.repos.createForOrg({
  //   headers,
  //   org: 'Code-Bono-Projects',
  //   name,
  //   description
  //   })
  // })
  // .then(() => {
  //   res.sendStatus(201)
  // })
  // .catch(next)
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
