const axios = require('axios');
const config = require('../config');

const axiosInstance = axios.create({
  baseURL: config.apiServerUrl,
  timeout: 10000,
})

axiosInstance.interceptors.request.use(function (config) {
  const token = 'Bearer ' + '--ValueFromOktaTokenGoesHere--';
  config.headers.Authorization =  token;
  return config;
});

export class ApiService {
  constructor( url, params ) {
    this.url = url
    this.params = params
  }

  //TODO: Add paramater support
  get() {
    var self = this;   
    return axiosInstance({
      method: 'get',
      url: self.url,
      responseType: 'stream'
    })
  }

  //TODO: Add POST Method


  //TODO: Add Update Method

}

