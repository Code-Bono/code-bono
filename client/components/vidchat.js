import React, { Component } from 'react'
import socket from '../socket'
import { Button, Input, Container } from 'semantic-ui-react'

let connection = new RTCMultiConnection()

export default class Vidchat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelName: '',
      broadcastName: '',
      isChatLive: false
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
        this.setState({ isChatLive: true })
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
      //checks if channels are live
      if (this.state.isChatLive) {
        //closes channel and resets broadcastName
        connection.attachStreams.forEach(function(localStream) {
          localStream.stop()
        })
        this.setState({ broadcastName: '' }, () => {
          ///emits close after resetting the new name
          let channelInfo = {}
          channelInfo.broadcastName = this.state.broadcastName
          channelInfo.id = this.props.projectId
          socket.emit('closeChannel', channelInfo)
          this.setState({ isChatLive: false })
        })
        connection.close()
      }
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
      this.setState({ isChatLive: true })
    })
    socket.on('closeAllChannels', channelObj => {
      if (this.props.projectId === channelObj.id) {
        this.setState({ broadcastName: channelObj.broadcastName })
      }
      connection.attachStreams.forEach(function(localStream) {
        localStream.stop()
      })
      connection.close()
      this.setState({ isChatLive: false })
    })
    let broadcast = this.state.broadcastName
    return (
      <div className="vidchat-container">
        <Container>
          {broadcast && (
            <h4 className="live-channel-name">Live Channel: {broadcast}</h4>
          )}
          <div className="vidchat-children">
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
          </div>
          <Container id="video-container" />
        </Container>
      </div>
    )
  }
}
