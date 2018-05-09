import axios from 'axios'

const GET_SINGLE_PROPOSAL = 'GET_SINGLE_PROPOSAL'

const getSingleProposal = proposal => {
  return {
    type: GET_SINGLE_PROPOSAL,
    proposal
  }
}

export const fetchSingleProposal = (proposalId) => dispatch =>
  axios
    .get(`/api/proposals/${proposalId}`)
    .then(res => {
      dispatch(getSingleProposal(res.data))
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PROPOSAL:
      return action.proposal
    default:
      return state
  }
}
