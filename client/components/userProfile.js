import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header, Image, Item, Button, Container, List, Icon } from 'semantic-ui-react'

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUser(this.props.user.id)
  }

  render() {
    const user = this.props.user
    const projects = user.projects ? user.projects : []
    return (
      <Container>
        <h1 id="user-profile-title">{user.fullname}</h1>
        <div>
          {user ? (
            <div>
              <h3 id="user-profile-email">{user.email}</h3>
              <Image src={user.imageUrl} />
            </div>
          ) : (
            <h3 className="loading">Loading current user...</h3>
          )}
          <h2 id="user-profile-projects-header">Your Projects</h2>

          {projects.length ? (
            <Item.Group>
              {projects.map(project => {
                return (
                  <Item key={project.id}>
                    <div className="content">
                      <a className="header">{project.name}</a>
                      <div className="description">
                        {project.description}
                      </div>
                    </div>
                    <div>
                      <Link to={`/projects/${project.id}`}>
                        <Button primary id="user-profile-browse"
                          primary
                          onClick={evt => this.props.loadProject(project.id)}
                        >
                          <Icon name="code" />Check in on this project
                        </Button>
                      </Link>
                    </div>
                  </Item>
                )
              })}
            </Item.Group>
          ) : (
            <div>
              <h3>You currently have no active projects.</h3>
                <Link to={`/proposals`}>
                  <Button primary id="user-profile-browse">
                    <Icon name="search" />Browse proposals
                  </Button>
                </Link>
            </div>
          )}
        </div>
      </Container>
    )
  }
}


      // <Container>
      //   <Header as="h1" icon textAlign="center">
      //   {user ? (
      //     <div>
      //       <Header.Content id="user-profile-title">
      //         {user.fullname || user.email}
      //       </Header.Content>
      //       <Header as="h1">
      //         <Image size="massive" src={user.imageUrl} />
      //       </Header>
      //      </div>
      //     ) : (
      //       <h3 className="loading">Loading current user...</h3>
      //     )}

      //   </Header>

      //     <h2 id="user-profile-projects-header">Your Projects</h2>

      //     {projects.length ? (
      //       <Item.Group>
      //         {projects.map(project => {
      //           return (
      //             <Item key={project.id}>
      //               <div className="content">
      //                 <a className="header">{project.name}</a>
      //                 <div className="description">
      //                   {project.description.slice(0, 80)}...
      //                 </div>
      //               </div>
      //               <div>
      //                 <Link to={`/projects/${project.id}`}>
      //                   <Button
      //                     primary
      //                     onClick={evt => this.props.loadProject(project.id)}
      //                   >
      //                     <Header as="h3">Check in on this project</Header>
      //                   </Button>
      //                 </Link>
      //               </div>
      //             </Item>
      //           )
      //         })}
      //       </Item.Group>
      //     ) : (
      //       <div>
      //         <List divided verticalAlign='middle'>
      //           <List.Item>
      //             <div className="no-active-projects">

      //               <List.Content>
      //                 You currently have no active projects
      //               </List.Content>
      //             </div>
      //             <Link to={`/proposals`}>
      //               <Button primary id="user-profile-browse">
      //                 <Icon name="find" />Browse proposals
      //               </Button>
      //             </Link>

      //           </List.Item>
      //         </List>
      //       </div>
      //     )}

      // </Container>
