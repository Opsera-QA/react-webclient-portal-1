import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";

const Login = ({ issuer }) => {
  const history = useHistory();
  const { authState } = useOktaAuth();

  useEffect(() => {
  }, [authState]);

  if (authState.isAuthenticated) {
    history.push("/");
    return;
  }

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return <LoginForm issuer={issuer}/>;
};

Login.propTypes = {
  issuer: PropTypes.string,
};
export default Login;

