import React from "react";
import PropTypes from "prop-types";
import { SecureRoute } from "@okta/okta-react";

export default function SecuredRouteBase(
  {
    exact,
    component,
    path,
  }) {
  return (
    <SecureRoute
      path={path}
      exact={exact}
      component={component}
    />
  );
}

SecuredRouteBase.propTypes = {
  exact: PropTypes.bool,
  component: PropTypes.any,
  path: PropTypes.string,
};

