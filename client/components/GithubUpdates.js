import React, { Component } from 'react'
import axios from 'axios'
import { markdown } from 'markdown'

export default class GithubUpdates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectCards: []
    }
  }

  componentDidMount() {
    // const testProjectName = 'test-project-18'
    // axios.post(`/api/github/projects/${testProjectName}`)
    // .then(res => console.log('CLIENT RESPONSE', res.data))
    // .catch(err => console.log(err))

    // const repoName = 'code-bono-test1'
    // const projectName = 'code-bono-project1'
    axios
      .get(`/api/github/projects/columns/cards`)
      .then(res => res.data)
      .then(projectCards => {
        this.setState({ projectCards })
      })
  }

  render() {
    const projectCards = this.state.projectCards
    return (
      <div>
        <h1>Github updates</h1>
        {projectCards.length ? (
          projectCards.length &&
          projectCards.map((card, i) => {
            let parsedCard = {
              __html: markdown.toHTML(card)
            }
            return <div key={i} dangerouslySetInnerHTML={parsedCard} />
          })
        ) : (
          <h3>Loading project cards...</h3>
        )}
      </div>
    )
  }
}
