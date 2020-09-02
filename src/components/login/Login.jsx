import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { useOktaAuth } from "@okta/okta-react";

const Login = ({ issuer, redirectFromLogin }) => {
  const { authState } = useOktaAuth();

  useEffect(() => {
    if (!authState.isPending && authState.isAuthenticated) {
      console.log("Login.jsx detected an authenticated state, so pushing to /");
      //console.debug("warning, this could be a problem with 401 errors IF this state says it's authenticated but token expired, so may now want to do this");
      redirectFromLogin();
    }

  }, [authState]);

  return <LoginForm issuer={issuer}/>;
};

Login.propTypes = {
  issuer: PropTypes.string,
  redirectFromLogin: PropTypes.func
};
export default Login;

