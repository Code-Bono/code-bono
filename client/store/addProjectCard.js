import axios from 'axios'

const ADD_PROJECT_CARD = 'ADD_PROJECT_CARD'
const SUBMIT_PROJECT_CARD = 'SUBMIT'

export function addProjectCard (noteToAdd) {
  const action = { type: ADD_PROJECT_CARD, noteToAdd };
  return action;
}

export function submitProjectCard () {
  const action = { type: SUBMIT_PROJECT_CARD}
  return action
}


export function postProjectCard (note) {
  console.log('note!',note)
  return function thunk (dispatch) {
    return axios.post('/api/projects/project-board-cards/add', {note})
      .then(res => res.data)
      .then(() => {
        dispatch(submitProjectCard());
      });
  };
}

export default function(state = '', action) {
  switch (action.type) {
    case ADD_PROJECT_CARD:
      return action.noteToAdd
    case SUBMIT_PROJECT_CARD:
      return ''
    default:
      return state
  }
}
