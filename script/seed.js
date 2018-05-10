/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {
  User,
  Chatroom,
  Message,
  Organization,
  Proposal,
  Cause
} = require('../server/db/models')

const users = [
  { email: 'cody@email.com', password: '123' },
  { email: 'murphy@email.com', password: '123' },
  { email: 'danny@email.com', password: '123' },
  { email: 'gg@email.com', password: '123' },
  { email: 'ian@email.com', password: '123' },
  { email: 'yoni@email.com', password: '123' }
]

const causes = [
  { name: 'Mentoring' },
  { name: 'Arts' },
  { name: 'Counselling' },
  { name: 'Conservation' }
]

const organizations = [
  {
    name: 'Federation for Orphans',
    description: 'We help orphaned children',
    address: '123 Hanover Sq',
    email: 'info@ffo.org',
    phoneNumber: '1234567890'
  },
  {
    name: 'Cyborg Panda Conservation Consortium',
    description: 'Save the cyborg pandas',
    address: '987 Wall St',
    email: 'hello@cpcc.org',
    phoneNumber: '0987654321'
  }
]

const chatrooms = [{ name: 'Test Room 1' }, { name: 'Test Room 2' }]

const proposals = [
  {
    name: 'Give Our Kids a Home',
    description:
      'We are looking for a team to create a mobile app that matches orphans with prospective adoptive parents.',
    deadline: '2018-06-22',
    isActive: true,
    image: 'http://www.tedthomas.com/wp-content/uploads/2017/01/home1.png',
    organizationId: 1
  },
  {
    name: 'Federation for Orphans Website Update',
    description:
      'We are looking for a team to help us migrate our website from Angular to React.',
    deadline: '2018-08-13',
    image:
      'https://s3-media2.fl.yelpcdn.com/bphoto/yzBRa3vDfi6rlh0TnqeByg/o.jpg',
    isActive: true,
    organizationId: 1
  },
  {
    name: 'Volunteer Platform',
    description:
      'We are looking for a team to create a web app that will help us gather, screen, and onboard interested volunteers.',
    deadline: '2018-07-03',
    image:
      'http://hamelintrust.org.uk/wp-content/uploads/2015/07/volunteer-wordall.png',
    isActive: true,
    organizationId: 1
  },
  {
    name: 'Database Management System Migration',
    description:
      'We are changing how we manage our data and are very confused.',
    deadline: '2018-05-29',
    isActive: true,
    organizationId: 1
  },
  {
    name: 'Save the Cyborg Bamboo Forest',
    description:
      'Help us build a mobile app that tracks cyborg bamboo deforestation.',
    deadline: '2018-10-17',
    image:
      'http://www.wormfood.co.uk/wp-content/uploads/2013/05/cyborgs-bamboo-bw.jpg',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Cyborg Panda Maintanence Tool',
    description:
      'Cyborg pandas are some of the most beautiful creatures in captivity. We are looking or a team to build a web app that helps zookeepers provide the best care for their specific cyborg needs.',
    deadline: '2018-08-13',
    image:
      'https://orig00.deviantart.net/b481/f/2013/136/e/5/cyborg_pandas_by_z_studios-d65htmk.png',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Firebase Integration',
    description:
      'Despite the popular opinion that Firebase is trash, we would like to find a team to help us implement it.',
    deadline: '2018-12-19',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Manual Data Entry',
    description:
      'We know that developers are good at typing, so we would like to find a team to type a bunch of things into our system, which will be the most efficient way of completing the task.',
    deadline: '2019-01-15',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqkdNkU2FgaEss7GdUh2-YA2XXYuFEqVlxSHbqj58UN9tT_hNoA',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Feed the cats',
    description: 'Wine cats would appreciate some wine.',
    deadline: '2018-04-13',
    image: 'https://i.imgflip.com/f0g9y.jpg',
    isActive: true,
    organizationId: 2
  }
]

const seed = async () => {
  await User.bulkCreate(users)
  await Organization.bulkCreate(organizations)
  await Chatroom.bulkCreate(chatrooms)
  await Proposal.bulkCreate(proposals)
  await Cause.bulkCreate(causes)
}

const main = () => {
  console.log('Syncing db...')
  db
    .sync({ force: true })
    .then(() => {
      console.log('Seeding databse...')
      console.log(`seeded ${users.length} users`)
      console.log(`seeded ${chatrooms.length} chatrooms`)
      console.log(`seeded ${organizations.length} organizations`)
      console.log(`seeded ${proposals.length} proposals`)
      console.log(`seeded ${causes.length} causes`)
      console.log(`seeded successfully`)
      return seed()
    })
    .catch(err => {
      console.log('Error while seeding')
      console.log(err.stack)
    })
    .then(() => {
      db.close()
      return null
    })
}

main()
