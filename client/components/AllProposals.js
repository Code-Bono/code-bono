import React, { Component } from 'react'
import { Grid, Image, Card, Button } from 'semantic-ui-react'
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
      <div>
        <h1>All Proposals</h1>
        {proposals.length ? (
          <Card.Group itemsPerRow={3}>
            {proposals.map(proposal => {
              return (
                <Card key={proposal.id} className="ui card">
                  <div className="image">
                    <img src={proposal.image} />
                  </div>
                  <div className="content">
                    <a className="header">{proposal.name}</a>
                    <a className="ui sub header">
                      {proposal.organization.name}
                    </a>
                    <div className="description">{proposal.snippet}</div>
                    <br />
                    <div className="meta">
                      <span className="date">
                        Deadline: {proposal.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="extra content">
                    <Link to={`/proposals/${proposal.id}`}>
                      <Button primary>More info</Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </Card.Group>
        ) : (
          <h3 className="loading">Loading project cards...</h3>
        )}
      </div>
    )
  }
}
