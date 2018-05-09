import React, { Component } from 'react'
import SingleProposal from './SingleProposal'
import { connect } from 'react-redux'
import { fetchSingleProposal } from '../store/singleProposal'

const mapState = state => {
  console.log('Inside mapState')
  return {
    singleProposal: state.singleProposal
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProposalFromServer: function(proposalId) {
      dispatch(fetchSingleProposal(proposalId))
    },
    handleClick: function(evt, proposalId) {
      evt.preventDefault()
      // dispatch(fetchSingleProposal(proposalId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProposal)
