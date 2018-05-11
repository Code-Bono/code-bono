import React, { Component } from 'react'
import { AddProjectCard } from './AddProjectCard'
import { connect } from 'react-redux'
import {addProjectCard} from '../store/addProjectCard'
import { postProjectCard } from '../store/addProjectCard'
import { fetchCards } from '../store/githubProjectCards'

const mapState = state => {
  return {
    noteToAdd: state.noteToAdd,
    project: state.singleProject
  }
}

const mapDispatch = dispatch => {
  return {
    handleChange: function(evt) {
      dispatch(addProjectCard(evt.target.value))
    },
    handleSubmit: function(noteToAdd, projectId, toDoColumnId, evt) {
      evt.preventDefault()
      dispatch(postProjectCard(noteToAdd, projectId, toDoColumnId))
      dispatch(fetchCards(projectId))
    }
  }
}

export default connect(mapState, mapDispatch)(AddProjectCard)
