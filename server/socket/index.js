module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    socket.on('test', () => {
      console.log('this is a test!!!!')
    })
    socket.on('sendMessage', data => {
      console.log('this is a test', data)
      socket.broadcast.emit('updateChat', data)
    })
  })
}
