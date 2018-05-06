const router = require('express').Router()
const createToken = require('./utils')
const octokit = require('@octokit/rest')()
module.exports = router

router.get('/projects/columns/cards', (req, res, next) => {
  let headers

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
        repo: 'code-bono-test-2'
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
      console.log('ALL COLUMNS', projectColumns)
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
  octokit.apps
    .createInstallationToken({
      headers: {
        authorization: `Bearer ${token}`,
        accept: 'application/vnd.github.machine-man-preview+json'
      },
      installation_id: 152649
    })
    // use installation token to access restricted api
    .then(installationToken => {
      octokit.projects
        .createRepoProject({
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
