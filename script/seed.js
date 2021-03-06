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
    content: 'Hello friends!',
    userId: 1,
    chatroomId: 8
  },
  {
    content: 'How is everyone doing?',
    userId: 2,
    chatroomId: 8
  },
  {
    content: '...',
    userId: 1,
    chatroomId: 8
  },
  {
    content: "Let's save the trees!",
    userId: 3,
    chatroomId: 5
  }
]

const chatrooms = [
  { name: 'Give Kids a Home!', projectId: 1 },
  { name: 'Update Site!', projectId: 2 },
  { name: 'Volunteer Platform!', projectId: 3 },
  { name: 'Database Migration!', projectId: 4 },
  { name: 'Save the Trees!', projectId: 5 },
  { name: 'Help the Pandas!', projectId: 6 },
  { name: 'Firebase!', projectId: 7 },
  { name: 'Manual Data Entry!', projectId: 8 }
]

const projects = [
  {
    name: 'Give Our Kids a Home',
    description:
      'We are looking for a team to create a mobile app that matches orphans with prospective adoptive parents. The final project should support cross-platform functionality (i.e. both iOS and Android compatible). Experience with development in React Native is a major plus!',
    isActive: true,
    proposalId: 1
  },
  {
    name: 'Federation for Orphans Website Update',
    description:
      'We are looking for a team to help us migrate our website from Angular to React. We are also open to a redesign of our website. Our backend uses Express and Sequelize, so it would be helpful for team members to have familiary with these technologies.',
    isActive: true,
    proposalId: 7
  },
  {
    name: 'Volunteer Platform',
    description:
      'We are looking for a team to create a web app that will help us gather, screen, and onboard interested volunteers. The end project is a user-friendly way for us to review profiles and select passionate volunteers with appropriate backgrounds to help us with long-term contributions.',
    isActive: true,
    proposalId: 2
  },
  {
    name: 'Database Management System Migration',
    description:
      'We are changing how we manage our data and are are looking for a team with experience in database transformation. We currenly use an Oracle database management system and are considering switching to SQL. We are also open to other alternatives, and are hoping to gather expertise from the team working on this project.',
    isActive: true,
    proposalId: 3
  },
  {
    name: 'Save the Bamboo Forest',
    description:
      'Help us build a mobile app that tracks bamboo deforestation. The app should incorporate data visualization in a user-friendly interface. It should provide alerts for accelerated deforestation and identify the location in which it occurs.',
    isActive: true,
    proposalId: 4
  },
  {
    name: 'Help The Panda\'s Maintanence Tool',
    description:
      'We are looking or a team to build a web app that helps zookeepers provide the best care for their specific needs. Pandas are some of the most beautiful creatures in captivity. As they are part robot, they require an increased amount of care in both biological and mechanical form.',
    isActive: true,
    proposalId: 5
  },
  {
    name: 'Firebase Integration',
    description:
      'Despite the popular opinion that Firebase is trash, we would like to find a team to help us implement it. We are also open to the use of Cloud FireStore - experience with either of these technologies would be greatly appreciated.',
    isActive: true,
    proposalId: 6
  },
  {
    name: 'Manual Data Entry',
    description:
      'We know that developers are good at typing, so we would like to find a team to type a bunch of things into our system. This will definitely be the most efficient way of completing the task.',
    isActive: true,
    proposalId: 8
  }
]

const repos = [
  {
    name: 'Give-Our-Kids-a-Home',
    id: 133154303,
    toDoColumnId: 2702966,
    inProgressColumnId: 2702967,
    doneColumnId: 2702968,
    projectId: 1
  },
  {
    name: 'Federation-for-Orphans-Website-Update',
    id: 133154324,
    toDoColumnId: 2702969,
    inProgressColumnId: 2702970,
    doneColumnId: 2702971,
    projectId: 2
  },
  {
    name: 'Volunteer-Platform',
    id: 133154338,
    toDoColumnId: 2702972,
    inProgressColumnId: 2702973,
    doneColumnId: 2702974,
    projectId: 3
  },
  {
    name: 'Database-Management-System-Migration',
    id: 133154570,
    toDoColumnId: 2702975,
    inProgressColumnId: 2702976,
    doneColumnId: 2702977,
    projectId: 4
  },
  {
    name: 'Save-the-Cyborg-Bamboo-Forest',
    id: 133154620,
    toDoColumnId: 2702978,
    inProgressColumnId: 2702979,
    doneColumnId: 2702980,
    projectId: 5
  },
  {
    name: 'Cyborg-Panda-Maintanence-Tool',
    id: 133154646,
    toDoColumnId: 2702981,
    inProgressColumnId: 2702982,
    doneColumnId: 2702983,
    projectId: 6
  },
  {
    name: 'Firebase-Integration',
    id: 133154676,
    toDoColumnId: 2702986,
    inProgressColumnId: 2702987,
    doneColumnId: 2702988,
    projectId: 7
  },
  {
    name: 'Manual-Data-Entry',
    id: 133154691,
    toDoColumnId: 2702989,
    inProgressColumnId: 2702990,
    doneColumnId: 2702991,
    projectId: 8
  }
]

const users = [
  {
    firstname: 'Debbie',
    lastname: 'Developer',
    email: 'dev@fullstack.com',
    password:
      'd0751a79c977de8cb0a5ad0889b104398a6c836333e448ece8c35fffd6f6af60',
    salt: 'TDWmW7wWC/AOsWREjpi33w=='
  },
  {
    firstname: 'Randy',
    lastname: 'Representative',
    email: 'rep@nonprofit.org',
    password:
      'd0751a79c977de8cb0a5ad0889b104398a6c836333e448ece8c35fffd6f6af60',
    salt: 'TDWmW7wWC/AOsWREjpi33w==',
    orgId: 2
  },
  {
    firstname: 'Cody',
    lastname: 'Smith',
    email: 'cody@email.com',
    password: '123'
  },
  {
    firstname: 'Murphy',
    lastname: 'Johnson',
    email: 'murphy@email.com',
    password: '123'
  },
  {
    firstname: 'Danny',
    lastname: 'Brown',
    email: 'danny@email.com',
    password: '123',
    projectId: 2
  },
  {
    firstname: 'Geena',
    lastname: 'Gao',
    email: 'gg@email.com',
    password: '123'
  },
  {
    firstname: 'Ian',
    lastname: 'Dewsbury',
    email: 'ian@email.com',
    password: '123'
  },
  {
    firstname: 'Yoni',
    lastname: 'Slotwiner',
    email: 'yoni@email.com',
    password: 'abc'
  },
  {
    firstname: 'Sample 1',
    lastname: 'User 2',
    email: 'user1@email.com',
    password: 'abc'
  },
  {
    firstname: 'Sample 2',
    lastname: 'User 2',
    email: 'user2@email.com',
    password: 'abc'
  },
  {
    firstname: 'Sample 3',
    lastname: 'User 3',
    email: 'user3@email.com',
    password: 'abc'
  },
  {
    firstname: 'Sample 4',
    lastname: 'User 4',
    email: 'user4@email.com',
    password: 'abc'
  },
  {
    firstname: 'Sample 5',
    lastname: 'User 5',
    email: 'user5@email.com',
    password: 'abc'
  },
  {
    firstname: 'Sample 6',
    lastname: 'User 6',
    email: 'user6@email.com',
    password: 'abc'
  },
  {
    firstname: 'Sample 7',
    lastname: 'User 7',
    email: 'user7@email.com',
    password: 'abc'
  }
]

const causes = [
  { name: 'Mentoring' },
  { name: 'Arts' },
  { name: 'Counselling' },
  { name: 'Conservation' },
  { name: 'Climate Change' },
  { name: 'Human Rights' },
  { name: 'Equality' },
  { name: 'Animal Welfare' },
  { name: 'Criminal Justice' },
  { name: 'Youth Issues' },
  { name: 'Resource Preservation' },
  { name: 'Water' },
  { name: 'Diversity' },
  { name: 'Equal Access' },
  { name: 'Microfinance' },
  { name: 'Early Childhood Development' },
  { name: 'Disaster Relief' },
  { name: 'Conflict Resolution' }
]

const organizations = [
  {
    name: 'Federation for Orphans',
    description:
      'For over 200 years, we have help orphaned children by providing them with the resources that they need to succeed in childhood and beyond. We opened our doors in 1809 as the first institution in the United States devoted exclusively to the care of abandoned, neglected infants, regardless of race or creed. The Federation for Orphans reaches 34,000 children and families each year in all five boroughs of New York City, surrounding counties, and Puerto Rico. We offer a unique career opportunity: the chance to engage in rewarding daily work, and learn new skills from innovative industry leaders, while having the peace of mind that comes with the stability of a reputable organization.',
    address: '123 Hanover Sq, New York, NY 10004',
    email: 'info@ffo.org',
    phoneNumber: '1234567890'
  },
  {
    name: 'Panda Conservation Consortium',
    description:
      'Pandas play a crucial role in the bamboo forests where they roam by spreading seeds and facilitating growth of vegetation. In the Yangtze Basin where pandas live, the forests are home to a stunning array of wildlife such as dwarf blue sheep, multicolored pheasants and other endangered species, including the golden monkey, takin and crested ibis. The  panda’s habitat is at the geographic and economic heart of China, home to millions of people. By making this area more sustainable, we are also helping to increase the quality of life of local populations. pandas bring huge economic benefits to local communities through ecotourism.',
    address: '987 Wall St, New York, NY 10005',
    email: 'hello@cpcc.org',
    phoneNumber: '0987654321'
  }
]

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
    image: 'https://www.issart.com/blog/wp-content/uploads/2017/03/boxbarimage5.jpg',
    isActive: true,
    organizationId: 1
  },
  {
    name: 'Save the Bamboo Forest',
    description:
      'Help us build a mobile app that tracks bamboo deforestation. The app should incorporate data visualization in a user-friendly interface. It should provide alerts for accelerated deforestation and identify the location in which it occurs.',
    deadline: '2018-10-17',
    image:
      'https://i.ytimg.com/vi/aPtNP6HtRPU/hqdefault.jpg',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Help-The-Panda\'s Maintanence Tool',
    description:
      'We are looking or a team to build a web app that helps zookeepers provide the best care for their specific needs. Pandas are some of the most beautiful creatures in captivity. As they are part robot, they require an increased amount of care in both biological and mechanical form.',
    deadline: '2018-08-13',
    image:
      'https://timeincsecure-a.akamaihd.net/rtmp_uds/293884104/201609/2165/293884104_5112162189001_5112146586001-vs.jpg?pubId=293884104&videoId=5112146586001',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Firebase Integration',
    description:
      'Despite the popular opinion that Firebase is trash, we would like to find a team to help us implement it. We are also open to the use of Cloud FireStore - experience with either of these technologies would be greatly appreciated.',
    deadline: '2018-12-19',
    image: 'https://pbs.twimg.com/profile_images/862445411017138176/ZZV_0Xlt_400x400.jpg',
    isActive: true,
    organizationId: 2
  },
  {
    name: 'Federation for Orphans Website Update',
    description:
      'We are looking for a team to help us migrate our website from Angular to React. We are also open to a redesign of our website. Our backend uses Express and Sequelize, so it would be helpful for team members to have familiary with these technologies.',
    deadline: '2018-08-13',
    image:
      'http://data.freehdw.com/hiro-baymax-and-tadashi-big-hero-6.jpg',
    isActive: true,
    organizationId: 1
  },
  {
    name: 'Manual Data Entry',
    description:
      'We know that developers are good at typing, so we would like to find a team to type a bunch of things into our system. This will definitely be the most efficient way of completing the task.',
    deadline: '2019-01-15',
    image:
      'https://www.laserfiche.com/content/uploads/2014/07/shutterstock_99775238.jpg',
    isActive: true,
    organizationId: 2
  }
]

const seed = async () => {
  await Organization.bulkCreate(organizations)
  await Proposal.bulkCreate(proposals)
  await Project.bulkCreate(projects)
  await User.bulkCreate(users)
  await Cause.bulkCreate(causes)
  await Chatroom.bulkCreate(chatrooms)
  await Message.bulkCreate(messages)
  await Repo.bulkCreate(repos)
  // await Collaboration.bulkCreate(collaborations)
}

const main = () => {
  console.log('Syncing db...')
  db
    .sync({ force: true })
    .then(() => {
      console.log('Seeding database...')
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
