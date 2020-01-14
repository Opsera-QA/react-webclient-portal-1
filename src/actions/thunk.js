import * as at from "../actions/actionTypes"
import {api2} from "../api"

// setOktaUser to redux store
export const setOktaUser = ({accessToken, user}) => dispatch => {
  dispatch({
    type: at.SET_OKTA_USER,
    payload: {
      accessToken,
      user,
    },
  })
}
// new api
export const getApps = () => async dispatch => {
  try {
    const res = await api2({
      endpoint: `/applications`,
      method: "GET",
    })
    dispatch({
      type: at.GET_APPS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: at.GET_APPS,
      payload: [],
    })
  }
}
