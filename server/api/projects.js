const router = require('express').Router()
const {createToken, githubRepoAndProjectBoardCreation} = require('./utils')
const octokit = require('@octokit/rest')()
const { Project, Collaboration, Repo } = require('../db/models')
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

  Project.findOne({
    where: {
      id: projectId
    },
    include: [{
      model: Repo
    }]
  })
  .then(project => {
    res.send(project)
  })
  .catch(next)
})

// function githubRepoAndProjectBoardCreation (name, description) {
//   let project_id;

//   let columnIds = {
//     toDoColumnId: null,
//     inProgressColumnId: null,
//     doneColumnId: null
//   }

//   return octokit.repos.createForOrg({
//     headers,
//     org: 'Code-Bono-Projects',
//     name,
//     description,
//     has_projects: true
//   })
//   .then((repo) => {
//     const repoNameForProjectBoard = repo.data.name
//     return octokit.projects.createRepoProject({
//       headers,
//       owner: 'Code-Bono-Projects',
//       repo: repoNameForProjectBoard,
//       name: repoNameForProjectBoard
//     })
//   })
//   .then(projectBoard => {
//     project_id = projectBoard.data.id
//     return octokit.projects.createProjectColumn({
//       headers,
//       project_id,
//       name: 'To Do'
//     })
//   })
//   .then(toDoColumn => {
//     columnIds.toDoColumnId = toDoColumn.data.id
//     return octokit.projects.createProjectColumn({
//       headers,
//       project_id,
//       name: 'In Progress'
//     })
//   })
//   .then(inProgressColumn => {
//     columnIds.inProgressColumnId = inProgressColumn.data.id
//     return octokit.projects.createProjectColumn({
//       headers,
//       project_id,
//       name: 'Done'
//     })
//   })
//   .then(doneColumn => {
//     columnIds.doneColumnId = doneColumn.data.id
//     return columnIds
//   })
// }

router.post('/', (req, res, next) => {
  const userId = req.body.userId
  const proposalId = req.body.proposalId
  const name = req.body.proposalName
  const description = req.body.proposalDescription
  const repoName = name.split(' ').join('-')
  let repoId;

  Project.findOrCreate({
    where: {
      name,
      description,
      proposalId
    }
  })
  .tap(([project, created]) => {
    if(created) {
      return githubRepoAndProjectBoardCreation(repoName, description)
      .then((githubProjectColumns) => {
        const {toDoColumnId, inProgressColumnId, doneColumnId} = githubProjectColumns
        return Repo.create({
          name: repoName,
          toDoColumnId,
          inProgressColumnId,
          doneColumnId
        })
        .then(createdRepo => {
          repoId = createdRepo.dataValues.id
        })
        .catch(next)
      })
    }
  })
  .spread((project, created) => {
    console.log('createdRepo???', repoId)
    project.setRepo(repoId)
    return project.addUsers(userId)
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
