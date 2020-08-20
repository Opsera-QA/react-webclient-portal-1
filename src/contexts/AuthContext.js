import React, { createContext } from "react";
import OktaAuth from "@okta/okta-auth-js";
import PropTypes from "prop-types";

const AuthContextProvider = (props) => {
    const { userData, refreshToken, } = props;

    const authClient = new OktaAuth({
      issuer: process.env.REACT_APP_OKTA_ISSUER,
      clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
      redirectUri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
    });

    const logoutUserContext = () => {
      authClient.closeSession();
      authClient.tokenManager.clear();
      window.location = "/";
    };

    const loginUserContext = () => {
      window.location = "/login";
    };

    const renewUserToken = () => {
      refreshToken();
    };


  //const idToken = await token.getWithoutPrompt();
  //const { tokens } = idToken;
  //return tokens.accessToken.value;

  const getAccessToken = async () => {
      if (!getIsAuthenticated) {
        console.log("!getAccessToken: redirecting to login");
        window.location = "/login"; //if not authenticated, may just need to take user to login page
        //window.location.reload(); //possibly just trigger a reload which may be better?
        return;
      }

      const tokenObject = await authClient.tokenManager.get("accessToken");
      console.log(tokenObject);
      if (!tokenObject) {
        console.log("!tokenObject");
        await authClient.token.getWithRedirect({
          responseType: 'id_token'
        });
        return;
      }
      return tokenObject.accessToken;
    };

    const getIsAuthenticated = async () => {
      const session = await authClient.session.exists();
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
  refreshToken: PropTypes.func,
};

export const AuthContext = createContext();
export default AuthContextProvider;
