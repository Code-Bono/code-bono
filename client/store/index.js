import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import causes from './cause'
import chatStatus from './chatboxNav'
import currentOrg from './organization'
import events from './githubFeed'
import githubProjectCards from './githubProjectCards'
import messages from './chatbox'
import noteToAdd from './addProjectCard'
import others from './otherUsers'
import projectSignup from './projectSignup'
import proposal from './proposal'
import proposals from './allProposals'
import singleProject from './project'
import singleProposal from './singleProposal'
import user from './user'
import toastProject from './fetchProjectForToast'
import assignedProjects from './projectsForUser'

const reducer = combineReducers({
  causes,
  chatStatus,
  currentOrg,
  githubProjectCards,
  events,
  messages,
  noteToAdd,
  others,
  projectSignup,
  proposal,
  proposals,
  singleProject,
  singleProposal,
  user,
  toastProject,
  assignedProjects
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
