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
        <h1>{singleProposal.name}</h1>
        <img src={singleProposal.image} />
        <h2>Request description</h2>
        <p>{singleProposal.description}</p>
        <h3>Deadline: {singleProposal.deadline}</h3>
      </div>
    )
  }
}
