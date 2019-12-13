import * as at from "../actions/actionTypes"
import {api2} from "../api"

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
