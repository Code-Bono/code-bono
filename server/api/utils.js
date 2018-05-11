const jwt = require('jsonwebtoken')
const octokit = require('@octokit/rest')()

// generate JWT (sign with RSA SHA256)
const cert = process.env.GITHUB_PRIVATE_KEY // get private key
const payload = {
  exp: Date.now() / 1000 + 100,
  iss: 11788
}
const token = jwt.sign(payload, cert, { algorithm: 'RS256' })
const createToken = octokit.apps.createInstallationToken({
  headers: {
    authorization: `Bearer ${token}`,
    accept: 'application/vnd.github.machine-man-preview+json'
  },
  installation_id: process.env.GITHUB_INSTALLATION_ID
})

let headers
createToken
  .then(installationToken => {
    headers = {
      authorization: `token ${installationToken.data.token}`,
      accept: 'application/vnd.github.inertia-preview+json'
    }
  })

// this function is run when the first user signs up for a proposal; it creates a new github repo with a project board and three columns
function githubRepoAndProjectBoardCreation (name, description) {
  let project_id;

  let columnIds = {
    toDoColumnId: null,
    inProgressColumnId: null,
    doneColumnId: null
  }

  return octokit.repos.createForOrg({
    headers,
    org: 'Code-Bono-Projects',
    name,
    description,
    has_projects: true
  })
  .then((repo) => {
    const repoNameForProjectBoard = repo.data.name
    return octokit.projects.createRepoProject({
      headers,
      owner: 'Code-Bono-Projects',
      repo: repoNameForProjectBoard,
      name: repoNameForProjectBoard
    })
  })
  .then(projectBoard => {
    project_id = projectBoard.data.id
    return octokit.projects.createProjectColumn({
      headers,
      project_id,
      name: 'To Do'
    })
  })
  .then(toDoColumn => {
    columnIds.toDoColumnId = toDoColumn.data.id
    return octokit.projects.createProjectColumn({
      headers,
      project_id,
      name: 'In Progress'
    })
  })
  .then(inProgressColumn => {
    columnIds.inProgressColumnId = inProgressColumn.data.id
    return octokit.projects.createProjectColumn({
      headers,
      project_id,
      name: 'Done'
    })
  })
  .then(doneColumn => {
    columnIds.doneColumnId = doneColumn.data.id
    return columnIds
  })
}

module.exports = {
  createToken,
  githubRepoAndProjectBoardCreation
}
