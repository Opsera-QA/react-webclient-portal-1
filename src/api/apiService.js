const axios = require('axios');
const config = require('../config');

const axiosInstance = axios.create({
  baseURL: config.apiServerUrl,
  timeout: 10000,
})

const setInterceptorToken = (authToken) => {
  axiosInstance.interceptors.request.use(function (config) {
    const token = 'Bearer ' + authToken;
    config.headers.Authorization =  token;
    return config;
  },authToken);
}

export class ApiService {
  constructor( url, params, token ) {
    this.url = url
    this.params = params
    if (token) {setInterceptorToken(token);}
  }


  //TODO: Add paramater support
  get() {
    var self = this;   
    return axiosInstance({
      method: 'get',
      url: self.url,
      params : self.params,
      responseType: 'stream'
    })
  }

  //TODO: Add POST Method
  post() {
    var self = this;   
    return axiosInstance({
      method: 'post',
      url: self.url,
      params : self.params,
      responseType: 'stream'
    })
  }

  //TODO: Add Update Method


  //TODO: Add Delete Method

  delete() {
    var self = this;   
    return axiosInstance({
      method: 'delete',
      url: self.url,
      params: self.params,
      // responseType: 'stream'
    })
  }

}

