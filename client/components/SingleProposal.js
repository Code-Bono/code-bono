import React, { Component } from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'

export default class SingleProposal extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const proposalId = Number(this.props.match.params.proposalId)
    this.props.fetchSingleProposalFromServer(proposalId)
  }

  render() {
    const { singleProposal } = this.props
    return (
      <div>
        {singleProposal.id ? (
          <div>
            <h2>{singleProposal.organization.name.toUpperCase()}</h2>
            <h1>Proposal: {singleProposal.name}</h1>
            <img className="singlePageImg" src={singleProposal.image} />
            <h2>Proposal description</h2>
            <p>{singleProposal.description}</p>
            <h3>Deadline: {singleProposal.deadline}</h3>
            <h2>About the Organization:</h2>
            <p>{singleProposal.organization.description}</p>
            <h3>Get in touch with {singleProposal.organization.name}:</h3>
            <p>Email: {singleProposal.organization.email}</p>
            <p>Phone: {singleProposal.organization.phoneNumber}</p>
            <p>Address: {singleProposal.organization.address}</p>
          </div>
        ) : (
          <h2>Loading selected proposal...</h2>
        )}
      </div>
    )
  }
}
