import React, { Component } from 'react'
import axios from 'axios'

export default class GitHubProjectBoard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadProjectCards()
    this.interval = setInterval(this.props.loadProjectCards, 60000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const projectCards = this.props.projectCards

    return (
      <div>
        <h1>Github Project Board</h1>
        {projectCards.length ? (
          projectCards.map((card, i) => {
            return (
              <div key={i}>
                <h3>{card.columnName}</h3>
                {card.notes.map((note, i) => {
                  return (
                    <div key={i}>
                      <h5>{note}</h5>
                    </div>
                  )
                })}
              </div>
            )
          })
        ) : (
          <h3>Loading project cards...</h3>
        )}
      </div>
    )
  }
}
