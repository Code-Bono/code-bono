import axios from 'axios'

const GET_TOAST_PROJECT = 'GET_TOAST_PROJECT'

const getSingleToastProject = project => {
  return {
    type: GET_TOAST_PROJECT,
    project
  }
}

export const fetchToastProject = projectId => dispatch =>
  axios
    .get(`/api/projects/${projectId}`)
    .then(res => {
      dispatch(getSingleToastProject(res.data))
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case GET_TOAST_PROJECT:
      return action.project
    default:
      return state
  }
}
