import React, { createContext, useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { axiosApiService } from "../api/apiService";

const AuthContextProvider = (props) => {
  const { authService, authState } = useOktaAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRecord, setUserRecord] = useState(null);
  const [sharedState, setSharedState] = useState(null);
  

  useEffect(() => {    
    if (authState.isAuthenticated) {
      setUserState();
    }    
  }, [authState]);


  const setUserState = async () => {
    const user = await _getUserProperties();    
    setUserRecord(user);
  };

  const _getUserProperties = async () => {
    const token = await authService.getAccessToken();
    try {    
      let apiUrl = "/users";
      const response = await axiosApiService(token).get(apiUrl, {});
      //console.log("getting user", response.data);
      return response.data;
    }
    catch (err) {   
      console.log("Error getting user data: " + err.message);    
    }
  };

  const logoutUserContext = () => {
    setAuthenticated(false);
    setSharedState(null);
    setUserRecord(null);
    authService.clearAuthState();
    return authService.logout("/");
  };

  const loginUserContext = () => {
    return authService.login("/");
  };

  const getAccessToken = () => {
    return authService.getAccessToken();
  };

  const getIsAuthenticated = async () => {
    const authState = await authService.getAuthState();
    return authState.isAuthenticated;
  };

  const setRootLoading = (value) => { //do we need this?
    const loadingValue = value === true ? true : false;
    setLoading(loadingValue);
  };

  const getUserRecord = async () => {    //New LDAP derived getUsers Service
    if (!userRecord || authState.isPending) {
      await delay(2000);
      if (authState.isAuthenticated && !userRecord) {
        return await _getUserProperties();
      }
    }
    return userRecord; 
  };


  //TODO Review this with new LDAP serivces
  const getIsPreviewRole = async (restrictProd) => {
    const userInfo = await getUserRecord();    
    console.log("Environment: ", process.env.REACT_APP_ENVIRONMENT);    
    if (restrictProd && process.env.REACT_APP_ENVIRONMENT === "production") {
      return false;
    } else {
      return userInfo.groups.includes("Preview");
    }    
  };

  /* const checkAuth = async () => {
    const authState = await authService.getAuthState();
    console.log("authState", authState);    
    if (authState.isAuthenticated && !userRecord && authState.accessToken) {    
      const userRecord = await getUser(authState.accessToken);      
      setAuthenticated(authState.isAuthenticated);
      setLoading(false);
      setUserRecord(userRecord);
    } else {
      setAuthenticated(false);
      setLoading(false);
      setUserRecord(null);
      
    }
  }; */

  return (
    <AuthContext.Provider value={{
      authState: authState,
      logoutUserContext: logoutUserContext, 
      loginUserContext: loginUserContext, 
      getAccessToken: getAccessToken,
      getIsPreviewRole: getIsPreviewRole, //TODO: Depracate
      getUserRecord: getUserRecord,
      getIsAuthenticated: getIsAuthenticated,
      setRootLoading: setRootLoading,
      setSharedState: setSharedState }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export const AuthContext = createContext();
export default AuthContextProvider;

async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise(resolve => setTimeout(resolve, ms));
}
/* 
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
} */



/* class AuthContextProvider extends Component {
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
} */
 

