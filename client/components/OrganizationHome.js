import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'

export default class OrganizationHome extends Component {
  componentDidMount() {
    this.props.fetchCurrentOrg(this.props.currentUser.id)
  }
  render() {
    let { currentUser, currentOrg } = this.props
    return (
      <Container text>
        {currentOrg ? (
          <div>
            <Header as="h2">Organization Name: {currentOrg.name}</Header>
            <p>Organization Description: {currentOrg.description}</p>
            <p>Organization Address: {currentOrg.address}</p>
            <p>Organization Phone Number: {currentOrg.phoneNumber}</p>
            <p>Organization Email: {currentOrg.email}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {currentUser && <p>Organization Rep Email: currentUser.email</p>}
      </Container>
    )
  }
}
