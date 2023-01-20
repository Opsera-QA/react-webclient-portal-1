import React, {useState, useRef, useEffect} from "react";
import { Route, useHistory } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingDialog from "./components/common/status_notifications/loading";
import AppRoutes from "routes/AppRoutes";
import ErrorBanner from "components/common/status_notifications/banners/ErrorBanner";
import { generateUUID } from "components/common/helpers/string-helpers";
import FreeTrialAppRoutes from "FreeTrialAppRoutes";
import LoginForm from "components/login/LoginForm";
import Logout from "components/login/Logout";
import OpseraFooter from "components/footer/OpseraFooter";
import useLocationReference from "hooks/useLocationReference";
import useCancelTokenStateReference from "hooks/useCancelTokenStateReference";
import userActions from "components/user/user-actions";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";

//Okta Libraries
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";

const isFreeTrial = false;

const AppWithRouterAccess = () => {
  const [loading, setLoading] = useState(false);
  const authStateLoadingUser = useRef(false);
  const [error, setError] = useState(null);
  const [authenticatedState, setAuthenticatedState] = useState(false);
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  const { isPublicPathState } = useLocationReference();
  const { cancelTokenSource } = useCancelTokenStateReference();

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
      setUserData(null);
      return;
    }

    if (authState.isAuthenticated && !userData && !error && authStateLoadingUser.current !== true) {
      authStateLoadingUser.current = true;
      await loadUsersData(authState.accessToken["accessToken"]);
      authStateLoadingUser.current = false;
    }
  });

  if (!authClient?.isLoginRedirect()) {
    // Trigger an initial authState change event when the app startup
    authClient.authStateManager.updateAuthState();
  }

  const loadUsersData = async (token) => {
    try {
      setLoading(true);
      const response = await userActions.getLoggedInUser(
        token,
        cancelTokenSource,
      );
      setUserData(response?.data);
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

  const refreshToken = async () => {
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

  const onAuthResume = async () => {
    history.push('/');
  };

  const getRoutes = () => {
    if (!authenticatedState && isPublicPathState !== true) {
      return (
        <div className={"w-100 px-3"}>
          <div className={"d-flex flex-row"}>
            <div className={"w-100"}>
              <LoginForm authClient={authClient} />
              <Route path='/implicit/callback' render={ (props) => <LoginCallback {...props} onAuthResume={ onAuthResume } /> } />
              <Route path="/logout" exact component={Logout} />
            </div>
          </div>
          <OpseraFooter />
        </div>
      );
    }

    const isOpseraAdministrator = SiteRoleHelper.isOpseraAdministrator(userData);

    if (isFreeTrial === true && isOpseraAdministrator !== true) {
      return (
        <FreeTrialAppRoutes
          authClient={authClient}
        />
      );
    }

    return (
      <AppRoutes
        authenticatedState={authenticatedState}
        authClient={authClient}
      />
    );
  };

  if (!userData && loading && !error) {
    return (<LoadingDialog />);
  }

  return (
    <Security oktaAuth={authClient} restoreOriginalUri={restoreOriginalUri}>
      {getError()}
        <AuthContextProvider
          userData={userData}
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