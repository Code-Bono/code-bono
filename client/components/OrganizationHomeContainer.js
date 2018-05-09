import React, { Component } from 'react'
import OrganizationHome from './OrganizationHome'
import { connect } from 'react-redux'
import { getCurrentOrg } from '../store/organization'

const mapState = state => {
  return {
    currentUser: state.user,
    currentOrg: state.currentOrg
  }
}
const mapDispatch = dispatch => {
  return {
    fetchCurrentOrg: id => {
      dispatch(getCurrentOrg(id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrganizationHome)
