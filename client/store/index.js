import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import messages from './chatbox'
import others from './otherUsers'
import githubProject from './github'
import chatStatus from './chatboxNav'
import githubRepos from './githubRepos'
import proposal from './proposal'
import noteToAdd from './addProjectCard'

const reducer = combineReducers({
  chatStatus,
  others,
  githubProject,
  githubRepos,
  messages,
  noteToAdd,
  proposal,
  user
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
