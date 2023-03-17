import React from "react";
import PropTypes from "prop-types";
import { SecureRoute } from "@okta/okta-react";
import useComponentStateReference from "hooks/useComponentStateReference";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";

export default function BreadcrumbRoute(
  {
    path,
    exact,
    component,
    breadcrumb,
  }) {
  const {
    userData,
  } = useComponentStateReference();

  if (breadcrumb == null || RoleHelper.doesUserMeetSiteRoleRequirements(userData, breadcrumb?.allowedRoles) !== true) {
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

BreadcrumbRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.any,
  breadcrumb: PropTypes.object,
};
