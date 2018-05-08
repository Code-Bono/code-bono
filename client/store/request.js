import axios from 'axios'

const POST_REQUEST = 'POST_REQUEST'

const postRequest = request => {
  return {
    type: POST_REQUEST,
    request
  }
}

export const postRequestToDb = (request, history) => dispatch =>
  axios
    .post(`/api/orgs/post-request`, request)
    .then(res => res.data)
    .then(request => {
      dispatch(postRequest(request))
      history.push('/')
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case POST_REQUEST:
      return action.request
    default:
      return state
  }
}
