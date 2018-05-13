const router = require('express').Router()
const { createToken, githubRepoAndProjectBoardCreation } = require('./utils')
const octokit = require('@octokit/rest')()
const { Project, Collaboration, Repo } = require('../db/models')
module.exports = router

let headers
createToken.then(installationToken => {
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
    include: [
      {
        model: Repo
      }
    ]
  })
    .then(project => {
      res.send(project)
    })
    .catch(next)
})

router.get('/:projectId/cards', (req, res, next) => {
  const projectId = req.params.projectId

  Project.findOne({
    where: {
      id: projectId
    },
    include: [
      {
        model: Repo
      }
    ]
  })
    .then(project => {
      const toDoColumnId = project.dataValues.repo.dataValues.toDoColumnId
      const inProgressColumnId =
        project.dataValues.repo.dataValues.inProgressColumnId
      const doneColumnId = project.dataValues.repo.dataValues.doneColumnId
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
      return Promise.all([
        toDoProjectCards,
        inProgressProjectCards,
        doneProjectCards
      ])
    })
    .then(projectColumnCards => {
      const columns = [...projectColumnCards]
      const cards = [
        {
          columnName: 'To Do',
          columnId: null,
          cards: []
        },
        {
          columnName: 'In Progress',
          columnId: null,
          cards: []
        },
        {
          columnName: 'Done',
          columnId: null,
          cards: []
        }
      ]

      for (let i = 0; i < columns.length; i++) {
        let columnId
        columns[i].data.forEach(card => {
          columnId = card.column_url.split('/').pop()
          cards[i].columnId = columnId
          cards[i].cards.push({
            note: card.note,
            cardId: card.id
          })
        })
      }
      res.send(cards)
    })
    .then(project => {
      const toDoColumnId = project.dataValues.repo.dataValues.toDoColumnId
      const inProgressColumnId =
        project.dataValues.repo.dataValues.inProgressColumnId
      const doneColumnId = project.dataValues.repo.dataValues.doneColumnId
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
      return Promise.all([
        toDoProjectCards,
        inProgressProjectCards,
        doneProjectCards
      ])
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

      for (let i = 0; i < columns.length; i++) {
        columns[i].data.forEach(card => {
          cards[i].notes.push(card.note)
        })
      }
      res.send(cards)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  const userId = req.body.userId
  const proposalId = req.body.proposalId
  const name = req.body.proposalName
  const description = req.body.proposalDescription
  const repoName = name.split(' ').join('-')
  let repoId

  Project.findOrCreate({
    where: {
      name,
      description,
      proposalId
    }
  })
    .tap(([project, created]) => {
      if (created) {
        return githubRepoAndProjectBoardCreation(repoName, description).then(
          githubProjectColumns => {
            const {
              id,
              toDoColumnId,
              inProgressColumnId,
              doneColumnId
            } = githubProjectColumns
            return Repo.create({
              id,
              name: repoName,
              toDoColumnId,
              inProgressColumnId,
              doneColumnId
            })
              .then(createdRepo => {
                repoId = createdRepo.dataValues.id
              })
              .catch(next)
          }
        )
      }
    })
    .spread((project, created) => {
      if (created) {
        project.setRepo(repoId)
      }
      return project.addUsers(userId)
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch(next)
})

router.post(
  '/:projectId/projectBoardColumn/:columnId/add',
  (req, res, next) => {
    const column_id = req.params.columnId
    const note = `${req.body.note.title} - ${req.body.note.description}`

    octokit.projects
      .createProjectCard({
        headers,
        column_id,
        note
      })
      .then(result => {
        res.sendStatus(201)
      })
      .catch(next)
  }
)

router.post('/:projectId/cards/move', (req, res, next) => {
  const id = req.body.cardId
  const column_id = +req.body.targetColumn
  octokit.projects
    .moveProjectCard({
      headers,
      id,
      position: 'top',
      column_id
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch(next)
})
