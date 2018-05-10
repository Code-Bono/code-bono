import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export const ProjectSignUpButton = (props) => {

  const { handleClick } = props
  const proposalDetails = {
    proposalId: props.proposalId,
    proposalName: props.proposalName,
    proposalDescription: props.proposalDescription
  }

  return (
    <div>
      <button className="ui button" onClick={(evt) => handleClick(evt, proposalDetails)}><Link to={`/proposals`}>Sign up!</Link></button>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    handleClick: function(evt, proposalDetails) {
      evt.preventDefault()
      console.log('heeyyyyy buttton', proposalDetails)
      // dispatch(fetchSingleProposal(proposalId))
    }
  }
}

export default connect(null, mapDispatch)(ProjectSignUpButton)

