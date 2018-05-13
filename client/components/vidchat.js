import React, { Component } from 'react'
import socket from '../socket'
import { Button, Input, Container } from 'semantic-ui-react'

let connection = new RTCMultiConnection()

export default class Vidchat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelName: '',
      broadcastName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    this.setState({ channelName: e.target.value })
  }

  handleClick(e) {
    let roomName = this.state.channelName
    if (e.target.name === 'openChannel') {
      if (roomName !== '') {
        this.disabled = true
        //sets name so everyone knows what the current channel name is
        this.setState({ broadcastName: roomName }, () => {
          //emits broadcast name after it is set
          let channelInfo = {}
          channelInfo.broadcastName = this.state.broadcastName
          channelInfo.id = this.props.projectId
          socket.emit('updateChannelName', channelInfo)
        })
        connection.open(roomName)
      } else {
        alert('Enter a channel name!')
      }
    } else if (e.target.name === 'joinChannel') {
      if (roomName !== '') {
        this.disabled = true
        connection.join(roomName)
      }
    } else if (e.target.name === 'leaveChannel') {
      //leaves channel rather than closing the whole channel
      connection.attachStreams.forEach(function(localStream) {
        localStream.stop()
      })
      connection.leave()
    } else if (e.target.name === 'closeChannel') {
      connection.attachStreams.forEach(function(localStream) {
        localStream.stop()
      })
      //closes channel and resets broadcastName
      this.setState({ broadcastName: '' }, () => {
        //emits broadcast name after it is set
        let channelInfo = {}
        channelInfo.broadcastName = this.state.broadcastName
        channelInfo.id = this.props.projectId
        socket.emit('updateChannelName', channelInfo)
      })
      connection.close()
    }
  }

  componentDidMount() {
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'

    connection.session = {
      audio: true,
      video: true
    }

    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    }

    connection.onstream = function(event) {
      document.getElementById('video-container').appendChild(event.mediaElement)
    }
  }

  render() {
    socket.on('sendChannelName', channelObj => {
      //sets broadcast name so everyone knows what channel to join
      if (this.props.projectId === channelObj.id) {
        this.setState({ broadcastName: channelObj.broadcastName })
      }
    })
    let broadcast = this.state.broadcastName
    return (
      <Container>
        {broadcast && <h4>Live Channel: {broadcast}</h4>}
        <Container>
          <Button
            onClick={this.handleClick}
            size="mini"
            id="btn-open-room"
            name="openChannel"
          >
            Start Channel
          </Button>
          <Button
            onClick={this.handleClick}
            size="mini"
            id="btn-join-room"
            name="joinChannel"
          >
            Join Channel
          </Button>
          <Button
            onClick={this.handleClick}
            size="mini"
            id="btn-leave-room"
            name="leaveChannel"
          >
            Leave Channel
          </Button>
          <Button
            onClick={this.handleClick}
            size="mini"
            id="btn-close-room"
            name="closeChannel"
          >
            Close Channel
          </Button>
          <Input
            onChange={this.handleChange}
            type="text"
            size="mini"
            id="roomId"
            placeholder="Enter Channel Name"
          />
        </Container>
        <Container id="video-container" />
      </Container>
    )
  }
}
