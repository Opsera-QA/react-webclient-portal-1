import React, { createContext, Component } from "react";
import { withAuth } from "@okta/okta-react";
import { ApiService, axiosApiService } from "../api/apiService";
export const AuthContext = createContext();

async function checkAuthentication() {  
  const authenticated = await this.props.auth.isAuthenticated();
  if (authenticated && !this.state.userRecord) {
    const accessToken = await this.props.auth.getAccessToken();
    const userRecord = await getUser(accessToken);
    this.setState({ authenticated, loading: false, userRecord: userRecord });
  }
}

const getUser = async (accessToken) => {
  try {    
    let apiUrl = "/users";
    const response = await axiosApiService(accessToken).get(apiUrl, {});
    console.log(response.data);
    return response.data;
  }
  catch (err) {
    console.log("Error getting user data: " + err.message);
    return null;
  }
};





class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, sharedState: null, loading: true, userRecord: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  logoutUserContext = () => {
    this.setState({ authenticated: null, sharedState: null, loading: false,  userRecord: null });
    return this.props.auth.logout("/");
  }

  loginUserContext = () => {
    return this.props.auth.login("/");
  }

  getAccessToken = () => {
    return this.props.auth.getAccessToken();
  }


  //New LDAP derived getUsers Service
  getUserRecord = async () => {
    console.log("user record: ", this.state.userRecord);
    if (this.state.userRecord !== null) {
      return this.state.userRecord;
    } else {
      const accessToken = await this.props.auth.getAccessToken();
      const userRecord = await getUser(accessToken);
      return userRecord;
    }
  }
  

  //TODO To be removed for LDAP
  //getUserInfo = async () => {
  //  const user = await this.getUserRecord();
  //  return user;
    
  /* if (this.state.userInfo) {
      return this.state.userInfo;
    } else {
      return this.props.auth.getUser();
    } */
  // }

  //TODO Review this with new LDAP serivces
  getIsPreviewRole = async (restrictProd) => {
    const userInfo = await this.getUserRecord();
    
    console.log("Environment: ", process.env.REACT_APP_ENVIRONMENT);    
    if (restrictProd && process.env.REACT_APP_ENVIRONMENT === "production") {
      //always restrict view in this case
      return false;
    } else {
      return userInfo.groups.includes("Preview");
    }    
  }

  //TODO Review this with new LDAP serivces
  //getUserSsoUsersRecord = async () => {
  //  const user = await this.getUserRecord();
  //  return user;
  /* if (this.state.ssoUserRecord) {
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
    } */
  //}

  

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
        getUserInfo: this.getUserInfo,  //TODO: Depracate
        getIsPreviewRole: this.getIsPreviewRole, //TODO: Depracate
        getUserSsoUsersRecord: this.getUserSsoUsersRecord, //TODO: Depracate
        getUserRecord: this.getUserRecord,
        setSharedState: this.setSharedState }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default withAuth(AuthContextProvider);
