import React, { Component } from 'react'
import Project from './Project'
import { connect } from 'react-redux'
import { fetchSingleProject } from '../store/project'


const mapState = state => {
  return {
    project: state.singleProject
  }
}

export default connect(mapState)(Project)
