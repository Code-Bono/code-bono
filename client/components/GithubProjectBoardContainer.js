import React, { Component } from 'react'
import GithubProjectBoard from './GithubProjectBoard'
import { connect } from 'react-redux'
import { fetchCards } from '../store/githubProjectCards'
import { postProjectCard } from '../store/addProjectCard'

const mapState = state => {
  return {
    projectCards: state.githubProjectCards,
    project: state.singleProject
  }
}

const mapDispatch = dispatch => {
  return {
    loadProjectCards: function(projectId) {
      dispatch(fetchCards(projectId))
    },
    handleSubmit: function(noteToAdd, projectId, columnId) {
      dispatch(postProjectCard(noteToAdd, projectId, columnId))
    }
  }
}

export default connect(mapState, mapDispatch)(GithubProjectBoard)
