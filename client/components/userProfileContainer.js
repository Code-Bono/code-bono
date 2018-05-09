import React, { Component } from 'react'
import UserProfile from './userProfile'
import { connect } from 'react-redux'
import { me } from '../store/user'

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadUser: function() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
