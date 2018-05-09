import axios from 'axios'

const POST_PROPOSAL = 'POST_PROPOSAL'

const postProposal = proposal => {
  return {
    type: POST_PROPOSAL,
    proposal
  }
}

export const postProposalToDb = (proposal, history) => dispatch =>
  axios
    .post(`/api/orgs/proposal`, proposal)
    .then(res => res.data)
    .then(proposal => {
      dispatch(postProposal(proposal))
      history.push('/')
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case POST_PROPOSAL:
      return action.proposal
    default:
      return state
  }
}
