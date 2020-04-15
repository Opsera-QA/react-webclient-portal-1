import React, { createContext, Component } from "react";
import { withAuth } from "@okta/okta-react";
import { ApiService } from "../api/apiService";
export const AuthContext = createContext();

async function checkAuthentication() {
  let curAuthenticatedState = this.state.authenticated;
  let ssoUserRecord = {};
  const authenticated = await this.props.auth.isAuthenticated();
  if (authenticated !== this.state.authenticated) {
    if (authenticated && !this.state.userInfo) {
      const userInfo = await this.props.auth.getUser();
      const accessToken = await this.props.auth.getAccessToken();
      if (!curAuthenticatedState && userInfo) { 
        ssoUserRecord = await updateUserRecord(userInfo, accessToken); 
      }
      this.setState({ authenticated, userInfo, loading: false, ssoUserRecord });      
    } else {
      this.setState({ authenticated, loading: false });
    }
  }
}

async function updateUserRecord(userInfo, accessToken) {
  if (userInfo && accessToken) {
    let userRecord = {
      "system": "okta",
      "user_data": userInfo
    };
    const apiCall = new ApiService("/users/save", null, accessToken, userRecord);
    const ssoUserRecord = apiCall.post()
      .then(function (response) {
        return response.data;        
      })
      .catch(function (error) {console.log("error on saving user record silently.");});
    return ssoUserRecord;
  }
}


class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userInfo: null, sharedState: null, loading: true, ssoUserRecord: null };
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

  getIsPreviewRole = async () => {
    let userInfo = await this.getUserInfo();
    console.log("userInfo");
    return userInfo.Groups.includes("Preview");
  }

  getUserSsoUsersRecord = async () => {
    if (this.state.ssoUserRecord) {
      return this.state.ssoUserRecord;
    } else {
      const accessToken = await this.props.auth.getAccessToken();
      const apiCall = new ApiService("/users", null, accessToken);
      const ssoUserRecord = apiCall.get()
        .then(function (response) {
          return response.data;        
        })
        .catch(function (error) {console.log("error on user record lookup in context.");});
      return ssoUserRecord;
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
        getIsPreviewRole: this.getIsPreviewRole,
        getUserSsoUsersRecord: this.getUserSsoUsersRecord,
        setSharedState: this.setSharedState }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default withAuth(AuthContextProvider);
