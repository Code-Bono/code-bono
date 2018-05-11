import React, { Component } from 'react'
import Project from './Project'
import { connect } from 'react-redux'
import { fetchSingleProject } from '../store/project'


const mapState = state => {
  return {
    project: state.singleProject
  }
}

const mapDispatch = dispatch => {
  return {
    loadProject: function(projectId) {
      dispatch(fetchSingleProject(projectId))
    }
  }
}




export default connect(mapState, mapDispatch)(Project)
