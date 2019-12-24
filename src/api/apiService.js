const axios = require('axios');
const config = require('../config');

export class ApiService {
  constructor( url, params ) {
    this.url = config.apiServerUrl + url
    this.params = params
  }

  //TODO: Add paramater support
  get() {
    var self = this;   
    return axios({
      method: 'get',
      url: self.url,
      responseType: 'stream'
    })
  }

  //TODO: Add POST Method


  //TODO: Add Update Method

}

