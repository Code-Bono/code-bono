import React, { Component } from 'react'
import UserProfile from './userProfile'
import { connect } from 'react-redux'
import { fetchUser } from '../store/user'

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadUser: function(userId) {
      dispatch(fetchUser(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
