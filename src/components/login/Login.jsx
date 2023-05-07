/* THIS MAY BE DEPRECATED!!! */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { useOktaAuth } from "@okta/okta-react";

const Login = () => {
  const { authState } = useOktaAuth();
  const history = useHistory();

  useEffect(() => {
    if (authState && !authState.isPending && authState.isAuthenticated) {
      history.push("/");
    }
  }, [authState.isAuthenticated]);

  return <LoginForm />;
};

Login.propTypes = {
  issuer: PropTypes.string,
  authClient: PropTypes.object
};
export default Login;

