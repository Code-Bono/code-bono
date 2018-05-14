module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    socket.on('sendMessage', data => {
      socket.broadcast.emit('updateChat', data)
    })
    socket.on('message', function(data) {
      socket.broadcast.emit('message', data)
    })
    socket.on('updateChannelName', function(channelObj) {
      socket.broadcast.emit('sendChannelName', channelObj)
    })
    socket.on('closeChannel', function(channelObj) {
      socket.broadcast.emit('closeAllChannels', channelObj)
    })
  })
}
