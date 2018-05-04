import axios from 'axios'

const initialValues = []
const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES'
const PUT_TO_DB = 'PUT_TO_DB'

const getAllMessages = messages => {
  return {
    type: GET_ALL_MESSAGES,
    messages
  }
}

const putMessageToDb = messages => {
  return {
    type: PUT_TO_DB,
    messages
  }
}

export const sendMessageToDb = message => dispatch =>
  //should edit later to be able to get chatroom by id
  axios
    .put('/api/chatroom', { message })
    .then(res => dispatch(putMessageToDb(res.data.messages)))
    .catch(err => console.log(err))

export const fetchAllMessages = () => dispatch =>
  //should edit later to be able to get chatroom by id
  axios
    .get('/api/chatroom')
    .then(res => dispatch(getAllMessages(res.data.messages)))
    .catch(err => console.log(err))

export default function(state = initialValues, action) {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return action.messages
    case PUT_TO_DB:
      return action.messages
    default:
      return state
  }
}
