const passport = require('passport')
const router = require('express').Router()
const GitHubStrategy = require('passport-github').Strategy
const { User } = require('../db/models')
module.exports = router

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('GitHub client ID / secret not found. Skipping GitHub OAuth.')
} else {
  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  }

  const strategy = new GitHubStrategy(
    githubConfig,
    (token, refreshToken, profile, done) => {
      const githubId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value
      const firstname = profile.displayName.split(' ')[0]
      const lastname = profile.displayName.split(' ').slice(1).join(' ')

      User.find({ where: { githubId } })
        .then(
          foundUser =>
            (foundUser
              ? done(null, foundUser)
              : User.create({ name, email, firstname, lastname, githubId }).then(createdUser =>
                  done(null, createdUser)
                ))
        )
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('github', { scope: 'email' }))

  router.get(
    '/callback',
    passport.authenticate('github', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    })
  )
}
