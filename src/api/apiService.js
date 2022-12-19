const axios = require("axios");
const config = require("../config");

const axiosInstance = axios.create({
  baseURL: config.NODE_API_ORCHESTRATOR_SERVER_URL,
  timeout: 50000,
});

/*const setInterceptorToken = (authToken) => {

  axiosInstance.interceptors.request.use(function(config) {
    config.headers["authorization"] = `Bearer ${authToken}`;
    config.headers["cache-control"] = `no-cache`;
    console.log("Updating token?")
    return config;
  }, function(error) {
    console.error(error)
    if (error.message.includes("401")){
      console.error("apiService detected 401 and would redirect to login, if allowed")
      //window.location = "/login";
      window.location.reload(false);
    }
    return Promise.reject(error);

  }, authToken);
};*/

export function axiosApiService(token) {
  axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;

  return axiosInstance;
}

export function axiosApiServiceMultiGet(token, urls) {
  axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;

  const requests = urls.map(URL => axiosInstance.get(URL).catch(err => null));
  return axios.all(requests);
}


export class ApiService {
  constructor(url, params, token, data) {
    this.url = url;
    this.params = params;
    this.data = data; //POST BODY Data JSON format
    if (token) {
      axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
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

