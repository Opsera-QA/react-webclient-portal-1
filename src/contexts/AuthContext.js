import React, { createContext, useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { axiosApiService } from "../api/apiService";

const AuthContextProvider = (props) => {
  const { authService, authState } = useOktaAuth();
  const [userRecord, setUserRecord] = useState(null);
  

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


  return (
    <AuthContext.Provider value={{
      authState: authState,
      logoutUserContext: logoutUserContext, 
      loginUserContext: loginUserContext, 
      getAccessToken: getAccessToken,
      getIsPreviewRole: getIsPreviewRole, //TODO: Depracate
      getUserRecord: getUserRecord,
      getIsAuthenticated: getIsAuthenticated }}>
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
