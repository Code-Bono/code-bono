import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import axios from 'axios'

import { CardNote, ProjectCard } from './utils/GitHubUtils'

export default class GitHubProjectBoard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadProjectCards()
    // this.interval = setInterval(this.props.loadProjectCards, 60000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const projectCards = this.props.projectCards
    return (
      <div>
        <h1>Github Project Board</h1>
        <div className="githubContainer">
          <Grid container columns={projectCards.length}>
            {projectCards.length ? (
              projectCards.map((card, i) => {
                return <ProjectCard card={card} i={i} />
              })
            ) : (
              <h3>Loading project cards...</h3>
            )}
          </Grid>
        </div>
      </div>
    )
  }
}
