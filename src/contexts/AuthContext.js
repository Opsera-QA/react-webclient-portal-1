import React, { createContext, Component } from "react";
import { withAuth } from "@okta/okta-react";
import { ApiService } from "../api/apiService";
export const AuthContext = createContext();

async function checkAuthentication() {
  let curAuthenticatedState = this.state.authenticated;
  const authenticated = await this.props.auth.isAuthenticated();
  if (authenticated !== this.state.authenticated) {
    if (authenticated && !this.state.userInfo) {
      const userInfo = await this.props.auth.getUser();
      const accessToken = await this.props.auth.getAccessToken();
      if (!curAuthenticatedState && userInfo) { updateUserRecord(userInfo, accessToken); }
      this.setState({ authenticated, userInfo });
    } else {
      this.setState({ authenticated });
    }
  }
}

function updateUserRecord(userInfo, accessToken) {
  if (userInfo && accessToken) {
    let userRecord = {
      "system": "okta",
      "user_data": userInfo
    };
    const apiCall = new ApiService("/users/save", null, accessToken, userRecord);
    apiCall.post()
      .then(function (response) {console.log("user record updates success");})
      .catch(function (error) {console.log("error on saving user record silently.");});
  }
}

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userInfo: null, sharedState: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  logoutUserContext = () => {
    this.setState({ authenticated: null, userInfo: null, sharedState: null });
    return this.props.auth.logout("/");
  }

  loginUserContext = () => {
    return this.props.auth.login("/");
  }

  getAccessToken = () => {
    return this.props.auth.getAccessToken();
  }

  getUserInfo = () => {
    if (this.state.userInfo) {
      return this.state.userInfo;
    } else {
      return this.props.auth.getUser();
    }
  }

  setSharedState = (value) => {
    this.setState({ sharedState: value });
  }

  componentDidMount() {
    this.checkAuthentication();
  }
  
  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() { 
    return ( 
      <AuthContext.Provider value={{
        ...this.state, 
        logoutUserContext: this.logoutUserContext, 
        loginUserContext: this.loginUserContext, 
        getAccessToken: this.getAccessToken,
        getUserInfo: this.getUserInfo,
        setSharedState: this.setSharedState }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default withAuth(AuthContextProvider);
