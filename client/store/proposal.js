import axios from 'axios'

const POST_PROPOSAL = 'POST_PROPOSAL'
const GET_PROPOSALS = 'GET_PROPOSALS'

const postProposal = proposal => {
  return {
    type: POST_PROPOSAL,
    proposal
  }
}

const fetchProposals = proposals => {
  return {
    type: GET_PROPOSALS,
    proposals
  }
}

export const postProposalToDb = (proposal, history) => dispatch =>
  axios
    .post(`/api/orgs/proposal`, proposal)
    .then(res => res.data)
    .then(proposal => {
      dispatch(postProposal(proposal))
      history.push('/proposals')
    })
    .catch(err => console.log(err))

export const getProposalsForOrg = orgId => dispatch =>
  axios
    .get('/api/orgs/proposals', orgId)
    .then(res => res.data)
    .then(proposals => {
      dispatch(GET_PROPOSALS(proposals))
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case POST_PROPOSAL:
      return action.proposal
    case GET_PROPOSALS:
      return action.proposals
    default:
      return state
  }
}
