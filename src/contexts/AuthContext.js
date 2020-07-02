import React, { createContext, Component } from "react";
import { withAuth } from "@okta/okta-react";
import { axiosApiService } from "../api/apiService";
export const AuthContext = createContext();

async function checkAuthentication() {  
  const authenticated = await this.props.auth.isAuthenticated();
  const accessToken = await this.props.auth.getAccessToken();
  console.log("authenticated here?", authenticated);
  if (authenticated && !this.state.userRecord && accessToken) {    
    const userRecord = await getUser(accessToken);
    this.setState({ authenticated, loading: false, userRecord: userRecord });
  } else {
    this.setState({ authenticated: false, loading: false,  userRecord: null });
  }
}

const getUser = async (accessToken) => {  
  try {    
    let apiUrl = "/users";
    const response = await axiosApiService(accessToken).get(apiUrl, {});
    console.log("getting user", response.data);
    return response.data;
  }
  catch (err) {   
    console.log("Error getting user data: " + err.message);    
  }
};


class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false, sharedState: null, loading: true, userRecord: null };
    this.checkAuthentication = checkAuthentication.bind(this);    
  }

  logoutUserContext = () => {
    this.setState({ authenticated: false, sharedState: null, userRecord: null });
    return this.props.auth.logout("/");
  }

  loginUserContext = () => {
    return this.props.auth.login("/overview");
  }

  getAccessToken = () => {
    return this.props.auth.getAccessToken();
  }

  getIsAuthenticated = () => {
    return this.state.authenticated;
  }

  setRootLoading = (value) => {
    console.log("setRootLoading", value);
    const loadingValue = value === true ? true : false;
    this.setState({ loading: loadingValue });
  }


  //New LDAP derived getUsers Service
  getUserRecord = async (forceReset) => {    
    if (!this.state.userRecord || forceReset) {
      await this.checkAuthentication(); 
    }
    return this.state.userRecord;        
  }

  
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

  setSharedState = (value) => {
    this.setState({ sharedState: value });
  }

  componentDidMount () {
    this.setState({ loading: true });
    this.checkAuthentication();
  }

  componentDidUnMount() {
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
        getUserRecord: this.getUserRecord,
        getIsAuthenticated: this.getIsAuthenticated,
        setRootLoading: this.setRootLoading,
        setSharedState: this.setSharedState }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default withAuth(AuthContextProvider);
