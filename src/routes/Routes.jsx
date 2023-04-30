import React, { useEffect } from "react";
import {LoginCallback} from "@okta/okta-react";
import OpseraFooter from "components/footer/OpseraFooter";
import LoginForm from "components/login/LoginForm";
import {Route, useHistory} from "react-router-dom";
import Logout from "components/login/Logout";
import FreeTrialAppRoutes from "FreeTrialAppRoutes";
import useLocationReference from "hooks/useLocationReference";
import useAuthenticationToken from "hooks/general/api/useAuthenticationToken";
import AppRoutes from "routes/AppRoutes";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function Routes() {
  const { isPublicPathState } = useLocationReference();
  const { isAuthenticated, authClient } = useAuthenticationToken();
  const history = useHistory();
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  useEffect(() => {}, [isAuthenticated]);

  const onAuthResume = async () => {
    history.push('/');
  };

  // Authenticated routes
  if (isAuthenticated !== true && isPublicPathState !== true) {
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

  if (isFreeTrial === true && isOpseraAdministrator !== true) {
    return (
      <FreeTrialAppRoutes
        authClient={authClient}
      />
    );
  }

  return (
    <AppRoutes />
  );
}
