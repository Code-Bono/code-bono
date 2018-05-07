const fs = require('fs')
const jwt = require('jsonwebtoken')
const octokit = require('@octokit/rest')()

// generate JWT (sign with RSA SHA256)
const cert = fs.readFileSync(
  '/Users/iandewsbury/Desktop/code-bono-projects.2018-05-04.private-key.pem'
) // get private key
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

module.exports = createToken