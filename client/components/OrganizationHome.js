import React, { Component } from 'react'
import { Container, Header, Card, Button, List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class OrganizationHome extends Component {
  componentDidMount() {
    this.props.fetchCurrentOrg(this.props.currentUser.id)

    //refetches user to get the updated user after they are assigned to an org. Navbar checks if user is assigned to an org and renders out User Home vs Organization Home
    this.props.fetchUpdatedUser(this.props.currentUser.id)
  }
  render() {
    let { currentUser, currentOrg } = this.props
    // *MIGHT NEED TO GET ORG ID FROM URL
    return (
      <Container>
        {currentOrg ? (
          <div className="org-home">
            <Button primary className="org-profile-buttons">
              <Link to="/organization/edit" className="org-profile-buttons-text">Edit Details</Link>
            </Button>
            <Button primary className="org-profile-buttons">
              <Link to="/organization/make-proposal" className="org-profile-buttons-text">Make a Proposal!</Link>
            </Button>
            <Header as='h1' id="org-profile-header">
              {currentOrg.name}
              <Header.Subheader id="org-profile-subheader">
                {currentOrg.description}
              </Header.Subheader>
            </Header>
            <img id="org-profile-img" src={currentOrg.image} />
            <br />
            <List>
              <List.Item>
                <List.Icon name='phone' />
                <List.Content>{currentOrg.phoneNumber}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='marker' />
                <List.Content>{currentOrg.address}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='mail' />
                <List.Content>
                  <a href={`mailto:${currentOrg.email}`}>{currentOrg.email}</a>
                </List.Content>
              </List.Item>
            </List>
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
