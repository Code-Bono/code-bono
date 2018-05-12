import React, { Component } from 'react'
import axios from 'axios'
import socket from '../socket'
import { Feed } from 'semantic-ui-react'

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
    // axios
    //   .get(
    //     `/api/github/repos/${this.state.owner}/${this.state.repo}/issues/events`
    //   )
    //   .then(res => res.data)
    //   .then(events => {
    //     this.setState({ events: events.data })
    //   })
    this.props.loadFeed()
    socket.on('updateFeed', event => {
      this.addToFeed(event)
    })
  }

  addToFeed(event) {
    let box = document.getElementById('textbox')
    let p = document.createElement('p')
    p.textContent = event
  }

  render() {
    const events = this.state.events
    return (
      <div>
        <h1>Events for your repo: </h1>
        {events.length ? (
          events.length &&
          events.slice(0, 10).map(event => {
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
