import axios from 'axios'

const GET_CAUSES = 'GET_CAUSES'

const getCauses = causes => {
  return { type: GET_CAUSES, causes }
}

export const fetchAllCauses = () => dispatch =>
  axios
    .get(`/api/causes`)
    .then(res => {
      dispatch(getCauses(res.data))
    })
    .catch(err => console.log(err))

export default function(state = [], action) {
  switch (action.type) {
    case GET_CAUSES:
      return action.causes
    default:
      return state
  }
}
