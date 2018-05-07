import React, { Component } from 'react'
import GithubProjectBoard from './GithubProjectBoard'
import { connect } from 'react-redux'
import { fetchCards } from '../store/github'

const mapState = state => {
  return {
    projectCards: state.githubProject
  }
}

const mapDispatch = dispatch => {
  return {
    loadProjectCards: function() {
      dispatch(fetchCards())
    }
  }
}

export default connect(mapState, mapDispatch)(GithubProjectBoard)
