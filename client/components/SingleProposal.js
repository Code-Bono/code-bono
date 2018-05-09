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
    return <h1>{singleProposal.name}</h1>
  }
}
