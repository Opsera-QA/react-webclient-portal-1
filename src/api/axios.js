import axios from "axios"
import {serverURL} from "../config"

const instance = axios.create({
  baseURL: serverURL,
  timeout: 10000,
})

export const api2 = async ({
  method = "POST",
  endpoint,
  withToken = true,
  body,
  baseURL = null,
}) => {
  const token = JSON.parse(localStorage.getItem("okta-token-storage"))
  if(token){
    console.log(token.length)
  }
  return await api(endpoint, {
    ...(baseURL ? {baseURL: ""} : {}),
    method,
    data: body,
    headers: {
      ...(withToken
        ? {
            Authentication: `Bearer ${ token.length && token.accessToken.accessToken}`,
          }
        : {}),
    },
  })
}

export const api = instance
