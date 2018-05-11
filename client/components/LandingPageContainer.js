import React, { Component } from 'react'
import LandingPage from './LandingPage'
import { connect } from 'react-redux'
import { fetchAllProposals } from '../store/allProposals'
import { fetchSingleProposal } from '../store/singleProposal'

const mapState = state => {
  return {
    proposals: state.proposals
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProposalsFromServer: function() {
      dispatch(fetchAllProposals())
    },
    handleClick: function(evt, proposalId) {
      evt.preventDefault()
      dispatch(fetchSingleProposal(proposalId))
    }
  }
}

export default connect(mapState, mapDispatch)(LandingPage)
