import React, { Component } from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class ViewOrganizationProposals extends Component {
  componentDidMount() {
    this.props.fetchAllProposals(this.props.currentOrg.id)
  }
  render() {
    let { currentOrg, proposals } = this.props
    return (
      <Container>
        <Link to="/organization/home">
          <Button size="mini">Go Back</Button>
        </Link>
        {proposals.length && <h1>Your Current Proposals!</h1>}
        {proposals.length ? (
          proposals.map(proposal => {
            return (
              <div key={proposal.id}>
                <Link to={`/proposals/${proposal.id}`}>
                  Proposal Name: {proposal.name}
                </Link>
                <img src={proposal.image} />
                <p>Proposal Description: {proposal.description}</p>
                <Link to={`/organization/proposals/${proposal.id}/edit`}>
                  <Button>Edit</Button>
                </Link>
              </div>
            )
          })
        ) : (
          <h1>You have no proposals yet!</h1>
        )}
      </Container>
    )
  }
}
