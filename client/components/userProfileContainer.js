import React, { Component } from 'react'
import UserProfile from './userProfile'
import { connect } from 'react-redux'
import { fetchUser } from '../store/user'
import { fetchSingleProject } from '../store/project'

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadUser: function(userId) {
      dispatch(fetchUser(userId))
    },
    loadProject: function(projectId) {
      dispatch(fetchSingleProject(projectId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
