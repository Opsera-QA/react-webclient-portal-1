import React, { createContext } from "react";
import OktaAuth from "@okta/okta-auth-js";
import PropTypes from "prop-types";

const AuthContextProvider = (props) => {
    const { userData, refreshToken, authClient } = props;

/*    const authClient = new OktaAuth({
      issuer: process.env.REACT_APP_OKTA_ISSUER,
      clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
      redirectUri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
    });


    // Triggered when a token has expired
    authClient.tokenManager.on("expired", function(key, expiredToken) {
      console.log("Token with key", key, " has expired:");
      console.log(expiredToken);
    });
    // Triggered when a token has been renewed
    authClient.tokenManager.on("renewed", function(key, newToken, oldToken) {
      console.log("Token with key", key, "has been renewed");
      console.log("Old token:", oldToken);
      console.log("New token:", newToken);
    });
    // Triggered when an OAuthError is returned via the API (typically during token renew)
    authClient.tokenManager.on("error", function(err) {
      console.log("TokenManager error:", err);
      // err.name
      // err.message
      // err.errorCode
      // err.errorSummary
      // err.tokenKey
      // err.accessToken
    });*/

    const logoutUserContext = () => {
      //authClient.closeSession();
      authClient.tokenManager.clear();
      window.location = "/";
    };

    const loginUserContext = () => {
      window.location = "/login";
    };

    const renewUserToken = () => {
      refreshToken();
    };

    const getAccessToken = async () => {
      const isAuthenticated = await getIsAuthenticated();
      console.log(isAuthenticated)
      if (!isAuthenticated) {
        console.log("!getAccessToken: redirecting to login");
        window.location = "/login"; //if not authenticated, may just need to take user to login page
        return false;
      }

      const tokenObject = await authClient.tokenManager.get("accessToken");
      if (tokenObject.accessToken) {
        console.debug(tokenObject.tokenType + ": " + tokenObject.accessToken.substring(0, 50));
        return tokenObject.accessToken;
      } else {
        return false;
      }

      /*if (!tokenObject.accessToken) {
        console.log("!tokenObject");
        //token object isn't found, so get new one
        try {
          const response = await authClient.token.getWithRedirect({
            responseType: 'id_token'
          });
          console.log("response in try block getAccessToken: ", response)
          //todo: I think I will need to NOW lookup token again..
          return false; //hopefully this will not blow up the requests..
        }
        catch (err) {
          console.error("Error in getAccessToken via AuthContext");
          console.error(err);
          window.location = "/login";
        }
      }*/

    };




    const getIsAuthenticated = async () => {
      const idToken = await authClient.tokenManager.get("idToken");
      const accessToken = await authClient.tokenManager.get("accessToken");
      return !!(idToken && accessToken);
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
  authClient: PropTypes.object
};

export const AuthContext = createContext();
export default AuthContextProvider;
