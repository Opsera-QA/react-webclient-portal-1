import React, { useState, useEffect, useRef } from "react";
import { Route, useHistory } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingDialog from "./components/common/status_notifications/loading";
import Navbar from "./Navbar";
import ToastContextProvider from "./contexts/DialogToastContext";
import { axiosApiService } from "api/apiService";


//Okta Libraries
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import AppRoutes from "routes/AppRoutes";
import ErrorBanner from "components/common/status_notifications/banners/ErrorBanner";
import {generateUUID} from "components/common/helpers/string-helpers";
import OpseraFooter from "components/footer/OpseraFooter";
import LoginForm from "components/login/LoginForm";
import Logout from "components/login/Logout";
import useLocationReference from "hooks/useLocationReference";

const AppWithRouterAccess = () => {
  const [hideSideBar, setHideSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const authStateLoadingUser = useRef(false);
  const [error, setError] = useState(null);
  const [authenticatedState, setAuthenticatedState] = useState(false);
  const [data, setData] = useState(null);
  const { isPublicPathState } = useLocationReference();

  const history = useHistory();

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


  authClient.authStateManager.subscribe(async authState => {
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

  if (!authClient.isLoginRedirect()) {
    // Trigger an initial authState change event when the app startup
    authClient.authStateManager.updateAuthState();
  }

  useEffect(() => {
    enableSideBar(history.location.pathname);

  }, [authenticatedState, history.location.pathname]);

  // TODO: We need to put this in an actions file and wire up cancel token
  const loadUsersData = async (token) => {
    try {
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

  const isPublicPath = (path) => {
    return (
      path === "/login" ||
      path === "/signup" ||
      path === "/registration" ||
      path === "/trial/registration" ||
      path.includes("/account/registration") ||
      path.includes("/signup/awsmarketplace")
    );
  };

  const enableSideBar = (path) => {
    if (isPublicPath(path)) {
      setHideSideBar(true);
    } else {
      setHideSideBar(false);
    }
  };

  const refreshToken = async () => {
    const tokens = await authClient.tokenManager.getTokens();
    await loadUsersData(tokens.accessToken.value);
  };

  const getNavBar = () => {
    return (<Navbar hideAuthComponents={hideSideBar} userData={data} />);
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
    history.push('/');
  };

  const getAccessibleRoutes = () => {
    if (!authenticatedState && isPublicPathState !== true) {
      return (
        <div className={"container-fluid m-0"}>
          <div className={"d-flex flex-row"}>
            <div className={"w-100"}>
              <LoginForm issuer={OKTA_CONFIG.issuer} authClient={authClient} />
              <Route path='/implicit/callback' render={ (props) => <LoginCallback {...props} onAuthResume={ onAuthResume } /> } />
              <Route path="/logout" exact component={Logout} />
            </div>
          </div>
          <OpseraFooter />
        </div>
      );
    }

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
  };

  if (!data && loading && !error) {
    return (<LoadingDialog />);
  }

  return (
    <Security oktaAuth={authClient} restoreOriginalUri={restoreOriginalUri}>
      {getError()}
      <AuthContextProvider userData={data} refreshToken={refreshToken} authClient={authClient}>
        <ToastContextProvider navBar={getNavBar()}>
          {getAccessibleRoutes()}
        </ToastContextProvider>
      </AuthContextProvider>
    </Security>
  );

};

export default AppWithRouterAccess;