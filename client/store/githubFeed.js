import axios from 'axios'

const GET_EVENTS = 'GET_EVENTS'

const getEvents = events => {
  return {
    type: GET_EVENTS,
    events
  }
}

export const fetchEvents = projectId => dispatch =>
  axios
    .get(`/api/projects/${projectId}/events`)
    .then(res => res.data)
    .then(events => {
      dispatch(getEvents(events))
    })
    .catch(err => console.log(err))

export default function(state = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events
    default:
      return state
  }
}
