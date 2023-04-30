import React, {useState, useRef, useEffect} from "react";
import { useHistory } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingDialog from "./components/common/status_notifications/loading";
import ErrorBanner from "components/common/status_notifications/banners/ErrorBanner";
import { generateUUID } from "components/common/helpers/string-helpers";
import useAxiosCancelToken from "hooks/useAxiosCancelToken";
import userActions from "components/user/user-actions";

//Okta Libraries
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useReactLogger from "temp-library-components/hooks/useReactLogger";
import Routes from "routes/Routes";

const isFreeTrial = false;

const OKTA_CONFIG = {
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
};

const authClient = new OktaAuth({
  issuer: OKTA_CONFIG.issuer,
  clientId: OKTA_CONFIG.client_id,
  redirectUri: OKTA_CONFIG.redirect_uri,
  responseMode: "fragment",
  tokenManager: {
    autoRenew: true,
    expireEarlySeconds: 160,
  },
});

const AppWithRouterAccess = () => {
  const [loading, setLoading] = useState(false);
  const authStateLoadingUser = useRef(false);
  const [error, setError] = useState(null);
  const [expectedEmailAddress, setExpectedEmailAddress] = useState(undefined);
  const [storedAuthToken, setStoredAuthToken] = useState(undefined);
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  const { cancelTokenSource } = useAxiosCancelToken();
  const reactLogger = useReactLogger();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri ? originalUri : "/", window.location.origin));
  };

  useEffect(() => {
    // console.log("app with router access starting up");
    //
    // return () => {
    //   console.log("app with router access return");
    // };
  }, []);

  authClient.start();

  authClient.tokenManager.on("expired", function(key, expiredToken) {
    console.info("Token with key", key, " has expired:");
  });

  authClient.tokenManager.on("renewed", function(key, newToken, oldToken) {
    console.info("Token with key", key, "has been renewed");
  });

  authClient.tokenManager.on("error", function(err) {
    console.error("TokenManager error:", err);
    window.location.reload(false);
    // err.name
    // err.message
    // err.errorCode
    // err.errorSummary
    // err.tokenKey
    // err.accessToken
  });


  authClient?.authStateManager?.subscribe(async authState => {
    // console.info("Auth State manager subscription event: ", authState);
    if (!authState.isAuthenticated) {
      setStoredAuthToken(undefined);
      setUserData(null);
      return;
    }

    const token = DataParsingHelper.safeObjectPropertyParser(authState, "accessToken.accessToken");

    if (ObjectHelper.areObjectsEqualLodash(token, storedAuthToken) !== true && !error && authStateLoadingUser.current !== true) {
      setStoredAuthToken(token);
      authStateLoadingUser.current = true;
      await loadUsersData(token);
      authStateLoadingUser.current = false;
    }
  });

  if (!authClient?.isLoginRedirect()) {
    // Trigger an initial authState change event when the app startup
    authClient.authStateManager.updateAuthState();
  }

  const loadUsersData = async (token) => {
    try {
      reactLogger.logDebugMessage(
        "AppWithRouterAccess",
        "loadUsersData",
        "Loading User Data."
      );

      setLoading(true);
      const response = await userActions.getLoggedInUser(
        token,
        cancelTokenSource,
        expectedEmailAddress,
      );

      const newUser = DataParsingHelper.parseObject(response?.data);

      if (ObjectHelper.areObjectsEqualLodash(newUser, userData) !== true) {
        setUserData(newUser);
      } else {
        reactLogger.logDebugMessage(
          "AppWithRouterAccess",
          "loadUsersData",
          "Skipping User state update as it has not changed."
        );
      }
    } catch (error) {
      //console.log(error.response.data); //Forbidden
      //console.log(error.response.status); //403
      const errorStatus = DataParsingHelper.parseNestedNumber(error, "response.status");
      if (errorStatus === 403) {
        //this means user doesn't have access so clearing sessiong and logging user out
        let errorMsg = "Access denied when trying to retrieve user details.  This could indicate an expired or revoked token.  Please log back in before proceeding.";
        console.error(errorMsg + "Service Response:" + error.response.data);
        history.push("/logout");
        setError(errorMsg);
      } else if (errorStatus === 409) {
        console.error(error);
        setUserData(undefined);
        setError(error);
        history.push("/login");
      } else {
        console.error(error);
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const reloadUserData = async () => {
    const tokens = await authClient.tokenManager.getTokens();
    await loadUsersData(tokens?.accessToken?.accessToken);
  };

  const getError = () => {
    if (
      error &&
      !error?.message?.includes("401") &&
      !error?.message?.includes("undefined") &&
      !error?.message?.includes("cancelToken")
    ) {
      return (
        <ErrorBanner
          id={generateUUID()}
          error={error}
          removeBanner={() => setError(null)}
        />
      );
    }
  };

  if (!userData && loading && !error) {
    return (<LoadingDialog/>);
  }

  return (
    <Security oktaAuth={authClient} restoreOriginalUri={restoreOriginalUri}>
      {getError()}
      <AuthContextProvider
        userData={userData}
        loadUserData={reloadUserData}
        setExpectedEmailAddress={setExpectedEmailAddress}
      >
        <Routes />
      </AuthContextProvider>
    </Security>
  );

};

export default AppWithRouterAccess;