import React, { Component } from 'react'
import EditProfile from './EditProfile'
import { connect } from 'react-redux'
import { updateProfile } from '../store/user'
import { fetchAllCauses } from '../store/cause'

const mapState = (state, ownProps) => {
  return {
    user: state.user,
    causes: state.causes
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadCauses: function() {
      dispatch(fetchAllCauses())
    },
    editProfile: function(id, profileObj) {
      // let history = ownProps.history
      dispatch(updateProfile(profileObj))
    }
  }
}

export default connect(mapState, mapDispatch)(EditProfile)
