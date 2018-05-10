import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import proposals from './allProposals'
import singleProposal from './singleProposal'
import user from './user'
import messages from './chatbox'
import others from './otherUsers'
import githubProject from './github'
import chatStatus from './chatboxNav'
import githubRepos from './githubRepos'
import projectSignup from './projectSignup'
import proposal from './proposal'
import noteToAdd from './addProjectCard'
import currentOrg from './organization'

const reducer = combineReducers({
  singleProposal,
  proposals,
  user,
  others,
  messages,
  chatStatus,
  githubProject,
  githubRepos,
  projectSignup,
  proposal,
  noteToAdd,
  currentOrg
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
