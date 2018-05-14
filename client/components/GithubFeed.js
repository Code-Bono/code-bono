import React, { Component } from 'react'
import axios from 'axios'
import socket from '../socket'
import { Feed } from 'semantic-ui-react'

export default class GithubFeed extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    socket.on('updateFeed', event => {
      this.addToFeed(event)
    })
  }

  // addToFeed(event) {
  // }

  render() {
    const { events } = this.props
    return (
      <div>
        <h1>Events for your repo: </h1>
        {events && events.length ? (
          events.length &&
          events.slice(0, 10).map(event => {
            return (
              <div key={event.id}>
                {' '}
                At {event.created_at}, user {event.githubUser} initiated a{' '}
                {event.type} with the eventId of {event.id}{' '}
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
