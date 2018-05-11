import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import proposals from './allProposals'
import singleProposal from './singleProposal'
import user from './user'
import messages from './chatbox'
import others from './otherUsers'
import githubProjectCards from './githubProjectCards'
import chatStatus from './chatboxNav'
import projectSignup from './projectSignup'
import proposal from './proposal'
import noteToAdd from './addProjectCard'
import currentOrg from './organization'
import singleProject from './project'
import causes from './cause'

const reducer = combineReducers({
  singleProposal,
  proposals,
  user,
  others,
  messages,
  chatStatus,
  githubProjectCards,
  projectSignup,
  proposal,
  noteToAdd,
  currentOrg,
  singleProject,
  causes
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
