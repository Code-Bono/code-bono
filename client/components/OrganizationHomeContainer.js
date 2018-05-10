import React, { Component } from 'react'
import OrganizationHome from './OrganizationHome'
import { connect } from 'react-redux'
import { getCurrentOrg } from '../store/organization'
import { getProposalsForOrg } from '../store/proposal'
import { getUserById } from '../store/user'

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
    },
    //retrieves the user after being assigned an org id to correctly render the nav home button
    fetchUpdatedUser: function(id) {
      dispatch(getUserById(id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrganizationHome)
