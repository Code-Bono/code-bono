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
