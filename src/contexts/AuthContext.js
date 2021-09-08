import React, {createContext} from "react";
import PropTypes from "prop-types";
import moment from "moment";

const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.REACT_APP_OPSERA_NODE_JWT_SECRET;

const AuthContextProvider = (props) => {
    const { userData, refreshToken, authClient } = props;

    const logoutUserContext = async () => {
      authClient.tokenManager.clear();
      await authClient.revokeAccessToken();
      await authClient.revokeRefreshToken();
      authClient.closeSession()
        .then(() => {
          window.location.replace("/");
        })
        .catch(e => {
          if (e.xhr && e.xhr.status === 429) {
            // Too many requests
          }
        });
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
        //console.log("!getAccessToken: refreshing UI to trigger login");
        //window.location = "/login"; //if not authenticated, may just need to take user to login page
        //window.location.reload(false);
        return false;
      }

      const tokenObject = await authClient.tokenManager.get("accessToken");

      if (tokenObject.accessToken) {
        let now = moment();
        let tokenExp = moment.unix(tokenObject.expiresAt);

        if (now.isBefore(tokenExp)) { //maybe check if 30min has passed and then force refresh?  Be proactive?
          console.log("TOKEN NOT EXPIRED: ", tokenExp.format("MMMM Do YYYY, h:mm:ss a"));
          //console.log("Existing token: ", tokenObject.accessToken);
          return tokenObject.accessToken;
        } else {
          console.log("EXPIRED TOKEN FOUND ON:", tokenExp.format("MMMM Do YYYY, h:mm:ss a"));
          const newToken = await authClient.tokenManager.renew("accessToken");
          console.log("REFRESHED TOKEN FOR:", moment.unix(newToken.expiresAt).format("MMMM Do YYYY, h:mm:ss a"));
          //console.log("token being returned from getAccessToken:", newToken.accessToken);
          return newToken.accessToken;
        }

      } else {
        console.log("returning a false result from getAccessToken");
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
      if (restrictProd && process.env.REACT_APP_ENVIRONMENT === "production") {
        return false;
      } else {
        return userData.groups.includes("Preview");
      }
    };

    const featureFlagHideItemInProd = () => {
      return process.env.REACT_APP_ENVIRONMENT === "production";
    };

    const featureFlagHideItemInTest = () => {
      return process.env.REACT_APP_ENVIRONMENT === "test";
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
          } else if (groups.includes("NonLDAPEndUser") || ldap.type === "sass-user") {
            //setting Saas Based Access
            console.log("setting saas-power-user");
            role = "power_user";
          }

          customerAccessRules = {
            ...customerAccessRules,
            Administrator: groups.includes("Administrators"),
            PowerUser: groups.includes("PowerUsers"),
            SassPowerUser: ldap.type === "sass-user",
            User: groups.includes("Users"),
            UserId: user._id,
            Email: user.email,
            Role: role,
            Type: ldap ? ldap.type : "sass-user",
            Groups: groups,
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

    const generateJwtServiceTokenWithValue = (object = {}, expirationDuration = "1h") => {
      const token = jwt.sign(object, ACCESS_TOKEN_SECRET, { expiresIn: expirationDuration });
      return token;
    };

    const getAccessRoleData = async () => {
      const user = await getUserRecord();
      return await setAccessRoles(user);
    };

    const isSassUser = () => {
      if (userData == null) {
        return false;
      }

      const ldap = userData?.ldap;
      const groups = userData?.groups;
      return ldap?.type === "sass-user" || (Array.isArray(groups) && groups?.includes("NonLDAPEndUser"));
    };

    return (
      <AuthContext.Provider value={{
        logoutUserContext: logoutUserContext,
        loginUserContext: loginUserContext,
        renewUserToken: renewUserToken,
        getAccessToken: getAccessToken,
        getIsPreviewRole: getIsPreviewRole,
        featureFlagHideItemInProd: featureFlagHideItemInProd,
        featureFlagHideItemInTest: featureFlagHideItemInTest,
        getUserRecord: getUserRecord,
        setAccessRoles: setAccessRoles,
        getIsAuthenticated: getIsAuthenticated,
        generateJwtServiceTokenWithValue: generateJwtServiceTokenWithValue,
        getAccessRoleData: getAccessRoleData,
        isSassUser: isSassUser,
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
  children: PropTypes.any
};

export const AuthContext = createContext();
export default AuthContextProvider;
