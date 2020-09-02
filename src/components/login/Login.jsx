import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { useOktaAuth } from "@okta/okta-react";
//import { useHistory } from "react-router-dom";

const Login = ({ issuer }) => {
  //const history = useHistory();
  const { authState } = useOktaAuth();

  useEffect(() => {
    if (authState.isPending !== true && authState.isAuthenticated) {
      console.debug("warning, this could be a problem with 401 errors IF this state says it's authenticated but token expired, so may now want to do this");
      //history.push("/");
    }
    console.log("Login.jsx detected an authenticated state, so pushing to /", authState);
  }, [authState]);

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return <LoginForm issuer={issuer}/>;
};

Login.propTypes = {
  issuer: PropTypes.string,
};
export default Login;

