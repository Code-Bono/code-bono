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
  Cause,
  Project,
  Repo
} = require('../server/db/models')

const messages = [
  {
    content: 'Hello friends and cats',
    userId: 1,
    chatroomId: 1
  },
  {
    content: 'I prefer hard liquor',
    userId: 2,
    chatroomId: 1
  },
  {
    content: '...',
    userId: 1,
    chatroomId: 1
  },
  {
    content: "Let's save the trees!",
    userId: 3,
    chatroomId: 2
  }
]

const projects = [
  {
    name: 'Give Our Kids a Home',
    description: 'We are looking for a team to create a mobile app that matches orphans with prospective adoptive parents. The final project should support cross-platform functionality (i.e. both iOS and Android compatible). Experience with development in React Native is a major plus!',
    isActive: true,
    proposalId: 1
  },
  {
    name: 'Federation for Orphans Website Update',
    description: 'We are looking for a team to help us migrate our website from Angular to React. We are also open to a redesign of our website. Our backend uses Express and Sequelize, so it would be helpful for team members to have familiary with these technologies.',
    isActive: true,
    proposalId: 2
  },
  {
    name: 'Volunteer Platform',
    description: 'We are looking for a team to create a web app that will help us gather, screen, and onboard interested volunteers. The end project is a user-friendly way for us to review profiles and select passionate volunteers with appropriate backgrounds to help us with long-term contributions.',
    isActive: true,
    proposalId: 3
  },
  {
    name: 'Database Management System Migration',
    description: 'We are changing how we manage our data and are are looking for a team with experience in database transformation. We currenly use an Oracle database management system and are considering switching to SQL. We are also open to other alternatives, and are hoping to gather expertise from the team working on this project.',
    isActive: true,
    proposalId: 4
  },
  {
    name: 'Save the Cyborg Bamboo Forest',
    description:
      'Help us build a mobile app that tracks cyborg bamboo deforestation. The app should incorporate data visualization in a user-friendly interface. It should provide alerts for accelerated deforestation and identify the location in which it occurs.',
    isActive: true,
    proposalId: 5
  },
  {
    name: 'Cyborg Panda Maintanence Tool',
    description: 'We are looking or a team to build a web app that helps zookeepers provide the best care for their specific cyborg needs. Cyborg pandas are some of the most beautiful creatures in captivity. As they are part robot, they require an increased amount of care in both biological and mechanical form.',
    isActive: true,
    proposalId: 6
  },
  {
    name: 'Firebase Integration',
    description: 'Despite the popular opinion that Firebase is trash, we would like to find a team to help us implement it. We are also open to the use of Cloud FireStore - experience with either of these technologies would be greatly appreciated.',
    isActive: true,
    proposalId: 7
  },
  {
    name: 'Manual Data Entry',
    description: 'We know that developers are good at typing, so we would like to find a team to type a bunch of things into our system. This will definitely be the most efficient way of completing the task.',
    isActive: true,
    proposalId: 8
  },
  {
    name: 'Feed the cats',
    description: 'Wine cats would appreciate some wine.',
    isActive: true,
    proposalId: 9
  }
]



const repos = [
  {
    name: 'Give-Our-Kids-a-Home',
    toDoColumnId: 2702966,
    inProgressColumnId: 2702967,
    doneColumnId: 2702968,
    projectId: 1
  },
  {
    name: 'Federation-for-Orphans-Website-Update',
    toDoColumnId: 2702969,
    inProgressColumnId: 2702970,
    doneColumnId: 2702971,
    projectId: 2
  },
  {
    name: 'Volunteer-Platform',
    toDoColumnId: 2702972,
    inProgressColumnId: 2702973,
    doneColumnId: 2702974,
    projectId: 3
  },
  {
    name: 'Database-Management-System-Migration',
    toDoColumnId: 2702975,
    inProgressColumnId: 2702976,
    doneColumnId: 2702977,
    projectId: 4
  },
  {
    name: 'Save-the-Cyborg-Bamboo-Forest',
    toDoColumnId: 2702978,
    inProgressColumnId: 2702979,
    doneColumnId: 2702980,
    projectId: 5
  },
  {
    name: 'Cyborg-Panda-Maintanence-Tool',
    toDoColumnId: 2702981,
    inProgressColumnId: 2702982,
    doneColumnId: 2702983,
    projectId: 6
  },
  {
    name: 'Firebase-Integration',
    toDoColumnId: 2702986,
    inProgressColumnId: 2702987,
    doneColumnId: 2702988,
    projectId: 7
  },
  {
    name: 'Manual-Data-Entry',
    toDoColumnId: 2702989,
    inProgressColumnId: 2702990,
    doneColumnId: 2702991,
    projectId: 8
  },
  {
    name: 'Feed-the-cats',
    toDoColumnId: 2702992,
    inProgressColumnId: 2702993,
    doneColumnId: 2702994,
    projectId: 9
  }
]

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
    description:
      'For over 200 years, we have help orphaned children by providing them with the resources that they need to succeed in childhood and beyond. We opened our doors in 1809 as the first institution in the United States devoted exclusively to the care of abandoned, neglected infants, regardless of race or creed. The Federation for Orphans reaches 34,000 children and families each year in all five boroughs of New York City, surrounding counties, and Puerto Rico. We offer a unique career opportunity: the chance to engage in rewarding daily work, and learn new skills from innovative industry leaders, while having the peace of mind that comes with the stability of a reuptable organization.',
    address: '123 Hanover Sq, New York, NY 10004',
    email: 'info@ffo.org',
    phoneNumber: '1234567890'
  },
  {
    name: 'Cyborg Panda Conservation Consortium',
    description:
      'Cyborg pandas play a crucial role in the cyborg bamboo forests where they roam by spreading seeds and facilitating growth of cyborg vegetation. In the Yangtze Basin where cyborg pandas live, the cyborg forests are home to a stunning array of cyborg wildlife such as cyborg dwarf blue sheep, cyborg multicolored pheasants and other endangered cyborg species, including the cyborg golden monkey, cyborg takin and cyborg crested ibis. The cyborg  panda’s habitat is at the geographic and economic heart of China, home to millions of people. By making this area more sustainable, we are also helping to increase the quality of life of local populations. Cyborg pandas bring huge economic benefits to local communities through cyborg ecotourism.',
    address: '987 Wall St, New York, NY 10005',
    email: 'hello@cpcc.org',
    phoneNumber: '0987654321'
  }
]

const chatrooms = [{ name: 'Wine Cats!' }, { name: 'Trees!' }]

const proposals = [
  {
    name: 'Give Our Kids a Home',
    description:
      'We are looking for a team to create a mobile app that matches orphans with prospective adoptive parents. The final project should support cross-platform functionality (i.e. both iOS and Android compatible). Experience with development in React Native is a major plus!',
    deadline: '2018-06-22',
    isActive: true,
    image: 'http://www.tedthomas.com/wp-content/uploads/2017/01/home1.png',
    organizationId: 1
  },
  {
    name: 'Federation for Orphans Website Update',
    description:
      'We are looking for a team to help us migrate our website from Angular to React. We are also open to a redesign of our website. Our backend uses Express and Sequelize, so it would be helpful for team members to have familiary with these technologies.',
    deadline: '2018-08-13',
    image:
      'https://s3-media2.fl.yelpcdn.com/bphoto/yzBRa3vDfi6rlh0TnqeByg/o.jpg',
    isActive: true,
    organizationId: 1
  },
  {
    name: 'Volunteer Platform',
    description:
      'We are looking for a team to create a web app that will help us gather, screen, and onboard interested volunteers. The end project is a user-friendly way for us to review profiles and select passionate volunteers with appropriate backgrounds to help us with long-term contributions.',
    deadline: '2018-07-03',
    image:
      'http://hamelintrust.org.uk/wp-content/uploads/2015/07/volunteer-wordall.png',
    isActive: true,
    organizationId: 1
  },
  {
    name: 'Database Management System Migration',
    description:
      'We are changing how we manage our data and are are looking for a team with experience in database transformation. We currenly use an Oracle database management system and are considering switching to SQL. We are also open to other alternatives, and are hoping to gather expertise from the team working on this project.',
    deadline: '2018-05-29',
    isActive: true,
    organizationId: 1
  },
  {
    name: 'Save the Cyborg Bamboo Forest',
    description:
      'Help us build a mobile app that tracks cyborg bamboo deforestation. The app should incorporate data visualization in a user-friendly interface. It should provide alerts for accelerated deforestation and identify the location in which it occurs.',
    deadline: '2018-10-17',
    image:
      'http://www.wormfood.co.uk/wp-content/uploads/2013/05/cyborgs-bamboo-bw.jpg',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Cyborg Panda Maintanence Tool',
    description:
      'We are looking or a team to build a web app that helps zookeepers provide the best care for their specific cyborg needs. Cyborg pandas are some of the most beautiful creatures in captivity. As they are part robot, they require an increased amount of care in both biological and mechanical form.',
    deadline: '2018-08-13',
    image:
      'https://orig00.deviantart.net/b481/f/2013/136/e/5/cyborg_pandas_by_z_studios-d65htmk.png',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Firebase Integration',
    description:
      'Despite the popular opinion that Firebase is trash, we would like to find a team to help us implement it. We are also open to the use of Cloud FireStore - experience with either of these technologies would be greatly appreciated.',
    deadline: '2018-12-19',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Manual Data Entry',
    description:
      'We know that developers are good at typing, so we would like to find a team to type a bunch of things into our system. This will definitely be the most efficient way of completing the task.',
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
  await Project.bulkCreate(projects)
  await Message.bulkCreate(messages)
  await Repo.bulkCreate(repos)
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
      console.log(`seeded ${messages.length} messages`)
      console.log(`seeded ${projects.length} projects`)
      console.log(`seeded ${repos.length} repos`)
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
