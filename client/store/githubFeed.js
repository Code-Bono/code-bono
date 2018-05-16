import axios from 'axios'

const GET_EVENTS = 'GET_EVENTS'
const ADD_EVENT = 'ADD_EVENT'

// Action creators
const getEvents = events => {
  return {
    type: GET_EVENTS,
    events
  }
}

export const addEvent = newEvent => {
  return {
    type: ADD_EVENT,
    newEvent
  }
}

// Thunk creators
export const fetchEvents = projectId => dispatch =>
  axios
    .get(`/api/projects/${projectId}/events`)
    .then(res => res.data)
    .then(events => {
      dispatch(getEvents(events))
    })
    .catch(err => console.log(err))

// Reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events
    case ADD_EVENT:
      return [...state, action.newEvent]
    default:
      return state
  }
}
