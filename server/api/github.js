const router = require('express').Router()
const createToken = require('./utils')
const octokit = require('@octokit/rest')()
module.exports = router

// use installation token to access restricted api and set headers to include with each api call
let headers
createToken.then(installationToken => {
  headers = {
    authorization: `token ${installationToken.data.token}`,
    accept: 'application/vnd.github.inertia-preview+json'
  }
})

router.get('/:org/repos', (req, res, next) => {
  const org = req.params.org

  octokit.repos
    .getForOrg({
      org
    })
    .then(orgRepos => {
      const repos = orgRepos.data.map(repo => {
        return repo.name
      })
      res.send(repos)
    })
    .catch(next)
})

// router.get('/projects/columns/cards', (req, res, next) => {
//   octokit.projects
//     .getRepoProjects({
//       headers,
//       owner: 'Code-Bono-Projects',
//       repo: 'code-bono-test-2'
//     })
//     .then(repoProjects => {
//       // for now, just returning the first project in the repo
//       const projectId = repoProjects.data[0].id
//       return octokit.projects.getProjectColumns({
//         headers,
//         project_id: projectId
//       })
//     })
//     .then(projectColumns => {
//       const toDoColumnId = projectColumns.data[0].id
//       const inProgressColumnId = projectColumns.data[1].id
//       const doneColumnId = projectColumns.data[2].id
//       const toDoProjectCards = octokit.projects.getProjectCards({
//         headers,
//         column_id: toDoColumnId
//       })
//       const inProgressProjectCards = octokit.projects.getProjectCards({
//         headers,
//         column_id: inProgressColumnId
//       })
//       const doneProjectCards = octokit.projects.getProjectCards({
//         headers,
//         column_id: doneColumnId
//       })
//       return Promise.all([
//         toDoProjectCards,
//         inProgressProjectCards,
//         doneProjectCards
//       ])
//     })
//     .then(projectColumnCards => {
//       const columns = [...projectColumnCards]
//       const cards = [
//         {
//           columnName: 'To Do',
//           notes: []
//         },
//         {
//           columnName: 'In Progress',
//           notes: []
//         },
//         {
//           columnName: 'Done',
//           notes: []
//         }
//       ]

//       for (let i = 0; i < columns.length; i++) {
//         columns[i].data.forEach(card => {
//           cards[i].notes.push(card.note)
//         })
//       }
//       res.send(cards)
//     })
//     .catch(next)
// })

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
      res.json(events)
    })
    .catch(next)
})
