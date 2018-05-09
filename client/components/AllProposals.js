import React, { Component, Link } from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'

export default class AllProposals extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProposalsFromServer()
  }

  render() {

    const { proposals, handleClick } = this.props

    return (
      <div>
        <h1>All Proposals</h1>
        {
          proposals.length ?
          proposals.map(proposal => {
            return (
              <div key={proposal.id} className="ui card">
                <div className="image">
                  <img src="https://organicthemes.com/demo/nonprofit/wp-content/themes/organic-nonprofit/images/logo.png"></img>
                </div>
                <div className="content">
                  <a className="header">{proposal.name}</a>
                  <div className="meta">
                    <span className="date">Deadline: {proposal.deadline}</span>
                  </div>
                  <div className="description">
                    {proposal.description}
                  </div>
                </div>
                <div className="extra content">

                    <button className="ui button" onClick={(evt) => handleClick(evt, proposal.id)}>More info</button>

                </div>
              </div>
            )
          })
          : <h3 className="loading">Loading project cards...</h3>
        }
      </div>
    )
  }
}

// to={`/proposals/${proposal.id}`}
