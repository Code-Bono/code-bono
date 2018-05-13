import React, { Component } from 'react'
import { Grid, Image, Card, Container } from 'semantic-ui-react'
import ProjectSignupButton from './ProjectSignupButton'

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
      <Container>
        {singleProposal.id ? (
          <div>
            <h1 className="blue-text">
              {singleProposal.organization.name.toUpperCase()}
            </h1>
            <h2 className="grey-text">Proposal: {singleProposal.name}</h2>
            <img className="singlePageImg" src={singleProposal.image} />
            <div id="single-proposal-body">
              <h2 className="blue-text">Proposal description</h2>
              <p>{singleProposal.description}</p>
              <h3>Deadline: {singleProposal.deadline}</h3>
              <h2 className="blue-text">About the Organization:</h2>
              <p>{singleProposal.organization.description}</p>
              <h3 className="blue-text">
                Get in touch with {singleProposal.organization.name}:
              </h3>
              <p>Email: {singleProposal.organization.email}</p>
              <p>Phone: {singleProposal.organization.phoneNumber}</p>
              <p>Address: {singleProposal.organization.address}</p>
            </div>
          </div>
        ) : (
          <h2>Loading selected proposal...</h2>
        )}
        <ProjectSignupButton
          proposalId={singleProposal.id}
          proposalName={singleProposal.name}
          proposalDescription={singleProposal.description}
        />
      </Container>
    )
  }
}
