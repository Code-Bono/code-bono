import React, { Component } from 'react'
import AllProposals from './AllProposals'
import { connect } from 'react-redux'
import { fetchAllProposals } from '../store/allProposals'

const mapState = state => {
  return {
    proposals: state.proposals
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProposalsFromServer: function() {
      dispatch(fetchAllProposals())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProposals)
