import axios from 'axios'

const GET_GITHUB_REPOS = 'GET_GITHUB_REPOS'

const getGithubRepos = (repos) => {
  return {
    type: GET_GITHUB_REPOS,
    repos
  }
}

export const fetchRepos = org => dispatch => {
  axios.get(`/api/github/${org}/repos`)
    .then(res => res.data)
    .then(repos => {
      dispatch(getGithubRepos(repos))
    })
    .catch(err => console.log(err))
}


export default function(state = [], action) {
  switch (action.type) {
    case GET_GITHUB_REPOS:
      return action.repos
    default:
      return state
  }
}

