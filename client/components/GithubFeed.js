import React, { Component } from 'react'
import axios from 'axios'
import socket from '../socket'
import { Header, Feed } from 'semantic-ui-react'
import TimeAgo from 'react-time-ago'

export default class GithubFeed extends Component {
  handleGithubEvent = event => {
    if (+event.projectId === +this.props.projectId) {
      this.props.addEmittedEvent(event)
    }
  }

  componentDidMount() {
    this.props.loadEventsFromServer(this.props.projectId)
    socket.on('githubEvent', this.handleGithubEvent)
  }

  componentWillUnmount() {
    socket.off('githubEvent', this.handleGithubEvent)
  }

  render() {
    const { events } = this.props
    return (
      <div>
        <Header as="h2">Here are the most recent events for your repo: </Header>
        {events && events.length ? (
          <Feed>
            {events
              .slice(events.length - 10, events.length - 1)
              .reverse()
              .map(event => {
                return (
                  <Feed.Content key={event.id}>
                    <Feed.User>{event.githubUser}</Feed.User>
                    <Feed.Date>{event.updatedAt}</Feed.Date>
                  </Feed.Content>
                )
              })}
          </Feed>
        ) : (
          <h3>Loading events...</h3>
        )}
      </div>
    )
  }
}
