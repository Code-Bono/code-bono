import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createProject } from '../store/projectSignup'

export const ProjectSignupButton = (props) => {

  const { handleClick } = props
  const { userId } = props
  const proposalDetails = {
    proposalId: props.proposalId,
    proposalName: props.proposalName,
    proposalDescription: props.proposalDescription,
    userId
  }

  return (
    <div>
      {
        userId ?
        <button className="ui button" onClick={(evt) => handleClick(evt, proposalDetails)}><Link to={`/users/${userId}`}>Sign up for this project!</Link></button>
        : <button className="ui button"><Link to='/login'>Log in to sign up for this project!</Link></button>
      }
    </div>
  )
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: function(evt, proposalDetails) {
      evt.preventDefault()
      dispatch(createProject(proposalDetails))
    }
  }
}

export default connect(mapState, mapDispatch)(ProjectSignupButton)

