const OPEN_CHAT = 'OPEN_CHAT'
const HIDE_CHAT = 'HIDE_CHAT'

export const openChat = () => {
  return {
    type: OPEN_CHAT
  }
}

export const hideChat = () => {
  return {
    type: HIDE_CHAT
  }
}

export default function(state = false, action) {
  switch (action.type) {
    case OPEN_CHAT:
      return true
    case HIDE_CHAT:
      return false
    default:
      return state
  }
}
