import React, { Component } from 'react'
import Chatbox from './chatbox'
import { connect } from 'react-redux'
import { fetchOtherUsers } from '../store/otherUsers'
import { fetchMessagesForChannel, postMessageToDb } from '../store/chatbox'
import { fetchAllProjectsForUser } from '../store/projectsForUser'

const mapState = state => {
  return {
    currentUser: state.user,
    //filters current user out of the others state
    otherUsers: state.others.filter(user => user.id !== state.user.id),
    allMessages: state.messages,
    assignedProjects: state.assignedProjects
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
      return dispatch(fetchAllProjectsForUser(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
