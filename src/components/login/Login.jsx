import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { useOktaAuth } from "@okta/okta-react";

const Login = ({ issuer }) => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated ?
    <Redirect to={{ pathname: "/overview" }}/> :
    <LoginForm issuer={issuer} />;
};

Login.propTypes = {
  issuer: PropTypes.string
};
export default Login;

