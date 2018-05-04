import React, { Component } from 'react'
import Chatbox from './chatbox'
import { connect } from 'react-redux'
import { fetchOtherUsers } from '../store/otherUsers'

const mapState = state => {
  return {
    currentUser: state.user,
    otherUsers: state.others.filter(user => user.id !== state.user.id)
  }
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => {
      dispatch(fetchOtherUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
