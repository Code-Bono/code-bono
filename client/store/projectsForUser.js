import axios from 'axios'

const GET_USER_PROJECTS = 'GET_USER_PROJECTS'

const getUserProjects = projects => {
  return {
    type: GET_USER_PROJECTS,
    projects
  }
}
export const fetchAllProjectsForUser = userId => dispatch =>
  axios
    .get(`/api/users/${userId}/projects/`)
    .then(res => {
      dispatch(getUserProjects(res.data))
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_PROJECTS:
      return action.projects
    default:
      return state
  }
}
