import React, { Component } from 'react'
import GithubProjectBoard from './GithubProjectBoard'
import { connect } from 'react-redux'
import { fetchCards } from '../store/githubProjectCards'

const mapState = state => {
  return {
    projectCards: state.githubProjectCards
  }
}

const mapDispatch = dispatch => {
  return {
    loadProjectCards: function(projectId) {
      dispatch(fetchCards(projectId))
    }
  }
}

export default connect(mapState, mapDispatch)(GithubProjectBoard)
