import React, { Component } from 'react'
import OrganizationProposal from './OrganizationProposal'
import { connect } from 'react-redux'
import { postProposalToDb } from '../store/proposal'

const mapState = state => {
  return {
    proposal: state.proposal
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addProposalToDb: function(proposal) {
      let history = ownProps.history
      dispatch(postProposalToDb(proposal, history))
    }
  }
}

export default connect(mapState, mapDispatch)(OrganizationProposal)
