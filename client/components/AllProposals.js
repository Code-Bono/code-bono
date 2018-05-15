import React, { Component } from 'react'
import { Grid, Image, Card, Button, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class AllProposals extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProposalsFromServer()
  }

  render() {
    const { proposals } = this.props

    return (
      <Container>
        <h1>All Proposals</h1>
        <p>
          Browse through proposals for technical projects to see which
          organizations need your skills
        </p>
        <br />
        {proposals.length ? (
          <Card.Group itemsPerRow={3}>
            {proposals.map(proposal => {
              return (
                <Card key={proposal.id} className="ui card">
                  <div className="image">
                    <img src={proposal.image} />
                  </div>
                  <div className="content">
                    <Link className="header" to={`/proposals/${proposal.id}`}>
                      {proposal.name}{' '}
                    </Link>
                    <a className="ui sub header">
                      {proposal.organization.name}
                    </a>
                    <div className="description">{proposal.snippet}</div>
                    <br />
                    {proposal.causes.length ? (
                      <div className="content">
                        Causes: {proposal.causes.map(cause => `${cause.name}`)}
                      </div>
                    ) : null}
                    <br />
                    <div className="meta">
                      <span className="date">
                        Deadline: {proposal.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="extra content">
                    <Link to={`/proposals/${proposal.id}`}>
                      <Button primary id="all-proposals-more-info">More info</Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </Card.Group>
        ) : (
          <h3 className="loading">Loading project cards...</h3>
        )}
      </Container>
    )
  }
}
