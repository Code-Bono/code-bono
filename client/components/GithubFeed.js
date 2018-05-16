import React, { Component } from 'react'
import axios from 'axios'
import socket from '../socket'
import { Header, Feed, Icon } from 'semantic-ui-react'
import TimeAgo from 'timeago-react'

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
        <Header as="h3">Here are the most recent events for your repo: </Header>
        {events && events.length ? (
          <Feed>
            {events
              .slice(events.length < 10 ? events.length : events.length - 10)
              .reverse()
              .map(event => {
                return (
                  <Feed.Event key={event.id}>
                    <Feed.Label>
                      <Icon circular color="teal" name="github alternate" />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Date>
                        <TimeAgo datetime={event.updatedAt} />
                      </Feed.Date>
                      <Feed.Summary>
                        <Feed.User>{event.githubUser}</Feed.User>
                        <a href="event.url">{` ${event.description}`}</a>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                )
              })}
          </Feed>
        ) : (
          <Header as="h3">
            <Icon loading name="spinner" />Loading events...
          </Header>
        )}
      </div>
    )
  }
}
