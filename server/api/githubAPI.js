const router = require('express').Router()
const fs = require('fs')
const octokit = require('@octokit/rest')()
module.exports = router

// generate JWT (sign with RSA SHA256)
const jwt = require('jsonwebtoken');
const cert = fs.readFileSync('/Users/yoni/Downloads/code-bono-projects.2018-05-04.private-key.pem');  // get private key
const payload = {
  exp: Date.now() / 1000 + 100,
  iss: 11788
}
const token = jwt.sign(payload, cert, { algorithm: 'RS256'});
const createToken = octokit.apps.createInstallationToken({
    headers: {
    authorization: `Bearer ${token}`,
    accept: 'application/vnd.github.machine-man-preview+json'
  },
  installation_id: 152649
})

router.get('/projects/columns/cards', (req, res, next) => {

  let headers;

  createToken
  .then(installationToken => {
    headers = {
      authorization: `token ${installationToken.data.token}`,
      accept: 'application/vnd.github.inertia-preview+json'
    }
  })
  .then(() => {
    return octokit.projects.getRepoProjects({
      headers,
      owner: 'Code-Bono-Projects',
      repo: 'code-bono-test1'
    })
  })
  .then(repoProjects => {
    // for now, just returning the first project in the repo
    const projectId = repoProjects.data[0].id
    return octokit.projects.getProjectColumns({
      headers,
      project_id: projectId
    })
  })
  .then(projectColumns => {
    const columnId = projectColumns.data[0].id
    return octokit.projects.getProjectCards({
      headers,
      column_id: columnId
    })
  })
  .then(projectCards => {
    // only sending the actual content of the card
    const notes = projectCards.data.map(card => {
      return card.note
    })
    res.send(notes)
  })
  .catch(next)
})

router.post('/projects/:testProjectName', (req, res, next) => {

  const projectName = req.params.testProjectName

  // Use JWT to get installation id
  octokit.apps.createInstallationToken({
      headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github.machine-man-preview+json'
    },
    installation_id: 152649
  })
  // use installation token to access restricted api
  .then(installationToken => {
    octokit.projects.createRepoProject({
      headers: {
        authorization: `token ${installationToken.data.token}`,
        accept: 'application/vnd.github.inertia-preview+json'
      },
      owner: 'Code-Bono-Projects',
      repo: 'code-bono-test1',
      name: projectName
    })
    .then(result => {
      res.json(result)
    })
  })
  .catch(next)
})
