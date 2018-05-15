import React, { Component } from 'react'
import Project from './Project'
import { connect } from 'react-redux'
import { fetchSingleProject } from '../store/project'
import { fetchCards } from '../store/githubProjectCards'
import { fetchEvents } from '../store/githubFeed'

const mapState = state => {
  return {
    project: state.singleProject,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadProject: function(projectId) {
      dispatch(fetchSingleProject(projectId))
    },
    loadProjectCards: function(projectId) {
      dispatch(fetchCards(projectId))
    }
  }
}

export default connect(mapState, mapDispatch)(Project)
