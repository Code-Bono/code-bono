import axios from 'axios'

const GET_ALL_PROPOSALS = 'GET_ALL_PROPOSALS'

const getAllProposals = proposals => {
  return {
    type: GET_ALL_PROPOSALS,
    proposals
  }
}

export const fetchAllProposals = () => dispatch =>
  axios
    .get('/api/proposals')
    .then(res => {
      dispatch(getAllProposals(res.data))
    })
    .catch(err => console.log(err))

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_PROPOSALS:
      return action.proposals
    default:
      return state
  }
}
