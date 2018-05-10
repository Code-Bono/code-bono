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

router.post('/', (req, res, next) => {

  const userId = req.body.userId
  const proposalId = req.body.proposalId
  let number = 1
  let name = `${req.body.proposalName} ${number}`
  const description = req.body.proposalDescription
  const repoName = name.toLowerCase().split(' ').join('-')

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
    else {
      project.getUsers()
      .then(users => {
        if(users.length % 4 === 0) {
          number++
          // number not incrememnting for name - not sure why - need fixing!
          console.log('number', number)
          console.log('name!', name)
        }
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
