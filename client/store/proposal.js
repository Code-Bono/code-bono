import axios from 'axios'

const POST_PROPOSAL = 'POST_PROPOSAL'
const GET_PROPOSALS = 'GET_PROPOSALS'
const UPDATE_PROPOSAL = 'UPDATE_PROPOSAL'
const GET_PROPOSAL = 'GET_PROPOSAL'
const DELETE_PROPOSAL = 'DELETE_PROPOSAL'

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

const updateProposal = proposal => {
  return {
    type: UPDATE_PROPOSAL,
    proposal
  }
}

const fetchSingleProposal = proposal => {
  return {
    type: GET_PROPOSAL,
    proposal
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

export const getProposalsForOrg = orgId => dispatch => {
  axios
    .get(`/api/orgs/${orgId}/proposals/`)
    .then(res => res.data)
    .then(proposals => {
      dispatch(fetchProposals(proposals))
    })
    .catch(err => console.log(err))
}

export const getSingleProposalForOrg = proposalId => dispatch => {
  axios
    .get(`/api/proposals/${proposalId}`)
    .then(res => res.data)
    .then(proposal => {
      dispatch(fetchSingleProposal(proposal))
    })
    .catch(err => console.log(err))
}

export const updateSingleProposal = (
  proposalId,
  proposal,
  history
) => dispatch => {
  axios
    .put(`/api/proposals/${proposalId}`, proposal)
    .then(res => res.data)
    .then(proposal => {
      dispatch(updateProposal(proposal))
      history.push(`/proposals/${proposalId}`)
    })
    .catch(err => console.log(err))
}

export const deleteSingleProposal = (id, history) => dispatch =>
  axios
    .delete(`/api/proposals/${id}`)
    .then(res => res.data)
    .then(proposal => {
      dispatch(updateProposal(proposal))
      history.push(`/organization/home`)
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case POST_PROPOSAL:
      return action.proposal
    case GET_PROPOSALS:
      return action.proposals
    case GET_PROPOSAL:
      return action.proposal
    default:
      return state
  }
}
