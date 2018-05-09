import React, { Component } from 'react'
import { AddProjectCard } from './AddProjectCard'
import { connect } from 'react-redux'
import {addProjectCard} from '../store/addProjectCard'
import { postProjectCard } from '../store/addProjectCard'
import { fetchCards } from '../store/github'

const mapState = state => {
  return {
    noteToAdd: state.noteToAdd
  }
}

const mapDispatch = dispatch => {
  return {
    handleChange: function(evt) {
      dispatch(addProjectCard(evt.target.value))
    },
    handleSubmit: function(noteToAdd, evt) {
      evt.preventDefault()
      dispatch(postProjectCard(noteToAdd))
      dispatch(fetchCards())
    }
  }
}

export default connect(mapState, mapDispatch)(AddProjectCard)
