import React, { Component } from 'react';
import { ApiService } from '../../api/apiService';

export default class Reports2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      messages: null
    };
  }

  componentDidMount() {
    this.getApiData();
  }

  async getApiData() {
    var apiCall = new ApiService('auth-demo', {});
    let currentComponent = this;
    apiCall.get().then(function (response) {
      currentComponent.setState({
        data: response,
        error: false,
        messages: 'here we are!'
      });
    })
      .catch(function (error) {
        currentComponent.setState({
          error: true,
          messages: 'Error reported accessing API.'
        });
        console.log(`Error Reported: ${error}`);
      })
      .finally(function () {
        currentComponent.setState({ fetching: false });
      });

  }


  render() {
    const { data, error, messages } = this.state
    return (
      <div>
        <h2>API Test w/ Okta Authentication Token and Axios.js</h2>
        <div>Data: {JSON.stringify(data)}</div>
        <div style={{marginTop: 10}}>MSG: {messages}</div>
        <div style={{marginTop: 10}}>Error: {error}</div>
      </div>
    );
  }
}