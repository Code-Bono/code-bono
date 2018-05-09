import React, { Component } from 'react'
import OrganizationPostRequest from './OrganizationPostRequest'
import { connect } from 'react-redux'
import { postRequestToDb } from '../store/request'

const mapState = state => {
  return {
    request: state.request
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addRequestToDb: function(request) {
      let history = ownProps.history
      dispatch(postRequestToDb(request, history))
    }
  }
}

export default connect(mapState, mapDispatch)(OrganizationPostRequest)
