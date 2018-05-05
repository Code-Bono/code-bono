const fs = require('fs')

// 1. generate JWT
function github () {


var jwt = require('jsonwebtoken');

// sign with RSA SHA256
var cert = fs.readFileSync('/Users/yoni/Downloads/code-bono-projects.2018-05-04.private-key.pem');  // get private key
const payload = {
  exp: Date.now() / 1000 + 100,
  iss: 11788
}

var token = jwt.sign(payload, cert, { algorithm: 'RS256'});

// 2. Use JWT to get installation id

const octokit = require('@octokit/rest')()

octokit.apps.createInstallationToken({
    headers: {
    authorization: `Bearer ${token}`,
    accept: 'application/vnd.github.machine-man-preview+json'
  },
  installation_id: 152649
})
.then(data => console.log('TOEKN!!!!!!!', data.data.token))

// 3. use installation token to access restricted api

octokit.projects.createRepoProject({
  headers: {
    authorization: 'token v1.8cbeb7ab436df2cfbfd1a13fe89f0be55869b601',
    accept: 'application/vnd.github.inertia-preview+json'
  },
  owner: 'Code-Bono-Projects',
  repo: 'code-bono-test1',
  name: 'project-test4'
})
.then(result => console.log('PROJECT!!!!', result))
.then(err => console.log(err))

}

module.exports = github;
