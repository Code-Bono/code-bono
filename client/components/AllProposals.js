import React, { Component } from 'react'
import { Grid, Image, Card } from 'semantic-ui-react'
import { fetchAllProposals } from '../store/allProposals'

export default class AllProposals extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProposalsFromServer()
  }

  render() {
    console.log(this.props.proposals)
    return <h1>All Proposals</h1>
  }
}
