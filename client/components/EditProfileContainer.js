import React, { Component } from 'react'
import EditProfile from './EditProfile'
import { connect } from 'react-redux'
import { updateProfile } from '../store/user'

const mapState = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    editUser(userId, userObj) {
      let history = ownProps.history
      dispatch(updateProfile(userId, userObj, history))
    }
  }
}

export default connect(mapState, mapDispatch)(EditProfile)
