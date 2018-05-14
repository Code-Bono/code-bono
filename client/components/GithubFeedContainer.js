import React, { Component } from 'react'
import GithubFeed from './GithubFeed'
import { connect } from 'react-redux'
import { fetchEvents } from '../store/githubFeed'

const mapState = state => {
  return {
    events: state.events
  }
}

const mapDispatch = dispatch => {
  return {
    loadEventsFromServer: function(projectId) {
      dispatch(fetchEvents(projectId))
    }
  }
}

export default connect(mapState, mapDispatch)(GithubFeed)
