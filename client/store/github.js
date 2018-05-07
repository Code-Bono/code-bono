import axios from 'axios'

const GET_PROJECT_CARDS = 'GET_PROJECT_CARDS'

const getProjectCards = (projectCards) => {
  return {
    type: GET_PROJECT_CARDS,
    projectCards
  }
}

export const fetchCards = () => dispatch =>
  axios.get(`/api/github/projects/columns/cards`)
    .then(res => res.data)
    .then(projectCards => {
      dispatch(getProjectCards(projectCards))
    })
    .catch(err => console.log(err))

export default function(state = [], action) {
  switch (action.type) {
    case GET_PROJECT_CARDS:
      return action.projectCards
    default:
      return state
  }
}

