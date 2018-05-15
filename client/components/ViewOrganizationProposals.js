import React, { Component } from 'react'
import { Container, Header, Button, Card, Image } from 'semantic-ui-react'
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
        {proposals.length ? <h1>Your Current Proposals!</h1> : null}
        <div className="org-proposal-view">
          <br />
          {proposals.length ? (
            proposals.map(proposal => {
              return (
                <Card key={proposal.id}>
                  <Image size="medium" src={proposal.image} />
                  <Card.Content>
                    <Card.Header>
                      <Link to={`/proposals/${proposal.id}`}>
                        Proposal Name: {proposal.name}
                      </Link>
                    </Card.Header>
                    <Card.Description>{proposal.description}</Card.Description>
                  </Card.Content>
                  <Container textAlign="center" fluid>
                    <Link to={`/organization/proposals/${proposal.id}/edit`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button
                      onClick={() => this.props.deleteProposal(proposal.id)}
                    >
                      Delete
                    </Button>
                  </Container>
                </Card>
              )
            })
          ) : (
            <h1>You have no proposals yet!</h1>
          )}
        </div>
      </Container>
    )
  }
}
