import React, { createContext, useState, useEffect } from "react";
import OktaAuth from "@okta/okta-auth-js";
import PropTypes from "prop-types";

const AuthContextProvider = (props) => {
    const { userData, refetchUserData, ssoConfiguration } = props;

    const authClient = new OktaAuth({
      issuer: ssoConfiguration.issuer,
      clientId: ssoConfiguration.client_id,
      redirectUri: ssoConfiguration.redirect_uri,
    });
    const { token, tokenManager } = authClient;
    //console.log(authClient);
    //console.log(ssoConfiguration);

    const logoutUserContext = () => {
      authClient.closeSession();
      window.location = "/";
    };

    const loginUserContext = () => {
      refetchUserData();
      window.location = "/overview";
    };

    const renewUserToken = async () => {
      refetchUserData();
    };

    const getAccessToken = async () => {
      const idToken = await token.getWithoutPrompt();
      const { tokens } = idToken;
      return tokens.accessToken.value;
    };

    const getIsAuthenticated = async () => {
      const session = await authClient.session.exists();

      //const tokenProperties = await token.getWithoutPrompt();
      //const {tokens} = tokenProperties;
      //console.log(tokenProperties);

      //const idToken = await tokenManager.get('idToken');
      //console.log(authClient.tokenManager)

      return session;
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
        console.table(customerAccessRules);
        return customerAccessRules;
      } else {
        console.log("unable to set user access rules: ", user);
      }
    };


    return (
      <AuthContext.Provider value={{
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
  ssoConfiguration: PropTypes.object,
};

export const AuthContext = createContext();
export default AuthContextProvider;
