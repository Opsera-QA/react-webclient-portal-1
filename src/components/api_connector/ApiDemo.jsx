import React, { Component } from 'react';
import { ApiService } from '../../api/apiService';  //New API Service Function
import ErrorDialog from "../common/error";
import { AuthContext } from '../../contexts/AuthContext';  //REact Context API Code for User Authentication
class ApiDemo extends Component {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component
 
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      messages: null
    };
  }

  // This is where it may get optimized in the future but first call the getAccessToken and then call the API
  async componentDidMount() {
    const { getAccessToken } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const accessToken = await getAccessToken();
    await this.getApiData(accessToken);
  }

  async getApiData(accessToken) {
    const apiCall = new ApiService('auth-demo', {}, accessToken);
    let currentComponent = this;
    apiCall.get().then(function (response) {
      currentComponent.setState({
        data: response.data,
        error: false,
        messages: 'API call was successful!'
      });
    })
      .catch(function (error) {
        let message = null;
        if (error.response) {
          message = `Status ${error.response.status}: ${error.response.data}`;
        }
        console.log(message ? `ERROR: ${message}` : `Error Reported: ${error}`);

        currentComponent.setState({
          error: true,
          messages: message ? message : 'Error reported accessing API.'
        });
        
      })
      .finally(function () {
        currentComponent.setState({ fetching: false });
      });
  }


  render() {
    const { data, error, messages } = this.state
    const { authenticated, userinfo } = this.context;
    console.log(this.context)
    return (
      <div>
        <h2>API Test w/ Okta Authentication Token and Axios.js</h2>
        {this.state.error ? <ErrorDialog errorMessage={messages} /> : null}
        <div>Data: {JSON.stringify(data)}</div>
        <div style={{ marginTop: 10 }}>Authorization Token: {data ? data.authorization : ''}</div>
        <div style={{ marginTop: 10 }}>MSG: {messages}</div>
        <div style={{ marginTop: 10 }}>Error: {error}</div>
        <div style={{ marginTop: 10 }}>AuthContext Data:
          <AuthContext.Consumer>
            {({ userinfo }) => <p>User Name: {userinfo ? userinfo.name : ''}</p>}
          </AuthContext.Consumer>
        </div>
      </div>
    );
  }
}
export default ApiDemo;