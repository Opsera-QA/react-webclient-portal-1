import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { useOktaAuth } from "@okta/okta-react";

const Login = ({ issuer }) => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  console.log(authState)

  return <LoginForm issuer={issuer} />;
};

Login.propTypes = {
  issuer: PropTypes.string
};
export default Login;

