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

  // First call the getAccessToken and then call the API
  async componentDidMount() {
    const { getAccessToken, setSharedState } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const accessToken = await getAccessToken();
    this.getApiData(accessToken);

    setSharedState({ "data1":"test", "data2":30, "data3":null });  //Demo of how to use sharedState in AuthContext for sharing data between subsets of components
  }

  getApiData(accessToken) {
    const apiCall = new ApiService('/auth-demo', {}, accessToken);
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
          message = `Status ${error.response.status}: ${
            error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data)}`;
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
    const { authenticated, userInfo, sharedState } = this.context;
    console.log(this.context);
    console.log(sharedState); //  Use this share state temporarily among components
    return (
      <div>
        <h2>API Test w/ Okta Authentication Token and Axios.js</h2>
        { error ? <ErrorDialog errorMessage={messages} /> : null }

        <div><strong>API Response Data Package:</strong><br />
        <span className="text-muted">{JSON.stringify(data)}</span></div>
        <h6 style={{marginTop: 20}}>Response Package Breakdown:<br />
        <small className="text-muted">This is confirmation the data is returned from the server and an example of breaking it down 
        into it's individual components.  The Response Token is not typically returned, however in this demo, the API Server is 
        programmed to return it to confirm it was sent and received properly.</small></h6>
        <p></p>
        <div><i>Response Message Data:</i> {data ? data.message : ''}</div>
        <div style={{ marginTop: 20 }}><i>Response Token:</i> <br />
          <span className="code">{data ? data.authorization : ''}</span>
          </div>
        <div style={{ marginTop: 20 }}>Component getApiData() State Message: {messages}</div>
        <div style={{ marginTop: 10 }}>Component getApiData() State Error: {error}</div>
        { authenticated && <div style={{ marginTop: 20 }}>
        <h6 style={{marginTop: 25}}>AuthContext Data:
        <br />
        <small className="text-muted">This confirms the React Context is working properly in the app returning User Properties from Okta.</small></h6>
          <AuthContext.Consumer>
            {({ userInfo }) => {
              console.log(userInfo)
              return(<div style={{margin:5}}>
                <div>
                  User Name: {userInfo ? `${userInfo.name}` : ''}<br />
                  User ID: {userInfo ? `${userInfo.id}` : ''}<br />
                  Email: {userInfo ? `${userInfo.email}` : ''}<br />
                  Zone: {userInfo ? `${userInfo.zoneinfo}` : ''}</div>
                </div>)}}
          </AuthContext.Consumer>
        </div> }
      </div>
    );
  }
}
export default ApiDemo;