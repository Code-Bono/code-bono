import axios from 'axios'

const CREATE_PROJECT = 'CREATE_PROJECT'

const projectSignup = project => {
  return {
    type: CREATE_PROJECT,
    project
  }
}

export const createProject = (proposalDetails) => dispatch =>
  axios
    .post('/api/projects', proposalDetails)
    .then(res => res.data)
    .then(project => {
      dispatch(projectSignup(project))
    })
    .catch(err => console.log(err))

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return action.project
    default:
      return state
  }
}

// export const createProject = () => {
//   console.log('yop there')
// }
