import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";

const Login = ({ issuer }) => {

  return <LoginForm issuer={issuer} />;
};

Login.propTypes = {
  issuer: PropTypes.string
};
export default Login;

