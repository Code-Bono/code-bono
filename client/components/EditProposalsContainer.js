import React, { Component } from 'react'
import EditProposals from './EditProposals'
import { connect } from 'react-redux'
import {
  getSingleProposalForOrg,
  updateSingleProposal
} from '../store/proposal'
import { fetchAllCauses } from '../store/cause'

const mapState = (state, ownProps) => {
  return {
    //passing in proposalId from URL req.params
    proposalId: ownProps.match.params.id,
    proposal: state.proposal,
    currentOrg: state.currentOrg,
    causes: state.causes
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getProposal: id => {
      dispatch(getSingleProposalForOrg(id))
    },
    loadCauses: function() {
      dispatch(fetchAllCauses())
    },
    editProposal: function(id, proposalObj) {
      let history = ownProps.history
      dispatch(updateSingleProposal(id, proposalObj, history))
    }
  }
}

export default connect(mapState, mapDispatch)(EditProposals)
