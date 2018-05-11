import React, { Component } from 'react'
import Chatbox from './chatbox'
import { connect } from 'react-redux'
import { fetchOtherUsers } from '../store/otherUsers'
import { fetchMessagesForChannel, postMessageToDb } from '../store/chatbox'
import { fetchAllProjectsForUser } from '../store/project'

const mapState = state => {
  return {
    currentUser: state.user,
    //filters current user out of the others state
    otherUsers: state.others.filter(user => user.id !== state.user.id),
    allMessages: state.messages,
    assignedProjects: state.singleProject
  }
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => {
      dispatch(fetchOtherUsers())
    },
    loadMessages: id => {
      dispatch(fetchMessagesForChannel(id))
    },
    postMessage: (id, messageObj) => {
      dispatch(postMessageToDb(id, messageObj))
    },
    loadProjects: id => {
      dispatch(fetchAllProjectsForUser(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
