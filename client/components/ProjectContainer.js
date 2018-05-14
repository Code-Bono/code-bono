import React, { Component } from 'react'
import Project from './Project'
import { connect } from 'react-redux'
import { fetchSingleProject } from '../store/project'
import { fetchCards } from '../store/githubProjectCards'
import { fetchEvents } from '../store/githubFeed'

const mapState = state => {
  return {
    project: state.singleProject
  }
}

const mapDispatch = dispatch => {
  return {
    loadProject: function(projectId) {
      dispatch(fetchSingleProject(projectId))
    },
    loadEventsFromServer: function(projectId) {
      dispatch(fetchEvents(projectId))
    },
    loadProjectCards: function(projectId) {
      dispatch(fetchCards(projectId))
    }
  }
}

export default connect(mapState, mapDispatch)(Project)
