import React, { createContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const AuthContextProvider = (props) => {
    const { userData, refreshToken, authClient } = props;

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

    const getAccessToken = async () => {
      const isAuthenticated = await getIsAuthenticated();
      if (!isAuthenticated) {
        console.log("!getAccessToken: refreshing UI to trigger login");
        //window.location = "/login"; //if not authenticated, may just need to take user to login page
        //window.location.reload(false);
        return false;
      }

      const tokenObject = await authClient.tokenManager.get("accessToken");

      if (tokenObject.accessToken) {
        let now = moment();
        let tokenExp = moment.unix(tokenObject.expiresAt);
        console.log("Current token: ", tokenObject.accessToken)

        if (now.isBefore(tokenExp)) { //maybe check if 30min has passed and then force refresh?  Be proactive?
          console.log("TOKEN NOT EXPIRED: ", tokenExp.format('MMMM Do YYYY, h:mm:ss a'));
          return tokenObject.accessToken;
        } else {
          console.log("EXPIRED TOKEN FOUND ON:", tokenExp.format('MMMM Do YYYY, h:mm:ss a'));
          const newToken = await authClient.tokenManager.renew("accessToken");
          console.log("REFRESHED TOKEN FOR:", moment.unix(newToken.expiresAt).format('MMMM Do YYYY, h:mm:ss a'));
          console.log("token being returned from getAccessToken:", newToken.accessToken)
          return newToken.accessToken;
        }

      } else {
        return false;
      }
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
            Type: ldap ? ldap.type : "sass-user",
          };
        }
        if (ldap && ldap.domain === "opsera.io") { //checking for OpsERA account domain
          customerAccessRules = {
            ...customerAccessRules,
            OpseraAdministrator: groups.includes("Administrators"),
          };
        }
        //console.table(customerAccessRules);
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
  authClient: PropTypes.object,
};

export const AuthContext = createContext();
export default AuthContextProvider;
