import React, { Component } from 'react'
import { Container, Header, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class OrganizationHome extends Component {
  componentDidMount() {
    this.props.fetchCurrentOrg(this.props.currentUser.id)
    //refetches user to get the updated user after they are assigned to an org. Navbar checks if user is assigned to an org and renders out User Home vs Organization Home
    this.props.fetchUpdatedUser(this.props.currentUser.id)
  }
  render() {
    let { currentUser, currentOrg } = this.props
    return (
      <Container>
        {currentOrg ? (
          <div className="org-home">
            <img src={currentOrg.image} />
            <br />
            <Link to="/organization/edit">Edit Details</Link>
            <Header as="h2">Organization Name: {currentOrg.name}</Header>
            <p>Organization Description: {currentOrg.description}</p>
            <p>Organization Address: {currentOrg.address}</p>
            <p>Organization Phone Number: {currentOrg.phoneNumber}</p>
            <p>Organization Email: {currentOrg.email}</p>
            {currentUser && <p>Organization Rep Email: {currentUser.email}</p>}
            <Link to="/organization/make-proposal">Make a Proposal!</Link>
            <br />
            <Link to="/organization/proposals">
              View Your Current Proposals
            </Link>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    )
  }
}
