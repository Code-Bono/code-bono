import React, { Component } from 'react'
import Project from './Project'
import { connect } from 'react-redux'
import { fetchSingleProject } from '../store/project'
import { fetchCards } from '../store/githubProjectCards'


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
    loadProjectCards: function(projectId) {
      dispatch(fetchCards(projectId))
    }
  }
}

export default connect(mapState, mapDispatch)(Project)
