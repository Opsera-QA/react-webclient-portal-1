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
  constructor( url, params, token, data ) {
    this.url = url
    this.params = params
    this.data = data //POST BODY Data JSON format
    if (token) {setInterceptorToken(token);}
  }

  get() {
    var self = this;   
    console.log(self.params);
    return axiosInstance({
      method: 'get',
      url: self.url,
      params : self.params,
      responseType: 'stream'
    })
  }

  post() {
    var self = this;   
    return axiosInstance({
      method: 'post',
      url: self.url,
      params : self.params,
      data : self.data,
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

