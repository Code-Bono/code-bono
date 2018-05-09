import axios from 'axios'
import history from '../history'

const GET_ORG = 'GET_ORG'
const REMOVE_ORG = 'REMOVE_ORG'

const getOrg = org => ({ type: GET_ORG, org })
const removeOrg = () => ({ type: REMOVE_ORG })

export const createOrg = (orgObj, email) => dispatch =>
  axios
    .post('/api/orgs', { orgObj, email })
    .then(res => {
      dispatch(getOrg(res.data))
      history.push('/home')
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ORG:
      return action.org
    case REMOVE_USER:
      return state
    default:
      return state
  }
}
