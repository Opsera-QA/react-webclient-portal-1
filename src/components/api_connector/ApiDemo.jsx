import React, { Component } from 'react';
import { ApiService } from '../../api/apiService';
import ErrorDialog from "../common/error";
import {AuthContext} from '../../contexts/AuthContext';
class ApiDemo extends Component {
  static contextType = AuthContext;
  
  constructor(props, context) {
    super(props, context);
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
    const apiCall = new ApiService('auth-demo', {});
    let currentComponent = this;
    apiCall.get().then(function (response) {
      currentComponent.setState({
        data: response.data,
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
    const { authenticated, userinfo } = this.context;
    return (
      <div>
        <h2>API Test w/ Okta Authentication Token and Axios.js</h2>
        { this.state.error ? <ErrorDialog errorMessage={messages} /> : null }
        <div>Data: {JSON.stringify(data)}</div>
        <div style={{marginTop: 10}}>Authorization Token: {data ? data.authorization : ''}</div>
        <div style={{marginTop: 10}}>MSG: {messages}</div>
        <div style={{marginTop: 10}}>Error: {error}</div>
        <div style={{marginTop: 10}}>AuthContext Data: 
          <AuthContext.Consumer>
            {({ userinfo }) => <p>User Name: {userinfo ? userinfo.name : ''}</p>}
          </AuthContext.Consumer>
        </div>
      </div>
    );
  }
}
export default ApiDemo;
//ApiDemo.contextType = AuthContext;