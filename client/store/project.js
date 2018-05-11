import axios from 'axios'

const GET_SINGLE_PROJECT = 'GET_SINGLE_PROJECT'
const GET_ALL_PROJECTS_FOR_USER = 'GET_ALL_PROJECTS_FOR_USER'

const getSingleProject = singleProject => {
  return {
    type: GET_SINGLE_PROJECT,
    singleProject
  }
}

const getAllProjectsForUser = projects => {
  return {
    type: GET_ALL_PROJECTS_FOR_USER,
    projects
  }
}

export const fetchSingleProject = projectId => dispatch =>
  axios
    .get(`/api/projects/${projectId}`)
    .then(res => {
      dispatch(getSingleProject(res.data))
    })
    .catch(err => console.log(err))

export const fetchAllProjectsForUser = userId => dispatch =>
  axios
    .get(`/api/users/${userId}/projects/`)
    .then(res => {
      dispatch(getAllProjectsForUser(res.data))
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PROJECT:
      return action.singleProject
    case GET_ALL_PROJECTS_FOR_USER:
      return action.projects
    default:
      return state
  }
}
