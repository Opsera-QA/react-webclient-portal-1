import React from "react";
import PropTypes from "prop-types";
import { SecureRoute } from "@okta/okta-react";
import useGetOrganizationSettingsEntitlementByName
  from "hooks/settings/organization_settings/entitlements/useGetOrganizationSettingsEntitlementByName";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";

export default function EntitlementRoute(
  {
    path,
    exact,
    component,
    entitlementName,
  }) {
  const {
    isActive,
  } = useGetOrganizationSettingsEntitlementByName(entitlementName);

  if (entitlementConstants.isEntitlementNameValid(entitlementName) !== true || isActive !== true) {
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

EntitlementRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.any,
  entitlementName: PropTypes.string,
};
