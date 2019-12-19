import * as at from "../actions/actionTypes"

const defaultState = {}

// sets the okta authentication to local redux state

function auth(state = defaultState, action) {
  switch (action.type) {
    case at.SET_OKTA_USER: {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}

export default auth
