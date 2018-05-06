import axios from 'axios'

const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES'
const POST_MESSAGE = 'POST_MESSAGE'

const getAllMessages = messages => {
  return {
    type: GET_ALL_MESSAGES,
    messages
  }
}

const postMessage = message => {
  return {
    type: POST_MESSAGE,
    message
  }
}

export const fetchAllMessages = () => dispatch =>
  //should edit later to be able to get chatroom by id
  axios
    .get('/api/chatroom/1/messages')
    .then(res => {
      dispatch(getAllMessages(res.data))
    })
    .catch(err => console.log(err))

export const postMessageToDb = message => dispatch =>
  //should edit later to be able to get chatroom by id
  axios
    .post('/api/chatroom/1/messages', message)
    .then(res => {
      dispatch(postMessage(res.data))
    })
    .catch(err => console.log(err))

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return action.messages
    case POST_MESSAGE:
      return [...state, action.message]
    default:
      return state
  }
}
