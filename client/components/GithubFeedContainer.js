import React, { Component } from 'react'
import GithubFeed from './GithubFeed'
import { connect } from 'react-redux'
import { fetchEvents, addEvent } from '../store/githubFeed'

const mapState = (state, ownProps) => {
  ownProps.match.params.id
  return {
    events: state.events,
    projectId: ownProps.match.params.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadEventsFromServer: function(projectId) {
      dispatch(fetchEvents(projectId))
    },
    addEmittedEvent: function(event) {
      dispatch(addEvent(event))
    }
  }
}

export default connect(mapState, mapDispatch)(GithubFeed)
