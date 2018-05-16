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
      <div className="feedDiv">
        <Header as="h3">Recent events for your repo: </Header>
        {events && events.length ? (
          <Feed id="Feed">
            {events.reverse().map(event => {
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
                      {event.type === 'push' && (
                        <a target="_blank" href={event.url}>{` ${
                          event.description
                        }`}</a>
                      )}
                      {event.type === 'pull request' && (
                        <span>
                          {' '}
                          {event.action} a{' '}
                          <a
                            target="_blank"
                            href={event.url}
                          >{` pull request`}</a>
                        </span>
                      )}
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
