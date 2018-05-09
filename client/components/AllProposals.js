import React, { Component } from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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

                    <button className="ui button" onClick={(evt) => handleClick(evt, proposal.id)}><Link to={`/proposals/${proposal.id}`}>More info</Link></button>

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
