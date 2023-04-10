import React from 'react';
import {useOktaAuth} from "@okta/okta-react";
import moment from "moment/moment";

export default function useAuthenticationToken() {
  const { authState, oktaAuth } = useOktaAuth();

  const getAccessToken = async () => {
    const isAuthenticated = await getIsAuthenticated();

    if (!isAuthenticated) {
      //console.log("!getAccessToken: refreshing UI to trigger login");
      //window.location = "/login"; //if not authenticated, may just need to take user to login page
      //window.location.reload(false);
      return false;
    }

    const tokenObject = await oktaAuth.tokenManager.get("accessToken");

    if (tokenObject.accessToken) {
      let now = moment();
      let tokenExp = moment.unix(tokenObject.expiresAt);

      if (now.isBefore(tokenExp)) { //maybe check if 30min has passed and then force refresh?  Be proactive?
        console.info("TOKEN NOT EXPIRED: ", tokenExp.format("MMMM Do YYYY, h:mm:ss a"));
        //console.log("Existing token: ", tokenObject.accessToken);
        return tokenObject.accessToken;
      } else {
        console.info("EXPIRED TOKEN FOUND ON:", tokenExp.format("MMMM Do YYYY, h:mm:ss a"));
        const newToken = await oktaAuth.tokenManager.renew("accessToken");
        console.info("REFRESHED TOKEN FOR:", moment.unix(newToken.expiresAt).format("MMMM Do YYYY, h:mm:ss a"));
        //console.log("token being returned from getAccessToken:", newToken.accessToken);
        return newToken.accessToken;
      }

    } else {
      console.info("no access token available");
      return false;
    }
  };

  const getIsAuthenticated = async () => {
    const idToken = await oktaAuth.tokenManager.get("idToken");
    const accessToken = await oktaAuth.tokenManager.get("accessToken");
    return !!(idToken && accessToken);
  };

  return ({
    authClient: oktaAuth,
    authState: authState,
    getAccessToken: getAccessToken,
    getIsAuthenticated: getIsAuthenticated,
  });
}