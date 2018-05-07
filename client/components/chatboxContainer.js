import React, { Component } from 'react'
import Chatbox from './chatbox'
import { connect } from 'react-redux'
import { fetchOtherUsers } from '../store/otherUsers'
import { fetchAllMessages, postMessageToDb } from '../store/chatbox'

const mapState = state => {
  return {
    currentUser: state.user,
    //filters current user out of the others state
    otherUsers: state.others.filter(user => user.id !== state.user.id),
    allMessages: state.messages
  }
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => {
      dispatch(fetchOtherUsers())
    },
    loadMessages: () => {
      dispatch(fetchAllMessages())
    },
    postMessage: message => {
      dispatch(postMessageToDb(message))
    }
  }
}

export default connect(mapState, mapDispatch)(Chatbox)