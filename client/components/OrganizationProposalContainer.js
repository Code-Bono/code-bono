import React, { Component } from 'react'
import OrganizationProposal from './OrganizationProposal'
import { connect } from 'react-redux'
import { postProposalToDb } from '../store/proposal'
import { fetchAllCauses } from '../store/cause'

const mapState = state => {
  return {
    proposal: state.proposal,
    currentOrg: state.currentOrg,
    causes: state.causes
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addProposalToDb: function(proposal) {
      let history = ownProps.history
      dispatch(postProposalToDb(proposal, history))
    },
    loadCauses: function() {
      dispatch(fetchAllCauses())
    }
  }
}

export default connect(mapState, mapDispatch)(OrganizationProposal)
