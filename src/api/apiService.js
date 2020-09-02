const axios = require("axios");
const config = require("../config");

const axiosInstance = axios.create({
  baseURL: config.apiServerUrl,
  timeout: 50000,
});

const setInterceptorToken = (authToken) => {
  axiosInstance.interceptors.request.use(function(config) {
    //const token = "Bearer " + authToken;
    //config.headers.Authorization = token;
    config.headers["authorization"] = `Bearer ${authToken}`;
    config.headers["cache-control"] = `no-cache`;
    return config;
  }, function(error) {
    return Promise.reject(error);
  }, authToken);
};

export function axiosApiService(token) {
  setInterceptorToken(token);
  return axiosInstance;
}

export function axiosApiServiceMultiGet(token, urls) {
  setInterceptorToken(token);
  const requests = urls.map(URL => axiosInstance.get(URL).catch(err => null));
  return axios.all(requests);
}


export class ApiService {
  constructor(url, params, token, data) {
    this.url = url;
    this.params = params;
    this.data = data; //POST BODY Data JSON format
    if (token) {
      setInterceptorToken(token);
    }
  }

  get() {
    var self = this;
    return axiosInstance({
      method: "get",
      url: self.url,
      params: self.params,
      responseType: "stream",
    });
  }

  post() {
    var self = this;
    return axiosInstance({
      method: "post",
      url: self.url,
      params: self.params,
      data: self.data,
      responseType: "stream",
    });
  }

  //TODO: Add Update Method


  //TODO: Add Delete Method
  delete() {
    var self = this;
    return axiosInstance({
      method: "delete",
      url: self.url,
      params: self.params,
      data: self.data,
    });
  }
}

