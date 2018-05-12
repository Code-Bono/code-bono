import axios from 'axios'

const GET_FEED = 'GET_FEED'

const getFeed = feed => {
  return {
    type: GET_FEED,
    feed
  }
}

export const fetchFeed = projectId => dispatch =>
  axios
    .get(`/api/projects/${projectId}/feed`)
    .then(res => res.data)
    .then(feed => {
      dispatch(getFeed(feed))
    })
    .catch(err => console.log(err))

export default function(state = [], action) {
  switch (action.type) {
    case GET_FEED:
      return action.feed
    default:
      return state
  }
}
