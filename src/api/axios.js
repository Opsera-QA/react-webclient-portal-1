import axios from "axios"
import {serverURL} from "../config"
import store from "../store"

const instance = axios.create({
  baseURL: serverURL,
  timeout: 10000,
})

// checks if the user is logged in or not and correspondingly adds authentication headers

export const api2 = async ({
  method = "POST",
  endpoint,
  withToken = true,
  body,
  baseURL = null,
}) => {
  const {authentication} = store.getState()
  return await api(endpoint, {
    ...(baseURL ? {baseURL: ""} : {}),
    method,
    data: body,
    headers: {
      ...(withToken
        ? {
            Authentication: `Bearer ${ authentication && authentication.accessToken}`,
          }
        : {}),
    },
  })
}

export const api = instance
