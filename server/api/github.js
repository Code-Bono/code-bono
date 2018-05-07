const router = require('express').Router()
const createToken = require('./utils')
const octokit = require('@octokit/rest')()
module.exports = router

router.get('/projects/columns/cards', (req, res, next) => {
  let headers

  // use installation token to access restricted api
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
<<<<<<< HEAD
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
=======
  })
  .then(projectColumns => {
    const toDoColumnId = projectColumns.data[0].id
    const inProgressColumnId = projectColumns.data[1].id
    const doneColumnId = projectColumns.data[2].id
    const toDoProjectCards = octokit.projects.getProjectCards({
      headers,
      column_id: toDoColumnId
    })
    const inProgressProjectCards = octokit.projects.getProjectCards({
      headers,
      column_id: inProgressColumnId
    })
    const doneProjectCards = octokit.projects.getProjectCards({
      headers,
      column_id: doneColumnId
    })
    return Promise.all([toDoProjectCards, inProgressProjectCards, doneProjectCards])
  })
  .then(projectColumnCards => {
    const columns = [...projectColumnCards]
    const cards = [
      {
        columnName: 'To Do',
        notes: []
      },
      {
        columnName: 'In Progress',
        notes: []
      },
      {
        columnName: 'Done',
        notes: []
      }
    ]

    for(let i = 0; i < columns.length; i++) {
      columns[i].data.forEach(card => {
        cards[i].notes.push(card.note)
      })
    }
    res.send(cards)
  })
  .catch(next)
>>>>>>> github-access
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

router.get('/repos/:owner/:repo/issues/events', (req, res, next) => {
  let headers
  const owner = req.params.owner
  const repo = req.params.repo

  createToken
    .then(installationToken => {
      headers = {
        authorization: `token ${installationToken.data.token}`,
        accept: 'application/vnd.github.inertia-preview+json'
      }
    })
    .then(() => {
      return octokit.activity.getEventsForRepo({
        headers,
        owner,
        repo
      })
    })
    .then(events => {
      // console.log('**Events**: ', events)
      res.json(events)
    })
    .catch(next)
})
