import axios from 'axios'
import history from '../history'

const GET_ORG = 'GET_ORG'
const CREATE_ORG = 'CREATE_ORG'
const REMOVE_ORG = 'REMOVE_ORG'

const getOrg = org => ({ type: GET_ORG, org })
const postOrg = org => ({ type: CREATE_ORG, org })
const removeOrg = () => ({ type: REMOVE_ORG })

export const getCurrentOrg = id => dispatch =>
  axios
    .get(`/api/orgs/${id}`)
    .then(res => {
      dispatch(getOrg(res.data))
      history.push('/organization/home')
    })
    .catch(err => console.log(err))

export const createOrg = (orgObj, email) => dispatch =>
  axios
    .post('/api/orgs', { orgObj, email })
    .then(res => {
      dispatch(postOrg(res.data))
      history.push('/organization/home')
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ORG:
      return action.org
    case REMOVE_ORG:
      return state
    case CREATE_ORG:
      return action.org
    default:
      return state
  }
}
