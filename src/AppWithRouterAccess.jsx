import React, { useState, useRef } from "react";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingDialog from "./components/common/status_notifications/loading";
import ToastContextProvider from "./contexts/DialogToastContext";
import { axiosApiService } from "api/apiService";

//Okta Libraries
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import AppRoutes from "routes/AppRoutes";
import ErrorBanner from "components/common/status_notifications/banners/ErrorBanner";
import { generateUUID, hasStringValue } from "components/common/helpers/string-helpers";
import OpseraHeaderBar from "components/header/OpseraHeaderBar";
import FreeTrialAppRoutes from "FreeTrialAppRoutes";
import LoginForm from "components/login/LoginForm";
import Logout from "components/login/Logout";
import OpseraFooter from "components/footer/OpseraFooter";
import useLocationReference, { PUBLIC_PATHS } from "hooks/useLocationReference";
import { lightThemeConstants } from "temp-library-components/theme/light.theme.constants";
import PageNotFound from "components/not_found/PageNotFound";

const AppWithRouterAccess = () => {
  const [hideSideBar, setHideSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const authStateLoadingUser = useRef(false);
  const [error, setError] = useState(null);
  const [authenticatedState, setAuthenticatedState] = useState(false);
  const [data, setData] = useState(null);
  const history = useHistory();
  const { isPublicPathState } = useLocationReference();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri ? originalUri : "/", window.location.origin));
  };

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
    //console.info("Auth State manager subscription event: ", authState);
    setAuthenticatedState(authState.isAuthenticated);

    if (!authState.isAuthenticated) {
      setHideSideBar(true);
      setData(null);
      return;
    }

    if (authState.isAuthenticated && !data && !error && authStateLoadingUser.current !== true) {
      authStateLoadingUser.current = true;
      await loadUsersData(authState.accessToken["accessToken"]);
      authStateLoadingUser.current = false;
    }
  });

  if (!authClient?.isLoginRedirect()) {
    // Trigger an initial authState change event when the app startup
    authClient.authStateManager.updateAuthState();
  }

  // TODO: We need to put this in an actions file and wire up cancel token
  const loadUsersData = async (token) => {
    try {
      if (token == null) {
        setData(undefined);
        return;
      }

      setLoading(true);
      let apiUrl = "/users";
      const response = await axiosApiService(token).get(apiUrl, {});
      setData(response.data);
    } catch (error) {
      //console.log(error.response.data); //Forbidden
      //console.log(error.response.status); //403
      if (error.response && error.response.status === 403) {
        //this means user doesn't have access so clearing sessiong and logging user out
        let errorMsg = "Access denied when trying to retrieve user details.  This could indicate an expired or revoked token.  Please log back in before proceeding.";
        console.error(errorMsg + "Service Response:" + error.response.data);
        history.push("/logout");
        setError(errorMsg);
      } else {
        console.error(error);
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const enableSideBar = () => {
    if (isPublicPathState) {
      setHideSideBar(true);
    } else {
      setHideSideBar(false);
    }
  };

  const refreshToken = async () => {
    const tokens = await authClient.tokenManager.getTokens();
    await loadUsersData(tokens?.accessToken?.value);
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

  const onAuthResume = async () => {
    console.log("onAuthResume fired");
    history.push('/');
  };

  const getRoutes = () => {
    console.info("Running Environment: ", process.env.NODE_ENV);
    //console.info("ALL VARIABLES:", process.env);

    if (!authenticatedState && isPublicPathState !== true) {
      return (
        <div className={"container-fluid m-0"}>
          <div className={"d-flex flex-row"}>
            <div className={"w-100"}>
              <Router history={history}>
                <Switch>
                  <LoginForm issuer={OKTA_CONFIG.issuer} authClient={authClient} />
                  <Route path='/implicit/callback' render={ (props) => <LoginCallback {...props} onAuthResume={ onAuthResume } /> } />
                  <Route path="/logout" exact component={Logout} />
                  <Route
                    path={"*"}
                    component={PageNotFound}
                  />
                </Switch>
              </Router>
            </div>
          </div>
          <OpseraFooter />
        </div>
      );
    }

    const ldap = data?.ldap;
    const groups = data?.groups;

    // Opsera Administrators should still have full access to everything
    if (ldap?.domain === "opsera.io" && Array.isArray(groups) && groups.includes("Administrators")) {
      return (
        <AppRoutes
          authenticatedState={authenticatedState}
          authClient={authClient}
          isPublicPathState={isPublicPathState}
          OKTA_CONFIG={OKTA_CONFIG}
          userData={data}
          hideSideBar={hideSideBar}
        />
      );
    }

    return (
      <FreeTrialAppRoutes
        authClient={authClient}
        OKTA_CONFIG={OKTA_CONFIG}
      />
    );
  };

  if (!data && loading && !error) {
    return (<LoadingDialog />);
  }

  return (
    <Security oktaAuth={authClient} restoreOriginalUri={restoreOriginalUri}>
      {getError()}
        <AuthContextProvider
          userData={data}
          refreshToken={refreshToken}
          authClient={authClient}
          isAuthenticated={authenticatedState}
        >
          {getRoutes()}
        </AuthContextProvider>
    </Security>
  );

};

export default AppWithRouterAccess;