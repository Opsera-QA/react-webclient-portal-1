import React from "react";
import RegisterAccountButton from "components/login/RegisterAccountButton";
import PropTypes from "prop-types";

export default function LoginWelcomeMessage() {
  return (
    <div className="ml-4">
      <h2 className="mb-3 bd-text-purple-bright">Welcome to Opsera!</h2>
      <div style={{ fontSize: "1.1rem" }}>
        Opsera’s vision is to enable and empower the developers, operations and release teams by giving the
        flexibility in selecting the various DevOps
        functional tools, build the pipeline with quality and security gates.
      </div>
      <div style={{ fontSize: "1.1rem" }} className="mt-3">Opsera provides out of the box monitoring dashboard,
        giving an end to end visibility of DevOps landscape metrics
        via an intelligent dashboard to improve the Agility, Operational excellence and help them to track
        security and compliance metrics.
      </div>

      <div className="row mx-n2 mt-4">
        <RegisterAccountButton />
        {/*<div className="col-md px-2">
        <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={login}>Log In</Button>
      </div>*/}
      </div>
    </div>
  );
}

LoginWelcomeMessage.propTypes = {
  authClient: PropTypes.any
};