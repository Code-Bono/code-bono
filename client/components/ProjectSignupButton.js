import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createProject } from '../store/projectSignup'
import { Button } from 'semantic-ui-react'

export const ProjectSignupButton = props => {
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
      {userId ? (
        <Button
          className="project-signup-button"
          onClick={evt => handleClick(evt, proposalDetails)}
        >
          Sign up for this project!
        </Button>
      ) : (
        <Link to="/login">
          <Button className="project-signup-button">
            Log in to sign up for this project!
          </Button>
        </Link>
      )}
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
