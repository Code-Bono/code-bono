import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const UPDATE_PROFILE = 'UPDATE_PROFILE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

export const auth = (email, password, firstname, lastname, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password, firstname, lastname })
    .then(
      res => {
        dispatch(getUser(res.data))
        if (res.data.orgId) {
          history.push('/organization/home')
        } else if (res.data.orgId === null) {
          history.push('/profile')
        }
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const fetchUser = userId => dispatch =>
  axios
    .get(`/api/users/${userId}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(err => console.log(err))

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/home')
    })
    .catch(err => console.log(err))

export const getUserById = id => dispatch =>
  axios
    .get(`/api/users/${id}`)
    .then(res => dispatch(getUser(res.data)))
    .catch(err => console.log(err))

export const updateProfile = (userId, userObj, history) => dispatch =>
  axios
    .put(`/api/users/${userId}`, userObj)
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/profile')
    })
    .catch(err => console.log(err))

//Model for editing profile
//   export const postProposalToDb = (proposal) => dispatch =>
// axios
//   .post(`/api/orgs/proposal`, proposal)
//   .then(res => res.data)
//   .then(proposal => {
//     dispatch(postProposal(proposal))
//     history.push('/proposals')
//   })
//   .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
