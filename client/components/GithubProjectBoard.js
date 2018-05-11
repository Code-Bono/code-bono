import React, { Component } from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'
import AddProjectCardContainer from './AddProjectCardContainer'
import { CardNote, ProjectCard } from './utils/GitHubUtils'

export default class GitHubProjectBoard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const projectCards = this.props.projectCards

    return (
      <div>
        <div>
          <Header as='h2' icon textAlign='center'>
            <Header.Content>
              Github Project Board
            </Header.Content>
          </Header>
          <Image centered size='mini' src="https://www.freeiconspng.com/uploads/github-logo-icon-30.png" />
        </div>

        <div className="column-container">
          {
          projectCards.length ?
          <Grid container columns={projectCards.length}>
              {
                projectCards.map((card, i) => {
                  return (
                    <div key={i}>
                      <ProjectCard card={card} />
                    </div>
                  )
                })
              }
          </Grid>
          :  <h3 className="loading">Loading project...</h3>
          }
        </div>
        <AddProjectCardContainer />
      </div>
    )
  }
}



