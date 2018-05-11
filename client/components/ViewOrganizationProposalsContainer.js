import React, { Component } from 'react'
import ViewOrganizationProposals from './ViewOrganizationProposals'
import { connect } from 'react-redux'
import { getProposalsForOrg } from '../store/proposal'

const mapState = state => {
  return {
    currentUser: state.user,
    currentOrg: state.currentOrg,
    proposals: state.proposal
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchAllProposals: function(id) {
      dispatch(getProposalsForOrg(id))
    }
  }
}

export default connect(mapState, mapDispatch)(ViewOrganizationProposals)
