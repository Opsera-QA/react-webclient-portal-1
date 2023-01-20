import React from "react";
import PropTypes from "prop-types";
import { SecureRoute } from "@okta/okta-react";
import { meetsRequirements } from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function RoleRestrictedRoute(
  {
    path,
    exact,
    component,
    roleRequirement,
  }) {
  const {
    accessRoleData,
  } = useComponentStateReference();

  if (meetsRequirements(roleRequirement, accessRoleData) !== true) {
    return null;
  }

  return (
    <SecureRoute
      path={path}
      exact={exact}
      component={component}
    />
  );
}

RoleRestrictedRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.any,
  roleRequirement: PropTypes.any,
};