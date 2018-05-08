import React, { Component } from 'react'
import SimpleWebRTC from 'simplewebrtc'
import { Button } from 'semantic-ui-react'
import io from 'socket.io-client'

const socket = io(window.location.origin)

export default class Vidchat extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    socket.emit('test')
    let webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: document.getElementById('gum-local'),
      // the id/element dom element that will hold remote videos
      remoteVideosEl: '',
      // immediately ask for camera access
      autoRequestMedia: true
    })

    // we have to wait until it's ready
    webrtc.on('readyToCall', function() {
      // you can name it anything
      webrtc.joinRoom('your awesome room name')
    })

    webrtc.on('videoAdded', function(video, peer) {
      console.log('video added', peer)
      var remotes = document.getElementById('gum-remote')
      if (remotes) {
        var container = document.createElement('div')
        container.className = 'gum-remote'
        container.id = 'container_' + webrtc.getDomId(peer)
        container.appendChild(video)

        // suppress contextmenu
        video.oncontextmenu = function() {
          return false
        }

        remotes.appendChild(container)
      }
    })

    webrtc.on('videoRemoved', function(video, peer) {
      console.log('video removed ', peer)
      var remotes = document.getElementById('gum-remote')
      var el = document.getElementById(
        peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer'
      )
      if (remotes && el) {
        remotes.removeChild(el)
      }
    })

    let errorElement = document.querySelector('#errorMsg')
    let video = document.querySelector('video')

    // Put variables in global scope to make them available to the browser console.
    var constraints = (window.constraints = {
      audio: false,
      video: true
    })

    function handleSuccess(stream) {
      var videoTracks = stream.getVideoTracks()
      console.log('Got stream with constraints:', constraints)
      console.log('Using video device: ' + videoTracks[0].label)
      stream.oninactive = function() {
        console.log('Stream inactive')
      }
      window.stream = stream // make variable available to browser console
      video.srcObject = stream
    }

    function handleError(error) {
      if (error.name === 'ConstraintNotSatisfiedError') {
        errorMsg(
          'The resolution ' +
            constraints.video.width.exact +
            'x' +
            constraints.video.width.exact +
            ' px is not supported by your device.'
        )
      } else if (error.name === 'PermissionDeniedError') {
        errorMsg(
          'Permissions have not been granted to use your camera and ' +
            'microphone. You need to allow the page access to your devices in ' +
            'order for the demo to work.'
        )
      }
      errorMsg('getUserMedia error: ' + error.name, error)
    }

    function errorMsg(msg, error) {
      // errorElement.innerHTML += '<p>' + msg + '</p>'
      if (typeof error !== 'undefined') {
        console.error(error)
      }
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError)
  }

  render() {
    return (
      <div>
        <h2>Vidchat here</h2>
        <div id="all-videos">
          <video id="gum-local" autoPlay />
          <div id="gum-remote" autoPlay />
        </div>
      </div>
    )
  }
}
