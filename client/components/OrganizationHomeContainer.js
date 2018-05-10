import React, { Component } from 'react'
import OrganizationHome from './OrganizationHome'
import { connect } from 'react-redux'
import { getCurrentOrg } from '../store/organization'
import { getProposalsForOrg } from '../store/proposal'

const mapState = state => {
  return {
    currentUser: state.user,
    currentOrg: state.currentOrg,
    proposals: state.proposal
  }
}
const mapDispatch = dispatch => {
  return {
    fetchCurrentOrg: id => {
      dispatch(getCurrentOrg(id))
    },
    fetchAllProposals: function(id) {
      dispatch(getProposalsForOrg(id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrganizationHome)
