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
import Sidebar from "components/sidebar/Sidebar";
import PublicRoutes from "routes/PublicRoutes";

export default function Routes() {
  const { isPublicPathState } = useLocationReference();
  const { isAuthenticated } = useAuthenticationToken();
  const history = useHistory();
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  useEffect(() => {}, [isAuthenticated]);

  const onAuthResume = async () => {
    history.push('/');
  };

  const getBody = () => {
    if (isAuthenticated !== true && isPublicPathState !== true) {
      return (
        <>
          <LoginForm/>
          <Route path='/implicit/callback' render={(props) => <LoginCallback {...props} onAuthResume={onAuthResume}/>}/>
          <Route path="/logout" exact component={Logout}/>
        </>
      );
    }

    if (isFreeTrial === true && isOpseraAdministrator !== true) {
      return (
        <FreeTrialAppRoutes />
      );
    }

    if (isAuthenticated !== true) {
      return (<PublicRoutes />);
    }

    return (<AppRoutes />);
  };

  return (
    <div className={"w-100 px-3"}>
      <div className={"d-flex flex-row"}>
        <Sidebar />
        <div className={"w-100"}>
          {getBody()}
        </div>
      </div>
      <OpseraFooter />
    </div>
  );
}
