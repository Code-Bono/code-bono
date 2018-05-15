const router = require('express').Router()
const { User, Project } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  User.findOne({
    where: { id },
    // Don't return password!
    attributes: ['id', 'email', 'firstname', 'lastname', 'displayName', 'bio', 'imageUrl', 'orgId'],
    include: [{ model: Project }]
  })
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.update(req.body)
    })
    .then(user => res.json(user))
    .catch(next)
})

router.get('/:id/projects', (req, res, next) => {
  const id = req.params.id
  User.findById(id)
    .then(user => user.getProjects())
    .then(projects => res.json(projects))
    .catch(next)
})
