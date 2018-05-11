import React, { Component } from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// import PropTypes from 'prop-types

/**
 * COMPONENT
 */
export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProposalsFromServer()
  }

  render() {
    const { proposals, handleClick } = this.props
    return (
      <div className="pusher" id="landingPage">
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="inverted header">
              CODE FOR
              <span className="header-alt"> GOOD.</span>
            </h1>
            <h2>
              Code Bono connects nonprofits with developers looking to
              contribute their skills.
            </h2>
          </div>
        </div>
        <h1>Featured Proposals</h1>
        {proposals.length ? (
          <Card.Group itemsPerRow={3}>
            {proposals.slice(0, 3).map(proposal => {
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
                    <button
                      className="ui button"
                      onClick={evt => handleClick(evt, proposal.id)}
                    >
                      <Link to={`/proposals/${proposal.id}`}>More info</Link>
                    </button>
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
