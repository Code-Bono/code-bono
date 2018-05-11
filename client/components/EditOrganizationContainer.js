import React, { Component } from 'react'
import EditOrganization from './EditOrganization'
import { connect } from 'react-redux'
import { editOrgDetails } from '../store/organization'

const mapState = state => {
  return {
    currentOrg: state.currentOrg
  }
}
const mapDispatch = dispatch => {
  return {
    editOrg: obj => {
      dispatch(editOrgDetails(obj))
    }
  }
}

export default connect(mapState, mapDispatch)(EditOrganization)
