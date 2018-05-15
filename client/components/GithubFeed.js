import React, { Component } from 'react'
import axios from 'axios'
import socket from '../socket'
import { Header, Feed } from 'semantic-ui-react'
import TimeAgo from 'react-time-ago'

export default class GithubFeed extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadEventsFromServer(this.props.projectId)
    socket.on('githubEvent', event => {
      console.log('from socket: ', event)
      this.props.addEmittedEvent(event)
    })
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
                  <Feed.Event key={event.id}>
                    {event.type === 'pull request' && (
                      <Feed.Content>
                        <Feed.Summary>
                          <Feed.User>{event.githubUser}</Feed.User>{' '}
                          {event.action} a <a href={event.url}>pull request</a>
                          <Feed.Date>{event.updatedAt}</Feed.Date>
                        </Feed.Summary>
                      </Feed.Content>
                    )}
                    {event.type === 'pull request review' && (
                      <Feed.Content>
                        <Feed.Summary>
                          <Feed.User>{event.githubUser}</Feed.User>{' '}
                          {event.action} a <a href={event.url}>pull request</a>
                          <Feed.Date>{event.updatedAt}</Feed.Date>
                        </Feed.Summary>
                      </Feed.Content>
                    )}
                  </Feed.Event>
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
