import React, { createContext, useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import PropTypes from "prop-types";

const AuthContextProvider = (props) => {
    const { userData, refetchUserData } = props; //not implementing refrechUserData yet, but it would reload user object
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
      return userData;
    };

    const logoutUserContext = () => {
      setUserRecord(null);
      authService.clearAuthState();
      return authService.logout("/");
    };

    const loginUserContext = () => {
      refetchUserData();
      return authService.login("/overview");
    };

    const renewUserToken = () => {
      refetchUserData();
      return authService.login("/overview");
    };

    const getAccessToken = () => {
      return authService.getAccessToken();
    };

    const getIsAuthenticated = async () => {
      const authState = await authService.getAuthState();
      return authState.isAuthenticated;
    };

    const getUserRecord = async () => {
      return userData;
    };


    const getIsPreviewRole = async (restrictProd) => {
      console.log("Environment: ", process.env.REACT_APP_ENVIRONMENT);
      if (restrictProd && process.env.REACT_APP_ENVIRONMENT === "production") {
        return false;
      } else {
        return userData.groups.includes("Preview");
      }
    };

    const featureFlagItemInProd = () => {
      if (process.env.REACT_APP_ENVIRONMENT === "production") {
        return true;
      } else {
        return false;
      }
    };

    const setAccessRoles = async (user) => {
      if (user) {
        let customerAccessRules = {};

        const { ldap, groups } = user;
        if (groups) {
          console.log(groups);
          //calculate top role level for now
          let role = "readonly";

          if (groups.includes("Administrators")) {
            role = "administrator";
          } else if (groups.includes("Free Trial")) {
            role = "free_trial";
          } else if (groups.includes("PowerUsers")) {
            role = "power_user";
          } else if (groups.includes("Users")) {
            role = "user";
          } else if (groups.includes("NonLDAPEndUser")) {
            // if LDAP is null then we should set them as power user if they are member of everyone group, this is to support nonLDAP accounts
            role = "power_user";
          }

          customerAccessRules = {
            ...customerAccessRules,
            Administrator: groups.includes("Administrators"),
            PowerUser: groups.includes("PowerUsers"),
            User: groups.includes("Users"),
            UserId: user._id,
            Role: role,
          };
        }
        if (ldap && ldap.domain === "opsera.io") { //checking for OpsERA account domain
          customerAccessRules = {
            ...customerAccessRules,
            OpseraAdministrator: groups.includes("Administrators"),
          };
        }
        console.log("customerAccessRules: ", customerAccessRules);
        return customerAccessRules;
      } else {
        console.log("unable to set user access rules: ", user);
        console.log("authState.isAuthenticated: ", authState.isAuthenticated);
      }
    };


    return (
      <AuthContext.Provider value={{
        authState: authState,
        logoutUserContext: logoutUserContext,
        loginUserContext: loginUserContext,
        renewUserToken: renewUserToken,
        getAccessToken: getAccessToken,
        getIsPreviewRole: getIsPreviewRole,
        featureFlagItemInProd: featureFlagItemInProd,
        getUserRecord: getUserRecord,
        setAccessRoles: setAccessRoles,
        getIsAuthenticated: getIsAuthenticated,
      }}>
        {props.children}
      </AuthContext.Provider>
    );
  }
;

AuthContextProvider.propTypes = {
  userData: PropTypes.object,
  refetchUserData: PropTypes.func,
};

export const AuthContext = createContext();
export default AuthContextProvider;
