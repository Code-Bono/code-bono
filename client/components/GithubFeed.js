import React, { Component } from 'react'
import axios from 'axios'

export default class GithubFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: 'Code-Bono-Projects',
      repo: 'code-bono-test-2',
      events: []
    }
  }

  componentDidMount() {
    //Gets 'repository events' (which turn out to be not that useful)
    //Triggered when a repository is created, archived, unarchived, made public, or made private
    axios
      .get(
        `/api/github/repos/${this.state.owner}/${this.state.repo}/issues/events`
      )
      .then(res => res.data)
      .then(events => {
        this.setState({ events: events.data })
        console.log('This.state: ', this.state)
      })
  }

  render() {
    const events = this.state.events
    return (
      <div>
        <h1>Events for your repo: </h1>
        {events.length ? (
          events.length &&
          events.map(event => {
            return (
              <div key={event.id}>
                {' '}
                At {event.created_at}, user {event.actor.display_login}{' '}
                initiated a {event.type} with the eventId of {event.id}{' '}
              </div>
            )
          })
        ) : (
          <h3>Loading events...</h3>
        )}
      </div>
    )
  }
}
