import React, { Component } from 'react'
import { Container, Header, Card, Button, List, Icon, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class OrganizationHome extends Component {
  componentDidMount() {
    this.props.fetchCurrentOrg(this.props.currentUser.id)
    .then(() => {
      this.props.fetchOrgProposals(this.props.currentOrg.id)
    })

    //refetches user to get the updated user after they are assigned to an org. Navbar checks if user is assigned to an org and renders out User Home vs Organization Home
    this.props.fetchUpdatedUser(this.props.currentUser.id)
  }
  render() {
    const { currentUser, currentOrg, proposals } = this.props

    console.log('PROPS', this.props)

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
            <h2 className="user-profile-projects-header">Your Proposals</h2>

          {proposals.length ? (
            <Item.Group>
              {proposals.map(proposal => {
                return (
                  <List divided verticalAlign="middle" key={proposal.id}>
                    <List.Item id="user-profile-project-list">
                      <List.Content floated="right">
                      {
                        proposal.projects.length ?
                        <Link to={`/projects/${proposal.projects[0].id}`}>
                          <Button
                            primary
                            id="user-profile-browse"
                            primary
                            onClick={evt => this.props.loadProject(proposal.projects[0].id)}
                          >
                            <Icon name="code" />Check in on this proposal
                          </Button>
                        </Link>
                        : null
                      }
                      </List.Content>

                      <List.Header>
                        <Icon name="marker" />
                        {proposal.name}
                      </List.Header>
                      <List.Description>{proposal.description}</List.Description>
                    </List.Item>
                  </List>
                )
              })}
            </Item.Group>
          ) : (
            <div>
              <h3>You currently have no active proposals</h3>
            </div>
          )}



          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    )
  }
}
