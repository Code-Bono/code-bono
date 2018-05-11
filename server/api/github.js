const router = require('express').Router()
const {createToken} = require('./utils')
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


// router.get('/repos/:owner/:repo/issues/events', (req, res, next) => {
//   let headers
//   const owner = req.params.owner
//   const repo = req.params.repo

//   createToken
//     .then(installationToken => {
//       headers = {
//         authorization: `token ${installationToken.data.token}`,
//         accept: 'application/vnd.github.inertia-preview+json'
//       }
//     })
//     .then(() => {
//       return octokit.activity.getEventsForRepo({
//         headers,
//         owner,
//         repo
//       })
//     })
//     .then(events => {
//       res.json(events)
//     })
//     .catch(next)
// })
