import axios from 'axios'

const GET_OTHER_USERS = 'GET_USERS'

const getAllOtherUsers = users => {
  return {
    type: GET_OTHER_USERS,
    users
  }
}

export const fetchOtherUsers = () => dispatch =>
  axios
    .get('/api/users')
    .then(res => dispatch(getAllOtherUsers(res.data)))
    .catch(err => console.log(err))

export default function(state = [], action) {
  switch (action.type) {
    case GET_OTHER_USERS:
      return action.users
    default:
      return state
  }
}
