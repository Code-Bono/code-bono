import axios from 'axios'

const GET_SINGLE_PROJECT = 'GET_SINGLE_PROJECT'

const getSingleProject = singleProject => {
  return {
    type: GET_SINGLE_PROJECT,
    singleProject
  }
}

export const fetchSingleProject = projectId => dispatch =>
  axios
    .get(`/api/projects/${projectId}`)
    .then(res => {
      dispatch(getSingleProject(res.data))
      console.log('DATA', res.data)
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PROJECT:
      return action.singleProject
    default:
      return state
  }
}
